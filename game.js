let c;
let bg1;
let mainCharacterAni;
let grannyWatchingTv;
let grannyAni;
let angryGrannyAni;
let yMainCharacter = 100;
let xMainCharacter = 100;
let moveMainCaharcter = 2;
let cloud;
let cookie;
let forest;
let ghostAni;
let shootingCharacter;
// let mySound;

let bullets = [];
let enemies = [];
let score = 0;

let button1;
let button2;
let button3;
let button4;
let button5;
let button6;
// let xWall1 = 200;
// let yWall1 = 0;
// let widthWall1 = 100;
// let heightWall1 = 400;

class Wall {
  constructor(x, y, w, h) {
    (this.x = x), (this.y = y), (this.w = w), (this.h = h);
  }
  draw() {
    fill(255, 255, 255);
    rect(this.x, this.y, this.w, this.h);
  }
}
let wall1 = new Wall(200, 0, 50, 500);

let mainCharacterAniMovement = true;

function preload() {
  bg1 = loadImage("locations/room.png");

  // mySound = loadSound("musiccc/backgroundMusic.mp3");

  cloud = loadImage("otherImages/cloud.png");
  cookie = loadImage("otherImages/cookie.png");

  forest = loadImage("locations/forestWithHouse.png");

  grannyWatchingTv = loadAnimation("grannyWatchingTv/grandmaWatchingTv.png");

  // main character animation
  mainCharacterAni = loadAnimation(
    "mainCharacterAni/mainCharacterAni1.png",
    "mainCharacterAni/mainCharacterAni2.png"
  );
  mainCharacterAni.frameDelay = 10;

  // animation for dialog with grandma (we will change pictures ofc)
  grannyAni = loadAnimation("granny/granny1.png", "granny/granny2.png");
  grannyAni.frameDelay = 10;

  //
  angryGrannyAni = loadAnimation(
    "angrygranny/angrygranny1.png",
    "angrygranny/angrygranny2.png"
  );
  angryGrannyAni.frameCount = 10;

  ghostAni = loadAnimation("ghost/ghost1.png", "ghost/ghost2.png");
  ghostAni.frameCount = 1;
}

function setup() {
  noSmooth();
  c = createCanvas(800, 800);

  noSmooth();

  for (let i = 0; i < 20; i++) {
    let enemy = {
      x: random(0, width),
      y: random(height - 1200, height - 900),
    };
    enemies.push(enemy);
  }

  // button1, I added classes to button, it's better to stylize them in css
  button1 = createButton("Sure!");
  button1.mousePressed(dialogWithGranny2);
  button1.position(550, 830);
  button1.addClass("button1");
  button1.hide();

  //button2
  button2 = createButton("Ok, no problem!");
  button2.mousePressed(happyGranny);
  button2.position(550, 830);
  button2.hide();
  button2.addClass("button2");

  // button3
  button3 = createButton("Ehhh, I'm too busy grandma :/");
  button3.mousePressed(angryGranny);
  button3.position(1000, 830);
  button3.hide();
  button3.addClass("button3");

  // button4
  button4 = createButton("Okay, okay...");
  button4.mousePressed(happyGranny);
  button4.position(750, 830);
  button4.hide();
  button4.addClass("button4");

  // button5
  button5 = createButton("Thanks grandma! Have a nice day :)!");
  button5.mousePressed(theEndOfTheDialogWithGranny);
  button5.position(750, 830);
  button5.hide();
  button5.addClass("button5");

  // button5
  button6 = createButton("Play again");
  button6.mousePressed(playAgain);
  button6.position(400, 400);
  button6.hide();
  button6.addClass("button6");
}

// basics of shooter game screen
function shooterGameScreen() {
  background(0);

  ellipse(mouseX, height - 100, 25);
  for (let bullet of bullets) {
    ellipse(bullet.x, bullet.y, 10);
    bullet.y = bullet.y - 5;
  }
  for (let enemy of enemies) {
    ellipse(enemy.x, enemy.y, 10);
    enemy.y = enemy.y + 1;
  }
  for (let enemy of enemies) {
    for (let bullet of bullets) {
      if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 10) {
        enemies.splice(enemies.indexOf(enemy), 1);
        score += 1;
      }
      if (dist(enemy.x, enemy.y, mouseX, height - 100) < 10) {
        state = "youLost";
      }
    }
  }
  push();
  fill(255, 255, 255);
  textFont("VT323");
  textSize(30);
  text("Killed ghost: " + score, 100, 600, 400, 400);
  pop();
  if (mouseIsPressed === true) {
    let bullet = {
      x: mouseX,
      y: height - 100,
    };
    bullets.push(bullet);
  }
}
// black rectangle when you ar etalking with granny
function dialogWithGrannyRect() {
  fill(0);
  rect(0, 600, 800, 600);
}

