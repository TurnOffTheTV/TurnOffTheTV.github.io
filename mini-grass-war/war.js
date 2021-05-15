canvas = document.getElementById("canvas").getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
canvasW = canvas.width;
canvasH = canvas.height;
logo = new Image;
logo.src = "favicon.png";
var v = Math.random()*100;
var f = Math.random()*100;
function drawLogo (x,y){
  logo.onload = function() {
    canvas.drawImage(this, x, y);
  };
}
drawLogo(f,v);
