var px = 0;
var py = 0;
var pz = 0;
var cx = 0;
var cy = 0;
var teapot;


function preload(){
	teapot = loadModel("teapot.obj");
}

function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL);
	//debugMode();
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}

var mousePressed =function(){requestPointerLock();fullscreen(true);}

function draw(){
	noStroke();
	ambientLight(100);
	cx+=movedY;
	cy+=movedX;
  background(0);
	rotateX(radians(cx));
	rotateY(radians(cy));
	pointLight(255, 255, 255, -250, -250, -250);
	specularMaterial(0,0,255);
	push();
	scale(100);
	translate(0,1);
	rotateZ(radians(180));
	model(teapot);
	pop();
}
