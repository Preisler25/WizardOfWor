const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        socket.send(data);
    });
});

http.listen(3000, () => {
    console.log('Server is running on port 3000');
});