import { useState, useRef } from 'react';

// Styles (original CSS preserved verbatim)
import './styles/animations.css';
import './styles/particles.css';
import './styles/features.css';
import './styles/style.css';
import './styles/responsive.css';

// Components
import { ParticleCanvas } from './components/ParticleCanvas';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { FilterSection } from './components/FilterSection';
import { Gallery } from './components/Gallery';
import { FeaturesSection } from './components/FeaturesSection';
import { DesignSection } from './components/DesignSection';
import { AboutSection } from './components/AboutSection';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

// Hooks
import { useTheme } from './hooks/useTheme';
import { useScrollReveal } from './hooks/useScrollReveal';
import {
  useScrollProgress,
  useIntersectionObserver,
  useTiltEffect,
  useMouseTrail,
  useSmoothScroll,
} from './hooks/useAnimations';

import type { FilterCategory, SortCriteria } from './types';

function App() {
  const { theme, toggleTheme } = useTheme();

  // Scroll / animation hooks
  useScrollReveal();
  const { progressRef, backToTopRef } = useScrollProgress();
  useIntersectionObserver();
  useTiltEffect();
  useMouseTrail();
  useSmoothScroll();

  // Gallery state
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [showContact, setShowContact] = useState(false);

  // Auth state (for demo gate coordination)
  const [isAuthed, setIsAuthed] = useState(
    () => sessionStorage.getItem('sicoder_authed') === 'true'
  );

  // Request demo — delegates to FeaturesSection auth gate or opens directly
  const handleRequestDemo = (url: string) => {
    if (isAuthed) {
      window.open(url, '_blank', 'noopener');
    } else {
      // Call the auth gate function registered by FeaturesSection
      const fn = (window as unknown as Record<string, unknown>).__authGateRequestDemo;
      if (typeof fn === 'function') (fn as (url: string) => void)(url);
    }
  };

  return (
    <>
      {/* Floating background shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="shape shape-4" />
      </div>

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Scroll progress bar */}
      <div className="progress-container">
        <div className="progress-bar" ref={progressRef} />
      </div>

      {/* Navigation */}
      <Navigation theme={theme} onToggleTheme={toggleTheme} />

      {/* Main content */}
      <Hero />

      <FilterSection
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onSortChange={setSortCriteria}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Gallery
        activeFilter={activeFilter}
        sortCriteria={sortCriteria}
        searchQuery={searchQuery}
        onQuickView={setOpenProjectId}
        onRequestDemo={handleRequestDemo}
      />

      <FeaturesSection
        onRequestDemo={handleRequestDemo}
        onAuthChange={setIsAuthed}
      />

      <DesignSection />
      <AboutSection />

      {/* Modals */}
      {openProjectId && (
        <ProjectModal
          projectId={openProjectId}
          onClose={() => setOpenProjectId(null)}
          onRequestDemo={handleRequestDemo}
        />
      )}

      {/* Demo modal (legacy — kept for structural parity) */}
      <div id="demoModal" className="demo-modal">
        <div className="demo-content">
          <span className="close-demo">&times;</span>
          <div className="demo-header">
            <h3>Interactive Demo</h3>
            <p>Experience the login flow with sample credentials</p>
          </div>
          <div className="demo-body">
            <div className="demo-preview" />
            <div className="demo-info">
              <h4>Demo Credentials</h4>
              <p><strong>Username:</strong> demo@example.com</p>
              <p><strong>Password:</strong> password123</p>
              <div className="demo-tips">
                <h5>Design Features:</h5>
                <ul>
                  <li><i className="fas fa-check" /> Smooth input animations</li>
                  <li><i className="fas fa-check" /> Real-time validation</li>
                  <li><i className="fas fa-check" /> Responsive design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer onShowContact={() => setShowContact(true)} />

      {/* Back to top */}
      <button
        className="back-to-top"
        ref={backToTopRef}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img src="/public/images/sicoder-logo.png" alt="SICODER Logo" />
      </button>

      {/* Contact modal */}
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </>
  );
}

export default App;
