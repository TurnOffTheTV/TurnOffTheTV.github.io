canvas = document.getElementById("canvas").getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
canvasW = canvas.width;
canvasH = canvas.height;
logo = new Image;
logo.src = "logo.png";
function draw(){}
setInterval(draw, 25/1000);
var f = 0;
function drawLogo (x,y){
  logo.onload = function() {
    canvas.drawImage(this,x,y);
  };
}
function draw(){
f+=1;
drawLogo(f,0);
}
