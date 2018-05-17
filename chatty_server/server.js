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

 const usersOnline = wss.clients.size


ws.on('message', function incoming(data) {

  const postData = JSON.parse(data)
  const regEx = (/(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/)
  const message = postData.content


  if(postData.notification.type == "postMessage"){

      console.log("postMessage",postData.notification.type)
      postData['key'] = uuidv4();

     if(regEx.test(message)){
        const messageArr = message.split(" ");
        console.log('before loop',messageArr)
        messageArr.forEach((value,index)=>{
          console.log('value',value)
          console.log('index',index)
          if(regEx.test(value)){
            postData['image_url'] = value;
            messageArr.splice(index,1)
            console.log('after loop',messageArr);
          }
        })
        const content = messageArr.join(' ')
        postData.content = content;
      }

      console.log(postData);

      postData.notification.type = "incomingMessage"
      wss.broadcast(JSON.stringify(postData))

  } else if(postData.notification.type == "postNotification"){

      console.log('postNotification',postData.notification.type)

      postData.notification['key'] = uuidv4();
      postData.notification.type = "incomingNotification"
      postData.user['numberOfUsers'] = usersOnline
      console.log(postData.user)


    if(!postData.user.color){
      colors =['red','purple','blue','green']
      let randomNum = Math.floor(colors.length*Math.random());
      postData.user.color = colors[randomNum]
      colors.splice(randomNum, 1);
    }

    wss.broadcast(JSON.stringify(postData))
  }

});


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    wss.broadcast(JSON.stringify({numberOfUsers:wss.clients.size}))
  });
});




























