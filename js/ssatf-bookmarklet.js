var snooty;
var px = 0;
var py = 0;
var rot = 60;
var legRot = 0;
var blink = 0;


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

function draw(){
background(document.body.background-color);
drawSnooty();
	px+=1;
snooty.style.left=px+"px";
snooty.style.top=py+"px";
}
