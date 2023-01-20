const socket = io('ws://localhost:3000');

socket.on('connect', () => {
    console.log('connected');
});
socket.on('message', (data) => {
    console.log(data);
});

addEventListener('keydown', (e) => {
    socket.emit('message', e.key);
});