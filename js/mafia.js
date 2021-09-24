//define name
var name;

function deathGen() {
	//get name
	name = document.getElementById("name").textContent;
  //log name
  console.log("got name var: "+name);
	if(getCookie("useCookies")){setCookie("mafia-name",name,31);}

  //set random variables
  var scene = Math.round(Math.random()*10);
  var thing0num = Math.round(Math.random()*10);
  var thing1num = Math.round(Math.random()*10);
  var thing2num = Math.round(Math.random()*10);
  console.log("set random variables: scene "+scene+", thing0 "+thing0num+", thing1 "+thing1num+", thing2 "+thing2num);

  //set thing0 strings
  if(thing0num===0){var thing0="a fire truck"}
  if(thing0num===1){var thing0="an Xbox game"}
  if(thing0num===2){var thing0="a poor man"}
  if(thing0num===3){var thing0="a wealthy man"}
  if(thing0num===4){var thing0="a Chia Pet"}
  if(thing0num===5){var thing0="a laptop"}
  if(thing0num===6){var thing0="an apple pie"}
  if(thing0num===7){var thing0="a speck of dust"}
  if(thing0num===8){var thing0="a scrap of food"}
  if(thing0num===9){var thing0="a thermos"}
  if(thing0num===10){var thing0="a chair"}
  console.log("set thing0 string: "+thing0);

  //set thing1 string
  if(thing1num===0){var thing1="a fire truck"}
  if(thing1num===1){var thing1="an Xbox game"}
  if(thing1num===2){var thing1="a poor man"}
  if(thing1num===3){var thing1="a wealthy man"}
  if(thing1num===4){var thing1="a Chia Pet"}
  if(thing1num===5){var thing1="a laptop"}
  if(thing1num===6){var thing1="an apple pie"}
  if(thing1num===7){var thing1="a speck of dust"}
  if(thing1num===8){var thing1="a scrap of food"}
  if(thing1num===9){var thing1="a thermos"}
  if(thing1num===10){var thing1="a chair"}
  console.log("set thing1 string: "+thing1);

  //set thing2 string
  if(thing2num===0){var thing2="a fire truck"}
  if(thing2num===1){var thing2="an Xbox game"}
  if(thing2num===2){var thing2="a poor man"}
  if(thing2num===3){var thing2="a wealthy man"}
  if(thing2num===4){var thing2="a Chia Pet"}
  if(thing2num===5){var thing2="a laptop"}
  if(thing2num===6){var thing2="an apple pie"}
  if(thing2num===7){var thing2="a speck of dust"}
  if(thing2num===8){var thing2="a scrap of food"}
  if(thing2num===9){var thing2="a thermos"}
  if(thing2num===10){var thing2="a chair"}
  console.log("set thing2 string: "+thing2);

  //final result
  if(scene===0){document.getElementById("output").innerHTML = name+" was walking down the street when "+thing0+" fell out of the sky just as "+thing1+" ran "+name+" over with a "+thing2+".";}
  if(scene===1){document.getElementById("output").innerHTML = name+" was sleeping like any normal human being when all of a sudden "+thing0+" walked into their room and hid "+thing2+" under the bed. "+name+" woke up and was killed by "+thing2+" using "+thing1+".";}
  if(scene===2){document.getElementById("output").innerHTML = name+" was walking up the stairs when they tripped on "+thing0+" and fell onto "+thing1+" that someone left sitting there. They were found by "+thing2+" and reported to police.";}
  if(scene===3){document.getElementById("output").innerHTML = name+" was eating breakfast at the same time "+thing0+" was plotting to use "+thing1+" to kill "+name+". The plan succeded.";}
  if(scene===4){document.getElementById("output").innerHTML = name+" was sculpting with "+thing0+" and suddenly died because "+thing1+" had poisoned the air with "+thing2+".";}
  if(scene===5){document.getElementById("output").innerHTML = name+" was killed by "+thing0+" using "+thing1+" whilst escaping "+thing2+".";}
  if(scene===6){document.getElementById("output").innerHTML = name+" ate "+thing0+" for lunch at a cafe and started choking on "+thing1+". "+name+" fell off the cafe chair and "+thing2+" called 911.";}
  if(scene===7){document.getElementById("output").innerHTML = name+" was in line at "+thing0+"'s concert and "+thing1+" snuck up behind them and killed them with "+thing2+".";}
  if(scene===8){document.getElementById("output").innerHTML = name+" wanted to kill somebody because everybody was killing everybody else, so they made "+thing0+" an asassin. Using "+thing1+","+thing0+" revolted and killed "+name+".";}
  if(scene===9){document.getElementById("output").innerHTML = name+" was at the gym using "+thing0+" to weightlift and fell, not onto a mat, but onto "+thing1+"! Another person dropped "+thing2+" and ran to help "+name+" but it was too late.";}
  console.log("done");
}
