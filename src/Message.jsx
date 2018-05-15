import React, {Component} from 'react';

class Message extends React.Component {
  render() {
    return (
  <div className="message">
    <span className="message-username">{this.props.currentUser}</span>
    <span className="message-content" key='{this.props.key}'>{this.props.message}</span>
  </div>)
}
}

export default Message;


