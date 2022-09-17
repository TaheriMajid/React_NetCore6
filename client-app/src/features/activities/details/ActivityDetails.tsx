import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

const ActivityDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;

  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [id, loadActivity]);

  if (loadingInitial || !activity) {
    return <LoadingComponent />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity}></ActivityDetailedHeader>
        <ActivityDetailedInfo activity={activity}></ActivityDetailedInfo>
        <ActivityDetailedChat activityId={activity.id}></ActivityDetailedChat>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar activity={activity}></ActivityDetailedSidebar>
      </Grid.Column>
    </Grid>
    // <Card fluid>
    //   <Image
    //     src={`/assets/categoryImages/${activity.category}.jpg`}
    //     wrapped
    //     ui={false}
    //   />
    //   <Card.Content>
    //     <Card.Header>{activity.title}</Card.Header>
    //     <Card.Meta>
    //       <span>{activity.date}</span>
    //     </Card.Meta>
    //     <Card.Description>{activity.description}</Card.Description>
    //   </Card.Content>
    //   <Card.Content extra>
    //     {/* <Button.Group> */}
    //     <Button
    //       floated="left"
    //       color="blue"
    //       content="Edit"
    //       as={Link}
    //       to={`/manage/${activity.id}`}
    //       // onClick={() => activityStore.openFormHandler(activity.id)}
    //     />
    //     <Button
    //       floated="right"
    //       color="grey"
    //       content="Cancel"
    //       as={Link}
    //       to="/activities"
    //       // onClick={activityStore.activityCancelHandler}
    //     />
    //     {/* </Button.Group> */}
    //   </Card.Content>
    // </Card>
  );
};

export default observer(ActivityDetails);
