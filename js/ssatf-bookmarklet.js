var snooty = document.createElement("div");
var snooty_img = document.createElement("img");
var px = 0;
var py = 0;
var fall = 0;
var jump = 0;
var onFloor = 0;
setInterval(function(){
  snooty.style.position="float";
  snooty.style.left=px+"px";
  snooty.style.top=py+"px";
  snooty.id="snooty"
  snooty_img.src="https://turnoffthetv.github.io/images/snooty-favicon.png";
  snooty_img.width=500;
  snooty_img.height=500;
  px+=1;
}, 100);
document.body.appendChild(snooty);
snooty.appendChild(snooty_img);
