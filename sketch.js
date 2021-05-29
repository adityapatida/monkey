var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score= 0;
var points= 0;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImage = loadImage("banana.png");
 // obstacleImage = loadImage("obstacle.png");
 

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  obstacleGroup=new Group();
  foodGroup=new Group();

}

function draw() { 
  background(0);

 
  score=score+Math.round(getFrameRate()/60);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    if(player.isTouching(foodGroup)){
      foodGroup.destroyEach();
      points=points+1;
  }
  if(player.isTouching(obstacleGroup)){
    gameState=END;
  }
  obstacles();
  food();
    
    player.collide(ground);

  }
  else if(gameState==END){
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    score=0;
    points=0;
  }
  drawSprites();
  textSize(12);
  fill("Blue");
  text("SURVIVAL TIME="+score,450,20);
  text("BANANA POINTS="+points,250,20)
}
function food(){
  if(frameCount%80===0){
    banana=createSprite(600,250,10,10);
    banana.addImage("food",bananaImage);
    banana.velocityX=-4;
    banana.y=Math.round(random(10,250))
    banana.scale=0.1;
    banana.lifetime=160;
    foodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(600,250,10,10);
    //obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX=-4;
    obstacle.scale=0.17;
    obstacle.lifetime=160;
    obstacleGroup.add(obstacle);
  }
}