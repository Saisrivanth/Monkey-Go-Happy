
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,ground,invisibileground;
var FoodGroup, obstacleGroup
var score = 0;
var gameState;
var PLAY = 1;
var END = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleimage= loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);

  FoodGroup = new Group();
  obstacleGroup = new Group();
  
   monkey = createSprite(50,70,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15;
  monkey.velocityY = 10;
  
  monkey.setCollider("rectangle",0,0,300,monkey.height);
  monkey.debug = false;
 
  
  ground = createSprite(100,390,1000,100);
  ground.velocityX = -2;
 
   
  invisibleground = createSprite(100,400,1000,100);
  invisibleground.velocityX = -2;
  
  banana = createSprite(Math.round(random(300,600)),Math.round(random(250,300)),10,10);
  banana.addImage(bananaImage);
  banana.scale = 0.10;
  banana.velocityX = -5;
  banana.lifetime = 250;
  FoodGroup.add(banana);
  
  
  obstacle = createSprite(500,330,20,20);
    obstacle.addImage(obstacleimage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5
    obstacle.depth = monkey.depth;
    obstacleGroup.add(obstacle);

  
  
}


function draw() {
 background("white");

  console.log(gameState);
  
  monkey.collide(invisibleground);
  ground.shapeColor = "lightgreen"
  
  if (ground.x<100){
    
    ground.x = ground.width/2
  }

  if (invisibleground.x<100){
    
    invisibleground.x = ground.width/2
  }
  
  if (monkey.depth<ground.depth){
    monkey.depth = invisibleground.depth+1;
  }
  
  invisibleground.visible = false;
  
if (frameCount%500===0){
    obstacle = createSprite(500,330,20,20);
    obstacle.addImage(obstacleimage);
    obstacle.scale = 0.15;
   obstacle.velocityX = -10;
    obstacle.depth = monkey.depth;
    obstacleGroup.add(obstacle);
  }
  
 if (keyWentDown("space")){
   monkey.velocityY = -10
 }
  if(monkey.y<100){
    monkey.velocityY = 10;
    
  
  }
  
 if (frameCount % 50 === 0){
  banana = createSprite(Math.round(random(300,600)),Math.round(random(250,300)),10,10);
  banana.addImage(bananaImage);
  banana.scale = 0.10;
  banana.velocityX = -5;
  banana.lifetime = 250;
  FoodGroup.add(banana)
 } 
 
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = Math.round(frameCount/50);
  }
 
  
   if(monkey.isTouching(obstacleGroup)){
    gameState = END;
     } 
 
  if(gameState === END){
    monkey.destroy();
     obstacleGroup.destroyEach();
     FoodGroup.destroyEach();
     obstacleGroup.velocityX = 0;
     FoodGroup.velocityX = 0;
    score = 0;
  }

  
 drawSprites(); 
  fill("black");
  textSize(20);
  text("Survival time:"+score,250,20);
}






