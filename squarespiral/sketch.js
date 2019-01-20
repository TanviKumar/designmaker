let start_angle = 0;
let canvas_width = 800, canvas_height = 800;
let current_width, current_height;
let color1, color2, speed;

function setup() {
  let myCanvas = createCanvas(canvas_width, canvas_height);
  myCanvas.parent("mainDiv");
  angleMode(DEGREES);
  rectMode(CENTER);
  color1 = document.getElementById("color1Select");
  color2 = document.getElementById("color2Select");
  speed = document.getElementById("speedRange");
}

function draw() {
	background(color(255, 255 , 255));
	current_width = 850;
	current_height = 850;
	for (let i = 0; i < 120; ++i) {
		push();
		noStroke();
		translate(canvas_width/2, canvas_height/2);
		rotate(start_angle + 3.013*i);
		if (i % 2)
			fill(color(color1.value));
		else
			fill(color(color2.value));
		rect(0, 0, current_width, current_height);
		current_width = + (0.945 * current_width);
		current_height = + (0.945 * current_height);
		pop();
	}

    start_angle = start_angle + +speed.value;
}

function setSpeed(event) {
    document.getElementById("sppedText").innerHTML = event.target.value;
}
