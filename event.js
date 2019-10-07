

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
	$('#mouseOver').style.backgroundColor = "lightgreen";
}

// onmouseout
function onMouseOut(){
	$('#mouseOver').style.backgroundColor = "lightblue";
}

var cnt = 0;
// onkeydown
function onKeyPress(){
	$('#keyPress').innerHTML = "keyPress" + cnt;
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