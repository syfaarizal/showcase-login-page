// Theme toggle functionality
const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;
const slider = themeSwitch.querySelector('.slider');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  body.setAttribute('data-theme', 'light');
  themeSwitch.classList.add('active');
  slider.textContent = '☀️';
}

themeSwitch.addEventListener('click', () => {
  themeSwitch.classList.add('pulse');
  setTimeout(() => themeSwitch.classList.remove('pulse'), 300);
  
  if (body.getAttribute('data-theme') === 'light') {
    body.removeAttribute('data-theme');
    themeSwitch.classList.remove('active');
    slider.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  } else {
    body.setAttribute('data-theme', 'light');
    themeSwitch.classList.add('active');
    slider.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  }
});

// Canvas particle trail with theme-aware colors
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function getParticleColor() {
  const root = getComputedStyle(document.documentElement);
  const colorValues = root.getPropertyValue('--particle-color').trim();
  return colorValues;
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 2;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.alpha = 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
  }
  draw() {
    const colorValues = getParticleColor();
    ctx.fillStyle = `rgba(${colorValues},${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(e.x, e.y));
  }
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 300);
    
    const filter = btn.getAttribute('data-filter');
        
    cards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.5s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Scroll reveal for notes
const notes = document.querySelectorAll('.note');
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);
    
notes.forEach(note => observer.observe(note));

// Demo functions
function showDemo(type) {
  alert(`🚀 Opening ${type} demo! (This would normally open the actual demo)`);
}

function openDemo(type) {
  alert(`🚀 Opening ${type} on GitHub! (This would normally redirect to GitHub)`);
}

function openDemoModal() {
  document.getElementById('demoModal').classList.add('show');
}

function closeDemoModal() {
  document.getElementById('demoModal').classList.remove('show');
}

function handleDemoLogin(event) {
  event.preventDefault();
  const inputs = event.target.querySelectorAll('.demo-input');
  inputs.forEach(input => {
    input.style.borderColor = 'var(--accent-primary)';
    input.style.animation = 'pulse 0.3s ease';
  });
      
  setTimeout(() => {
    alert('✅ Login successful! This is just a demo.');
    closeDemoModal();
    inputs.forEach(input => {
      input.value = '';
      input.style.borderColor = 'var(--border-color)';
    });
  }, 1000);
}

function showForgotPassword() {
  alert('🔒 Password recovery would be implemented here!');
}

function showContact() {
  alert('📧 Contact: sicoder@example.com\n💬 Let\'s create something amazing together!');
}

// Close modal when clicking outside
document.getElementById('demoModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeDemoModal();
  }
});

// Add CSS for fade in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);