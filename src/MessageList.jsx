import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends React.Component {

  render() {

    const renderMessages = this.props.messages.map((message)=>{
     return (<Message currentUser ={message.username} message = {message.content} key={message.key}/>)
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
