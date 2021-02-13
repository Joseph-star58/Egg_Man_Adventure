var eggMan,eggManImage
var bg,bgImage
var egg
var badEgg
var gamestate="play"
var i=0
var point
var coinPoint=0
var highscore=0
function preload(){
eggManImage=loadAnimation("egg_man4.png","egg_man3.png","egg_man2.png","egg_man1.png")
bgImage=loadImage("background.jpeg")
eggImage=loadImage("eggright.png")
badEgg=loadImage("obstical.png")
eggManJump=loadAnimation("jump.png")
ohno=loadImage("ohNo.png")
gameDone=loadImage("gameover.png")
replay=loadImage("replay8.png")
song=loadSound("song.wav")
deathSound=loadSound("y.mp3")
hurtEgg=loadAnimation("craked egg.png")
coinImage=loadImage("coin.png")
}

function setup() {
  createCanvas(800,400)
  bg=createSprite(150,150,10,10)
  bg.addImage("BG",bgImage)
  eggMan=createSprite(100,240,10,10)
  eggMan.addAnimation("EGGMAN",eggManImage)
  eggMan.scale=3
  bg.velocityX=-2 
  invisGround=createSprite(90,333,2000,13)
  eggMan.setCollider("rectangle",-5,0,10,70)
  gameover=createSprite(400,200)
  gameover.addImage(gameDone)
  gameover.scale=2
  gameover.visible=false
  restart=createSprite(400,333)
  restart.addImage(replay)
  restart.scale=1.5
  restart.visible=false
  song.play();

obsticalGroup=new Group()
eggGroup=new Group()
point=0
coinsGroup=new Group()
}
function BADEGG (){
if(frameCount%150===0){
  obstical=createSprite(800,200)
  obstical.velocityX=-3
  obstical.addImage(badEgg)
  obstical.lifetime=410
  obstical.y=Math.round(random(150,300))
  obsticalGroup.add(obstical)
  obstical.setCollider("circle",0,0,10)
}
}
function coins(){
  if(frameCount%150===0){
    coin=createSprite(800,100)
    coin2=createSprite(850,100)
    coin3=createSprite(900,100)
    coin.velocityX=-2
    coin.y=Math.round(random(30,130))
    coin2.y=coin.y
    coin3.y=coin.y
    coin.addImage(coinImage)
    coin2.addImage(coinImage)
    coin3.addImage(coinImage)
    coin.lifetime=410
    coinsGroup.add(coin2)
    coinsGroup.add(coin3)
    coinsGroup.add(coin)
    coin.setCollider("circle",0,0,25)
    coin2.setCollider("circle",0,0,25)
    coin3.setCollider("circle",0,0,25)
    coin.velocityX=-3
    coin2.velocityX=-3    
    coin3.velocityX=-3
    coinsGroup.setLifetimeEach(300)
    
}
}
function draw() {
  background(255,255,255);
  if (highscore<point){
    highscore=point
  }
  if(gamestate==="play"){
   bg.velocityX=-3
        if(bg.x<160){
          bg.x=400
          
        } 
        bg.visible=true;
        point=point+Math.round(getFrameRate()/60);
        gameover.visible=false
        restart.visible=false
        if(keyIsDown(UP_ARROW)&&eggMan.y>220){
          eggMan.velocityY=-15
        eggMan.addAnimation("EGGMAN",eggManJump)
        }
        if(keyWentUp(UP_ARROW)){
          eggMan.addAnimation("EGGMAN",eggManImage)
        }
        
      if(keyWentDown("space")){
        egg=createSprite(100,220,10,10)
      egg.velocityX=3
      egg.addImage(eggImage)
      egg.y=eggMan.y
      eggGroup.add(egg)
      egg.setCollider("circle",0,0,10)
      egg.lifetime=410
      }
      
        eggMan.velocityY=eggMan.velocityY+0.8
       

        BADEGG(); 
        coins();
        for( var i=0;i<obsticalGroup.length;i++){
          for(var j=0;j<eggGroup.length;j++){
            if(eggGroup.isTouching(obsticalGroup)){
              obsticalGroup.get(i).destroy();
              eggGroup.get(j).destroy();
} } }
for( var i=0;i<coinsGroup.length;i++){
  for(var j=0;j<eggGroup.length;j++){
    if(eggMan.isTouching(coinsGroup)){
      coinsGroup.get(i).destroy();
      coinPoint=coinPoint+1
} } }
        if(obsticalGroup.isTouching(eggMan)){
          gamestate="end"
          deathSound.play();
          song.stop();
        }
      }    
  else if(gamestate==="end"){
    eggMan.velocityY=0
    gameover.visible=true
    restart.visible=true
    bg.visible=false;
    text("press up to restart game",400,200)
    if(mousePressedOver(restart)||keyWentDown(UP_ARROW)){
      reset ();
    }
    coinsGroup.setVelocityXEach(0)
  coinsGroup.setLifetimeEach(-1)
 bg.velocityX=0
 obsticalGroup.setVelocityXEach(0)
obsticalGroup.setLifetimeEach(-1)
eggMan.addAnimation("EGGMAN",ohno
)
  } 
  eggMan.collide(invisGround)

  
  drawSprites();
  stroke(255,255,255)
  textSize(35)
  fill("blue")
  text ("Score:"+point,600,50)
  text("coins:"+coinPoint,100,50)
  fill("red")
  text("Highscore:"+highscore,50,370)
}
function reset(){
  gamestate="play"
  obsticalGroup.destroyEach()
  eggGroup.destroyEach()
  point=0
  eggMan.addAnimation("EGGMAN",eggManImage)
  coinsGroup.destroyEach()
  coinPoint=0
}