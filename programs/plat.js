var sketchProc = function(processingInstance) {
 with (processingInstance) {
    size(800, 500);
    frameRate(60);

var px = 0;
var py = 0;
var cx = 0;
var cy = 0;
var input = {
  left:false,
  right:false,
  jump:false,
  duck:false,
  quest:false
};
var keys = [keyCode];

var playerController =function(){
mousePressed =function(){
if(keyCode===RIGHT){input.right=true;}
if(keyCode===LEFT){input.left=true;}};
};

draw =function(){
  background(255);
  fill(127,255,212);
  ellipse(px,py,20,20);
  playerController();
};


}};
var canvas = document.getElementById("plat");
var processingInstance = new Processing(canvas, sketchProc);
