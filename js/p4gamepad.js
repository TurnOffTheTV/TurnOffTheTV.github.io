var p4 = {
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
  p4.gamepad = navigator.getGamepads()[3];

  //player 4 sticks
  p4.stick.lx=p4.gamepad.axes[0];
  p4.stick.ly=p4.gamepad.axes[1];
  p4.stick.rx=p4.gamepad.axes[2];
  p4.stick.ry=p4.gamepad.axes[3];

  //player 4 buttons
  p4.button.cross=p4.gamepad.buttons[0].pressed;
  p4.button.circle=p4.gamepad.buttons[1].pressed;
  p4.button.square=p4.gamepad.buttons[2].pressed;
  p4.button.triangle=p4.gamepad.buttons[3].pressed;
  p4.button.l1=p4.gamepad.buttons[4].pressed;
  p4.button.r1=p4.gamepad.buttons[5].pressed;
  p4.button.l2=p4.gamepad.buttons[6].pressed;
  p4.button.l2Value=p4.gamepad.buttons[6].value;
  p4.button.r2=p4.gamepad.buttons[7].pressed;
  p4.button.r2Value=p4.gamepad.buttons[7].value;
  p4.button.share=p4.gamepad.buttons[8].pressed;
  p4.button.options=p4.gamepad.buttons[9].pressed;
  p4.button.l3=p4.gamepad.buttons[10].pressed;
  p4.button.r3=p4.gamepad.buttons[11].pressed;
  p4.button.up=p4.gamepad.buttons[12].pressed;
  p4.button.down=p4.gamepad.buttons[13].pressed;
  p4.button.left=p4.gamepad.buttons[14].pressed;
  p4.button.right=p4.gamepad.buttons[15].pressed;
  p4.button.logo=p4.gamepad.buttons[16].pressed;

  //player 4 gamepadIsPressed
  p4.gamepadIsPressed=false;
  if(p4.button.cross || p4.button.circle || p4.button.square || p4.button.triangle || p4.button.l1 || p4.button.r1 || p4.button.l2 || p4.button.r2 || p4.button.l3 || p4.button.r3 || p4.button.up || p4.button.down || p4.button.left || p4.button.right || p4.button.options || p4.button.share || p4.button.logo || p4.stick.lx>0.2 || p4.stick.lx<-0.2 || p4.stick.ly>0.2 || p4.stick.ly<-0.2 || p4.stick.rx>0.2 || p4.stick.rx<-0.2 || p4.stick.ry>0.2 || p4.stick.ry<-0.2){p4.gamepadIsPressed=true;}
  if(p4.button.cross===false && p4.button.circle===false && p4.button.square===false && p4.button.triangle===false && p4.button.l1===false && p4.button.r1===false && p4.button.l2===false && p4.button.r2===false && p4.button.l3===false && p4.button.r3===false && p4.button.up===false && p4.button.down===false && p4.button.left===false && p4.button.right===false && p4.button.options===false && p4.button.share===false && p4.button.logo===false && p4.stick.lx<0.2 && p4.stick.lx>-0.2 && p4.stick.ly<0.2 && p4.stick.ly>-0.2 && p4.stick.rx<0.2 && p4.stick.rx>-0.2 && p4.stick.ry<0.2 && p4.stick.ry>-0.2){p4.gamepadIsPressed=false;}

  //player 4 rumble (chrome only)
  if(p4.rumble){
    p4.gamepad.vibrationActuator.playEffect("dual-rumble", {
    startDelay: 0,
    duration: 1000,
    weakMagnitude: 1.0,
    strongMagnitude: 1.0
    });
  }
}, 10);
