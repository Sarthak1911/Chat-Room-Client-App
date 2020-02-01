import React from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import Chats from "../Chats/Chats";
import Form from "../Form/Form";
import { getToken } from "../../services/user";
import { getMessages, likeMessage, postMessage } from "../../services/message";
import "./ChatRoom.css";
class ChatRoom extends Form {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      data: {
        message: ""
      },
      errors: {}
    };
  }

  schema = {
    message: Joi.string()
      .required()
      .label("Message")
  };

  async componentDidMount() {
    try {
      let messages = await getMessages();

      messages = messages.data;

      this.setState({ messages });
    } catch (error) {
      const { data, status } = error.response;

      if (status === 401) {
        toast.error(data.error);
        return;
      }

      if (status === 400) {
        toast.error(data.error);
        return;
      }

      toast.error("Something went wrong");
    }
  }

  handleLike = async _id => {
    const username = getToken("username");
    try {
      await likeMessage(_id, { username: username });
      let messages = await getMessages();

      messages = messages.data;

      this.setState({ messages });
    } catch (error) {
      toast.error("Something went wrong");
      return;
    }
  };

  handlePost = async () => {
    const { message } = this.state.data;
    const username = getToken("username");

    try {
      await postMessage(username, message);
      let messages = await getMessages();

      messages = messages.data;

      this.setState({ messages, data: { message: "" } });
    } catch (error) {
      toast.error("Something went wrong");
      return;
    }
  };

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  doSubmit = async () => {
    this.handlePost();
  };

  render() {
    const { messages } = this.state;

    return (
      <div className="chat-room-container">
        {/* Navbar */}
        <nav className="d-flex justify-content-between fixed-top bg-light p-4 shadow-sm">
          <div>
            <span className="h3">Chat Room</span>
          </div>
          <div className="d-flex align-items-center">
            <div className="mr-3">Hello, {getToken("username")}</div>
            <button className="btn btn-dark" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        </nav>
        {/* Chat Container */}
        <div className="d-flex justify-content-center align-items-center chat-container vh-100">
          <div className="container card shadow m-4 h-75 bg-light">
            <Chats messages={messages} onLike={this.handleLike} />
            <form className="mt-3 container d-flex justify-content-between">
              {this.renderInputNoLabel(
                "message",
                "text",
                "Start typing here..."
              )}
              <div className="ml-2">{this.renderSubmitButton("Send")}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
