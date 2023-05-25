// canva
let c;
// backgroun for room
let bg1;
// main character
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
let handWithGun;
let xWeapon = 650;
let yWeapon = 10;
let wWeapon = 100;
let hWeapon = 50;
let ghostEnemy;
let mazeBg;
let grayBg;
let screenWithMom;
let catAni;
let angryCat;
let loveCat;
let water;
let fishImg;
let alpha = 0;
let momAni;
let momImg;
let heart;
let starImg;
let title1;
let title2;
let title3;
let gameOver;
let rod;
let catHint;
let xCatHint = 50;
let yCatHint = 150;
let arrowUp;
let arrowDown;
let arrowLeft;
let arrowRight;
let ghostSprite;
let grannySprite;
let mainCharacterSprite;
let catSprite;
let meadow;

let stars = []; // array to store the stars
let speed = 0.1; // speed of parallax effect
let starSize = 10;

let bullets = [];
let enemies = [];
let score = 0;
let fishes = [];
let fishScore = 0;

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
  // room
  bg1 = loadImage("locations/room.png");
  // maze
  mazeBg = loadImage("locations/maze.png");
  // grey background in the maze
  grayBg = loadImage("otherImages/grayBg.png");
  // exit from the forest with mom
  screenWithMom = loadImage("locations/screenWithMom.png");

  cloud = loadImage("otherImages/cloud.png");
  cookie = loadImage("otherImages/cookie.png");

  forest = loadImage("locations/forestWithHouse.png");

  grannyWatchingTv = loadImage("folderGrannyWatchingTv/grandmaWatchingTv.png");

  miniGhost = loadImage("ghost/miniGhost.png");

  evilGhost = loadImage("ghost/evilGhost.png");

  weapon = loadImage("otherImages/weapon.png");

  handWithGun = loadImage("otherImages/handWithGun.png");
  heart = loadImage("otherImages/heart.png");

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
  // image of cat during dialog with cat
  catAni = loadImage("otherImages/cat.png");
  // image of angry cat during dialog with cat
  angryCat = loadImage("otherImages/angryCat.png");
  // image of cat with hearts after fishing mini game
  loveCat = loadImage("otherImages/loveCat.png");

  ghostAni = loadAnimation("ghost/ghost.png");
  // small ghosts in the ghost mini game
  ghostEnemy = loadImage("ghost/ghostEnemy.png");
  // bg image for fishing mini game
  water = loadImage("otherImages/water.png");
  // small fish in mini game
  fishImg = loadImage("otherImages/fishImg.png");

  momAni = loadAnimation("mommy/mommy.png");
  momAni.frameDelay = 10;

  momImg = loadImage("mommy/momSprite.png");
  starImg = loadImage("otherImages/star.png");

  title1 = loadImage("otherImages/title1.png");
  title2 = loadImage("otherImages/title2.png");
  title3 = loadImage("otherImages/title3.png");

  gameOver = loadImage("otherImages/gameOver.png");

  rod = loadImage("otherImages/rod.webp");

  catHint = loadImage("otherImages/catHint.png");
  arrowUp = loadImage("otherImages/arrowUp.png");
  arrowDown = loadImage("otherImages/arrowDown.png");
  arrowLeft = loadImage("otherImages/arrowLeft.png");
  arrowRight = loadImage("otherImages/arrowRight.png");

  ghostSprite = loadImage("otherImages/ghostSprite.png");
  grannySprite = loadImage("otherImages/grannySprite.png");
  catSprite = loadImage("otherImages/catSprite.png");
  mainCharacterSprite = loadImage("mainCharacterAni/mainCharacterAni1.png");
  meadow = loadImage("otherImages/meadow.png");
}

