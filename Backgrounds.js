function Background(x,y,type){
    this.x=x;
    this.y=y;
    this.type=type;
    this.bubblesX=[];
    this.bubblesY=[];
    this.bubblesSz=[];
    this.bubblesAng=[];
    this.col=[0,119,182];
    this.anticol=[0,119,182];
    for(var i=0;i<10;i++){
        this.bubblesX.push(random(0,width));
        this.bubblesY.push(random(0,height));
        this.bubblesSz.push(random(20,100));
        this.bubblesAng.push(random(0,TAU));
    }
    this.spikeY=height;
    this.CoralHeights=[];
    this.AntiCoralHeights=[];
    this.CoralHue=[];
    this.AntiCoralHue=[];
    this.CoralHeights2=[];
    this.AntiCoralHue2=[];
    this.CoralHue2=[];
    this.AntiCoralHeights2=[];
    for(var i=0;i<50;i++){
        this.CoralHeights.push(random(50,200));
        this.CoralHue.push(random(0,360));
        this.AntiCoralHue.push(random(0,360));
        this.AntiCoralHeights.push(random(50,200));
        this.CoralHeights2.push(random(50,200));
        this.CoralHue2.push(random(0,360));
        this.AntiCoralHue2.push(random(0,360));
        this.AntiCoralHeights2.push(random(50,200));
        //this.CoralHeights.push(random(0,100));
    }
    this.update=function(){
        for(var i=0;i<this.col.length;i++){
            this.col[i]=lerp(this.col[i],this.anticol[i],0.05);
        }
        switch(this.type){
            case 1:
                for(var i=0;i<this.bubblesY.length;i++){
                    this.bubblesY[i]-=1
                    if(this.bubblesY[i]+this.bubblesSz[i]/2<0){
                        this.bubblesX[i]=random(0,width);
                        this.bubblesY[i]=height+this.bubblesSz[i];
                        this.bubblesSz[i]=random(20,100);
                    }
                    this.bubblesAng[i]+=PI/180;
                }
            break;
            case 2:
                for(var i=0;i<this.bubblesY.length;i++){
                    this.bubblesY[i]-=1
                    if(this.bubblesY[i]+this.bubblesSz[i]/2<0){
                        this.bubblesX[i]=random(0,width);
                        this.bubblesY[i]=height+this.bubblesSz[i];
                        this.bubblesSz[i]=random(20,100);
                    }
                    this.bubblesAng[i]+=PI/180;
                }
                this.spikeY=lerp(this.spikeY,0,0.05);
                if(frameCount%30===0){
                    //this.spikeY=random(0,50);
                    for(var i=0;i<this.CoralHeights.length;i++){
                        this.AntiCoralHeights[i]=random(50,200);
                        this.AntiCoralHue[i]=random(360);
                        this.AntiCoralHeights2[i]=random(50,200);
                        this.AntiCoralHue2[i]=random(360);
                    }
                }
                for(var i=0;i<this.CoralHue.length;i++){
                    this.CoralHue[i]=lerp(this.CoralHue[i],this.AntiCoralHue[i],0.05);
                    this.CoralHeights[i]=lerp(this.CoralHeights[i],this.AntiCoralHeights[i],0.05);
                    this.CoralHue2[i]=lerp(this.CoralHue2[i],this.AntiCoralHue2[i],0.05);
                    this.CoralHeights2[i]=lerp(this.CoralHeights2[i],this.AntiCoralHeights2[i],0.05);
                }
            break;
            case 3:
                this.spikeY=lerp(this.spikeY,-width/1.5,0.05);
                if(frameCount%30===0){
                    this.spikeY=this.spikeY;
                    for(var i=0;i<this.CoralHeights.length;i++){
                        this.AntiCoralHeights[i]=random(50,200);
                        this.AntiCoralHue[i]=random(360);
                        this.AntiCoralHeights2[i]=random(50,200);
                        this.AntiCoralHue2[i]=random(360);
                    }
                }
                for(var i=0;i<this.bubblesY.length;i++){
                    this.bubblesY[i]-=1
                    if(this.bubblesY[i]+this.bubblesSz[i]/2<0){
                        this.bubblesX[i]=random(0,width);
                        this.bubblesY[i]=height+this.bubblesSz[i];
                        this.bubblesSz[i]=random(20,100);
                    }
                    this.bubblesAng[i]+=PI/180;
                }
            break;
        }
    }
    this.show=function(){
        switch(this.type){
            case 1:
            colorMode(RGB);
                this.anticol=[0,119,182];
                noStroke();
                fill(this.col[0],this.col[1],this.col[2]);
                rect(this.x,this.y,width,height);
                for(var i=0;i<this.bubblesX.length;i++){
                    stroke(255);
                    strokeCap(ROUND);
                    strokeWeight(10);
                    fill(255,255,255,50);
                    ellipse(this.bubblesX[i],this.bubblesY[i],this.bubblesSz[i],this.bubblesSz[i]);
                    noFill();
                    strokeWeight(this.bubblesSz[i]/10);
                    arc(this.bubblesX[i],this.bubblesY[i],this.bubblesSz[i]*0.5,this.bubblesSz[i]*0.5,this.bubblesAng[i],this.bubblesAng[i]+PI/2);
                }
            break;
            case 2:
                this.anticol=[2,62,138];
                noStroke();
                colorMode(RGB);
                fill(this.col[0],this.col[1],this.col[2]);
                rect(this.x,this.y,width,height);
                colorMode(HSB,360,100,100,100);
                for(var i=0;i<this.CoralHeights2.length;i++){
                    fill(this.CoralHue2[i],100,100,100);
                    rect(i*width/20+50,height/2-this.CoralHeights2[i]+20+this.spikeY,20,this.CoralHeights2[i]);
                    fill(206, 100, 75,70);
                    rect(i*width/20+50,height/2-this.CoralHeights2[i]+20+this.spikeY,20,this.CoralHeights2[i]);
                }
                colorMode(RGB);
                fill(2*1.1,62*1.1,138*1.1);
                beginShape();
                vertex(0,height);
                for(var i=0;i<15;i++){
                    if(i%2===1){
                        vertex(i*width/10,height/2-20+this.spikeY);
                    }
                    else{
                        vertex(i*width/10,height/2+this.spikeY);
                    }
                }
                vertex(width,height);
                colorMode(HSB,360,100,100,100);
                endShape();
                for(var i=0;i<this.CoralHeights.length;i++){
                    fill(this.CoralHue[i],100,0,30);
                    rect(i*width/20+10-5,height/2-this.CoralHeights[i]+20+this.spikeY-5,20,this.CoralHeights[i]);
                    fill(this.CoralHue[i],100,100,100);
                    rect(i*width/20+10,height/2-this.CoralHeights[i]+20+this.spikeY,20,this.CoralHeights[i]);
                }
                colorMode(RGB);
                for(var i=0;i<this.bubblesX.length;i++){
                    stroke(255);
                    strokeCap(ROUND);
                    strokeWeight(10);
                    fill(255,255,255,50);
                    ellipse(this.bubblesX[i],this.bubblesY[i],this.bubblesSz[i],this.bubblesSz[i]);
                    noFill();
                    strokeWeight(this.bubblesSz[i]/10);
                    arc(this.bubblesX[i],this.bubblesY[i],this.bubblesSz[i]*0.5,this.bubblesSz[i]*0.5,this.bubblesAng[i],this.bubblesAng[i]+PI/2);
                }
            break;
            case 3:
                this.anticol=[20,20,20];
                noStroke();
                colorMode(RGB);
                fill(this.col[0],this.col[1],this.col[2]);
                rect(this.x,this.y,width,height);
                colorMode(HSB,360,100,100,100);
                for(var i=0;i<this.CoralHeights2.length;i++){
                    fill(this.CoralHue2[i],100,100,100);
                    rect(i*width/20+50,height/2-this.CoralHeights2[i]+20+this.spikeY,20,this.CoralHeights2[i]);
                    fill(206, 100, 75,70);
                    rect(i*width/20+50,height/2-this.CoralHeights2[i]+20+this.spikeY,20,this.CoralHeights2[i]);
                }
                colorMode(RGB);
                fill(this.col[0]-10,this.col[1]-10,this.col[2]-10);
                beginShape();
                vertex(0,height);
                for(var i=0;i<15;i++){
                    if(i%2===1){
                        vertex(i*width/10,height/2-20+this.spikeY);
                    }
                    else{
                        vertex(i*width/10,height/2+this.spikeY);
                    }
                }
                vertex(width,height);
                colorMode(HSB,360,100,100,100);
                endShape();
                for(var i=0;i<this.CoralHeights.length;i++){
                    fill(this.CoralHue[i],100,0,30);
                    rect(i*width/20+10-5,height/2-this.CoralHeights[i]+20+this.spikeY-5,20,this.CoralHeights[i]);
                    fill(this.CoralHue[i],100,100,100);
                    rect(i*width/20+10,height/2-this.CoralHeights[i]+20+this.spikeY,20,this.CoralHeights[i]);
                }
                colorMode(RGB);
                for(var i=0;i<this.bubblesX.length;i++){
                    stroke(20);
                    strokeCap(ROUND);
                    strokeWeight(10);
                    fill(20,20,20,50);
                    ellipse(this.bubblesX[i],this.bubblesY[i],this.bubblesSz[i],this.bubblesSz[i]);
                    noFill();
                    strokeWeight(this.bubblesSz[i]/10);
                    arc(this.bubblesX[i],this.bubblesY[i],this.bubblesSz[i]*0.5,this.bubblesSz[i]*0.5,this.bubblesAng[i],this.bubblesAng[i]+PI/2);
                }
            break;
        }
    }
}