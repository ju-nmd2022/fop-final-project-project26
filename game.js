let c;
let bg1;
let mainCharacterAni;
let grannyWatchingTv;
let grannyAni;
let angryGrannyAni;
let yMainCharacter = 100;
let xMainCharacter = 100;
let moveMainCharacter = 2;
let cloud;
let cookie;
let forest;
let ghostAni;
let miniGhost;
let xMiniGhost = 30;
let yMiniGhost = 500;
let evilGhost;
let xEvilGhost = 610;
let yEvilGhost = 470;
let shootingCharacter;
let weapon;
let xWeapon = 700;
let yWeapon = 10;
let ghostEnemy;
let mazeBg;
let screenWithMom;

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
//button for talking with ghost
let button7;
//button for 2nd answer to ghost
let button8;
// button for 3th answer to ghost
let button9;
//button for continuing the game after the dialogue with Tamashi
let button10;

let button11;

let xWall1 = 200;
let yWall1 = 0;
let widthWall1 = 100;
let heightWall1 = 600;

let xObstacle1 = 100;
let yObstacle1 = 300;
let widthObstacle1 = 100;
let heightObstacle1 = 100;

let xWall2 = 500;
let yWall2 = 300;
let widthWall2 = 100;
let heightWall2 = 500;

let xObstacle2 = 400;
let yObstacle2 = 400;
let widthObstacle2 = 100;
let heightObstacle2 = 100;

let xWall3 = 500;
let yWall3 = 100;
let widthWall3 = 400;
let heightWall3 = 100;

let xObstacle3 = 300;
let yObstacle3 = 210;
let widthObstacle3 = 100;
let heightObstacle3 = 100;

let mainCharacterAniMovement = true;

function preload() {
  bg1 = loadImage("locations/room.png");
  mazeBg = loadImage("locations/maze.png");
  screenWithMom = loadImage("locations/screenWithMom.png");

  // mySound = loadSound("musiccc/backgroundMusic.mp3");

  cloud = loadImage("otherImages/cloud.png");
  cookie = loadImage("otherImages/cookie.png");

  forest = loadImage("locations/forestWithHouse.png");

  grannyWatchingTv = loadImage("folderGrannyWatchingTv/grandmaWatchingTv.png");

  miniGhost = loadImage("ghost/miniGhost.png");

  evilGhost = loadImage("ghost/evilGhost.png");

  weapon = loadImage("otherImages/weapon.png");

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
  angryGrannyAni.frameDelay = 10;

  ghostAni = loadAnimation("ghost/ghost.png");

  ghostEnemy = loadAnimation("ghost/evilGhost.png", "ghost/miniGhost.png");
  ghostEnemy.frameDelay = 20;
}

