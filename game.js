let c;
let bg1;
let mainCharacterSprite;
let mainCharacterDown;
let mainCharacterUp;
let mainCharacter;
let character1;
let grannyAni;
// let x = 50;
// let y = 50;
let yMainCharacter = 100;
let xMainCharacter = 100;
// let hero;
let bullets = [];
let enemies = [];

function preload() {
  mainCharacter = loadImage("character1.png");
  character1 = loadImage("character2.png");
  bg1 = loadImage("room1.gif");
  mainCharacterDown = loadAnimation(
    "character1Sprites/character1SpriteFront1.png",
    "character1Sprites/character1SpriteFront2.png",
    "character1Sprites/character1SpriteFront3.png",
    "character1Sprites/character1SpriteFront4.png",
    "character1Sprites/character1SpriteFront5.png",
    "character1Sprites/character1SpriteFront6.png"
  );
  mainCharacterUp = loadAnimation(
    "character1Sprites/character1SpriteBack1.png",
    "character1Sprites/character1SpriteBack2.png",
    "character1Sprites/character1SpriteBack3.png"
  );
  grannyAni = loadAnimation("cat.png", "dog.png");
  grannyAni.frameDelay = 10;

  // hero.anis.offset.y = 2;
}

function setup() {
  c = createCanvas(800, 800);
  mainCharacterSprite = new Sprite(xMainCharacter, yMainCharacter, 100, 100);
  mainCharacterSprite.addAni("down", mainCharacterDown);
  mainCharacterSprite.addAni("up", mainCharacterUp);
}

function keyPressed() {
  // mainCharacterSprite.animation.stop();
  if (key === UP_ARROW) {
    mainCharacterSprite.yMainCharacter -= 1;
    mainCharacterSprite.changeAnimation("up");
    mainCharacterSprite.animation.play();
  }
  if (key === DOWN_ARROW) {
    mainCharacterSprite.yMainCharacter += 1;
    mainCharacterSprite.changeAnimation("down");
    mainCharacterSprite.animation.play();
  }
}
function keyReleased() {
  mainCharacterSprite.animation.stop();
}

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
function dialogWithGrannyRect() {
  fill(0);
  rect(100, 600, 600, 600);
}
function dialogWithGranny() {
  let dialogWithGrannyText1 = "It's text 1!";
  let numChars = min(dialogWithGrannyText1.length, floor(frameCount / 10));
  fill(255);
  textSize(20);
  text(dialogWithGrannyText1.substring(0, numChars), 200, 700);
  let button1 = createButton("Yes");
  button1.mousePressed(dialogWithGranny2);
  button1.position(550, 750);
  button1.size(100, 30);
  button1.style("background-color", "black");

  button1.style("color", "white");
}

let state = "dialogWithGrannyState";
function draw() {
  if (state === "room") {
    background(bg1);
    // image(mainCharacter, x, y, 100, 100);
    // animation(mainCharacterSprite);
  }
  if (state === "forestWithHouse") {
    background(0);
    // image(mainCharacterSprite, xMainCharacter, yMainCharacter, 100, 100);
  }
  if (state === "shooterGameScreenState") {
    shooterGameScreen();
  }
  if (state === "dialogWithGrannyState") {
    clear();
    animation(grannyAni, 200, 200);
    dialogWithGrannyRect();
    dialogWithGranny();
  }
  if (state === "dialogWithGranny2State") {
    clear();
    animation(grannyAni, 200, 200);
    dialogWithGrannyRect();
    dialogWithGranny2();
  }
}

function dialogWithGranny2() {
  state = "dialogWithGranny2State";
  let dialogWithGrannyText2 =
    "It's text 2!It's text 2!It's text 2!It's text 2!";
  let numChars2 = min(dialogWithGrannyText2.length, floor(frameCount / 10));
  fill(255);
  textSize(20);
  text(dialogWithGrannyText2.substring(0, numChars2), 200, 700);
  let button2 = createButton("Ok");
  button2.position(550, 750);
  button2.size(100, 30);
  button2.style("background-color", "white");
  button2.style("color", "black");
}
