var p1 = {
  gamepad:0,
  stick:{
  lx:0,
  ly:0,
  rx:0,
  ry:0
},
  button:{
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
},
  gamepadIsPressed:false,
  rumble:false
}
var gamepadCount = 0;

setInterval(() => {
  //get gamepad
  p1.gamepad = navigator.getGamepads()[0];

  //player 1 sticks
  p1.stick.lx=p1.gamepad.axes[0];
  p1.stick.ly=p1.gamepad.axes[1];
  p1.stick.rx=p1.gamepad.axes[2];
  p1.stick.ry=p1.gamepad.axes[3];

  //player 1 buttons
  p1.button.cross=p1.gamepad.buttons[0].pressed;
  p1.button.circle=p1.gamepad.buttons[1].pressed;
  p1.button.square=p1.gamepad.buttons[2].pressed;
  p1.button.triangle=p1.gamepad.buttons[3].pressed;
  p1.button.l1=p1.gamepad.buttons[4].pressed;
  p1.button.r1=p1.gamepad.buttons[5].pressed;
  p1.button.l2=p1.gamepad.buttons[6].pressed;
  p1.button.l2Value=p1.gamepad.buttons[6].value;
  p1.button.r2=p1.gamepad.buttons[7].pressed;
  p1.button.r2Value=p1.gamepad.buttons[7].value;
  p1.button.share=p1.gamepad.buttons[8].pressed;
  p1.button.options=p1.gamepad.buttons[9].pressed;
  p1.button.l3=p1.gamepad.buttons[10].pressed;
  p1.button.r3=p1.gamepad.buttons[11].pressed;
  p1.button.up=p1.gamepad.buttons[12].pressed;
  p1.button.down=p1.gamepad.buttons[13].pressed;
  p1.button.left=p1.gamepad.buttons[14].pressed;
  p1.button.right=p1.gamepad.buttons[15].pressed;
  p1.button.logo=p1.gamepad.buttons[16].pressed;

  //player 1 gamepadIsPressed
  p1.gamepadIsPressed=false;
  if(p1.button.cross || p1.button.circle || p1.button.square || p1.button.triangle || p1.button.l1 || p1.button.r1 || p1.button.l2 || p1.button.r2 || p1.button.l3 || p1.button.r3 || p1.button.up || p1.button.down || p1.button.left || p1.button.right || p1.button.options || p1.button.share || p1.button.logo || p1.stick.lx>0.2 || p1.stick.lx<-0.2 || p1.stick.ly>0.2 || p1.stick.ly<-0.2 || p1.stick.rx>0.2 || p1.stick.rx<-0.2 || p1.stick.ry>0.2 || p1.stick.ry<-0.2){p1.gamepadIsPressed=true;}
  if(p1.button.cross===false && p1.button.circle===false && p1.button.square===false && p1.button.triangle===false && p1.button.l1===false && p1.button.r1===false && p1.button.l2===false && p1.button.r2===false && p1.button.l3===false && p1.button.r3===false && p1.button.up===false && p1.button.down===false && p1.button.left===false && p1.button.right===false && p1.button.options===false && p1.button.share===false && p1.button.logo===false && p1.stick.lx<0.2 && p1.stick.lx>-0.2 && p1.stick.ly<0.2 && p1.stick.ly>-0.2 && p1.stick.rx<0.2 && p1.stick.rx>-0.2 && p1.stick.ry<0.2 && p1.stick.ry>-0.2){p1.gamepadIsPressed=false;}

  //player 1 rumble (chrome only)
  if(p1.rumble){
    p1.gamepad.vibrationActuator.playEffect("dual-rumble", {
    startDelay: 0,
    duration: 1000,
    weakMagnitude: 1.0,
    strongMagnitude: 1.0
    });
  }

}, 10);
