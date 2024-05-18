import React from 'react';
import ChatList from './components/ChatList';
import AllChats from './components/AllChats';
import './App.css'; 

function App() {
  return (
    <div className="app">
      <ChatList />
      <AllChats />
    </div>
  );
}

export default App;
