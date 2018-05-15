import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
   return(<div><nav className="navbar">
  <a href="/" className="navbar-brand">Chatty</a>
</nav><MessageList/><Chatbar/></div>)
}
}

export default App;
