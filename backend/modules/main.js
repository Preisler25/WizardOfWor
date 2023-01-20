const game = require("./game");

let getData = (data) => {
    switch (data) {
        case "ArrowUp":
            game.GenPlayer();
            break;
        case "ArrowDown":
            
            break;
        case "ArrowLeft":
            
            break;
        case "ArrowRight":
            
            break;
    }
}

module.exports = {
    getData
}