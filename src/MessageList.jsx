import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends React.Component {

  render() {
    const renderMessages = this.props.messages.map((message)=>{
    if(this.props.messages.type == "incomingNotification" ){
        (<div className="notification">
        <span className="notification-content">{this.props.messages.content}</span>
        </div>)
    }
     return (<Message currentUser ={message.username} color ={message.color} message = {message.content} key={message.key}/>)
   })
   return (
    <div>
      <main className="messages">
      {renderMessages}
      </main>
   </div>)
 }
}

export default MessageList;


