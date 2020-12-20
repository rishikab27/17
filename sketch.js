var monkey , monkey_running
var backgroundImage,back
var ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var PLAY=1
var END=0
var gameState=PLAY

function preload(){  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")  
  bananaImage = loadImage("banana.png");
  obstacleImage= loadImage("obstacle.png");
  backgroundImage= loadImage("jungle.jpg")
}



function setup() {
  createCanvas(600,400)
  
  back=createSprite(300,100)
  back.addImage(backgroundImage)
  back.x=back.width/2
  
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("MONKEY",monkey_running)
  monkey.scale=0.1
  
  
  ground=createSprite(400,350,1000,10)
  ground.velocityX=-4
  ground.x = ground.width/2
  ground.visible=false
  console.log(ground.x)
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  if (gameState===PLAY) {
    
    //ground velocity
    if(back.x<0){
      back.x = back.width/2
    }
    if(ground.x<0){
      ground.x = ground.width/2
    }

  
    //monkey jump 
    if(keyDown("space")&&(monkey.y > 250)){
      monkey.velocityY= -7
    }
    
    monkey.velocityY=monkey.velocityY+0.3
    monkey.collide(ground)
  
    //score increase
    if(bananaGroup.isTouching(monkey)){
      score=score+2
      bananaGroup.destroyEach()
    }
    
    switch(score){
      case 10:
        monkey.scale=0.12
        break;
      case 20:
        monkey.scale=0.14
        break;
      case 30:
        monkey.scale=0.16
        break;
      case 40:
        monkey.scale=0.18
        break;
      default:
        break;
    }
  obs();
  bananas();
  //game end
    if(obstacleGroup.isTouching(monkey)){
      monkey.scale=0.075
    }
    
    if(obstacleGroup.isTouching(monkey) && (monkey.scale===0.075)) {
      gameState=END
    }
  }
  
  //if(gameState===END){
  
 // }

  drawSprites();
     //score
    stroke("white")
    textSize(20)
    fill("white");
    text("Score:"+ score,500,50);
  
}

function bananas(){
  if(frameCount%120===0){
    banana=createSprite(600,random(130,180))
    banana.addImage(bananaImage)
    banana.velocityX=-4
    banana.scale=0.1
    bananaGroup.add(banana)
  }
}

function obs(){
  if(frameCount%200===0){
    obstacle=createSprite(600,315)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX=-3
    obstacle.scale=0.1
    obstacleGroup.add(obstacle)
  }
}