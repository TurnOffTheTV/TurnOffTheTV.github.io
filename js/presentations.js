var params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;
var isDark = true;
var presenter = {
	value:0,
	window:0
};
var presenterButton;
var tahoma;
var highway_gothic;
var file;
var fileSave;
var script = {
	name:false,
	groups:[
		{
			name:"[blank]",
			type:"group",
			slides:[
				{
					name:"slide 1",
					type:"slide",
					background:[0,0,0],
					elements:[]
				}
			]
		}
	]
};
var scene = 0;
var titleTimeout = 100;
var init = true;
var settings;
var group = 0;
var slide = 0;
var button;
var scroll = 0;
var x = 0;
var y = 0;
var egroup = 0;
var eslide = 0;
var click = false;
var doubleClick = false;

function preload(){
	tahoma=loadFont("https://turnoffthetv.github.io/fonts/tahoma.ttf");
	highway_gothic=loadFont("https://turnoffthetv.github.io/fonts/highway.ttf");
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	registerServiceWorker("service-worker.js");
	listenMessage(
		function(incomingData){
			if(incomingData.message.move===1){
				if(slide===script.groups[script.groups.length-1].slides.length-1 && group===script.groups.length-1){}else{
					if(script.groups[group].slides.length-1===slide){group++;slide=0;}else{slide++;}updatePresenter();}
				}
			else if(incomingData.message.move===-1){
				if(slide>0){slide--;}
				else if(group!==0){group--;slide=script.groups[group].slides.length-1;}
				updatePresenter();
			}else{
				alert("Please close all other tabs like this one, otherwise the presenter may malfunction.");
			}
  	}
	)
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	presenterButton.position(width-100, height-40);
	if(scene===1){
		file.position(width/2-100,height/2);
		button.position(width/2-50,height/2+75);
	}
	if(scene===3){
		file.position(width/2-75,height/2+25);
		button.position(width/2-20,height/2-25);
	}
}

function updatePresenter(){
	sendMessage(
		{
			name:script.name,
			bg:script.groups[group].slides[slide].background,
			elements:script.groups[group].slides[slide].elements
		}
	);
}

function openPresenter(){
	presenter = window.open("presenter/","JSON Presentations Presenter",params);
	updatePresenter();
}

function openSettings(){
	settings = window.open("settings/","JSON Presentations Settings",params);
}

function handleFile(fileIn){
	if(fileIn.data.type==="script"){
		if(fileIn.data!==script && scene>1){
			if(confirm("Do you want to overwrite the current script?")){script=fileIn;}
		}
		if(scene===1){scene=2;init=true;script=fileIn.data;}
	}
	if(fileIn.data.type==="group"){
		script.groups.push(fileIn.data);
		console.log("Added group "+fileIn.data.name)
	}
	if(fileIn.data.type==="slide"){

	}
	if(fileIn.type==="image"){}

	if(scene===1 && fileIn.data.type!=="script" || fileIn.type!=="application"){alert("That is not a script, silly, I've foolproofed this system! Try again with a different .json file.");console.log(fileIn.type);}
}

function saveJson(root){
	saveJSON(root, root.name+" ("+root.type+").json");
}

function mouseMoved(){
	updatePresenter();
}

var keyPressed =function(){
	if(keyCode===32 || keyCode===39){
		if(slide===script.groups[script.groups.length-1].slides.length-1 && group===script.groups.length-1){}else{
			if(script.groups[group].slides.length-1===slide){group++;slide=0;}else{slide++;}updatePresenter();}
		}
	if(keyCode===37){
		if(slide>0){slide--;}
		else if(group!==0){group--;slide=script.groups[group].slides.length-1;}
		updatePresenter();
	}
}

function mouseWheel(scrollEvent){
	scroll += scrollEvent.delta;
}

