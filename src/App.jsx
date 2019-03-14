import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTracker: {counter: 0},
      userColour: {number: 1},
      currentUser: {name: "anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
      ]
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    //websocket connection to localhost:3001
    
    this.socket = new WebSocket("ws://localhost:3001")

    this.socket.addEventListener('open', (event) => {
      this.socket.send(JSON.stringify(this.state))
      console.log('Connected to server')
    })
    
    this.socket.addEventListener('message', (event) => {
      let newMessage = JSON.parse(event.data)
    
      if (newMessage.type === "userTracker") {
        let userCount = {counter:newMessage.numberOfUsers}
        this.setState({userTracker: userCount})
      }

      const messages = this.state.messages.concat(newMessage)
      this.setState({messages:messages})
    })
  }
  
  render() {
    return (
        <div>
          <NavBar userTracker={this.state.userTracker} />
          <ChatBar currentUser={this.state.currentUser} userClass={this.state.userColour} handleMessage = {this.messageHandler} handleChange = {this.usernameHandler} />
          <MessageList messages={this.state.messages} userClass={this.state.userColour}/>
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