import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends React.Component {

  render() {
    const renderMessages = this.props.messages.map((message)=>{
     return (<Message currentUser ={message.username} message = {message.content} key={message.key}/>)
   })

    if(this.props.notification.type == "incomingNotification" ){
      return (<div className="notification">
        <span className="notification-content">{this.props.notification.content}</span>
        </div>)
    }else{
   return (
    <div>
      <main className="messages">
      {renderMessages}
      </main>
   </div>)
 }
 }
}

export default MessageList;


