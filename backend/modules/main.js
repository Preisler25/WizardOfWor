const char = require("./char");
const Map = require("./map");

let genGame = () => {
    let map = new Map();
    let player = new char.Player("player", 0, 1);
    let player2 = new char.Player("player", 0, 1);
    map.player = player;
    map.player2 = player2;
    map.rotpints.push(
        new char.Rotpint("balalsó", [0, 3], {x:0 , y:0}, 3),
        new char.Rotpint("balfelső", [1, 3], {x:0 , y:440}, 5),
        new char.Rotpint("balközép", [0, 1, 3], {x:0 , y:100}, 9),
        new char.Rotpint("középközép", [0, 2, 3], {x:455 , y:100}, 7),
        new char.Rotpint("fentközép", [1, 2, 3], {x:455 , y:440}, 8),
        new char.Rotpint("jobbalsó", [0, 2], {x:910 , y:0}, 4),
        new char.Rotpint("jobbfelső", [1, 2], {x:910 , y:440} , 6),
        new char.Rotpint("jobbközép", [0, 1, 2], {x:910 , y:100}, 10),
        );
        
    map.enemies.push(
        new char.Enemy("base", 0, { x: 0, y: 0 }),
        new char.Enemy("base", 1, { x: 0, y: 0 })
    );
    return map;
}

let movePlayer = (data, map) => {
    switch (data) {
        case "ArrowUp":
            map.player.moveUp(map);
            break;
        case "ArrowDown":
            map.player.moveDown(map);
            break;
        case "ArrowLeft":
            map.player.moveLeft(map);
            break;
        case "ArrowRight":
            map.player.moveRight(map);
            break;
        case "Control":
            map.player.shoot(map);
            break;
        case "w":
            map.player2.moveUp(map);
            break;
        case "s":
            map.player2.moveDown(map);
            break;
        case "a":
            map.player2.moveLeft(map);
            break;
        case "d":
            map.player2.moveRight(map);
            break;
        case "q":
            map.player2.shoot(map);
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

let moveBullet = (map) => {
    map.bullets.forEach(b => {
        switch (b.dir) {
            case 0:
                b.moveUp();
                break;
            case 1:
                b.moveDown();
                break;
            case 2:
                b.moveLeft();
                break;
            case 3:
                b.moveRight();
                break;
        }
    });
    return map;
}

let test = (map) => {
    map.enemies.forEach(e => {
        if(!e.isAlive){
            map.enemies.splice(map.enemies.indexOf(e), 1);
        }
    });
    map.bullets.forEach(b => {
        if(!b.valid){
            map.bullets.splice(map.bullets.indexOf(b), 1);
        }
    });
    map.genRandomEnemy();
    return map;
}

let checkCollision = (map) => {
    map.enemies.forEach(e => {
        if (!e.check(map.player.pos) || !e.check(map.player2.pos)) {
            map.ingame = false;
        }
    });
    map.bullets.forEach(b => {
        b.test(map.enemies);
    });
}

module.exports = {
    test,
    moveEnemy,
    genGame,
    movePlayer,
    moveBullet
}