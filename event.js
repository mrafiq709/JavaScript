

// onclick event
function displayDate() {
  document.getElementById("demo").innerHTML = Date();
}

// onchange event
function myFunctionOnChange() {
  var x = document.getElementById("mySelect").value;
  document.getElementById("demo").innerHTML = "You selected: " + x;
}

// onmouseover event
function onMouseOver(){
	elemId('mouseOver').style.backgroundColor = "lightgreen";
}

// onmouseout
function onMouseOut(){
	elemId('mouseOver').style.backgroundColor = "lightblue";
}

var cnt = 0;
// onkeydown
function onKeyPress(){
	elemId('keyPress').innerHTML = "keyPress" + cnt;
	cnt++;
}

// onload
function myOnLoad(){
	alert('Page Loaded !');
}

// querySelector
function $(elem) {
  return document.querySelector(elem);
}

// Get Element By Id
function elemId(elem) {
  return document.getElementById(elem);
}