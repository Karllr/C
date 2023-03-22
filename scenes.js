//var rotSpeed=PI/180;
var endingX=2000;
var Deepener=1200;
function menu(){
    backgrounds.type=1;
    backgrounds.update();
    backgrounds.show();
    button1.update();
    button1.show();
    strokeCap(SQUARE);
    strokeWeight(20);
    stroke(255);
    noFill();
    arc(width/2,height/4,100,100,2*PI/8+rotSpeed,14*PI/8+rotSpeed);
    //strokeWeight(10);
    arc(width/2,height/4,50,50,2*PI/8,14*PI/8);
    rotSpeed=lerp(rotSpeed,antiRotSpeed,0.05);
    if(dist(0,rotSpeed,0,antiRotSpeed)<0.05){
        antiRotSpeed+=TAU;
    }
}
function game(){
    cam.x=lerp(cam.x,width/2-player.x,0.05);
    cam.y=lerp(cam.y,height/2-player.y,0.05);
    //button2.y=-25;
    button2.antiY=25;
    backgrounds.type=2;
    backgrounds.update();
    backgrounds.show();
    button2.update();
    button2.show();
    push();
    translate(cam.x,cam.y);
    for(var i=0;i<fishies.length;i++){
        fishies[i].update(player);
        fishies[i].show();
        if(fishies.length>750){
            fishies.splice(random(0,fishies.length-1),1);
        }
    }
    player.update(blocks);
    player.show();
    for(var i=0;i<blocks.length;i++){
    blocks[i].animate();
    blocks[i].show();
    blocks[i].type2=1;
    }
    textFont(font, 24);
    fill(255);
    text("Just Fall, don't move", 4700, 450);
    pop();
    if(round(random(0,20))===0){
        fishies.push(new Fish(random(-20000,20000),random(-height*3,height+mapHeight),"left","sad"));
    }
    if(player.y>Deepener&&player.x>4400){
        scene=3;
    }
    if(player.x>12240){
        scene=4;
    }
}
function inTheDeep(){
    cam.x=lerp(cam.x,width/2-player.x,0.05);
    cam.y=lerp(cam.y,height/2-player.y,0.05);
    //button2.y=-25;
    button2.antiY=25;
    backgrounds.type=3;
    backgrounds.update();
    backgrounds.show();
    button2.update();
    button2.show();
    push();
    translate(cam.x,cam.y);
    for(var i=0;i<fishies.length;i++){
        fishies[i].update(player);
        fishies[i].show();
        if(fishies.length>750){
            fishies.splice(random(0,fishies.length-1),1);
        }
    }
    player.update(blocks);
    player.show();
    for(var i=0;i<blocks.length;i++){
    blocks[i].animate();
    blocks[i].show();
    blocks[i].type2=2;
    }
    textFont(font, 24);
    fill(255);
    text("Just Fall, don't move", 4700, 450);
    pop();
    if(player.y<Deepener){
        scene=1;
    }
    if(round(random(0,20))===0){
        fishies.push(new Fish(random(-20000,20000),random(-height*3,height+mapHeight),"left","sad"));
    }
}
function Ending(){
    button2.antiY=25;
    backgrounds.type=2;
    backgrounds.update();
    backgrounds.show();
    button2.update();
    button2.show();
    strokeCap(SQUARE);
    strokeWeight(50);
    stroke(255);
    noFill();
    arc(width/2+endingX,height/2,height/2,height/2,2*PI/8+rotSpeed,14*PI/8+rotSpeed);
    //strokeWeight(10);
    arc(width/2+endingX,height/2,height/4,height/4,2*PI/8,14*PI/8);
    rotSpeed=lerp(rotSpeed,antiRotSpeed,0.05);
    if(dist(0,rotSpeed,0,antiRotSpeed)<0.05){
        antiRotSpeed+=TAU;
    }
    fill(255);
    textFont(font, 24);
    noStroke();
    text("Please reload the site to play again",width/3,height*5/6);
    endingX=lerp(endingX,0,0.05);
}