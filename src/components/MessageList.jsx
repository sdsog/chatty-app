import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => {
      
      return (
        <Message
          type={message.type}
          key={message.id}
          username={message.username}
          content={message.content}
        />
      );
    });

    return <main className="row message-list m-0">{messages}</main>;
  }
}

export default MessageList;
