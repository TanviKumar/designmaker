function Flower() {
	this.angle = 0;
	this.petal_count = 10;
	this.x = 100;
	this.y = 100;
	this.shade = '#ef0e0e';
	this.opacity = 100;
	this.speed = 2;
	this.petal_size = 80;
}

let flowers, petal_count, speed_text, flower_shade, bg_shade, opacity_text;

function setup() {
	let myCanvas = createCanvas(800, 800);
	myCanvas.parent("mainDiv");
	flowers = new Array();
	petal_count = document.getElementById("petalNumber");
	speed_text = document.getElementById("speedRange");
	flower_shade = document.getElementById("colorSelect");
	size_text = document.getElementById("sizeRange");
	opacity_text = document.getElementById("opacityRange");
	bg_shade = document.getElementById("bgColorSelect");
	background(200);
	frameRate(30);
}

function draw() {
	clear();
	background(bg_shade.value);
	for (let i = 0; i < flowers.length; ++i) {
		push();
		let flower_color = color(flowers[i].shade);
		flower_color.setAlpha(flowers[i].opacity);
		fill(flower_color);
		translate(flowers[i].x, flowers[i].y);
		flowers[i].angle += 2 * PI  * flowers[i].speed / (flowers[i].petal_count * 30);
		rotate(flowers[i].angle);
		noStroke();
		for (let petal = 0; petal < flowers[i].petal_count; ++petal) {
			ellipse(0, 30, 20, flowers[i].petal_size);
			rotate(2 * PI / flowers[i].petal_count);
		}
		pop();
	}
}

function mouseClicked() {
	if (mouseX >= 0 && mouseY >=0 && mouseX <= 800 && mouseY <= 800) {
		let newFlower = new Flower();
		newFlower.x = mouseX;
		newFlower.y = mouseY;
		newFlower.petal_count = petal_count.innerHTML;
		newFlower.angle = 0;
		newFlower.speed = speed_text.value;
		newFlower.shade = flower_shade.value;
		newFlower.petal_size = +size_text.value;
		newFlower.opacity = +opacity_text.value;
		flowers.push(newFlower);
	}
}

function undo() {
	if (flowers.length > 0)
		flowers.splice(-1, 1);
}