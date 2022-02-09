var px = 0;
var py = 0;
var pz = 0;
var pr = 0;
var cx = 0;
var cy = 0;
var cz = 0;
var controlMode = 0;
var teapot;
var keys = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
var jump = 0;
var sinceJump = 0;

function preload(){
	teapot = loadModel("teapot.obj");
}

function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL);
	noStroke();
	frameRate(60);
	//debugMode();
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}

function mouseMoved(){
	controlMode=0;
}

var keyPressed =function(){controlMode===0;keys[keyCode]=true;}

var keyReleased =function(){keys[keyCode]=false;}

function mousePressed(){requestPointerLock();fullscreen(true);}

function draw(){

	//physics
	sinceJump+=1;
	py+=16*sinceJump/60;
	py-=jump;

	//collision code

	//platform bottom
	if(py>0){py=0;sinceJump=0;jump=0;}

	if(controlMode===0){
		//camera
		cx+=movedY;
		cy+=movedX;

		//forward/backward
		if(keys[87]){px+=5*-sin(radians(-cy));pz+=5*-cos(radians(-cy));}
		if(keys[83]){px+=5*sin(radians(-cy));pz+=5*cos(radians(-cy));}

		//left/right
		if(keys[65]){px+=5*cos(radians(cy));pz+=5*sin(radians(cy));}
		if(keys[68]){px+=5*-cos(radians(cy));pz+=5*-sin(radians(cy));}

		//jump
		if(keys[32]){jump=10;}
	}
	if(controlMode===1){
		//camera
		if(p1.stick.ry>0.2 || p1.stick.ry<-0.2){cx+=3*p1.stick.ry;}
		if(p1.stick.rx>0.2 || p1.stick.rx<-0.2){cy+=3*p1.stick.rx;}

		//forward/backward
		if(p1.stick.ly<-0.2){px+=abs(5*p1.stick.ly)*-sin(radians(-cy));pz+=5*-cos(radians(-cy));}
		if(p1.stick.ly>0.2){px+=abs(5*p1.stick.ly)*sin(radians(-cy));pz+=5*cos(radians(-cy));}

		//left/right
		if(p1.stick.lx<-0.2){px+=5*cos(radians(cy));pz+=5*sin(radians(cy));pr=-90;}
		if(p1.stick.lx>0.2){px+=5*-cos(radians(cy));pz+=5*-sin(radians(cy));pr=90;}

		//jump
		if(p1.button.cross){jump=10;}
	}

	//set control mode controller
	if(p1.stick.lx>0.2 || p1.stick.ly>0.2 || p1.stick.lx<-0.2 || p1.stick.ly<-0.2 || p1.stick.rx>0.2 || p1.stick.ry>0.2 || p1.stick.rx<-0.2 || p1.stick.ry<-0.2 || p1.button.cross){
		controlMode=1;
	}

	background(0);
	ambientLight(100);

	//rotate map
	rotateX(-radians(213.75));
	rotateY(radians(cy));

	//lights
	pointLight(100, 100, 255, -250+px, -250+py, -250+pz);

	//map
	push();
	translate(px,py,pz);
	rotateX(radians(90));
	normalMaterial(0,255,0);
  plane(500, 500);
	rotateX(radians(-90));
	rotateY(radians(45));
	translate(-250,125,0)
	//plane(500,250);
	pop();

	//teapot
	push();
	scale(75);
	specularMaterial(0,0,255);//teapot material
	model(teapot);
	pop();
}
