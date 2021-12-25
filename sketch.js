//creating variable 
var gameState = "PLAY"
var bg, backgroundImg;
var diamondScore=0;

//loading Image
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImg = loadImage("images/iron.png");
  platformImage = loadImage ("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  spikeImage = loadImage ("images/spikes.png");
  restartImage = loadImage ("images/restart.png");
}
//creating sprites and groups 
function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale = 2;

  iron = createSprite(200,500,20,50);
  iron.addImage(ironImg); 
  iron.scale = 0.3;
  iron.setCollider("rectangle",100,0,200,400)

  ground = createSprite(200,585,400,10);
  ground.visible = false

  platformGroup = new Group ();
  diamondGroup = new Group();
  spikeGroup = new Group();

  restart = createSprite(500,300);
  restart.addImage(restartImage);
  restart.visible = false; 
 
}

function draw() {
  if(gameState === "PLAY"){

  //Iron man keys to move around
  if (keyDown("space")){
    iron.velocityY = -15
  } 
  if (keyDown("up")){
    iron.velocityY = -10
  }
  if (keyDown("left")){
    iron.x = iron.x  -5
  }
  if (keyDown("right")){
    iron.x = iron.x  +5
  }
  iron.velocityY += 0.5 

  //making Iron man stay on the "ground"
//iron.collide("rectangle",0,0,200,500)
bg.velocityY = 4;
if (bg.y > 500){
  bg.y = bg.width/4;
}

//creating patforms for iron man 
generatePlatforms();
for (var i = 0; i <platformGroup.length;i++){
  var temp = platformGroup.get(i);
//making iron man collide with platforms
  if (temp.isTouching(iron)){
    iron.collide(temp); 
  }
}
//creating diamonds for iron man to collect
generateDiamonds();
for (var i = 0 ; i<diamondGroup.length;i++){
  var temp = (diamondGroup).get(i);
//making iron man collect the diamonds
  if (temp.isTouching(iron)) {
    diamondScore++;
    temp.destroy();
    temp=null;
    

  }
}

//creating obstacles for iron man 
generateSpikes();
for (var i = 0 ; i<spikeGroup.length;i++){
  var temp = (spikeGroup).get(i);
//making iron man collide with obstacle 
  if (temp.isTouching(iron)) {
    diamondScore = diamondScore-5;
    temp.destroy();
    temp=null;
    

  }
}
if(diamondScore<=-10 || iron.y>610){
  gameState ="END";
 }

}
if(gameState ==="END"){
bg.velocityY=0;
iron.velocityY=0;
diamondGroup.setVelocityYEach(0);
spikeGroup.setVelocityYEach(0);
platformGroup.setVelocityYEach(0);
diamondGroup.setLifetimeEach(-1);
spikeGroup.setLifetimeEach(-1);
platformGroup.setLifetimeEach(-1);

restart.visible=true;
if(mousePressedOver(restart)){
restartGame();
}
}
//making the sprites appear
    drawSprites();
    //showing how much diamonds are collected 
    text("diamonds collected" + diamondScore,500,50); 

    
}


//creating function to make the platforms 
function generatePlatforms() {
  if (frameCount % 60 === 0) {
    var brick = createSprite(1200, 10, 40, 10);
    brick.x = random(50, 850);
    brick.addImage(platformImage);
    brick.velocityY = 5;
    brick.lifetime = 250;
    platformGroup.add(brick);
  }
}
//creating function to make the diamonds 
function generateDiamonds(){
  if (frameCount % 60 === 0){
    var diamond = createSprite(1205,15,45,15);
    diamond.addImage(diamondImage)
    diamond.x = random(55,855);
    diamond.velocityY = 5;
    diamond.lifetime = 250;
    diamond.scale = 0.7;
    diamondGroup.add(diamond);
  }
}
//creating function to make the spikes
function generateSpikes(){
  if (frameCount % 60 === 0){
    var spike = createSprite(1205,15,45,15);
    spike.addImage(spikeImage)
    spike.x = random(55,855);
    spike.velocityY = 5;
    spike.lifetime = 250;
    spike.scale = 0.5;
    spikeGroup.add(spike);
  }
}

function restartGame(){
  gameState ="PLAY";
  platformGroup.destroyEach();
  diamondGroup.destroyEach();
  spikeGroup.destroyEach();
  diamondScore=0;
  
  iron.y=50;
  restart.visible=false;
}