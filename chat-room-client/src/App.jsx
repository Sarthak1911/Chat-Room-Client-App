import React from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/NotFound/NotFound";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import { getToken } from "./services/user";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app-container">
      <ToastContainer />
      <Switch>
        <Route
          path="/login"
          exact
          render={props => {
            if (getToken("username")) return <Redirect to="/chat-room" />;
            return <Login {...props} />;
          }}
        />
        <Route
          path="/register"
          exact
          render={props => {
            if (getToken("username")) return <Redirect to="/chat-room" />;
            return <Register {...props} />;
          }}
        />
        <Route
          path="/chat-room"
          exact
          render={props => {
            if (!getToken("username")) return <Redirect to="/login" />;
            return <ChatRoom {...props} />;
          }}
        />
        <Route path="/not-found" exact component={Notfound} />
        <Redirect exact path="/" to="/login" />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
