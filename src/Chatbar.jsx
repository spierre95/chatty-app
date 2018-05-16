import React, {Component} from 'react';

class Chatbar extends Component {

handleKeyPressMessage = (evt) => {
  if(evt.key == 'Enter'){

    const message = evt.target.value
    const name = evt.target.value
    this.props.addMessage(message)
    evt.target.value = ""

  }
}

handleKeyPressUser = (evt) => {
  if(evt.key == 'Enter'){
    const name = evt.target.value
    this.props.addUsername(name)
    evt.target.value = ""

  }
}

  render() {
    return (
<footer className="chatbar">
  <input className="chatbar-username" placeholder={this.props.currentUser} name ="name" onKeyPress= {this.handleKeyPressUser} />
  <input className="chatbar-message" placeholder="Type a message and hit ENTER"
  name="message" onKeyPress= {this.handleKeyPressMessage}/>
</footer>);
  }
}

export default Chatbar


