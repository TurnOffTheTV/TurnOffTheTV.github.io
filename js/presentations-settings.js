var isDark = false;
var tahoma;
var highway_gothic;
var scene = 0;
var scroll = 0;
var scrollEvent;
var style;

function preload(){
	tahoma=loadFont("https://turnoffthetv.github.io/fonts/tahoma.ttf");
	highway_gothic=loadFont("https://turnoffthetv.github.io/fonts/highway.ttf");
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	noStroke();
	style = document.getElementById("style");
	if(getCookie("useCookies")!=="true"){
		if(confirm("JSON Presentations Settings only works on cookies. Do you want to enable cookies?")){
			setCookie("useCookies","true",365);
		}else{
			window.location.href="https://turnoffthetv.github.io";
		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
	if(mouseX>textWidth("JSON Presentations Settings")+5 && mouseX<textWidth("JSON Presentations Settings")+105 && mouseY<30){scene=0;scroll=0;}
	if(mouseX>textWidth("JSON Presentations Settings")+105 && mouseX<textWidth("JSON Presentations Settings")+205 && mouseY<30){scene=1;scroll=0;}
	if(mouseX>textWidth("JSON Presentations Settings")+205 && mouseX<textWidth("JSON Presentations Settings")+305 && mouseY<30){scene=2;scroll=0;}
}

function mouseWheel(scrollEvent){
	scroll += scrollEvent.delta;
}

function draw(){
	cursor(ARROW);
	if(scroll>0){scroll=0;}
	if(isDark){
		background(40,40,50);
		fill(255);
		style.innerHTML="body {margin:0px;border:0px;background:rgb(40,40,50);}"
	}else{
		background(195,195,205)
		fill(0);
		style.innerHTML="body {margin:0px;border:0px;background:rgb(195,195,205);}";
	}
	if(isDark){fill(35,35,45);}else{fill(190,190,200);}
	rect(0,30,width,height);
	if(isDark){fill(255);}else{fill(0);}
	if(scene===0){
		textAlign(LEFT,TOP);
		textSize(25);
		textFont(tahoma);
		text("page 1",5,35+scroll);
	}
	if(scene===1){
		textAlign(LEFT,TOP);
		textSize(25);
		textFont(tahoma);
		text("page 2",5,35+scroll);
	}
	if(scene===2){
		textAlign(LEFT,TOP);
		textSize(25);
		textFont(tahoma);
		text("page 3",5,35+scroll);
	}
	if(isDark){fill(40,40,50);}else{fill(195,195,205);}
	rect(0,0,width,30);
	if(isDark){fill(255);}else{fill(0);}
	textFont(highway_gothic);
	text("JSON Presentations Settings",0,0);
	if(isDark){fill(45,45,55);}else{fill(200,200,210);}
	rect(textWidth("JSON Presentations Settings")+5,0,100,30);
	if(isDark){fill(50,50,60);}else{fill(205,205,215);}
	rect(textWidth("JSON Presentations Settings")+105,0,100,30);
	if(isDark){fill(55,55,65);}else{fill(210,210,220);}
	rect(textWidth("JSON Presentations Settings")+205,0,100,30);
	if(isDark){fill(35,35,45);}else{fill(190,190,200);}
	if(mouseX>textWidth("JSON Presentations Settings")+5 && mouseY<textWidth("JSON Presentations Settings")+305 && mouseY<30){cursor(HAND);}
	if(scene===0){
		rect(textWidth("JSON Presentations Settings")+5,0,100,50);
		if(isDark){fill(255);}else{fill(0);}
	}
	if(scene===1){
		rect(textWidth("JSON Presentations Settings")+105,0,100,50);
	}
	if(scene===2){
		rect(textWidth("JSON Presentations Settings")+205,0,100,50);
	}
	if(isDark){fill(255);}else{fill(0);}
	textAlign(CENTER,CENTER)
	text("Page 1",textWidth("JSON Presentations Settings")+55,10);
	text("Page 2",textWidth("JSON Presentations Settings")+155,10);
	text("Page 3",textWidth("JSON Presentations Settings")+255,10);
	isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	if(width<textWidth("JSON Presentations Settings")+305){
		textFont(tahoma);
		textSize(width/15);
		if(isDark){background(40,40,50);}else{background(195,195,205);}
		text("Please make the window wider.",width/2,height/2);
	}
}
