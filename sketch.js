//by sb prof

let particleSystem;

function setup() {
  createCanvas(500, 500);
  particleSystem = new ParticleSystem(createVector(width / 2, height/2));
}

function draw() {
  background(51);
  particleSystem.run();
}

function mouseDragged() {
  particleSystem.origin = createVector(mouseX, mouseY);
  particleSystem.addParticle();
}