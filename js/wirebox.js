var px = 0;
var py = 0;
var pvx = 0;
var pvy = 0;
var canJump = false;
var level = 0;
var maxGPE = 0;
var inDebugMode = false;
var levelX = 0;
var levelY = 0;
var playerSize = 100;
var onlyOnce = true;
var developer = false;

function setup(){
    createCanvas(1920*3/4,1080*3/4);
    px=random(0,width);
    py=height-100-playerSize;
    levelX = px;
    levelY = py;
    textFont("Courier New");
    if(!localStorage.getItem("minPlayerSize")){
        localStorage.setItem("minPlayerSize",0);
        //0 is 100
        //1 is 50
        //2 is 25
    }
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}

function playerPhysics(noControl){
    if(keyIsDown(32) && canJump && !noControl){pvy=-10;canJump=false;}
    pvy+=9.8/60;
    px+=pvx;
    py+=pvy;
    if(px>width){px=0;}
    if(px<-playerSize){px=width-playerSize;}
    if(py>height){py=0;}
    if(py<-playerSize){py=height-playerSize}
}

function object(type,x,y,w,h,arg0){
    /*
    obj types
    0 is normal platform
    1 is ice platform
    2 is ending portal
    */
    if(type===0){
        noFill();
        stroke(255);
        strokeWeight(1);
        rect(x,y,w,h);
        if(px>x-playerSize && py>y-playerSize && px<x+w && py<y){
            canJump=true;
            py=y-playerSize;
            if(pvy>0){
                pvy=0;
            }
            if(!arg0){
                if(!keyIsDown(65) && !keyIsDown(68) || keyIsDown(65) && keyIsDown(68)){
                    if(pvx>0){pvx-=0.5;}else{pvx+=0.5;}
                    if(pvx<=0.5 && pvx>=-0.5){pvx=0;}
                }
                if(keyIsDown(65) && pvx>-5 && !keyIsDown(68)){
                    pvx-=0.5;
                }
                if(keyIsDown(68) && pvx<5 && !keyIsDown(65)){
                    pvx+=0.5;
                }
            }else{
                pvx=-5;
            }
        }
        if(px>x-playerSize-5 && py>y-playerSize+2 && px<x && py<y+h){pvx=0;px=x-playerSize-6;if(pvy<0){pvy=0;}}
        if(px>x+w && py>y-playerSize+2 && px<x+5+w && py<y+h){pvx=0;px=x+6+w;if(pvy<0){pvy=0;}}
        if(px>x-playerSize && py>y+h && px<x+w && py<y+h+5){py=y+h+5;pvy=0;}
    }
    if(type===1){
        noFill();
        stroke(128,128,255);
        strokeWeight(1);
        rect(x,y,w,h);
        if(px>x-playerSize && py>y-playerSize && px<x+w && py<y){
            canJump=true;
            py=y-playerSize;
            if(pvy>0){
                pvy=0;
            }
            if(!keyIsDown(65) && !keyIsDown(68) || keyIsDown(65) && keyIsDown(68)){
                if(pvx>0){pvx-=0.05;}else{pvx+=0.05;}
                if(pvx<=0.5 && pvx>=-0.5){pvx=0;}
            }
            if(keyIsDown(65) && pvx>-5 && !keyIsDown(68)){
                pvx-=0.25;
            }
            if(keyIsDown(68) && pvx<5 && !keyIsDown(65)){
                pvx+=0.25;
            }
        }
        if(px>x-playerSize-5 && py>y-playerSize+2 && px<x && py<y+h){pvx=0;px=x-playerSize-6;if(pvy<0){pvy=0;}}
        if(px>x+w && py>y-playerSize+2 && px<x+5+w && py<y+h){pvx=0;px=x+6+w;if(pvy<0){pvy=0;}}
        if(px>x-playerSize && py>y+h && px<x+w && py<y+h+5){py=y+h+5;pvy=0;}
    }
    if(type===2){
        noStroke();
        fill(128,128,255);
        rect(x-50,y-50,100,100);
        noFill();
        stroke(255,0,0);
        //rect(x-100,y-100,100,100);
        if(px>x-50-playerSize && py>y-50-playerSize && px<x+50 && py<y+50){
            if(level===10){
                if(playerSize===100){
                    playerSize=50;
                }else if(playerSize===50){
                    playerSize=25;
                }else if(playerSize===25){
                    level=20;
                }
            } else if(level===20){
                if(playerSize===50){
                    localStorage.setItem("minPlayerSize",1);
                }
                if(playerSize===25){
                    localStorage.setItem("minPlayerSize",2);
                }
                level=-1;
            }
            level+=1;
            levelX = px;
            levelY = py;
        }
    }
    if(type===3){
        noFill();
        stroke(255,64,64);
        strokeWeight(1);
        rect(x,y,w,h);
        if(px>x-playerSize && py>y-playerSize && px<x+w && py<y){
            canJump=true;
            py=y-playerSize;
            if(pvy>0){
                pvy=-0.75*pvy;
            }
            if(!keyIsDown(65) && !keyIsDown(68) || keyIsDown(65) && keyIsDown(68)){
                if(pvx>0){pvx-=0.5;}else{pvx+=0.5;}
                if(pvx<=0.5 && pvx>=-0.5){pvx=0;}
            }
            if(keyIsDown(65) && pvx>-5 && !keyIsDown(68)){
                pvx-=0.5;
            }
            if(keyIsDown(68) && pvx<5 && !keyIsDown(65)){
                pvx+=0.5;
            }
        }
        if(px>x-playerSize-5 && py>y-playerSize+2 && px<x && py<y+h){pvx=0;px=x-playerSize-6;if(pvy<0){pvy=0;}}
        if(px>x+w && py>y-playerSize+2 && px<x+5+w && py<y+h){pvx=0;px=x+6+w;if(pvy<0){pvy=0;}}
        if(px>x-playerSize && py>y+h && px<x+w && py<y+h+5){py=y+h+5;pvy=0;}
    }
}

