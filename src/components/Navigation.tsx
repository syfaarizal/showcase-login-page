import { useState, useEffect, useRef } from 'react';
import type { Theme } from '../types';

interface NavigationProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { href: '#showcase', label: 'Showcase' },
  { href: '#features', label: 'Features' },
  { href: '#design',   label: 'Design'   },
  { href: '#about',    label: 'About'    },
];

export function Navigation({ theme, onToggleTheme }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('showcase');
  const isClickScrollingRef = useRef(false);
  const clickScrollTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Track active section based on scroll position
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.slice(1));

    const getActiveSection = () => {
      if (isClickScrollingRef.current) return;

      const scrollY = window.scrollY;
      const windowH = window.innerHeight;

      // Walk sections — whichever top edge has passed 40% of the viewport wins
      let active = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY + windowH * 0.4 >= top) {
          active = id;
        }
      }

      // If scrolled to the very bottom, highlight last section
      const atBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50;
      if (atBottom) active = sectionIds[sectionIds.length - 1];

      setActiveSection(active);
    };

    getActiveSection();
    window.addEventListener('scroll', getActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', getActiveSection);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.slice(1);
    const el = document.getElementById(sectionId);

    if (el) {
      // Immediately move the underline on click — don't wait for scroll
      setActiveSection(sectionId);

      // Pause scroll-based detection while smooth scroll animates
      isClickScrollingRef.current = true;
      clearTimeout(clickScrollTimerRef.current);
      clickScrollTimerRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 900);

      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }

    setMenuOpen(false);
  };

  const scrollToProjects = () => {
    const el = document.getElementById('showcase');
    if (el) {
      setActiveSection('showcase');
      isClickScrollingRef.current = true;
      clearTimeout(clickScrollTimerRef.current);
      clickScrollTimerRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 900);
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
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
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={`nav-link${activeSection === href.slice(1) ? ' active' : ''}`}
            onClick={e => handleNavClick(e, href)}
          >
            {label}
          </a>
        ))}
        <button className="nav-cta" onClick={scrollToProjects}>
          Explore Projects
        </button>
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