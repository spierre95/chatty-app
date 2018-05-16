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
      messages:[]
    }
    this.addMessage = this.addMessage.bind(this)
  }

  addMessage = (newMessage) => {
    const messageObj = {
      username: this.state.currentUser.name,
      content: newMessage,
    }
    this.socket.send(JSON.stringify(messageObj));
    console.log(this.state)
  }




  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')
    this.socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data)
      console.log(this)
      const messages = this.state.messages.concat(newMessage)
      console.log(this.state.messages)
      this.setState({messages:messages})
    }

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
        <MessageList messages = {this.state.messages}/>
        <Chatbar currentUser = {this.state.currentUser.name} addMessage = {this.addMessage} />
      </div>
    )
   }
 }
}

export default App;







