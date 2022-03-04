var x = 0;
var y = 0;
var px;
var py;
var cx = 0;
var cy = 0;
var images;
var elements = [];
var anim = 0;
var animTime = 0;
var animCount = 0;
var jump = 5;
var fall = 0;
var dir = 1;
var onFloor = false;

function preload(){
	images={
		grass:loadImage("https://turnoffthetv.github.io/images/physics-test/grass.png"),
		flowers:loadImage("https://turnoffthetv.github.io/images/physics-test/flowers.png"),
		grass_l:loadImage("https://turnoffthetv.github.io/images/physics-test/grass-l.png"),
		flowers_l:loadImage("https://turnoffthetv.github.io/images/physics-test/flowers-l.png"),
		grass_r:loadImage("https://turnoffthetv.github.io/images/physics-test/grass-r.png"),
		flowers_r:loadImage("https://turnoffthetv.github.io/images/physics-test/flowers-r.png"),
		dirt_l:loadImage("https://turnoffthetv.github.io/images/physics-test/dirt-l.png"),
		dirt:loadImage("https://turnoffthetv.github.io/images/physics-test/dirt.png"),
		dirt_r:loadImage("https://turnoffthetv.github.io/images/physics-test/dirt-r.png"),
		dirt_lb:loadImage("https://turnoffthetv.github.io/images/physics-test/dirt-lb.png"),
		dirt_rb:loadImage("https://turnoffthetv.github.io/images/physics-test/dirt-rb.png"),
		dirt_stone:loadImage("https://turnoffthetv.github.io/images/physics-test/dirt-stone.png"),
		dirt_stone_l:loadImage("https://turnoffthetv.github.io/images/physics-test/dirt-stone-l.png"),
		dirt_stone_r:loadImage("https://turnoffthetv.github.io/images/physics-test/dirt-stone-r.png"),
		stone:loadImage("https://turnoffthetv.github.io/images/physics-test/stone.png"),
		stone_l:loadImage("https://turnoffthetv.github.io/images/physics-test/stone-l.png"),
		stone_r:loadImage("https://turnoffthetv.github.io/images/physics-test/stone-r.png"),
		stone_blue:loadImage("https://turnoffthetv.github.io/images/physics-test/stone-blue.png"),
		stone_red:loadImage("https://turnoffthetv.github.io/images/physics-test/stone-red.png"),
		house:{
			lb:loadImage("https://turnoffthetv.github.io/images/physics-test/house-lb.png"),
			rb:loadImage("https://turnoffthetv.github.io/images/physics-test/house-rb.png"),
			lm:loadImage("https://turnoffthetv.github.io/images/physics-test/house-lm.png"),
			rm:loadImage("https://turnoffthetv.github.io/images/physics-test/house-rm.png"),
			lt:loadImage("https://turnoffthetv.github.io/images/physics-test/house-lt.png"),
			rt:loadImage("https://turnoffthetv.github.io/images/physics-test/house-rt.png"),
			tt:loadImage("https://turnoffthetv.github.io/images/physics-test/house-tt.png"),
			m:loadImage("https://turnoffthetv.github.io/images/physics-test/house-m.png"),
			window:loadImage("https://turnoffthetv.github.io/images/physics-test/house-window.png"),
			roof:loadImage("https://turnoffthetv.github.io/images/physics-test/house-roof.png"),
			roof_small:loadImage("https://turnoffthetv.github.io/images/physics-test/house-roof-small.png"),
			roof_side:loadImage("https://turnoffthetv.github.io/images/physics-test/house-roof-side.png"),
			side:loadImage("https://turnoffthetv.github.io/images/physics-test/house-side.png"),
			side_bottom:loadImage("https://turnoffthetv.github.io/images/physics-test/house-side-bottom.png"),
		},
		player_idle:{
			a:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-00.png"),
			b:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-01.png"),
			c:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-02.png"),
			d:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-03.png"),
			e:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-04.png"),
			f:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-05.png"),
			g:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-06.png"),
			h:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-07.png"),
			i:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-08.png"),
			j:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-09.png"),
			k:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-10.png"),
			l:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-11.png"),
			m:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-12.png"),
			n:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-13.png"),
			o:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-14.png"),
			p:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-15.png"),
			q:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-16.png"),
			r:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/player-idle-17.png"),
			feet:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/idle-feet.png"),
			feet_raised:loadImage("https://turnoffthetv.github.io/images/physics-test/player-idle/idle-feet-raised.png"),
		},
		player_move:{
			a:loadImage("https://turnoffthetv.github.io/images/physics-test/player-move/player-move-0.png"),
			b:loadImage("https://turnoffthetv.github.io/images/physics-test/player-move/player-move-1.png"),
			c:loadImage("https://turnoffthetv.github.io/images/physics-test/player-move/player-move-2.png"),
			d:loadImage("https://turnoffthetv.github.io/images/physics-test/player-move/player-move-3.png"),
			e:loadImage("https://turnoffthetv.github.io/images/physics-test/player-move/player-move-4.png"),
			f:loadImage("https://turnoffthetv.github.io/images/physics-test/player-move/player-move-5.png"),
			g:loadImage("https://turnoffthetv.github.io/images/physics-test/player-move/player-move-6.png"),
			h:loadImage("https://turnoffthetv.github.io/images/physics-test/player-move/player-move-7.png"),
			b_feet:loadImage("https://turnoffthetv.github.io/images/physics-test/player-move/move-1-feet.png"),
			c_feet:loadImage("https://turnoffthetv.github.io/images/physics-test/player-move/move-2-feet.png"),
			f_feet:loadImage("https://turnoffthetv.github.io/images/physics-test/player-move/move-5-feet.png"),
			g_feet:loadImage("https://turnoffthetv.github.io/images/physics-test/player-move/move-6-feet.png"),
		},
		player_air:{
			a:loadImage("https://turnoffthetv.github.io/images/physics-test/player-air/player-air-0.png"),
			b:loadImage("https://turnoffthetv.github.io/images/physics-test/player-air/player-air-1.png"),
			c:loadImage("https://turnoffthetv.github.io/images/physics-test/player-air/player-air-2.png"),
			feet:loadImage("https://turnoffthetv.github.io/images/physics-test/player-air/air-1-feet.png"),
		}
	}
}

