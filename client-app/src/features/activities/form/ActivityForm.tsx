import { observer } from "mobx-react-lite";
// import { stringify } from "querystring";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

const ActivityForm = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { activityStore } = useStore();
  const { loadActivity, loadingInitial } = activityStore;
  // const [activity, setActivity] = useState<Activity>(initialState);
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    // console.log("in activity form");
    // console.log(activity.city);

    if (id) {
      loadActivity(id).then((respose) => setActivity(respose!));
    }
    //else {
    // setActivity({
    //   id: "",
    //   title: "",
    //   description: "",
    //   category: "",
    //   date: "",
    //   city: "",
    //   venue: "",
    // });
    //}
  }, [id, loadActivity]);
  // const initialState = activityStore.selectedActivity ?? {
  //   id: "",
  //   title: "",
  //   description: "",
  //   category: "",
  //   date: "",
  //   city: "",
  //   venue: "",
  // };

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(activity);
    activityStore.editOrCreateHandler(activity).then(() => {
      history.replace(`/activities/${activityStore.selectedActivity?.id}`);
    });
  };

  if (loadingInitial) {
    return <LoadingComponent content="Loading Activity..." />;
  }

  return (
    <Segment clearing>
      <Form onSubmit={submitHandler} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={changeHandler}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={changeHandler}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={changeHandler}
        />
        <Form.Input
          placeholder="Date"
          type="date"
          value={activity.date}
          name="date"
          onChange={changeHandler}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={changeHandler}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={changeHandler}
        />
        <Button
          loading={activityStore.loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          floated="left"
          type="button"
          content="Cancel"
          // onClick={activityStore.closeFormHandler}
          as={Link}
          to="/activities"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
