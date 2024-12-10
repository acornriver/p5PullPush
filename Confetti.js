class Confetti extends Particle {
  
  constructor(position) {
    super(position);
    this.w = 12;
    this.synth = new p5.MonoSynth();
    this.c = color(255);

  }
  
  checkEdge() {
    if (this.position.y > height) {
      this.velocity.y *= -0.7;
      this.position.y = height;
      this.w = 40;
      this.c = color(random(100, 200), random(100, 200), random(100, 200));
      
      let tones = ["C3","E3", "G3", "C4", "E4", "G4", "C6", "D6", "E6"];
      this.synth.triggerAttack(random(tones));
      this.synth.triggerRelease(random(0.1, 0.8)); 
    }
  }

  // Override the display method
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


