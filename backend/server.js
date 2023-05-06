const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('move', function(msg) {
    console.log('message: ' + msg);
    io.emit('move', msg);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
