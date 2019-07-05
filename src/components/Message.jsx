import React, { Component } from 'react';
const randomColor = require('randomcolor');

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userColor = { color: randomColor() };
    //if MESSAGE has username, post as message
    if (this.props.username) {
      return (
        <div>
          <div className='row message-rows'>
            <div className='col username-col'>
              <p className='username align-middle'>
                <span className='username-style' style={userColor}>
                  {this.props.username}
                </span>{' '}
                JUST SAID:
              </p>
            </div>
          </div>
          <div className='row message-rows'>
            <div className='col message-col'>
              <p className='message align-middle'>"{this.props.content}"</p>
            </div>
          </div>
        </div>
      );
      //if MESSAGE does not have a username, post as notification
    } else {
      return <div className='message system'> {this.props.content}</div>;
    }
  }
}

export default Message;
