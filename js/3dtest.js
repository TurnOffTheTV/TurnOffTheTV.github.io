var xRot = 0;
var yRot = 0;
var teapot;

function preload(){
	teapot = loadModel("teapot.obj");
}

function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL);
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}

var mousePressed =function(){requestPointerLock();}

function draw(){
	xRot+=movedY/100;
	yRot+=movedX/100;
  background(0);
	rotateX(xRot);
	rotateY(yRot);
	scale(5.596063232421875);
	fill(255,255,255,128);
	stroke(255);
	sphere(150,20,20);
	scale(15);
	fill(100);
	push();
	translate(0,1);
	model(teapot);
	pop();
}
