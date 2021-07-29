var px = 83;
var py = 91;
var cx = 0;
var cy = 0;
var rot = 60;
var dir = "right";
var legRot = 0;
var legRotTF = false;
var doLegRot = true;
var keyp = {
l:false,
r:false,
u:false,
d:false
};
var onFloor = false;
var onFloorTF = false;
var jump = 0;
var fall = 0;
var blink = 0;
var scene = 0;
var jumpRand = 0;
var enemies = [];
var level = 0;
var controlMode = 0; //0=keyboad 1=touch 2=stick gamepad 3=button gamepad
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

function positive(posVictim){
  if(posVictim>0){return(posVictim);}else{return(posVictim-(posVictim*2));}
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
    if(keyIsDown(27)){paused=true;}
    }

    if(keyp.l){px-=2;}
    if(keyp.r){px+=2;}

    if(keyp.l && onFloor){dir="left";}
    if(keyp.r && onFloor){dir="right";}




  if(controlMode===2){
    keyp.l=false;
    keyp.r=false;
    if(stick.lx>deadzone.inner && onFloor){dir="right";}
    if(stick.lx<deadzone.inner-(deadzone.inner*2) && onFloor){dir="left";}
    if(stick.lx>0.2 || stick.lx<deadzone.inner-(deadzone.inner*2)){doLegRot=true; px+=stick.lx*2;} else {doLegRot=false;}
    if(button.cross){keyp.u=true;} else {keyp.u=false;}
    if(button.options){paused=true;}
  }

  if(controlMode===3){
    keyp.l=false;
    keyp.r=false;
    if(button.left){keyp.l=true;}
    if(button.right){keyp.r=true;}
    if(button.right && onFloor){dir="right";}
    if(button.left && onFloor){dir="left";}
    if(button.right || button.left){doLegRot=true;} else {doLegRot=false;}
    if(button.cross){keyp.u=true;} else {keyp.u=false;}
    if(button.options){paused=true;}
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

  if(keyp.l&&keyp.r){
    if(rot<0){rot-=5;}
    if(rot>0){rot+=5;}
    doLegRot=false;}else{doLegRot=true;}

  if(keyp.u && onFloor){jump=5;onFloor=false;fall=0;}

  if(onFloor && keyp.u===false){fall=0;jump=0;}

  if(onFloor===false){fall+=0.1}

  py+=fall;
  py-=jump;

  if(px>width-width/3){cx-=2;px-=2;}
  if(px<width/3){cx+=2;px+=2;}

  if(py>height-height/3){cy-=2;py-=2;}
  if(py<height/3){cy+=2;py+=2;}
}

function platform(x,y,w){
stroke(0);
strokeWeight(3);
line(x+cx,y+cy,x+w+cx,y+cy);
noStroke();
if(px>x-5+cx && px<x+w+5+cx && py>y-37+cy && py<y+2+cy){
if(px>x+cx && px<x+w+cx){py=cy+y-35;onFloor=true;}
if(px<x+cx || px>x+w+cx){onFloor=false;}
}
}

function wall(x,y,h){
  stroke(0);
  line(x+cx,y+cy,x+cx,y+h+cy);
  noStroke();
  if(py>y+cy && py<y+h+cy){
    if(px>x-15+cx && px<x+cx){
      if(controlMode===0 || controlMode===3){
        if(keyp.u===false && keyp.d===false || keyp.u && keyp.d || button.up && button.down || button.up===false || button.down===false){fall=1.5;}
        if(keyp.u && keyp.d===false || button.up && button.down===false){fall=1;}
        if(keyp.d && keyp.u===false || button.down && button.up===false){fall=2;}
        if(keyp.u===false){px=x-10+cx;jump=0;fall=1.5;}
        if(keyp.l && keyp.u || keyp.r && keyp.u){jump=5;}
      }
      if(controlMode===2){
        if(keyp.u===false){px=x-10+cx;jump=0;fall=1.5+(stick.ly/2);}
        if(stick.lx<deadzone.inner-(deadzone.inner*2) && keyp.u || stick.lx>deadzone.inner && keyp.u){jump=5;}
      }
      dir="left";
      doLegRot=false;
    }
    if(px>x+cx && px<x+15+cx){
      if(controlMode===0 || controlMode===3){
        if(keyp.u===false && keyp.d===false || keyp.u && keyp.d || button.up && button.down || button.up===false || button.down===false){fall=1.5;}
        if(keyp.u && keyp.d===false || button.up && button.down===false){fall=1;}
        if(keyp.d && keyp.u===false|| button.down && button.up===false){fall=2;}
        if(keyp.u===false){px=x+10+cx;jump=0;fall=1.5;}
        if(keyp.l && keyp.u || keyp.r && keyp.u){jump=5;}
      }
      if(controlMode===2){
        if(keyp.u===false){px=x+10+cx;jump=0;fall=1.5+(stick.ly/2);}
        if(stick.lx<deadzone.inner-(deadzone.inner*2) && keyp.u || stick.lx>deadzone.inner && keyp.u){jump=5;}
      }
      dir="right";
      doLegRot=false;
    }
  }
}

function door(x,y){
  fill(255);
  rect(x+cx-5,y+cy-5,70,85);
  fill(99, 36, 36);
  rect(x+cx,y+cy,60,80);
  fill(255, 255, 0);
  ellipse(x+cx+50,y+40+cy,15,15);
  if(px>x+cx && py>y+cy && px<x+cx+60 && py<y+80+cy){
    init=true;
    scene+=1;
    cx=0;
    cy=0;
    levelStart.x=px;
    levelStart.y=py;
  }
}

