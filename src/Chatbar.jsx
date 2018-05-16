import React, {Component} from 'react';

class Chatbar extends Component {

handleKeyPress = (evt) => {
  if(evt.key == 'Enter'){
    const message = evt.target.value
    this.props.addMessage(message)
    evt.target.value = ""

  }

}

  render() {
    return (
<footer className="chatbar">
  <input className="chatbar-username" placeholder={this.props.currentUser} name ="name" />
  <input className="chatbar-message" placeholder="Type a message and hit ENTER"
  name="message" onKeyPress= {this.handleKeyPress}/>
</footer>);
  }
}

export default Chatbar


