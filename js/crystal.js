var sheet;
var spirit = {ghoul:0,ghost:0,gheist:0};
var sounds;
var paths = [];
var objects = [{type:"lever",x:0,y:0,switched:false,id:"001"}];//see objects.txt for values
var enemies = [{x:128,y:256,type:"hulk",health:3,randomX:0,randomY:0,randomTime:0,dead:false,collected:false}];
var npcs = [{x:0,y:64,state:"!",spritex:26,spritey:1,message:"Hello!"}];
var view = 0;//0=normal, 1=inside 1, 2=inside 2, 3=inside 3, 4=inside 4
var items = [
	{x:128,y:128,visible:true,collected:false,type:"crystal-red",number:0},
	{x:128+64,y:128,visible:true,collected:false,type:"crystal-yellow",number:0},
	{x:128+64*2,y:128,visible:true,collected:false,type:"crystal-blue",number:0}
];
var armor = {
	helmet:{
		name:"Nothing",
		level:1
	},
	armor:{
		name:"Nothing",
		level:5
	},
	weapon:{
		name:"Hands",
		level:2
	},
	runes: [/*{
		name:"Nothing",
		type:1//0=nothing,1=Minecraft thorns enchantment, 2=speed, 3=1.5x attack, 4=2x attack
	},{
		name:"Nothing",
		type:2
	},{
		name:"Nothing",
		type:3
	}*/]
};
var attacking = false;
var attack = true;
var velocity = {
	ns:0,
	ew:0
};
var attackCooldown = 0;
var px = 0;
var py = 0;
function onAttack(){}
var isDark;
var canvas;
var health = 4;
var controlMode = 0;//0 is keyboard, 1 is touch, 2 is gamepad. Sort of like another game...
var mouseDisplayTimeout=25;
var stage = 0;//0 is overworld, 1 is inventory, 2 is Village of Mitochondria
var cursorSelecting = true;
var font = 0;
var coins = 0;
var touchX = 0;
var touchY = 0;
var touching = false;

function preload(){
	sheet=loadImage("https://turnoffthetv.github.io/images/crystal-tilesheet.png");
	spirit.ghoul=loadImage("https://turnoffthetv.github.io/images/crystal-ghoul.png");
	spirit.ghost=loadImage("https://turnoffthetv.github.io/images/crystal-ghost.png");
	spirit.gheist=loadImage("https://turnoffthetv.github.io/images/crystal-gheist.png");
	font=loadFont("https://turnoffthetv.github.io/fonts/crystal.ttf");
	sounds = {
		hit1:loadSound("https://turnoffthetv.github.io/audio/Crystal-sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit1.wav"),
		hit2:loadSound("https://turnoffthetv.github.io/audio/Crystal-sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit2.wav"),
		hit3:loadSound("https://turnoffthetv.github.io/audio/Crystal-sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit3.wav"),
		hit4:loadSound("https://turnoffthetv.github.io/audio/Crystal-sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit4.wav"),
		hit5:loadSound("https://turnoffthetv.github.io/audio/Crystal-sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit5.wav"),
		hit6:loadSound("https://turnoffthetv.github.io/audio/Crystal-sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit6.wav"),
		hit7:loadSound("https://turnoffthetv.github.io/audio/Crystal-sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit7.wav"),
		hit8:loadSound("https://turnoffthetv.github.io/audio/Crystal-sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit8.wav"),
		hit9:loadSound("https://turnoffthetv.github.io/audio/Crystal-sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit9.wav"),
		hit10:loadSound("https://turnoffthetv.github.io/audio/Crystal-sounds/General Sounds/Simple Damage Sounds/sfx_damage_hit10.wav"),
		hulk: {
			hit:loadSound("https://turnoffthetv.github.io/audio/Crystal-sounds/General Sounds/Negative Sounds/sfx_sounds_damage2.wav"),
			kill:loadSound("https://turnoffthetv.github.io/audio/Crystal-sounds/General Sounds/Coins/sfx_coin_cluster3.wav")
		},
		crystalGet: loadSound("https://turnoffthetv.github.io/audio/Crystal-sounds/General Sounds/Positive Sounds/sfx_sounds_powerup9.wav")
	};
}

