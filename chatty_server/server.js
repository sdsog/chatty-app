// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', socket => {
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };
  
  socket.on('message', function incoming(message) {
    const incomingMessage = JSON.parse(message);
    if ((incomingMessage.type = 'postMessage')) {
      incomingMessage.id = uuidv1();
      incomingMessage.type = 'incomingMessage';
      wss.broadcast(JSON.stringify(incomingMessage));
      wss.broadcast(
        JSON.stringify({
          id: uuidv1(),
          type: 'onlineStatus',
          status: wss.clients.size
        })
      );
    } else {
      incomingMessage.type = 'incomingNotification';
      wss.broadcast(JSON.stringify(incomingMessage));
      wss.broadcast(
        JSON.stringify({
          id: uuidv1(),
          type: 'onlineStatus',
          status: wss.clients.size
        })
      );
    }
  });

  wss.broadcast(
    JSON.stringify({
      id: uuidv1(),
      type: 'onlineStatus',
      status: wss.clients.size
    })
  );

  socket.on('close', () => console.log('Client disconnected'));
});
