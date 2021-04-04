var gameState, START = 1,
  PLAY = 2,
  END = 0
var iornMan, iornMan_Image;
var missle, missle_Image, missleGroup;
var helicopter1,helicopter1_Image,helicopter1Group;
var missle1, missle1_Image, missle1Group;
var coin, coin_Image, coinsGroup;
var blueStone,blueStone_Image,blueStoneGroup;
var side1, side2;
var cloudsGroup,cloud,cloudImage,land;
var score = 0;
//giving default gameState
gameState = START;


function preload() {
  //loading images
 iornMan_Image = loadImage("iorn man.gif");
  missile_Image = loadImage("missile.png");
   missile1_Image = loadImage("missile1.png");
  coins_Image = loadImage("coin.png");
  cloudImage = loadImage("cloud.png");
  blueStone_Image = loadImage("blue.jpg");
   gameOverSound = loadSound("gameover.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  collidedSound = loadSound("collided.wav")
}
function setup() {
  //creating canvas
  createCanvas(windowWidth,windowHeight);

  button1 = createButton("R");
  button1.size(50,50);
  button1.position(320,600);
   button1.mouseClicked(moveRight);
  button2 = createButton("L");
  button2.size(50,50);
  button2.position(60,600);
   button2.mouseClicked(moveLeft);
  
  

  //creating iorn man
  iornMan = createSprite(200,height-70,20,50);
  iornMan.addImage(iornMan_Image);
  iornMan.scale = 0.3;
  
  //creating sides
  side1 = createSprite(0, 200, 10, 40000000);
  side1.visible = false;
  side2 = createSprite(400, 200, 10, 4000000);
  side2.visible = false;

  //creating group
  coinsGroup = new Group();
  blueStoneGroup = new Group();
  missileGroup = new Group();
  missile1Group = new Group();
  cloudsGroup = new Group();
  
  
}
n=0

function draw() {
  background(168,182,255);
  function moveiornMan() {
  iornMan.positionX=+20;
}
 
  if (touches.length>0|| keyDown("space")){
    
      gameState = PLAY;
  }
 if ( gameState === PLAY) {
 
    
    
   
    //making background move
    camera.position.y = iornMan.y - 167
    iornMan.velocityY = -10


    //spawn Missles
    if (frameCount % 80 === 0) {
      spawnMissile();
    }
   
    
    
      if (frameCount % 200 === 0) {
      spawnMissile1();
    }

    //spawn Coins
    if (frameCount % 40 === 0) {
      spawnCoins();
    }
     if (frameCount % 140 === 0) {
      spawnblueStone();
    }
    
    //spawn Clouds
      spawnClouds();
    

    iornMan.collide(side1);
    iornMan.collide(side2);
    //iornMan.debug = true;
    iornMan.setCollider("rectangle", 0, 0, 170, 250);
    
    //scoreBoard
 if (iornMan.isTouching(coinsGroup)) {
      score += 1;
      checkPointSound.play();
      coinsGroup.destroyEach();
      
    }
    
    if (iornMan.isTouching(blueStoneGroup)) {
      score += 10;
        collidedSound.play();
      blueStoneGroup.destroyEach();
    }
    if (iornMan.isTouching(missileGroup) || keyDown("k") /*k=kill*/ ) {
      
      missileGroup.destroyEach();
      iornMan.velocityX = 0; 
      iornMan.velocityY = 0; 
       score=0;
      coinsGroup.destroyEach();
      blueStoneGroup.destroyEach();
      gameOverSound.play();
      cloudsGroup.destroyEach();
      gameState = END;
    }
    if (iornMan.isTouching(missile1Group) || keyDown("k") /*k=kill*/ ) {
      
      missile1Group.destroyEach();
      iornMan.velocityY = 0; 
      score=0;
       gameOverSound.play();
      coinsGroup.destroyEach();
      blueStoneGroup.destroyEach();
      cloudsGroup.destroyEach();
      iornMan.velocityX = 0; 
      gameState = END;
    }
    

  }
  if (gameState === END) {
  
   
 if(touches.length>0 || keyDown("R")) {      
      reset();
      touches = []
    }
    }
  

  drawSprites();

  //Displaying instructions
  if (gameState === START) {
    noStroke();
    fill(0);
    textSize(20);
    text("Touch OR SPACE To Start", 110, 200);
    text("Note:Use right & left arrow keys to move", 0, 20)
    text("If you want to complete your chance press k to kill yourSelf I don't know why you'll do but", 0, 40);
    text("you can", 0, 60)
  }
  if (gameState === PLAY || gameState === END) {
    noStroke();
    fill(1);
    textSize(20);
    text("score:" + score, 150, iornMan.y - 330)
  }
  if (gameState === END) {
    noStroke();
    fill(1);
    textSize(50);
    text("GAME OVER!☠", 20, camera.y);
    textSize(20);
    text("TOUCH OR R  to RESTART", 120, camera.y + 50)
  }
}

//creating funtion to spawn Missile
function spawnMissile() {
  missile = createSprite(0, iornMan.y - 400, 10, 10);
  missile.addImage("missile", missile_Image);
  missile.x = random(80, 320);
  missile.scale = 0.3;
  missile.lifetime = 45
  missile.setCollider("rectangle",27,0,200,400);
  missileGroup.add(missile)
}

function spawnMissile1() {
  missile1 = createSprite(0, iornMan.y - 400, 10, 10);
  missile1.addImage("missile1", missile1_Image);
  missile1.x = random(200, 500);
  missile1.scale = 0.3;
  missile1.lifetime = 45
  missile1.setCollider("rectangle",27,0,200,400);
  missile1Group.add(missile1)
}

function spawnCoins() {
  coin = createSprite(0, iornMan.y - 400, 10, 10);
  coin.addImage("coin", coins_Image);
  coin.x = random(80, 320);
  coin.scale = 0.1;
  coin.bounce(missileGroup)
  coin.setCollider("circle",0,0,269);
  coin.lifetime = 45

  coinsGroup.add(coin)
}

function spawnblueStone() {
  blueStone = createSprite(0, iornMan.y - 400, 10, 10);
  blueStone.addImage("blue", blueStone_Image);
  blueStone.x = random(200, 600);
  blueStone.scale = 0.1;
  blueStone.bounce(missileGroup)
  blueStone.setCollider("circle",0,0,269);
  blueStone.lifetime = 45

  blueStoneGroup.add(blueStone)
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 15=== 0) {
     cloud = createSprite(600,iornMan.y - 400,40,10);
    cloud.x = Math.round(random(10,390));
    cloud.addImage(cloudImage);
    cloud.scale = random(0.2,0.1);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = iornMan.depth;
    iornMan.depth += 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }


}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  missile1Group.destroyEach();
   cloudsGroup.destroyEach();
  missileGroup.destroyEach();
   coinsGroup.destroyEach();
      blueStoneGroup.destroyEach();
  
}

function moveRight() {
  iornMan.velocityX =+10;
}
function moveLeft() {
  iornMan.velocityX =-10;
}

