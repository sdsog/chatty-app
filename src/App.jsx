import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class Header extends Component {
  render() {
    return (
      <div className="header-bar">
        <h1>Chatty</h1>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MessageList />
        <ChatBar />
      </div>
    );
  }
}
export default App;
