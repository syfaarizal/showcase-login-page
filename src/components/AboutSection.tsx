export function AboutSection() {
  return (
    <section className="about-section reveal" id="about">
      <div className="about-content">
        <div className="about-text" data-aos="fade-right">
          <h2>Why <span className="accent">Login Pages?</span></h2>
          <p>
            The login page is often the first interaction users have with an application. It sets the tone
            for the entire experience. That's why I focus on creating login pages that are not just functional,
            but memorable.
          </p>
          <p>
            Each project in this collection solves specific design challenges while maintaining excellent
            user experience and modern coding practices.
          </p>
          <div className="about-stats">
            {[
              { value: '50+', label: 'Hours of Design' },
              { value: '1000+', label: 'Lines of Code' },
              { value: '4.8', label: 'Avg. Rating' },
            ].map(s => (
              <div key={s.label} className="stat-item">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-visual" data-aos="fade-left">
          <div className="code-snippet">
            <div className="code-header">
              <span className="code-dot red" />
              <span className="code-dot yellow" />
              <span className="code-dot green" />
              <span className="code-title">login-animation.js</span>
            </div>
            <pre><code>{`// Smooth login animation
function animateLogin(form) {
  form.style.transform = 'translateY(-10px)';
  form.style.boxShadow =
    '0 15px 30px rgba(126, 11, 11, 0.3)';
  
  setTimeout(() => {
    form.style.transform = 'translateY(0)';
    form.style.boxShadow =
      '0 5px 15px rgba(126, 11, 11, 0.2)';
  }, 300);
}`}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
}
