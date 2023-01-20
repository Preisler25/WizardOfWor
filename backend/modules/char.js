class Character {
  constructor() {
    this.level = 1;
    this.is_moved = false;
  }
}

class Player extends Character {
  constructor(name, points) {
    super(name, type);
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

let GenPlayer = () => {
    let player = new Player("Player", 0);
    console.log(player);
}

module.exports = {
    GenPlayer
}