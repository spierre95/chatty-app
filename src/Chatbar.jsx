import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    return (<footer className="chatbar">
  <input className="chatbar-username" placeholder={this.props.currentUser.name} />
  <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
</footer>);
  }
}

export default Chatbar;