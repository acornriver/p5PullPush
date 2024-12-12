class ParticleSystem {
  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
  }

  addParticle() {
    let r = random(1);
    if (r < 0.5) {
      this.particles.push(new Confetti(this.origin));
    } else {
      this.particles.push(new Particle(this.origin));
      this.particles.push(new Line(this.origin));
    }
  }

  run() {
    // Confetti 객체만 추출
    let confettiParticles = this.particles.filter(p => p instanceof Confetti);

    // Confetti 간 상호작용 적용
    for (let confetti of confettiParticles) {
      confetti.pullForce(confettiParticles);
    }

    // 모든 파티클 업데이트 및 표시
    for (let particle of this.particles) {
      particle.run();
    }

    // 수명을 다한 파티클 제거
    this.particles = this.particles.filter(p => !p.isDead());
  }
}
