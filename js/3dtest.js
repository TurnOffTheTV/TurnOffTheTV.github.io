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

var mousePressed =function(){requestPointerLock();fullscreen(true);}

function draw(){
	pointLight(255,255,255,-250,-250,-250);
	ambientLight(0,0,100);
	xRot+=movedY/100;
	yRot+=movedX/100;
  	background(0);
	rotateX(xRot);
	rotateY(yRot);
	scale(100);
	noStroke();
	specularMaterial(0,0,255);
	push();
	translate(0,-1);
	model(teapot);
	pop();
}
