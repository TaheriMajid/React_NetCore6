import React, { useEffect, useState } from "react";
import axios from "axios";

import logo from "./logo.svg";
import {Header, List} from "semantic-ui-react";
// import "./App.css";

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((response) => {
      setActivities(response.data);
    });
  }, []);
  return (
    // <div className="App">
    <div>
      {/* <header className="App-header"> */}
      <Header as="h2" icon="users" content="activities"/>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <List>
          {activities.map((activity: any) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
