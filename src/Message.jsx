import React, {Component} from 'react';

class Message extends React.Component {
  render() {
      const divStyle = {
        color: this.props.color
      };

      const imgStyle ={
        width:'60%',
        height:'auto',
      }

      let renderImage = null;

      if(this.props.image) {
        renderImage = this.props.image.map((images)=>{
          return (<img style={imgStyle} src={images}/>)
        })
      }


      return(
          <div className="message">
          <span className="message-username" style = {divStyle}> {this.props.currentUser}</span>
          <span className="message-content" key={this.props.key}>{this.props.message}<br/><div>{renderImage}</div></span>
          </div>)
      }
    }

    export default Message;