function setup(){
	textFont(font);
	canvas = createCanvas(windowWidth,windowHeight);
	px=getItem("px");
	py=getItem("py");
	armor.helmet.name=getItem("helmet-name");
	armor.helmet.level=getItem("helmet-level");
	armor.armor.name=getItem("armor-name");
	armor.armor.level=getItem("armor-level");
	armor.weapon.name=getItem("weapon-name");
	armor.weapon.level=getItem("weapon-level");
	armor.runes=getItem("runes");
}

//sprite(sprite count from left, sprite count from top,x(no px),y (no py));
function sprite(inX,inY,x,y){
	copy(sheet,inX*80,inY*80,80,80,x,y,64,64);
}

function crystalGet(num){
	sounds.crystalGet.play();
	health=4;
}

//player sprite and logic
function player(){
	velocity.ns=0;
	velocity.ew=0;
	if(controlMode===0){
		if(keyIsDown(87)){velocity.ns=-1;}
		if(keyIsDown(83)){velocity.ns=1;}
		if(keyIsDown(65)){velocity.ew=-1;}
		if(keyIsDown(68)){velocity.ew=1;}

		if(keyIsDown(87) && keyIsDown(83)){velocity.ns=0;}
		if(keyIsDown(65) && keyIsDown(68)){velocity.ew=0;}

		if(keyIsDown(32)){attacking=true;} else {attacking=false;attack=true;}

		if(attack && attacking){attack=false;onAttack();}

		if(keyIsDown(69)){stage=1;}
	}
	if(controlMode===1){
		attacking=false;
		for(var i = 0;i<touches.length;i++){
			if(touches[i].x>width/2){attacking=true;}
			if(touches[i].x<width/2){
				if(touching===false){touchX=touches[i].x;touchY=touches[i].y;touching=true;}
				velocity.ew=touchX-touches[i].x;
				velocity.ns=touchY-touches[i].y;
			}
		}
	}
	if(controlMode===2){
		velocity.ns=p1.stick.ly;
		velocity.ew=p1.stick.lx;

		if(p1.button.cross){attacking=true;}
		if(p1.button.cross===false){attacking=false;attack=true;}

		if(attack && attacking){attack=false;onAttack();}

		if(p1.button.square){stage=1;}
	}

	if(velocity.ew>1){velocity.ew=1;}
	if(velocity.ew<-1){velocity.ew=-1;}

	if(velocity.ns>1){velocity.ns=1;}
	if(velocity.ns<-1){velocity.ns=-1;}

	if(!attacking){
		for(var i = 0;i<armor.runes.length;i++){
		if(armor.runes[i].type!==2){px-=velocity.ew*3;
			py-=velocity.ns*3;
		}
		if(armor.runes[i].type===2){px-=velocity.ew*6;
			py-=velocity.ns*6;}
		}
	}

	if(armor.helmet.level===0 && armor.weapon.level===0){sprite(25,0,width/2-32,height/2-32);}
	if(armor.helmet.level===0 && armor.weapon.level===1){sprite(26,0,width/2-32,height/2-32);}
	if(armor.helmet.level===0 && armor.weapon.level===2){sprite(27,0,width/2-32,height/2-32);}
	if(armor.helmet.level===1 && armor.weapon.level===1){sprite(28,0,width/2-32,height/2-32);}
	if(armor.helmet.level===1 && armor.weapon.level===2){sprite(29,0,width/2-32,height/2-32);}
	if(armor.helmet.level===1 && armor.weapon.level===0){sprite(30,0,width/2-32,height/2-32);}
}

