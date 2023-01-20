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
    if (map.player.is_moved) {
        map.player.is_moved = false;
        game.checkCollision(map);
    }
    console.log(map);
    return map;
}

module.exports = {
    genGame,
    movePlayer
}