function menu(){
  if(init){
    sounds.menu.play();
    sounds.menu.loop();
    init=false;
    levelStart.x = 83;
    levelStart.y = 91;
    px=levelStart.x;
    py=levelStart.y;
    cx=0;
    cy=0;
    fall=0;
    facing="right";
  }
  if(sounds.menu.isPlaying===false){init=true;}
  style.innerHTML="body {margin:0px;border:0px;background:rgb(50,50,50);}";
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

  if(controlMode===0){selectedButton=0;

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
      onFloor=false;
      selectedButton=0;
      init=true;
    }
    if(mouseX>(width/3)*2-100 && mouseY>(height/2)-50 && mouseX<(width/3)*2+100 && mouseY<(height/2)+50 && mouseIsPressed){
      window.location.href="https://turnoffthetv.github.io/programs/";
      selectedButton=0;
    }
  }
  if(controlMode===2){
    if(stick.lx<deadzone.inner-(deadzone.inner*2)){selectedButton=1;}
    if(stick.lx>deadzone.inner){selectedButton=2;}

    if(button.cross && selectedButton===1){
      scene=1;
      onFloor=false;
      selectedButton=0;
      init=true;
    }
    if(button.cross && selectedButton===2){
      window.location.href="https://turnoffthetv.github.io/programs/";
      selectedButton=0;
    }
  }
  if(controlMode===3){
    if(button.left){selectedButton=1;}
    if(button.right){selectedButton=2;}

    if(button.cross && selectedButton===1){
      scene=1;
      onFloor=false;
      selectedButton=0;
      init=true;
    }
    if(button.cross && selectedButton===2){
      window.location.href="https://turnoffthetv.github.io/programs/";
      selectedButton=0;
    }
  }
  if(mouseIsPressed && sounds.menu.isPlaying()===false || gamepadIsPressed && sounds.menu.isPlaying()===false){sounds.menu.play();}
}

function dead(){
  if(controlMode===2 || controlMode===3){deathRumbleTimer+=1;
    if(deathRumbleTimer<25){rumble=true;}else{rumble=false;}
  }
  sounds.overworld.stop();
  sounds.cave.stop();
  init=true;
  onFloor=false;
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
  text("Click here to continue",width/3,2*height/3);
  text("Click here to return to menu",2*width/3,2*height/3);
  if(controlMode===0){
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
      onFloor=false;
      scene=level;
      px=levelStart.x;
      py=levelStart.y;
      cx=0;
      cy=0;
      dir="right";
      fall=0;
      rot=60;
      legRot=0;
      jump=0;
      deathRumbleTimer=0;
    }
    if(mouseIsPressed && mouseX>2*(width/3)-127.5 && mouseY>(2*height/3)-12.5 && mouseX<2*(width/3)+127.5 && mouseY<(2*height/2)+12.5){
      scene=0;
      deathRumbleTimer=0;
    }
  }
  if(controlMode===2 || controlMode===3){
    if(stick.lx<deadzone.inner-(deadzone.inner*2) || button.left){selectedButton=1;}
    if(stick.lx>deadzone.inner || button.right){selectedButton=2;}

    if(button.cross && selectedButton===1){
      onFloor=false;
      scene=level;
      px=83;
      py=91;
      cx=0;
      dir="right";
      fall=0;
      rot=60;
      legRot=0;
      selectedButton=0;
      deathRumbleTimer=0;
    }
    if(button.cross && selectedButton===2){
      levelStart.x=83;
      levelStart.y=91;
      scene=0;
      selectedButton=0;
      deathRumbleTimer=0;
    }
  }
}

function pause(){
  sounds.overworld.pause();
  sounds.cave.pause();
  fill(0,0,0,127.5);
  rect(0,0,width,height);
  fill(255);
  textSize(40);
  text("PAUSED",width/2,height/3);
  textSize(20);
  if(button.circle){paused=false;}
  if(keyIsDown(27) && keyIsDown(16)){paused=false;init=true;}
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
  if(py<0){
      fill(255,255,255,(py-py*2)*2);
      rect(0,0,width,height);
  }

  door(1975,350);
  drawSnooty();
  if(paused===false){controlinator();}
  noStroke();
  fill(0, 200, 0);
  rect(-1000+cx,0,1000,height);
  if(px<10+cx){px=10+cx;}
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
  if(py>height+100){scene=-1;}
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
  drawSnooty();
  if(paused===false){controlinator();}
  platform(900,500,200);
  platform(700,400,200);
  platform(400,500,200);
  platform(600,600,100);
  platform(0,1000,400);
  if(py<0){
      fill(0,0,0,(py-py*2)*2);
      rect(0,0,width,height);
  }
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
  text("px="+px+", py="+py,100,140);
  text("controlMode="+controlMode,100,160);
  text("stick.lx="+stick.lx,100,180);
  text("onFloor="+onFloor+", keyp.u="+keyp.u,100,200);
  text("selectedButton="+selectedButton,100,220);
}

function draw(){
  cursor();
  if(keyIsPressed || mouseX !==pmouseX || mouseY!==pmouseY){controlMode=0;}
  if(touches>0){controlMode=1;}
  if(stick.lx>deadzone.inner || stick.lx<deadzone.inner-(2*deadzone.inner) || stick.ly>deadzone.inner || stick.ly<deadzone.inner-(2*deadzone.inner)){controlMode=2;}
  if(button.left || button.right || button.up || button.down){controlMode=3;}
  if(controlMode===2 && button.logo || controlMode===3 && button.logo){window.location.href="https://turnoffthetv.github.io/programs/snooty-scooty-and-the-frowns/";}
  if(width !== windowWidth || height !== windowHeight){resizeCanvas(windowWidth, windowHeight);}
  if(scene===-1){dead();}
  if(scene===0){menu();}
  if(scene===1){level0();}
  if(scene===2){level1();}
  if(paused){pause();}
}