function setup() {
  noSmooth();
  c = createCanvas(800, 800);

  noSmooth();

  for (let i = 0; i < 30; i++) {
    let enemy = {
      x: random(100, 700),
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

  // button6
  button6 = createButton("Play again");
  button6.mousePressed(playAgain);
  button6.size(170, 80);
  button6.position(750, 700);
  button6.hide();
  button6.addClass("button6");

  //button7
  button7 = createButton("Oh shoot! Who are you?!");
  button7.mousePressed(dialogWithGhost2);
  button7.position(750, 830);
  button7.hide();
  button7.addClass("button7");

  //button8
  button8 = createButton("What happened?");
  button8.mousePressed(dialogWithGhost3);
  button8.position(750, 830);
  button8.hide();
  button8.addClass("button8");

  //button9
  button9 = createButton("What?! How?");
  button9.mousePressed(dialogWithGhost4);
  button9.position(750, 830);
  button9.hide();
  button9.addClass("button9");
  //button10
  button10 = createButton("Continue...");
  button10.mousePressed(continueGame);
  button10.position(750, 830);
  button10.hide();
  button10.addClass("button10");
  // button11
  button11 = createButton("Oh, thank you");
  button11.mousePressed(finalScreen);
  button11.position(750, 830);
  button11.hide();
  button11.addClass("button10");
}

// basics of shooter game screen
function shooterGameScreen() {
  background(0);

  animation(mainCharacterAni, mouseX, height - 100);
  for (let bullet of bullets) {
    ellipse(bullet.x, bullet.y, 10);
    bullet.y = bullet.y - 5;
  }
  for (let enemy of enemies) {
    animation(ghostEnemy, enemy.x, enemy.y);
    enemy.y = enemy.y + 2;
  }
  for (let enemy of enemies) {
    for (let bullet of bullets) {
      if (
        dist(
          enemy.x,

          enemy.y,

          bullet.x,
          bullet.y
        ) < 10
      ) {
        enemies.splice(enemies.indexOf(enemy), 1);
        score += 1;
      }
      if (dist(enemy.x, enemy.y, mouseX, height - 100) < 10) {
        state = "youLost";
      }
      if (enemy.y > 800) {
        state = "youLost";
      }
      if (score > 29) {
        state = "exitFromTheForest";
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

let state = "newGame";

function draw() {
  if (state === "room") {
    background(bg1);
    // music();
    button5.hide();
    animation(mainCharacterAni, xMainCharacter, yMainCharacter);
    push();

    image(grannyWatchingTv, 480, 280, 300, 300);
    pop();
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
    // if (
    //   xMainCharacter < 100 &&
    //   xMainCharacter > 350 &&
    //   yMainCharacter > 200 &&
    //   yMainCharacter < 500
    // ) {
    //   xMainCharacter += 2;
    //   yMainCharacter -= 2;
    // }

    // popping out of the cloud background for grandma's text
    if (xMainCharacter > 100 && yMainCharacter > 200) {
      cloudText();
    }
    if (xMainCharacter > 500 && yMainCharacter > 300) {
      state = "dialogWithGrannyState";
    }
  }
  //play again after failing
  if (state === "newGame") {
    background(bg1);
    // music();
    button5.hide();
    button6.hide();

    animation(mainCharacterAni, xMainCharacter, yMainCharacter);
    push();

    image(grannyWatchingTv, 500, 300, 300, 300);
    pop();
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

    if (xMainCharacter > 100 && xMainCharacter < 600 && yMainCharacter > 200) {
      cloudText();
    }
    if (xMainCharacter > 500 && yMainCharacter > 300) {
      state = "dialogWithGrannyState";
    }
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
    image(grannyWatchingTv, 500, 300, 300, 300);
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
    if (xMainCharacter > 370 && xMainCharacter < 500 && yMainCharacter > 700) {
      state = "forestWithHouseState";
    }
  }
  if (state === "forestWithHouseState") {
    forestWithHouse();
    collectedItems();
    // xMainCharacter = 400;
    // yMainCharacter = 400;
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
      xMainCharacter += 2;
    }
    if (xMainCharacter > 750) {
      xMainCharacter -= 2;
    }
    if (yMainCharacter < 0) {
      yMainCharacter += 2;
    }
    if (yMainCharacter > 750) {
      yMainCharacter -= 2;
    }
  }
  if (state === "maze") {
    background(0);

    // trembling position of Tamashi
    image(miniGhost, xMiniGhost, yMiniGhost, 150, 150);
    xMiniGhost += random(-2, 2);
    yMiniGhost += random(-2, 2);
    collectedItems();
    image(weapon, 700, 10, 100, 100);

    // wall1.draw();

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
      xMainCharacter += 2;
    }
    if (xMainCharacter > 750) {
      xMainCharacter -= 2;
    }
    if (yMainCharacter < 0) {
      yMainCharacter += 2;
    }
    if (yMainCharacter > 750) {
      yMainCharacter -= 2;
    }

    push();
    fill(0);
    rect(xWall1, yWall1, widthWall1, heightWall1);
    pop();

    //coliding with the 1st wall and coming back to the starting position
    //it identifies how close the character to the wall
    if (
      xMainCharacter > xWall1 - widthWall1 + 50 &&
      xMainCharacter < xWall1 + widthWall1 + 50 &&
      yMainCharacter < yWall1 + heightWall1 + 30
    ) {
      xMainCharacter = 100;
      yMainCharacter = 100;
    }

    push();
    fill(0);
    rect(xWall2, yWall2, widthWall2, heightWall2);
    pop();

    //colliding with 2nd wall
    if (
      xMainCharacter > xWall2 - widthWall2 + 50 &&
      xMainCharacter < xWall2 + widthWall2 + 50 &&
      yMainCharacter > yWall2 - heightWall2 + 500
    ) {
      xMainCharacter = 100;
      yMainCharacter = 100;
    }
    push();
    fill(0);
    rect(xObstacle2, yObstacle2, widthObstacle2, heightObstacle2);
    pop();
    if (
      xMainCharacter > xObstacle2 &&
      xMainCharacter < xObstacle2 + widthObstacle2 &&
      yMainCharacter > yObstacle2 - heightObstacle2 + 70 &&
      yMainCharacter < yObstacle2 + heightObstacle2
    ) {
      xMainCharacter = 100;
      yMainCharacter = 100;
    }

    push();
    fill(0);
    rect(xWall3, yWall3, widthWall3, heightWall3);
    pop();
    //colliding with 3rd wall
    if (
      xMainCharacter > xWall3 - widthWall3 + 350 &&
      xMainCharacter < xWall3 + widthWall3 &&
      yMainCharacter > yWall3 - heightWall3 + 70 &&
      yMainCharacter < yWall3 + heightWall3 + 30
    ) {
      xMainCharacter = 100;
      yMainCharacter = 100;
    }
    push();
    fill(0);
    rect(xObstacle1, yObstacle1, widthObstacle1, heightObstacle1);
    pop();
    if (
      xMainCharacter > xObstacle1 &&
      xMainCharacter < xObstacle1 + widthObstacle1 &&
      yMainCharacter > yObstacle1 - heightObstacle1 + 70 &&
      yMainCharacter < yObstacle1 + heightObstacle1
    ) {
      xMainCharacter = 100;
      yMainCharacter = 100;
    }
    push();
    fill(0);
    rect(xObstacle3, yObstacle3, widthObstacle3, heightObstacle3);
    pop();
    if (
      xMainCharacter > xObstacle3 &&
      xMainCharacter < xObstacle3 + widthObstacle3 &&
      yMainCharacter > yObstacle3 - heightObstacle3 &&
      yMainCharacter < yObstacle3 + heightObstacle3
    ) {
      xMainCharacter = 100;
      yMainCharacter = 100;
    }
    if (yMainCharacter > 500 && xMainCharacter > 0) {
      state = "ghostState";
    }
    image(mazeBg, 0, 0, 800, 800);
    push();

    // Calculate the position of the eyes based on xMainCharacter and yMainCharacter
    let xEyes = map(xMainCharacter, 0, width, 210, 300);
    let yEyes = map(yMainCharacter, 0, height, 150, 250);
    xEyes = constrain(xEyes, 210, 270);
    yEyes = constrain(yEyes, 130, 180);

    // Draw the red irises with the updated position
    fill(255, 0, 0);
    noStroke();
    ellipse(xEyes - 10, yEyes, 10, 10);
    ellipse(xEyes + 10, yEyes, 10, 10);

    pop();
  }

  if (state === "ghostState") {
    ghostScreen();
    dialogWithGrannyRect();
    dialogWithGhost();
    button7.show();
  }
  if (state === "dialogWithGhostState") {
    ghostScreen();
    dialogWithGrannyRect();
    dialogWithGhostText2();
    button7.hide();
    button8.show();
  }
  if (state === "dialogWithGhostState2") {
    ghostScreen();
    dialogWithGrannyRect();
    dialogWithGhostText3();
    button8.hide();
    button9.show();
  }
  if (state === "dialogWithGhostState3") {
    ghostScreen();
    dialogWithGrannyRect();
    dialogWithGhostText4();
    button9.hide();
    button10.show();
  }
  if (state === "mazeAfterGhost") {
    background(0);
    button10.hide();
    // wall1.draw();
    collectedItems();
    image(weapon, xWeapon, yWeapon, 100, 100);
    image(evilGhost, xEvilGhost, yEvilGhost, 200, 200);
    xEvilGhost += random(-2, 2);
    yEvilGhost += random(-2, 2);

    // if(xWeapon > 699 && yWeapon < 11 && )

    animation(mainCharacterAni, xMainCharacter, yMainCharacter);
    if ((mainCharacterAniMovement = true)) {
      if (kb.holding("right")) {
        xMainCharacter += 5;
      }
      if (kb.holding("left")) {
        xMainCharacter -= 5;
      }
      if (kb.holding("up")) {
        yMainCharacter -= 5;
      }
      if (kb.holding("down")) {
        yMainCharacter += 5;
      }
    }
    if (xMainCharacter < 50) {
      xMainCharacter += 2;
    }
    if (xMainCharacter > 750) {
      xMainCharacter -= 2;
    }
    if (yMainCharacter < 0) {
      yMainCharacter += 2;
    }
    if (yMainCharacter > 750) {
      yMainCharacter -= 2;
    }
    push();
    fill(0);
    rect(xWall1, yWall1, widthWall1, heightWall1);
    pop();

    //coliding with the 1st wall and coming back to the starting position
    //it identifies how close the character to the wall
    if (
      xMainCharacter > xWall1 - widthWall1 + 50 &&
      xMainCharacter < xWall1 + widthWall1 + 50 &&
      yMainCharacter < yWall1 + heightWall1 + 30
    ) {
      xMainCharacter = 100;
      yMainCharacter = 100;
    }

    push();
    fill(0);
    rect(xWall2, yWall2, widthWall2, heightWall2);
    pop();

    //colliding with 2nd wall
    if (
      xMainCharacter > xWall2 - widthWall2 + 50 &&
      xMainCharacter < xWall2 + widthWall2 + 50 &&
      yMainCharacter > yWall2 - heightWall2 + 500
    ) {
      xMainCharacter = 100;
      yMainCharacter = 100;
    }
    push();
    fill(0);
    rect(xObstacle2, yObstacle2, widthObstacle2, heightObstacle2);
    pop();
    if (
      xMainCharacter > xObstacle2 &&
      xMainCharacter < xObstacle2 + widthObstacle2 &&
      yMainCharacter > yObstacle2 - heightObstacle2 + 70 &&
      yMainCharacter < yObstacle2 + heightObstacle2
    ) {
      xMainCharacter = 100;
      yMainCharacter = 100;
    }

    push();
    fill(0);
    rect(xWall3, yWall3, widthWall3, heightWall3);
    pop();
    //colliding with 3rd wall
    if (
      xMainCharacter > xWall3 - widthWall3 + 350 &&
      xMainCharacter < xWall3 + widthWall3 &&
      yMainCharacter > yWall3 - heightWall3 + 70 &&
      yMainCharacter < yWall3 + heightWall3 + 30
    ) {
      xMainCharacter = 100;
      yMainCharacter = 100;
    }
    push();
    fill(255, 0, 0);
    rect(xObstacle1, yObstacle1, widthObstacle1, heightObstacle1);
    pop();
    if (
      xMainCharacter > xObstacle1 &&
      xMainCharacter < xObstacle1 + widthObstacle1 &&
      yMainCharacter > yObstacle1 - heightObstacle1 + 70 &&
      yMainCharacter < yObstacle1 + heightObstacle1
    ) {
      xMainCharacter = 100;
      yMainCharacter = 100;
    }
    push();
    fill(0);
    rect(xObstacle3, yObstacle3, widthObstacle3, heightObstacle3);
    pop();
    if (
      xMainCharacter > xObstacle3 &&
      xMainCharacter < xObstacle3 + widthObstacle3 &&
      yMainCharacter > yObstacle3 - heightObstacle3 &&
      yMainCharacter < yObstacle3 + heightObstacle3
    ) {
      xMainCharacter = 100;
      yMainCharacter = 100;
    }
    if (
      xWeapon > 699 &&
      yWeapon < 11 &&
      xMainCharacter > 500 &&
      yMainCharacter > 200 &&
      yMainCharacter < 300
    ) {
      xMainCharacter = 450;
      yMainCharacter = 250;
    }
    if (xMainCharacter > 690 && yMainCharacter < 100) {
      xWeapon = 700;
      yWeapon = 700;
    }
    if (xMainCharacter > xEvilGhost && yMainCharacter > yEvilGhost) {
      battle();
    }
    image(mazeBg, 0, 0, 800, 800);
    push();

    // Calculate the position of the eyes based on xMainCharacter and yMainCharacter
    let xEyes = map(xMainCharacter, 0, width, 210, 300);
    let yEyes = map(yMainCharacter, 0, height, 150, 250);
    xEyes = constrain(xEyes, 210, 270);
    yEyes = constrain(yEyes, 130, 180);

    // Draw the red irises with the updated position
    fill(255, 0, 0);
    ellipse(xEyes - 10, yEyes, 10, 10);
    ellipse(xEyes + 10, yEyes, 10, 10);

    pop();
  }
  if (state === "shooterGameScreenState") {
    background(bg1);
    shooterGameScreen();
  }
  if (state === "youLost") {
    youLost();
    button6.show();
  }
  if (state === "exitFromTheForest") {
    ghostScreen();
    dialogWithGrannyRect();
    dialogWithGhostAfterForest();
    button11.show();
  }
  if (state === "finalScreenState") {
    background(screenWithMom);
    button11.hide();
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
      xMainCharacter += 2;
    }
    if (xMainCharacter > 750) {
      xMainCharacter -= 2;
    }
    if (yMainCharacter < 0) {
      yMainCharacter += 2;
    }
    if (yMainCharacter > 750) {
      yMainCharacter -= 2;
    }
  }
}

function cloudText() {
  image(cloud, 420, 120, 400, 400);
  fill(255);
  textSize(17);
  textFont("VT323");
  text("Jane, come here!", 515, 230, 400, 400);
}
function collectedItems() {
  push();
  fill(0);
  stroke(255);
  strokeWeight(4);
  rect(600, 700, 200, 100);
  pop();
  image(cookie, 600, 660, 150, 200);
  push();
  textSize(20);
  fill(255);
  textFont("VT323");
  text("Collected items", 640, 720, 200, 200);
  pop();
}
// black rectangle when you ar etalking with granny
function dialogWithGrannyRect() {
  fill(0);
  rect(0, 600, 800, 600);
}
function dialogWithGranny() {
  let dialogWithGrannyText1 = "Hi Jane! I have special mission for you!";
  let numChars = min(dialogWithGrannyText1.length, floor(frameCount / 10));
  fill(255);
  textFont("VT323");
  textSize(30);
  text(dialogWithGrannyText1.substring(0, numChars), 100, 700);
}

function dialogWithGranny2() {
  state = "dialogWithGranny2State";
  let dialogWithGrannyText2 =
    "Here, I baked some cookies for your mom, could you carry it over to her?";
  let numChars2 = min(dialogWithGrannyText2.length, floor(frameCount / 10));
  fill(255);
  textSize();
  text(dialogWithGrannyText2.substring(0, numChars2), 50, 700);
}
function angryGranny() {
  state = "angryGrannyState";
  let dialogWithAngryGrannyText =
    "You ungrateful kiddo, take those cookies to your mother RIGHT NOW!!!";
  let numChars3 = min(dialogWithAngryGrannyText.length, floor(frameCount / 10));
  fill(255);
  textSize(25);
  text(dialogWithAngryGrannyText.substring(0, numChars3), 50, 700);
}
function happyGranny() {
  state = "happyGrannyState";
  let dialogWithHappyGrannyText = "Thank you honey :)! Here you have cookies!";
  let numChars4 = min(dialogWithHappyGrannyText.length, floor(frameCount / 10));
  fill(255);
  textSize(25);
  text(dialogWithHappyGrannyText.substring(0, numChars4), 100, 700);
}
function theEndOfTheDialogWithGranny() {
  state = "afterDialogWithGrannyState";
  yMainCharacter = 500;
  xMainCharacter = 500;
}
function forestWithHouse() {
  image(forest, 0, 0, 800, 800);
}
function ghostScreen() {
  push();
  background(0);
  noStroke();
  fill(255, 255, 255);
  scale(1.3);
  animation(ghostAni, 300, 300);
  for (let i = 0; i < 200; i++) rect(random(900), random(900), 1, 1500);
  pop();
}

function dialogWithGhost() {
  let dialogWithGhost1 = "Hey? Is there someone here? ";
  let numCharsGhost1 = min(dialogWithGhost1.length, floor(frameCount / 10));
  fill(255);
  textSize(30);
  textFont("VT323");
  text(dialogWithGhost1.substring(0, numCharsGhost1), 100, 700);
}

function dialogWithGhost2() {
  state = "dialogWithGhostState";
}
function dialogWithGhostText2() {
  let dialogWithGhost2 =
    "I’m Tamashi. I was killed in this maze by evil spirit and his followers.";
  let numCharsGhost2 = min(dialogWithGhost2.length, floor(frameCount / 10));
  fill(255);
  textSize(25);
  textFont("VT323");
  text(dialogWithGhost2.substring(0, numCharsGhost2), 50, 700);
}
function dialogWithGhost3() {
  state = "dialogWithGhostState2";
}

function dialogWithGhostText3() {
  // let dialogWithGhost3 =
  "I fought with his army and was defeated. Now my soul is forever stuck in this maze and YOU can help both of us.";
  // let numCharsGhost3 = min(dialogWithGhost3.length, floor(frameCount / 10));
  fill(255);
  textSize(30);
  textFont("VT323");
  text(
    "I fought with his army and was defeated. Now my soul is ",
    50,
    650,
    1000,
    100
  );
  text("forever stuck in this maze and YOU can help me!", 50, 700, 1000, 100);
  // text(dialogWithGhost3.substring(0, numCharsGhost3), 50, 700);
}
function dialogWithGhost4() {
  state = "dialogWithGhostState3";
}

function dialogWithGhostText4() {
  let dialogWithGhost4 =
    "Jane, you will face his army in the battle. You have only one chance to get out of here.";
  let numCharsGhost4 = min(dialogWithGhost4.length, floor(frameCount / 10));
  fill(255);
  textSize(20);
  textFont("VT323");
  text(dialogWithGhost4.substring(0, numCharsGhost4), 50, 700);
}

function continueGame() {
  state = "mazeAfterGhost";
}
function battle() {
  state = "shooterGameScreenState";
}

function youLost() {
  background(0);
  fill(255, 255, 255);
  textSize(70);
  textFont("VT323");
  text("You lost!", 270, 100, 300, 300);
}
function playAgain() {
  state = "newGame";
}

function dialogWithGhostAfterForest() {
  let dialogWithGhostAfterForest = "Thank you";
  fill(255);
  textSize(30);
  textFont("VT323");
  text(dialogWithGhostAfterForest, 100, 650, 800, 700);
}
function finalScreen() {
  state = "finalScreenState";
}

// function music() {
//   mySound.play();
// }