function viewer(x,y,w,g,s){
	for(var i = 0;i<script.groups[g].slides[s].elements.length;i++){
		push();
		translate(x,y);
		scale(w/1920);
		fill(script.groups[g].slides[s].background[0],script.groups[g].slides[s].background[1],script.groups[g].slides[s].background[2]);
		rect(0,0,1920,1080);
		if(script.groups[g].slides[s].elements[i].type==="textbox"){
			strokeWeight(script.groups[g].slides[s].elements[i].strokeWeight);
			stroke(script.groups[g].slides[s].elements[i].stroke[0],script.groups[g].slides[s].elements[i].stroke[1],script.groups[g].slides[s].elements[i].stroke[2],script.groups[g].slides[s].elements[i].stroke[3]);
			fill(script.groups[g].slides[s].elements[i].fill[0],script.groups[g].slides[s].elements[i].fill[1],script.groups[g].slides[s].elements[i].fill[2]);
			textAlign(script.groups[g].slides[s].elements[i].align[0],script.groups[g].slides[s].elements[i].align[1]);
			textSize(script.groups[g].slides[s].elements[i].size);
			text(script.groups[g].slides[s].elements[i].content,script.groups[g].slides[s].elements[i].x,script.groups[g].slides[s].elements[i].y,script.groups[g].slides[s].elements[i].w,script.groups[g].slides[s].elements[i].h);
		}
		if(script.groups[g].slides[s].elements[i].type==="rect"){
			stroke(script.groups[g].slides[s].elements[i].stroke[0],script.groups[g].slides[s].elements[i].stroke[1],script.groups[g].slides[s].elements[i].stroke[2],script.groups[g].slides[s].elements[i].stroke[3]);
			fill(script.groups[g].slides[s].elements[i].fill[0],script.groups[g].slides[s].elements[i].fill[1],script.groups[g].slides[s].elements[i].fill[2],script.groups[g].slides[s].elements[i].fill[3]);
			rectMode(script.groups[g].slides[s].elements[i].align);
			rect(script.groups[g].slides[s].elements[i].x,script.groups[g].slides[s].elements[i].y,script.groups[g].slides[s].elements[i].w,script.groups[g].slides[s].elements[i].h);
		}
		if(script.groups[g].slides[s].elements[i].type==="ellipse"){
			stroke(script.groups[g].slides[s].elements[i].stroke[0],script.groups[g].slides[s].elements[i].stroke[1],script.groups[g].slides[s].elements[i].stroke[2],script.groups[g].slides[s].elements[i].stroke[3]);
			fill(script.groups[g].slides[s].elements[i].fill[0],script.groups[g].slides[s].elements[i].fill[1],script.groups[g].slides[s].elements[i].fill[2],script.groups[g].slides[s].elements[i].fill[3]);
			ellipseMode(script.groups[g].slides[s].elements[i].align);
			ellipse(script.groups[g].slides[s].elements[i].x,script.groups[g].slides[s].elements[i].y,script.groups[g].slides[s].elements[i].w,script.groups[g].slides[s].elements[i].h);
		}
		pop();
	}
}

/*if(fileIn.data.type==="group"){
	script.groups.push(fileIn.data);
	console.log("Added group "+fileIn.data.name)
}*/

