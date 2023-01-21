const socket = io('ws://localhost:3000');

socket.on('connect', () => {
    console.log('connected');
});
socket.on('message', (data) => {
    switch (data.split(' ')[0]) {
        case "map":
            drawMap(data.split(' ')[1]);
            break;
    
        default:
            break;
    }
});

let drawMap = (map) => {
    let Jmap = JSON.parse(map);

    console.log(Jmap);

    let Gmap = document.getElementById('map');
    Gmap.innerHTML = '';
    Gmap.style.display = 'flex';  
    Gmap.style.height = 500 + 'px';
    Gmap.style.width = 1000 + 'px';
    Gmap.style.backgroundColor = 'green';

    let player = document.createElement('div');
    Gmap.appendChild(player);
    player.style.backgroundColor = 'red';
    player.style.position = 'fixed';
    player.style.height = '50px';
    player.style.width = '50px';
    player.style.left = Jmap.player.pos.x + 'px';
    player.style.bottom = Jmap.player.pos.y + 'px';

    Jmap.enemies.forEach(e => {
        let enemy = document.createElement('div');
        Gmap.appendChild(enemy);
        enemy.style.backgroundColor = 'blue';
        enemy.style.position = 'fixed';
        enemy.style.height = '50px';
        enemy.style.width = '50px';
        enemy.style.left = e.pos.x + 'px';
        enemy.style.bottom = e.pos.y + 'px';   
    });
}

addEventListener('keydown', (e) => {
    socket.emit('message', e.key);
});