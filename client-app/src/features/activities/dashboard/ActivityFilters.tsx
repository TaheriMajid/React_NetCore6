import { Calendar } from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

const ActivityFilters = () => {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: "25px" }}>
        <Header
          color="yellow"
          icon="filter"
          attached
          content="Filters :"
        ></Header>
        <Menu.Item content="All Activities"></Menu.Item>
        <Menu.Item content="I'm Going"></Menu.Item>
        <Menu.Item content="I'm Hosting"></Menu.Item>
      </Menu>
      <Header></Header>
      <Calendar></Calendar>
    </>
  );
};

export default ActivityFilters;
