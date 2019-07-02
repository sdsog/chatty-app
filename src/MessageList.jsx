import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div className="message-list">
        <div className="message-sender">
          <p className="username">Anonymous2</p>
        </div>
        <div className="message">
        <p className="message">Anonymous2</p>
        </div>
      </div>
    );
  }
}

export default MessageList;
