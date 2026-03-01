export function DesignSection() {
  return (
    <section className="design-section reveal" id="design">
      <div className="section-header">
        <h2>Design <span className="accent">Philosophy</span></h2>
        <p>The principles that guide every project</p>
      </div>

      <div className="design-grid">
        {[
          { icon: 'fa-heart', title: 'User-Centered', desc: 'Every design starts with the user experience in mind. Clean, intuitive interfaces that feel natural.' },
          { icon: 'fa-bolt', title: 'Performance First', desc: 'Lightweight code with optimized animations ensures fast loading and smooth interactions.' },
          { icon: 'fa-palette', title: 'Aesthetic Excellence', desc: 'Balancing beauty with functionality through thoughtful color schemes and typography.' },
          { icon: 'fa-code', title: 'Clean Code', desc: "Maintainable, well-documented code that's easy to understand and modify." },
        ].map((card, i) => (
          <div key={card.title} className="design-card" data-aos="fade-up" data-aos-delay={String(i * 100)}>
            <div className="design-icon"><i className={`fas ${card.icon}`} /></div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="design-notes">
        <div className="note" data-aos="fade-right">
          <div className="note-header">
            <span className="note-emoji">✨</span>
            <h4>Before &amp; After</h4>
          </div>
          <p>
            <strong>Before:</strong> Plain, static forms with default styling.<br />
            <strong>After:</strong> Added micro-interactions, smooth animations, and premium aesthetics that engage users.
          </p>
        </div>
        <div className="note" data-aos="fade-left">
          <div className="note-header">
            <span className="note-emoji">🎨</span>
            <h4>Color Evolution</h4>
          </div>
          <p>
            <strong>Before:</strong> Basic color schemes with limited visual hierarchy.<br />
            <strong>After:</strong> Custom gradients, thoughtful color psychology, and dynamic theme switching.
          </p>
        </div>
      </div>
    </section>
  );
}
