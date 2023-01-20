class Character {
  constructor() {
    this.level = 1;
    this.is_moved = false;
    this.pos = { x: 0, y: 0 };
    this.posMap = { xleft: this.pos.x, xright: this.pos.x+50, ytop: this.pos.y+50, ybottom: this.pos.y };
  }
    moveUp(){
        this.pos.y += 50;
        this.is_moved = true;
    };
    moveDown(){
        this.pos.y -= 50;
        this.is_moved = true;
    };
    moveLeft(){
        this.pos.x -= 50;
        this.is_moved = true;
    };
    moveRight(){
        this.pos.x += 50;
        this.is_moved = true;
    };
}

class Player extends Character {
  constructor(name, points) {
    super(name, points);
    this.name = name;
    this.points = points;
  }
}

class Enemy extends Character {
    constructor(type) {
        super(type);
        this.type = type;
    }
}

module.exports = {
    Enemy,
    Player
}