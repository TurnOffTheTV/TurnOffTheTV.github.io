var stick = {
  lx:0,
  ly:0,
  rx:0,
  ry:0
};
var button = {
  cross:false,
  circle:false,
  square:false,
  triangle:false,
  up:false,
  down:false,
  left:false,
  right:false,
  l1:false,
  l2:false,
  l2Value:0,
  l3:false,
  r1:false,
  r2:false,
  r2Value:0,
  r3:false,
  share:false,
  options:false,
  logo:false
};
var gamepad;
var gamepadIsPressed = false;

setInterval(() => {
  gamepad = navigator.getGamepads()[0];

  stick.lx=gamepad.axes[0];
  stick.ly=gamepad.axes[1];
  stick.rx=gamepad.axes[2];
  stick.ry=gamepad.axes[3];

  button.cross=gamepad.buttons[0].pressed;
  button.circle=gamepad.buttons[1].pressed;
  button.square=gamepad.buttons[2].pressed;
  button.triangle=gamepad.buttons[3].pressed;
  button.l1=gamepad.buttons[4].pressed;
  button.r1=gamepad.buttons[5].pressed;
  button.l2=gamepad.buttons[6].pressed;
  button.l2Value=gamepad.buttons[6].value;
  button.r2=gamepad.buttons[7].pressed;
  button.r2Value=gamepad.buttons[7].value;
  button.share=gamepad.buttons[8].pressed;
  button.options=gamepad.buttons[9].pressed;
  button.l3=gamepad.buttons[10].pressed;
  button.r3=gamepad.buttons[11].pressed;
  button.up=gamepad.buttons[12].pressed;
  button.down=gamepad.buttons[13].pressed;
  button.left=gamepad.buttons[14].pressed;
  button.right=gamepad.buttons[15].pressed;
  button.logo=gamepad.buttons[16].pressed;

  gamepadIsPressed=false;
  if(button.cross || button.circle || button.square || button.triangle || button.l1 || button.r1 || button.l2 || button.r2 || button.l3 || button.r3 ||button.up || button.down || button.left || button.right || button.options || button.share || button.logo || stick.lx>0.2 || stick.lx<-0.2 || stick.ly>0.2 || stick.ly<-0.2 || stick.rx>0.2 || stick.rx<-0.2 || stick.ry>0.2 || stick.ry<-0.2){gamepadIsPressed=true;}
  if(button.cross===false && button.circle===false && button.square===false && button.triangle===false && button.l1===false && button.r1===false && button.l2===false && button.r2===false && button.l3===false && button.r3===false &&button.up===false && button.down===false && button.left===false && button.right===false && button.options===false && button.share===false && button.logo===false && stick.lx<0.2 && stick.lx>-0.2 && stick.ly<0.2 && stick.ly>-0.2 && stick.rx<0.2 && stick.rx>-0.2 && stick.ry<0.2 && stick.ry>-0.2){gamepadIsPressed=false;}
  //gamepad.vibrationActuator.playEffect("dual-rumble", {startDelay: 0, duration: 1, weakMagnitude: 1.0, strongMagnitude: 3.0});
}, 10);
