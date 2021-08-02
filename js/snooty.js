var px1 = 83;
var py1 = 91;
var px2 = 223;
var py2 = 91;
var px3 = 363;
var py3 = 91;
var px4 = 503;
var py4 = 91;
var cx = 0;
var cy = 0;
var rot1 = 60;
var rot2 = 60;
var rot3 = 60;
var rot4 = 60;
var dir1 = "right";
var dir2 = "left";
var dir3 = "right";
var dir4 = "left";
var legRot1 = 0;
var legRot2 = 0;
var legRot3 = 0;
var legRot4 = 0;
var legRotTF1 = false;
var legRotTF2 = false;
var legRotTF3 = false;
var legRotTF4 = false;
var doLegRot1 = true;
var doLegRot2 = true;
var doLegRot3 = true;
var doLegRot4 = true;
var keyp1 = {
l:false,
r:false,
u:false,
d:false
};
var keyp2 = {
l:false,
r:false,
u:false,
d:false
};
var keyp3 = {
l:false,
r:false,
u:false,
d:false
};
var keyp4 = {
l:false,
r:false,
u:false,
d:false
};
var onFloor1 = false;
var onFloor2 = false;
var onFloor3 = false;
var onFloor4 = false;
var onWall1 = false;
var onWall2 = false;
var onWall3 = false;
var onWall4 = false;
var onFloorTF1 = false;
var onFloorTF2 = false;
var onFloorTF3 = false;
var onFloorTF4 = false;
var jump1 = 0;
var jump2 = 0;
var jump3 = 0;
var jump4 = 0;
var fall1 = 0;
var fall2 = 0;
var fall3 = 0;
var fall4 = 0;
var blink1 = 0;
var blink2 = 0;
var blink3 = 0;
var blink4 = 0;
var scene = 0;
var jumpRand1 = 0;
var jumpRand2 = 0;
var jumpRand3 = 0;
var jumpRand4 = 0;
var enemies = [];
var level = 0;
var controlMode1 = -1; //0=keyboad 1=touch 2=stick gamepad 3=button gamepad
var controlMode2 = -1; //0=keyboad 1=touch 2=stick gamepad 3=button gamepad
var controlMode3 = -1; //0=keyboad 1=touch 2=stick gamepad 3=button gamepad
var controlMode4 = -1; //0=keyboad 1=touch 2=stick gamepad 3=button gamepad
var selectedButton = 0;
var deadzone = {
  inner:0.2,
  outer:0
}
var paused = false;
var sounds;
var images;
var init = true;
var levelStart = {
  x:83,
  y:91
};
var deathRumbleTimer = 0;
var style = document.getElementById("style");

function preload(){
  sounds = {
    menu:loadSound("https://turnoffthetv.github.io/audio/ssatf-menu.mp3"),
    overworld:loadSound("https://turnoffthetv.github.io/audio/ssatf-overworld.mp3"),
    cave:loadSound("https://turnoffthetv.github.io/audio/ssatf-cave.mp3")
  }
  images = {
    sky:loadImage("https://turnoffthetv.github.io/images/snooty-sky.png")
  }
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  textFont("Tahoma");
}

function drawSnooty(player){
  if(player===0){
    //leg
    push();
    translate(px1+rot1/12,py1);
    rotate(radians(legRot1));
    stroke(0);
    strokeWeight(3);
    line(0,0,0,35);
    line(0,35,rot1/12,35);
    pop();
    //body
    noStroke();
    fill(235, 255, 84);
    push();
    translate(px1,py1);
    rotate(radians(rot1));
    scale(2);
    triangle(0,-40,-10,10,10,10);
    triangle(-10,10,-5,20,0,10);
    triangle(0,10,5,20,10,10);
    stroke(0);
    strokeWeight(2);
    line(rot1/30,-3,rot1/12,-5);
    strokeWeight(5);
    if(blink1>100){stroke(255, 0, 0, 0);}
    blink1+=random(0.3,0.7);
    if(blink1>110){blink1=0;}
    point(0-rot1/30,-10);
    stroke(0);
    rotate(radians(rot1+(rot1*2)));
    pop();
    //leg
    push();
    stroke(0);
		strokeWeight(3);
    translate(px1-rot1/12,py1);
    rotate(radians(legRot1-legRot1*2));
    line(0,0,0,35);
    line(0,35,rot1/12,35);
    pop();
  }
  if(player===1){
    //leg
    push();
    translate(px2+rot2/12,py2);
    rotate(radians(legRot2));
    stroke(0);
    strokeWeight(3);
    line(0,0,0,35);
    line(0,35,rot2/12,35);
    pop();
    //body
    noStroke();
    fill(128, 99, 255);
    push();
    translate(px2,py2);
    rotate(radians(rot2));
    scale(2);
    triangle(0,-40,-10,10,10,10);
    triangle(-10,10,-5,20,0,10);
    triangle(0,10,5,20,10,10);
    stroke(0);
    strokeWeight(2);
    line(rot2/30,-3,rot2/12,-5);
    strokeWeight(5);
    if(blink2>100){stroke(255, 0, 0, 0);}
    blink2+=random(0.3,0.7);
    if(blink2>110){blink2=0;}
    point(0-rot2/30,-10);
    stroke(0);
    rotate(radians(rot2+(rot2*2)));
    pop();
    //leg
    push();
    stroke(0);
    translate(px2-rot2/12,py2);
    rotate(radians(legRot2-legRot2*2));
    line(0,0,0,35);
    line(0,35,rot2/12,35);
    pop();
  }
  if(player===2){
    //leg
    push();
    translate(px3+rot3/12,py3);
    rotate(radians(legRot3));
    stroke(0);
    strokeWeight(3);
    line(0,0,0,35);
    line(0,35,rot3/12,35);
    pop();
    //body
    noStroke();
    fill(255, 80, 80);
    push();
    translate(px3,py3);
    rotate(radians(rot3));
    scale(2);
    triangle(0,-40,-10,10,10,10);
    triangle(-10,10,-5,20,0,10);
    triangle(0,10,5,20,10,10);
    stroke(0);
    strokeWeight(2);
    line(rot3/30,-3,rot3/12,-5);
    strokeWeight(5);
    if(blink3>100){stroke(255, 0, 0, 0);}
    blink3+=random(0.3,0.7);
    if(blink3>110){blink3=0;}
    point(0-rot3/30,-10);
    stroke(0);
    rotate(radians(rot3+(rot3*2)));
    pop();
    //leg
    push();
    stroke(0);
    translate(px3-rot3/12,py3);
    rotate(radians(legRot3-legRot3*2));
    line(0,0,0,35);
    line(0,35,rot3/12,35);
    pop();
  }
  if(player===3){
    //leg
    push();
    translate(px4+rot4/12,py4);
    rotate(radians(legRot4));
    stroke(0);
    strokeWeight(3);
    line(0,0,0,35);
    line(0,35,rot4/12,35);
    pop();
    //body
    noStroke();
    fill(76, 255, 135);
    push();
    translate(px4,py4);
    rotate(radians(rot4));
    scale(2);
    triangle(0,-40,-10,10,10,10);
    triangle(-10,10,-5,20,0,10);
    triangle(0,10,5,20,10,10);
    stroke(0);
    strokeWeight(2);
    line(rot4/30,-3,rot4/12,-5);
    strokeWeight(5);
    if(blink4>100){stroke(255, 0, 0, 0);}
    blink4+=random(0.3,0.7);
    if(blink4>110){blink4=0;}
    point(0-rot4/30,-10);
    stroke(0);
    rotate(radians(rot4+(rot4*2)));
    pop();
    //leg
    push();
    stroke(0);
    translate(px4-rot4/12,py4);
    rotate(radians(legRot4-legRot4*2));
    line(0,0,0,35);
    line(0,35,rot4/12,35);
    pop();
  }
}

