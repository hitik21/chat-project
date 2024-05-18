import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createChat, deleteChat, currentChat } from '../actions';
import './ChatList.css'; 

const ChatList = ({ chats, createChat, deleteChat, currentChat }) => {
  const [username, setUsername] = useState('');

  const handleCreateChat = () => {
    if (username.trim()) {
      const chatId = username;
      createChat(chatId, username);
      setUsername('');
    }
  };

  const handleDeleteChat = (chatId) => {
    deleteChat(chatId);
  };

  const handleCurrentChat = (chatId) => {
    currentChat(chatId);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateChat();
    }
  };

  return (
    <div className="chat-list">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress} 
        placeholder="Enter username"
      />
      <button onClick={handleCreateChat}>Create Chat</button>
      <ul>
        {Object.keys(chats).map((chatId) => (
          <div className="chat-item" key={chatId}>
            <li style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <img src={`https://picsum.photos/50?random=${chatId}`} alt="Profile Pic" className="profile-pic" />
              <span className="participant-name">Chat with {chatId}</span>
              <div className="buttons">
                <button
                  className="open-chat-btn"
                  onClick={() => handleCurrentChat(chatId)}
                >
                  Open Chat
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteChat(chatId)}
                >
                  Delete
                </button>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  chats: state.chat.chats,
});

const mapDispatchToProps = {
  createChat,
  deleteChat,
  currentChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