function setup() {
  noSmooth();
  c = createCanvas(800, 800);
  c.style("position", "absolute");

  // images don't loose quality
  noSmooth();
  // loop for ghosts in mini game ghost
  // the next followed 7 lines of code are imported from this tutorial: https://www.youtube.com/watch?v=GusFmfBmJmc
  for (let i = 0; i < 20; i++) {
    let enemy = {
      x: random(100, 700),
      y: random(height - 1200, height - 900),
    };
    enemies.push(enemy);
  }
  // loop for fish in mini game fish
  for (let i = 0; i < 20; i++) {
    let fish = {
      x: random(100, 700),
      y: random(100, 500),
    };
    fishes.push(fish);
  }

  for (let i = 0; i < 50; i++) {
    let star = {
      x: random(width),
      y: random(height),
    };
    stars.push(star);
  }

  // button1, I added classes to button, it's better to stylize them in css
  // Jane aswers granny first time
  button1 = createButton("Sure!");
  button1.mousePressed(dialogWithGranny2);
  button1.position(550, 830);
  button1.addClass("button1");
  button1.hide();

  //button2
  // Jane want to have bring cookies to mom
  button2 = createButton("Ok, no problem!");
  button2.mousePressed(happyGranny);
  button2.position(550, 830);
  button2.hide();
  button2.addClass("button2");

  // button3
  // Jane refuses grandma
  button3 = createButton("Ehhh, I'm too busy grandma :/");
  button3.mousePressed(angryGranny);
  button3.position(1000, 830);
  button3.hide();
  button3.addClass("button3");

  // button4
  // Jane will take cookies beacuse grandma is angry
  button4 = createButton("Okay, okay...");
  button4.mousePressed(happyGranny);
  button4.position(750, 830);
  button4.hide();
  button4.addClass("button4");

  // button5
  // Jane "say goodbye" to grandma
  button5 = createButton("Take cookies from grandma");
  button5.mousePressed(theEndOfTheDialogWithGranny);
  button5.position(750, 830);
  button5.hide();
  button5.addClass("button5");

  // button6
  // Play again after failed battle with ghost enemies
  button6 = createButton("Play again");
  button6.mousePressed(playAgain);
  button6.position(780, 800);
  button6.hide();
  button6.addClass("button6");

  //button7
  // Jane is starting dialog with Tamashi
  button7 = createButton("Oh shoot! Who are you?!");
  button7.mousePressed(dialogWithGhost2);
  button7.position(750, 830);
  button7.hide();
  button7.addClass("button7");

  //button8
  // Jane is continuing dialog with Tamashi
  button8 = createButton("What happened?");
  button8.mousePressed(dialogWithGhost3);
  button8.position(750, 830);
  button8.hide();
  button8.addClass("button8");

  //button9
  // Jane is continuing dialog with Tamashi
  button9 = createButton("What?! How?");
  button9.mousePressed(dialogWithGhost4);
  button9.position(750, 830);
  button9.hide();
  button9.addClass("button9");

  //button10
  // Jane is continuing dialog with Tamashi
  button10 = createButton("Continue...");
  button10.mousePressed(continueGame);
  button10.position(750, 830);
  button10.hide();
  button10.addClass("button10");
  // button11
  // Jane has dialog with Tamashi after winning the mini game ghost
  button11 = createButton("Continue...");
  button11.mousePressed(finalScreen);
  button11.position(750, 830);
  button11.hide();
  button11.addClass("button11");
  // button12
  // Jane starts dialog with cat
  button12 = createButton("Sorry, I don't have any fish and I'm really busy.");
  button12.mousePressed(dialogWithCatState2);
  button12.position(720, 830);
  button12.hide();
  button12.addClass("button12");
  // button13
  // Jane refuses to cat
  button13 = createButton("Sorry, I'm in a hurry");
  button13.mousePressed(dialogWithCatState3);
  button13.position(550, 830);
  button13.hide();
  button13.addClass("button13");
  // button14
  // Jane accepts the cat's regueast, start of fishing mini game
  button14 = createButton("Okay, no problem :)");
  button14.mousePressed(fishingMiniGameState);
  button14.position(900, 830);
  button14.hide();
  button14.addClass("button14");
  // button15
  // Jane accepts the cat's request, start of fishing mini game
  button15 = createButton("Ahhh... Okay");
  button15.mousePressed(fishingMiniGameState);
  button15.position(750, 830);
  button15.hide();
  button15.addClass("button15");
  // button16
  // short dialog with cat after fishing mini game, Jane takes fish from cat
  button16 = createButton("Take a fish from cat");
  button16.mousePressed(forestWithHouseAfterDialogWithCat);
  button16.position(780, 830);
  button16.hide();
  button16.addClass("button16");
  // button17
  // Jane answers mom, end of the game
  button17 = createButton("Ahhh... It's a long story...");
  button17.mousePressed(thanks);
  button17.position(760, 820);
  button17.hide();
  button17.addClass("button17");

  button21 = createButton("Play again");
  button21.mousePressed(gameFromTheBeggining);
  button21.position(760, 730);
  button21.hide();
  button21.addClass("button17");

  // button18
  // Play button, start of the game
  button18 = createButton("Play");
  button18.mousePressed(descriptionOfGame);
  button18.position(780, 750);
  button18.hide();
  button18.addClass("button18");

  button19 = createButton("Play");
  button19.mousePressed(gameStart);
  button19.position(600, 750);
  button19.hide();
  button19.addClass("button19");

  button20 = createButton("I'm too scared o~o");
  button20.mousePressed(backToStart);
  button20.position(1000, 750);
  button20.hide();
  button20.addClass("button20");
}
function starBackground() {
  for (let i = 0; i < stars.length; i++) {
    noStroke();
    fill(255);
    image(starImg, stars[i].x, stars[i].y, starSize, starSize);
  }

  // apply parallax effect for stars
  // dx and dy represent the change in the x and y coordinates of the stars
  // map() function is used to map the value 0 from the range [0, 0] (i.e., the full range of the canvas width and height) to the range [-speed, speed]
  //  It determines the speed at which the stars move in the x and y directions
  let dx = map(0, 0, width, -speed, speed);
  let dy = map(0, 0, height, -speed, speed);
  for (let i = 0; i < stars.length; i++) {
    // x and y position of specific star is actualized
    // now it's now longer x and y but x and dy
    stars[i].x += dx;
    stars[i].y += dy;
    // if star moves beyond the canva, the star is appearing on the opposite side of canva
    // that's why the stars are always one the screen
    if (stars[i].x < 0) {
      stars[i].x = width;
    }
    if (stars[i].x > width) {
      stars[i].x = 0;
    }
    if (stars[i].y < 0) {
      stars[i].y = height;
    }
    if (stars[i].y > height) {
      stars[i].y = 0;
    }
  }
}

