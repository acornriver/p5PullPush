class Particle {

  constructor(position) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-2, 2), random(-2, 0));
    this.position = position.copy();
    this.lifespan = 500;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
    
    // this.checkEdge();
  }
  
  checkEdge() {
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }

  display() {
    stroke(255, this.lifespan);
    strokeWeight(2);
    fill(255, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
  }

  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}