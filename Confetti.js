class Confetti extends Particle {
  constructor(position) {
    super(position);
    this.w = 12;
    this.synth = new p5.MonoSynth();
    this.c = color(255);
    this.velocity = createVector(random(-2, 2), random(2, 4)); // y 속도가 너무 크지 않도록 수정
    this.hasCollided = false; // 충돌 여부를 나타내는 상태 변수

  }

  pullForce(otherConfettiArray) {
    if (this.hasCollided) return; // 충돌 후에는 pullForce를 건너뜀
    for (let other of otherConfettiArray) {
      if (other !== this) {
        let force = p5.Vector.sub(other.position, this.position); 
        let distance = constrain(force.mag(), 10, 100); 
        force.normalize();
        let strength = (1 / distance) * 1; // 힘을 줄여서 지나치게 빠르게 날아가지 않도록 수정
        force.mult(strength);
        this.acceleration.add(force);
      }
    }
  }
  

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // Reset acceleration at the start of each frame
    this.lifespan -= 2;
    
    this.checkEdge();
  }

  checkCollision(otherConfettiArray) {
    if (this.hasCollided) return; // 충돌 후에는 더 이상 체크하지 않음
    for (let other of otherConfettiArray) {
      if (other !== this) {
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (distance < (this.w / 2 + other.w / 2)) {
          // 충돌 시 효과
          this.velocity.y *= -0.7; // 반발 효과
          this.position.y -= 10;   // 약간 위로 이동 (겹침 방지)
          this.w = 40; // 크기 변경
          this.c = color(random(100, 200), random(100, 200), random(100, 200));
          this.hasCollided = true; // 충돌 상태로 설정
  
          // 사운드 효과
          let tones = ["C3", "E3", "G3", "C4", "E4", "G4", "C6", "D6", "E6"];
          this.synth.triggerAttack(random(tones));
          this.synth.triggerRelease(random(0.1, 0.8)); 
  
          break; // 하나의 충돌만 처리
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
