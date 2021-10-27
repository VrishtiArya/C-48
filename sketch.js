var ground ; 
var alien ;
var meteoroids;
var meteoroidsGrp , coinsGrp;
var gameState = "play";
var score = 0;
var coins;

function preload(){
groundImg = loadImage("images/Background 1.png");
alienImg = loadAnimation("images/alien 1.png","images/alien 2.png");
meteoroidsImg = loadImage("images/meteoroids.png");
coinsImg = loadImage("images/coin.png");
}

function setup() {
  createCanvas(windowWidth , windowHeight);
  // spawnmeteoroids();
  ground = createSprite(windowWidth/2 , windowHeight/2);
  ground.addImage(groundImg);
  ground.scale = 0.8;
  ground.velocityX = -4;

  alien = createSprite(100,windowHeight-200);
  alien.addAnimation("walking alien",alienImg);
  meteoroidsGrp = new Group();
  coinsGrp = new Group();
}

function draw() {
  background(0,0,0);
  console.log(gameState);
  if(gameState === "play"){
  if(ground.x<0){
    ground.x = windowWidth/2
  }
   if(keyDown(UP_ARROW)&& alien.y>windowHeight/4){
  alien.y-= 3;
   }

   if(keyDown(DOWN_ARROW)&& alien.y<3*windowHeight/4){
     alien.y+=3;
   }
  if (frameCount%100 === 0){
    spawnmeteoroids();
  }

  if(alien.isTouching(meteoroidsGrp)){
    meteoroidsGrp.destroyEach();
    alien.destroy();
    gameState = "end";
  }
if(alien.isTouching(coinsGrp)){
  for(var i = 0;i<coinsGrp.length;i++){
    coinsGrp[i].destroy();
    score = score +1 ;
   }

}
if(frameCount%20 === 0){
    spawnCoins();
}

  drawSprites();
  fill("white");
  textSize(30);
  text("Score = "+score,windowWidth-200,windowHeight-500)
  }
  if (gameState === "end"){
    fill("red");
    textSize(80);
    text("Game Over!!!",windowWidth/4,windowHeight/3);
  
  }

}
function spawnmeteoroids(){
  ranY = Math.round(random(windowHeight/4,3*windowHeight/4))
 meteoroids = createSprite(windowWidth+100,ranY,50,50);
 meteoroids.addImage(meteoroidsImg);
 meteoroids.scale=0.4;
 meteoroids.velocityX=-10;
 meteoroids.lifetime=200;
 meteoroidsGrp.add(meteoroids);
  }
  function spawnCoins(){
    
      ran = Math.round(random(windowHeight/4,3*windowHeight/4));
      coins = createSprite(windowWidth+100,ran,50,50);
      coins.addImage(coinsImg);
      coins.scale=0.1;
      coins.velocityX=-20;
      coins.lifetime=200;
      coinsGrp.add(coins);

    
    
  }

 