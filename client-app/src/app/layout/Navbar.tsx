import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
// import { useStore } from "../stores/store";

const Navbar = () => {
  // const { activityStore } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img
            src="assets/logo.png"
            alt="Logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            as={NavLink}
            to="/createActivity"
            // onClick={() => activityStore.openFormHandler()}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
