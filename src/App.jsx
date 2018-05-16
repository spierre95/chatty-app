import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state =  {
      loading:true,
      currentUser: {name: "Bob"},
      messages:[],
      notification:{
        type:"",
        content:""
      }
    }
    this.addMessage = this.addMessage.bind(this)
  }

  addMessage = (newMessage) => {
    const messageObj = {
      username: this.state.currentUser.name,
      content: newMessage,
      type:"postMessage"
    }
    this.socket.send(JSON.stringify(messageObj));
    console.log(this.state)
  }

  addUsername = (newUser) => {
    const notification = {
      type:'postNotification',
      content:`${this.state.currentUser.name} has changed their username to ${newUser}`
    }
    this.setState({currentUser:{name:newUser}})
    this.socket.send(JSON.stringify(notification));
  }


// App.js
componentDidMount() {
  console.log("componentDidMount <App />");
  this.socket = new WebSocket("ws://localhost:3001");

  this.socket.onopen = (event) => {
    console.log("Connected to server");
  };

  this.socket.onmessage = (event) => {
    console.log(event);
    // The socket event data is encoded as a JSON string.
    // This line turns it into an object
    const data = JSON.parse(event.data);
    switch(data.type) {
      case "incomingMessage":
      const messages = this.state.messages.concat(data)
      this.setState({messages:messages})
        break;
      case "incomingNotification":
      this.setState({notification:{type:"incomingNotification",content:data.content}})
      console.log(this.state.notification.type)
      console.log(this.state.notification.content)

        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
  };

  setTimeout(() => {
      this.setState({loading:false})
    }, 3000)
}


  render() {
   if(this.state.loading){
    return (<h1>Loading...</h1>)
   } else {
    return(
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages} notification = {this.state.notification}/>
        <Chatbar currentUser = {this.state.currentUser.name} addMessage = {this.addMessage} addUsername = {this.addUsername} />
      </div>
    )
   }
 }
}

export default App;







