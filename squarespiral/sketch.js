function flower() {
	this.angle = 0;
	this.petal_count = 12;
	this.x = 100;
	this.y = 100;
	this.shade = '#ef0e0e';
	this.transparency = 100;
}

let flowers = new Array();

function setup() {
	createCanvas(800, 800);
	background(200);
	frameRate(30);
}

function draw() {
	clear();
	background('#000000');
	for (let i = 0; i < flowers.length; ++i) {
		push();
		let flowerColor = color(flowers[i].shade);
		flowerColor.setAlpha(flowers[i].transparency);
		fill(flowerColor);
		translate(flowers[i].x, flowers[i].y);
		flowers[i].angle += 1;
		rotate(flowers[i].angle);
		noStroke();
		for (let petal = 0; petal < flowers[i].petal_count; ++petal) {
			ellipse(0, 30, 20, 80);
			rotate(2 * PI / flowers[i].petal_count);
		}
		pop();
	}
}

function mouseClicked() {
	flowers.push(new flower());
	flowers[flowers.length - 1].x = mouseX;
	flowers[flowers.length - 1].y = mouseY;
}