function positive(posVictim){
  if(posVictim>0){return(posVictim);}else{return(posVictim-(posVictim*2));}
}

function controlinator(player){
  //player 1
  if(player===0){
  if(controlMode1===0){
    doLegRot1=false;
    keyp1.u=false;
    keyp1.l=false;
    keyp1.r=false;
    keyp1.d=false;

    if(keyIsDown(87)){keyp1.u=true;}
    if(keyIsDown(83)){keyp1.d=true;}
    if(keyIsDown(65)){keyp1.l=true; doLegRot1=true;}
    if(keyIsDown(68)){keyp1.r=true; doLegRot1=true;}
    if(keyIsDown(27) && keyIsDown(16)===false){paused=true;}
    }

    if(keyp1.l){px1-=2;}
    if(keyp1.r){px1+=2;}

    if(keyp1.l && onFloor1){dir1="left";}
    if(keyp1.r && onFloor1){dir1="right";}

  if(controlMode1===2){
    keyp1.l=false;
    keyp1.r=false;
    if(p1.stick.lx>deadzone.inner && onFloor1){dir1="right";}
    if(p1.stick.lx<deadzone.inner-(deadzone.inner*2) && onFloor1){dir1="left";}
    if(p1.stick.lx>0.2 || p1.stick.lx<deadzone.inner-(deadzone.inner*2)){doLegRot1=true; px1+=p1.stick.lx*2;} else {doLegRot1=false;}
    if(p1.button.cross){keyp1.u=true;} else {keyp1.u=false;}
    if(p1.button.options){paused=true;}
  }

  if(controlMode1===3){
    keyp1.l=false;
    keyp1.r=false;
		keyp1.u=false;
		keyp1.d=false;

		if(p1.button.up){keyp1.u=true;}
		if(p1.button.down){keyp1.d=true;}
		if(p1.button.left){keyp1.l=true;}
    if(p1.button.right){keyp1.r=true;}

    if(p1.button.right && onFloor1){dir1="right";}
    if(p1.button.left && onFloor1){dir1="left";}
    if(p1.button.right || p1.button.left){doLegRot1=true;} else {doLegRot1=false;}
    if(p1.button.cross){keyp1.u=true;}
    if(p1.button.options){paused=true;}
  }

  if(dir1==="left"){rot1-=5;}
  if(dir1==="right"){rot1+=5;}

  if(rot1>60){rot1=60;}
  if(rot1<-60){rot1=-60;}

  if(doLegRot1){
    if(legRot1>30){legRotTF1=false;}
    if(legRot1<-30){legRotTF1=true;}
    if(legRotTF1){legRot1+=2;}
    if(legRotTF1===false){legRot1-=2;}}else{
    if(legRot1>0){legRot1-=2;}
    if(legRot1<0){legRot1+=2;}
  }

  if(keyp1.l&&keyp1.r){
    if(rot1<0){rot1-=5;}
    if(rot1>0){rot1+=5;}
    doLegRot1=false;
	}else{doLegRot1=true;}

  if(keyp1.u && onFloor1){jump1=5;onFloor1=false;fall1=0;}

  if(onFloor1 && keyp1.u===false){fall1=0;jump1=0;}

  if(onFloor1===false){fall1+=0.1}

  py1+=fall1;
  py1-=jump1;

	if(px1>width-width/3){cx-=2;px1-=2;px2-=2;px3-=2;px4-=2;}
  if(px1<width/3){cx+=2;px1+=2;px2+=2;px3+=2;px4+=2;}

  if(py1>height-height/3){cy-=2;py1-=2;py2-=2;py3-=2;py4-=2;}
  if(py1<height/3){cy+=2;py1+=2;py2+=2;py3+=2;py4+=2;}

  }

  //player 2
  if(player===1){
		if(controlMode2===-1){
	    px2=px1;
			py2=py1;
	  }

		if(controlMode2===0){
	    doLegRot2=false;
	    keyp2.u=false;
	    keyp2.l=false;
	    keyp2.r=false;
	    keyp2.d=false;

	    if(keyIsDown(73)){keyp2.u=true;}
	    if(keyIsDown(75)){keyp2.d=true;}
	    if(keyIsDown(74)){keyp2.l=true; doLegRot2=true;}
	    if(keyIsDown(76)){keyp2.r=true; doLegRot2=true;}
	    if(keyIsDown(49)){paused=true;}
  	}

    if(keyp2.l){px2-=2;}
    if(keyp2.r){px2+=2;}

    if(keyp2.l && onFloor2){dir2="left";}
    if(keyp2.r && onFloor2){dir2="right";}

  if(controlMode2===2){
    keyp1.l=false;
    keyp1.r=false;
    if(p2.stick.lx>deadzone.inner && onFloor2){dir2="right";}
    if(p2.stick.lx<deadzone.inner-(deadzone.inner*2) && onFloor2){dir2="left";}
    if(p2.stick.lx>0.2 || p2.stick.lx<deadzone.inner-(deadzone.inner*2)){doLegRot2=true; px2+=p2.stick.lx*2;} else {doLegRot2=false;}
    if(p2.button.cross){keyp2.u=true;} else {keyp2.u=false;}
  }

  if(controlMode2===3){
    keyp2.l=false;
    keyp2.r=false;
    if(p2.button.left){keyp2.l=true;}
    if(p2.button.right){keyp2.r=true;}
    if(p2.button.right && onFloor2){dir2="right";}
    if(p2.button.left && onFloor2){dir2="left";}
    if(p2.button.right || p2.button.left){doLegRot2=true;} else {doLegRot2=false;}
    if(p2.button.cross){keyp2.u=true;} else {keyp2.u=false;}
    if(p2.button.options){paused=true;}
  }

  if(dir2==="left"){rot2-=5;}
  if(dir2==="right"){rot2+=5;}

  if(rot2>60){rot2=60;}
  if(rot2<-60){rot2=-60;}

  if(doLegRot2){
    if(legRot2>30){legRotTF2=false;}
    if(legRot2<-30){legRotTF2=true;}
    if(legRotTF2){legRot2+=2;}
    if(legRotTF2===false){legRot2-=2;}}else{
    if(legRot2>0){legRot2-=2;}
    if(legRot2<0){legRot2+=2;}
  }

  if(keyp2.l&&keyp2.r){
    if(rot2<0){rot2-=5;}
    if(rot2>0){rot2+=5;}
    doLegRot2=false;}else{doLegRot2=true;}

  if(keyp2.u && onFloor2){jump2=5;onFloor2=false;fall2=0;}

  if(onFloor2 && keyp1.u===false){fall2=0;jump2=0;}

  if(onFloor2===false){fall2+=0.1}

  py2+=fall2;
  py2-=jump2;

	if(py2<-50){px2=px1;py2=py1;onFloor2=false;}
	if(py2>height+100){px2=px1;py2=py1;onFloor2=false;}
	if(px2>width+50){px4=px2;py2=py1;onFloor2=false;}
	if(px2<-50){px2=px1;py2=py1;onFloor2=false;}
  }

  //player 3
  if(player===2){
		if(controlMode3===-1){
	    px3=px1;
			py3=py1;
	  }

  if(controlMode3===0){
    doLegRot3=false;
    keyp3.u=false;
    keyp3.l=false;
    keyp3.r=false;
    keyp3.d=false;

    if(keyIsDown(38)){keyp3.u=true;}
    if(keyIsDown(40)){keyp3.d=true;}
    if(keyIsDown(37)){keyp3.l=true; doLegRot3=true;}
    if(keyIsDown(39)){keyp3.r=true; doLegRot3=true;}
    if(keyIsDown(50)){paused=true;}
    }

    if(keyp3.l){px3-=2;}
    if(keyp3.r){px3+=2;}

    if(keyp3.l && onFloor3){dir3="left";}
    if(keyp3.r && onFloor3){dir3="right";}

  if(controlMode3===2){
    keyp3.l=false;
    keyp3.r=false;
    if(p3.stick.lx>deadzone.inner && onFloor3){dir3="right";}
    if(p3.stick.lx<deadzone.inner-(deadzone.inner*2) && onFloor3){dir3="left";}
    if(p3.stick.lx>0.2 || p3.stick.lx<deadzone.inner-(deadzone.inner*2)){doLegRot3=true; px3+=p3.stick.lx*2;} else {doLegRot3=false;}
    if(p3.button.cross){keyp3.u=true;} else {keyp3.u=false;}
    if(p3.button.options){paused=true;}
  }

  if(controlMode1===3){
    keyp3.l=false;
    keyp3.r=false;
    if(p3.button.left){keyp3.l=true;}
    if(p3.button.right){keyp3.r=true;}
    if(p3.button.right && onFloor3){dir3="right";}
    if(p3.button.left && onFloor3){dir3="left";}
    if(p3.button.right || p3.button.left){doLegRot3=true;} else {doLegRot3=false;}
    if(p3.button.cross){keyp3.u=true;} else {keyp3.u=false;}
    if(p3.button.options){paused=true;}
  }

  if(dir3==="left"){rot3-=5;}
  if(dir3==="right"){rot3+=5;}

  if(rot3>60){rot3=60;}
  if(rot3<-60){rot3=-60;}

  if(doLegRot3){
    if(legRot3>30){legRotTF3=false;}
    if(legRot3<-30){legRotTF3=true;}
    if(legRotTF3){legRot3+=2;}
    if(legRotTF3===false){legRot3-=2;}}else{
    if(legRot3>0){legRot3-=2;}
    if(legRot3<0){legRot3+=2;}
  }

  if(keyp3.l&&keyp3.r){
    if(rot3<0){rot3-=5;}
    if(rot3>0){rot3+=5;}
    doLegRot3=false;}else{doLegRot3=true;}

  if(keyp3.u && onFloor3){jump3=5;onFloor3=false;fall3=0;}

  if(onFloor3 && keyp3.u===false){fall3=0;jump3=0;}

  if(onFloor3===false){fall3+=0.1}

  py3+=fall3;
  py3-=jump3;

	if(py3>height+100){px3=px1;py3=py1;}
	if(px3>width+50){px4=px3;py3=py1;}
	if(px3<-50){px3=px1;py3=py1;}
  }

  //player 4
  if(player===3){
		if(controlMode3===-1){
	    px3=px1;
			py3=py1;
	  }

  if(controlMode4===0){
    doLegRot4=false;
    keyp4.u=false;
    keyp4.l=false;
    keyp4.r=false;
    keyp4.d=false;

    if(keyIsDown(84)){keyp4.u=true;}
    if(keyIsDown(71)){keyp4.d=true;}
    if(keyIsDown(70)){keyp4.l=true; doLegRot4=true;}
    if(keyIsDown(72)){keyp4.r=true; doLegRot4=true;}
    if(keyIsDown(51)){paused=true;}
    }

    if(keyp4.l){px4-=2;}
    if(keyp4.r){px4+=2;}

    if(keyp4.l && onFloor4){dir4="left";}
    if(keyp4.r && onFloor4){dir4="right";}




  if(controlMode4===2){
    keyp4.l=false;
    keyp4.r=false;
    if(p4.stick.lx>deadzone.inner && onFloor4){dir4="right";}
    if(p4.stick.lx<deadzone.inner-(deadzone.inner*2) && onFloor4){dir4="left";}
    if(p4.stick.lx>0.2 || p4.stick.lx<deadzone.inner-(deadzone.inner*2)){doLegRot4=true; px4+=p4.stick.lx*2;} else {doLegRot4=false;}
    if(p4.button.cross){keyp4.u=true;} else {keyp4.u=false;}
    if(p4.button.options){paused=true;}
  }

  if(controlMode4===3){
    keyp4.l=false;
    keyp4.r=false;
    if(p4.button.left){keyp4.l=true;}
    if(p4.button.right){keyp4.r=true;}
    if(p4.button.right && onFloor4){dir4="right";}
    if(p4.button.left && onFloor4){dir4="left";}
    if(p4.button.right || p4.button.left){doLegRot4=true;} else {doLegRot4=false;}
    if(p4.button.cross){keyp4.u=true;} else {keyp4.u=false;}
    if(p4.button.options){paused=true;}
  }

  if(dir4==="left"){rot4-=5;}
  if(dir4==="right"){rot4+=5;}

  if(rot4>60){rot4=60;}
  if(rot4<-60){rot4=-60;}

  if(doLegRot4){
    if(legRot4>30){legRotTF4=false;}
    if(legRot4<-30){legRotTF4=true;}
    if(legRotTF4){legRot4+=2;}
    if(legRotTF4===false){legRot4-=2;}}else{
    if(legRot4>0){legRot4-=2;}
    if(legRot4<0){legRot4+=2;}
  }

  if(keyp4.l&&keyp4.r){
    if(rot4<0){rot4-=5;}
    if(rot4>0){rot4+=5;}
    doLegRot4=false;}else{doLegRot4=true;}

  if(keyp4.u && onFloor4){jump4=5;onFloor4=false;fall4=0;}

  if(onFloor4 && keyp4.u===false){fall4=0;jump4=0;}

  if(onFloor4===false){fall4+=0.1}

  py4+=fall4;
  py4-=jump4;

	if(py4>height+100){px4=px1;py4=py1;}
	if(px4>width+50){px4=px1;py4=py1;}
	if(px4<-50){px4=px1;py4=py1;}
  }
}

