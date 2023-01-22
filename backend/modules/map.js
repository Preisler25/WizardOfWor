const char = require("./char");

class Map{
    constructor(){
        this.player = null;
        this.enemies = [];
        this.bullets = [];
        this.rotpints = [];
        this.ingame = true;
    }
    genRandomEnemy = () => {
        if (this.enemies.length == 0){
        let randoml = Math.floor(Math.random() * 5);
        console.log(randoml);
        for (let i = 0; i < randoml; i++){
            let random = Math.floor(Math.random() * 4);
            let randomPos = Math.floor(Math.random() * this.rotpints.length);
            let posx = this.rotpints[randomPos].pos.x;
            let posy = this.rotpints[randomPos].pos.y;
            this.enemies.push(new char.Enemy("enemy", random, {x:posx , y:posy}));
            }
        }
    }
}

module.exports = Map;