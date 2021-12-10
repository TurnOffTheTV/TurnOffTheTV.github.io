var snooty;
var px = 0;
var py = 0;
var rot = 60;
var legRot = 0;
var doLegRot = false;
var legRotTF = false;
var blink = 0;
var controlMode = 0;
var fall = 0;
var jump = 0;
var onFloor = true;
var dir = "right";
var keyp = {
	u:false,
	d:false,
	l:false,
	r:false
};


function setup(){
  createCanvas(100,100);
  background(0,0,255);
  snooty = document.getElementById("defaultCanvas0");
  snooty.style.position="absolute";
}

function drawSnooty(){
	push();
	translate(37.5,60);
//leg
    push();
    translate(rot/12,0);
    rotate(radians(legRot));
    stroke(0);
    strokeWeight(3);
    line(0,0,0,35);
    line(0,35,rot/12,35);
    pop();
    //body
    noStroke();
    fill(235, 255, 84);
    push();
    translate(0,0);
    rotate(radians(rot));
    scale(2);
    triangle(0,-40,-10,10,10,10);
    triangle(-10,9,-5,20,0,10);
    triangle(0,9,5,20,10,10);
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
    //leg
    push();
    stroke(0);
		strokeWeight(3);
    translate(-rot/12,0);
    rotate(radians(legRot-legRot*2));
    line(0,0,0,35);
    line(0,35,rot/12,35);
    pop();
	pop();
}

function controlinator(){
	if(controlMode===0){
    doLegRot=false;
    keyp.u=false;
    keyp.l=false;
    keyp.r=false;
    keyp.d=false;

    if(keyIsDown(87)){keyp.u=true;}
    if(keyIsDown(83)){keyp.d=true;}
    if(keyIsDown(65)){keyp.l=true; doLegRot=true;}
    if(keyIsDown(68)){keyp.r=true; doLegRot=true;}
    }

    if(keyp.l){px-=2;}
    if(keyp.r){px+=2;}

    if(keyp.l && onFloor){dir="left";}
    if(keyp.r && onFloor){dir="right";}

  if(controlMode===2){
    keyp.l=false;
    keyp.r=false;
    if(p1.stick.lx>0.2 && onFloor){dir="right";}
    if(p1.stick.lx<-0.2 && onFloor){dir="left";}
    if(p1.stick.lx>0.2 || p1.stick.lx<-0.2){doLegRot=true; px+=p1.stick.lx*2;} else {doLegRot=false;}
    if(p1.button.cross){keyp.u=true;} else {keyp.u=false;}
  }

  if(controlMode1===3){
    keyp.l=false;
    keyp.r=false;
		keyp.u=false;
		keyp.d=false;

		if(p1.button.up){keyp.u=true;}
		if(p1.button.down){keyp.d=true;}
		if(p1.button.left){keyp.l=true;}
    if(p1.button.right){keyp.r=true;}

    if(p1.button.right && onFloor){dir="right";}
    if(p1.button.left && onFloor){dir="left";}
    if(p1.button.right || p1.button.left){doLegRot=true;} else {doLegRot=false;}
    if(p1.button.cross){keyp.u=true;}
  }

  if(dir==="left"){rot-=5;}
  if(dir==="right"){rot+=5;}

  if(rot>60){rot=60;}
  if(rot<-60){rot=-60;}

  if(doLegRot){
    if(legRot>30){legRotTF=false;}
    if(legRot<-30){legRotTF=true;}
    if(legRotTF){legRot+=2;}
    if(legRotTF===false){legRot-=2;}}else{
    if(legRot>0){legRot-=2;}
    if(legRot<0){legRot+=2;}
    }
	
  if(keyp.l && keyp.r){
    if(rot<0){rot-=5;}
    if(rot>0){rot+=5;}
    doLegRot=false;
	}else{doLegRot=true;}

  if(keyp.u && onFloor){jump=5;onFloor=false;fall=0;}

  if(onFloor && keyp.u===false){fall=0;jump=0;}

  if(onFloor===false){fall+=0.1}

  py+=fall;
  py-=jump;
	
	if(px>window.innerWidth){px=-100;}
	if(px<-100){px=window.innerWidth;}
	if(py>window.innerHeight){window.scrollTo(window.innerHeight,0);}
	if(py<-100){window.scrollTo(-window.innerHeight,0);}
}

function draw(){
background(document.body.background-color);
drawSnooty();
	px+=1;
snooty.style.left=px+"px";
snooty.style.top=py+"px";
if(keyIsDown(87) || keyIsDown(83) || keyIsDown(65) || keyIsDown(68)){controlMode=0;}

  if(p1.stick.lx>0.2 || p1.stick.lx<-0.2 || p1.stick.ly>0.2 || p1.stick.ly<-0.2){controlMode=2;}

  if(p1.button.left || p1.button.right || p1.button.up || p1.button.down){controlMode=3;}

}
