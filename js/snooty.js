var px = 83;
var py = 91;
var cx = 0;
var rot = 60;
var dir = "right";
var legRot = 0;
var legRotTF = false;
var doLegRot = true;
var keyp = {
l:false,
r:false,
u:false,
};
var onFloor = false;
var onFloorTF = false;
var jump = 0;
var fall = 0;
var blink = 0;
var scene = 1;
var jumpRand = 0;
var enemyCount = 0;
var enemies = [];
var level = 0;

function setup(){
  createCanvas(windowWidth,windowHeight);
  textFont("Tahoma");
}

function drawSnooty(){
//leg
push();
translate(px+rot/12,py);
rotate(radians(legRot));
stroke(0);
strokeWeight(3);
line(0,0,0,35);
line(0,35,rot/12,35);
pop();

noStroke();
fill(235, 255, 84);
push();
translate(px,py);
rotate(radians(rot));
scale(2);
triangle(0,-40,-10,10,10,10);
triangle(-10,10,-5,20,0,10);
triangle(0,10,5,20,10,10);
stroke(0);
strokeWeight(2);
line(rot/30,-3,rot/12,-5);
strokeWeight(5);
if(blink>100){stroke(255, 0, 0, 0);}
blink+=random(0.3,0.7);
if(blink>110){blink=0;}
point(0-rot/30,-10);
stroke(0);
rotate(radians(rot+(rot*2)));
pop();

push();
stroke(0);
translate(px-rot/12,py);
rotate(radians(legRot-legRot*2));
line(0,0,0,35);
line(0,35,rot/12,35);
pop();
}

function controlinator(){
  keyp.u=false;
  keyp.l=false;
  keyp.r=false;

  if(keyIsDown(87)){keyp.u=true;}
  if(keyIsDown(65)){keyp.l=true;}
  if(keyIsDown(68)){keyp.r=true;}

  if(keyp.l){dir="left";px-=2;}
  if(keyp.r){dir="right";px+=2;}

  if(dir==="left"){rot-=5;}
  if(dir==="right"){rot+=5;}

  if(rot>60){rot=60;}
  if(rot<-60){rot=-60;}

  if(keyp.l&& doLegRot || keyp.r && doLegRot){
  if(legRot>30){legRotTF=false;}
  if(legRot<-30){legRotTF=true;}
  if(legRotTF){legRot+=2;}
  if(legRotTF===false){legRot-=2;}
  }else{
  if(legRot>0){legRot-=2;}
  if(legRot<0){legRot+=2;}
  }

  if(keyp.l&&keyp.r){
  if(rot<0){rot-=5;}
  if(rot>0){rot+=5;}
  doLegRot=false;
  }else{doLegRot=true;}

  if(keyp.u){jump=5;onFloor=false;console.log("keyp.u");}

  if(onFloor){fall=0;jump=0;}else{fall+=0.1;}

  py+=fall;
  py-=jump;

  if(px>width-width/3){cx-=2;px-=2;}
  if(px<width/3){cx+=2;px+=2;}
}

function platform(x,y,w){
stroke(0);
strokeWeight(3);
line(x+cx,y,x+w+cx,y);
noStroke();
if(px>x-5+cx && px<x+w+5+cx && py>y-37 && py<y+2){
if(px>x+cx && px<x+w+cx){py=y-35;onFloor=true;}
if(px<x+cx || px>x+w+cx){onFloor=false;}
}
}

function door(x,y){
fill(255);
rect(x+cx-5,y-5,70,85);
fill(99, 36, 36);
rect(x+cx,y,60,80);
fill(255, 255, 0);
ellipse(x+cx+50,y+40,15,15);
if(px>x+cx && py>y && px<x+cx+60 && py<y+80){scene+=1;cx=0;onFloor=false;}
}

function menu(){
  background(50);
  drawSnooty();
  if(keyp.u){jump=5;onFloor=false;}

  if(onFloor){fall=0;jump=0;onFloorTF=false;}else{fall+=0.1;}

  if(onFloorTF){onFloor=false;}

  py+=fall;
  py-=jump;

  platform(0,100,width);

  jumpRand+=random(0.25,1)/2;
  if(jumpRand>10 && jumpRand<50){keyp.u=false;}
  if(jumpRand>150){keyp.u = true;jumpRand=0;}

  fill(50);
  stroke(0);
  rectMode(CENTER);
  rect(width/3,height/2,200,100,5);
  rect(width*2/3,height/2,200,100,5);
  textAlign(CENTER,CENTER);
  fill(255);
  textSize(40);
  text("Play!",width/3,height/2);
  text("Back",width*2/3,height/2);

  if(mouseX>(width/3)-100 && mouseY>(height/2)-50 && mouseX<(width/3)+100 && mouseY<(height/2)+50 && mouseIsPressed){
    scene=2;
    onFloor=false;
  }
  if(mouseX>(width/3)*2-100 && mouseY>(height/2)-50 && mouseX<(width/3)*2+100 && mouseY<(height/2)+50 && mouseIsPressed){
    window.location.href="https://turnoffthetv.github.io/programs/";
  }
}

function dead(){
background(0);
fill(255, 0, 0);
textSize(40);
text("You died.",width/2,height/2);
textSize(20);
text("Click to continue",width/2,(height/2)+40);
if(mouseIsPressed){
onFloor=true;
scene=level+1;
px=83;
py=91;
cx=0;
dir="right";
fall=0;
rot=60;
legRot=0;
}
}

function level0(){
  rectMode(CORNER);
  if(level<1){level=1;}
  background(0, 219, 255);
  fill(0, 215, 0);
  rect((cx/3)-75,300,600,height);
  rect((cx/3)+500,400,600,height);
  fill(0, 230, 0);
  rect((cx/2)-100,400,600,height);
  rect((cx/2)+500,500,600,height);
  rect((cx/2)+1000,300,400,height);
  if(py<0){
      fill(255,255,255,(py-py*2)*2);
      rect(0,0,width,height);
  }

  door(1975,350);
  drawSnooty();
  controlinator();
  noStroke();
  fill(0, 200, 0);
  rect(-1000+cx,0,1000,height);
  if(px<10+cx){px=10+cx;}
  platform(0,500,150);
  platform(0,205,200);
  platform(300,300,200);
  platform(300,400,200);
  platform(500,350,200);
  platform(500,100,200);
  platform(150,450,100);
  platform(700,250,200);
  platform(900,550,300);
  platform(900,350,300);
  platform(1400,550,300);
  platform(1200,475,200);
  platform(1700,485,200);
  platform(1900,430,200);
  if(py>height+100){scene=-1;}
}

function level1(){
if(level<2){level=2;}
noStroke();
background(60, 85, 89);
fill(59);
rect(cx/3,400,300,200);
rect(300+(cx/3),300,400,300);
fill(70);
rect(cx/2,500,300,100);
rect(300+(cx/2),400,350,150);
drawSnooty();
controlinator();
platform(900,500,200);
platform(700,400,200);
platform(400,500,200);
if(py<0){
    fill(0,0,0,(py-py*2)*2);
    rect(0,0,width,height);
}
if(py>height+100){scene=-1;}
}

function draw(){
  storeItem("level", level)
  if(width !== windowWidth || height !== windowHeight){resizeCanvas(windowWidth, windowHeight);}
  if(scene===-1){dead();}
  if(scene===1){menu();}
  if(scene===2){level0();}
  if(scene===3){level1();}
}
