const char = require("./char");
const Map = require("./map");

let genGame = () => {
    let map = new Map();
    let player = new char.Player("player", 0);
    map.player = player;
    map.rotpints.push(
        new char.Rotpint("rotpints", [0, 3], {x:0 , y:0}),
        new char.Rotpint("rotpints", [1, 3], {x:0 , y:433}),
        new char.Rotpint("rotpints", [0, 1, 3], {x:0 , y:100}),
        new char.Rotpint("rotpints", [0, 2], {x:910 , y:0}),
        new char.Rotpint("rotpints", [1, 2], {x:910 , y:433}),
        new char.Rotpint("rotpints", [0, 1, 2], {x:910 , y:100}),
        );
    map.enemies.push(
        new char.Enemy("base", 0),
        new char.Enemy("base", 1)

    );
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
        switch (e.dir) {
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
        e.test(map.rotpints)
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