function dialogWithGranny() {
  let dialogWithGrannyText1 = "Hi Jane! I have a special mission for you";
  let numChars = min(dialogWithGrannyText1.length, floor(frameCount / 10));
  fill(255);
  textFont("VT323");
  textSize(30);
  text(dialogWithGrannyText1.substring(0, numChars), 50, 700);
}
function forestWithHouse() {
  xMainCharacter = 400;
  yMainCharacter = 400;
  image(forest, 0, 0, 800, 800);
  collectedItems();
  animation(mainCharacterAni, xMainCharacter, yMainCharacter);
  if ((mainCharacterAniMovement = true)) {
    if (kb.holding("right")) {
      xMainCharacter += 2;
    }
    if (kb.holding("left")) {
      xMainCharacter -= 2;
    }
    if (kb.holding("up")) {
      yMainCharacter -= 2;
    }
    if (kb.holding("down")) {
      yMainCharacter += 2;
    }
  }
  if (xMainCharacter < 50) {
    xMainCharacter += 1;
  }
  if (xMainCharacter > 750) {
    xMainCharacter -= 1;
  }
  if (yMainCharacter < 0) {
    yMainCharacter += 1;
  }
  if (yMainCharacter > 750) {
    yMainCharacter -= 1;
  }
}

let state = "maze";
function draw() {
  if (state === "room") {
    background(bg1);
    // music();
    button5.hide();
    animation(mainCharacterAni, xMainCharacter, yMainCharacter);
    animation(grannyWatchingTv, 630, 400);
    if ((mainCharacterAniMovement = true)) {
      if (kb.holding("right")) {
        xMainCharacter += moveMainCaharcter;
      }
      if (kb.holding("left")) {
        xMainCharacter -= moveMainCaharcter;
      }
      if (kb.holding("up")) {
        yMainCharacter -= moveMainCaharcter;
      }
      if (kb.holding("down")) {
        yMainCharacter += moveMainCaharcter;
      }
    }
    if (xMainCharacter < 50) {
      xMainCharacter += 1;
    }
    if (xMainCharacter > 750) {
      xMainCharacter -= 1;
    }
    if (yMainCharacter < 0) {
      yMainCharacter += 1;
    }
    if (yMainCharacter > 750) {
      yMainCharacter -= 1;
    }
    if (xMainCharacter > 300 && yMainCharacter > 200 && yMainCharacter < 300) {
      cloudText();
    }
    if (xMainCharacter > 500 && yMainCharacter > 300) {
      state = "dialogWithGrannyState";
    }
  }
  if (state === "shooterGameScreenState") {
    shooterGameScreen();
    button6.hide();
  }
  if (state === "dialogWithGrannyState") {
    push();
    clear();
    scale(1.3);
    animation(grannyAni, 300, 300);
    pop();
    dialogWithGrannyRect();
    dialogWithGranny();
    button1.show();
    button3.show();
  }
  if (state === "dialogWithGranny2State") {
    push();
    clear();
    scale(1.3);
    animation(grannyAni, 300, 300);
    pop();
    dialogWithGrannyRect();
    dialogWithGranny2();
    button1.hide();
    button3.show();
    button2.show();
  }
  if (state === "angryGrannyState") {
    push();
    clear();
    scale(1.3);
    animation(angryGrannyAni, 300, 300);
    pop();
    dialogWithGrannyRect();
    angryGranny();
    button1.hide();
    button2.hide();
    button3.hide();
    button4.show();
  }
  if (state === "happyGrannyState") {
    push();
    clear();
    scale(1.3);
    animation(grannyAni, 300, 300);
    pop();
    dialogWithGrannyRect();
    happyGranny();
    button1.hide();
    button2.hide();
    button3.hide();
    button4.hide();
    button5.show();
  }
  if (state === "afterDialogWithGrannyState") {
    background(bg1);
    collectedItems();

    button5.hide();
    animation(mainCharacterAni, xMainCharacter, yMainCharacter);
    animation(grannyWatchingTv, 630, 400);
    if ((mainCharacterAniMovement = true)) {
      if (kb.holding("right")) {
        xMainCharacter += moveMainCaharcter;
      }
      if (kb.holding("left")) {
        xMainCharacter -= moveMainCaharcter;
      }
      if (kb.holding("up")) {
        yMainCharacter -= moveMainCaharcter;
      }
      if (kb.holding("down")) {
        yMainCharacter += moveMainCaharcter;
      }
    }
    if (xMainCharacter < 50) {
      xMainCharacter += 1;
    }
    if (xMainCharacter > 750) {
      xMainCharacter -= 1;
    }
    if (yMainCharacter < 0) {
      yMainCharacter += 1;
    }
    if (yMainCharacter > 750) {
      yMainCharacter -= 1;
    }
    if (xMainCharacter > 370 && xMainCharacter < 500 && yMainCharacter > 700) {
      state = "forestWithHouseState";
    }
  }
  if (state === "forestWithHouseState") {
    forestWithHouse();
  }
  if (state === "maze") {
    background(0);

    wall1.draw();

    animation(mainCharacterAni, xMainCharacter, yMainCharacter);
    if ((mainCharacterAniMovement = true)) {
      if (kb.holding("right")) {
        xMainCharacter += moveMainCaharcter;
      }
      if (kb.holding("left")) {
        xMainCharacter -= moveMainCaharcter;
      }
      if (kb.holding("up")) {
        yMainCharacter -= moveMainCaharcter;
      }
      if (kb.holding("down")) {
        yMainCharacter += moveMainCaharcter;
      }
    }
    if (xMainCharacter < 50) {
      xMainCharacter += moveMainCaharcter;
    }
    if (xMainCharacter > 750) {
      xMainCharacter -= moveMainCaharcter;
    }
    if (yMainCharacter < 0) {
      yMainCharacter += moveMainCaharcter;
    }
    if (yMainCharacter > 750) {
      yMainCharacter -= moveMainCaharcter;
    }
    if (dist(wall1.x, wall1.y, xMainCharacter, yMainCharacter) < 10) {
      xMainCharacter = 100;
      yMainCharacter = 100;
    }
    // if (
    //   xMainCharacter > xWall1 - widthWall1 &&
    //   xMainCharacter < xWall1 + widthWall1 &&
    //   yMainCharacter > yWall1 - heightWall1 &&
    //   yMainCharacter < yWall1 + heightWall1
    // ) {
    //   xMainCharacter = 100;
    //   yMainCharacter = 100;
    // }

    // push();
    // fill(255, 0, 0);
    // rect(xWall1, yWall1, widthWall1, heightWall1);
    // pop();
  }
  if (state === "ghostState") {
    ghostScreen();
  }
  if (state === "youLost") {
    youLost();
    button6.show();
  }
}
function cloudText() {
  image(cloud, 420, 120, 400, 400);
}
function collectedItems() {
  push();
  fill(0);
  rect(600, 700, 200, 100);
  pop();
  image(cookie, 600, 660, 150, 200);
}

