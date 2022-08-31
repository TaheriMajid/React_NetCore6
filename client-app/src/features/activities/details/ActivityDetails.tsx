import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  cancelActivity: () => void;
  openForm: (id: string) => void;
}

const ActivityDetails = ({ activity, cancelActivity, openForm }: Props) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {/* <Button.Group> */}
          <Button floated="left"
            color="blue"
            content="Edit"
            onClick={() => openForm(activity.id)}
          />
          <Button floated="right" color="grey" content="Cancel" onClick={cancelActivity} />
        {/* </Button.Group> */}
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
