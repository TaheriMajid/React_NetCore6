import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity, ActivityFormValues } from "../models/activity";
import { v4 as uuid } from "uuid";
import { textChangeRangeIsUnchanged } from "typescript";
import { format } from "date-fns";
import { store } from "./store";
import { Profile } from "../models/profile";

class ActivityStore {
  activityRegistry = new Map<string, Activity>();

  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      // (a, b) => Date.parse(a.date) - Date.parse(b.date)
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        // const date = activity.date!.toISOString().split("T")[0];
        const date = format(activity.date!, "dd MMM yyyy");
        activities[date] = activities[date] ? [...activities[date], activity] : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);

    try {
      const response = await agent.Activities.list();
      response.forEach((element) => {
        this.setActivity(element);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      this.setLoadingInitial(false);
      console.log(error);
    }
  };

  loadActivity = async (id: string) => {
    this.setLoadingInitial(true);
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      this.setLoadingInitial(false);
      return activity;
    } else {
      try {
        let response = await agent.Activities.details(id);
        this.setActivity(response);
        this.selectedActivity = response;
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        this.setLoadingInitial(false);
        console.log(error);
      }
    }
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  private setActivity = (activitiy: Activity) => {
    const user = store.userStore.user;
    if (user) {
      activitiy.isGoing = activitiy.attendees!.some((a) => a.username === user.username);
      activitiy.isHost = activitiy.hostUsername === user.username;

      activitiy.host = activitiy.attendees?.find((a) => a.username === activitiy.hostUsername);
    }
    activitiy.date = new Date(activitiy.date!);
    this.activityRegistry.set(activitiy.id, activitiy);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  // editOrCreateHandler = async (activity: Activity) => {
  editOrCreateHandler = async (activity: ActivityFormValues) => {
    // this.loading = true;

    if (activity.id) {
      try {
        await agent.Activities.update(activity);
        runInAction(() => {
          let updatedActivity = { ...this.getActivity(activity.id!), ...activity };
          this.activityRegistry.set(activity.id!, updatedActivity as Activity);
          this.selectedActivity = updatedActivity as Activity;
          // this.activityRegistry.set(activity.id, activity);
          // this.editMode = false;
          // this.selectedActivity = activity;
          // this.loading = false;
        });
      } catch (error) {
        runInAction(() => {
          // this.loading = false;
          console.log(error);
        });
      }
    } else {
      const user = store.userStore.user;
      const attendee = new Profile(user!);
      activity.id = uuid();
      try {
        await agent.Activities.create(activity);
        const newActivity = new Activity(activity);
        newActivity.hostUsername = user!.username;
        newActivity.attendees = [attendee];
        this.setActivity(newActivity);
        runInAction(() => {
          // this.activityRegistry.set(activity.id, activity);
          // this.editMode = false;
          // this.selectedActivity = activity;
          // this.loading = false;
          this.selectedActivity = newActivity;
        });
      } catch (error) {
        runInAction(() => {
          // this.loading = false;
        });
        console.log(error);
      }
    }
  };

  deleteHandler = async (id: string) => {
    this.loading = true;
    try {
      if (this.selectedActivity?.id === id) {
        this.editMode = false;
        this.selectedActivity = undefined;
      }

      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      if (this.selectedActivity?.isGoing) {
        this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(
          (attendee) => attendee.username !== user?.username
        );
        this.selectedActivity.isGoing = false;
      } else {
        const attendee = new Profile(user!);
        this.selectedActivity?.attendees?.push(attendee);
        this.selectedActivity!.isGoing = true;
      }
      this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
    } catch (error) {
      console.log("updateAttendance");
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  cancelActivityToggle = async () => {
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
        this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  clearSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  updateAttendeeFollowing = (username: string) => {
    this.activityRegistry.forEach((activity) => {
      activity.attendees.forEach((attendee) => {
        if (attendee.username == username) {
          attendee.following ? attendee.followingCount-- : attendee.followingCount++;
          attendee.following = !attendee.following;
        }
      });
    });
  };
}

export default ActivityStore;
