import { Fragment, useEffect, useState } from "react";

import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "../layout/LoadingComponent";

import { v4 as uuid } from "uuid";
import agent from "../api/agent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const activitySelectHandler = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };

  const activityCancelHandler = () => {
    setSelectedActivity(undefined);
  };

  const openFormHandler = (id?: string) => {
    id ? activitySelectHandler(id) : activityCancelHandler();
    setEditMode(true);
  };

  const closeFormHandler = () => {
    setEditMode(false);
  };

  const editOrCreateHandler = (activity: Activity) => {
    setSubmitting(true);

    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    }
  };

  const deleteHandler = (id: string) => {
    setSubmitting(true);
    if (selectedActivity?.id === id) {
      setEditMode(false);
      setSelectedActivity(undefined);
    }
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  };

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let newActivies: Activity[] = [];
      response.forEach((element) => {
        element.date = element.date.split("T")[0];
        newActivies.push(element);
      });
      setActivities(newActivies);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingComponent></LoadingComponent>;
  }

  return (
    <Fragment>
      <Navbar openForm={openFormHandler} />

      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={activitySelectHandler}
          cancelActivity={activityCancelHandler}
          openForm={openFormHandler}
          closeForm={closeFormHandler}
          editMode={editMode}
          editOrCreate={editOrCreateHandler}
          deleteActivity={deleteHandler}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