//draws trees, paths, people, crystals, food, etc
function assets(){
	//see ai.txt for docs on how ai works
	for(var i = 0; i < enemies.length; i++){
		/*if(enemies[i].type==="zombie" && enemies[i].dead===false){
			if(enemies[i].new){enemies[i].team=floor(radom(0,27))}
			sprite(24,3,enemies[i].x+px,enemies[i].y+py);
			if(enemies[i].team===0){

			}
		}*/

		if(enemies[i].type==="hulk" && enemies[i].dead===false){
			sprite(30,6,enemies[i].x+px,enemies[i].y+py);
			if(width/2>px+enemies[i].x-256 && height/2>py+enemies[i].y-256 && width/2<px+enemies[i].x+256 && height/2<py+enemies[i].y+256){
				if((width/2)-32-px>enemies[i].x){enemies[i].x+=1.5;}
				if((width/2)-32-px<enemies[i].x){enemies[i].x-=1.5;}
				if((height/2)-32-py>enemies[i].y){enemies[i].y+=1.5;}
				if((height/2)-32-py<enemies[i].y){enemies[i].y-=1.5;}
				if((height/2)-32-py<enemies[i].y){enemies[i].y-=1.5;}
			} else {
				enemies[i].randomTime-=1;
				enemies[i].x+=enemies[i].randomX;
				enemies[i].y+=enemies[i].randomY;
				if(enemies[i].randomTime<0){enemies[i].randomTime=random(0,50);enemies[i].randomX=random(-1.5,1.5);enemies[i].randomY=random(-1.5,1.5);}

			}

			if(width/2>px+enemies[i].x-16 && height/2>py+enemies[i].y-16 && width/2<px+enemies[i].x+80 && height/2<py+enemies[i].y+80 && floor(random(0,(5*(armor.armor.level+1))+1))===0){
				health-=1;
				for(var j = 0;j<armor.runes.length;j++){
					if(armor.runes[j].type===1){enemies[i].health-=0.5;sounds.hulk.hit.play();}
				}
				sounds.random=floor(random(0,10));
				if(sounds.random===0){sounds.hit1.play();}
				if(sounds.random===1){sounds.hit2.play();}
				if(sounds.random===2){sounds.hit3.play();}
				if(sounds.random===3){sounds.hit4.play();}
				if(sounds.random===4){sounds.hit5.play();}
				if(sounds.random===5){sounds.hit6.play();}
				if(sounds.random===6){sounds.hit7.play();}
				if(sounds.random===7){sounds.hit8.play();}
				if(sounds.random===8){sounds.hit1.play();}
				if(sounds.random===9){sounds.hit10.play();}
			}

			if(width/2>px+enemies[i].x-16 && height/2>py+enemies[i].y-16 && width/2<px+enemies[i].x+80 && height/2<py+enemies[i].y+80 && attacking && floor(random(0,6))===0){enemies[i].health-=armor.weapon.level;sounds.hulk.hit.play();}

			if(enemies[i].collected && enemies[i].dead===false){coins+=2;enemies[i].dead=true;sounds.hulk.kill.play();}

			if(enemies[i].health<0){enemies[i].collected=true;}

		}

		if(enemies[i].type==="ghoul" && enemies[i].dead===false){
			tint(255,0,0,enemies[i].alpha);
			image(spirit.ghoul,enemies[i].x+px,enemies[i].y+py,64,64);
			enemies[i].alpha=255;
		}

		if(enemies[i].type==="ghost" && enemies[i].dead===false){
			tint(128,128,255,enemies[i].alpha);
			image(spirit.ghost,enemies[i].x+px,enemies[i].y+py,64,64);
			enemies[i].alpha=(mouseX/width)*255;
		}

		if(enemies[i].type==="gheist" && enemies[i].dead===false){
			tint(0,255,0,enemies[i].alpha);
			image(spirit.gheist,enemies[i].x+px,enemies[i].y+py,64,64);
			enemies[i].alpha=(mouseX/width)*255;
		}
	}

	for(var i = 0; i < npcs.length; i++){
		sprite(npcs[i].spritex,npcs[i].spritey,npcs[i].x+px,npcs[i].y+py);
		if(npcs[i].state==="!"){sprite(36,13,npcs[i].x+px,npcs[i].y-64+py);}
		//if(npcs[i].state==="?"){sprite(38,13,npcs[i].x+px,npcs[i].y-64+py);}
	}

	for(var i = 0; i < items.length; i++){
		if(items[i].type==="crystal-red"){
			if(items[i].visible){sprite(34,10,items[i].x+px,items[i].y+py);}
			if(width/2>items[i].x+px && height/2>items[i].y+py && width/2<items[i].x+64+px && height/2<items[i].y+64+py){items[i].collected=true;}
			if(items[i].collected && items[i].visible){items[i].visible=false;crystalGet(items[i].number);}
		}
		if(items[i].type==="crystal-yellow"){
			if(items[i].visible){sprite(32,10,items[i].x+px,items[i].y+py);}
			if(width/2>items[i].x+px && height/2>items[i].y+py && width/2<items[i].x+64+px && height/2<items[i].y+64+py){items[i].collected=true;}
			if(items[i].collected && items[i].visible){items[i].visible=false;crystalGet(items[i].number);}
		}
		if(items[i].type==="crystal-blue"){
			if(items[i].visible){sprite(33,10,items[i].x+px,items[i].y+py);}
			if(width/2>items[i].x+px && height/2>items[i].y+py && width/2<items[i].x+64+px && height/2<items[i].y+64+py){items[i].collected=true;}
			if(items[i].collected && items[i].visible){items[i].visible=false;crystalGet(items[i].number);}
		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}

function mousePressed(){
	fullscreen(!fullscreen());
}

function overworld(){
	background(0);
	function onAttack(){coins+=2;}
	push();
	translate(192+px,128+py);
	rotate(radians(90));
	sprite(8,1,0,0);
	pop();
	push();
	translate(256+px,128+py);
	rotate(radians(90));
	sprite(8,1,0,0);
	pop();
	push();
	translate(256+64+px,128+64+py);
	rotate(radians(180));
	sprite(9,1,0,0);
	pop();
	sprite(8,1,256+px,128-64+py);
	if(fullscreen()){
		assets();
		player();
		if(floor(random(0,50))===0){
			if(floor(random(0,2))===0){
				enemies.push({x:random(0-width/2,0),y:random(0-height+px/2,0+px),type:"hulk",health:3,randomX:0,randomY:0,randomTime:0,dead:false,collected:false});
			} else {
				enemies.push({x:random(width+px,width*1.5+px),y:random(height+px,height*1.5+px),type:"hulk",health:3,randomX:0,randomY:0,randomTime:0,dead:false,collected:false});
			}
		}
	}
}

function inventory(){
	background(0);
	textAlign(CENTER,TOP);
	if(controlMode===0){
		if(keyIsDown(81)){stage=0;}
		text("Press Q to quit",width/2,128+64);
	}
	if(controlMode===1){
		text("Tap here to quit",width/2,128+64);
	}
	if(controlMode===2){
		if(p1.button.circle){stage=0;}
		text("Press Button 2 to quit",width/2,128+64);
	}

	text("Inventory",width/2,128);
	if(armor.runes.length===0){
		text("You have no activated runes",width/3,height/2,64*5,64*6);
	}
}

function draw(){
	isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	cursor("none");
	if(stage===0){overworld();}
	if(stage===1){inventory();}
	if(round(health)===4){sprite(42,10,64,0);}
	if(round(health)===3){sprite(41,10,64,0);}
	if(round(health)>1){sprite(42,10,0,0);}
	if(round(health)===1){sprite(41,10,0,0);}
	if(health>4){health=4;}
	if(health<1){health=1;}
	if(health<1){health=1;}
	sprite(41,3,128+64,0);
	textAlign(LEFT,TOP);
	textSize(40);
	text(coins,128+2*64,10);

//fullscreen is needed
	if(!fullscreen()){
		if(isDark){background(0);fill(204, 198, 186);}else{background(255);fill(51,57,69);}
		textSize(30);
		textAlign(CENTER,CENTER);
		if(controlMode===0){text("PLEASE CLICK TO ENTER FULLSCREEN",width/2,height/2);}
		if(controlMode===1){text("PLEASE TAP TO ENTER FULLSCREEN",width/2,height/2);}
		if(controlMode===2){text("PLEASE PRESS BUTTON 0 TO ENTER FULLSCREEN",width/2,height/2);}
		if(p1.button.cross){fullscreen(true);}
		function touchEnded(){fullscreen(true);}
		sprite(46,17,width/2,height/2*3);}
	if(mouseX!==pmouseX || mouseY!==pmouseY){mouseDisplayTimeout=25;}
	if(mouseDisplayTimeout>0 && cursorSelecting===false){sprite(38,10,mouseX,mouseY);}
	if(mouseDisplayTimeout>0 && cursorSelecting){sprite(36,10,mouseX,mouseY);}
	mouseDisplayTimeout-=1;
	if(keyIsPressed || mouseX!==pmouseX || mouseY!==pmouseY){controlMode=0;}
	if(touches.length>0){controlMode=1;}
	if(p1.gamepadIsPressed){controlMode=2;}
	storeItem("px",px);
	storeItem("py",py);
	storeItem("helmet-name",armor.helmet.name);
	storeItem("helmet-level",armor.helmet.level);
	storeItem("armor-name",armor.armor.name);
	storeItem("armor-level",armor.armor.level);
	storeItem("weapon-name",armor.weapon.name);
	storeItem("weapon-level",armor.weapon.level);
	storeItem("runes",armor.runes);
	storeItem("enemies",enemies);
	if(p1.button.options){fullscreen(false);}
}
