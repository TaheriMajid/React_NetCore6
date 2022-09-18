import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
// import ActivityDetails from "../details/ActivityDetails";
// import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  // const { selectedActivity, editMode } = activityStore;

  useEffect(() => {
    if (activityStore.activityRegistry.size === 0) {
      activityStore.loadActivities();
    }
  }, [
    activityStore.activityRegistry.size,
    activityStore.loadActivities,
    activityStore,
  ]);

  if (activityStore.loadingInitial) {
    return <LoadingComponent content="Loading Activities...."></LoadingComponent>;
  }
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        {/* {selectedActivity && !editMode && (
          <ActivityDetails/>
        )}
        {editMode && (
          <ActivityForm
          ></ActivityForm>
        )} */}
        {/* <h2>Activity Filters</h2> */}
        <ActivityFilters/>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
