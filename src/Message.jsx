import React, { Component } from 'react';

class Message extends Component {
  render() {
    console.log('message',this.props.message)
    if (this.props.message.type === 'incomingMessage') {
      return (
        <div className="message" style={{color: this.props.message.colour.colour}}>
          <span className={"message-username"}>{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      );
    } else if (this.props.message.type === 'incomingNotification') {
      return (
        <div className="message system">{this.props.message.content}</div>
      )
    } else if (this.props.message.type === 'incomingImage') {
      
      return (
        <div>
          <span className={"message-username"}>{this.props.message.username}</span>
          <img className="message-image" src={this.props.message.content}></img>
        </div>
      );
    } else {
      return null
    }
  }
}
export default Message;