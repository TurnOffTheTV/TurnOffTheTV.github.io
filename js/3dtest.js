var px = 0;
var py = 0;
var pz = 0;
var cx = 0;
var cy = 0;
var cz = 0;
var controlMode = 0;
var teapot;
var keys = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];


function preload(){
	teapot = loadModel("teapot.obj");
}

function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL);
	noStroke();
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
	if(controlMode===0){
		cx+=movedY;
		cy+=movedX;
		if(keys[87]){px+=5*-sin(radians(-cy));pz+=5*-cos(radians(-cy));}
		if(keys[83]){px+=5*sin(radians(-cy));pz+=5*cos(radians(-cy));}
		if(keys[65]){px+=5*sin(radians(cy));pz+=5*cos(radians(cy));}
		if(keys[68]){px+=5*-sin(radians(cy));pz+=5*-cos(radians(-cy));}
	}
	if(controlMode===1){
		if(p1.stick.ry>0.2 || p1.stick.ry<-0.2){cx+=3*p1.stick.ry;}
		if(p1.stick.rx>0.2 || p1.stick.rx<-0.2){cy+=3*p1.stick.rx;}
		if(p1.stick.ly<-0.2){px+=abs(5*p1.stick.ly)*-sin(radians(-cy));pz+=5*-cos(radians(-cy));}
		if(p1.stick.ly>0.2){px+=abs(5*p1.stick.ly)*sin(radians(-cy));pz+=5*cos(radians(-cy));}
		if(keys[65]){px+=5*sin(radians(-cy));pz+=5*-cos(radians(cy));}
		if(keys[68]){px+=5*-sin(radians(cy));pz+=5*cos(radians(-cy));}
	}

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
	pop();

	//teapot
	push();
	scale(75);
	specularMaterial(0,0,255);//teapot material
	model(teapot);
	pop();
}