// basics of shooter game screen
function shooterGameScreen() {
  // loop for bullets in mini game ghost
  // the next followed 7 lines of code are imported from this tutorial: https://www.youtube.com/watch?v=GusFmfBmJmc
  for (let bullet of bullets) {
    push();
    fill(0, 0, 0);
    ellipse(bullet.x, bullet.y, 10);
    pop();
    bullet.y = bullet.y - 5;
  }
  image(handWithGun, mouseX - 200, 600, 350, 200);
  // loop for ghosts in mini game ghost
  // the next followed 5 lines of code are imported from this tutorial: https://www.youtube.com/watch?v=GusFmfBmJmc
  for (let enemy of enemies) {
    image(ghostEnemy, enemy.x, enemy.y, 100, 100);
    enemy.y = enemy.y + 1;
    // enemy.x += random(-2, 2);
  }
  // when bullet hit a ghost, ghost disappears
  // the next followed 14 lines of code are imported from this tutorial: https://www.youtube.com/watch?v=GusFmfBmJmc
  for (let enemy of enemies) {
    for (let bullet of bullets) {
      // if distance between bullet and ghost enemy is 10 (so really small), certain enemy ghost disappear and score is higher
      if (dist(enemy.x + 50, enemy.y + 50, bullet.x + 5, bullet.y + 5) < 10) {
        enemies.splice(enemies.indexOf(enemy), 1);
        score += 1;
      }

      // if enemy touches the bottom of the screen you lose and different screen appears
      if (enemy.y > 700) {
        state = "youLost";
      }
      // if you hit more than 9 ghosts you won
      if (score > 19) {
        state = "exitFromTheForest";
      }
    }
  }
  // counter of killed ghosts
  push();
  fill(255, 255, 255);
  textFont("VT323");
  textSize(30);
  text("Killed ghosts: " + score, 50, 700, 400, 400);
  pop();
  // if you click, you shoot bullets at ghosts
  // the next followed 7 lines of code are imported from this tutorial: https://www.youtube.com/watch?v=GusFmfBmJmc
  if (mouseIsPressed === true) {
    let bullet = {
      x: mouseX,
      y: height - 200,
    };
    bullets.push(bullet);
  }
}

let state = "start";

