import React from "react";
import Chat from "../Chat/Chat";

import "./Chats.css";
const Chats = ({ messages, onLike }) => {
  function renderChats() {
    if (messages.length <= 0) return <span>No Messages</span>;

    return messages.map(message => (
      <Chat message={message} key={message._id} onLike={onLike} />
    ));
  }

  return (
    <div className="card rounded chat-space h-75 mt-4 mr-2 ml-2 p-3">
      {renderChats()}
    </div>
  );
};

export default Chats;
