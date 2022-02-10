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

//from https://attacomsian.com/blog/javascript-detect-mobile-device
const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}

function mouseMoved(){
	controlMode=0;
}

var keyPressed =function(){controlMode===0;keys[keyCode]=true;}

var keyReleased =function(){keys[keyCode]=false;}

function mousePressed(){if(deviceType()==="desktop"){requestPointerLock();fullscreen(true);}}

function draw(){

	//physics
	sinceJump+=1;
	py+=16*(sinceJump/60)**2;
	py-=jump;

	//collision code

	//lower platform
	if(py>0 && px>-250 && px<250 && pz>-250 && pz<250){py=0;sinceJump=0;jump=0;}

	//upper platform
	if(py>-250 && px>250 && pz>-250 && pz<250){py=-250;sinceJump=0;jump=0;}

	if(controlMode===0){
		//camera
		cx+=movedY;
		cy+=movedX;
		pr+=movedX;

		//forward/backward
		if(keys[87]){px+=5*-sin(radians(-cy));pz+=5*-cos(radians(-cy));}
		if(keys[83]){px+=5*sin(radians(-cy));pz+=5*cos(radians(-cy));}

		//left/right
		if(keys[65]){px+=5*cos(radians(cy));pz+=5*sin(radians(cy));}
		if(keys[68]){px+=5*-cos(radians(cy));pz+=5*-sin(radians(cy));}

		//rotation
		if(sinceJump===0){
			if(keys[87]){pr=-90;}
			if(keys[83]){pr=90;}
			if(keys[65]){pr=180;}
			if(keys[68]){pr=0;}
			if(keys[87] && keys[65]){pr=270-45;}
			if(keys[87] && keys[68]){pr=-45;}
			if(keys[83] && keys[65]){pr=180-45;}
			if(keys[83] && keys[68]){pr=45;}
			}

		//jump
		if(keys[32]){jump=10;}
	}
	if(controlMode===1){
		//camera
		if(p1.stick.ry>0.2 || p1.stick.ry<-0.2){cx+=3*p1.stick.ry;}
		if(p1.stick.rx>0.2 || p1.stick.rx<-0.2){cy+=3*p1.stick.rx;pr+=3*p1.stick.rx;}

		//forward/backward
		if(p1.stick.ly<-0.2){px+=abs(5*p1.stick.ly)*-sin(radians(-cy));pz+=5*-cos(radians(-cy));pr=-90;}
		if(p1.stick.ly>0.2){px+=abs(5*p1.stick.ly)*sin(radians(-cy));pz+=5*cos(radians(-cy));pr=90;}

		//left/right
		if(p1.stick.lx<-0.2){px+=5*cos(radians(cy));pz+=5*sin(radians(cy));pr=180;}
		if(p1.stick.lx>0.2){px+=5*-cos(radians(cy));pz+=5*-sin(radians(cy));pr=0;}

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
	pop();

	push();
	translate(px,py,pz);
	rotateY(radians(90));
	translate(0,125,-250)
	normalMaterial(0,255,0);
	plane(500,250);
	pop();

	push();
	translate(px-500,py+250,pz);
	rotateX(radians(90));
	normalMaterial(0,255,0);
	plane(500,500);
	pop();

	//teapot
	push();
	scale(75);
	rotateY(-radians(cy));
	rotateY(radians(pr));
	specularMaterial(0,0,255);//teapot material
	model(teapot);
	pop();

	fill(255);
	textSize(25);
	text(px+",\n"+py+",\n"+pz,0,0);
}
