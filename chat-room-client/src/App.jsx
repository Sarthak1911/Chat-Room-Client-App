import React from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/NotFound/NotFound";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app-container">
      <ToastContainer />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/register" exact component={Register} />
        <Route path="/not-found" exact component={Notfound} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
