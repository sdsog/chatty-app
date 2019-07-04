import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
  }


  

  render() {
    if (this.props.username) {
      return (
        <div>
          <div className='row message-rows'>
            <div className='col username-col'>
              <p className='username align-middle'>
                <span className='username-style'>{this.props.username}</span>{" "}
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
    } else {
      return <div className='message system'> {this.props.content}</div>;
    }
  }
}

export default Message;
