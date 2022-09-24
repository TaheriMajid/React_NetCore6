import { observer } from "mobx-react-lite";
import { FormEvent, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity, ActivityFormValues } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { Form, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from "yup";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { CategoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { values } from "mobx";

const ActivityForm = () => {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();
  const { activityStore } = useStore();
  const { loadActivity, loadingInitial } = activityStore;

  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());
  // const [activity, setActivity] = useState<Activity>({
  //   id: "",
  //   title: "",
  //   description: "",
  //   category: "",
  //   date: null,
  //   city: "",
  //   venue: "",
  // });

  const validationSchema = Yup.object({
    title: Yup.string().required("The Activity title is Required!!!"),
    description: Yup.string().required("The Activity description is Required!!!"),
    date: Yup.string().required("Date is Required").nullable(),
    category: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  useEffect(() => {
    if (id) {
      // loadActivity(id).then((respose) => setActivity(respose!));
      loadActivity(id).then((respose) => setActivity(new ActivityFormValues(respose!)));
    }
  }, [id, loadActivity]);

  // const submitFormHandler = (activity: Activity) => {
  const submitFormHandler = (activity: ActivityFormValues) => {
    activityStore
      .editOrCreateHandler(activity)
      .then(() => history.replace(`/activities/${activityStore.selectedActivity?.id}`));
  };
  if (loadingInitial) {
    return <LoadingComponent content="Loading Activity..." />;
  }

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="yellow" />
      <Formik
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => submitFormHandler(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput placeholder="Title" name="title" />
            <MyTextArea rows={2} placeholder="Description" name="description" />
            <MySelectInput options={CategoryOptions} placeholder="Category" name="category" />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="Location Details" sub color="yellow" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={activityStore.loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button loading={isSubmitting} floated="left" type="button" content="Cancel" as={Link} to="/activities" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
