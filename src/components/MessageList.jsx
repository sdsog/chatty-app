import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const allMessages = this.props.messages.map(function(messages, i) {
      if ((messages.type = 'incomingMessage')) {
        return (
          <Message
            username={messages.username}
            content={messages.content}
            key={messages.id}
          />
        );
      } else {
        return <Message content={messages.content} key={i} />;
      }
    });
    return (
      <main className='messages'>
        <div id='message-list'>{allMessages}</div>
        <div
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </main>
    );
  }
}
export default MessageList;