function dialogWithGranny2() {
  state = "dialogWithGranny2State";
  let dialogWithGrannyText2 =
    "Here, I baked some cookies for your mom, could you carry it over to her?";
  let numChars2 = min(dialogWithGrannyText2.length, floor(frameCount / 10));
  fill(255);
  textSize(30);
  text(dialogWithGrannyText2.substring(0, numChars2), 50, 700);
}
function angryGranny() {
  state = "angryGrannyState";
  let dialogWithAngryGrannyText =
    "You ungrateful kiddo, take those cookies to your mother RIGHT NOW!!!";
  let numChars3 = min(dialogWithAngryGrannyText.length, floor(frameCount / 10));
  fill(255);
  textSize(30);
  text(dialogWithAngryGrannyText.substring(0, numChars3), 50, 700);
}
function happyGranny() {
  state = "happyGrannyState";
  let dialogWithHappyGrannyText = "Thank you honey :)! Here you have cookies!";
  let numChars4 = min(dialogWithHappyGrannyText.length, floor(frameCount / 10));
  fill(255);
  textSize(30);
  text(dialogWithHappyGrannyText.substring(0, numChars4), 50, 700);
}
function theEndOfTheDialogWithGranny() {
  state = "afterDialogWithGrannyState";
  yMainCharacter = 500;
  xMainCharacter = 500;
}

function ghostScreen() {
  background(0);
  noStroke();
  for (let i = 0; i < 200; i++) rect(random(900), random(900), 1, 1500);
  push();
  scale(1.3);
  animation(ghostAni, 300, 300);
  pop();
}
function youLost() {
  background(0);
  fill(255, 255, 255);
  text("You lost!", 300, 300, 300, 300);
}
function playAgain() {
  state = "shooterGameScreenState";
  bullets = [];
  enemies = [];
  score = 0;
}

// function music() {
//   mySound.play();
// }
