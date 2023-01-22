class Character {
  constructor() {
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
  constructor(name, points, dir, shdir) {
    super(name, points, dir, shdir);
    // 0 le fel
    // 1 ballra jobbra
    this.dir = dir;
    this.shdir = shdir;
    this.name = name;
    this.points = points;
    this.pos = { x: 910, y: 0 };
  }
  moveUp(map){
    this.test(map.rotpints);
    if (this.pos.y < 433){
      if (this.dir == 0 || this.dir == 2) {
        this.pos.y += 1;
        this.shdir = 0;
        this.dir = 0;
      }
    }
  };
  moveDown(map){
    this.test(map.rotpints);
    if (this.pos.y > 0){
      if (this.dir == 0 || this.dir == 2) {
        this.pos.y -= 1;
        this.shdir = 1;
        this.dir = 0;
      } 
    }
  };
  moveLeft(map){
    this.test(map.rotpints);
    if (this.pos.x > 0){
      if (this.dir == 1|| this.dir == 2) {
        this.pos.x -= 1;
        this.shdir = 2;
        this.dir = 1;
      }
    }
  };
  moveRight(map){
    this.test(map.rotpints);
    if (this.pos.x < 910){
      if (this.dir == 1|| this.dir == 2) {
        this.pos.x += 1;
        this.shdir = 3;
        this.dir = 1;
      }
    }
  };
  test(rotpints){
    let validCheck = false;
    rotpints.forEach(r => {
      console.log(r.pos.x, this.pos.x, r.pos.y, this.pos.y);
      if (this.pos.x == r.pos.x && this.pos.y == r.pos.y){
        validCheck = true;
      }
    });
    if (validCheck){
      this.dir = 2;
    }
  }
  shoot(map){
    let posx = this.pos.x + 25;
    let posy = this.pos.y + 25;
    map.bullets.push(new Bullet({posx, posy}, this.shdir));
  }
}

class Bullet extends Character {
  constructor(pos, dir) {
    super(pos, dir);
    this.pos.x = pos.posx;
    this.pos.y = pos.posy;
    this.dir = dir;
    this.valid = true;
  }
  moveUp(){
    if (this.pos.y < 433){
      this.pos.y += 1;
    }else if (this.pos.y = 433){
      this.valid = false;
    }
  }
  moveDown(){
    if (this.pos.y > 0){
      this.pos.y -= 1;
    }else if (this.pos.y = 0){
      this.valid = false;
    }
  }
  moveLeft(){
    if (this.pos.x > 0){
      this.pos.x -= 1;
    }else if (this.pos.x = 0){
      this.valid = false;
    }
  }
  moveRight(){
    if (this.pos.x < 910){
      this.pos.x += 1;
    }else if (this.pos.x = 910){
      this.valid = false;
    }
  }
  test(enemys){
    enemys.forEach(e => {
      if (Math.abs(this.pos.x - e.pos.x) <= 25 && Math.abs(this.pos.y - e.pos.y) <= 25){
        this.valid = false;   
        e.isAlive = false;
      }
    });
  }
}

class Enemy extends Character {
    constructor(type, dir) {
        super(type, dir);
        this.type = type;
        this.dir = dir;
        this.isAlive = true;
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