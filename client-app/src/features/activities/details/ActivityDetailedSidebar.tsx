import { Link } from "react-router-dom";
import { Image, Item, Label, List, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
}

const ActivityDetailedSidebar = ({ activity }: Props) => {
  // if (!attendees) return null;
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="yellow"
      ></Segment>
      <Segment attached>
        <List relaxed divided>
          <Item style={{ position: "relative" }} key="attendee.username">
            <Label
              style={{ position: "absolute" }}
              color="orange"
              ribbon="right"
            >
              Host
            </Label>

            <Image size="tiny" src={"/assets/user.png"} />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`/profiles/...`}>attendee.displayName</Link>
              </Item.Header>

              <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
            </Item.Content>
          </Item>
        </List>
      </Segment>
    </>
  );
};
export default ActivityDetailedSidebar;
