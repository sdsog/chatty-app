import React, { Component } from "react";
const randomColor = require("randomcolor");

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      user: "",
      previousUser: "",
      userColor: ""
    };

    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
      previousUser: this.props.user,
      userColor: randomColor()
    });
  }

  updateUsername(event) {
    this.setState({ previousUser: this.state.user });
    if (
      this.state.previousUser !== event.target.value &&
      event.target.value !== ""
    ) {
      this.setState({ user: event.target.value }, function() {
        this.props.onNameChange({
          type: "postNotification",
          content:
            '! "' +
            this.state.previousUser +
            '" changed their username to "' +
            this.state.user +
            '" !'
        });
        this.setState({
          previousUser: this.state.user,
          userColor: randomColor()
        });
      });
    }
  }

  onNameChange(event) {
    //sets initial state to current user // default: annonymous
    this.setState({ previousUser: this.state.user });
    //checks to see if previous user does not equal the new name
    if (
      event.key === "Enter" &&
      this.state.previousUser !== event.target.value
    ) {
      //if previous user is unique
      this.setState({ user: event.target.value }, function() {
        // sends notification MessageList
        this.props.onNameChange({
          type: "postNotification",
          content:
            '! "' +
            this.state.previousUser +
            '" changed their username to "' +
            this.state.user +
            '" !'
        });
        // sets previous user to new user value to prevent multiple changes of same value
        this.setState({
          previousUser: this.state.user,
          userColor: randomColor()
        });
      });
    }
  }

  onNewMessage(event) {
    // when user presses enter
    if (event.key === "Enter") {
      // message created and value sent to App.jsx
      this.setState({ message: event.target.value }, function() {
        this.props.onNewPost({
          type: "postMessage",
          username: this.state.user || "Anonymous",
          content: this.state.message
        });
      });
      // resets message box to blank string
      event.target.value = "";
    }
  }

  render() {
    return (
      <footer className='row m-0 align-items-end'>
        <div className='col'>
          <div className='form-group'>
            <input
              placeholder='Type a message and hit ENTER'
              className='message-box form-control'
              onKeyPress={this.onNewMessage}
            />
          </div>
          <div className='form-group'>
            <input
              placeholder='Your Name (Optional)'
              className='name-box form-control'
              onBlur={this.updateUsername}
              onKeyPress={this.onNameChange}
            />
            <p className='change-name'>
              &uarr; Update your username here &uarr;
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default ChatBar;