function draw(){
	click=false;
	doubleClick=false;
	function mousePressed(){click=true;}
	function doubleClicked(){doubleClick=true;}
	cursor(ARROW);
	if(scroll>0){scroll=0;}
		background(40,40,50);
		fill(255);
	//logo
	if(scene===0){
		textSize(width/10);
		textAlign(CENTER,CENTER);
		textFont(highway_gothic);
		text("JSON Presentations",width/2,height/2);
		textFont(tahoma);
		textSize(25);
		fill(0,0,255);
		text("By TurnOffTheTV",width/2,height/2+width/15);
		if(isDark){fill(255)}else{fill(0)}
		text("Now Loading...",width/2,height/2+width/15+30);
		titleTimeout-=1;
		if(titleTimeout<0){scene=1;}
	}
	//upload
	if(scene===1){
		if(init){
			titleTimeout=255;
			file = createFileInput(function(fileIn){
	if(scene===1 && fileIn.data.type!=="script" || fileIn.type!=="application"){alert("That is not a script, silly, I've foolproofed this system! Try again with a different .json file.");console.log(fileIn.type);}
	if(fileIn.data.type==="script"){scene=2;init=true;script=fileIn.data;}
});
			file.position(width/2-100,height/2);
			presenterButton = createButton("Open Presenter");
			presenterButton.position(width-100, height-40);
			presenterButton.mousePressed(openPresenter);
			presenterButton.size(100);
			init=false;
			button = createButton("Create New");
			button.position(width/2-50,height/2+75);
			button.mousePressed(function(){scene=3;
			init=true;});
		}
		if(isDark){fill(255);}else{fill(0);}
		textSize(25);
		textAlign(LEFT,TOP);
		textFont(highway_gothic);
		text("JSON Presentations | Settings",0,0);
		if(mouseX>textWidth("JSON Presentations | ") && mouseX<textWidth("JSON Presentations | Settings") && mouseY<25){cursor(HAND);}
		textFont(tahoma);
		textAlign(CENTER,CENTER);
		text("Load a script",width/2,height/3);
		text("or create a new one",width/2,height/2+50);
		//fakeish titlescreen to fade out
		if(isDark){fill(40,40,50,titleTimeout);}else{fill(195,195,205,titleTimeout);}
		rectMode(CORNER);
		rect(0,0,width,height);
		if(isDark){fill(255,255,255,titleTimeout);}else{fill(0,0,0,titleTimeout);}
		textSize(width/10);
		textAlign(CENTER,CENTER);
		textFont(highway_gothic);
		text("JSON Presentations",width/2,height/2);
		textFont(tahoma);
		textSize(25);
		fill(0,0,255,titleTimeout);
		text("By TurnOffTheTV",width/2,height/2+width/15);
		if(isDark){fill(255,255,255,titleTimeout)}else{fill(0,0,0,titleTimeout)}
		titleTimeout-=10;
		text("Now Loading...",width/2,height/2+width/15+30);
	}
	//presenting slides view
	if(scene===2){
		if(init){
			removeElements();
			presenterButton = createButton("Open Presenter");
			presenterButton.position(width-100, height-40);
			presenterButton.mousePressed(openPresenter);
			presenterButton.size(100);
			init=false;
		}
		y=30;
		x=10;
		for(var i = 0;i<script.groups.length;i++){
			fill(255);
			textAlign(LEFT,TOP);
			textSize(25);
			text(script.groups[i].name,10,scroll+y);
			y+=45;
			for(var j = 0;j<script.groups[i].slides.length;j++){
				if(group===i && slide===j){stroke(0,0,255);}else{noStroke();}
				strokeWeight(5);
				rect(x,y+scroll,200,112.5);
				noStroke();
				fill(255);
				textSize(10);
				text(script.groups[i].slides[j].name,x,y-15+scroll);
				viewer(x,y+scroll,200,i,j);
				if(mouseX>x && mouseY>y+scroll && mouseX<x+200 && mouseY<y+112.5+scroll){cursor(HAND);
					function doubleClicked(){
						scene=4;
						egroup=i;
						eslide=j;
						alert(i+", "+j);
					}
				}
				x+=210;
				if(x+200>width-10){
					x=10;
					y+=140;
				}
			}
			y+=150;
			x=10;
		}
		fill(0,0,0,50);
		rect(10,y+scroll,200,112.5);
		stroke(255);
		line(110,y+scroll+25,110,y+scroll+112.5-25);
		line(68.75,y+scroll+112.5/2,146.25,y+scroll+112.5/2);
		if(mouseX>10 && mouseY>y+scroll && mouseX<210 && mouseY<y+112.5+scroll){}
		noStroke();
		fill(40,40,50);
		rect(0,0,width,30);
		fill(255);
		textSize(25);
		textAlign(LEFT,TOP);
		textFont(highway_gothic);
		text("JSON Presentations | Settings",0,0);
		if(mouseX>textWidth("JSON Presentations | ") && mouseX<textWidth("JSON Presentations | Settings") && mouseY<25){cursor(HAND);}
		textFont(tahoma);
		textAlign(CENTER,CENTER);
		window.onbeforeunload = function() {
  		return "the broken product";
		}
	}

	//new script name entry
	if(scene===3){
		if(init){
			removeElements();
			file = createInput("");
			file.position(width/2-75,height/2+25);
			button = createButton("OK");
			button.position(width/2-20,height/2-25);
			button.mousePressed(function(){script.name=file.value();
			scene=2;
			init=true;});
			init=false;
		}
		if(isDark){fill(255);}else{fill(0);}
		textSize(25);
		textAlign(LEFT,TOP);
		textFont(highway_gothic);
		text("JSON Presentations | Settings",0,0);
		if(mouseX>textWidth("JSON Presentations | ") && mouseX<textWidth("JSON Presentations | Settings") && mouseY<25){cursor(HAND);if(click){openSettings();}}
		textFont(tahoma);
		textAlign(CENTER,CENTER);
		text("Enter a name for this script (you can change it later).",width/2,height/2-50);
	}
	if(scene===4){
		if(init){
			removeElements();
			file = createFileInput(function(fileIn){
				if(fileIn.data.type==="slide"){
					script.groups[egroup].slides[eslide]=fileIn.data;
					scene=2;
					init=true;
				}
				if(fileIn.type==="image"){}
			});
			file.position(width/2,height/2);
			init=false;
		}
		if(isDark){fill(255);}else{fill(0);}
		textSize(25);
		textAlign(LEFT,TOP);
		textFont(highway_gothic);
		text("JSON Presentations | Settings",0,0);
		if(mouseX>textWidth("JSON Presentations | ") && mouseX<textWidth("JSON Presentations | Settings") && mouseY<25){cursor(HAND);if(click){window.open("127.0.0.1:8887/programs/json-presentations/settings/", params);}}
	}
	/*stroke(0);
	strokeWeight(10);
	point(width/2,height/2);
	noStroke();*/
}