function draw() {
  if (state === "descriptionState") {
    background(0);
    button19.show();
    button20.show();
    button18.hide();
    button21.hide();
    descriptionScreen();
    starBackground();
  }
  if (state === "start") {
    background(0);
    button17.hide();
    button18.show();
    button20.hide();
    button19.hide();
    button21.hide();
    // text on the start screen
    image(title1, 100, 200, 600, 80);
    image(title2, 340, 350, 150, 80);
    image(title3, 200, 500, 400, 80);
    fill(255);
    textSize(20);
    textFont("VT323");
    text("Created by Klara Swiecicka and Olha Prylutska.", 10, 770, 600, 200);
    text("© 2023 CD Project Pink. All rights reserved.", 445, 770, 600, 200);
    // draw stars
    starBackground();
  }
  if (state === "room") {
    background(bg1);
    button17.hide();
    button20.hide();
    button19.hide();
    button5.hide();
    animation(mainCharacterAni, xMainCharacter, yMainCharacter);
    push();
    image(grannyWatchingTv, 480, 280, 300, 300);
    pop();
    // if you hold specific key, character character moves in specific direction
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
    // character cannot go beyond the canva, when character is close to the wall, direction of movement is opposite
    if (xMainCharacter < 50) {
      xMainCharacter += 2;
    }
    if (xMainCharacter > 600) {
      xMainCharacter -= 2;
    }
    if (yMainCharacter < 0) {
      yMainCharacter += 2;
    }
    if (yMainCharacter > 500) {
      yMainCharacter -= 2;
    }
    // if character is near table it comes back to the specific position, character cannot stand on the furnitures
    if (
      xMainCharacter < 400 &&
      xMainCharacter > 100 &&
      yMainCharacter < 500 &&
      yMainCharacter > 200
    ) {
      xMainCharacter = 200;
      yMainCharacter = 150;
    }

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
    button17.hide();
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
    //  if character is in the specific position image of cloud with text it's appearing
    if (xMainCharacter > 100 && xMainCharacter < 600 && yMainCharacter > 200) {
      cloudText();
    }
    // if character is close to the grandma, state is changing and dialog with grandma starts
    if (xMainCharacter > 500 && yMainCharacter > 300) {
      state = "dialogWithGrannyState";
    }
  }
  // dialog with grandma starts, all dialog in codes are made in similar way
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
  // room screen is the same but now cookie is in block with collected items and character can go further
  if (state === "afterDialogWithGrannyState") {
    background(bg1);
    collectedItems();
    button5.hide();
    animation(mainCharacterAni, xMainCharacter, yMainCharacter);
    image(grannyWatchingTv, 500, 300, 300, 300);
    image(catHint, xCatHint, yCatHint, 100, 100);
    yCatHint = random(yCatHint - 1, yCatHint + 1);
    cloudHintRoom();
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
    if (xMainCharacter < 400) {
      xMainCharacter += 2;
    }
    if (xMainCharacter > 540) {
      xMainCharacter -= 2;
    }
    if (yMainCharacter < 500) {
      yMainCharacter += 2;
    }
    if (yMainCharacter > 750) {
      yMainCharacter -= 2;
    }
    if (xMainCharacter > 370 && xMainCharacter < 500 && yMainCharacter > 700) {
      state = "forestWithHouseState";
    }
  }
  if (state === "forestWithHouseState") {
    forestWithHouse();
    // flashing cat eyes
    pop();
    noStroke();
    fill(155, 0, 0, Math.abs(Math.sin(alpha) * 255));
    ellipse(332, 330, 7, 7);
    // alpha is changing so eyes are "animated", they flash
    alpha = alpha + 0.3;
    fill(155, 0, 0, Math.abs(Math.sin(alpha) * 255));
    ellipse(345, 330, 7, 7);
    alpha = alpha + 0.3;
    pop();
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
    // character is moving in opposite direction if it's in certain place, all boundaries in the game are made in similar way
    if (xMainCharacter < 100) {
      xMainCharacter += 2;
    }
    if (xMainCharacter > 150 && xMainCharacter < 350 && yMainCharacter < 600) {
      yMainCharacter += 5;
    }
    if (xMainCharacter > 370 && xMainCharacter < 500 && yMainCharacter > 700) {
      xMainCharacter = 100;
      yMainCharacter = 100;
    }
    if (xMainCharacter > 400) {
      xMainCharacter -= 2;
    }
    if (yMainCharacter < 0) {
      yMainCharacter += 2;
    }
    if (yMainCharacter > 600) {
      yMainCharacter -= 2;
    }
    // if character is in certain position, dialog with cat starts
    if (xMainCharacter > 350 && yMainCharacter < 400) {
      state = "dialogWithCatState";
    }
  }
  // dialog with cat
  if (state === "dialogWithCatState") {
    background(0);
    image(catAni, 0, 0, 800, 800);
    dialogWithGrannyRect();
    dialogWithCat();
    button12.show();
  }
  if (state === "dialogWithCatState2") {
    background(0);
    image(catAni, 0, 0, 800, 800);
    dialogWithGrannyRect();
    dialogWithCat2Text();
    button12.hide();
    button13.show();
    button14.show();
  }
  if (state === "dialogWithCatState3") {
    image(angryCat, 0, 0, 800, 800);
    dialogWithGrannyRect();
    dialogWithCat3Text();
    button13.hide();
    button14.hide();
    button15.show();
  }
  if (state === "fishingMiniGameState") {
    fishingMiniGame();
    button13.hide();
    button14.hide();
    button15.hide();
  }
  if (state === "loveCatState") {
    image(loveCat, 0, 0, 800, 800);
    dialogWithGrannyRect();
    dialogWithLoveCatText();
    button16.show();
  }
  if (state === "forestWithHouseAfterDialogWithCat") {
    forestWithHouse();
    button16.hide();
    collectedItems();
    image(fishImg, 660, 735, 50, 50);
    image(heart, 325, 320, 12, 12);
    image(heart, 337, 319, 12, 12);
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
    if (xMainCharacter < 450) {
      xMainCharacter += 1;
    }
    if (yMainCharacter > 300) {
      yMainCharacter -= 3;
    }
    if (xMainCharacter > 500 && yMainCharacter > 200) {
      xMainCharacter -= 1;
    }
    if (yMainCharacter < 100) {
      yMainCharacter += 1;
    }
    // if in character is on top right corner of the screen, screen with maze is appearing
    if (xMainCharacter > 750 && yMainCharacter < 150) {
      state = "maze";
    }
  }
  if (state === "maze") {
    image(grayBg, 0, 0, 800, 800);
    // trembling position of Tamashi
    image(miniGhost, xMiniGhost, yMiniGhost, 150, 150);
    xMiniGhost += random(-1, 1);
    yMiniGhost += random(-1, 1);
    collectedItems();
    image(fishImg, 660, 735, 50, 50);
    image(weapon, 650, 20, wWeapon, hWeapon);
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
    if (xMainCharacter < 150 && yMainCharacter < 140) {
      yCatHint = random(700 - 1, 700 + 1);
      image(catHint, xCatHint, yCatHint, 100, 100);
      cloudHintBushes();
    }

    push();
    noStroke();
    fill(0, 0, 0, 0);
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
      yMainCharacter = 150;
    }

    push();
    noStroke();
    fill(0, 0, 0, 0);
    rect(xWall2, yWall2, widthWall2, heightWall2);
    pop();

    //colliding with 2nd wall
    if (
      xMainCharacter > xWall2 - widthWall2 + 50 &&
      xMainCharacter < xWall2 + widthWall2 + 50 &&
      yMainCharacter > yWall2 - heightWall2 + 500
    ) {
      xMainCharacter = 100;
      yMainCharacter = 150;
    }
    push();
    noStroke();
    fill(0, 0, 0, 0);
    rect(xObstacle2, yObstacle2, widthObstacle2, heightObstacle2);
    pop();
    if (
      xMainCharacter > xObstacle2 &&
      xMainCharacter < xObstacle2 + widthObstacle2 &&
      yMainCharacter > yObstacle2 - heightObstacle2 + 70 &&
      yMainCharacter < yObstacle2 + heightObstacle2
    ) {
      xMainCharacter = 100;
      yMainCharacter = 150;
    }

    push();
    noStroke();
    fill(0, 0, 0, 0);
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
      yMainCharacter = 150;
    }
    push();
    noStroke();
    fill(0, 0, 0, 0);
    rect(xObstacle1, yObstacle1, widthObstacle1, heightObstacle1);
    pop();
    if (
      xMainCharacter > xObstacle1 &&
      xMainCharacter < xObstacle1 + widthObstacle1 &&
      yMainCharacter > yObstacle1 - heightObstacle1 + 70 &&
      yMainCharacter < yObstacle1 + heightObstacle1
    ) {
      xMainCharacter = 100;
      yMainCharacter = 150;
    }
    push();
    noStroke();
    fill(0, 0, 0, 0);
    rect(xObstacle3, yObstacle3, widthObstacle3, heightObstacle3);
    pop();
    if (
      xMainCharacter > xObstacle3 &&
      xMainCharacter < xObstacle3 + widthObstacle3 &&
      yMainCharacter > yObstacle3 - heightObstacle3 &&
      yMainCharacter < yObstacle3 + heightObstacle3
    ) {
      xMainCharacter = 100;
      yMainCharacter = 150;
    }
    // if character is in certain position, dialog with Tamashi (miniGhost) starts
    if (yMainCharacter > 500 && xMainCharacter > 0) {
      state = "ghostState";
    }
    if (xMainCharacter > 700) {
      xMainCharacter = 100;
      yMainCharacter = 150;
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
  // dialog with Tamashi
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
  // screen with maze but Tamashi disapeared, evil ghost is on the screen
  if (state === "mazeAfterGhost") {
    image(grayBg, 0, 0, 800, 800);

    button10.hide();
    collectedItems();
    image(fishImg, 660, 735, 50, 50);
    image(evilGhost, xEvilGhost, yEvilGhost, 200, 200);
    // trembling animation of evil ghost
    xEvilGhost += random(-1, 1);
    yEvilGhost += random(-1, 1);

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
    noStroke();
    fill(0, 0, 0, 0);
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
      yMainCharacter = 150;
    }

    push();
    noStroke();
    fill(0, 0, 0, 0);
    rect(xWall2, yWall2, widthWall2, heightWall2);
    pop();

    //colliding with 2nd wall
    if (
      xMainCharacter > xWall2 - widthWall2 + 50 &&
      xMainCharacter < xWall2 + widthWall2 + 50 &&
      yMainCharacter > yWall2 - heightWall2 + 500
    ) {
      xMainCharacter = 100;
      yMainCharacter = 150;
    }
    push();
    noStroke();
    fill(0, 0, 0, 0);
    rect(xObstacle2, yObstacle2, widthObstacle2, heightObstacle2);
    pop();
    if (
      xMainCharacter > xObstacle2 &&
      xMainCharacter < xObstacle2 + widthObstacle2 &&
      yMainCharacter > yObstacle2 - heightObstacle2 + 70 &&
      yMainCharacter < yObstacle2 + heightObstacle2
    ) {
      xMainCharacter = 100;
      yMainCharacter = 150;
    }

    push();
    noStroke();
    fill(0, 0, 0, 0);
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
      yMainCharacter = 150;
    }
    push();
    noStroke();
    fill(0, 0, 0, 0);
    rect(xObstacle1, yObstacle1, widthObstacle1, heightObstacle1);
    pop();
    if (
      xMainCharacter > xObstacle1 &&
      xMainCharacter < xObstacle1 + widthObstacle1 &&
      yMainCharacter > yObstacle1 - heightObstacle1 + 70 &&
      yMainCharacter < yObstacle1 + heightObstacle1
    ) {
      xMainCharacter = 100;
      yMainCharacter = 150;
    }
    push();
    noStroke();
    fill(0, 0, 0, 0);
    rect(xObstacle3, yObstacle3, widthObstacle3, heightObstacle3);
    pop();
    if (
      xMainCharacter > xObstacle3 &&
      xMainCharacter < xObstacle3 + widthObstacle3 &&
      yMainCharacter > yObstacle3 - heightObstacle3 &&
      yMainCharacter < yObstacle3 + heightObstacle3
    ) {
      xMainCharacter = 100;
      yMainCharacter = 150;
    }
    // if character didn't take the gun character cannot go further
    if (
      xWeapon > 500 &&
      yWeapon < 200 &&
      xMainCharacter > 500 &&
      yMainCharacter > 200 &&
      yMainCharacter < 300
    ) {
      xMainCharacter = 450;
      yMainCharacter = 250;
    }
    if (
      xWeapon > 500 &&
      yWeapon < 200 &&
      xMainCharacter > 400 &&
      yMainCharacter > 200 &&
      yMainCharacter < 300
    ) {
      yCatHint = random(700 - 1, 700 + 1);
      image(catHint, xCatHint, yCatHint, 100, 100);
      cloudHintMaze();
    }
    // if character is next to the weapon, weapon changes the position and size and it's in box with collected items
    // because the weapon is not longer in initial position, character can go further
    if (xMainCharacter > 690 && yMainCharacter < 100) {
      xWeapon = 710;
      yWeapon = 740;
      wWeapon = 70;
      hWeapon = 35;
    }
    // if character is next to the evil ghost, screen is changing and mini shooter game with enemy ghosts starts
    if (xMainCharacter > xEvilGhost && yMainCharacter > yEvilGhost) {
      battle();
    }
    image(mazeBg, 0, 0, 800, 800);
    push();
    image(weapon, xWeapon, yWeapon, wWeapon, hWeapon);
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
    background(0);
    image(grayBg, 0, 0, 800, 800);
    shooterGameScreen();
  }
  if (state === "youLost") {
    youLost();
    button6.show();
  }
  // screen with dialog with Tamashi after winning the game with enemy ghosts
  if (state === "exitFromTheForest") {
    ghostScreen();
    dialogWithGrannyRect();
    dialogWithGhostAfterForest();
    button11.show();
  }
  // background with forest, house and mom
  if (state === "finalScreenState") {
    background(screenWithMom);
    button11.hide();
    animation(mainCharacterAni, xMainCharacter, yMainCharacter);
    collectedItems();
    image(fishImg, 660, 735, 50, 50);
    image(momImg, 450, 400, 160, 160);
    if (xMainCharacter > 500 && yMainCharacter > 400) {
      xMainCharacter = 100;
      yMainCharacter = 700;
    }
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
    if (xMainCharacter > 500) {
      xMainCharacter -= 2;
    }
    if (yMainCharacter < 0) {
      yMainCharacter += 2;
    }
    if (yMainCharacter > 650) {
      yMainCharacter -= 2;
    }

    if (xMainCharacter < 150 && yMainCharacter < 150) {
      xMainCharacter = 100;
      yMainCharacter = 700;
    }
    if (xMainCharacter > 0 && xMainCharacter < 400 && yMainCharacter < 600) {
      yMainCharacter += 1;
    }
    if (xMainCharacter > 401 && yMainCharacter < 500) {
      yMainCharacter += 1;
    }
    if (yMainCharacter > 650) {
      yMainCharacter -= 1;
    }
    if (xMainCharacter > 600 && yMainCharacter > 600) {
      xMainCharacter = 100;
      yMainCharacter = 800;
    }
    // if character is in certain position, dialog with mom starts
    if (xMainCharacter > 350 && yMainCharacter < 550) {
      state = "momState";
    }
  }
  if (state === "momState") {
    dialogWithMom();
    button17.show();
  }
  if (state === "thanksState") {
    button17.hide();
    button21.show();
    thanksScreen();
  }
}
// all functions
function cloudText() {
  image(cloud, 420, 120, 400, 400);
  fill(255);
  textSize(17);
  textFont("VT323");
  text("Jane, come here!", 515, 230, 400, 400);
}
function cloudHintRoom() {
  push();
  scale(-1, 1);
  image(cloud, -490, 40, 600, 300);
  pop();
  fill(255);
  textSize(20);
  textFont("VT323");
  text("Go to the door", 215, 120, 400, 400);
}
function cloudHintMaze() {
  push();
  scale(-1, 1);
  image(cloud, -490, 600, 600, 300);
  pop();
  fill(255);
  textSize(17);
  textFont("VT323");
  text("Remember about the gun,", 200, 670, 400, 400);
  text("ghosts are dangerous", 200, 687, 400, 400);
}
function cloudHintBushes() {
  push();
  scale(-1, 1);
  image(cloud, -490, 600, 600, 300);
  pop();
  fill(255);
  textSize(17);
  textFont("VT323");
  text("Be careful, there are", 200, 670, 400, 400);
  text("wild cats in the bushes", 200, 687, 400, 400);
}
function collectedItems() {
  push();
  fill(0);
  stroke(255);
  strokeWeight(4);
  rect(600, 700, 200, 100);
  pop();
  image(cookie, 620, 720, 80, 100);
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
    "Here, I baked some cookies for your mom, could you bring them to her?";
  let numChars2 = min(dialogWithGrannyText2.length, floor(frameCount / 10));
  fill(255);
  textSize(25);
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
  text(dialogWithHappyGrannyText.substring(0, numChars4), 150, 700);
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
  let dialogWithGhost1 = "Hey? Is anyone here?";
  let numCharsGhost1 = min(dialogWithGhost1.length, floor(frameCount / 10));
  fill(255);
  textSize(30);
  textFont("VT323");
  text(dialogWithGhost1.substring(0, numCharsGhost1), 270, 700);
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
  fill(255);
  textSize(25);
  textFont("VT323");
  text(
    "I fought with his army and was defeated. Now my soul is ",
    130,
    630,
    1000,
    100
  );
  text("forever stuck in this maze and YOU can help me!", 150, 680, 1000, 100);
}
function dialogWithGhost4() {
  state = "dialogWithGhostState3";
}

