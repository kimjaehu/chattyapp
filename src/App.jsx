import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        // {
        //   id: 1,
        //   username: "Bob",
        //   content: "Has anyone seen my marbles?",
        // },
        // {
        //   id: 2,
        //   username: "Anonymous",
        //   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        // },

        // system comment handling
        // {
        //   id:4,
        //   username: "",
        //   content: "Anonymous1 changed their name to nomnom."
        // }
      ]
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);

    //websocket connection to localhost:3001
    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.addEventListener('open', (event) => {
      console.log('Connected to server')
    })

    this.socket.addEventListener('message', (event) => {
    let newMessage = JSON.parse(event.data)
    console.log('event.data parsed',newMessage)
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages:messages})
    console.log('this',this)
    })
  }
  
  render() {
    console.log('render state',this.state)
    return (
        <div>
          <NavBar />
          <ChatBar currentUser={this.state.currentUser} handleMessage = {this.messageHandler} handleChange = {this.usernameHandler} />
          <MessageList messages={this.state.messages} />
        </div>
    );
  }

  //handle input messages from NavBar where content is passed to the function
  messageHandler = (content) => {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: content
    }
    this.socket.send(JSON.stringify(newMessage))
  }

  usernameHandler = (name) => {
    if (this.state.currentUser.name != name) {
      const username = {
        name:name
      }
      this.setState({currentUser: username})
      
      const content = `${this.state.currentUser.name} has changed their name to ${name}`
      const newNotification = {
        type: 'postNotification',
        username: 'system',
        content: content
      }
      this.socket.send(JSON.stringify(newNotification))
    }
  }
}

export default App;