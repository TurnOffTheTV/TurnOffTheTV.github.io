var sketchProc =function(processingInstance) {
 with (processingInstance) {
    size(800, 500);
    frameRate(60);

var px = 0;
var py = 0;
var cx = 0;
var cy = 0;
var jump = {
up:0,
gravity:0,
onFloor:false
};
var input = {
  left:false,
  right:false,
  jump:false,
  duck:false,
  quest:false
};
var keys = [keyCode];

var playerController =function(){
keyPressed =function(){
if(keyCode===RIGHT){input.right=true;}
if(keyCode===LEFT){input.left=true;}};
if(input.right){px+=2;console.log("Right");}
if(input.left){px-=2;console.log("Left");}
keyReleased =function(){
if(keyCode===RIGHT){input.right=false;}
if(keyCode===LEFT){input.left=false;}};
if(jump.onFloor && keyCode===UP){jump.up=4;}
if(onFloor===false){jump.gravity+=0.1;}
py+=jump.gravity;
py-=jump.up;
};

draw =function(){
  background(255,255,255);
  fill(127,255,212);
  ellipse(px,py,20,20);
  playerController();
};


}};
var canvas = document.getElementById("plat");
var processingInstance = new Processing(canvas, sketchProc);
