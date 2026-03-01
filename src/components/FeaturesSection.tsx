import { useState, useRef, useEffect, useCallback } from 'react';

const DEMO_EMAIL = 'demo@sicoder.dev';
const DEMO_PW = 'SiCoder@2026';
const SESSION_KEY = 'sicoder_authed';
const PENDING_KEY = 'sicoder_pending_demo';

interface FeaturesProps {
  onRequestDemo: (url: string) => void;
  // expose isAuthed so Gallery can call demos directly
  onAuthChange?: (authed: boolean) => void;
}

type FieldState = 'idle' | 'error' | 'success';

function calcStrength(pw: string): { key: string; label: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { key: 'weak', label: 'Weak — too simple' };
  if (score <= 3) return { key: 'fair', label: 'Fair — getting stronger' };
  return { key: 'strong', label: 'Strong — great password!' };
}

function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

interface BadgeState {
  social: boolean; validation: boolean; toggle: boolean;
  strength: boolean; remember: boolean; loading: boolean; disabled: boolean;
}

export function FeaturesSection({ onRequestDemo, onAuthChange }: FeaturesProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [emailState, setEmailState] = useState<FieldState>('idle');
  const [emailMsg, setEmailMsg] = useState('');
  const [pwState, setPwState] = useState<FieldState>('idle');
  const [pwMsg, setPwMsg] = useState('');
  const [pwStrength, setPwStrength] = useState<{ key: string; label: string } | null>(null);
  const [showStrength, setShowStrength] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPw, setCopiedPw] = useState(false);
  const [btnLabel, setBtnLabel] = useState('Sign In');
  const [badges, setBadges] = useState<BadgeState>({
    social: false, validation: false, toggle: false,
    strength: false, remember: false, loading: false, disabled: true,
  });
  const [forgotToast, setForgotToast] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ title: string; msg: string; type: string } | null>(null);
  const notifTimer = useRef<ReturnType<typeof setTimeout>>();
  const cardRef = useRef<HTMLDivElement>(null);
  const [gatePulse, setGatePulse] = useState(false);

  const isAuthed = () => sessionStorage.getItem(SESSION_KEY) === 'true';

  useEffect(() => {
    if (isAuthed()) {
      setShowOverlay(true);
      setBadges(prev => ({ ...prev, social: true, validation: true, toggle: true, strength: true, remember: true, loading: true, disabled: true }));
      setOverlayUrl(sessionStorage.getItem(PENDING_KEY));
    }
    const saved = sessionStorage.getItem('sicoder_remember') === 'true';
    setRemember(saved);
    if (saved) setBadges(prev => ({ ...prev, remember: true }));
  }, []);

  const lightBadge = useCallback((key: keyof BadgeState, on = true) => {
    setBadges(prev => ({ ...prev, [key]: on }));
  }, []);

  const isFormValid = isValidEmail(email) && password.length >= 6;

  useEffect(() => {
    lightBadge('disabled', !isFormValid);
  }, [email, password, isFormValid, lightBadge]);

  const showNotif = useCallback((title: string, msg: string, type = 'info') => {
    setNotification({ title, msg, type });
    clearTimeout(notifTimer.current);
    notifTimer.current = setTimeout(() => setNotification(null), 6000);
  }, []);

  // Exposed for external callers (demo btn)
  const requestDemo = useCallback((url: string) => {
    if (isAuthed()) { window.open(url, '_blank', 'noopener'); return; }
    sessionStorage.setItem(PENDING_KEY, url);
    setOverlayUrl(url);
    const section = document.getElementById('features');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      showNotif('🔒 Sign in required', 'Fill out the demo login form below to open this demo page.', 'info');
      setGatePulse(true);
      setTimeout(() => setGatePulse(false), 800);
    }, 700);
  }, [showNotif]);

  // Register the requestDemo function on the window so Gallery can call it
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__authGateRequestDemo = requestDemo;
    (window as unknown as Record<string, unknown>).__authGateIsAuthed = isAuthed;
  }, [requestDemo]);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    setErrorBanner(null);
    if (!val) { setEmailState('idle'); setEmailMsg(''); }
    else if (isValidEmail(val)) { setEmailState('success'); setEmailMsg('Looks good!'); }
    else { setEmailState('error'); setEmailMsg('Please enter a valid email.'); }
    lightBadge('validation');
  };

  const handleEmailBlur = () => {
    if (!email) { setEmailState('error'); setEmailMsg('Email is required.'); }
  };

  const handlePwChange = (val: string) => {
    setPassword(val);
    setErrorBanner(null);
    if (!val) { setPwState('idle'); setPwMsg(''); setShowStrength(false); setPwStrength(null); }
    else {
      const s = calcStrength(val);
      setPwStrength(s);
      setShowStrength(true);
      if (val.length >= 6) { setPwState('success'); setPwMsg(''); }
      else { setPwState('error'); setPwMsg('Password must be at least 6 characters.'); }
    }
    lightBadge('toggle');
    lightBadge('strength');
  };

  const handleSocialClick = (provider: string) => {
    lightBadge('social');
    setTimeout(() => {
      setErrorBanner(`${provider} login requires a backend. Use email demo instead.`);
    }, 1400);
  };

  const handleSubmit = () => {
    if (!isFormValid || isLoading) return;
    setIsLoading(true);
    setBtnLabel('Signing in…');
    lightBadge('loading');

    setTimeout(() => {
      setIsLoading(false);
      if (email === DEMO_EMAIL && password === DEMO_PW) {
        setBtnLabel('✓ Access Granted');
        setIsSuccess(true);
        setPwState('success'); setPwMsg('Correct!');
        lightBadge('loading', false);
        sessionStorage.setItem(SESSION_KEY, 'true');
        if (onAuthChange) onAuthChange(true);
        const pending = sessionStorage.getItem(PENDING_KEY);
        setOverlayUrl(pending);
        setTimeout(() => {
          setShowOverlay(true);
          setBadges({ social: true, validation: true, toggle: true, strength: true, remember: true, loading: true, disabled: true });
        }, 600);
      } else {
        setBtnLabel('Sign In');
        if (email !== DEMO_EMAIL) { setEmailState('error'); setEmailMsg('No account found with this email.'); }
        else { setPwState('error'); setPwMsg('Incorrect password.'); if (password) setPwStrength(calcStrength(password)); setShowStrength(true); }
        setErrorBanner('Email or password is incorrect. <span style="opacity:.7">Hint: use the demo credentials on the left.</span>');
        lightBadge('loading', false);
        lightBadge('validation');
      }
    }, 1800);
  };

  const handleReset = () => {
    setShowOverlay(false);
    setIsSuccess(false);
    setBtnLabel('Sign In');
    setEmail(''); setPassword('');
    setEmailState('idle'); setEmailMsg('');
    setPwState('idle'); setPwMsg('');
    setShowStrength(false); setPwStrength(null);
    setErrorBanner(null);
    setOverlayUrl(null);
    setBadges({ social: false, validation: false, toggle: false, strength: false, remember: false, loading: false, disabled: true });
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(PENDING_KEY);
    if (onAuthChange) onAuthChange(false);
  };

  const copyToClipboard = (text: string, which: 'email' | 'pw') => {
    navigator.clipboard.writeText(text).then(() => {
      if (which === 'email') { setCopiedEmail(true); setTimeout(() => setCopiedEmail(false), 1500); }
      else { setCopiedPw(true); setTimeout(() => setCopiedPw(false), 1500); }
    });
  };

  const emailGroupClass = `auth-form-group${emailState === 'error' ? ' has-error' : emailState === 'success' ? ' has-success' : ''}`;
  const pwGroupClass = `auth-form-group${pwState === 'error' ? ' has-error' : pwState === 'success' ? ' has-success' : ''}`;

  return (
    <>
      {/* Gate Notification */}
      {notification && (
        <div className={`gate-notification show ${notification.type}`} id="gateNotification">
          <div className="gate-notif-icon">
            <i className={`fas ${notification.type === 'success' ? 'fa-circle-check' : notification.type === 'error' ? 'fa-circle-exclamation' : 'fa-lock'}`} />
          </div>
          <div className="gate-notif-body">
            <strong className="gate-notif-title">{notification.title}</strong>
            <span className="gate-notif-msg">{notification.msg}</span>
          </div>
          <button className="gate-notif-close" onClick={() => setNotification(null)}>
            <i className="fas fa-xmark" />
          </button>
        </div>
      )}

      <section className="features-section reveal" id="features">
        <div className="features-intro">
          {/* Left: intro text */}
          <div className="features-intro-text">
            <p className="features-eyebrow"><i className="fas fa-shield-halved" /> Production-Ready Auth UI</p>
            <h2>Try the Demo <span className="accent">Login</span></h2>
            <p className="features-desc">
              All production-ready auth UI features are packaged in one form: social login,
              real-time validation, password toggle, strength meter, remember me, loading state,
              and disabled state — all active.
            </p>

            <div className="features-credential-hint">
              <div className="credential-label">
                <i className="fas fa-circle-info" /> Demo credentials
              </div>
              <div className="credential-row">
                <span className="credential-key">Email</span>
                <code className="credential-val">{DEMO_EMAIL}</code>
                <button className={`copy-btn${copiedEmail ? ' copied' : ''}`} onClick={() => copyToClipboard(DEMO_EMAIL, 'email')}>
                  <i className={`fas ${copiedEmail ? 'fa-check' : 'fa-copy'}`} />
                </button>
              </div>
              <div className="credential-row">
                <span className="credential-key">Password</span>
                <code className="credential-val">{DEMO_PW}</code>
                <button className={`copy-btn${copiedPw ? ' copied' : ''}`} onClick={() => copyToClipboard(DEMO_PW, 'pw')}>
                  <i className={`fas ${copiedPw ? 'fa-check' : 'fa-copy'}`} />
                </button>
              </div>
            </div>

            <ul className="features-badge-list">
              {([
                ['badge-social', 'fa-share-nodes', 'Social Login', badges.social],
                ['badge-validation', 'fa-circle-check', 'Validation States', badges.validation],
                ['badge-toggle', 'fa-eye', 'Password Toggle', badges.toggle],
                ['badge-strength', 'fa-gauge-high', 'Strength Meter', badges.strength],
                ['badge-remember', 'fa-bookmark', 'Remember Me', badges.remember],
                ['badge-loading', 'fa-spinner', 'Loading State', badges.loading],
                ['badge-disabled', 'fa-ban', 'Disabled State', badges.disabled],
              ] as [string, string, string, boolean][]).map(([id, icon, label, lit]) => (
                <li key={id} id={id} className={`fbadge${lit ? ' lit' : ''}`}>
                  <i className={`fas ${icon}`} /> {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Auth Gate Card */}
          <div ref={cardRef} className={`auth-gate-card${gatePulse ? ' gate-pulse' : ''}`} id="authGateCard">
            {/* Success overlay */}
            <div className={`auth-success-overlay${showOverlay ? ' show' : ''}`} id="authSuccessOverlay">
              <div className="success-inner">
                <div className="success-icon-wrap"><i className="fas fa-unlock-keyhole" /></div>
                <h3>Access Granted</h3>
                <p>Welcome! You have successfully entered the showcase.</p>
                {overlayUrl ? (
                  <a
                    href="#"
                    className="auth-btn-success-cta"
                    onClick={e => { e.preventDefault(); window.open(overlayUrl, '_blank', 'noopener'); }}
                  >
                    <i className="fas fa-external-link-alt" /> Open Demo Now
                  </a>
                ) : (
                  <a href="#showcase" className="auth-btn-success-cta">
                    <i className="fas fa-arrow-down" /> See Showcase
                  </a>
                )}
                <button className="auth-reset-link" onClick={handleReset}>Reset demo</button>
              </div>
            </div>

            <div className="auth-gate-inner" id="authGateInner">
              <div className="auth-gate-header">
                <div className="auth-logo-mark"><i className="fas fa-code" /></div>
                <h3>Sign in to SICODER</h3>
                <p>Explore the full project showcase</p>
              </div>

              {/* Social buttons */}
              <div className="social-grid" id="socialGrid">
                <button className="social-btn google" onClick={() => handleSocialClick('Google')}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Google</span>
                </button>
                <button className="social-btn github" onClick={() => handleSocialClick('GitHub')}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>

              <div className="social-divider">or sign in with email</div>

              {/* Email field */}
              <div className={emailGroupClass} id="gate-email-group">
                <label htmlFor="gate-email">Email Address</label>
                <div className="auth-input-wrap">
                  <input
                    type="email" id="gate-email" className={`auth-input${emailState === 'error' ? ' is-error' : emailState === 'success' ? ' is-success' : ''}`}
                    placeholder="you@example.com" autoComplete="email"
                    value={email}
                    onChange={e => handleEmailChange(e.target.value)}
                    onBlur={handleEmailBlur}
                  />
                  <i className="fas fa-xmark-circle validation-icon icon-error" />
                  <i className="fas fa-circle-check validation-icon icon-success" />
                </div>
                {emailMsg && (
                  <span className={`field-message ${emailState}`}>
                    <i className={`fas ${emailState === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}`} /> {emailMsg}
                  </span>
                )}
                {!emailMsg && <span className="field-message" />}
              </div>

              {/* Password field */}
              <div className={pwGroupClass} id="gate-pw-group">
                <label htmlFor="gate-pw">Password</label>
                <div className="auth-input-wrap">
                  <input
                    type={showPw ? 'text' : 'password'} id="gate-pw"
                    className={`auth-input has-toggle${pwState === 'error' ? ' is-error' : pwState === 'success' ? ' is-success' : ''}`}
                    placeholder="Enter your password" autoComplete="current-password"
                    value={password}
                    onChange={e => handlePwChange(e.target.value)}
                  />
                  <button
                    type="button"
                    className={`pw-toggle-btn${showPw ? ' visible' : ''}`}
                    onClick={() => { setShowPw(p => !p); lightBadge('toggle'); }}
                  >
                    <i className="fas fa-eye" />
                    <i className="fas fa-eye-slash" />
                  </button>
                </div>
                {showStrength && pwStrength && (
                  <div className="pw-strength" id="gate-strength">
                    <div className="pw-strength-bar">
                      <div className="pw-strength-fill" id="gate-strength-fill" data-strength={pwStrength.key} />
                    </div>
                    <span className="pw-strength-label" id="gate-strength-label" data-strength={pwStrength.key}>
                      {pwStrength.label}
                    </span>
                  </div>
                )}
                {pwMsg && (
                  <span className={`field-message ${pwState}`}>
                    <i className="fas fa-exclamation-circle" /> {pwMsg}
                  </span>
                )}
                {!pwMsg && <span className="field-message" />}
              </div>

              {/* Remember + Forgot */}
              <div className="remember-row">
                <label className="custom-checkbox-wrap" htmlFor="gate-remember">
                  <input
                    type="checkbox" id="gate-remember"
                    checked={remember}
                    onChange={e => {
                      setRemember(e.target.checked);
                      sessionStorage.setItem('sicoder_remember', String(e.target.checked));
                      lightBadge('remember', e.target.checked);
                    }}
                  />
                  <span className="custom-checkbox"><i className="fas fa-check" /></span>
                  <span className="custom-checkbox-label">Remember me</span>
                </label>
                <a
                  href="#"
                  className="forgot-link"
                  onClick={e => {
                    e.preventDefault();
                    setForgotToast(true);
                    setTimeout(() => setForgotToast(false), 3000);
                  }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit button */}
              <button
                className={`auth-btn${isLoading ? ' is-loading' : ''}${isSuccess ? ' is-success' : ''}`}
                id="gateSubmitBtn"
                disabled={!isFormValid || isLoading}
                onClick={handleSubmit}
              >
                <span className="btn-spinner" />
                <span className="btn-label">{btnLabel}</span>
              </button>

              {/* Error banner */}
              {errorBanner && (
                <div className="auth-error-banner" id="authErrorBanner">
                  <i className="fas fa-circle-exclamation" />
                  <span dangerouslySetInnerHTML={{ __html: errorBanner }} />
                </div>
              )}

              <p className="auth-gate-footnote">This is a demo — no data is stored or transmitted.</p>

              {forgotToast && (
                <div className="forgot-toast show">
                  🔑 Hint: password is SiCoder@2026
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
