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

//alert the user that I use cookies
if(getCookie("useCookies")!=="true" && getCookie("useCookies")!=="false"){
  if (confirm("I save cookies for a whole bunch of reasons outlined in the cookie policy (tunoffthetv.github.io/about/cookie-policy). Do you want cookies stored?")) {
    setCookie("useCookies","true",31);
  } else {
    setCookie("useCookies","false",31);}
		alert("I still stored one cookie to tell wether or not to use cookies.");
}

if(getCookie("useCookies")==="true"){setCookie("lastPage",window.location.pathname,31);}

//gamepad movement support, will try to make seperate script
var useGamepad = true;
var links = document.getElementsByTagName("a");
var gamepadSelected = 2;

setInterval(function(){
	//nothing here, why don't you go see a movie?
}, 50);
