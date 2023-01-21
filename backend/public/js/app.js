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
    player.style.height = '150px';
    player.style.width = '150px';
    player.style.left = Jmap.player.pos.x*3 + 'px';
    player.style.bottom = Jmap.player.pos.y*3 + 'px';

    Jmap.enemies.forEach(e => {
        let enemy = document.createElement('div');
        Gmap.appendChild(enemy);
        enemy.style.backgroundColor = 'blue';
        enemy.style.position = 'fixed';
        enemy.style.height = '150px';
        enemy.style.width = '150px';
        enemy.style.left = e.pos.x*3 + 'px';
        enemy.style.bottom = e.pos.y*3 + 'px';   
    });

    Jmap.rotpints.forEach(e => {
        let rotpint = document.createElement('div');
        Gmap.appendChild(rotpint);
        rotpint.style.backgroundColor = 'yellow';
        rotpint.style.position = 'fixed';
        rotpint.style.height = '150px';
        rotpint.style.width = '150px';
        rotpint.style.left = e.pos.x*3 + 'px';
        rotpint.style.bottom = e.pos.y*3 + 'px';   
    });
}

addEventListener('keydown', (e) => {
    socket.emit('message', e.key);
});