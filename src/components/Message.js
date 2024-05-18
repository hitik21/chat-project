// Message.js
import React from 'react';
import './Message.css'; 

const Message = ({ message }) => {
  const isOwnMessage = message.user === '';

  const formattedTimestamp = new Date(message.timestamp).toLocaleString();

  return (
    <div className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}>
      <div className="message-content">
        {message.message}
      </div>
      <div className="message-details">
        <span className="message-user">{isOwnMessage ? 'You' : message.user}</span>
        <span className="message-timestamp">{formattedTimestamp}</span>
      </div>
    </div>
  );
};

export default Message;
