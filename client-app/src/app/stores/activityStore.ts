import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";
import { textChangeRangeIsUnchanged } from "typescript";
import { format } from "date-fns";

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
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
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
    // activitiy.date = activitiy.date.split("T")[0];
    activitiy.date = new Date(activitiy.date!);
    this.activityRegistry.set(activitiy.id, activitiy);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  editOrCreateHandler = async (activity: Activity) => {
    this.loading = true;

    if (activity.id) {
      try {
        await agent.Activities.update(activity);
        runInAction(() => {
          this.activityRegistry.set(activity.id, activity);
          this.editMode = false;
          this.selectedActivity = activity;
          this.loading = false;
        });
      } catch (error) {
        runInAction(() => {
          this.loading = false;
          console.log(error);
        });
      }
    } else {
      activity.id = uuid();
      try {
        await agent.Activities.create(activity);
        runInAction(() => {
          this.activityRegistry.set(activity.id, activity);
          this.editMode = false;
          this.selectedActivity = activity;
          this.loading = false;
        });
      } catch (error) {
        runInAction(() => {
          this.loading = false;
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
}

export default ActivityStore;
