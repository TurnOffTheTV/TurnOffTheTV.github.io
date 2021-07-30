var p2 = {
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
  p2.gamepad = navigator.getGamepads()[1];

  //player 2 sticks
  p2.stick.lx=p2.gamepad.axes[0];
  p2.stick.ly=p2.gamepad.axes[1];
  p2.stick.rx=p2.gamepad.axes[2];
  p2.stick.ry=p2.gamepad.axes[3];

  //player 2 buttons
  p2.button.cross=p2.gamepad.buttons[0].pressed;
  p2.button.circle=p2.gamepad.buttons[1].pressed;
  p2.button.square=p2.gamepad.buttons[2].pressed;
  p2.button.triangle=p2.gamepad.buttons[3].pressed;
  p2.button.l1=p2.gamepad.buttons[4].pressed;
  p2.button.r1=p2.gamepad.buttons[5].pressed;
  p2.button.l2=p2.gamepad.buttons[6].pressed;
  p2.button.l2Value=p2.gamepad.buttons[6].value;
  p2.button.r2=p2.gamepad.buttons[7].pressed;
  p2.button.r2Value=p2.gamepad.buttons[7].value;
  p2.button.share=p2.gamepad.buttons[8].pressed;
  p2.button.options=p2.gamepad.buttons[9].pressed;
  p2.button.l3=p2.gamepad.buttons[10].pressed;
  p2.button.r3=p2.gamepad.buttons[11].pressed;
  p2.button.up=p2.gamepad.buttons[12].pressed;
  p2.button.down=p2.gamepad.buttons[13].pressed;
  p2.button.left=p2.gamepad.buttons[14].pressed;
  p2.button.right=p2.gamepad.buttons[15].pressed;
  p2.button.logo=p2.gamepad.buttons[16].pressed;

  //player 2 gamepadIsPressed
  p2.gamepadIsPressed=false;
  if(p2.button.cross || p2.button.circle || p2.button.square || p2.button.triangle || p2.button.l1 || p2.button.r1 || p2.button.l2 || p2.button.r2 || p2.button.l3 || p2.button.r3 || p2.button.up || p2.button.down || p2.button.left || p2.button.right || p2.button.options || p2.button.share || p2.button.logo || p2.stick.lx>0.2 || p2.stick.lx<-0.2 || p2.stick.ly>0.2 || p2.stick.ly<-0.2 || p2.stick.rx>0.2 || p2.stick.rx<-0.2 || p2.stick.ry>0.2 || p2.stick.ry<-0.2){p2.gamepadIsPressed=true;}
  if(p2.button.cross===false && p2.button.circle===false && p2.button.square===false && p2.button.triangle===false && p2.button.l1===false && p2.button.r1===false && p2.button.l2===false && p2.button.r2===false && p2.button.l3===false && p2.button.r3===false && p2.button.up===false && p2.button.down===false && p2.button.left===false && p2.button.right===false && p2.button.options===false && p2.button.share===false && p2.button.logo===false && p2.stick.lx<0.2 && p2.stick.lx>-0.2 && p2.stick.ly<0.2 && p2.stick.ly>-0.2 && p2.stick.rx<0.2 && p2.stick.rx>-0.2 && p2.stick.ry<0.2 && p2.stick.ry>-0.2){p2.gamepadIsPressed=false;}

  //player 2 rumble (chrome only)
  if(p2.rumble){
    p2.gamepad.vibrationActuator.playEffect("dual-rumble", {
    startDelay: 0,
    duration: 1000,
    weakMagnitude: 1.0,
    strongMagnitude: 1.0
    });
  }
}, 10);
