interface ContactModalProps {
  onClose: () => void;
}

export function ContactModal({ onClose }: ContactModalProps) {
  const email = 'syifairgi@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email).catch(() => {});
  };

  return (
    <div
      className="contact-modal show"
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem', background: 'var(--modal-shadow)', backdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.3s ease',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: 'var(--bg-secondary)', borderRadius: '20px', padding: '2rem',
          maxWidth: '400px', width: '100%', position: 'relative', animation: 'scaleIn 0.3s ease',
        }}
      >
        <span
          style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}
          onClick={onClose}
        >
          &times;
        </span>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Get In Touch</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
            <i className="fas fa-envelope" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }} />
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Email</strong>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>{email}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
            <i className="fab fa-github" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }} />
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>GitHub</strong>
              <a href="https://github.com/syfaarizal" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                github.com/syfaarizal
              </a>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>💬 Let's create something amazing together!</p>
        </div>
        <button
          onClick={copyEmail}
          style={{
            width: '100%', padding: '1rem', background: 'var(--accent-primary)', color: 'white',
            border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          }}
        >
          <i className="fas fa-copy" /> Copy Email
        </button>
      </div>
    </div>
  );
}