function keyPressed(){
    if(keyIsDown(82) && level!==0){
        px=levelX;
        py=levelY;
        pvx=0;
        pvy=0;
    }
}

function draw(){
    //player is 10 kg
    //air density is 1.2
    cursor();
    mousePressed =function(){
    };
    if(keyIsDown(16) && keyIsDown(86) && developer){inDebugMode=true;}
    if(keyIsDown(16) && keyIsDown(76) && developer){
        if(localStorage.getItem("minPlayerSize")===null){localStorage.setItem("minPlayerSize",0);alert("Set storage to 0");}else
        if(localStorage.getItem("minPlayerSize")==0){localStorage.setItem("minPlayerSize",1);alert("Set storage to 1");}else

        if(localStorage.getItem("minPlayerSize")==1){localStorage.setItem("minPlayerSize",2);alert("Set storage to 2");}else

        if(localStorage.getItem("minPlayerSize")==2){localStorage.clear();alert("Cleared storage!");}
    }
    if(keyIsDown(16) && keyIsDown(84) && onlyOnce && developer){object(2,px,py);onlyOnce=false;}
    if(!keyIsDown(16) || !keyIsDown(84) && developer){onlyOnce=true;}
    playerPhysics();
    background(0);

    if(level===-1){
        if(mouseX>width/2+5 && mouseY>height/3+5 && mouseX<width/2+5+(width/3)/2-5 && mouseY<height/3+5+(height/3)/3-5){
            cursor(HAND);
            mousePressed =function(){
                playerSize=100;
            };
        }
        if(mouseX>width/2+5 && mouseY>height/3+(height/3)/3+5 && mouseX<width/2+5+(width/3)/2-5 && mouseY<height/3+(height/3)/3+5+(height/3)/3-5){
            cursor(HAND);
            mousePressed =function(){
                playerSize=50;
            };
        }
        if(mouseX>width/2+5 && mouseY>height/3+(((height/3)/3)/2)*4+5 && mouseX<width/2+5+(width/3)/2-5 && mouseY<height/3+(((height/3)/3)/2)*4+5+(height/3)/3-5 && localStorage.getItem("minPlayerSize")==2){
            cursor(HAND);
            mousePressed =function(){
                playerSize=25;
            };
        }
        if(mouseX>width/2-(width/3)/2-5 && mouseY>height/3+(((height/3)/3)/2)*4+5 && mouseX<width/2-(width/3)/2-5+(width/3)/2-5 && mouseY<height/3+(((height/3)/3)/2)*4+5+(height/3)/3-5){
            cursor(HAND);
            mousePressed =function(){
                level=0;
            };
        }
        object(0,-100,height-100,width+200,200,true);
        if(floor(random(0,75))===0 && canJump){pvy=-10;canJump=false;}
            fill(255);
            noStroke();
            textSize(50);
            text("100%",width/2+((width/3)/2)/2,height/3+((height/3)/3)/2+5);
            text("50%",width/2+((width/3)/2)/2,height/2);
            if(localStorage.getItem("minPlayerSize")==2){text("25%",width/2+((width/3)/2)/2,height/3+(((height/3)/3)/2)*5+5);}
            text("Back",width/2-((width/3)/2)/2,height/3+(((height/3)/3)/2)*5+5);
            noFill();
            stroke(255);
            rect(width/2+5,height/3+5,(width/3)/2-5,(height/3)/3-5);//100%
            rect(width/2+5,height/3+(height/3)/3+5,(width/3)/2-5,(height/3)/3-5);//50%
            if(localStorage.getItem("minPlayerSize")==2){rect(width/2+5,height/3+(((height/3)/3)/2)*4+5,(width/3)/2-5,(height/3)/3-5);}//25%
            rect(width/2-(width/3)/2-5,height/3+(((height/3)/3)/2)*4+5,(width/3)/2-5,(height/3)/3-5);//back
    }
    if(level===0){
        if(mouseX>width/2-(width/3)/2 && mouseY>height*2/3-100 && mouseX<width/2+(width/3)/2 && mouseY<height*2/3+100 && (localStorage.getItem("minPlayerSize")==0|| localStorage.getItem("minPlayerSize")===null)){
            cursor(HAND);
            mousePressed =function(){
                level=1;
            };
        }
        if(mouseX>width/2-(width/3)/2-5 && mouseY>height*2/3-100 && mouseX<width/2-5 && mouseY<height*2/3+100 && localStorage.getItem("minPlayerSize")!=0 && localStorage.getItem("minPlayerSize")!==null){
            cursor(HAND);
            mousePressed =function(){
                level=1;
            };
        }
        if(mouseX>width/2+5 && mouseY>height*2/3-100 && mouseX<width/2+(width/3)/2+5 && mouseY<height*2/3+100 && localStorage.getItem("minPlayerSize")!=0 && localStorage.getItem("minPlayerSize")!==null){
            cursor(HAND);
            mousePressed =function(){
                level=-1;
            };
        }
        object(0,-100,height-100,width+200,200,true);
        if(floor(random(0,75))===0 && canJump){pvy=-10;canJump=false;}
        fill(255);
        textSize(100);
        textAlign(CENTER,CENTER);
        text("Wirebox",width/2,height/3);
        textSize(20);
        text("A Game by TurnOffTheTV",width/2,height/3+60);
        if(localStorage.getItem("minPlayerSize")==0 || localStorage.getItem("minPlayerSize")===null){
            textSize(50);
            text("Play",width/2,height*2/3);
            noFill();
            stroke(255);
            rectMode(CENTER);
            rect(width/2,height*2/3,width/3,200);
            rectMode(CORNER);
        }else{
            textSize(50);
            text("Play",width/2-((width/3)/2)/2,height*2/3);
            text("Select\nSize",width/2+((width/3)/2)/2,height*2/3);
            noFill();
            stroke(255);
            rect(width/2-(width/3)/2,height*2/3-100,(width/3)/2-5,200);
            rect(width/2+5,height*2/3-100,(width/3)/2-5,200);
        }
    }
    if(level===1){
        object(0,-100,height-100,width/3+100,200);
        object(0,width*2/3,height-100,width/3+100,200);
        object(1,width/3,height-350,width/3,100);
        object(2,width/2,height-500,width/3,100);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 1 - Icy Manuvers (and a pit)",10,10);
    }
    if(level===2){
        object(0,50,height-300,width/2-50,250);
        object(0,0,-50,50,height+100);
        object(0,width-100,height-300,150,400);
        object(0,width,0,10,height);
        object(0,width*2/3-25,100,50,height/2-100);
        object(0,width/2,50,width/2+100,50);
        object(0,width/2,height+50,width/2+100,50);
        object(2,width-50,height-350);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 2 - Step-Off Jumps will do it",10,10);
    }
    if(level===3){
        object(1,width-100,height-200,110,210);
        object(1,-10,height-200,310,210);
        object(1,-10,200,410,50);
        object(2,200,150);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 3 - Ice Ice Only",10,10);
    }
    if(level===4){
        object(0,width-150,height-200,160,210);
        object(0,width-50,0,55,height-200);
        object(0,-10,100,width-150,50);
        object(0,-50,0,50,height);
        object(0,0,height-100,150,110);
        object(0,0,-100,width,95);
        object(0,200,height-300,100,50);
        object(1,500,height-250,100,50);
        object(0,700,height-250,100,50);
        object(0,50,150,50,height-350);
        object(2,50,height-150);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 4 - A bit of parkour",10,10);
    }
    if(level===5){
        object(0,-100,height-100,300,110);
        object(0,width-200,height-100,300,110);
        object(0,width/2-100,height-100,200,110);
        object(2,width/2,height-500);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 5 - Really just an M&M sugar rush",10,10);
    }
    if(level===6){
        object(3,500,height-100,width-1000,110);
        object(0,-100,height-300,600,310);
        object(0,width-500,height-300,600,310);
        object(2,width/2,100);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 6 - Bouncy rubber",10,10);
    }
    if(level===7){
        object(0,width/2-100,150,200,300);
        object(3,width/2-200,300,100,50);
        object(3,width/2+100,300,100,50);
        object(2,width/2,550);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 7 - Under the floating island",10,10);
    }
    if(level===8){
        object(0,width/2-100,150,200,300);
        object(3,width/2-200,300,100,50);
        object(3,width/2+100,300,100,50);
        object(2,width/2,50);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 8 - Above the floating island",10,10);
    }
    if(level===9){
        object(3,-100,height-100,300,200);
        object(1,200,height-200,200,300);
        object(3,400,height-100,200,200);
        object(1,600,height-200,200,300);
        object(3,800,height-100,200,200);
        object(1,1000,height-200,200,300);
        object(2,width-100,height-100);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 9 - Bouncy and ice",10,10);
    }
    if(level===10){
        object(0,width-200,height-500,300,600);
        object(3,width-400,height-400,200,500);
        object(2,width-600,height-200);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 10 - Don't stop the momentum",10,10);
    }
    if(level===11){
        object(0,-100,height-200,width+200,300);
        object(0,width-300,height-550,50,275);
        object(0,width-300,height-550,400,50);
        object(0,width-50,height-550,50,275);
        object(0,-50,height-600,50,325);
        object(2,width-150,height-400,50,275);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 11 - Half the size",10,10);
    }
    if(level===12){
        object(0,-100,height-300,width-400,500);
        object(0,width-300,height-550,50,275);
        object(0,width-300,height-325,400,50);
        object(0,width-50,height-550,50,275);
        object(0,-50,height-550,50,275);
        object(0,-100,height-550,400,50);
        object(2,150,height-400,50,275);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 12 - A couple jumps",10,10);
    }
    if(level===13){
        object(0,-100,height-100,width+200,200);
        object(0,-50,-50,50,height+100);
        object(0,width-400,-100,500,200);
        object(0,width-400,100,50,height-250);
        object(0,width,-50,50,height+100);
        object(0,width-350,height-250,100,50);
        object(0,width-100,height-400,100,50);
        object(0,0,height-200,150,100);
        object(2,width-200,350);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 13 - Pretty much a cave",10,10);
    }
    if(level===14){
        object(0,-100,height-100,width+200,200);
        object(0,-50,-50,50,height+100);
        object(0,width-400,-100,500,200);
        object(0,width-400,200,50,height-300);
        object(0,width,-50,50,height+100);
        object(0,width-350,height-250,100,50);
        object(0,width-100,height-400,100,50);
        object(0,0,height-200,150,100);
        object(2,100,height-550);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 14 - Pretty much outside a cave",10,10);
    }
    if(level===15){
        object(0,-50,-50,50,height+100);
        object(0,-100,height-500,300,5);
        object(0,195,height-500,5,200);
        object(0,150,height-200,100,5);
        object(0,0,height-150,150,5);
        object(0,300,height-300,200,5);
        object(0,300,height-400,200,5);
        object(0,500,height-350,200,5);
        object(0,700,height-250,200,5);
        object(0,700,height-100,200,5);
        object(0,900,height-150,200,5);
        object(0,1100,height-250,200,5);
        object(0,1300,height-300,200,5);
        object(2,1400,height-350);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 15 - The rolling hills",10,10);
    }
    if(level===16){
        object(0,width-300,-100,50,height+200);
        object(1,width-250,height-250,350,350);
        object(1,-100,height-250,350,350);
        object(0,400,height-250,200,350);
        object(3,750,height-250,200,350);
        object(2,1100,height-500);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 16 - Just another level",10,10);
    }
    if(level===17){
        object(0,width-400,height-300,500,400);
        object(0,width-700,height-200,300,300);
        object(0,-100,height-300,200,400);
        object(0,300,height-500,200,600);
        object(2,400,height-600);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 17 - Are you bored yet?",10,10);
    }
    if(level===18){
        object(0,width-400,height-300,500,400);
        object(0,width-700,height-200,300,300);
        object(0,-100,height-300,200,400);
        object(0,300,height-500,200,600);
        object(2,550,height-100);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 18 - I thought so.",10,10);
    }
    if(level===19){
        object(0,-100,height-100,width+200,200);
        object(2,width/2,height-300);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 19 - Here's an easy one",10,10);
    }
    if(level===20){
        object(0,width/2-100,height-200,200,300);
        object(0,width/2+100,-100,50,height+200);
        object(0,width/2-150,height-400,50,400);
        object(0,width/2-150,-100,50,height-375);
        object(3,width/2-300,height-100,150,200);
        object(0,width/2-350,100,50,height+100);
        object(0,width/2-350,-100,200,100);
        object(1,width/2-600,height-100,250,200);
        object(0,width/2-1000,height-300,400,400);
        object(0,width/2+500,height-300,1000,400);
        object(0,width/2+400,height-375,150,50);
        object(0,width/2+250,height-425,150,50);
        object(0,width/2+500,-100,50,height-325);
        object(0,width/2+150,height,250,50);
        object(2,width/2+275,height-100);
        noStroke();
        fill(255);
        textSize(20);
        textAlign(LEFT,TOP);
        text("Level 20 - Devilishly dificult",10,10);
    }
    if(level===21){
        object(0,-100,height-100,width+200,200,true);
        if(floor(random(0,75))===0 && canJump){pvy=-10;canJump=false;}
        fill(255);
        textSize(100);
        textAlign(CENTER,CENTER);
        text("Congratulations",width/2,height/3);
        textSize(20);
        text("You have beaten Wirebox. Good job!",width/2,height/3+60);
    }


    //player square(s)
    noStroke();
    fill(255);
    rect(px,py,playerSize,playerSize);
    rect(px-width,py,playerSize,playerSize);
    rect(px+width,py,playerSize,playerSize);
    rect(px,py-height,playerSize,playerSize);
    rect(px,py+height,playerSize,playerSize);

    rect(px-width,py-height,playerSize,playerSize);
    rect(px+width,py-height,playerSize,playerSize);
    rect(px-width,py+height,playerSize,playerSize);
    rect(px+width,py+height,playerSize,playerSize);

    if(0.5*10*pvy**2>maxGPE && pvy<0){maxGPE=0.5*10*pvy**2;}

    //debugging info
    if(inDebugMode){
        rect(150,10,200,125);
        fill(0);
        textSize(15);
        textAlign(LEFT,TOP);
        text(px+", "+py+"\n"+pvx+", "+pvy+"\nhorizontal KE: "+0.5*10*pvx**2+"\nvertical KE: "+0.5*10*pvy**2+"\nGPE: "+(483-0.5*10*pvy**2)+"\ncanJump: "+canJump+"\nminPlayerSize: "+localStorage.getItem("minPlayerSize"),150,10);
    }
}
