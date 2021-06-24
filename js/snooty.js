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
var scene = 0;
var jumpRand = 0;
var enemyCount = 0;
var enemies = [];

function setup(){
  var keys = [keyCode];
  createCanvas(windowWidth,windowHeight);
}

function drawSnooty(){
push();
translate(px+rot/12,py);
rotate(legRot);
stroke(0);
strokeWeight(3);
line(0,0,0,35);
line(0,35,rot/12,35);
pop();
noStroke();
fill(235, 255, 84);
push();
translate(px,py);
rotate(rot);
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
rotate(rot+(rot*2));
pop();
push();
translate(px-rot/12,py);
rotate(legRot-legRot*2);
line(0,0,0,35);
line(0,35,rot/12,35);
pop();
}

function controlinator(){
keyPressed =function(){
if(keyCode===LEFT || keyCode===65){keyp.l=true;}
if(keyCode===RIGHT || keyCode===68){keyp.r=true;}
if(keyCode===UP || keyCode===87){keyp.u=true;}
};
keyReleased =function(){
if(keyCode===LEFT || keyCode===65){keyp.l=false;}
if(keyCode===RIGHT || keyCode===68){keyp.r=false;}
if(keyCode===UP || keyCode===87){keyp.u=false;}
};

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

if(keyp.u){jump=5;onFloor=false;}

if(onFloor){fall=0;jump=0;onFloorTF=false;}else{fall+=0.1;}

if(onFloorTF){onFloor=false;}

py+=fall;
py-=jump;

if(px>width-50){cx-=2;px-=2;}
if(px<50){cx+=2;px+=2;}
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
fill(99, 36, 36);
rect(x-15,y+40,30,40);
}

function menu(){
keyPressed =function(){};
background(50);
drawSnooty();
if(keyp.u){jump=5;onFloor=false;}

if(onFloor){fall=0;jump=0;onFloorTF=false;}else{fall+=0.1;}

if(onFloorTF){onFloor=false;}

py+=fall;
py-=jump;

platform(0,100,600);

jumpRand+=random(0.25,1)/2;
if(jumpRand>10 && jumpRand<50){keyp.u=false;}
if(jumpRand>150){keyp.u = true;jumpRand=0;}

fill(50);
stroke(0);
rect(200,300,200,100,5);
fill(255);
text("Play!",300,350);

mousePressed =function(){if(mouseX>200 && mouseY>300 && mouseX<400 && mouseY<400){scene=2;onFloor=false;}};
}

function dead(){
background(0);
fill(255, 0, 0);
textSize(40);
text("You died.",width/2,height/2);
mousePressed =function(){onFloor=true;
scene=1;
px=83;
py=91;
cx=0;
dir="right";
fall=0;
rot=60;
legRot=0;
};
}

function enemy(x,y,dead){
    this.x=x;
    this.y=y;
    this.dead=dead;
}

function level0(){
background(0, 219, 255);
fill(0, 215, 0);
rect((cx/3)-75,300,600,200);
rect((cx/3)+500,400,600,100);
fill(0, 230, 0);
rect((cx/2)-100,400,600,200);
rect((cx/2)+500,500,600,100);
rect((cx/2)+1000,300,400,300);
if(py<0){
    fill(255,255,255,(py-py*2)*2);
    rect(0,0,width,height);
}
drawSnooty();
controlinator();
noStroke();
fill(0, 200, 0);
rect(-100+cx,0,100,600);
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

function draw(){
if(scene===-1){dead();}
if(scene===0){drawLogo(0);}
if(scene===1){menu();}
if(scene===2){level0();}
}
