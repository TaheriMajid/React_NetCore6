import { Field, FieldProps, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Comment, Loader } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import { formatDistanceToNow } from "date-fns";

interface Props {
  activityId: string;
}

const ActivityDetailedChat = ({ activityId }: Props) => {
  const { commentStore } = useStore();
  useEffect(() => {
    if (activityId) {
      console.log("ineffect_commentStore");
      commentStore.createHubConnection(activityId);
    }

    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, activityId]);

  console.log(commentStore.comments);
  return (
    <>
      <Segment textAlign="center" attached="top" inverted color="yellow" style={{ border: "none" }}>
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing>
      <Formik
          onSubmit={(values, { resetForm }) =>
            commentStore.addComment(values).then(() => resetForm())
          }
          initialValues={{ body: "" }}
          validationSchema={Yup.object({
            body: Yup.string().required(),
          })}
        >
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form className="ui form">
              <Field name="body">
                {(props: FieldProps) => (
                  <div style={{ position: "relative" }}>
                    <Loader active={isSubmitting} />
                    <textarea
                      placeholder="Enter your comment (Enter to submit, Shift + Enter for new line)"
                      rows={2}
                      {...props.field}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && e.shiftKey) {
                          return;
                        }
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          isValid && handleSubmit();
                        }
                      }}
                    />
                  </div>
                )}
              </Field>
              {/* <MyTextArea name="body" placeholder="Add Comment..." rows={3} />
              <Button
                loading={isSubmitting}
                disabled={isSubmitting || !isValid}
                content="Add Reply"
                labelPosition="left"
                icon="edit"
                primary
                type="submit"
                floated="right"
              /> */}
            </Form>
          )}
        </Formik>
        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistanceToNow(comment.createAt)} ago</div>
                </Comment.Metadata>
                <Comment.Text style={{ whiteSpace: "pre-wrap" }}>{comment.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  );
};
export default observer(ActivityDetailedChat);
