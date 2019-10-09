

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

//Receive Server Message
function serverMessage(){
	if(typeof(EventSource) !== "undefined") {
	  	var source = new EventSource("demo_sse.php");
	  	source.onmessage = function(event) {

	    	$('#messageFromServer').innerHTML += event.data + "<br>";
	  	};
	} else {
	  	$('#messageFromServer').innerHTML = "Sorry, your browser does not support server-sent events...";
	}
}

// reset function
function myResetFunction(){
	alert("The form was reset");
}

function myAlert(){
	alert('Yehh! Working.')
}

function myTouchMoveFunction(event){
	var x = event.touches[0].clientX;
  	var y = event.touches[0].clientY;
  	$('#demo1').innerHTML = x + ", " + y;
}

function WhichButton(event) {
  alert("You pressed button: " + event.button)
}

// querySelector
function $(elem) {
  return document.querySelector(elem);
}