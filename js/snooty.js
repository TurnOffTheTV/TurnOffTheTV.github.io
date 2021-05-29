var sketchProc = function(processingInstance) {
     with (processingInstance) {
        size(600, 600);
        frameRate(30);



fill(0);
ellipse(width/2,height/2);











    }};

    // Get the canvas that Processing-js will use
    var canvas = document.getElementById("snooty");
    // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
    var processingInstance = new Processing(canvas, sketchProc);
