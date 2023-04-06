let c;
let bg1;
let mainCharacterAni;
let grannyAni;
let angryGrannyAni;
let yMainCharacter = 100;
let xMainCharacter = 100;
let bullets = [];
let enemies = [];
let button1;
let button2;
let button3;
let button4;
let button5;

let mainCharacterAniMovement = true;

function preload() {
  bg1 = loadImage("room1.gif");

  // main character animation
  mainCharacterAni = loadAnimation(
    "character1Sprites/character1SpriteFront1.png",
    "character1Sprites/character1SpriteFront2.png",
    "character1Sprites/character1SpriteFront3.png",
    "character1Sprites/character1SpriteFront4.png",
    "character1Sprites/character1SpriteFront5.png",
    "character1Sprites/character1SpriteFront6.png"
  );
  mainCharacterAni.frameDelay = 10;

  // animation for dialog with grandma (we will change pictures ofc)
  grannyAni = loadAnimation("granny/cat.png", "granny/dog.png");
  grannyAni.frameDelay = 10;

  //
  angryGrannyAni = loadAnimation(
    "angrygranny/angrygranny1.png",
    "angrygranny/angrygranny2.png"
  );
  angryGrannyAni.frameCount = 10;
}

function setup() {
  noSmooth();
  c = createCanvas(800, 800);
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
  button4.position(600, 830);
  button4.hide();
  button4.addClass("button4");

  // button5
  button5 = createButton("Thanks grandma! Have a nice day :)!");
  button5.mousePressed(theEndOfTheDialogWithGranny);
  button5.position(550, 830);
  button5.hide();
  button5.addClass("button5");
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
      }
    }
  }
  if (mouseIsPressed === true) {
    let bullet = {
      x: mouseX,
      y: height - 100,
    };
    bullets.push(bullet);
  }
  for (let i = 0; i < 1; i++) {
    let enemy = {
      x: random(0, width),
      y: random(height - 1200, height - 900),
    };
    enemies.push(enemy);
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

let state = "room";
function draw() {
  if (state === "room") {
    background(bg1);
    button5.hide();
    animation(mainCharacterAni, xMainCharacter, yMainCharacter);
    if ((mainCharacterAniMovement = true)) {
      if (kb.holding("right")) {
        xMainCharacter += 1;
      }
      if (kb.holding("left")) {
        xMainCharacter -= 1;
      }
      if (kb.holding("up")) {
        yMainCharacter -= 1;
      }
      if (kb.holding("down")) {
        yMainCharacter += 1;
      }
    }
    if (xMainCharacter > 400 && yMainCharacter > 400) {
      buttonTalkWithGranny.show();
    }
  }
  if (state === "forestWithHouse") {
    background(0);
  }
  if (state === "shooterGameScreenState") {
    shooterGameScreen();
  }
  if (state === "dialogWithGrannyState") {
    clear();
    animation(grannyAni, 200, 200);
    dialogWithGrannyRect();
    dialogWithGranny();
    button1.show();
    button3.show();
  }
  if (state === "dialogWithGranny2State") {
    clear();
    animation(grannyAni, 200, 200);
    dialogWithGrannyRect();
    dialogWithGranny2();
    button1.hide();
    button3.show();
    button2.show();
  }
  if (state === "angryGrannyState") {
    clear();
    animation(angryGrannyAni, 300, 300);
    dialogWithGrannyRect();
    angryGranny();
    button1.hide();
    button2.hide();
    button3.hide();
    button4.show();
  }
  if (state === "happyGrannyState") {
    animation(grannyAni, 200, 200);
    dialogWithGrannyRect();
    happyGranny();
    button1.hide();
    button2.hide();
    button3.hide();
    button4.hide();
    button5.show();
  }
}

function dialogWithGranny2() {
  state = "dialogWithGranny2State";
  let dialogWithGrannyText2 =
    "Here, I baked some cookies for your mom, could you carry it over to her?";
  let numChars2 = min(dialogWithGrannyText2.length, floor(frameCount / 10));
  fill(255);
  textSize(20);
  text(dialogWithGrannyText2.substring(0, numChars2), 50, 700);
}
function angryGranny() {
  state = "angryGrannyState";
  let dialogWithAngryGrannyText =
    "You ungrateful kiddo, take those cookies to your mother RIGHT NOW!!!";
  let numChars3 = min(dialogWithAngryGrannyText.length, floor(frameCount / 10));
  fill(255);
  textSize(20);
  text(dialogWithAngryGrannyText.substring(0, numChars3), 50, 700);
}
function happyGranny() {
  state = "happyGrannyState";
  let dialogWithHappyGrannyText = "Thank you honey :)! Here you have cookies!";
  let numChars4 = min(dialogWithHappyGrannyText.length, floor(frameCount / 10));
  fill(255);
  textSize(20);
  text(dialogWithHappyGrannyText.substring(0, numChars4), 50, 700);
}
function theEndOfTheDialogWithGranny() {
  state = "room";
}
