// ============================================================
//  Features Section — Unified Auth Login Gate Controller
//  Demo credentials: demo@sicoder.dev / SiCoder@2026
// ============================================================

class AuthGate {
  constructor() {
    this.DEMO_EMAIL    = 'demo@sicoder.dev';
    this.DEMO_PW       = 'SiCoder@2026';
    this.SESSION_KEY   = 'sicoder_authed';
    this.PENDING_KEY   = 'sicoder_pending_demo';

    // Form elements
    this.emailInput   = document.getElementById('gate-email');
    this.pwInput      = document.getElementById('gate-pw');
    this.submitBtn    = document.getElementById('gateSubmitBtn');
    this.emailGroup   = document.getElementById('gate-email-group');
    this.pwGroup      = document.getElementById('gate-pw-group');
    this.errorBanner  = document.getElementById('authErrorBanner');
    this.errorMsg     = document.getElementById('authErrorMsg');
    this.overlay      = document.getElementById('authSuccessOverlay');
    this.resetBtn     = document.getElementById('authResetBtn');
    this.strengthWrap = document.getElementById('gate-strength');
    this.strengthFill = document.getElementById('gate-strength-fill');
    this.strengthLbl  = document.getElementById('gate-strength-label');
    this.rememberBox  = document.getElementById('gate-remember');
    this.forgotLink   = document.getElementById('forgotLink');
    this.pwToggle     = document.querySelector('#gate-pw-group .pw-toggle-btn');

    if (!this.emailInput) return;

    this.init();
  }

  init() {
    this.bindDemoBtns();        // intercept all card Demo buttons
    this.bindEmail();
    this.bindPassword();
    this.bindSubmit();
    this.bindPasswordToggle();
    this.bindRemember();
    this.bindSocialBtns();
    this.bindCopyBtns();
    this.bindForgot();
    this.bindReset();
    this.bindRipple();
    this.restoreRemember();
    this.checkAlreadyAuthed(); // restore session if previously logged in
  }

