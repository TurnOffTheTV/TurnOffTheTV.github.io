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
    setCookie("useCookies","false",31);
		alert("I still stored one cookie to tell wether or not to use cookies.");}
}

//remove banner
setInterval(function(){javascript:/*v3*/var stupid=document.querySelectorAll('[data-gg-privacy-banner-anchor="true"]');for(var i = 0; i<stupid.length;i++){stupid[i].remove();}var dumb=document.querySelectorAll('[data-gg-chat-anchor="true"]');for(var i = 0; i<dumb.length;i++){dumb[i].remove();}},1000);

var links = document.getElementsByTagName("a");
var selected = 0;
var down = false;
setInterval(function(){
	if(p1.button.up && down===false){selected--;down=true;}
	if(p1.button.down && down===false){selected++;down=true;}
	if(!p1.button.down && !p1.button.up){down=false;}
	if(selected<0){selected=links.length;}
	if(selected>links.length){selected=0;}
	links[selected].style="outline-style:dashed;outline-color:blue;";
	for(i = 0;i<links.length;i++){
		if(i!=selected){links[i].style="outline-style:none;";}
	}
	if(p1.button.cross){console.log("Pressed!");window.location.href=links[selected].href;}
},50);
