import React, { Component } from 'react';

class ChatBar extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      user: '',
      previous_user: '',
    };

    this.onPost = this.onPost.bind(this);
  }

  onPost(event) {
    if (event.key === 'Enter') {
      this.setState({ message: event.target.value }, function() {
        this.props.onNewPost({
          type: 'postMessage',
          username: this.state.user || 'Anonymous',
          content: this.state.message,
        });
      });
      event.target.value = '';
    }
  }

  render() {
    return (
      <footer className="row m-0 align-items-end">
        <div className="col">
          <div className="form-group">
            <input
              type="text"
              placeholder="Type a message and hit ENTER"
              className="message-box form-control"
              onKeyPress={this.onPost}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name (Optional)"
              className="name-box form-control"
            />
          </div>
        </div>
      </footer>
    );
  }
}

export default ChatBar;
