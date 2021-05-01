var isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if(isDark){console.log("Dark");}
else{console.log("Light");}

function tick() {
if (document.hasFocus()){console.log("Document in focus");}
else{console.log("Document NOT in focus");}
}

setInterval("tick()", 1);

var unavaliableEls = document.getElementsByClassName("unavaliable");

for (var i = 0; i < unavaliableEls.length; i++) {
                unavaliableEls[i].innerHTML += " (<span>Unavaliable</span>)";
            }