function platform(x,y,w){
	stroke(0);
	strokeWeight(3);
	line(x+cx,y+cy,x+w+cx,y+cy);
	noStroke();
	if(px1>x-5+cx && px1<x+w+5+cx && py1>y-37+cy && py1<y+2+cy){
		if(px1>x+cx && px1<x+w+cx){py1=cy+y-35;onFloor1=true;}
		if(px1<x+cx || px1>x+w+cx){onFloor1=false;}
	}
	if(px2>x-5+cx && px2<x+w+5+cx && py2>y-37+cy && py2<y+2+cy){
		if(px2>x+cx && px2<x+w+cx){py2=cy+y-35;onFloor2=true;}
		if(px2<x+cx || px2>x+w+cx){onFloor2=false;}
	}
	if(px3>x-5+cx && px3<x+w+5+cx && py3>y-37+cy && py3<y+2+cy){
		if(px3>x+cx && px3<x+w+cx){py3=cy+y-35;onFloor3=true;}
		if(px3<x+cx || px3>x+w+cx){onFloor3=false;}
	}
	if(px4>x-5+cx && px4<x+w+5+cx && py4>y-37+cy && py4<y+2+cy){
		if(px4>x+cx && px4<x+w+cx){py4=cy+y-35;onFloor4=true;}
		if(px4<x+cx || px4>x+w+cx){onFloor4=false;}
	}
}

