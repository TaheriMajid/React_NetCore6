import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
  const { activityStore } = useStore();

  return (
    <>
      {activityStore.groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="red">
            <h3>{group}</h3>
          </Header>
          {activities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default observer(ActivityList);
