import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
// import activityStore from "../../../app/stores/activityStore";
import { useStore } from "../../../app/stores/store";

interface Props {
  activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {
  const { activityStore } = useStore();

  const [target, setTarget] = useState("");

  const deleteHandler = (
    event: React.SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(event.currentTarget.name);
    activityStore.deleteHandler(id);
  };

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by Majid</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {activity.date}
          <Icon name="marker" />
          {activity.venue}
        </span>
      </Segment>
      <Segment secondary>Attendees Go Here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button as={Link} to={`/activities/${activity.id}`} color="blue" floated="right" content="View"/>
      </Segment>
    </Segment.Group>
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
  );
};

export default ActivityListItem;
