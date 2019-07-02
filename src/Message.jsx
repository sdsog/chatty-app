import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message-list">
        <div className="message-sender">
          <p className="username">Anonymous2</p>
        </div>
        <div className="message" />
      </div>
    );
  }
}

export default Message;