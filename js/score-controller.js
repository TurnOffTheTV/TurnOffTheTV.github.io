const channel = new BroadcastChannel("scores_and_checks");
var score = {
	left:0,
	right:0,
	leftName:"",
	rightName:"",
};

setInterval(function(){
	score.leftName=document.getElementById("left-score-name").value;
	score.rightName=document.getElementById("right-score-name").value;
	channel.postMessage(score);
	channel.onmessage = function(event){console.log(event);}
},100);
