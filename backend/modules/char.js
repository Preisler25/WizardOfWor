class Character {
  constructor() {
    this.level = 1;
    this.pos = { x: 0, y: 0 };
  }
    moveUp(){
      if (this.pos.y < 433){
        this.pos.y += 1;
      }
    };
    moveDown(){
      if (this.pos.y > 0){
        this.pos.y -= 1;
      }
    };
    moveLeft(){
      if (this.pos.x > 0){
        this.pos.x -= 1;
      }
    };
    moveRight(){
      if (this.pos.x < 910){
        this.pos.x += 1;}
    };
}

class Player extends Character {
  constructor(name, points, dir) {
    super(name, points, dir);
    // 0 le fel
    // 1 ballra jobbra
    this.dir = dir;
    this.name = name;
    this.points = points;
    this.pos = { x: 910, y: 0 };
  }
  moveUp(map){
    this.test(map.rotpints);
    if (this.pos.y < 433){
      if (this.dir == 0 || this.dir == 2) {
        this.pos.y += 1;
      }
    }
  };
  moveDown(map){
    this.test(map.rotpints);
    if (this.pos.y < 433){
      if (this.dir == 0 || this.dir == 2) {
        this.pos.y -= 1;
      } 
    }
  };
  moveLeft(map){
    this.test(map.rotpints);
    if (this.pos.x > 0){
      if (this.dir == 1|| this.dir == 2) {
        this.pos.x -= 1;
      }
    }
  };
  moveRight(map){
    this.test(map.rotpints);
    if (this.pos.x < 910){
      if (this.dir == 1|| this.dir == 2) {
        this.pos.x += 1;
      }
    }
  };
  test(rotpints){
    rotpints.forEach(r => {
      console.log(Math.abs(this.pos.x - r.pos.x) +' '+ Math.abs(this.pos.y - r.pos.y));
      if (this.pos.x - r.pos.x < 10 && this.pos.y - r.pos.y < 10){
        this.dir = 2;
        return true;
      }
    });
  }
}

class Enemy extends Character {
    constructor(type, dir) {
        super(type, dir);
        this.type = type;
        this.dir = dir;
    }
    check(playerPos){
        if(this.pos.x + 50 == playerPos.x && Math.abs(this.pos.y-playerPos.y) <= 50 || this.pos.y + 50 == playerPos.y && Math.abs(this.pos.x-playerPos.x) <= 50 || this.pos.x == playerPos.x+50 && Math.abs(this.pos.y-playerPos.y) <= 50 || this.pos.y == playerPos.y+50 && Math.abs(this.pos.x-playerPos.x) <= 50){
            console.log('---------------collision---------------');
            return false;
        }
        return true;
    }
    test(rotpints){
        rotpints.forEach(r => {
            if (this.pos.x == r.pos.x && this.pos.y == r.pos.y){
                this.dir = r.redir();
            }
        });
    }
}

class Rotpint extends Character {
    constructor(type, dirs, pos) {
        super(type, dirs);
        this.pos = pos;
        this.type = type;
        this.dirs = dirs;
    }
    redir(){
        let temp = Math.floor(Math.random() * this.dirs.length);
        return this.dirs[temp];
    }
}

module.exports = {
    Rotpint,
    Enemy,
    Player
}