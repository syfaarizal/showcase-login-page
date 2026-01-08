// Animation Controller
class AnimationController {
  constructor() {
    this.scrollProgress = document.querySelector('.progress-bar');
    this.backToTop = document.querySelector('.back-to-top');
    this.init();
  }

  init() {
    this.initScrollAnimations();
    this.initIntersectionObserver();
    this.initStaggeredAnimations();
    this.initParallax();
    this.bindEvents();
  }

  initScrollAnimations() {
    // Update progress bar
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      if (this.scrollProgress) {
        this.scrollProgress.style.width = scrollPercent + '%';
      }

      // Show/hide back to top button
      if (this.backToTop) {
        if (scrollTop > 500) {
          this.backToTop.classList.add('visible');
        } else {
          this.backToTop.classList.remove('visible');
        }
      }

      // Parallax effect for hero
      const hero = document.querySelector('.hero');
      if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          
          // Add staggered animation for child elements
          const children = entry.target.querySelectorAll('[data-aos-delay]');
          children.forEach((child, index) => {
            const delay = child.getAttribute('data-aos-delay') || index * 100;
            setTimeout(() => {
              child.classList.add('aos-animate');
            }, delay);
          });
        }
      });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
      observer.observe(el);
    });
  }

  initStaggeredAnimations() {
    // Animate tech tags on hover
    document.querySelectorAll('.tech-tag').forEach(tag => {
      tag.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'translateY(-3px) scale(1.1)';
        e.target.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
      });

      tag.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'translateY(0) scale(1)';
        e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
      });
    });

    // Animate filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.add('pulse');
        setTimeout(() => btn.classList.remove('pulse'), 300);
        
        // Animate cards
        document.querySelectorAll('.card').forEach(card => {
          card.style.animation = 'none';
          setTimeout(() => {
            card.style.animation = 'slideInUp 0.5s ease';
          }, 10);
        });
      });
    });
  }

  initParallax() {
    // Create parallax effect for floating cards
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.card-preview');
      cards.forEach(card => {
        const speed = card.classList.contains('minimalist') ? 0.02 :
                     card.classList.contains('gradient') ? 0.03 : 0.025;
        
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        card.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.5}deg)`;
      });
    });
  }

  bindEvents() {
    // Back to top button
    if (this.backToTop) {
      this.backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Utility function to create typing effect
  createTypingEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function typeWriter() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    
    typeWriter();
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const animations = new AnimationController();
  
  // Add typing effect to hero subtitle
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.classList.add('typing-text');
    setTimeout(() => {
      heroSubtitle.classList.remove('typing-text');
    }, text.length * 50 + 1000);
  }
});