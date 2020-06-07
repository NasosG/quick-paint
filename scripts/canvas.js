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
a=null;
b=null;
var bounds = canvas.getBoundingClientRect();
var startX = 0;
			var startY = 0;
			var mouseX = 0;
			var mouseY = 0;
			var isDrawing = false;
// functions
function startPosition(e) {
	if(!lining){
		painting = true;
		draw(e);
	}
	
					if (!isDrawing) {
						startX = e.clientX - bounds.left;
						startY = e.clientY - bounds.top;
						
						isDrawing = true;
					}
					
					
				
}

function finishedPosition() {
	if(!lining){
		painting = false;
		ctx.beginPath();
	}
	
					if (isDrawing) {
						
						
						isDrawing = false;
						
						
					}
					
					
				
}

function draw(e) {
	if(lining){
		mouseX = e.clientX - bounds.left;
					mouseY = e.clientY - bounds.top;
					
					if (isDrawing) {
						ctx.fillStyle = "white";
				ctx.fillRect(0,0,canvas.width ,canvas.height);
					
			ctx.strokeStyle = penColor;
					ctx.lineWidth = brushWidth;
					ctx.beginPath();
					ctx.moveTo(startX,startY);
					ctx.lineTo(mouseX,mouseY);
					ctx.stroke();
					
					}
					return;
	}
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
	document.body.style.cursor == "crosshair" ? document.body.style.cursor = "default" : document.body.style.cursor = "crosshair";
	
	// more expressive
	/*
	cursor = document.body.style.cursor;
	if (cursor == "crosshair")
		document.body.style.cursor = "default"; 
	else document.body.style.cursor = "crosshair";
	*/
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

function drawNextLine(x, y) {
    if (needFirstPoint) {
        ctx.lineWidth = brushWidth;
		ctx.strokeStyle = penColor;
        ctx.beginPath();
        ctx.moveTo(x, y);
        needFirstPoint = false;
		a=x;b=y;
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
	canvas.addEventListener ("mouseenter", function(){ if(mouseDown) startPosition();});
	canvas.addEventListener("click", function(e){
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