function setup(){
	frameRate(30);
	createCanvas(windowWidth,windowHeight);
}

function player(){
	push();
	translate(x,y);
	if(dir===0){
		scale(-1,1);
	}
	imageMode(CENTER);
	if(anim===0){
		animCount+=1;
		if(animCount>5){
			animTime++;
			animCount=0;
		}
		if(animTime>17){
			animTime=0;
		}

		if(animTime===0){image(images.player_idle.a,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===1){image(images.player_idle.b,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===2){image(images.player_idle.c,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===3){image(images.player_idle.d,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===4){image(images.player_idle.e,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===5){image(images.player_idle.f,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===6){image(images.player_idle.g,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===7){image(images.player_idle.h,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===8){image(images.player_idle.i,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===9){image(images.player_idle.j,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===10){image(images.player_idle.k,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===11){image(images.player_idle.l,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===12){image(images.player_idle.m,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===13){image(images.player_idle.n,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===14){image(images.player_idle.o,0,0);image(images.player_idle.feet_raised,0,64);}//
		if(animTime===15){image(images.player_idle.p,0,0);image(images.player_idle.feet_raised,0,64);}//
		if(animTime===16){image(images.player_idle.q,0,0);image(images.player_idle.feet_raised,0,64);}//
		if(animTime===17){image(images.player_idle.r,0,0);image(images.player_idle.feet,0,64);}
	}
	if(anim===1){
		animCount+=1;
		if(animCount>12){
			animTime++;
			animCount=0;
		}
		if(animTime>7){
			animTime=0;
		}

		if(animTime===0){image(images.player_move.a,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===1){image(images.player_move.b,0,0);image(images.player_move.b_feet,0,64);}
		if(animTime===2){image(images.player_move.c,0,0);image(images.player_move.c_feet,0,64);}
		if(animTime===3){image(images.player_move.d,0,0);image(images.player_move.b_feet,0,64);}
		if(animTime===4){image(images.player_move.e,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===5){image(images.player_move.f,0,0);image(images.player_move.f_feet,0,64);}
		if(animTime===6){image(images.player_move.g,0,0);image(images.player_move.g_feet,0,64);}
		if(animTime===7){image(images.player_move.h,0,0);image(images.player_move.f_feet,0,64);}
	}
	if(anim===2){
		animCount+=1;
		if(animCount>2){
			animTime++;
			animCount=0;
		}
		if(animTime>7){
			animTime=0;
		}

		if(animTime===0){image(images.player_move.a,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===1){image(images.player_move.b,0,0);image(images.player_move.b_feet,0,64);}
		if(animTime===2){image(images.player_move.c,0,0);image(images.player_move.c_feet,0,64);}
		if(animTime===3){image(images.player_move.d,0,0);image(images.player_move.b_feet,0,64);}
		if(animTime===4){image(images.player_move.e,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===5){image(images.player_move.f,0,0);image(images.player_move.f_feet,0,64);}
		if(animTime===6){image(images.player_move.g,0,0);image(images.player_move.g_feet,0,64);}
		if(animTime===7){image(images.player_move.h,0,0);image(images.player_move.f_feet,0,64);}
	}
	if(anim===3){
		animCount+=1;
		if(animCount>12 && animTime<2){
			animTime++;
			animCount=0;
		}
		if(animTime>2){
			animTime=0;
		}

		if(animTime===0){image(images.player_air.c,0,0);image(images.player_idle.feet,0,64);}
		if(animTime===1){image(images.player_air.b,0,0);image(images.player_air.feet,0,64);}
		if(animTime===2){image(images.player_air.a,0,0);}
	}
	if(anim===4){
		animCount+=1;
		if(animCount>12 && animTime<2){
			animTime++;
			animCount=0;
		}
		if(animTime>2){
			animTime=0;
		}

		if(animTime===0){image(images.player_air.a,0,0);}
		if(animTime===1){image(images.player_air.b,0,0);image(images.player_air.feet,0,64);}
		if(animTime===2){image(images.player_air.c,0,0);image(images.player_idle.feet,0,64);}
	}
	imageMode(CORNER);
	pop();
	if(keyIsDown(65)){x-=3;anim=2;dir=0;}else
	if(keyIsDown(68)){x+=3;anim=2;dir=1;}else
	if(keyIsDown(87) && onFloor){jump=7;onFloor=false;animTime=0;}
	if(!onFloor){fall+=0.2;}
	y-=jump;
	y+=fall;
	if(!onFloor && fall<jump){anim=3;}
	if(!onFloor && fall-jump>-0.05 && fall-jump<0.05){animTime=0;animCount=0;}
	if(!onFloor && fall>jump){anim=4;}
	if(px===x && py===y && onFloor){anim=0;}
}

function bottom(x1,y1,w){
	if(x>x1-5 && y>y1-5 && x<x1+w+5){
		if(y>y1){y=y1;onFloor=true;}else{onFloor=false;}
	}
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}

function draw(){
	background(200,200,255);
	image(images.dirt_l,cx,96+cy);
	image(images.dirt,64+cx,96+cy);
	image(images.dirt_r,128+cx,96+cy);
	image(images.dirt_l,cx,160+cy);
	image(images.dirt,64+cx,160+cy);
	image(images.dirt_rb,128+cx,160+cy);
	image(images.dirt_l,cx,192+cy);
	image(images.dirt,64+cx,192+cy);
	image(images.stone_blue,64+cx,704+cy);
	for(var i = 256;i<400;i+=64){
		image(images.dirt_l,cx,i+cy);
	}
	for(var i = 256;i<400;i+=64){
		image(images.dirt_l,cx,i+cy);
		image(images.dirt_r,312+cx,i+cy);
		for(var j = 64;j<312;j+=64){
			image(images.dirt,j+cx,i+cy);
		}
	}
	player();
	image(images.grass_l,cx,cy+32);
	image(images.grass,64+cx,cy+32);
	image(images.grass_r,128+cx,cy+32);
	image(images.flowers_l,cx,cy+32);
	image(images.flowers,64+cx,cy+32);
	image(images.flowers_r,128+cx,cy+32);
	image(images.grass_l,64+cx,192+cy);
	image(images.grass,128+cx,192+cy);
	image(images.grass,192+cx,192+cy);
	image(images.grass,256+cx,192+cy);
	image(images.grass_r,312+cx,192+cy);
	image(images.grass_l,cx,400+cy);
	image(images.dirt_l,cx,464+cy);
	image(images.dirt_stone_l,cx,512+cy);
	for(var j = 576;j<height;j+=64){
		image(images.stone_l,cx,j+cy);
	}
	for(var i = 64;i<width-128;i+=64){
		image(images.grass,i+cx,400+cy);
		image(images.dirt,i+cx,464+cy);
		image(images.dirt_stone,i+cx,512+cy);
		for(var j = 576;j<height;j+=64){
			image(images.stone,i+cx,j+cy);
		}
	}
	image(images.grass_r,i+cx,400+cy);
	image(images.dirt_r,i+cx,464+cy);
	image(images.dirt_stone_r,i+cx,512+cy);
	for(var j = 576;j<height;j+=64){
		image(images.stone_r,i+cx,j+cy);
	}
	bottom(0,32,192);
	if(x>64 && x<312+64 && y>192 && y<192+90){fall=0;jump=0;y=191;onFloor=true;}else
	if(y>400){fall=0;jump=0;y=401;onFloor=true;}
	px=x;
	py=y;
}
