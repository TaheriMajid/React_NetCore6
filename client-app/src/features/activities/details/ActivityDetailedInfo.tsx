import { Grid, Icon, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { format } from "date-fns";

interface Props {
  activity: Activity;
}

const ActivityDetailedInfo = ({ activity }: Props) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="yellow" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{activity.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="yellow" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(activity.date!, "dd MMMMM yyyy hh:dd aa")}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="yellow" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {activity.venue}, {activity.city}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};
export default ActivityDetailedInfo;