function wall(x,y,h){
  stroke(0);
  line(x+cx,y+cy,x+cx,y+h+cy);
  noStroke();
	//player 1
	if(py1>y+cy && py1<y+h+cy){
    if(px1>x-15+cx && px1<x+cx){
			if(controlMode1===0 || controlMode1===3){
        if(keyp1.u===false && keyp1.d===false || keyp1.u && keyp1.d || p1.button.up && p1.button.down || p1.button.up===false || p1.button.down===false){fall1=1.5;}
        if(keyp1.u && keyp1.d===false || p1.button.up && p1.button.down===false){fall1=1;}
        if(keyp1.d && keyp1.u===false|| p1.button.down && p1.button.up===false){fall1=2;}

        if(keyp1.u || keyp1.r || keyp1.u && keyp1.l===false){px1=x-14+cx;jump1=0;fall1=1.5;}
        if(keyp1.r===false && keyp1.l && keyp1.u){jump1=5;}
      }
      if(controlMode1===2){
        if(keyp1.u===false){px1=x-10+cx;jump1=0;fall1=1.5+(p1.stick.ly/2);}

				if(keyp1.u && p1.stick.lx>deadzone.inner || keyp1.u && p1.stick.lx>deadzone.inner-deadzone.inner*2){px1=x-14+cx;jump1=0;fall1=1.5;}
        if(p1.stick.lx<deadzone.inner && p1.stick.lx<deadzone.inner-deadzone.inner*2 && keyp1.u){jump1=5;}
      }
      dir1="left";
      doLegRot1=false;
    }

    if(px1>x+cx && px1<x+15+cx){
      if(controlMode1===0 || controlMode1===3){
        if(keyp1.u===false && keyp1.d===false || keyp1.u && keyp1.d || p1.button.up && p1.button.down || p1.button.up===false || p1.button.down===false){fall1=1.5;}
        if(keyp1.u && keyp1.d===false || p1.button.up && p1.button.down===false){fall1=1;}
        if(keyp1.d && keyp1.u===false|| p1.button.down && p1.button.up===false){fall1=2;}

        if(keyp1.u || keyp1.l || keyp1.u && keyp1.r===false){px1=x+14+cx;jump1=0;fall1=1.5;}
        if(keyp1.l===false && keyp1.r && keyp1.u){jump1=5;}
      }
      if(controlMode1===2){
        if(keyp1.u===false){px1=x+10+cx;jump1=0;fall1=1.5+(p1.stick.ly/2);}

				if(keyp1.u && p1.stick.lx<deadzone.inner-deadzone.inner*2 || keyp1.u && p1.stick.lx<deadzone.inner){px1=x+14+cx;jump1=0;fall1=1.5;}
        if(p1.stick.lx>deadzone.inner-deadzone.inner*2 && p1.stick.lx>deadzone.inner && keyp1.u){jump1=5;}
      }
      dir1="right";
      doLegRot1=false;
    }
  }
}

