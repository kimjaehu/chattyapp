import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {
          this.props.messages.map((message) => {
            return <Message key={message.id} message={message} userClass={this.props.userClass}/>
          })
        }
      </main>  
    );
  }
}
export default MessageList;