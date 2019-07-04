import React, { Component } from 'react';

class ChatBar extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      user: '',
      previous_user: ''
    };

    this.onPost = this.onPost.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  onPost(event) {
    // when user presses enter
    if (event.key === 'Enter') {
      // message created and value sent to App.jsx
      this.setState({ message: event.target.value }, function() {
        this.props.onNewPost({
          type: 'postMessage',
          username: this.state.user || 'Anonymous',
          content: this.state.message
        });
      });
      // resets message box to blank string
      event.target.value = '';
    }
  }

  onNameChange(event) {
    //sets initial state to current user // default: annonymous
    this.setState({ previous_user: this.state.user });
    //checks to see if previous user does not equal the new name
    if (
      event.key === 'Enter' &&
      this.state.previous_user !== event.target.value
    ) {
      //if previous user is unique
      this.setState({ user: event.target.value }, function() {
        // sends notification MessageList
        this.props.onNameChange({
          type: 'postNotification',
          content:
            this.state.previous_user +
            ' changed their name to ' +
            this.state.user
        });
        // sets previous user to new user value to prevent multiple changes of same value
        this.setState({ previous_user: this.state.user });
      });
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
              onKeyPress={this.onPost}
            />
          </div>
          <div className='form-group'>
            <input
              placeholder='Your Name (Optional)'
              className='name-box form-control'
              onBlur={this.onUsername}
              onKeyPress={this.onNameChange}
              defaultValue={this.props.user}
            />
          </div>
        </div>
      </footer>
    );
  }
}

export default ChatBar;
