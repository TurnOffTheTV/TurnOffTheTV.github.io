var px = 0;
var py = 0;
var pz = 0;
var cx = 0;
var cy = 0;
var cz = 0;
var controlMode = 0;
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
	controlMode=1;
}

function draw(){
	noStroke();
	ambientLight(100);
	if(controlMode===0){
		cx+=movedY;
		cy+=movedX;
	}
	if(controlMode===1){
		if(p1.stick.ly>0.2 || p1.stick.ly<-0.2){cx+=2*p1.stick.ly;}
		if(p1.stick.lx>0.2 || p1.stick.lx<-0.2){cy+=2*p1.stick.lx;}
		if(p1.stick.rx>0.2 || p1.stick.rx<-0.2){cz+=2*p1.stick.rx;}
	}
	background(0);
	rotateX(radians(cx));
	rotateY(radians(cy));
	rotateZ(radians(cz));
	pointLight(255, 255, 255, -250, -250, -250);
	specularMaterial(0,0,255);
	push();
	scale(100);
	translate(0,1);
	rotateZ(radians(180));
	model(teapot);
	pop();
	if(p1.stick.rx>0.2 || p1.stick.rx<-0.2 || p1.stick.lx>0.2 || p1.stick.lx<-0.2 || p1.stick.ly>0.2 || p1.stick.ly<-0.2){controlMode=1;}
}