//by sb prof

let particleSystem;

function setup() {
  createCanvas(800, 800);
  particleSystem = new ParticleSystem(createVector(width / 2, height/2));
}

function draw() {
  background(30, 30, 30, 80);

  particleSystem.run();
}

function mouseDragged() {
  particleSystem.origin = createVector(mouseX, mouseY);
  particleSystem.addParticle();
}