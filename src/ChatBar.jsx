import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input 
          className="chatbar-username" 
          placeholder={this.props.currentUser.name} 
          onKeyPress={this.handleKeyPress}
        />
        <input
          onKeyPress={this.handleKeyPress}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER" 
        />
      </footer>
    );
  }

  //triggers when user presses the enter key
  handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.className === "chatbar-message") {
      this.props.handleMessage(e.target.value)
      e.target.value = ""
    } else if (e.key === 'Enter' && e.target.className === "chatbar-username") {
      console.log(e.target.value)
      this.props.handleChange(e.target.value ? e.target.value : 'anonymous')
    }
  }
}
export default ChatBar;