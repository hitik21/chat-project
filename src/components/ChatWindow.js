import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { closeChat, addMessage } from '../actions';
import Message from './Message'; 
import './ChatWindow.css';

const ChatWindow = ({ chatId, messages, onClose, onAddMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const endOfChatRef = useRef(null);

  const scrollToBottom = () => {
    endOfChatRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      onAddMessage(chatId, '', newMessage); 
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleClose = () => {
    onClose(chatId);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Chat with {chatId}</h2>
        <button className="close-button" onClick={handleClose}>×</button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={endOfChatRef}></div>
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          placeholder="Type your message..." 
          value={newMessage} 
          onChange={handleMessageChange} 
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { chatId } = ownProps;
  return {
    messages: state.chat.chats[chatId] || []
  };
};

const mapDispatchToProps = (dispatch) => ({
  onClose: (chatId) => dispatch(closeChat(chatId)),
  onAddMessage: (chatId, user, message) => dispatch(addMessage(chatId, user, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