function spikes(x,y,w){
	fill(96,144,88);
	for(var i=0;i<w;i+=10){
		triangle(x+cx+i,y+cy,x+10+cx+i,y+cy,x+5+cx+i,y-10+cy);
	}
	stroke(0);
	strokeWeight(3);
	line(x+cx,y+cy,x+w+cx,y+cy);
	noStroke();
	if(px1>x+cx && px1<x+w+cx && py1>y-10+cy && py1<y+cy){scene=-1;}
	if(px2>x+cx && px2<x+w+cx && py2>y-10+cy && py2<y+cy){px2=px1;py2=py1;}
	if(px3>x+cx && px3<x+w+cx && py3>y-10+cy && py3<y+cy){px3=px1;py3=py1;}
	if(px4>x+cx && px4<x+w+cx && py4>y-10+cy && py4<y+cy){px4=px1;py4=py1;}
}

function door(x,y){
  fill(255);
  rect(x+cx-5,y+cy-5,70,85);
  fill(99, 36, 36);
  rect(x+cx,y+cy,60,80);
  fill(255, 255, 0);
  ellipse(x+cx+50,y+40+cy,15,15);
  if(px1>x+cx && py1>y+cy && px1<x+cx+60 && py1<y+80+cy){
    init=true;
    scene+=1;
    cx=0;
    cy=0;
    levelStart.x=px1;
    levelStart.y=py1;
    onFloor1=false;
		onFloor2=false;
		onFloor3=false;
		onFloor4=false;
  }
}

function menu(){
  if(init){
    sounds.menu.play();
    sounds.menu.loop();
    init=false;
    levelStart.x = 83;
    levelStart.y = 91;
    px1=levelStart.x;
    py1=levelStart.y;
		px2=levelStart.x+140;
    py2=levelStart.y;
		px3=levelStart.x+140*2;
    py3=levelStart.y;
		px4=levelStart.x+140*3;
    py4=levelStart.y;
    cx=0;
    cy=0;
    fall1=0;
    facing="right";
  }
  if(sounds.menu.isPlaying===false){init=true;}
  style.innerHTML="body {margin:0px;border:0px;background:rgb(50,50,50);}";
  background(50);
  drawSnooty(0);
	if(controlMode2!==-1){drawSnooty(1);}
	if(controlMode3!==-1){drawSnooty(2);}
	if(controlMode4!==-1){drawSnooty(3);}

  if(keyp1.u){jump1=5;onFloor1=false;}
	if(keyp2.u){jump2=5;onFloor2=false;}
	if(keyp3.u){jump3=5;onFloor3=false;}
	if(keyp4.u){jump4=5;onFloor4=false;}

  if(onFloor1){fall1=0;jump1=0;onFloorTF1=false;}else{fall1+=0.1;}
  if(onFloorTF1){onFloor1=false;}

	if(onFloor2){fall2=0;jump2=0;onFloorTF2=false;}else{fall2+=0.1;}
  if(onFloorTF2){onFloor2=false;}

	if(onFloor3){fall3=0;jump3=0;onFloorTF3=false;}else{fall3+=0.1;}
  if(onFloorTF3){onFloor3=false;}

	if(onFloor4){fall4=0;jump4=0;onFloorTF4=false;}else{fall4+=0.1;}
  if(onFloorTF4){onFloor4=false;}

  py1+=fall1;
  py1-=jump1;

	py2+=fall2;
	py2-=jump2;

	py3+=fall3;
	py3-=jump3;

	py4+=fall4;
	py4-=jump4;

  platform(0,100,width);

  jumpRand1+=random(0.25,1)/2;
	jumpRand2+=random(0.25,1)/4;
	jumpRand3+=random(0.5,1)/2;
	jumpRand4+=random(0.25,1)/3;

  if(jumpRand1>10 && jumpRand1<50){keyp1.u=false;}
  if(jumpRand1>150){keyp1.u = true;jumpRand1=0;}

	if(jumpRand2>10 && jumpRand2<50){keyp2.u=false;}
  if(jumpRand2>150){keyp2.u = true;jumpRand2=0;}

	if(jumpRand3>10 && jumpRand3<50){keyp3.u=false;}
  if(jumpRand3>150){keyp3.u = true;jumpRand3=0;}

	if(jumpRand4>10 && jumpRand4<50){keyp4.u=false;}
  if(jumpRand4>150){keyp4.u = true;jumpRand4=0;}

	legRot1=0;
	rot1=60;
	dir1="right";

	legRot2=0;
	rot2=60;
	dir2="right";

	legRot3=0;
	rot3=60;
	dir3="right";

	legRot4=0;
	rot4=60;
	dir4="right";

  fill(50);
  rectMode(CENTER);
  stroke(0);
  if(selectedButton===1){
    stroke(255);
  }
  rect(width/3,height/2,200,100,5);
  stroke(0);
  if(selectedButton===2){
    stroke(255);
  }
  rect(width*2/3,height/2,200,100,5);
  textAlign(CENTER,CENTER);
  fill(255);
  textSize(40);
  noStroke();
  text("Play!",width/3,height/2);
  text("Back",width*2/3,height/2);

  if(controlMode1===0){selectedButton=0;

    if(mouseX>(width/3)-100 && mouseY>(height/2)-50 && mouseX<(width/3)+100 && mouseY<(height/2)+50){
      selectedButton=1;
      cursor(HAND);
    }
    if(mouseX>(width/3)*2-100 && mouseY>(height/2)-50 && mouseX<(width/3)*2+100 && mouseY<(height/2)+50){
      selectedButton=2;
      cursor(HAND);
    }

    if(mouseX>(width/3)-100 && mouseY>(height/2)-50 && mouseX<(width/3)+100 && mouseY<(height/2)+50 && mouseIsPressed){
      scene=1;
      onFloor1=false;
			onFloor2=false;
			onFloor3=false;
			onFloor4=false;
      selectedButton=0;
      init=true;
    }
    if(mouseX>(width/3)*2-100 && mouseY>(height/2)-50 && mouseX<(width/3)*2+100 && mouseY<(height/2)+50 && mouseIsPressed){
      window.location.href="https://turnoffthetv.github.io/programs/";
      selectedButton=0;
    }
  }
  if(controlMode1===2){
    if(p1.stick.lx<deadzone.inner-(deadzone.inner*2)){selectedButton=1;}
    if(p1.stick.lx>deadzone.inner){selectedButton=2;}

    if(p1.button.cross && selectedButton===1){
      scene=1;
			onFloor1=false;
			onFloor2=false;
			onFloor3=false;
			onFloor4=false;
      selectedButton=0;
      init=true;
    }
    if(p1.button.cross && selectedButton===2){
      window.location.href="https://turnoffthetv.github.io/programs/";
      selectedButton=0;
    }
  }
  if(controlMode1===3){
    if(p1.button.left){selectedButton=1;}
    if(p1.button.right){selectedButton=2;}

    if(p1.button.cross && selectedButton===1){
      scene=1;
			onFloor1=false;
			onFloor2=false;
			onFloor3=false;
			onFloor4=false;
      selectedButton=0;
      init=true;
    }
    if(p1.button.cross && selectedButton===2){
      window.location.href="https://turnoffthetv.github.io/programs/";
      selectedButton=0;
    }
  }
  if(mouseIsPressed && sounds.menu.isPlaying()===false || p1.gamepadIsPressed && sounds.menu.isPlaying()===false){sounds.menu.play();}
}

