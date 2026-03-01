export function Hero() {
  return (
    <header className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-line">
            Crafting <span className="accent">Aesthetic</span>
          </span>
          <span className="title-line">Login Experiences</span>
        </h1>
        <p className="hero-subtitle">
          Modern, interactive, and beautifully designed login pages built with clean code.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">8</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat">
            <span className="stat-number">4</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Interactive</span>
          </div>
        </div>
        <div className="hero-actions">
          <a href="#showcase" className="cta-btn primary">
            <i className="fas fa-eye" /> View Showcase
          </a>
          <a
            href="https://github.com/syfaarizal"
            target="_blank"
            rel="noreferrer"
            className="cta-btn secondary"
          >
            <i className="fab fa-github" /> Visit GitHub
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="floating-card">
          <div className="card-preview minimalist" />
          <div className="card-preview gradient" />
          <div className="card-preview dark" />
        </div>
      </div>
    </header>
  );
}
