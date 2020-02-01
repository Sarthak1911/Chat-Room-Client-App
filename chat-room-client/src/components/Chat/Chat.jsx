import React from "react";
import moment from "moment";
import { getToken } from "../../services/user";
import "./Chat.css";
const Chat = ({ message, onLike }) => {
  const { _id, username, message: msg, date } = message;

  function isSameUser() {
    const username = getToken("username");

    const { username: usrName } = message;

    return username === usrName;
  }

  function alreadyLiked() {
    const username = getToken("username");
    return message.likes.includes(username);
  }

  return (
    <div
      className={
        "chat-box card shadow-sm w-auto mt-2 mb-2 " +
        (isSameUser() ? "bg-success text-light" : "")
      }
    >
      <div className="card-body">
        <div>{username}</div>
        <div>
          <span>"{msg}"</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <span>{moment(date).format("YYYY-MM-DD HH:MM")}</span>
          {!isSameUser() &&
            (alreadyLiked() ? (
              <span>LIKED</span>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  onLike(_id);
                }}
              >
                LIKE
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