function dead(){
  if(controlMode1===2 || controlMode1===3){deathRumbleTimer+=1;
    if(deathRumbleTimer<25){p1.rumble=true;}else{p1.rumble=false;}
  }
  sounds.overworld.stop();
  sounds.cave.stop();
  init=true;
  onFloor1=false;
  textAlign(CENTER,CENTER);
  style.innerHTML="body {margin:0px;border:0px;background:rgb(0,0,0);}";
  background(0);
  fill(255, 0, 0);
  textSize(40);
  text("You died.",width/2,height/3);
  noFill();
  stroke(255,0,0);
  rectMode(CENTER);
  strokeWeight(1);
  if(selectedButton===1){strokeWeight(3);}
  rect(width/3,2*height/3,200,25);
  strokeWeight(1);
  if(selectedButton===2){strokeWeight(3);}
  rect(2*width/3,2*height/3,255,25);
  noStroke();
  fill(255,0,0);
  textSize(20);
  text("Continue",width/3,2*height/3);
  text("Return to menu",2*width/3,2*height/3);
  if(controlMode1===0){
    selectedButton=0;
    if(mouseX>(width/3)-100 && mouseY>(2*height/3)-12.5 && mouseX<(width/3)+100 && mouseY<(2*height/3)+12.5){
      selectedButton=1;
      cursor(HAND);
    }
    if(mouseX>2*(width/3)-127.5 && mouseY>(2*height/3)-12.5 && mouseX<2*(width/3)+127.5 && mouseY<(2*height/3)+12.5){
      selectedButton=2;
      cursor(HAND);
    }

    if(mouseIsPressed && mouseX>(width/3)-100 && mouseY>(2*height/3)-12.5 && mouseX<(width/3)+100 && mouseY<(2*height/3)+12.5){
      onFloor1=false;
			onFloor2=false;
			onFloor3=false;
			onFloor4=false;
      scene=level;
      px1=levelStart.x;
      py1=levelStart.y;
			px2=px1;
      py2=py1;
			px3=px1;
      py3=py1;
			px4=px1;
      py4=py1;
      cx=0;
      cy=0;
      rot1="right";
      fall1=0;
      rot1=60;
      legRot1=0;
      jump1=0;
      deathRumbleTimer=0;
    }
    if(mouseIsPressed && mouseX>2*(width/3)-127.5 && mouseY>(2*height/3)-12.5 && mouseX<2*(width/3)+127.5 && mouseY<(2*height/2)+12.5){
      scene=0;
      deathRumbleTimer=0;
    }
  }
  if(controlMode1===2 || controlMode1===3){
    if(p1.stick.lx<deadzone.inner-(deadzone.inner*2) || p1.button.left){selectedButton=1;}
    if(p1.stick.lx>deadzone.inner || p1.button.right){selectedButton=2;}

    if(p1.button.cross && selectedButton===1){
			onFloor1=false;
			onFloor2=false;
			onFloor3=false;
			onFloor4=false;
      scene=level;
      px1=levelStart.x;
      py1=levelStart.y;
			px2=px1;
      py2=py1;
			px3=px1;
      py3=py1;
			px4=px1;
      py4=py1;
			cx=0;
			cy=0;
      rot1="right";
      fall1=0;
      rot1=60;
      legRot1=0;
      selectedButton=0;
      deathRumbleTimer=0;
    }
    if(p1.button.cross && selectedButton===2){
      levelStart.x=83;
      levelStart.y=91;
      scene=0;
      selectedButton=0;
      deathRumbleTimer=0;
    }
  }
}

