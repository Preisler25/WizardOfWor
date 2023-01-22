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

    let player = document.createElement('div');
    Gmap.appendChild(player);
    player.style.backgroundColor = 'red';
    player.style.position = 'fixed';
    player.style.height = '100px';
    player.style.width = '100px';
    player.style.left = Jmap.player.pos.x*2 + 'px';
    player.style.bottom = Jmap.player.pos.y*2 + 'px';

    Jmap.enemies.forEach(e => {
        let enemy = document.createElement('div');
        Gmap.appendChild(enemy);
        enemy.style.backgroundColor = 'blue';
        enemy.style.position = 'fixed';
        enemy.style.height = '100px';
        enemy.style.width = '100px';
        enemy.style.left = e.pos.x*2 + 'px';
        enemy.style.bottom = e.pos.y*2 + 'px';   
    });

    Jmap.rotpints.forEach(e => {
        let rotpint = document.createElement('div');
        Gmap.appendChild(rotpint);
        rotpint.style.backgroundColor = 'yellow';
        rotpint.style.position = 'fixed';
        rotpint.style.height = '100px';
        rotpint.style.width = '100px';
        rotpint.style.left = e.pos.x*2 + 'px';
        rotpint.style.bottom = e.pos.y*2 + 'px';   
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