  // Demo button intercept 
  bindDemoBtns() {
    document.querySelectorAll('.demo-gate-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = btn.getAttribute('data-demo-url');

        if (sessionStorage.getItem(this.SESSION_KEY) === 'true') {
          // Already authenticated — open demo directly
          window.open(url, '_blank', 'noopener');
          return;
        }

        // Store pending URL then scroll to the gate
        sessionStorage.setItem(this.PENDING_KEY, url);

        // Visually highlight the gate card with a pulse
        this.pulseGateCard();

        // Smooth scroll to #features
        const section = document.getElementById('features');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Update overlay CTA to open the specific pending demo
        this.updateOverlayCta(url);
      });
    });
  }

  pulseGateCard() {
    const card = document.getElementById('authGateCard');
    if (!card) return;
    card.classList.remove('gate-pulse');
    void card.offsetWidth; // reflow
    card.classList.add('gate-pulse');
    card.addEventListener('animationend', () => card.classList.remove('gate-pulse'), { once: true });
  }

  // Update the success overlay CTA to open the pending demo
  updateOverlayCta(url) {
    const cta = document.querySelector('.auth-btn-success-cta');
    if (!cta) return;
    if (url) {
      cta.setAttribute('href', '#');
      cta.setAttribute('data-pending-url', url);
      cta.onclick = (e) => {
        e.preventDefault();
        window.open(url, '_blank', 'noopener');
      };
      cta.innerHTML = '<i class="fas fa-external-link-alt"></i> Buka Demo Sekarang';
    } else {
      cta.setAttribute('href', '#showcase');
      cta.removeAttribute('data-pending-url');
      cta.onclick = null;
      cta.innerHTML = '<i class="fas fa-arrow-down"></i> Lihat Showcase';
    }
  }

  // Restore auth session — if already logged in, skip showing gate
  checkAlreadyAuthed() {
    if (sessionStorage.getItem(this.SESSION_KEY) === 'true') {
      this.showSuccessOverlay(false); // show overlay silently, no animation
    }
  }

  // ── Email live validation 
  bindEmail() {
    const emailMsg = this.emailGroup.querySelector('.field-message');

    this.emailInput.addEventListener('input', () => {
      this.hideError();
      const val = this.emailInput.value.trim();

      if (!val) {
        this.clearGroup(this.emailGroup, this.emailInput, emailMsg);
      } else if (this.isValidEmail(val)) {
        this.setSuccess(this.emailGroup, this.emailInput, emailMsg, 'Looks good!');
      } else {
        this.setError(this.emailGroup, this.emailInput, emailMsg, 'Please enter a valid email.');
      }
      this.updateSubmitState();
      this.lightBadge('badge-validation');
    });

    this.emailInput.addEventListener('blur', () => {
      if (!this.emailInput.value.trim()) {
        this.setError(this.emailGroup, this.emailInput, emailMsg, 'Email is required.');
        this.updateSubmitState();
      }
    });
  }

  isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  // ── Password: toggle + strength + validation 
  bindPassword() {
    const pwMsg = this.pwGroup.querySelector('.field-message');

    this.pwInput.addEventListener('input', () => {
      this.hideError();
      const val = this.pwInput.value;

      if (!val) {
        this.clearGroup(this.pwGroup, this.pwInput, pwMsg);
        this.hideStrength();
      } else {
        const s = this.calcStrength(val);
        this.showStrength(s);
        if (val.length >= 6) {
          this.setSuccess(this.pwGroup, this.pwInput, pwMsg, '');
        } else {
          this.setError(this.pwGroup, this.pwInput, pwMsg, 'Password must be at least 6 characters.');
        }
      }
      this.updateSubmitState();
      this.lightBadge('badge-toggle');
      this.lightBadge('badge-strength');
    });
  }

  calcStrength(pw) {
    let score = 0;
    if (pw.length >= 8)          score++;
    if (/[A-Z]/.test(pw))        score++;
    if (/[0-9]/.test(pw))        score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return { key: 'weak',   label: 'Weak — too simple'       };
    if (score <= 3) return { key: 'fair',   label: 'Fair — getting stronger' };
    return                 { key: 'strong', label: 'Strong — great password!' };
  }

  showStrength({ key, label }) {
    this.strengthWrap.style.display = 'block';
    this.strengthFill.setAttribute('data-strength', key);
    this.strengthLbl.setAttribute('data-strength', key);
    this.strengthLbl.textContent = label;
  }

  hideStrength() {
    this.strengthWrap.style.display = 'none';
    this.strengthFill.removeAttribute('data-strength');
    this.strengthLbl.removeAttribute('data-strength');
    this.strengthLbl.textContent = '';
  }

  // ── Password toggle 
  bindPasswordToggle() {
    if (!this.pwToggle) return;
    this.pwToggle.addEventListener('click', () => {
      const isText = this.pwInput.type === 'text';
      this.pwInput.type = isText ? 'password' : 'text';
      this.pwToggle.classList.toggle('visible', !isText);
      this.lightBadge('badge-toggle');
    });
  }

  // ── Remember me 
  bindRemember() {
    this.rememberBox.addEventListener('change', () => {
      sessionStorage.setItem('sicoder_remember', this.rememberBox.checked);
      this.lightBadge('badge-remember', this.rememberBox.checked);
    });
  }

  restoreRemember() {
    const saved = sessionStorage.getItem('sicoder_remember') === 'true';
    this.rememberBox.checked = saved;
    if (saved) this.lightBadge('badge-remember', true);
  }

  // ── Submit / Loading / Disabled 
  updateSubmitState() {
    const emailOk = this.isValidEmail(this.emailInput.value.trim());
    const pwOk    = this.pwInput.value.length >= 6;
    this.submitBtn.disabled = !(emailOk && pwOk);
    this.lightBadge('badge-disabled', !(emailOk && pwOk));
  }

  bindSubmit() {
    this.submitBtn.addEventListener('click', (e) => {
      if (this.submitBtn.disabled) return;
      this.addRipple(this.submitBtn, e);
      this.doLogin();
    });
  }

  doLogin() {
    const email = this.emailInput.value.trim();
    const pw    = this.pwInput.value;
    const label = this.submitBtn.querySelector('.btn-label');

    this.submitBtn.classList.add('is-loading');
    label.textContent = 'Signing in…';
    this.lightBadge('badge-loading');

    setTimeout(() => {
      this.submitBtn.classList.remove('is-loading');

      if (email === this.DEMO_EMAIL && pw === this.DEMO_PW) {
        // ── SUCCESS 
        label.textContent = '✓ Access Granted';
        this.submitBtn.classList.add('is-success');
        const pwMsg = this.pwGroup.querySelector('.field-message');
        this.setSuccess(this.pwGroup, this.pwInput, pwMsg, 'Correct!');
        this.lightBadge('badge-loading', false);

        // Persist auth in session
        sessionStorage.setItem(this.SESSION_KEY, 'true');

        // Update overlay CTA if there's a pending demo URL
        const pending = sessionStorage.getItem(this.PENDING_KEY);
        this.updateOverlayCta(pending || null);

        setTimeout(() => this.showSuccessOverlay(true), 600);

      } else {
        // ── WRONG CREDENTIALS 
        label.textContent = 'Sign In';

        if (email !== this.DEMO_EMAIL) {
          const emailMsg = this.emailGroup.querySelector('.field-message');
          this.setError(this.emailGroup, this.emailInput, emailMsg, 'No account found with this email.');
        } else {
          const pwMsg = this.pwGroup.querySelector('.field-message');
          this.setError(this.pwGroup, this.pwInput, pwMsg, 'Incorrect password.');
          this.showStrength(this.calcStrength(pw));
        }

        this.showError('Email or password is incorrect. <span style="opacity:.7">Hint: use the demo credentials on the left.</span>');
        this.submitBtn.disabled = true;
        this.lightBadge('badge-loading', false);
        this.lightBadge('badge-validation');

        setTimeout(() => {
          this.submitBtn.disabled = false;
          this.updateSubmitState();
        }, 2000);
      }
    }, 1800);
  }

  // ── Success overlay 
  showSuccessOverlay(animate = true) {
    if (!animate) {
      this.overlay.style.transition = 'none';
    }
    this.overlay.classList.add('show');
    if (!animate) {
      void this.overlay.offsetWidth;
      this.overlay.style.transition = '';
    }

    // Light all badges
    ['badge-social','badge-validation','badge-toggle','badge-strength',
     'badge-remember','badge-loading','badge-disabled'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('lit');
    });
  }

  // ── Reset 
  bindReset() {
    if (!this.resetBtn) return;
    this.resetBtn.addEventListener('click', () => {
      this.overlay.classList.remove('show');
      sessionStorage.removeItem(this.SESSION_KEY);
      sessionStorage.removeItem(this.PENDING_KEY);

      this.emailInput.value = '';
      this.pwInput.value    = '';
      this.pwInput.type     = 'password';
      if (this.pwToggle) this.pwToggle.classList.remove('visible');

      this.clearGroup(this.emailGroup, this.emailInput,
        this.emailGroup.querySelector('.field-message'));
      this.clearGroup(this.pwGroup, this.pwInput,
        this.pwGroup.querySelector('.field-message'));

      this.hideStrength();
      this.hideError();

      const label = this.submitBtn.querySelector('.btn-label');
      label.textContent = 'Sign In';
      this.submitBtn.classList.remove('is-success');
      this.submitBtn.disabled = true;

      // Reset overlay CTA back to default
      this.updateOverlayCta(null);

      document.querySelectorAll('.fbadge').forEach(b => b.classList.remove('lit'));
    });
  }

  // ── Social buttons 
  bindSocialBtns() {
    document.querySelectorAll('#socialGrid .social-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const provider = btn.getAttribute('data-provider');
        btn.classList.add('is-loading-social');
        const span = btn.querySelector('span');
        const orig = span ? span.textContent : '';
        if (span) span.textContent = `Opening ${provider}…`;
        this.lightBadge('badge-social');

        setTimeout(() => {
          btn.classList.remove('is-loading-social');
          if (span) span.textContent = orig;
          this.showError(`${provider} login requires a backend. Use email demo instead.`);
        }, 1400);
      });
    });
  }

  // ── Copy buttons 
  bindCopyBtns() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy');
        navigator.clipboard.writeText(text).then(() => {
          btn.classList.add('copied');
          const icon = btn.querySelector('i');
          if (icon) icon.className = 'fas fa-check';
          setTimeout(() => {
            btn.classList.remove('copied');
            if (icon) icon.className = 'fas fa-copy';
          }, 1500);
        }).catch(() => {});
      });
    });
  }

  // ── Forgot password 
  bindForgot() {
    if (!this.forgotLink) return;
    const card = document.getElementById('authGateCard');
    this.forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      let toast = card.querySelector('.forgot-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'forgot-toast';
        toast.textContent = '🔑 Hint: password is SiCoder@2026';
        card.appendChild(toast);
      }
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    });
  }

  // ── Ripple 
  bindRipple() {
    document.querySelectorAll('.auth-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.addRipple(btn, e));
    });
  }

  addRipple(btn, e) {
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    Object.assign(ripple.style, {
      width:  `${size}px`,
      height: `${size}px`,
      left:   `${e.clientX - rect.left  - size / 2}px`,
      top:    `${e.clientY - rect.top   - size / 2}px`,
    });
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  // ── Error banner 
  showError(html) {
    this.errorBanner.style.display = 'flex';
    this.errorMsg.innerHTML = html;
    this.errorBanner.style.animation = 'none';
    void this.errorBanner.offsetWidth;
    this.errorBanner.style.animation = '';
  }

  hideError() { this.errorBanner.style.display = 'none'; }

  // ── Badge helpers 
  lightBadge(id, on = true) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('lit', on);
  }

  // ── Validation helpers 
  setError(group, input, msg, text) {
    group.classList.remove('has-success');
    group.classList.add('has-error');
    input.classList.remove('is-success');
    input.classList.add('is-error');
    if (msg && text) {
      msg.className = 'field-message error';
      msg.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${text}`;
    }
  }

  setSuccess(group, input, msg, text) {
    group.classList.remove('has-error');
    group.classList.add('has-success');
    input.classList.remove('is-error');
    input.classList.add('is-success');
    if (msg) {
      msg.className = 'field-message success';
      msg.innerHTML = text ? `<i class="fas fa-check-circle"></i> ${text}` : '';
    }
  }

  clearGroup(group, input, msg) {
    group.classList.remove('has-error', 'has-success');
    input.classList.remove('is-error', 'is-success');
    if (msg) { msg.className = 'field-message'; msg.innerHTML = ''; }
  }
}

document.addEventListener('DOMContentLoaded', () => new AuthGate());