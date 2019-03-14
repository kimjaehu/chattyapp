import React, { Component } from 'react';

class Message extends Component {
  render() {
    if (this.props.message.type === "incomingMessage") {
    return (
      <div className="message">
        <span className={`message-username${this.props.userClass.number}`}>{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    );
    } else if (this.props.message.type === "incomingNotification") {
      return (
        <div className = "message system">{this.props.message.content}</div>
      )
    } else {
      return null
    }
  }
}
export default Message;