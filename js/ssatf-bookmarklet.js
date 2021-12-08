var div = document.createElement("div");
div.id="sketch-container";
document.body.appendChild(sketch);

function setup(){
  createCanvas(100,100);
  canvas.parent="sketch-container";
  background(0,0,255);
}
