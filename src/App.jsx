import React, { Component } from 'react';
import ChatBar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';
import Header from './components/Header.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      currentUser: { name: 'Bob' },
      online: 0,
    };

    this.onNewPost = this.onNewPost.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = event => {
      console.log('Connected to server');
    };

    this.socket.onmessage = event => {
      const receivedMessage = JSON.parse(event.data);
      if ((receivedMessage.type = 'onlineStatus')) {
        this.setState({ online: Number(receivedMessage.status) });
      }
      const newMessage = this.state.messages.concat(receivedMessage);
      this.setState({ messages: newMessage });
    };
  }

  onNewPost(newMessage) {
    this.socket.send(JSON.stringify(newMessage));
  }

  onNameChange(newName) {
    this.socket.send(JSON.stringify(newName));
  }

  render() {
    return (
      <div>
        <Header online={this.state.online} />
        <MessageList messages={this.state.messages} />
        <ChatBar onNewPost={this.onNewPost} onNameChange={this.onNameChange} />
      </div>
    );
  }
}

export default App;
