class Particle {

  constructor(position) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-2, 2), random(-2, 0));
    this.position = position.copy();
    this.lifespan = 1500;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
    
    this.checkEdge();
  }
  
  checkEdge() {
    // 왼쪽 벽
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -0.7; // 반발 계수 조정
    }
  
    // 오른쪽 벽
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -0.7;
    }
  
    // 상단 벽
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -0.7;
    }
  
    // 하단 벽
    if (this.position.y > height) {
      this.position.y = height;
      this.velocity.y *= -0.7;
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