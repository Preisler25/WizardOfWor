const char = require("./char");

class Map {
    constructor() {
        this.player = null;
        this.enemies = [];
        this.bullets = [];
        this.rotpints = [];
        this.ingame = true;
    }
    genRandomEnemy = () => {
        if (this.enemies.length == 0) {
            let randoml = Math.floor(Math.random() * 5);
            console.log(randoml);
            for (let i = 0; i < randoml; i++) {
                let randomPos = Math.floor(Math.random() * this.rotpints.length);
                let posx = this.rotpints[randomPos].pos.x;
                let posy = this.rotpints[randomPos].pos.y;
                if (posx == this.player.pos.x && posy == this.player.pos.y) { console.log("foglalt"); }
                else {
                    let randomlist = this.rotpints[randomPos].dirs;
                    let randomlent = Math.floor(Math.random() * randomlist.length);
                    let random = randomlist[randomlent]
                    this.enemies.push(new char.Enemy("enemy", random, { x: posx, y: posy }));
                }
            }
        }
    }
}

module.exports = Map;