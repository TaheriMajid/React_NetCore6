import { Fragment } from "react";

import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
// import LoadingComponent from "../layout/LoadingComponent";

// import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {
  // const { activityStore } = useStore();

  // useEffect(() => {
  //   activityStore.loadActivities();
  // }, [activityStore]);

  // if (activityStore.loadingInitial) {
  //   return <LoadingComponent content="Loading...."></LoadingComponent>;
  // }

  const location = useLocation();

  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              {/* <ActivityDashboard /> */}
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
            </Container>
          </>
        )}
      />
    </Fragment>
  );
}

export default observer(App);
