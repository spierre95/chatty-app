
import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state =  {
      loading:true,
      currentUser: {name: "Bob", color :null},
      messages:[],
      usersOnline:0,
      image_url:null
    }

    this.addMessage = this.addMessage.bind(this)

  }

  addMessage = (newMessage) => {
    const messageObj = {
      username: this.state.currentUser.name,
      color:this.state.currentUser.color,
      content: newMessage,
      notification:{type:"postMessage"}
    }
    console.log(messageObj)
    this.socket.send(JSON.stringify(messageObj));
    console.log(this.state)
  }

  addUsername = (newUser) => {
    const updateUser = {
      notification:{
      type:'postNotification',
      content:`${this.state.currentUser.name} has changed their username to ${newUser}`},
      user:{name:newUser, color:this.state.currentUser.color}
    }
    this.socket.send(JSON.stringify(updateUser));
  }


// App.js
componentDidMount() {
  console.log("componentDidMount <App />");
  this.socket = new WebSocket("ws://localhost:3001");

  this.socket.onopen = (event) => {
    console.log("Connected to server");
  };

  this.socket.onmessage = (event) => {

    const data = JSON.parse(event.data);

    console.log(data.notification)
    console.log(data.user)

    switch(data.notification.type) {
      case "incomingMessage":
      const messages = this.state.messages.concat(data)
      console.log(data.image_url)
      this.setState({messages:messages})
        break;
      case "incomingNotification":
      const notifications = this.state.messages.concat(data.notification)
      const newUser = data.user
      console.log(newUser)
      this.setState({messages:notifications, currentUser:newUser, usersOnline:newUser.numberOfUsers})
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.notification.type);
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
          <div className = "users-counter">users online: {this.state.usersOnline}</div>
        </nav>
        <MessageList messages = {this.state.messages}/>
        <Chatbar currentUser = {this.state.currentUser.name} addMessage = {this.addMessage} addUsername = {this.addUsername} />
      </div>
    )
   }
 }
}

export default App;







