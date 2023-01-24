const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');

const sqlfucntions = require('./modules/sqlfunctions');

const main = require('./modules/main');

/*

sqlfucntions.register(incom)
incom = {username, password, password2, email}

sqlfucntions.login(incom)
incom = {username, password}

*/



app.set('viewengine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'views', 'login.ejs'));
});

app.post('/login', (req, res) => {
    let incom = req.body;
    //sqlLogin
    sqlfucntions.login(incom).then((data) => {
        if (data) {
            res.render(path.join(__dirname, 'views', 'game.ejs'));
        } else {
            res.render(path.join(__dirname, 'views', 'login.ejs'));
        }
    });
});

app.post('/register', (req, res) => {
    let incom = req.body;
    //sqlRegister
    sqlfucntions.register(incom).then((data) => {
        if (data) {
            res.render(path.join(__dirname, 'views', 'game.ejs'));
        } else {
            res.render(path.join(__dirname, 'views', 'login.ejs'));
        }
    });
});

app.get('/game', (req, res) => {
    res.render(path.join(__dirname, 'views', 'index.ejs'));
});


io.on('connection', (socket) => {
    let map = main.genGame();
    socket.on('message', (data) => {
        main.movePlayer(data, map);
    });
    let game = setInterval(() => {       
        if (!map.ingame) {
            socket.send('gameover');
            console.log('gameover');
            clearInterval(game);
            clearInterval(send);
            clearInterval(moveEnemys);
            //saving data 
            //sqlsave(map.points )
        }
        if (!socket.connected) {
            console.log('disconnected');
            clearInterval(game);
            clearInterval(send);
            clearInterval(moveEnemys);
        }
    }, 1000/144);
    let moveEnemys = setInterval(() => {
        main.moveEnemy(map);
        main.moveBullet(map);
        main.test(map)
    }, 1000/144);
    let send = setInterval(() => {
        socket.send('map ' + JSON.stringify(map));
    }, 1000/144);
});


http.listen(3000, () => {
    console.log('Server is running on port 3000');
});