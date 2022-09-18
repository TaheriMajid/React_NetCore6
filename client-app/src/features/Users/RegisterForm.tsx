import { ErrorMessage, Form, Formik } from "formik";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationErros from "../errors/ValidationErrors";

const RegisterForm = () => {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ displayName: "", username: "", email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        // userStore.register(values).catch((error) => setErrors({ error: "Invalid Email or Password" }))
        userStore.register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
          <Header as="h2" content="Sign Up to Reactivities" color="red" textAlign="center" />
          <MyTextInput name="displayName" placeholder={"Display Name"} />
          <MyTextInput name="username" placeholder={"UserName"} />
          <MyTextInput name="email" placeholder={"Email"} />
          <MyTextInput name="password" placeholder={"Password"} type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              //   <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />
              <ValidationErros errors={errors.error} />
            )}
          />
          <Button
            disabled={isSubmitting || !isValid || !dirty}
            positive
            loading={isSubmitting}
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
};
export default RegisterForm;
