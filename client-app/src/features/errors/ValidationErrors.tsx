import { Message } from "semantic-ui-react";

interface Props {
  // errors: string[] | null;
  errors: any;
}
const ValidationErros = ({ errors }: Props) => {
  return (
    <Message error>
      {/* {errors && errors?.map((error: any, i) => <Message.Item key={i}>{error}</Message.Item>)} */}
      {errors && errors?.map((error: any, i: any) => <Message.Item key={i}>{error}</Message.Item>)}
    </Message>
  );
};
export default ValidationErros;
