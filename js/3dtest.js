var px = 0;
var py = 0;
var pz = 0;
var cx = 0;
var cy = 0;
var cxspeed = 0;
var cyspeed = 0;
var autoTimeout = 0;
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

function mouseMoved(){
	cxspeed=0;
	cyspeed=0;
	autoTimeout=100;
}

function draw(){
	autoTimeout-=1;
	if(cx<0.01 && autoTimeout<0){cxspeed+=0.1;}
	if(cx>0.01 && autoTimeout<0){cxspeed-=0.1;}
	if(autoTimeout<0){cyspeed+=0.1;}
	if(autoTimeout<-1){autoTimeout=-1;}
	noStroke();
	ambientLight(100);
	cxspeed+=movedY;
	cyspeed+=movedX;
	cx+=cxspeed;
	cy+=cyspeed;
	if(cxspeed>2){cxspeed=2;}
	if(cyspeed>2){cyspeed=2;}
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
