const express = require('express');
const SocketServer = require('ws').Server;
// import {uuidv1} from 'uuid/v1';
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcastJSON = obj => wss.broadcast(JSON.stringify(obj));

//broadcast to all clients
wss.broadcast = data => {
  wss.clients.forEach(ws => {
    if (ws.readyState === ws.OPEN) {
      ws.send(data);
    }
  });
};

//stores username color assignment
const colourGroup = ['#008744','#0057e7','#d62d20','#ffa700']

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected.');
  
  //to be worked on:
  //client connection information display to chat screen
  //*************************************************** */
  // ws.on('message', (message) => {
  //   console.log('initial received', JSON.parse(message))
  //   message = JSON.parse(message)
  //   message = `User: ${message.currentUser.name} has entered the chatroom`
  //   const currentUser = {
  //     type: 'incomingNotification',
  //     id: uuid(),
  //     username:'system',
  //     content: message 
  //   }
  //   console.log('currentUser', currentUser);
  //   wss.broadcastJSON(currentUser)
  // })
  //*************************************************** */

  // tracks the number of users entering the chatroom using wss.clients.size

  const userTracker = {
    type: 'userTracker',
    id: uuid(),
    numberOfUsers: wss.clients.size
  }
  wss.broadcastJSON(userTracker)

  ws.on('message', (message) => {
    console.log('received', JSON.parse(message))
    message = JSON.parse(message)
    
    let type = ''

    switch(message.type) {
      case 'postMessage':
          type = 'incomingMessage'
        break;
      case 'postNotification':
          type = 'incomingNotification'
        break;
    }

    const newMessage = {
      type: type,
      id: uuid(),
      username: message.username,
      content: message.content
    }

    wss.broadcastJSON(newMessage)
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    const userTracker = {
      type: 'userTracker',
      numberOfUsers: wss.clients.size
    }
    wss.broadcastJSON(userTracker)
  });
});