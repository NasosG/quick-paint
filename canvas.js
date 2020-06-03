window.addEventListener("load", () => {
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// starting width and height
changeWindowSize();

// variables
let penColor = "black";
let painting = false;
let brushWidth = 10;
let mouseDown = false;

// functions
function startPosition(e) {
	painting = true;
	draw(e);
}

function finishedPosition() {
	painting = false;
	ctx.beginPath();
}

function draw(e) {
	if (!painting) return;
	ctx.lineWidth = brushWidth;
	ctx.lineCap = "round";
	ctx.lineTo(e.clientX, e.clientY);
	ctx.strokeStyle = penColor;
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(e.clientX, e.clientY);
}

function cursorChange(e) {
	// in one line
	//document.body.style.cursor == "crosshair"?document.body.style.cursor = "default":document.body.style.cursor = "crosshair";
	
	// more expressive
	cursor = document.body.style.cursor;
	if (cursor == "crosshair")
		document.body.style.cursor = "default"; 
	else document.body.style.cursor = "crosshair";
}

function changeWindowSize() {
		canvas.height = window.innerHeight;
		if(window.innerWidth < 500) 
				canvas.width = 0.6 * window.innerWidth;
		else if(window.innerWidth < 800) 
				canvas.width = 0.7 * window.innerWidth;
		else if(window.innerWidth < 1100) 
				canvas.width = 0.77 * window.innerWidth;
		else if(window.innerWidth < 1300) 
				canvas.width = 0.82 * window.innerWidth;
		else {
			canvas.height = window.innerHeight/1.1;
			canvas.width = window.innerWidth/1.15;
		}
}

// function that uses a dialog box to reset the canvas
function resetCtx() {
	var answer = confirm("Are you sure, you want to reset the canvas? Press OK to continue.");
	if (answer) 
		ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function lineWidth() {
		brushWidth = document.getElementById("tsize").value;
}

	// event listeners
	// canvas event listeners
	canvas.addEventListener("mousedown", startPosition);
	canvas.addEventListener("mouseup", finishedPosition);
	canvas.addEventListener("mousemove", draw);
	canvas.addEventListener ("mouseout", finishedPosition);
	canvas.addEventListener ("mouseenter", function(){ if(mouseDown) startPosition();});
	
	// document event listeners if mouse is down or up at the moment
	document.addEventListener("mousedown", function() { mouseDown = true; });
	document.addEventListener("mouseup", function() { mouseDown = false; });
	
	// document event listeners for buttons inputs e.t.c.
	document.getElementById("redBut").addEventListener("click", function() { penColor = "red"; });
	document.getElementById("blackBut").addEventListener("click", function() { penColor = "black"; });
	document.getElementById("favcolor").addEventListener("input", function() {
		penColor = document.getElementById("favcolor").value; 
	}, false);
	document.getElementById("otherBut").addEventListener("click", function() { penColor = document.getElementById("favcolor").value; });
	document.getElementById("rubberBut").addEventListener("click", function() { penColor = "white"; });
	document.getElementById("cursorBut").addEventListener("click", cursorChange);
	document.getElementById("resetBut").addEventListener("click", resetCtx);
	document.getElementById("tsize").addEventListener("input", lineWidth);

	// window listener when user resizes the window
	window.addEventListener('resize', changeWindowSize);
});