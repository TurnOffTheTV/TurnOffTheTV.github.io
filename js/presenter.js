var font;
var presenting = {
	name:false,
  bg:[
		0,
		0,
		0
	],
	elements:[]
};

function preload(){}

function setup(){
	createCanvas(windowWidth,windowHeight);
	background(255);
	cursor("none");
	title=document.getElementById("title");
	registerServiceWorker("../service-worker.js");
	listenMessage(
		function(incomingData){
    	presenting=incomingData.message;
  	}
	)
}

function mousePressed(){
	fullscreen(!fullscreen());
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}

function viewer(){
	for(var i = 0;i<presenting.elements.length;i++){
		push();
		if(height/1080<width/1920){translate((width-(1920*(height/1080)))/2,0);scale(height/1080);}
		if(height/1080>width/1920){translate(0,(height-(1080*(width/1920)))/2);scale(width/1920);}
		if(presenting.elements[i].type==="textbox"){
			stroke(presenting.elements[i].stroke[0],presenting.elements[i].stroke[1],presenting.elements[i].stroke[2]);
			strokeWeight(presenting.elements[i].strokeWeight);
			fill(presenting.elements[i].fill[0],presenting.elements[i].fill[1],presenting.elements[i].fill[2]);
			textAlign(presenting.elements[i].align[0],presenting.elements[i].align[1]);
			textSize(presenting.elements[i].size);
			text(presenting.elements[i].content,presenting.elements[i].x,presenting.elements[i].y,presenting.elements[i].w,presenting.elements[i].h);
		}
		if(presenting.elements[i].type==="rect"){
			stroke(presenting.elements[i].stroke[0],presenting.elements[i].stroke[1],presenting.elements[i].stroke[2]);
			strokeWeight(presenting.elements[i].strokeWeight);
			fill(presenting.elements[i].fill[0],presenting.elements[i].fill[1],presenting.elements[i].fill[2]);
			rectMode(presenting.elements[i].align);
			rect(presenting.elements[i].x,presenting.elements[i].y,presenting.elements[i].w,presenting.elements[i].h);
		}
		if(presenting.elements[i].type==="ellipse"){
			stroke(presenting.elements[i].stroke[0],presenting.elements[i].stroke[1],presenting.elements[i].stroke[2]);
			strokeWeight(presenting.elements[i].strokeWeight);
			fill(presenting.elements[i].fill[0],presenting.elements[i].fill[1],presenting.elements[i].fill[2]);
			ellipseMode(presenting.elements[i].align);
			ellipse(presenting.elements[i].x,presenting.elements[i].y,presenting.elements[i].w,presenting.elements[i].h);
		}
		pop();
	}
}

var keyPressed =function(){
	if(keyCode===32 || keyCode===39){
		sendMessage({move:1});}
	if(keyCode===37){
		sendMessage({move:-1});
	}
}

function draw(){
	background(255);
	background(presenting.bg[0],presenting.bg[1],presenting.bg[2]);
	viewer();
	/*fill(255);
	text(height-(width/1920)*1080+","+height,100,100);*/
	if(title.innerText!==presenting.name){title.innerText="JSON Presentations presenting "+presenting.name;}
	if(presenting.name===false){title.innerText="JSON Presentations presenter";}
}
