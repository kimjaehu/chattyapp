import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userColour: {colour: '#008744'},
      userTracker: {counter: 0},
      currentUser: {name: "anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
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

      switch(newMessage.type) {
        case 'user tracker':
          let userCount = {counter:newMessage.numberOfUsers}
          this.setState({userTracker: userCount})
            break;
        case 'user colour':
          let userColour = {colour: newMessage.userColour}  
          this.setState({userColour: userColour})
            break;
        
        case 'incomingMessage':
        case 'incomingNotification':
        case 'incomingImage':
      
          const messages = this.state.messages.concat(newMessage)
          this.setState({messages:messages})
            break;
      }
    })
  }
  
  //handle input messages from NavBar where content is passed to the function
  messageHandler = (content) => {
    const regexp = /\.(jpeg|jpg|gif|png)$/;
    let type = ''
    if(content.match(regexp)){
      type = 'postImage'
    } else {
      type = 'postMessage'
    }
    const newMessage = {
      type: type,
      username: this.state.currentUser.name,
      content: content,
      colour: this.state.userColour
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

  render() {
    return (
        <div>
          <NavBar userTracker={this.state.userTracker} />
          <ChatBar currentUser={this.state.currentUser} handleMessage = {this.messageHandler} handleChange = {this.usernameHandler} />
          <MessageList messages={this.state.messages}/>
        </div>
    );
  }  
}

export default App;