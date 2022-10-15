const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var link;
var rabbit;
var button;
var button2;
var button3;
var balloon;
var mute;

var backgroundImg;
var rabbitImg;
var fruitImg

var blinkAnim;
var eatAnim;
var sadAnim;

function preload(){
backgroundImg = loadImage('background.png')
rabbitImg = loadImage('Rabbit-01.png')
fruitImg = loadImage('melon.png')
blinkAnim = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
eatAnim = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
sadAnim = loadAnimation("sad_1.png","sad_2.png","sad_3.png")
airS = loadSound("air.wav")
cuttingS = loadSound("Cutting Through Foliage.mp3")
eatingS = loadSound("eating_sound.mp3")
ropeS = loadSound("rope_cut.mp3")
sound5 = loadSound("sound1.mp3")
blinkAnim.playing = true
eatAnim.playing = true
sadAnim.playing = true
eatAnim.looping = false
sadAnim.looping = false
}

function setup() 
{
var isMobile =/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
if(isMobile){
  canW = displayWidth
  canH = displayHeight
  createCanvas(displayWidth,displayHeight)
}
else{
  canW = windowWidth
  canH = windowHeight
  createCanvas(windowWidth,windowHeight)
}
 
  sound5.play()
  sound5.setVolume(0.25)
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(displayWidth/2,680,displayWidth,20);
  rope = new Rope(6,{x:245,y:30});
  rope2 = new Rope(8,{x:20, y:150});
  rope3 = new Rope(5,{x:370, y:155});
  blinkAnim.frameDelay = 20
  eatAnim.frameDelay = 20
  sadAnim.frameDelay = 20
  rabbit = createSprite(250,650,100,100)
  rabbit.addAnimation('blink',blinkAnim)
  rabbit.addAnimation('eat',eatAnim)
  rabbit.addAnimation('sad',sadAnim)
  rabbit.changeAnimation('blink')

  rabbit.scale=0.2
  button = createImg('cut_button.png')
  button.position(220,30)
  button.size(50,50)
  button.mouseClicked(drop)

  button2 = createImg('cut_button.png')
  button2.position(20,150)
  button2.size(50,50)
  button2.mouseClicked(drop2)

  button3 = createImg('cut_button.png')
  button3.position(350,155)
  button3.size(50,50)
  button3.mouseClicked(drop3)



  balloon = createImg('balloon.png')
  balloon.position(30,200)
  balloon.size(80,80)
  balloon.mouseClicked(blowAir)

  mute = createImg('mute.png')
  mute.position(20,20)
  mute.size(50,50)
  mute.mouseClicked(stopS)
  
var options= {
density:0.001
}
  fruit = Bodies.circle(300,300,15,options);
  Matter.Composite.add(rope.body,fruit)

link = new Link (rope,fruit)
link2 = new Link(rope2, fruit)
link3 = new Link (rope3,fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
 
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(backgroundImg,0,0,displayWidth,displayHeight-100)
  imageMode(CENTER);
  ground.show();
  rope.show()
  rope2.show()
  rope3.show()
  if(collide(fruit,rabbit)==true){
   rabbit.changeAnimation('eat',eatAnim)
   eatingS.play()
  }
  

  if(fruit != null&&fruit.position.y>650){
    rabbit.changeAnimation('sad',sadAnim)
    console.log("sad")
  }
  
  if(fruit!=null){
  image(fruitImg,fruit.position.x,fruit.position.y,50,50)
  }
  
  Engine.update(engine);
  

 
  drawSprites()
}

function drop(){
  link.detatch()
  link = null
  rope.break()
  ropeS.play()

}
function drop2(){
  link2.detatch()
  link2 = null
  rope2.break()
  ropeS.play()

}
function drop3(){
  link3.detatch()
  link3 = null
  rope3.break()
  ropeS.play()

}



function collide(body,sprite){
  if(body!=null){
    var dis = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if(dis<=80){
    World.remove(world,fruit)
    fruit = null
    console.log(dis)
    return true
    
 }  
 else{
  console.log(dis)
  return false
 }
  }
}

function blowAir(){
  Matter.Body.applyForce(fruit,{x:0,y:0 },{x:0.01,y:0})
  airS.play()

}

function stopS(){
 if(sound5.isPlaying()){
  sound5.stop()
 } 
 else{
   sound5.play()
 }
  
  
}
