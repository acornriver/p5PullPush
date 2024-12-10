class Line extends Particle {
  
  constructor(position) {
    super(position);
    this.w = 12;
  }
  
  display() {
    stroke(255, this.lifespan);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    let theta = map(this.position.x, 0, width, TWO_PI*-2, TWO_PI * 2);
    rotate(theta);
    line(0, 0, 30, 30);
    pop();
  }
}