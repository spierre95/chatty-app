import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state =  {
  loading:true,
  currentUser: {name: "Bob"},
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
      key:1
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      key:2
    }
  ]
}
}
  componentDidMount() {
    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({loading:false});
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
        <Chatbar currentUser = {this.state.currentUser} />
      </div>
    )
   }
 }
}

export default App;



