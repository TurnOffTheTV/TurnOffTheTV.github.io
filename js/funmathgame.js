var level = 0;
var problems;

function preload(){
  problems = loadJSON("problems.json");
}

function setup(){
  problems.problems=problems;
  createCanvas(windowWidth,windowHeight);
}

function draw(){
  background(0);
}
