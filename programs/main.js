var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
var style = document.getElementsByTagName("p");

if(isDark){
	console.log("Currently in dark mode");
}else{

	console.log("Currently not in dark mode");
}
console.log(style);
