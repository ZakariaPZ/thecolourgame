var numOfSquares = 9;
var colors = [];
var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var resetHard = true;
var resetUltra = false;


init();

function init() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected"); //remove from both, then add using "this"
			modeButtons[2].classList.remove('selected');	
			this.classList.add("selected");

			if (this.textContent === "Easy") {
				numOfSquares = 3;
				resetHard = false;
				resetUltra = false;

			} else if (this.textContent === "Hard") {
				numOfSquares = 9;
				resetHard = true;
				resetUltra = false;
			} else {
				numOfSquares = 12;
				resetHard = false;
				resetUltra = true;
			}
			reset(); //don't think this is needed 
		})
	} //could seperate this into two functions (top and bottom)

	for (var i = 0; i < squares.length; i++) {
	//Add colors to squares 
	//Add click (event) listeners to squares 
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;

			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				changeColors(pickedColor);
				h1.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play Again?"
			} else {
				this.style.backgroundColor = "#232323";	
				messageDisplay.textContent = wrongAns();
			}
		});
		reset();
	}
}


function reset() {
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colours"
	for (var i = 0; i < squares.length; i++) {
	//Add colors to squares 
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}	
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
}


resetButton.addEventListener("click", function() {
	reset();
})


//If user chooses correct color (refactored to a function), display all as correct color
function changeColors(color) {
	for (var i = 0; i < colors.length; i++) {
		squares[i].style.backgroundColor = color;
	}
} 

//Random RGB color generator
function pickColor() {
	var randomColor = Math.floor(Math.random() * colors.length)
	return colors[randomColor];
}

function generateRandomColors(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		//random color added into array 6 times
		arr.push(randomColor()); 
	}

	return arr;
}

//Generate a random color between 0 and 255
function randomColor() {
	var r = Math.floor((Math.random()*256));
	var g = Math.floor((Math.random()*256));
	var b = Math.floor((Math.random()*256));

	if (resetHard) { //loop until numbers are close together (at least two)
		while(Math.abs(r-g) > 30 && Math.abs(r-b) > 30 && Math.abs(g-b) > 30) {
			r = Math.floor((Math.random()*256));
			g = Math.floor((Math.random()*256));
			b = Math.floor((Math.random()*256));
		}
	} else if (resetUltra) {
		while(Math.abs(r-g) > 30 || Math.abs(r-b) > 30 || Math.abs(g-b) > 30) {
			r = Math.floor((Math.random()*256));
			g = Math.floor((Math.random()*256));
			b = Math.floor((Math.random()*256));		
		}	
	}

	return "rgb(" + r + ", " + g + ", " + b + ")"
}

function wrongAns() {
	var message = ["Failure...", "Wrong!", "Need a brain?"];
	var randMessage = Math.floor(Math.random()*3);
	return message[randMessage];
}
