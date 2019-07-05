// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
// For unique ID generation
const uuidv1 = require('uuid/v1');

const PORT = 3001;

// New Server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  );

// New Web Socket
const wss = new SocketServer({ server });

// Connects websocket to all connected and ready clients
wss.on('connection', socket => {
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };

  // Parses incoming messages and notications
  socket.on('message', function incoming(message) {
    const incomingMessage = JSON.parse(message);

    // If MESSAGES, assigns unique ID, then broadcasts to all connected clients and checks connected user count
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
      // If NOTIFICATION, assigns unique ID and broadcasts to all connected clients and checks connected user count
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
