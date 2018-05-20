
import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state =  {
      loading:true,
      currentUser: {name: "Anonymous", color :null},
      messages:[],
      usersOnline:0,
      image_url:null
    }

    this.addMessage = this.addMessage.bind(this)
    this.addUsername = this.addUsername.bind(this);

  }

  addMessage = (newMessage) => {
    const messageObj = {
      username: this.state.currentUser.name,
      color:this.state.currentUser.color,
      content: newMessage,
      notification:{type:"postMessage"}
    }

    this.socket.send(JSON.stringify(messageObj));

  }

  addUsername = (newUser) => {
    const updateUser = {
      notification:{
      type:'postNotification',
      content:`${this.state.currentUser.name} has changed their username to ${newUser}`},
    }
    const user = {name:newUser, color:this.state.currentUser.color}
    this.setState({ currentUser: user});
    this.socket.send(JSON.stringify(updateUser));
  }

componentDidMount() {
  this.socket = new WebSocket("ws://localhost:3001");

  this.socket.onopen = (event) => {

  };

  this.socket.onmessage = (event) => {

    const data = JSON.parse(event.data);

    switch(data.notification.type) {
      case "incomingMessage":
      const messages = this.state.messages.concat(data)
      this.setState({messages:messages})
        break;
      case "incomingNotification":
      const notifications = this.state.messages.concat(data.notification)
      this.setState({messages:notifications, currentUser:{name:this.state.currentUser.name, color:data.color}, usersOnline:data.numberOfUsers})
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