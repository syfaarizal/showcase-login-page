import { useState } from 'react';

interface FooterProps {
  onShowContact: () => void;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function Footer({ onShowContact }: FooterProps) {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) { setMsg('Please enter a valid email.'); return; }
    setMsg('🎉 Successfully subscribed!');
    setEmail('');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <h3 className="accent">SICODER</h3>
          <p className="footer-tagline">"Crafting design, one login at a time."</p>
          <div className="footer-social">
            <a href="https://github.com/syfaarizal" className="social-link" target="_blank" rel="noreferrer">
              <i className="fab fa-github" />
            </a>
            <a href="https://www.linkedin.com/in/syifaarizal/" className="social-link" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin" />
            </a>
            <a href="https://instagram.com/syfaarizal" className="social-link" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram" />
            </a>
            <a href="#" className="social-link" onClick={e => { e.preventDefault(); onShowContact(); }}>
              <i className="fas fa-envelope" />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="#showcase">Showcase</a>
          <a href="#design">Design Philosophy</a>
          <a href="#about">About</a>
          <a href="#" onClick={e => { e.preventDefault(); onShowContact(); }}>Contact</a>
        </div>

        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>Get notified about new projects and design tips.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-paper-plane" />
            </button>
          </form>
          {msg && <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{msg}</p>}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 SICODER. All designs and code are open source.</p>
        <p className="footer-note">
          Made with <i className="fas fa-heart" /> by Syifa F.A
        </p>
      </div>
    </footer>
  );
}
