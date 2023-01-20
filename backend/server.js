const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');

const main = require('./modules/main');

const { Client } = require('pg');
const client = new Client({host: 'localhost',port: 5432,database: 'test',user: 'postgres',password: 'admin'});
client.connect();

app.set('viewengine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'views', 'index.ejs'));
});

io.on('connection', (socket) => {
    let map = main.genGame();
    socket.on('message', (data) => {
        main.movePlayer(data, map);
    });
});


http.listen(3000, () => {
    console.log('Server is running on port 3000');
});