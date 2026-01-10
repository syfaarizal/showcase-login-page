// Main Application Controller
class SICODERApp {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    this.initTheme();
    this.initFiltering();
    this.initSorting();
    this.initModals();
    this.initForms();
    this.initContact();
    this.initNewsletter();
    this.bindEvents();
    this.initSearch();
  }

  initTheme() {
    const themeSwitch = document.getElementById('themeSwitch');
    const body = document.body;
    const slider = themeSwitch.querySelector('.slider');

    // Set initial theme
    if (this.currentTheme === 'light') {
      body.setAttribute('data-theme', 'light');
      themeSwitch.classList.add('active');
    }

    themeSwitch.addEventListener('click', () => {
      themeSwitch.classList.add('pulse');
      setTimeout(() => themeSwitch.classList.remove('pulse'), 300);

      if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        themeSwitch.classList.remove('active');
        localStorage.setItem('theme', 'dark');
      } else {
        body.setAttribute('data-theme', 'light');
        themeSwitch.classList.add('active');
        localStorage.setItem('theme', 'light');
      }

      // Dispatch theme change event
      document.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme: body.getAttribute('data-theme') || 'dark' }
      }));
    });
  }

  initFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        btn.classList.add('pulse');
        setTimeout(() => btn.classList.remove('pulse'), 300);

        // Get filter
        this.currentFilter = btn.getAttribute('data-filter');

        // Filter cards
        cards.forEach(card => {
          const categories = card.getAttribute('data-category').split(' ');
          if (this.currentFilter === 'all' || categories.includes(this.currentFilter)) {
            card.style.display = 'block';
            card.style.animation = 'slideInUp 0.5s ease';
          } else {
            card.style.display = 'none';
          }
        });

        // Save filter preference
        localStorage.setItem('filter', this.currentFilter);
      });
    });

    // Restore filter preference
    const savedFilter = localStorage.getItem('filter');
    if (savedFilter) {
      const btn = document.querySelector(`[data-filter="${savedFilter}"]`);
      if (btn) btn.click();
    }
  }

  initSearch() {
  const searchInput = document.getElementById('projectSearch');
  const cards = document.querySelectorAll('.card');
  const noResultMsg = document.createElement('div');
  
  noResultMsg.textContent = "No search results";
  noResultMsg.style.cssText = "text-align: center; width: 100%; grid-column: 1/-1; padding: 2rem; display: none; color: var(--text-secondary);";
  document.querySelector('.gallery').appendChild(noResultMsg);

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    let hasVisibleCard = false;

    cards.forEach(card => {
      // Ambil data untuk pencarian
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('.card-desc').textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll('.tech-tag')).map(t => t.textContent.toLowerCase()).join(' ');
      const category = card.getAttribute('data-category');

      // Cek apakah input cocok dengan konten
      if (title.includes(term) || desc.includes(term) || tags.includes(term) || category.includes(term)) {
        card.style.display = 'block';
        card.style.animation = 'scaleIn 0.3s ease';
        hasVisibleCard = true;
      } else {
        card.style.display = 'none';
      }
    });

    // Tampilkan pesan jika kosong
    noResultMsg.style.display = hasVisibleCard ? 'none' : 'block';
  });
}

  initSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', (e) => {
      const value = e.target.value;
      this.sortProjects(value);
    });
  }

  sortProjects(criteria) {
    const container = document.querySelector('.gallery');
    const cards = Array.from(document.querySelectorAll('.card'));
    
    cards.sort((a, b) => {
      switch(criteria) {
        case 'newest':
          return this.getProjectDate(b) - this.getProjectDate(a);
        case 'popular':
          return this.getPopularityScore(b) - this.getPopularityScore(a);
        default: // featured
          return this.getFeaturedScore(b) - this.getFeaturedScore(a);
      }
    });

    // Reorder in DOM
    cards.forEach(card => container.appendChild(card));
  }

  getProjectDate(card) {
    const meta = card.querySelector('.meta-item:nth-child(2)');
    if (meta) {
      const text = meta.textContent;
      const month = text.includes('Jan') ? 1 : text.includes('Feb') ? 2 :
                   text.includes('Mar') ? 3 : text.includes('Apr') ? 4 :
                   text.includes('May') ? 5 : text.includes('Jun') ? 6 :
                   text.includes('Jul') ? 7 : text.includes('Aug') ? 8 :
                   text.includes('Sep') ? 9 : text.includes('Oct') ? 10 :
                   text.includes('Nov') ? 11 : 12;
      const year = 2024; // Default
      return new Date(year, month - 1).getTime();
    }
    return 0;
  }

  getPopularityScore(card) {
    // Simple scoring based on badges
    let score = 0;
    if (card.querySelector('.badge.popular')) score += 3;
    if (card.querySelector('.badge.featured')) score += 2;
    if (card.querySelector('.badge.new')) score += 1;
    return score;
  }

  getFeaturedScore(card) {
    // Featured items first
    if (card.querySelector('.badge.featured')) return 3;
    if (card.querySelector('.badge.new')) return 2;
    if (card.querySelector('.badge.popular')) return 1;
    return 0;
  }

  initModals() {
    // Demo modal
    const demoModal = document.getElementById('demoModal');
    if (demoModal) {
      demoModal.addEventListener('click', (e) => {
        if (e.target === demoModal) {
          this.closeDemoModal();
        }
      });

      // Close with Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && demoModal.classList.contains('show')) {
          this.closeDemoModal();
        }
      });
    }
  }

  initForms() {
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        this.subscribeNewsletter(email);
      });
    }

    // Demo form
    document.addEventListener('submit', (e) => {
      if (e.target.classList.contains('demo-form')) {
        e.preventDefault();
        this.handleDemoLogin(e);
      }
    });
  }

  initContact() {
    // Contact info display
    this.contactInfo = {
      email: 'syifairgi@gmail.com',
      github: 'https://github.com/syfaarizal',
      message: "💬 Let's create something amazing together!"
    };
  }

  initNewsletter() {
    this.subscribers = JSON.parse(localStorage.getItem('sicoder_subscribers') || '[]');
  }

  bindEvents() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('show');
        menuToggle.classList.toggle('active');
      });
    }
  }

  // Utility Methods
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    });

    // Auto remove
    setTimeout(() => {
      if (notification.parentNode) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // Public Methods
  scrollToProjects() {
    const showcase = document.getElementById('showcase');
    if (showcase) {
      showcase.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openDemoModal(type) {
    const modal = document.getElementById('demoModal');
    if (!modal) return;

    // Update demo content based on type
    const preview = modal.querySelector('.demo-preview');
    if (preview) {
      preview.innerHTML = this.getDemoContent(type);
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  getDemoContent(type) {
    const demos = {
      panorama: `
        <div class="demo-login">
          <h4>Gradient Login Demo</h4>
          <form class="demo-form">
            <div class="input-group">
              <label for="demo-email">Email</label>
              <input type="email" id="demo-email" class="demo-input" placeholder="demo@sicoder.com" required>
            </div>
            <div class="input-group">
              <label for="demo-password">Password</label>
              <input type="password" id="demo-password" class="demo-input" placeholder="password123" required>
            </div>
            <div class="demo-options">
              <label class="checkbox">
                <input type="checkbox"> Remember me
              </label>
            </div>
            <button type="submit" class="demo-btn">Sign In</button>
          </form>
          <div class="demo-alt">
            <p>Or sign in with:</p>
            <div class="social-login">
              <button class="social-btn google">
                <i class="fab fa-google"></i> Google
              </button>
              <button class="social-btn github">
                <i class="fab fa-github"></i> GitHub
              </button>
            </div>
          </div>
        </div>
      `,
      default: `
        <div class="demo-login">
          <h4>Login Demo</h4>
          <form class="demo-form">
            <input type="text" class="demo-input" placeholder="Username" required>
            <input type="password" class="demo-input" placeholder="Password" required>
            <button type="submit" class="demo-btn">Sign In</button>
          </form>
          <div class="demo-forgot" onclick="showForgotPassword()">Forgot Password?</div>
        </div>
      `
    };

    return demos[type] || demos.default;
  }

  closeDemoModal() {
    const modal = document.getElementById('demoModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  handleDemoLogin(event) {
    const form = event.target;
    const inputs = form.querySelectorAll('.demo-input');
    
    // Animate inputs
    inputs.forEach(input => {
      input.style.borderColor = 'var(--accent-primary)';
      input.style.transform = 'scale(1.02)';
      input.style.boxShadow = '0 0 10px var(--accent-glow)';
    });

    // Simulate API call
    setTimeout(() => {
      this.showNotification('✅ Login successful! Welcome to the demo.', 'success');
      this.closeDemoModal();
      
      // Reset form
      inputs.forEach(input => {
        input.value = '';
        input.style.borderColor = '';
        input.style.transform = '';
        input.style.boxShadow = '';
      });
    }, 1000);
  }

  showForgotPassword() {
    const modal = document.getElementById('demoModal');
    const preview = modal.querySelector('.demo-preview');
    
    preview.innerHTML = `
      <div class="demo-forgot-password">
        <h4>Reset Password</h4>
        <p>Enter your email to receive a reset link</p>
        <form class="demo-form" onsubmit="handlePasswordReset(event)">
          <input type="email" class="demo-input" placeholder="your@email.com" required>
          <button type="submit" class="demo-btn">Send Reset Link</button>
        </form>
        <button class="back-to-login" onclick="showLoginForm()">
          <i class="fas fa-arrow-left"></i> Back to Login
        </button>
      </div>
    `;
  }

  showContact() {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
      <div class="contact-content">
        <span class="contact-close">&times;</span>
        <h3>Get In Touch</h3>
        <div class="contact-info">
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <div>
              <strong>Email</strong>
              <p>${this.contactInfo.email}</p>
            </div>
          </div>
          <div class="contact-item">
            <i class="fab fa-github"></i>
            <div>
              <strong>GitHub</strong>
              <a href="${this.contactInfo.github}" target="_blank">github.com/syfaarizal</a>
            </div>
          </div>
          <div class="contact-message">
            <p>${this.contactInfo.message}</p>
          </div>
        </div>
        <button class="contact-btn copy-email">
          <i class="fas fa-copy"></i> Copy Email
        </button>
      </div>
    `;

    document.body.appendChild(modal);
    modal.classList.add('show');

    // Close modal
    modal.querySelector('.contact-close').addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
      }
    });

    // Copy email functionality
    modal.querySelector('.copy-email').addEventListener('click', () => {
      navigator.clipboard.writeText(this.contactInfo.email)
        .then(() => this.showNotification('📧 Email copied to clipboard!', 'success'))
        .catch(() => this.showNotification('Failed to copy email', 'error'));
    });
  }

  subscribeNewsletter(email) {
    // Validate email
    if (!this.validateEmail(email)) {
      this.showNotification('Please enter a valid email address', 'error');
      return;
    }

    // Check if already subscribed
    if (this.subscribers.includes(email)) {
      this.showNotification('You are already subscribed!', 'info');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      this.subscribers.push(email);
      localStorage.setItem('sicoder_subscribers', JSON.stringify(this.subscribers));
      
      this.showNotification('🎉 Successfully subscribed to newsletter!', 'success');
      
      // Reset form
      const form = document.querySelector('.newsletter-form');
      if (form) form.reset();
    }, 1000);
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.sicoderApp = new SICODERApp();
  
  // Add CSS for notifications
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      background: var(--bg-secondary);
      border-left: 4px solid var(--accent-primary);
      box-shadow: 0 10px 25px var(--modal-shadow);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      z-index: 3000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      max-width: 350px;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification.success {
      border-color: var(--success);
    }
    
    .notification.error {
      border-color: var(--error);
    }
    
    .notification.info {
      border-color: var(--accent-primary);
    }
    
    .notification-close {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .contact-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: var(--modal-shadow);
      backdrop-filter: blur(10px);
      animation: fadeIn 0.3s ease;
    }
    
    .contact-content {
      background: var(--bg-secondary);
      border-radius: 20px;
      padding: 2rem;
      max-width: 400px;
      width: 100%;
      position: relative;
      animation: scaleIn 0.3s ease;
    }
    
    .contact-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-muted);
    }
    
    .contact-info {
      margin: 1.5rem 0;
    }
    
    .contact-item {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 1rem;
      padding: 1rem;
      background: var(--bg-tertiary);
      border-radius: 10px;
    }
    
    .contact-item i {
      color: var(--accent-primary);
      font-size: 1.2rem;
    }
    
    .contact-btn {
      width: 100%;
      padding: 1rem;
      background: var(--accent-primary);
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s;
    }
    
    .contact-btn:hover {
      background: var(--accent-secondary);
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(style);
});

// Global functions for HTML onclick attributes
function showContact() {
  if (window.sicoderApp) {
    window.sicoderApp.showContact();
  }
}

function showForgotPassword() {
  if (window.sicoderApp) {
    window.sicoderApp.showForgotPassword();
  }
}

function openDemoModal(type) {
  if (window.sicoderApp) {
    window.sicoderApp.openDemoModal(type);
  }
}

function closeDemoModal() {
  if (window.sicoderApp) {
    window.sicoderApp.closeDemoModal();
  }
}

function scrollToProjects() {
  if (window.sicoderApp) {
    window.sicoderApp.scrollToProjects();
  }
}