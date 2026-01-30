// Project Details Modal
class ProjectModal {
  constructor() {
    this.modal = document.getElementById('projectModal');
    this.modalContent = this.modal.querySelector('.modal-body');
    this.closeBtn = this.modal.querySelector('.modal-close');
    this.projects = {
      blackcat: {
        title: "BlackCat Minimalist Login",
        description: "A sophisticated dark mode login page designed for optimal user experience with subtle animations and clean aesthetics.",
        longDescription: "This project was created to demonstrate how minimalism can be both beautiful and functional. The dark theme reduces eye strain while the smooth animations provide delightful feedback. Every interaction has been carefully crafted to feel natural and responsive.",
        features: [
          "Dark mode optimized for readability",
          "Smooth focus transitions on inputs",
          "Minimalist design with maximum impact",
          "Fully responsive across all devices",
          "Accessible with proper ARIA labels"
        ],
        challenges: "Creating sufficient contrast in dark mode while maintaining aesthetic appeal was the main challenge. Solved by using carefully selected shades and subtle glow effects.",
        technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "CSS Variables", "Flexbox/Grid"],
        date: "June 2025",
        github: "https://github.com/syfaarizal/css-login-button",
        demo: "https://syfaarizal.github.io/css-login-button/",
        designInspiration: "Inspired by modern productivity apps that prioritize focus and minimal distractions.",
        stats: {
          linesOfCode: 5697,
          developmentTime: "8 hours",
          performanceScore: "98/100",
          accessibility: "WCAG AA compliant"
        }
      },
      panorama: {
        title: "Panorama Gradient Login",
        description: "A vibrant login page featuring dynamic gradient backgrounds and glowing interactive elements.",
        longDescription: "This design explores the use of gradient backgrounds to create depth and visual interest. The glowing effects respond to user interactions, making the login process feel more engaging and modern.",
        features: [
          "Animated gradient background",
          "Glowing button effects on hover",
          "Real-time input validation",
          "Smooth transition animations",
          "Cross-browser compatible"
        ],
        challenges: "Achieving smooth gradient animations without performance issues. Solved by using CSS hardware acceleration and optimized gradient transitions.",
        technologies: ["HTML5", "CSS3", "JavaScript", "CSS Gradients", "CSS Animations"],
        date: "August 2025",
        github: "https://github.com/syfaarizal/login-page-panorama",
        demo: "https://syfaarizal.github.io/login-page-panorama/",
        designInspiration: "Inspired by sunset gradients and modern UI trends in web applications.",
        stats: {
          linesOfCode: 3184,
          developmentTime: "10 hours",
          performanceScore: "95/100",
          accessibility: "WCAG A compliant"
        }
      },
      'basic-purple': {
        title: "Basic Purple Minimalist",
        description: "A clean split-layout login page with strong typography and intuitive form interactions.",
        longDescription: "This project focuses on creating a balanced layout that guides users naturally through the login process. The split design allows for visual branding while maintaining focus on the form.",
        features: [
          "Split layout design",
          "Strong typographic hierarchy",
          "Seamless form validation",
          "Mobile-first responsive design",
          "Clean, accessible code"
        ],
        challenges: "Creating a responsive split layout that works well on mobile devices. Solved by using CSS Grid with fallbacks and thoughtful breakpoints.",
        technologies: ["HTML5", "CSS3", "JavaScript", "CSS Grid", "Responsive Design"],
        date: "September 2025",
        github: "https://github.com/syfaarizal/login-page-basic-purple",
        demo: "https://syfaarizal.github.io/login-page-basic-purple/",
        designInspiration: "Inspired by modern SaaS application interfaces that prioritize clarity and ease of use.",
        stats: {
          linesOfCode: 2362,
          developmentTime: "6 hours",
          performanceScore: "99/100",
          accessibility: "WCAG AA compliant"
        }
      },
      astronaut: {
        title: "Astronaut Premium Login",
        description: "A premium glassmorphism login page with cosmic theme and sophisticated animations.",
        longDescription: "This premium design experiment combines glassmorphism effects with space-themed aesthetics. The result is a login page that feels both futuristic and elegant, with subtle animations that enhance the premium feel.",
        features: [
          "Glassmorphism design effects",
          "Space-themed animations",
          "Premium hover interactions",
          "Custom cursor effects",
          "Performance optimized"
        ],
        challenges: "Implementing glassmorphism effects that work consistently across browsers. Solved by using backdrop-filter with fallbacks for unsupported browsers.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Backdrop-filter", "CSS Custom Properties"],
        date: "December 2025",
        github: "https://github.com/syfaarizal/astronaut-login-page",
        demo: "https://syfaarizal.github.io/astronaut-login-page/",
        designInspiration: "Inspired by space exploration interfaces and premium design systems.",
        stats: {
          linesOfCode: 1425,
          developmentTime: "4 hours",
          performanceScore: "92/100",
          accessibility: "WCAG A compliant"
        }
      },
      pink: {
        title: "Purple Pink Login & Signup UI",
        description: "A modern login and signup interface with a purple–pink gradient theme and smooth UI interactions.",
        longDescription: "This project focuses on building a clean and modern login & signup interface that feels premium without being overcomplicated. The purple–pink gradient gives the UI a strong visual identity, while responsive layouts ensure the experience stays consistent across desktop and mobile devices. Animations and transitions are applied subtly to enhance usability, not distract from it.",
        features: [
          "Responsive login & signup layout",
          "Purple–pink gradient theme",
          "Clean and readable form structure",
          "Subtle hover and transition effects",
          "Clear call-to-action buttons",
          "Mobile-friendly design"
        ],
        challenges: "Maintaining consistent gradients and layout behavior across desktop and mobile breakpoints without overcomplicating the CSS structure.",
        technologies: ["HTML5", "CSS3", "JavaScript", "CSS Gradients", "Responsive Design"],
        date: "January 2026",
        github: "https://github.com/syfaarizal/login-signup-page",
        demo: "https://syfaarizal.github.io/login-signup-page/",
        designInspiration: "Inspired by modern and clean UI, user-first layout, premium look without heavy assets, and easy integration into real products",
        stats: {
          linesOfCode: 1175,
          developmentTime: "8 hours",
          performanceScore: "Smooth & lightweight",
          accessibility: "WCAG A compliant"
        }
      },
      'red-rose': {
        title: "Red Rose Login Page",
        description: "A modern login page with a red rose theme and clean layout.",
        longDescription: "This project presents a visually appealing login page themed around the elegance of red roses. The design emphasizes simplicity and user-friendliness, ensuring that users can easily navigate the login process while enjoying the aesthetic elements inspired by roses.",
        features: [
          "Red rose theme",
          "Clean layout",
          "Responsive design",
          "Clear call-to-action buttons",
          "Smooth animations",
          "Cross-browser compatibility"
        ],
        challenges: "Creating a visually appealing login page with a red rose theme. Solved by using CSS gradients and animations to create depth and visual interest.",
        technologies: ["React", "Tailwind CSS", "Lucide React", "Responsive Design"],
        date: "January 2026",
        github: "https://github.com/syfaarizal/login-page-red",
        demo: "https://login-page-red-six.vercel.app/",
        designInspiration: "Inspired by modern UI trends and the elegance of red roses.",
        stats: {
          linesOfCode: 7321,
          developmentTime: "7 hours",
          performanceScore: "Smooth & lightweight",
          accessibility: "WCAG A compliant"
        }
      }
    };
    this.init();
  }

  init() {
    this.bindEvents();
    this.initQuickView();
  }

  bindEvents() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('show')) {
        this.close();
      }
    });
  }

  initQuickView() {
    document.querySelectorAll('.quick-view, .view-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const projectId = e.currentTarget.getAttribute('data-project');
        this.open(projectId);
      });
    });
  }

  open(projectId) {
    const project = this.projects[projectId];
    if (!project) return;

    this.renderProject(project);
    this.modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  renderProject(project) {
    this.modalContent.innerHTML = `
      <div class="project-details">
        <div class="project-header">
          <h2>${project.title}</h2>
          <div class="project-meta">
            <span class="meta-item">
              <i class="fas fa-calendar"></i> ${project.date}
            </span>
            <span class="meta-item">
              <i class="fas fa-code"></i> ${project.stats.linesOfCode} lines
            </span>
          </div>
        </div>

        <div class="project-content">
          <div class="project-section">
            <h3><i class="fas fa-info-circle"></i> Project Overview</h3>
            <p>${project.longDescription}</p>
          </div>

          <div class="project-section">
            <h3><i class="fas fa-bullseye"></i> Design Challenges & Solutions</h3>
            <p><strong>Challenge:</strong> ${project.challenges}</p>
          </div>

          <div class="project-grid">
            <div class="project-column">
              <h3><i class="fas fa-star"></i> Key Features</h3>
              <ul class="feature-list">
                ${project.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
              </ul>
            </div>

            <div class="project-column">
              <h3><i class="fas fa-cogs"></i> Technologies Used</h3>
              <div class="tech-list">
                ${project.technologies.map(tech => `<span class="tech-tag large">${tech}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="project-section">
            <h3><i class="fas fa-chart-bar"></i> Project Stats</h3>
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-value">${project.stats.linesOfCode}</div>
                <div class="stat-label">Lines of Code</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${project.stats.developmentTime}</div>
                <div class="stat-label">Development Time</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${project.stats.performanceScore}</div>
                <div class="stat-label">Performance Score</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${project.stats.accessibility}</div>
                <div class="stat-label">Accessibility</div>
              </div>
            </div>
          </div>

          <div class="project-section">
            <h3><i class="fas fa-lightbulb"></i> Design Inspiration</h3>
            <p>${project.designInspiration}</p>
          </div>

          <div class="project-actions">
            <a href="${project.github}" target="_blank" class="action-btn primary">
              <i class="fab fa-github"></i> View Code on GitHub
            </a>
            <a href="${project.demo}" target="_blank" class="action-btn secondary">
              <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
            <button class="action-btn tertiary close-modal">
              <i class="fas fa-times"></i> Close Details
            </button>
          </div>
        </div>
      </div>
    `;

    // Add event listener to close button in content
    this.modalContent.querySelector('.close-modal').addEventListener('click', () => this.close());
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProjectModal();
});