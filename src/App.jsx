import React, { Component } from "react";
import ChatBar from "./components/ChatBar.jsx";
import MessageList from "./components/MessageList.jsx";
import Header from "./components/Header.jsx";
import Messages from "./fakedata.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: Messages,
      loading: true,
      currentUser: { name: "Bob" },
      online: 0,
    };
    this.onNewPost = this.onNewPost.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!",
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
  }

  onNewPost(newMessage) {
    console.log("this is message", newMessage);
    const message = this.state.messages.concat(newMessage);
    this.setState({ messages: message });
  }

  render() {
    // if (this.state.loading) {
    //   return <h1>Loading...</h1>;
    // } else {
    return (
      <div>
        <Header />
        <MessageList messages={this.state.messages} />
        <ChatBar onNewPost={this.onNewPost} />
      </div>
    );
    // }
  }
}

export default App;
