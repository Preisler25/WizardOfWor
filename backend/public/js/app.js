const socket = io('ws://localhost:3000');

socket.on('connect', () => {
    socket.emit('message', 'Hello from client');
});
socket.on('message', (data) => {
    console.log(data);
});