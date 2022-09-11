import { observer } from "mobx-react-lite";
import { Fragment } from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
  const { activityStore } = useStore();

  // const [target, setTarget] = useState("");

  // const deleteHandler = (
  //   event: React.SyntheticEvent<HTMLButtonElement>,
  //   id: string
  // ) => {
  //   setTarget(event.currentTarget.name);
  //   activityStore.deleteHandler(id);
  // };

  return (
    <>
      {activityStore.groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="red">
            <h3>{group}</h3>
          </Header>
          {/* <Segment>
            <Item.Group divided>
              {activities.map(activity => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment> */}
          {activities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
      {/* <Segment>
        <Item.Group divided>
          {activityStore.activitiesByDate.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
            // <Item key={activity.id}>
            //   <Item.Content>
            //     <Item.Header as="a">{activity.title}</Item.Header>
            //     <Item.Meta>{activity.date}</Item.Meta>
            //     <Item.Description>
            //       <div>{activity.description}</div>
            //       <div>
            //         {activity.city} , {activity.venue}
            //       </div>
            //     </Item.Description>
            //     <Item.Extra>
            //       <Button
            //         floated="right"
            //         content="View"
            //         color="blue"
            //         as={Link}
            //         to={`/activities/${activity.id}`}
            //         // onClick={() =>
            //         //   activityStore.activitySelectHandler(activity.id)
            //         // }
            //       />
            //       <Button
            //         name={activity.id}
            //         loading={activityStore.loading && target === activity.id}
            //         floated="right"
            //         content="Delete"
            //         color="red"
            //         onClick={(event) => deleteHandler(event, activity.id)}
            //       />
            //       <Label basic content={activity.category} />
            //     </Item.Extra>
            //   </Item.Content>
            // </Item>
          ))}
        </Item.Group>
      </Segment> */}
    </>
  );
};

export default observer(ActivityList);
