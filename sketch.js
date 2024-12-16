//by sb prof

let particleSystem;

function setup() {
  createCanvas(800, 800);
  particleSystem = new ParticleSystem(createVector(width / 2, height/2));

  strokeWeight(4);

  line(0, 0, width, 0);
}

function draw() {
  background(51);
  particleSystem.run();
}

function mouseDragged() {
  particleSystem.origin = createVector(mouseX, mouseY);
  particleSystem.addParticle();
}