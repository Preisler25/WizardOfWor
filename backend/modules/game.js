let checkCollision = (map) => {
    for (let i = 0; i < map.enemies.length; i++) {
        if (map.player.x === map.enemies[i].x && map.player.y === map.enemies[i].y) {
            console.log("collision");
        }
    }
}