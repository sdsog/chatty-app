import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    return (
      <div className="chat-bar">
        <form>
          <input
            type="text"
            placeholder="Your Name (Optional)"
            className="name-box"
          />
        </form>
        <form>
          <input
            type="text"
            placeholder="Type a message and hit ENTER"
            className="message-box"
          />
        </form>
      </div>
    );
  }
}

export default ChatBar;
