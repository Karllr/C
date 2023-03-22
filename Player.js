function Player(x,y){
    this.x=x;
    this.y=y;
    this.Sz=20;
    this.feeding=false;
    this.accel=5;
    this.speed=0;
    this.falling=true;
    this.jumpHeight=9.7;
    this.hitPortal=false;
    this.respawn={
      x:this.x,
      y:this.y
    };
    this.yvel=0;
    this.gravity=0.8;
    this.update=function(blocks){
        if(keys[90]){
          this.feeding=true;
        }else{
          this.feeding=false;
        }
        if(keys[LEFT_ARROW]){
            this.speed=-this.accel;
        }
        if(keys[RIGHT_ARROW]){
            this.speed=this.accel;
        }
        if(!keys[LEFT_ARROW]&&!keys[RIGHT_ARROW]){
          this.speed=0;
        }
        if(keys[UP_ARROW]&&!this.falling){
          this.yvel=-this.jumpHeight;
        }
        if(keys[82]){
          this.x=this.respawn.x;
          this.y=this.respawn.y;
          this.yvel=0;
          this.inverted=false;
        }
        if(this.y>mapHeight+height){
          this.x=this.respawn.x;
          this.y=this.respawn.y;
          this.yvel=0;
        }
        this.x+=this.speed;
        this.collideWith(this.speed,0,blocks);
        this.y+=this.yvel;
        this.yvel+=this.gravity;
        this.falling=true;
        this.accel=5;
        //this.feeding=false;
        this.collideWith(0,this.yvel,blocks);
    };
    this.collideWith=function(xv,yv,blocks){
        for(var i=0;i<blocks.length;i++){
          var b=blocks[i];
          if(this.y+this.Sz > b.y &&
              this.y        < b.y+b.Sz &&
              this.x+this.Sz > b.x &&
              this.x        < b.x+b.Sz){
                switch(b.type){
                  case 1:
                    if(yv>0) {
                      this.yvel = 0;
                      this.falling = false;
                      this.y = b.y-this.Sz;
                  }
                  // TOP
                  if(yv<0) {
                      this.yvel = 0;
                      this.falling = true;
                      this.y = b.y+b.Sz;
                  }
                  // RIGHT
                  if(xv>0) {
                      this.speed = 0;
                      this.x = b.x-this.Sz;
                  }
                  // LEFT
                  if(xv<0) {
                      this.speed = 0;
                      this.x = b.x+b.Sz;
                  }
                  break;
                  case 2:
                    this.x=this.respawn.x;
                    this.y=this.respawn.y;
                    this.yvel=0;
                  break;
                  case 3:
                    this.yvel=1;
                    this.accel=10;
                    //this.falling=false;
                  break;
                  case 4:
                    this.yvel=-4;
                  break;
                  case 5:
                    b.flagOn=true;
                    this.respawn.x=b.x;
                    this.respawn.y=b.y;
                  break;
                }
          }
        }
    }
        
    this.show=function(){
        colorMode(RGB);
        noStroke();
        fill(0,0,0,50);
        rect(this.x+5,this.y+5,this.Sz,this.Sz);
        fill(255, 174, 0);
        rect(this.x,this.y,this.Sz,this.Sz);
        stroke(0)
        strokeWeight(2);
        strokeCap(ROUND);
        //noStroke();
        //line();
    };
}