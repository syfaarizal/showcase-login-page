import { useState } from 'react';
import type { Theme } from '../types';

interface NavigationProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Navigation({ theme, onToggleTheme }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToProjects = () => {
    const el = document.getElementById('showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href !== '#') {
      const el = document.querySelector(href);
      if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <h1>
          SICO<span className="dot">DER</span>
          <span className="accent">.</span>
        </h1>
      </div>

      <div className={`nav-links${menuOpen ? ' show' : ''}`}>
        <a href="#showcase" className="nav-link active" onClick={handleNavClick}>Showcase</a>
        <a href="#features" className="nav-link" onClick={handleNavClick}>Features</a>
        <a href="#design" className="nav-link" onClick={handleNavClick}>Design</a>
        <a href="#about" className="nav-link" onClick={handleNavClick}>About</a>
        <button className="nav-cta" onClick={scrollToProjects}>Explore Projects</button>
      </div>

      <button
        className={`menu-toggle${menuOpen ? ' active' : ''}`}
        onClick={() => setMenuOpen(prev => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`theme-toggle${theme === 'light' ? ' active' : ''}`}
        id="themeToggle"
        onClick={onToggleTheme}
      >
        <div className="switch" id="themeSwitch">
          <div className="slider">
            <i className="fas fa-moon" />
            <i className="fas fa-sun" />
          </div>
        </div>
      </div>
    </nav>
  );
}
