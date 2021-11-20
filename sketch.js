var PLAY = 1;
var END = 0;
var gameState = PLAY;


var ironMan, ironMan_running, ironMan_collided;
var road, invisibleroad, roadImage;

var cloudsGroup, cloudImage;
var buildingsGroup, building1,building2, building3,building4; 

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var message = "This is a message";

function preload(){
  
  ironMan_running = loadAnimation("ironman.png");
  ironMan_collided = loadAnimation("ironman.png");
  
  roadImage = loadImage("road.jpg");
  
  cloudImage = loadImage("clouds.jpg");
  
  building1 = loadImage("building 1.png");
  building2 = loadImage("building 2.png");
  building3 = loadImage("building 3.png");
  building4 = loadImage("building 4.png");
  
}

 function setup(){
  createCanvas(600, 200);

  ironMan = createSprite(50,180,20,50);
  ironMan.addAnimation("running", ironMan_running);
  ironMan.addAnimation("collided" ,ironMan_collided);
  ironMan.scale = 0.5;

  road = createSprite(100,180,400,20);
  road.addImage(roadImage);
  road.x = road.width /2;

  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create building and Cloud Groups
  sbuildingGroup = createGroup();
  cloudsGroup = createGroup();
  
  //console.log("Hello" + 5);
  
  ironMan.setCollider("circle",0,0,40);
  ironMan.debug = false;
  
  score = 0;
 }

  function draw(){
    background(180);

  console.log(frameCount);
  //displaying score;
  text("Score: "+ score, 500,50);
  
 // console.log("this is ",gameState);
  
 if(gameState === PLAY){
  gameOver.visible = false
  restart.visible = false
  //move the road
  road.velocityX = - (4 + score / 100);
  //scoring
  score = score + Math.round(getFrameRate()/60);
  if(score > 0 && score % 500 === 0 ) {
    checkPointSound.play();   
  }
  
  if (road.x < 0){
   road.x =road.width/2;
  }
  //jump when the space key is pressed
    if(keyDown("space")&& ironMan.y >= 100) {
        ironMan.velocityY = -12;
        jumpSound.play();
    }
     //add gravity
     ironMan.velocityY = ironMan.velocityY + 0.8
  
     //spawn the clouds
     spawnClouds();
   
     //spawn building on the ground
     spawnObuildings();

     if(buildingsGroup.isTouching(ironMan)){
      gameState = END;
      dieSound.play();
     //ironMan.velocityY = -12;
     //jumpSound.play();
     }
    }
   else if (gameState === END) {
    //console.log("hey")
     gameOver.visible = true;
     restart.visible = true;
    
     ground.velocityX = 0;
    ironMan.velocityY = 0
    
     //change the ironMan animation
  ironMan.changeAnimation("collided", ironman_collided);
    
     //set lifetime of the game objects so that they are never destroyed
   buildingsGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);
   buildingsGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);
  }
    //stop ironMan from falling down
    ironMan.collide(invisibleGround);
  
   if(mousePressedOver(restart)){
    // console.log("You have pressed the restart sprite");
     reset();
   }
   
   drawSprites();
 }
 function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  buildingGroup.destroyEach();
  cloudsGroup.destroyEach();
  ironMan.changeAnimation("running",ironMan_running);
  score = 0;
}
function spawnbuildings(){
  if (frameCount % 60 === 0){
    var building = createSprite(400,165,10,40);
  building.velocityX = -(6 + score /100);
    
     //generate random buildings
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: building.addImage(buildin1);
               break;
       case 2: building.addImage(buildin2);
               break;
       case 3: building.addImage(buildin3);
               break;        
       case 4: building.addImage(buildin4);
               break;
       default: break;
     }
     
     //assign scale and lifetime to the building          
     building.scale = 0.5;
     building.lifetime = 300;
   
   //add each building to the group
   buildingsGroup.add(building);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = ironMan.depth;
   ironMan.depth =ironMan.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
  } 