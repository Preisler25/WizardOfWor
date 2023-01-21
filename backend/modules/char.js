class Character {
  constructor() {
    this.level = 1;
    this.pos = { x: 0, y: 0 };
  }
    moveUp(){
        this.pos.y += 1;
    };
    moveDown(){
        this.pos.y -= 1;
    };
    moveLeft(){
        this.pos.x -= 1;
    };
    moveRight(){
        this.pos.x += 1;
    };
}

class Player extends Character {
  constructor(name, points) {
    super(name, points);
    this.name = name;
    this.points = points;
    this.pos = { x: 100, y: 0 };
  }
}

class Enemy extends Character {
    constructor(type) {
        super(type);
        this.type = type;
    }
    check(playerPos){
        if(this.pos.x + 50 == playerPos.x && Math.abs(this.pos.y-playerPos.y) <= 50 || this.pos.y + 50 == playerPos.y && Math.abs(this.pos.x-playerPos.x) <= 50 || this.pos.x == playerPos.x+50 && Math.abs(this.pos.y-playerPos.y) <= 50 || this.pos.y == playerPos.y+50 && Math.abs(this.pos.x-playerPos.x) <= 50){
            console.log('---------------collision---------------');
            return false;
        }
        return true;
    }
}

module.exports = {
    Enemy,
    Player
}