import React, { Component } from 'react';
import ChatBar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';
import Header from './components/Header.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: 'Anonymous' },
      messages: [],
      online: 0
    };

    this.onNewPost = this.onNewPost.bind(this);
    this.onNameChange = this.onNameChange.bind(this);

  }

  
  componentDidMount() {
    //When APP mounts, creates new WebSocket connectio
    this.socket = new WebSocket('ws://localhost:3001');
    //handles incoming messages
    this.socket.onmessage = event => {
      const receivedMessage = JSON.parse(event.data);
      //updates online count for connected users 
      if ((receivedMessage.type = 'onlineStatus')) {
        this.setState({ online: Number(receivedMessage.status) });
      }
      //upates messages with new posts
      const newMessage = this.state.messages.concat(receivedMessage);
      this.setState({ messages: newMessage });
    };
  }

  //sends posted MESSAGES to websocket for broadcast
  onNewPost(content) {
    this.socket.send(JSON.stringify(content));
  }

  //sends NAME update to websocket for broadcast
  onNameChange(content) {
    this.socket.send(JSON.stringify(content));
  }

  render() {
    return (
      <div>
        <Header online={this.state.online} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          user={this.state.currentUser.name}
          onNewPost={this.onNewPost}
          onNameChange={this.onNameChange}
        />
      </div>
    );
  }
}
export default App;
