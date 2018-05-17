import React, {Component} from 'react';

class Message extends React.Component {
  render() {
      const divStyle = {
        color: this.props.color
      };
      return(
          <div className="message">
          <span className="message-username" style = {divStyle}> {this.props.currentUser}</span>
          <span className="message-content" key={this.props.key}>{this.props.message}<br/><img src={this.props.image}/></span>
          </div>)
      }
    }

    export default Message;


