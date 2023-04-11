let player;
let walls = [];

function setup() {
  createCanvas(400, 400);
  player = new Circle(30, 30, 10);
  walls.push(new Wall(100, 100, 200, 20));
  walls.push(new Wall(100, 100, 20, 200));
  walls.push(new Wall(100, 280, 200, 20));
  walls.push(new Wall(280, 100, 20, 200));
}

function draw() {
  background(220);

  // Move the player with arrow keys
  if (kb.holding("left")) {
    player.move(-5, 0);
  } else if (kb.holding("right")) {
    player.move(5, 0);
  } else if (kb.holding("up")) {
    player.move(0, -5);
  } else if (kb.holding("down")) {
    player.move(0, 5);
  }

  // Check for collision with walls
  for (let i = 0; i < walls.length; i++) {
    if (player.intersects(walls[i])) {
      player.reset();
    }
  }

  // Draw walls
  for (let i = 0; i < walls.length; i++) {
    walls[i].show();
  }

  // Draw player
  player.show();
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.reset();
  }

  move(x, y) {
    this.x += x;
    this.y += y;
    this.x = constrain(this.x, this.r, width - this.r);
    this.y = constrain(this.y, this.r, height - this.r);
  }

  show() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.r * 2);
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
  }

  intersects(wall) {
    let closestX = constrain(this.x, wall.x1, wall.x2);
    let closestY = constrain(this.y, wall.y1, wall.y2);
    let distanceX = this.x - closestX;
    let distanceY = this.y - closestY;
    let distance = sqrt(distanceX * distanceX + distanceY * distanceY);
    return distance < this.r;
  }
}

class Wall {
  constructor(x, y, w, h) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = x + w;
    this.y2 = y + h;
  }

  show() {
    fill(0, 0, 255);
    rect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
  }
}
