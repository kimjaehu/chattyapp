import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input 
          defaultValue = {this.props.currentUser.name}
          className="chatbar-username" 
          placeholder={"Your Name (Optional)"} 
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
    if (e.key === 'Enter') {
      this.props.handleMessage(e.target.value)
      e.target.value = ""
    }
  }

}
export default ChatBar;