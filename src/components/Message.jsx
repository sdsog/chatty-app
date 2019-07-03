import React, { Component } from 'react';

class Message extends Component {
  render() {
    // const messages = this.props.messages.map(message => {
    //   return (
    //     <Message
    //       key={messages.id}
    //       type={messages.type}
    //       content={messages.content}
    //       username={messages.username}
    //     />
    //   );
    // });

    return (
      <div className="row w-100">
        <div className="col-4">
          <p className="username">{this.props.username}</p>
        </div>
        <div className="col-8">
          <p className="message">{this.props.content}</p>
        </div>
      </div>
    );
  }
}

export default Message;
