let start_angle = 0;
let canvas_width = 800, canvas_height = 800;
let current_width, current_height;
let color1, color2, speed;
let angle = 3.013;
let side_factor = 0.945;
let iteration_count = 120;
let frame_number = 0;
let isGrad = false;

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
	for (let i = 0; i < iteration_count; ++i) {
		push();
		noStroke();
		translate(canvas_width/2, canvas_height/2);
		rotate(start_angle + angle * i);
		if (isGrad)
			fill(lerpColor(color(color1.value), color(color2.value), i / iteration_count));
		else {
			if (i % 2)
				fill(color(color1.value));
			else
				fill(color(color2.value));
		}
		rect(0, 0, current_width, current_height);
		current_width = + (side_factor * current_width);
		current_height = + (side_factor * current_height);
		pop();
	}
	frame_number++;
	if (frame_number > 30)
		frame_number = 0;
    start_angle = start_angle + +speed.value;
}

function setSpeed(event) {
    document.getElementById("speedText").innerHTML = event.target.value;
}

function gradAltSwitch(event) {
	if (isGrad) {
		document.getElementById("grad").checked = false;
		isGrad = false;
		iteration_count = 120;
	} else {
		isGrad = true;
		document.getElementById("grad").checked = true;
		iteration_count = 80;
	}
}