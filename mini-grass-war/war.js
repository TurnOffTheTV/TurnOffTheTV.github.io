    var sketchProc =function(processingInstance) {
     with (processingInstance) {
       var canW = document.body.clientWidth;
       var canH = document.body.clientHeight;
        size(canW, canH);
        frameRate(60);

draw =function(){
  var o=o+1;
  ellipse(o,width/2,30,30);};


    }};
    var canvas = document.getElementById("plat");
    var processingInstance = new Processing(canvas, sketchProc);