function pause(){
  sounds.overworld.stop();
  sounds.cave.stop();
  fill(0,0,0,127.5);
	rectMode(CORNER);
  rect(0,0,width,height);
  fill(255);
  textSize(40);
	textAlign(CENTER,CENTER)
  text("PAUSED",width/2,height/3);
  textSize(20);
	text("Drop out \n Player 2",width/3,height/2);
	text("Drop out \n Player 3",width/2,height/2);
	text("Drop out \n Player 4",width*2/3,height/2);
	text("Menu",width/2,height*2/3);
	noFill();
	stroke(255);
	rectMode(CENTER);
	strokeWeight(2);
	if(selectedButton===1){strokeWeight(5);}
	rect(width/3,height/2,100,75,5);
	strokeWeight(2);
	if(selectedButton===2){strokeWeight(5);}
	rect(width/2,height/2,100,75,5);
	strokeWeight(2);
	if(selectedButton===3){strokeWeight(5);}
	rect(width*2/3,height/2,100,75,5);
	strokeWeight(2);
	if(selectedButton===4){strokeWeight(5);}
	rect(width/2,height*2/3,100,75,5);
	noStroke();
	if(controlMode1===2 && p1.button.circle || controlMode1===3 && p1.button.circle){paused=false;init=true;}
  if(controlMode1===0 && keyIsDown(27) && keyIsDown(16)){paused=false;init=true;}
	if(controlMode1===0){
		if(mouseX>width/3-50 && mouseX<width/3+50 && mouseY>height/2-75 && mouseY<height/2+75){
			if(mouseIsPressed){controlMode2=-1;}
			cursor(HAND);
		}
		if(mouseX>width/2-50 && mouseX<width/2+50 && mouseY>height/2-75 && mouseY<height/2+75){
			if(mouseIsPressed){controlMode3=-1;}
			cursor(HAND);
		}
		if(mouseX>width*2/3-50 && mouseX<width*2/3+50 && mouseY>height/2-75 && mouseY<height/2+75){
			if(mouseIsPressed){controlMode4=-1;}
			cursor(HAND);
		}
		if(mouseX>width/2-50 && mouseX<width/2+50 && mouseY>height*2/3-75 && mouseY<height*2/3+75){
			if(mouseIsPressed){
				scene=0;
				cx=0;
				cy=0;
				px1=89;
				py1=93;
				px2=89+140;
				py2=93;
				px3=89+140*2;
				py3=93;
				px4=89+140*3;
				py4=93;
				dir1="right";
				dir2="right";
				dir3="right";
				dir4s="right";
				paused=false;
			}
			cursor(HAND);
		}

	}
	if(controlMode1===2){
		if(selectedButton!==4 && p1.stick.ly>deadzone.inner){selectedButton=4;}
		if(selectedButton===4 && p1.stick.ly<deadzone.inner-deadzone.inner*2){selectedButton=2;}
		if(selectedButton===2 && p1.stick.lx<deadzone.inner-deadzone.inner*2 || selectedButton===4 && p1.stick.lx<deadzone.inner-deadzone.inner*2){selectedButton=1;}
		if(selectedButton===2 && p1.stick.lx>deadzone.inner || selectedButton===4 && p1.stick.lx>deadzone.inner){selectedButton=3;}
		if(selectedButton===1 && p1.stick.lx>deadzone.inner){selectedButton=2;}
		if(selectedButton===3 && p1.stick.lx<deadzone.inner-deadzone.inner*2){selectedButton=2;}

		if(selectedButton===1 && p1.button.cross){controlMode2=-1;}
		if(selectedButton===2 && p1.button.cross){controlMode3=-1;}
		if(selectedButton===3 && p1.button.cross){controlMode4=-1;}
		if(selectedButton===4 && p1.button.cross){
			scene=0;
			cx=0;
			cy=0;
			px1=89;
			py1=93;
			px2=89+140;
			py2=93;
			px3=89+140*2;
			py3=93;
			px4=89+140*3;
			py4=93;
			dir1="right";
			dir2="right";
			dir3="right";
			dir4s="right";
			paused=false;
		}
	}
	if(controlMode1===3){
		if(selectedButton!==4 && p1.button.down){selectedButton=4;}
		if(selectedButton===4 && p1.button.up){selectedButton=2;}
		if(selectedButton===2 && p1.button.left|| selectedButton===4 && p1.button.left){selectedButton=1;}
		if(selectedButton===2 && p1.button.right || selectedButton===4 && p1.button.right){selectedButton=3;}
		if(selectedButton===1 && p1.button.right){selectedButton=2;}
		if(selectedButton===3 && p1.button.left){selectedButton=2;}

		if(selectedButton===1 && p1.button.cross){controlMode2=-1;}
		if(selectedButton===2 && p1.button.cross){controlMode3=-1;}
		if(selectedButton===3 && p1.button.cross){controlMode4=-1;}
		if(selectedButton===4 && p1.button.cross){
			scene=0;
			cx=0;
			cy=0;
			px1=89;
			py1=93;
			px2=89+140;
			py2=93;
			px3=89+140*2;
			py3=93;
			px4=89+140*3;
			py4=93;
			dir1="right";
			dir2="right";
			dir3="right";
			dir4s="right";
			paused=false;
		}
	}
}

function level0(){
  if(init){
    sounds.menu.stop();
    sounds.overworld.play();
    sounds.overworld.loop();
    init=false;
  }
  rectMode(CORNER);
  if(level<1){level=1;}
  style.innerHTML="body {margin:0px;border:0px;background:rgb(0,219,255);}";
  background(0, 219, 255);
  //image(images.sky,0,0,width,height);
  fill(0, 215, 0);
  rect((cx/3)-75,(cy/3)+300,600,height);
  rect((cx/3)+500,(cy/3)+400,600,height);
  rect((cx/3)+1000,(cy/3)+300,800,height);
    rect((cx/3)+1500,(cy/3)+250,600,height);
  fill(0, 230, 0);
  rect((cx/2)-100,(cy/2)+400,600,height);
  rect((cx/2)+500,(cy/2)+500,600,height);
  rect((cx/2)+1000,(cy/2)+300,400,height);
  rect((cx/2)+1000,(cy/2)+600,1000,height);
  rect((cx/2)+2000,(cy/2)+200,500,height);
  if(py1<0){
      fill(255,255,255,(py1-py1*2)*2);
      rect(0,0,width,height);
  }

  door(1975,350);
	drawSnooty(0);
	if(controlMode2!==-1){drawSnooty(1);}
	if(controlMode3!==-1){drawSnooty(2);}
	if(controlMode4!==-1){drawSnooty(3);}
  if(paused===false){controlinator(0);controlinator(1);controlinator(2);controlinator(3);}
  noStroke();
  fill(0, 200, 0);
  rect(-1000+cx,0,1000,height);
  if(px1<10+cx){px1=10+cx;}
  platform(0,500,150);
  platform(0,205,200);
  wall(200,205,150);
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
  if(py1>height+100){scene=-1;}
}

