//dark/light mode
var isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
var style = document.getElementById("style");

if(isDark){style.innerHTML='<link href="css/dark.css" rel="stylesheet" id="style">';}
else{style.innerHTML='<link href="css/light.css" rel="stylesheet" id="style">';}

var unavaliableEls = document.getElementsByClassName("unavaliable");

for (var i = 0; i < unavaliableEls.length; i++) {
                unavaliableEls[i].innerHTML += " (<span>Unavaliable</span>)";
            }

//cookies
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

//alert the user that we use cookies
if(getCookie("useCookies")!=="true" && getCookie("useCookies")!=="false"){
  if (confirm("We use cookies to improve your browsing experience. Do you want us to store cookies?")) {
    setCookie("useCookies","true",31);
  } else {
    setCookie("useCookies","false",31);}

}

var useGamepad = false;
var links = document.getElementsByTagName("A");
var gamepadSelected = 0;

setInterval(() => {
if(gamepadIsPressed){useGamepad=true;}
if(useGamepad){
  if(gamepadSelected<0){gamepadSelected=0;}
  if(gamepadSelected>links.length){gamepadSelected=links.length;}
  if(button.circle){window.location.href="../";}
  if(button.logo){window.location.href="https://turnoffthetv.github.io";}
  for(var i;i>links.length;i++){
    links[i].style.outline = "0px dashed #0000FF";
    if(i===gamepadSelected){links[i].style.outline = "medium dashed #0000FF";}
  }


}
}, 50);
