const channel = new BroadcastChannel("scores_and_checks");
var score = {
	left:0,
	right:0,
	leftName:"",
	rightName:"",
	bg_name:""
};
var bg;
var bgNow = 0;
var check;
var cross;
var correct;
var incorrect;
var displayTimeout = 0;
var display = true;

function preload(){
	check=loadImage("../../../images/check.png");
	cross=loadImage("../../../images/cross.png");
	correct = new Howl({src:["../../../audio/correct.mp3"]});
	incorrect = new Howl({src:["../../../audio/incorrect.mp3"]});
}

function setup(){
	createCanvas(windowWidth,windowHeight);
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}

mousePressed =function(){
	fullscreen(!fullscreen());
};

function draw(){
	if(fullscreen()){cursor("none");}else{cursor();}
	channel.onmessage = function(event){
		if(event.data.left!==undefined){
			score=event.data;
		}else if(event.data==="check"){
			displayTimeout=35;
			display=true;
			correct.play();
		}else if(event.data==="cross"){
			displayTimeout=35;
			display=false;
			incorrect.play();
		}else{
			console.log(event.data);
			//bg=createVideo(event.data,function(){bg.loop();bg.hide();bg.volume(0);bgNow="video";})
		}
	}
	if(bgNow===0){background(0);}else{image(bg);}
	noStroke();
	fill(255);
	rect(10,height-210,200,200,2);
	rect(width-210,height-210,200,200,2);
	rect(10,height-185,400,150,2);
	rect(width-410,height-185,400,150,2);
	fill(0,0,50);
	textAlign(CENTER,CENTER);
	textSize(150);
	text(score.left,110,height-110);
	text(score.right,width-110,height-110);
	textSize(40);
	text(score.leftName,310,height-110);
	text(score.rightName,width-310,height-110);
	imageMode(CENTER);
	if(displayTimeout>0){
		displayTimeout-=1;
		if(display){image(check,width/2,height/2);}else{image(cross,width/2,height/2);}
	}
}
