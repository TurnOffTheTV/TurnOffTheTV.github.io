var tahoma;
var highway_gothic;
var file;
var fileSave;
var drawing = {
	name:false,
	type:"drawing",
	layers:[
		{
			name:"wtf am i",
			type:"layer",
			elements:[
				{type:"line",x1:0,y1:0,x2:100,y2:100,fill:[0,0,255],weight:5}
			]
		}
	]
};
var scene = 0;
var titleTimeout = 100;
var init = true;
var layer = 0;
var customTool = function(){};
var drawPipe = [function(){for(var l = 0;l<drawing.layers.length;l++){
	for(var e = 0;e<drawing.layers[l].elements.length;e++){
		if(drawing.layers[l].elements[e].type==="point"){
			strokeWeight(drawing.layers[l].elements[e].weight);
			stroke(drawing.layers[l].elements[e].fill[0],drawing.layers[l].elements[e].fill[1],drawing.layers[l].elements[e].fill[2]);
			point(drawing.layers[l].elements[e].x,drawing.layers[l].elements[e].y);
		}
		if(drawing.layers[l].elements[e].type==="line"){
			strokeWeight(drawing.layers[l].elements[e].weight);
			stroke(drawing.layers[l].elements[e].fill[0],drawing.layers[l].elements[e].fill[1],drawing.layers[l].elements[e].fill[2]);
			line(drawing.layers[l].elements[e].x1,drawing.layers[l].elements[e].y1,drawing.layers[l].elements[e].x2,drawing.layers[l].elements[e].y2);
		}
		if(drawing.layers[l].elements[e].type==="image"){
			drawing.layers[l].elements[e].image.position(drawing.layers[l].elements[e].x,drawing.layers[l].elements[e].y);
		}
	}
}},function(){}];

function preload(){
	tahoma=loadFont("https://turnoffthetv.github.io/fonts/tahoma.ttf");
	highway_gothic=loadFont("https://turnoffthetv.github.io/fonts/highway.ttf");
}

function setup(){
	createCanvas(windowWidth,windowHeight);
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(scene===1){
		file.position(width/2-100,height/2);
		button.position(width/2-50,height/2+75);
	}
}

function saveJson(root){
	saveJSON(root, root.name+" ("+root.type+").json");
}

function draw(){
	cursor(ARROW);
		background(255);
		fill(0);
	//logo
	if(scene===0){
		textSize(width/10);
		textAlign(CENTER,CENTER);
		textFont(highway_gothic);
		text("JSON Drawings",width/2,height/2);
		textFont(tahoma);
		textSize(25);
		fill(0,0,255);
		text("By TurnOffTheTV",width/2,height/2+width/15);
		fill(0)
		text("Now Loading...",width/2,height/2+width/15+30);
		titleTimeout-=1;
		if(titleTimeout<0){scene=1;}
	}
	//upload
	if(scene===1){
		if(init){
			titleTimeout=255;
			file = createFileInput(function(fileIn){
				if(scene===1 && fileIn.data.type!=="drawing" || fileIn.type!=="application"){alert("That is not a drawing, silly, I've foolproofed this system! Try again with a different .json file.");console.log(fileIn.type);}
				if(fileIn.data.type==="drawing"){scene=2;init=true;drawing=fileIn.data;}
});
			file.position(width/2-100,height/2);
			init=false;
			button = createButton("Create New");
			button.position(width/2-50,height/2+75);
			button.mousePressed(function(){scene=3;init=true;});
		}
		fill(0);
		textSize(25);
		textAlign(LEFT,TOP);
		textFont(highway_gothic);
		text("JSON Drawings",0,0);
		textFont(tahoma);
		textAlign(CENTER,CENTER);
		text("Load a drawing",width/2,height/3);
		text("or create a new one",width/2,height/2+50);
		//fakeish titlescreen to fade out
		fill(255,255,255,titleTimeout);
		rectMode(CORNER);
		rect(0,0,width,height);
		fill(0,0,0,titleTimeout);
		textSize(width/10);
		textAlign(CENTER,CENTER);
		textFont(highway_gothic);
		text("JSON Drawings",width/2,height/2);
		textFont(tahoma);
		textSize(25);
		fill(0,0,255,titleTimeout);
		text("By TurnOffTheTV",width/2,height/2+width/15);
		fill(0,0,0,titleTimeout);
		titleTimeout-=10;
		text("Now Loading...",width/2,height/2+width/15+30);
	}
	//editor
	if(scene===2){
		if(init){
			removeElements();
			init=false;
		}
		for(var i = 0;i<drawPipe.length;i++){

		}
		if(keyIsDown(32)){scene=4;init=true;}//I will never tell anyone this is here and they will use only the pen tool! *Meniachal laughter*
		window.onbeforeunload = function() {
  		return "always read the code";
		}
	}

	//new drawing name entry
	if(scene===3){
		if(init){
			removeElements();
			file = createInput("");
			file.position(width/2-75,height/2+25);
			button = createButton("OK");
			button.position(width/2-20,height/2-25);
			button.mousePressed(function(){drawing.name=file.value();
			scene=2;
			init=true;});
			init=false;
		}
		fill(0);
		textSize(25);
		textAlign(LEFT,TOP);
		textFont(highway_gothic);
		text("JSON Drawings",0,0);
		textFont(tahoma);
		textAlign(CENTER,CENTER);
		text("Enter a name for this drawing (you can change it later).",width/2,height/2-50);
	}

	//tool selector (why is this after the name entry?)
	if(scene===4){
		if(init){
			removeElements();
			file = createFileInput(function(fileIn){
				if(fileIn.type==="image"){drawing.layers[layer].elements.push({type:"image",image:createImg(fileIn.data,""),x:0,y:0});scene=2;init=true;}
				if(fileIn.type==="application" && fileIn.data.type==="tool"){scene=2;init=true;fileIn.data.init();customTool=fileIn.data.run;drawPipe.push(fileIn.data.draw);}//Yes, you can make custom tools. A secret one is downloadable when you use 🐸drawings on my discord bot
			});
			file.position(width/2-75,height*2/3+75);
			init=false;
		}
		noStroke();
		fill(0);
		textSize(25);
		textAlign(LEFT,TOP);
		textFont(highway_gothic);
		text("JSON Drawings",0,0);
		textFont(tahoma);
		textAlign(CENTER,CENTER);
		text("Select a tool to use in the editor.",width/2,height/3-50);
		text("Upload an image or layer",width/2,height*2/3+25);
		text("Select the layer to edit.",width/7,height/3);
		window.onbeforeunload = function() {
  		return "json drawings is trash until you know its secrets";
		}
	}
}
