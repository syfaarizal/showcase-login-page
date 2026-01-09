// Advanced Particle System
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particleCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.connections = [];
    this.mouse = { x: 0, y: 0 };
    this.init();
  }

  init() {
    this.isVisible = true;
    this.resizeCanvas();
    this.createParticles(50);
    this.initIntersectionObserver();
    this.animate();
    this.bindEvents();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles(count) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: this.getParticleColor(),
        alpha: Math.random() * 0.5 + 0.1,
        connectionDistance: 150
      });
    }
  }

  getParticleColor() {
    const root = getComputedStyle(document.documentElement);
    const color = root.getPropertyValue('--accent-primary').trim();
    return color;
  }

  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw connections
    this.drawConnections();
    
    // Draw particles
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.hexToRgba(particle.color, particle.alpha);
      this.ctx.fill();
      
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off walls
      if (particle.x <= 0 || particle.x >= this.canvas.width) particle.speedX *= -1;
      if (particle.y <= 0 || particle.y >= this.canvas.height) particle.speedY *= -1;
      
      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        particle.speedX -= dx * 0.0001;
        particle.speedY -= dy * 0.0001;
      }
    });
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = this.hexToRgba(this.getParticleColor(), 0.1 * (1 - distance/150));
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  animate() {
    if (this.isVisible) { // Tambahkan flag pengecekan
      this.drawParticles();
    }
    requestAnimationFrame(() => this.animate());
  }

  initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      this.isVisible = entry.isIntersecting;
    });
  }, { threshold: 0 }); // Trigger segera setelah 1 pixel keluar/masuk

  observer.observe(this.canvas);
}

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
  
  // mouse trail effect
  const mouseTrail = document.createElement('div');
  mouseTrail.className = 'mouse-trail';
  document.body.appendChild(mouseTrail);
  
  let trailTimeout;
  document.addEventListener('mousemove', (e) => {
    mouseTrail.style.left = e.clientX + 'px';
    mouseTrail.style.top = e.clientY + 'px';
    mouseTrail.style.opacity = '0.3';
    
    clearTimeout(trailTimeout);
    trailTimeout = setTimeout(() => {
      mouseTrail.style.opacity = '0';
    }, 100);
  });
});