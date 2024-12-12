class Confetti extends Particle {
  constructor(position) {
    super(position);
    this.w = 12;
    this.synth = new p5.MonoSynth();
    this.c = color(255);
    this.velocity = createVector(random(-2, 2), random(2, 4)); // y 속도가 너무 크지 않도록 수정
  }

  pullForce(otherConfettiArray) {
    for (let other of otherConfettiArray) {
      if (other !== this) {
        let force = p5.Vector.sub(other.position, this.position); 
        let distance = constrain(force.mag(), 10, 100); 
        force.normalize();
        let strength = (1 / distance) * 2; // 힘을 줄여서 지나치게 빠르게 날아가지 않도록 수정
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

  checkEdge() {
    if (this.position.y > height) {
      this.velocity.y *= -0.7;
      this.position.y = height;
      this.w = 40;
      this.c = color(random(100, 200), random(100, 200), random(100, 200));
      
      let tones = ["C3", "E3", "G3", "C4", "E4", "G4", "C6", "D6", "E6"];
      this.synth.triggerAttack(random(tones));
      this.synth.triggerRelease(random(0.1, 0.8)); 
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
