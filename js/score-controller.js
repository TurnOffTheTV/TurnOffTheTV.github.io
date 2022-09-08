const channel = new BroadcastChannel("scores_and_checks");
var score = {
	left:0,
	right:0,
	leftName:"",
	rightName:"",
	bg_name:""
};

//clabe45 on Stack Overflow
window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.querySelector('img');
          img.onload = () => {
              URL.revokeObjectURL(img.src);  // no longer needed, free memory
          }

          img.src = URL.createObjectURL(this.files[0]); // set src to blob url
      }
  });
});

setInterval(function(){
	/*if(document.getElementById("bg-image").files.item(0).name!==score.bg_name){
		channel.postMessage(URL.createObjectURL(document.getElementById("bg-image").files[0]));
		score.bg_name=document.getElementById("bg-image").files.item(0).name;
	}*/
	score.leftName=document.getElementById("left-score-name").value;
	score.rightName=document.getElementById("right-score-name").value;
	channel.postMessage(score);
	channel.onmessage = function(event){console.log(event);}
},100);
