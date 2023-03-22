function Block(x,y,type,type2){
    this.x=x;
    this.y=y;
    this.type=type;
    this.type2=type2;
    this.Sz=50;
    this.currentAni=this.Sz;
    this.currentTrans=255;
    this.currentAlphaSpeed=5;
    this.flagRotation=random(-PI/3,PI/3);
    this.flagOn=false;
    this.animate=function(){
        switch(this.type){
            case 3:
            this.currentAni=lerp(this.currentAni,0,0.05);
            if(dist(this.currentAni,0,0,0)<1){
                this.currentAni=this.Sz;
            }
            this.currentTrans+=this.currentAlphaSpeed;
            if(this.currentTrans>255){
                this.currentAlphaSpeed=-5;
            }
            if(this.currentTrans<0){
                this.currentAlphaSpeed=5;
            }
            break;
            case 4:
            this.currentAni=lerp(this.currentAni,0,0.05);
            if(dist(this.currentAni,0,0,0)<1){
                this.currentAni=this.Sz;
            }
            this.currentTrans+=this.currentAlphaSpeed;
            if(this.currentTrans>255){
                this.currentAlphaSpeed=-5;
            }
            if(this.currentTrans<0){
                this.currentAlphaSpeed=5;
            }
            break;
            case 5:
                if(this.flagOn){
                    this.flagRotation=lerp(this.flagRotation,0,0.05);
                }
            break;
        }
    };
    this.show=function(){
        colorMode(RGB);
        switch(this.type){
            case 1:
                switch(this.type2){
                    case 1:
                        noStroke();
                        fill(0,0,0,50);
                        rect(this.x+5,this.y+5,this.Sz,this.Sz);
                        fill(0,119,182);
                        strokeWeight(1);
                        stroke(0,119,182)
                        rect(this.x,this.y,this.Sz,this.Sz);
                    break;
                    case 2:
                        noStroke();
                        fill(0,0,0,50);
                        rect(this.x+5,this.y+5,this.Sz,this.Sz);
                        fill(30);
                        strokeWeight(1);
                        stroke(30);
                        rect(this.x,this.y,this.Sz,this.Sz);
                    break;
                }
            break;
            case 2:
                noStroke();
                fill(0,0,0,50);
                rect(this.x+5,this.y+5,this.Sz,this.Sz);
                strokeWeight(1);
                stroke(255,124,127);
                fill(255,124,127);
                rect(this.x,this.y,this.Sz,this.Sz);
            break;
            case 3:
                strokeCap(SQUARE);
                strokeWeight(5);
                stroke(255,255,255,this.currentTrans);
                for(var i=0;i<4;i++){
                    line(this.x,this.y+i*this.Sz/4,this.x+this.Sz-this.currentAni,this.y+i*this.Sz/4);
                }
            break;
            case 4:
                strokeCap(SQUARE);
                strokeWeight(5);
                stroke(255,255,255,this.currentTrans);
                for(var i=0;i<4;i++){
                    line(this.x+i*this.Sz/4+7,this.y+this.currentAni,this.x+i*this.Sz/4+7,this.y+this.Sz);
                }
            break;
            case 5:
                strokeCap(SQUARE);
                strokeWeight(5);
                stroke(0);
                push();
                translate(this.x+this.Sz/2,this.y+this.Sz);
                rotate(this.flagRotation);
                line(0,0,0,-this.Sz);
                fill(133, 255, 167);
                //noStroke();
                triangle(0,-50,25,-20,0,-20);
                pop();
            break;
        }
    };
}
function Fish(x,y,facing,feelings){
    this.x=x;
    this.y=y;
    this.speedX=random(0,2);
    this.speedY=random(-2,2);
    this.faceChooser=round(random(1,2));
    this.facing=facing;
    this.feelings=feelings;
    this.hue=random(0,360);
    this.feelingsChooser=round(random(1,3));
    this.update=function(player){
        if(frameCount%60===0&&!player.feeding){
            this.faceChooser=round(random(1,2));
            this.speedY=random(-2,2);
            this.speedX=random(0,2);
        }
        if(frameCount%600===0){
            this.feelingsChooser=round(random(1,3));
        }
        switch(this.facing){
            case "left":
                this.x-=this.speedX;
            break;
            case "right":
                this.x+=this.speedX;
            break;
        }
        this.y+=this.speedY;
        if(this.faceChooser===1){
            this.facing="left";
        }
        if(this.faceChooser===2){
            this.facing="right";
        }
        if(this.feelingsChooser===1){
            this.feelings="sad";
        }
        if(this.feelingsChooser===2){
            this.feelings="mediocre";
        }
        if(this.feelingsChooser===3){
            this.feelings="happy";
        }
        if(player.feeding){
            if(dist(this.x,this.y,player.x,player.x)<500){
                this.feelings="happy";
                    this.x=lerp(this.x,player.x,0.01);
                if(this.x-player.x===0){
                    this.facing="right";
                }
                this.y=lerp(this.y,player.y,0.01);
            }
        }
        // if(this.x<0){
        //     this.x=width;
        // }
        // if(this.x>width){
        //     this.x=0;
        // }
        // if(this.y>height){
        //     this.y=0;
        // }
        // if(this.y<0){
        //     this.y=height;
        // }
    };
    this.show=function(){
        noStroke();
        colorMode(HSB,360,100,100,100);
        switch(this.facing){
            case "left":
                fill(0,0,0,25);
                ellipse(this.x-40+5,this.y-5,50,50);
                triangle(this.x-25+5,this.y-5,this.x+5,this.y-25-5,this.x+5,this.y+25-5);
                fill(this.hue,60,100,100);
                ellipse(this.x-40,this.y,50,50);
                triangle(this.x-25,this.y,this.x,this.y-25,this.x,this.y+25);
                noFill();
                stroke(0);
                strokeWeight(3);
                strokeCap(ROUND);
                line(this.x-56,this.y-10,this.x-56,this.y);
                line(this.x-50,this.y-10,this.x-50,this.y);
                switch(this.feelings){
                    case "happy":
                        arc(this.x-53,this.y+5,7,7,0,PI);
                    break;
                    case "mediocre":
                        line(this.x-50,this.y+5,this.x-56,this.y+5);
                    break;
                    case "sad":
                        arc(this.x-53,this.y+10,7,7,PI,TAU);                        
                    break;
                }
                break;
                case "right":
                fill(0,0,0,25);
                ellipse(this.x-5,this.y-5,50,50);
                triangle(this.x-15-5,this.y-5,this.x-40-5,this.y-25-5,this.x-40-5,this.y+25-5);
                fill(this.hue,60,100,100);
                ellipse(this.x,this.y,50,50);
                triangle(this.x-15,this.y,this.x-40,this.y-25,this.x-40,this.y+25);
                noFill();
                stroke(0);
                strokeWeight(3);
                strokeCap(ROUND);
                line(this.x+10,this.y-10,this.x+10,this.y);
                line(this.x+16,this.y-10,this.x+16,this.y);
                switch(this.feelings){
                    case "happy":
                        arc(this.x+13,this.y+5,7,7,0,PI);
                    break;
                    case "mediocre":
                        line(this.x+10,this.y+5,this.x+16,this.y+5);
                    break;
                    case "sad":
                        arc(this.x+13,this.y+10,7,7,PI,TAU);
                    break;
                }
            break;
        }
    };
}
function Shark(x,y){

}
function Submarine(x,y){
    this.x=x;
    this.y=y;
    this.show=function(){
        push();
        translate(this.x,this.y);
        pop();
    }
}