const char = require("./char");
const Map = require("./map");
const game = require("./game");

let genGame = () => {
    let map = new Map();
    let player = new char.Player("player", 0);
    map.player = player;
    let enemy = new char.Enemy("base");
    map.enemies.push(enemy);
    return map;
}

let movePlayer = (data, map) => {
    switch (data) {
        case "ArrowUp":
            map.player.moveUp();
            break;
        case "ArrowDown":
            map.player.moveDown();
            break;
        case "ArrowLeft":
            map.player.moveLeft();
            break;
        case "ArrowRight":
            map.player.moveRight();
            break;
    }
    checkCollision(map);
    return map;
}
let moveEnemy = (map) => {
    map.enemies.forEach(e => {
        let rand = Math.floor(Math.random() * 4);
        switch (rand) {
            case 0:
                e.moveUp();
                break;
            case 1:
                e.moveDown();
                break;
            case 2:
                e.moveLeft();
                break;
            case 3:
                e.moveRight();
                break;
        }
    });
    checkCollision(map);
    return map;
}

let checkCollision = (map) => {
    map.enemies.forEach(e => {
        if (!e.check(map.player.pos)) {
            map.ingame = false;
        }
    });
}

module.exports = {
    moveEnemy,
    genGame,
    movePlayer
}