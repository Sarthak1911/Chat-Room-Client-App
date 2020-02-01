import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Form from "./../Form/Form";
import { login, setToken } from "../../services/user";

class Login extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "",
        password: ""
      },
      errors: {}
    };
  }

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password")
  };

  doSubmit = async () => {
    const { data: user } = this.state;
    const token = "x-auth-token";
    try {
      //Call the login method
      const response = await login(user);
      const jwt = response.headers[token];
      setToken(jwt);

      //Navigate to chat-room
      this.props.history.replace("/chat-room");
    } catch (error) {
      const { data, status } = error.response;

      if (status === 400) {
        const errors = { ...this.state.errors };
        errors.username = data.error;
        this.setState({ errors });
        return;
      }
      toast.error("Something went wrong");
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form className="card shadow rounded col-lg-3 col-md-4 col-sm-8 p-4 m-4">
          <h2>Login</h2>
          {this.renderInput("username", "text", "Username")}
          {this.renderInput("password", "password", "Password")}
          {this.renderSubmitButton("Login")}
          <div className="text-center mt-2">
            <Link to="/register">Register here</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
