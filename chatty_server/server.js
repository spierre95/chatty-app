// server.js
const uuidv4 = require('uuid/v4');
const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;



// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
      client.send(data);
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.broadcast(JSON.stringify({numberOfUsers:wss.clients.size}))
ws.on('message', function incoming(data) {
  const postData = JSON.parse(data)
  if(postData.type == "postMessage"){
    postData['key'] = uuidv4();
    postData.type = "incomingMessage"
    wss.broadcast(JSON.stringify(postData))
  } else if(postData.type == "postNotification"){
    postData['key'] = uuidv4();
    postData.type = "incomingNotification"
    wss.broadcast(JSON.stringify(postData))
  }

});


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});







