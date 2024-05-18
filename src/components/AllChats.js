import React from 'react';
import { connect } from 'react-redux';
import ChatWindow from './ChatWindow';

const AllChats = ({ openChats }) => {
  return (
    <div className="all-chats" style={{ position: 'fixed', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'row-reverse' }}>
      {openChats.map((chatId, index) => (
        <div key={chatId} style={{ marginRight: index > 0 ? '10px' : '0' }}>
          <ChatWindow chatId={chatId} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  openChats: state.chat.openChats
});

export default connect(mapStateToProps)(AllChats);
