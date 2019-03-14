import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-count">{this.props.userTracker.counter === 1 ? 'user online: ' : 'users online : '}{this.props.userTracker.counter}</span>
      </nav>
    );
  }
}
export default NavBar;