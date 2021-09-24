//dark/light mode
var style = document.getElementById("style");

setInterval(function(){
	var isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	if(isDark){style.innerHTML='<link href="https://turnoffthetv.github.io/css/dark.css" rel="stylesheet" id="style">';}
	else{style.innerHTML='<link href="https://turnoffthetv.github.io/css/light.css" rel="stylesheet" id="style">';}
}, 10);