function dialogWithGhostText4() {
  textSize(25);
  let dialogWithGhost4 = "Jane, you will face his army in the battle.";
  let numCharsGhost4 = min(dialogWithGhost4.length, floor(frameCount / 10));
  fill(255);
  textFont("VT323");
  text(dialogWithGhost4.substring(0, numCharsGhost4), 170, 650);
  text("You have only one chance to get out of here.", 170, 700);
}

function continueGame() {
  state = "mazeAfterGhost";
}
function battle() {
  state = "shooterGameScreenState";
}

function youLost() {
  background(0);
  image(gameOver, 150, 120, 500, 500);
}
function playAgain() {
  state = "newGame";
}

function dialogWithGhostAfterForest() {
  let dialogWithGhostAfterForest = "Now my soul is free. Thank you.";
  fill(255);
  textSize(30);
  textFont("VT323");
  text(dialogWithGhostAfterForest, 200, 650, 800, 700);
}
function finalScreen() {
  state = "finalScreenState";
}
function dialogWithMom() {
  push();
  clear();
  scale(1.3);
  animation(momAni, 300, 300);
  pop();
  dialogWithGrannyRect();
  fill(255);
  textFont("VT323");
  textSize(30);
  text("Hi, honey! What took you so long to get here? ", 100, 650, 600, 600);
}
function dialogWithCat() {
  fill(255);
  textSize(30);
  textFont("VT323");
  text("Hi, do you have some fish?", 250, 650, 1000, 100);
}
function dialogWithCatState2() {
  state = "dialogWithCatState2";
}
function dialogWithCat2Text() {
  fill(255);
  textSize(30);
  textFont("VT323");
  text("Oh really!? So catch them for me!", 200, 650, 1000, 100);
}
function dialogWithCatState3() {
  state = "dialogWithCatState3";
}
function dialogWithCat3Text() {
  fill(255);
  textSize(30);
  textFont("VT323");
  text(
    "If you don't catch fish for me, I'll bite your ears!",
    100,
    650,
    1000,
    100
  );
}
// function that changes state so basically screen
function fishingMiniGameState() {
  state = "fishingMiniGameState";
}
function fishingMiniGame() {
  image(water, 0, 0, 800, 800);
  let rodX = mouseX;
  let rodY = mouseY;
  push();
  fill(0, 0, 0);
  image(rod, rodX - 80, rodY - 80);
  pop();
  for (let fish of fishes) {
    image(fishImg, fish.x, fish.y, 100, 100);
    fish.x += random(-2, 2);
    fish.y += random(-2, 2);
    // if distance between fish and mouse position is really small, certain fish disappear and score is incrementing
    if (dist(fish.x + 50, fish.y + 50, mouseX, mouseY) < 10) {
      fishes.splice(fishes.indexOf(fish), 1);
      fishScore += 1;
    }
    if (fishScore > 19) {
      state = "loveCatState";
    }
  }
  push();
  fill(0);
  textFont("VT323");
  textSize(30);
  text("Caught fish: " + fishScore, 100, 700, 400, 400);
  pop();
}

