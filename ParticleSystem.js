class ParticleSystem {

  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
  }

  addParticle() {
    let r = random(1);
    if (r < 0.8) {
      this.particles.push(new Particle(this.origin));
      this.particles.push(new Line(this.origin));
    } else {
      this.particles.push(new Confetti(this.origin));
      
    }
  }

  run() {
    for (let particle of this.particles) {
      particle.run();
    }

    // Filter removes any elements of the array that do not pass the test
    this.particles = this.particles.filter(p => !p.isDead());
  }
}