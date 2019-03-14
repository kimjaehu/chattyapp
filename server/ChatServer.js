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
  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(data);
    }
  });
};

//stores username color assignment
let userIndex = 1
const colourGroup = ['#008744','#0057e7','#d62d20','#ffa700']

//find usercolour.username1

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected.');

  // connected client information display to chat screen
    const message = `User has entered the chatroom`
    const userConnect = {
      type: 'incomingNotification',
      id: uuid(),
      username:'system',
      content: message 
    }
    wss.broadcastJSON(userConnect)

  // tracks the number of users entering the chatroom using wss.clients.size

  const userTracker = {
    type: 'user tracker',
    numberOfUsers: wss.clients.size
  }

  //Assigns user colour based on the index
  if (userIndex < 4) {
    userIndex = userIndex + 1
  } else {
    userIndex = 1
  }

  const userColour = {
    type: 'user colour',
    userColour: colourGroup[userIndex]
  }

  ws.send(JSON.stringify(userColour))

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
      case 'postImage':
          type = 'incomingImage'
        break;
    }

    const newMessage = {
      type: type,
      id: uuid(),
      username: message.username,
      content: message.content,
      colour: message.colour
    }

    wss.broadcastJSON(newMessage)
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    const userTracker = {
      id: uuid(),
      type: 'userTracker',
      numberOfUsers: wss.clients.size
    }
    
    wss.broadcastJSON(userTracker)
  });
});