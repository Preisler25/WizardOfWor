const socket = io('ws://localhost:3000');
let pastmap = null;

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

    pastmap = Jmap;

    let Gmap = document.getElementById('map');
    Gmap.innerHTML = '';

    let player = document.createElement('div');
    Gmap.appendChild(player);
    player.style.left = Jmap.player.pos.x*2 + 'px';
    player.style.bottom = Jmap.player.pos.y*2 + 'px';
    player.className = 'player';

    let player2 = document.createElement('div');
    Gmap.appendChild(player2);
    player2.style.left = Jmap.player2.pos.x*2 + 'px';
    player2.style.bottom = Jmap.player2.pos.y*2 + 'px';
    player2.className = 'player2';

    Jmap.enemies.forEach(e => {
        let enemy = document.createElement('div');
        Gmap.appendChild(enemy);
        enemy.style.left = e.pos.x*2 + 'px';
        enemy.style.bottom = e.pos.y*2 + 'px';   
        enemy.className = 'enemy';
    });

    Jmap.rotpints.forEach(e => {
        let rotpint = document.createElement('div');
        Gmap.appendChild(rotpint);
        rotpint.style.left = e.pos.x*2 + 'px';
        rotpint.style.bottom = e.pos.y*2 + 'px';   
        rotpint.className = 'rotpint';
    });
    Jmap.bullets.forEach(e => {
        let bullet = document.createElement('div');
        Gmap.appendChild(bullet);
        bullet.style.backgroundColor = 'black';
        bullet.style.position = 'fixed';
        bullet.style.height = '10px';
        bullet.style.width = '10px';
        bullet.style.left = e.pos.x*2 + 'px';
        bullet.style.bottom = e.pos.y*2 + 'px';   
    });
}


addEventListener('keydown', (e) => {
    socket.emit('message', e.key);
});
