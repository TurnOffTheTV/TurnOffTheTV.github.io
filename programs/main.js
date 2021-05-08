var isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if(isDark){console.log("Dark");}
else{console.log("Light");}

var unavaliableEls = document.getElementsByClassName("unavaliable");

for (var i = 0; i < unavaliableEls.length; i++) {
                unavaliableEls[i].innerHTML += " (<span>Unavaliable</span>)";
            }
var nameEls = document.getElementsByClassName("game");

if(game==="plat"){nameEls.innerHTML = "2D Platformer";}
if(game==="nswitch"){nameEls.innerHTML = "Nintendo Switch";}
