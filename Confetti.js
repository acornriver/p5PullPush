class Confetti extends Particle {
  constructor(position) {
    super(position);
    this.w = 12;
    this.synth = new p5.MonoSynth();
    this.c = color('yellow');
    this.velocity = createVector(random(-2, 2), random(2, 4));
    this.hasCollided = false; // 충돌 여부 추적
  }

  pullForce(otherConfettiArray) {
    if (this.hasCollided) return; // 충돌 후 끌림 X
    for (let other of otherConfettiArray) {
      if (other !== this && !other.hasCollided) {
        let force = p5.Vector.sub(other.position, this.position); 
        let distance = constrain(force.mag(), 10, 100); 
        force.normalize();
        let strength = (1 / distance) * 1; // 힘의 크기 조정
        force.mult(strength);
        this.acceleration.add(force);
      }
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2;
    
    this.checkEdge();
  }

  checkCollision(otherConfettiArray) {
    if (this.hasCollided) return; 
    for (let other of otherConfettiArray) {
      if (other !== this && !other.hasCollided) {
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (distance < (this.w / 2 + other.w / 2)) {
          // 충돌 처리
          this.velocity.y *= -0.7;
          this.position.y -= 10;
          this.w = 40;
          this.c = color(random(50, 100), random(50, 100), random(50, 100));
          this.hasCollided = true;
  
          // 사운드 효과
          let tones = ["C3","Eb3","G3","Bb3","C4","Eb4","G4","Bb4","D5","Eb5"];
          this.synth.triggerAttack(random(tones));
          this.synth.triggerRelease(random(0.1, 0.8)); 
  
          break;
        }
      }
    }
  }

  drawLines(otherConfettiArray) {
    // 충돌한 경우 선을 그리지 않음
    if (this.hasCollided) return; 
    stroke(255, 150);
    strokeWeight(1);

    // 일정 거리 이내인 다른 Confetti와 선 그리기
    for (let other of otherConfettiArray) {
      if (other !== this && !other.hasCollided) {
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (distance < 100) {
          line(this.position.x, this.position.y, other.position.x, other.position.y);
        }
      }
    }
  }

  display() {
    rectMode(CENTER);
    fill(this.c, this.lifespan);
    stroke(255, this.lifespan);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    let theta = map(this.position.x, 0, width, 0, TWO_PI * 20);
    rotate(theta);
    rect(0, 0, this.w, this.w);
    pop();
  }
}
