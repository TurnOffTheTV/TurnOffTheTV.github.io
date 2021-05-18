canvas = document.getElementById("canvas").getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
canvasW = canvas.width;
canvasH = canvas.height;
logo = new Image;
logo.src = "logo.png";
body = new Image;
body.src = "artemis.png";
body_blink = new Image;
body_blink.src = "artemis_blink.png";
feet = new Image;
feet.src = "artemis_feet.png";
feet_l = new Image;
feet_l.src = "artemis_feet_l.png";
feet_r = new Image;
feet_r.src = "artemis_feet_r.png";
sword = new Image;
sword.src = "artemis_arm.png";
sword_thrust = new Image;
sword_thrust.src = "artemis_arm_thrust.png";
shield = new Image;
shield.src = "artemis_shield.png";
shield_hold = new Image;
shield_hold.src = "artemis_shield_hold.png";
var blink = true;
var foot_anim = 0;
var shield_held = false;
var sword_thrusted = false;
function draw(){}
setInterval(draw, 25/1000);
var f = 0;

function drawLogo (x,y){
  logo.onload = function() {
    canvas.drawImage(this,x,y);
  };
}

function drawArtemis (x,y,part){
  if(part==="body"){body.onload = function() {
    if(blink){canvas.drawImage(body_blink,x,y);}
    else{canvas.drawImage(this,x,y);}
  };}
  if(part==="feet"){feet.onload = function() {
    if(foot_anim===0){
    canvas.drawImage(this,x,y);}
    else if(foot_anim===1){canvas.drawImage(foot_l,x,y);}
    else{canvas.drawImage(foot_l,x,y);}
  };}
  if(part==="shield"){shield.onload = function() {
    if(shield_held){canvas.drawImage(shield_hold,x,y);}
    else{canvas.drawImage(this,x,y);}
  };}
  if(part==="sword"){sword.onload = function() {
    if(sword_thrusted){canvas.drawImage(sword_thrust,x,y);}
    else{canvas.drawImage(this,x,y);}
  };}

}
function draw(){
drawArtemis(0,0,"body");
drawArtemis(20,70,"feet");
drawArtemis(40,0,"shield");
drawArtemis(60,0,"sword");
}
