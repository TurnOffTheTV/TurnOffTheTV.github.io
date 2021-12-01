var rot = 0;
var images;

/*function preload(){
  images = {
    n:loadImage("https://turnoffthetv.github.io/images/mcnorth.png"),
    s:loadImage("https://turnoffthetv.github.io/images/mcsouth.png"),
    e:loadImage("https://turnoffthetv.github.io/images/mceast.png"),
    w:loadImage("https://turnoffthetv.github.io/images/mcwest.png"),
    u:loadImage("https://turnoffthetv.github.io/images/mcup.png"),
    d:loadImage("https://turnoffthetv.github.io/images/mcdown.png")
  };
}*/

function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL);
}

function draw(){
  background(255);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(50);
}
