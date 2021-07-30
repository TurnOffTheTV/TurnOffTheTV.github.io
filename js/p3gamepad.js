var p3 = {
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
  p3.gamepad = navigator.getGamepads()[2];

  //player 3 sticks
  p3.stick.lx=p3.gamepad.axes[0];
  p3.stick.ly=p3.gamepad.axes[1];
  p3.stick.rx=p3.gamepad.axes[2];
  p3.stick.ry=p3.gamepad.axes[3];

  //player 3 buttons
  p3.button.cross=p3.gamepad.buttons[0].pressed;
  p3.button.circle=p3.gamepad.buttons[1].pressed;
  p3.button.square=p3.gamepad.buttons[2].pressed;
  p3.button.triangle=p3.gamepad.buttons[3].pressed;
  p3.button.l1=p3.gamepad.buttons[4].pressed;
  p3.button.r1=p3.gamepad.buttons[5].pressed;
  p3.button.l2=p3.gamepad.buttons[6].pressed;
  p3.button.l2Value=p3.gamepad.buttons[6].value;
  p3.button.r2=p3.gamepad.buttons[7].pressed;
  p3.button.r2Value=p3.gamepad.buttons[7].value;
  p3.button.share=p3.gamepad.buttons[8].pressed;
  p3.button.options=p3.gamepad.buttons[9].pressed;
  p3.button.l3=p3.gamepad.buttons[10].pressed;
  p3.button.r3=p3.gamepad.buttons[11].pressed;
  p3.button.up=p3.gamepad.buttons[12].pressed;
  p3.button.down=p3.gamepad.buttons[13].pressed;
  p3.button.left=p3.gamepad.buttons[14].pressed;
  p3.button.right=p3.gamepad.buttons[15].pressed;
  p3.button.logo=p3.gamepad.buttons[16].pressed;

  //player 3 gamepadIsPressed
  p3.gamepadIsPressed=false;
  if(p3.button.cross || p3.button.circle || p3.button.square || p3.button.triangle || p3.button.l1 || p3.button.r1 || p3.button.l2 || p3.button.r2 || p3.button.l3 || p3.button.r3 || p3.button.up || p3.button.down || p3.button.left || p3.button.right || p3.button.options || p3.button.share || p3.button.logo || p3.stick.lx>0.2 || p3.stick.lx<-0.2 || p3.stick.ly>0.2 || p3.stick.ly<-0.2 || p3.stick.rx>0.2 || p3.stick.rx<-0.2 || p3.stick.ry>0.2 || p3.stick.ry<-0.2){p3.gamepadIsPressed=true;}
  if(p3.button.cross===false && p3.button.circle===false && p3.button.square===false && p3.button.triangle===false && p3.button.l1===false && p3.button.r1===false && p3.button.l2===false && p3.button.r2===false && p3.button.l3===false && p3.button.r3===false && p3.button.up===false && p3.button.down===false && p3.button.left===false && p3.button.right===false && p3.button.options===false && p3.button.share===false && p3.button.logo===false && p3.stick.lx<0.2 && p3.stick.lx>-0.2 && p3.stick.ly<0.2 && p3.stick.ly>-0.2 && p3.stick.rx<0.2 && p3.stick.rx>-0.2 && p3.stick.ry<0.2 && p3.stick.ry>-0.2){p3.gamepadIsPressed=false;}

  //player 3 rumble (chrome only)
  if(p3.rumble){
    p3.gamepad.vibrationActuator.playEffect("dual-rumble", {
    startDelay: 0,
    duration: 1000,
    weakMagnitude: 1.0,
    strongMagnitude: 1.0
    });
  }
}, 10);