function level1(){
  if(init){
    sounds.overworld.stop();
    sounds.cave.play();
    sounds.cave.loop();
    init=false;
  }
  if(level<2){level=2;}
  noStroke();
  style.innerHTML="body {margin:0px;border:0px;background:rgb(60,85,89);}";
  background(60, 85, 89);
  fill(59);
  rect(cx/3,400+(cy/3),300,height);
  rect(300+(cx/3),300+(cy/3),400,height);
  fill(70);
  rect(cx/2,500+(cy/2),300,height);
  rect(300+(cx/2),400+(cy/2),350,height);
  rectMode(CORNER);
  fill(0,0,0);
  rect(175+cx,500+cy,50,100);
  triangle(150+cx,600+cy,250+cx,600+cy,200+cx,700+cy);
	door(-625,2219);
	drawSnooty(0);
	if(controlMode2!==-1){drawSnooty(1);}
	if(controlMode3!==-1){drawSnooty(2);}
	if(controlMode4!==-1){drawSnooty(3);}
  if(paused===false){controlinator(0);controlinator(1);controlinator(2);controlinator(3);}
  platform(900,500,200);
  platform(700,400,200);
  platform(400,500,200);
  platform(600,600,100);
  platform(0,1000,400);
  platform(900,600,600);
	platform(-200,900,200);
	wall(-100,900,900)
	platform(-400,1100,200);
	platform(-500,1300,400);
	platform(-700,1300,400);
	spikes(-100,1800,2500);
	platform(-1000,1200,200);
	wall(-1100,700,1000);
	spikes(-1100,1700,1000);
	platform(-800,1100,150);
	wall(-600,200,1000);
	platform(-1000,1000,150);
	platform(-800,900,150);
	platform(-1000,800,150);
	wall(-1400,500,1500);
	spikes(-1400,2000,500);
	platform(-1300,1900,200);
	platform(-1100,1950,200);
	platform(-900,2100,200);
	platform(-700,2300,200);
  if(py1<0){
      fill(0,0,0,(py1-py1*2)*2);
      rect(0,0,width,height);
  }
}

function level2(){
  if(init){
    sounds.cave.stop();
    init=false;
  }
  if(level<3){level=3;}
  noStroke();
  style.innerHTML="body {margin:0px;border:0px;background:rgb(0,0,0);}";
  background(0);
	/*drawSnooty(0);
	if(controlMode2!==-1){drawSnooty(1);}
	if(controlMode3!==-1){drawSnooty(2);}
	if(controlMode4!==-1){drawSnooty(3);}
  if(paused===false){controlinator(0);controlinator(1);controlinator(2);controlinator(3);}*/
}

function debug(){
  noStroke();
  fill(255);
  rectMode(CORNER);
  rect(100,100,250,140);
  fill(0);
  textSize(20);
  textAlign(LEFT,TOP);
  text("level="+level+", scene="+scene,100,100);
  text("mouseX="+mouseX+", mouseY="+mouseY,100,120);
  text("px1="+px1+", py1="+py1,100,140);
  text("controlMode1="+controlMode1,100,160);
  text("p1.stick.lx="+p1.stick.lx,100,180);
  text("p1.button.up="+p1.button.up+", keyp1.u="+keyp1.u,100,200);
  text("selectedButton="+selectedButton,100,220);
}

function draw(){
  cursor();

  if(keyIsDown(87) || keyIsDown(83) || keyIsDown(65) || keyIsDown(68) || mouseX!==pmouseX || mouseY!==pmouseY){controlMode1=0;}

  if(touches>0){controlMode1=1;}

  if(p1.stick.lx>deadzone.inner || p1.stick.lx<deadzone.inner-(2*deadzone.inner) || p1.stick.ly>deadzone.inner || p1.stick.ly<deadzone.inner-(2*deadzone.inner)){controlMode1=2;}

  if(p1.button.left || p1.button.right || p1.button.up || p1.button.down){controlMode1=3;}

	if(keyIsDown(73) || keyIsDown(75) || keyIsDown(74) || keyIsDown(76)){controlMode2=0;}

  if(p2.stick.lx>deadzone.inner || p2.stick.lx<deadzone.inner-(2*deadzone.inner) || p2.stick.ly>deadzone.inner || p2.stick.ly<deadzone.inner-(2*deadzone.inner)){controlMode2=2;}

  if(p2.button.left || p2.button.right || p2.button.up || p2.button.down){controlMode2=3;}

	if(keyIsDown(38) || keyIsDown(40) || keyIsDown(37) || keyIsDown(39)){controlMode3=0;}

  if(p3.stick.lx>deadzone.inner || p3.stick.lx<deadzone.inner-(2*deadzone.inner) || p3.stick.ly>deadzone.inner || p3.stick.ly<deadzone.inner-(2*deadzone.inner)){controlMode3=2;}

  if(p3.button.left || p3.button.right || p3.button.up || p3.button.down){controlMode3=3;}

	if(keyIsDown(84) ||	keyIsDown(71) || keyIsDown(70) || keyIsDown(72)){controlMode4=0;}

  if(p4.stick.lx>deadzone.inner || p4.stick.lx<deadzone.inner-(2*deadzone.inner) || p4.stick.ly>deadzone.inner || p4.stick.ly<deadzone.inner-(2*deadzone.inner)){controlMode4=2;}

  if(p4.button.left || p4.button.right || p4.button.up || p4.button.down){controlMode4=3;}

  if(controlMode1===2 && p1.button.logo || controlMode1===3 && p1.button.logo){window.location.href="https://turnoffthetv.github.io/programs/snooty-scooty-and-the-frowns/reload/";}

  if(width !== windowWidth || height !== windowHeight){resizeCanvas(windowWidth, windowHeight);}

  if(scene===-1){dead();}
  if(scene===0){menu();}
  if(scene===1){level0();}
  if(scene===2){level1();}
	if(scene===3){level2();}
  if(paused){pause();}
}
