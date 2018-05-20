const uuidv4 = require('uuid/v4');
const express = require('express');
const SocketServer = require('ws').Server;
const fetch = require('node-fetch');
const querystring = require('querystrings');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
// Make the express server serve static assets (html, javascript, css) from the /public folder
   .use(express.static('public'))
   .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  };

  ws.on('message', function incoming(data) {

    const usersOnline = wss.clients.size
    const postData = JSON.parse(data)
    const regEx = (/(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/)
    const regExGiphy = /^\/giphy (.+)$/
    const message = postData.content

    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    if(postData.notification.type == "postMessage"){

      // checks to see if there is an png jpg or gif
     if(regEx.test(message)){
      const messageArr = message.split(" ");
      postData['image_url'] = [];
      const contentArr = []
      messageArr.forEach((value,index)=>{
        if(value.match(regEx)){
          postData.image_url.push(value);
        }else{
          contentArr.push(value)
        }
      })
      const content = contentArr.join(' ')
      postData.content = content;
      postData.notification.type = "incomingMessage"

      wss.broadcast(JSON.stringify(postData))

      // giphy api
    }else if(regExGiphy.test(message)){

      let matches = message.match(regExGiphy)
      let qs = querystring.stringify({
        api_key: 'dc4dsGHOce3L60BgjeYercyZXVsg9L5k',
        tag: matches[1]
      });

      fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
      .then( res => {return res.json() })
      .then( json => {
        postData['image_url'] = []
        postData.image_url.push(json.data.image_url)
        postData.content = ""
        postData.notification.type = "incomingMessage"
        wss.broadcast(JSON.stringify(postData))
      })
    } else {
      postData.notification.type = "incomingMessage"
      postData['key'] = uuidv4();
      wss.broadcast(JSON.stringify(postData))
    }

  } else if(postData.notification.type == "postNotification"){

    postData.notification['key'] = uuidv4();
    postData.notification.type = "incomingNotification"
    postData['numberOfUsers'] = usersOnline
    postData['color'] = getRandomColor()

    wss.broadcast(JSON.stringify(postData))
  }

});

  ws.on('close', () => {
    console.log('Client disconnected')
    wss.broadcast(JSON.stringify({numberOfUsers:wss.clients.size}))
  });
});