window.addEventListener("load", () => {
const canvas = document.querySelector("#canvas");
// getContext method returns a drawing context on the canvas, 
// or null if the context identifier is not supported
if (!canvas.getContext) return; // and if the context identifier is not supported we can't continue
const ctx = canvas.getContext("2d"); // 2-dimensional rendering context

// starting width and height
changeWindowSize();

// variables
let penColor = "black";
let painting = false;
let brushWidth = 10;
let mouseDown = false;
let needFirstPoint = true;
let lining = false;

// functions
function startPosition(e) {
	if(!lining){
		painting = true;
		draw(e);
	}
}

function finishedPosition() {
	if(!lining){
		painting = false;
		ctx.beginPath();
	}
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
	document.body.style.cursor = (document.body.style.cursor == "crosshair") ? "default" : "crosshair";
}

function changeWindowSize() {
	var savedImg = ctx.getImageData(0, 0, canvas.width - 1, canvas.height - 1);
	
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
	
	ctx.putImageData(savedImg, 0, 0);
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

function drawNextLine(x, y) {
    if (needFirstPoint) {
        ctx.lineWidth = brushWidth;
	    ctx.strokeStyle = penColor;
        ctx.beginPath();
        ctx.moveTo(x, y);
        needFirstPoint = false;
    }
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
	    needFirstPoint = true;
    }
}

function resetLining() {
	lining = false;
	ctx.beginPath();
}

	// event listeners
	// canvas event listeners
	canvas.addEventListener("mousedown", startPosition);
	canvas.addEventListener("mouseup", finishedPosition);
	canvas.addEventListener("mousemove", draw);
	canvas.addEventListener ("mouseout", finishedPosition);
	canvas.addEventListener ("mouseenter", function(){ if(mouseDown) startPosition(); });
	canvas.addEventListener("click", function(e) {
		if (lining) {
			var offset = $(this).offset();
			var x = e.pageX - offset.left;
			var y = e.pageY - offset.top;
			drawNextLine(x, y);
		}
    });
	
	// document event listeners if mouse is down or up at the moment
	document.addEventListener("mousedown", function() { mouseDown = true; });
	document.addEventListener("mouseup", function() { mouseDown = false; });
	
	// document event listeners for buttons inputs e.t.c.
	document.getElementById("redBut").addEventListener("click", function() { penColor = "red"; resetLining();});
	document.getElementById("blackBut").addEventListener("click", function() { penColor = "black"; resetLining();});
	document.getElementById("favcolor").addEventListener("input", function() {
		penColor = document.getElementById("favcolor").value; 
	}, false);
	document.getElementById("otherBut").addEventListener("click", function() { penColor = document.getElementById("favcolor").value; });
	document.getElementById("rubberBut").addEventListener("click", function() { penColor = "white"; resetLining();});
	document.getElementById("cursorBut").addEventListener("click", cursorChange);
	document.getElementById("resetBut").addEventListener("click", resetCtx);
	document.getElementById("tsize").addEventListener("input", lineWidth);
	document.getElementById("str8Line").addEventListener("click", function() { lining = !lining; ctx.beginPath();});

	// window listener when user resizes the window
	window.addEventListener('resize', changeWindowSize);

});