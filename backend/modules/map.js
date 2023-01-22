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
        let randoml = Math.floor(Math.random() * 3);
        for (let i = 0; i < randoml; i++){
            let random = this.rotpints.length-1;
            let random_dir = this.rotpints[random].dirs.length-1;
            this.enemies.push(new char.Enemy("enemy", 0, this.rotpints[random].dirs[Math.floor(Math.random() * random_dir)], this.rotpints[random].pos));
            }
        }
    }
}

module.exports = Map;