function dialogWithLoveCatText() {
  fill(255);
  textSize(30);
  textFont("VT323");
  text(
    "I love you!!! I'll give the most precious gift in the world,",
    50,
    630,
    1000,
    100
  );
  text("this beautiful, fat fish", 280, 680, 1000, 100);
}

function forestWithHouseAfterDialogWithCat() {
  state = "forestWithHouseAfterDialogWithCat";
}
function gameStart() {
  state = "room";
}
function gameFromTheBeggining() {
  state = "start";
  yMainCharacter = 100;
  xMainCharacter = 100;
}
function descriptionOfGame() {
  state = "descriptionState";
}
function descriptionScreen() {
  fill(255);
  textSize(35);
  textFont("VT323");
  text("In the game you are Jane, a young NMD student", 100, 100);
  text("You have a special mission from your grandma to do", 70, 150);
  text("and you go on dangerous journey", 190, 200);
  text("to the haunted forest", 270, 250);
  text("Move the character with arrow keys:", 180, 400);
  textSize(45);
  text("Are you ready?", 300, 320);
  image(arrowUp, 370, 430, 100, 100);
  image(arrowDown, 370, 525, 100, 100);
  image(arrowLeft, 300, 485, 100, 100);
  image(arrowRight, 420, 490, 100, 100);
}
function backToStart() {
  state = "start";
}
function thanks() {
  state = "thanksState";
}
function thanksScreen() {
  background(0);
  starBackground();
  image(meadow, 0, 500, 800, 400);
  image(catSprite, 100, 450, 150, 150);
  image(ghostSprite, 200, 440, 150, 150);
  image(mainCharacterSprite, 320, 440, 170, 170);
  image(momImg, 440, 450, 170, 170);
  image(grannySprite, 550, 455, 170, 170);
  noStroke();
  fill(255, 255, 255);
  rect(80, 740, 10, 10);
  textFont("VT323");
  textSize(50);
  text("Congratulations!", 255, 70, 200, 200);
  textSize(40);
  text("You completed the game!", 230, 160, 500, 200);
  text("Hope you enjoyed the gameplay :)", 180, 230, 600, 200);
  fill(0);
  textSize(20);
  text("Created by Klara Swiecicka and Olha Prylutska.", 10, 770, 600, 200);
  text("© 2023 CD Project Pink. All rights reserved.", 445, 770, 600, 200);
}
