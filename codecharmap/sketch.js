var numberOfRows; //determine the number of rows we want
var numberOfColumns; //determine the number of columns we want

var xStep; //determine the size of the gap between two points on the x axis
var yStep; //determine the size of the gap between two points on the y axis

var positions = []; //an array of positions where we will store each of our Vectors

var codecharmap = [];

function setup(){
	clear();
	numberOfColumns = + (document.getElementById("sizeRange").value);  
	numberOfRows = numberOfColumns;
	let myCanvas = createCanvas(numberOfRows * 30, numberOfColumns * 30);
	myCanvas.parent("mainDiv");
  	xStep = width / numberOfColumns;
	yStep = height / numberOfRows;
	codecharmap = [];
	positions = [];
  
  	for(var x = xStep / 2 ; x < width; x += xStep) { 
    	for(var y = yStep / 2; y < height; y += yStep) {
      		var p = createVector(x, y); //we create a vector at this location
      		positions.push(p); // and then we put the vector into the array
    	}
	}
	rectMode(CENTER);

	background(2);
	count = 0;
	for (var i = 0; i < numberOfRows; ++i) {
		let mapRow = [];
		for (var j = 0; j < numberOfColumns; ++j) {
			mapRow.push(1);
		}
		codecharmap.push(mapRow);
	}
	console.log(codecharmap);

	for(var i = 0; i < numberOfRows; ++i) { 
    	for(var j = 0; j < numberOfColumns; ++j) {
			if (codecharmap[i][j] == 2 || codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] == 2) {
				fill(0, 0, 200);
				codecharmap[i][j] = 2;
				codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] = 2;
			}
			else if (codecharmap[i][j] == 1 || codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] == 1) {
				fill(0, 200, 0);
				codecharmap[i][j] = 1;
				codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] = 1;
			}
			else if (codecharmap[i][j] == 0 || codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] == 0) {
				fill(255, 200, 0);
				codecharmap[i][j] = 0;
				codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] = 0;
			}
			rect(positions[count].x, positions[count].y, xStep, yStep);
			count++;
    	}
	}

}

function mouseClicked() {
	let xIndex = int(mouseX / xStep);
	let yIndex = int(mouseY / yStep);
	codecharmap[xIndex][yIndex]++;
	codecharmap[xIndex][yIndex] = codecharmap[xIndex][yIndex] % 3;
	codecharmap[numberOfRows - 1 - xIndex][numberOfColumns - 1 - yIndex] = codecharmap[xIndex][yIndex];
	count = 0;

	for(var i = 0; i < numberOfRows; ++i) { 
    	for(var j = 0; j < numberOfColumns; ++j) {
			if (codecharmap[i][j] == 2) {
				fill(0, 0, 200);
			}
			else if (codecharmap[i][j] == 1) {
				fill(0, 200, 0);
			}
			else if (codecharmap[i][j] == 0) {
				fill(255, 200, 0);
			}
			rect(positions[count].x, positions[count].y, xStep, yStep);
			count++;
    	}
	}
	console.log(codecharmap);
}

function downloadMap() {
	currentMap = "";
	for(var i = 0; i < numberOfRows; ++i) { 
    	for(var j = 0; j < numberOfColumns; ++j) {
			if (codecharmap[j][i] == 2) {
				currentMap = currentMap + 'W ';
			}
			else if (codecharmap[j][i] == 1) {
				currentMap = currentMap + 'L ';
			}
			else if (codecharmap[j][i] == 0) {
				currentMap = currentMap + 'G ';
			}
		}
		currentMap += '\n';
	}
	let file = new Blob([currentMap], {type : "text/plain;charset=utf-8"});
	var a = document.createElement("a"), url = URL.createObjectURL(file);
	a.href = url;
	a.download = "example.txt";
	document.body.appendChild(a);
	a.click();
	setTimeout(function() {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);  
	}, 0);
}

function setSize(event) {
	document.getElementById("sizeText").innerHTML = event.target.value;
	setup();
}