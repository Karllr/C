var song;
var rotSpeed;
var antiRotSpeed;
var backgrounds;
var button1;
var button2;
var scene=0;
var transitionY;
var AntitransitionY=0;
var player;
var keys=[];
var blocks=[];
var fishies=[];
var fps=60;
var mapHeight;
var cam={
};
function keyPressed(){
  keys[keyCode]=true;
}
function keyReleased(){
  keys[keyCode]=false;
}
function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
var font;
function setup() {
  smooth();
  song=loadSound('Beep-Beep.mp3',ok);
  rotSpeed=PI/180;
  antiRotSpeed=TAU;
  createCanvas(windowWidth,windowHeight);
  font=loadFont('ariblk.ttf');
  player=new Player(200,200);
  AntitransitionY=height*2;
  button1=new Button(width/2,3*height/4.5,width*200/1011,color(0, 119*0.8, 182*0.8),game,"play");
  button2=new Button(25,-25,50,color(0,180,216),menu,"play");
backgrounds=new Background(0,0,1);
cam.x=0;
cam.y=0;
for(var i=0;i<500;i++){
  fishies.push(new Fish(random(-20000,20000),random(-height*3,height),"left","sad"));
}
mapHeight=worldMap.length*50;
//blocks.push(new Block(200,300,1));
Load(blocks,worldMap)
}
function ok(){
  song.play();
}
function sceneSetter(s,button){
  scene=s;
  button.clicked=false;
  cursor(ARROW);
  transitionY=0;
}
function draw() {
  frameRate(fps);
  background(220);
  switch(scene){
    case 0:
      menu();
    break;
    case 1:
      game();
    break;
    case 3:
      inTheDeep();
    break;
    case 4:
      Ending();
    break;
  }
  //menu();
  //button1.show();
  //rotSpeed+=PI/180;
  if(button1.clicked){
    sceneSetter(1,button1);
    //AntitransitionY=height*2;
  }
  if(button2.clicked){
    sceneSetter(0,button2);
  }
  noStroke();
  fill(0);
  rect(0,-height+transitionY,width,height);
  transitionY=lerp(transitionY,AntitransitionY,0.05);
  song.setLoop(true);
}
