import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  // Automatically scrolls up messages when bottom is reached
  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  // Checks to see if new messages are at the bottom of div with each new one posted
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {

    const allMessages = this.props.messages.map(function(messages) {
      // If message is incoming, sends data to MESSAGE Component
      if ((messages.type = "incomingMessage")) {
        return (
          <Message
            username={messages.username}
            content={messages.content}
            key={messages.id}
            color={messages.color}
          />
        );
        // If not MESSAGE, sends as NOTIFICATION
      } else {
        return <Message content={messages.content} key={messages.id} />;
      }
    });
    return (
      <main className='messages'>
        <div id='message-list'>{allMessages}</div>
        <div
          // Checks to see if end of message box and scrolls up automatically
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </main>
    );
  }
}
export default MessageList;
