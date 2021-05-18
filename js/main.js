//dark mode
var isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if(isDark){console.log("Dark");}
else{console.log("Light");}

var unavaliableEls = document.getElementsByClassName("unavaliable");

for (var i = 0; i < unavaliableEls.length; i++) {
                unavaliableEls[i].innerHTML += " (<span>Unavaliable</span>)";
            }

//for the about-program.html
var game = "nswitch";
var nameEls = document.getElementsByClassName("game");

if(game==="plat"){nameEls.innerHTML = "2D Platformer";}
if(game==="nswitch"){nameEls.innerHTML = "Nintendo Switch";}

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

if(getCookie("useCookies")==="true"){setCookie("visited","true",31);}
var welcome = document.getElementById("home-welcome");
if(getCookie("visited")==="true"){welcome.innerText="Welcome back!"}

var name = document.getElementById("name");
name.innerText = getCookie("mafia-name");
