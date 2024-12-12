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
    let confettiParticles = this.particles.filter(p => p instanceof Confetti);

    // Confetti 끼리 끌림
    for (let confetti of confettiParticles) {
      confetti.pullForce(confettiParticles);
    }

    // 충돌 검사
    for (let confetti of confettiParticles) {
      confetti.checkCollision(confettiParticles);
    }

    // 모든 파티클 업데이트 및 표시
    for (let particle of this.particles) {
      particle.run();
    }

    // 모든 Confetti에 대해 선 그리기
    // run()에서 particle.run() 후에 호출: 
    // 화면 갱신 후 선을 그려서 Confetti가 먼저 표시되고 그 위에 선이 그려짐
    for (let confetti of confettiParticles) {
      confetti.drawLines(confettiParticles);
    }

    // 수명 다한 파티클 제거
    this.particles = this.particles.filter(p => !p.isDead());
  }
}
