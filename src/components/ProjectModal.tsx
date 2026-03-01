import { useEffect } from 'react';
import { projectData } from '../data/projects';

interface ProjectModalProps {
  projectId: string | null;
  onClose: () => void;
  onRequestDemo: (url: string) => void;
}

export function ProjectModal({ projectId, onClose, onRequestDemo }: ProjectModalProps) {
  const project = projectId ? projectData[projectId] : null;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    if (projectId) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; }
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [projectId, onClose]);

  if (!project || !projectId) return null;

  return (
    <div id="projectModal" className="project-modal show" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <div className="modal-body">
          <div className="project-details">
            <div className="project-header">
              <h2>{project.title}</h2>
              <div className="project-meta">
                <span className="meta-item"><i className="fas fa-calendar" /> {project.date}</span>
                <span className="meta-item"><i className="fas fa-code" /> {project.stats.linesOfCode} lines</span>
              </div>
            </div>

            <div className="project-content">
              <div className="project-section">
                <h3><i className="fas fa-info-circle" /> Project Overview</h3>
                <p>{project.longDescription}</p>
              </div>

              <div className="project-section">
                <h3><i className="fas fa-bullseye" /> Design Challenges &amp; Solutions</h3>
                <p><strong>Challenge:</strong> {project.challenges}</p>
              </div>

              <div className="project-grid">
                <div className="project-column">
                  <h3><i className="fas fa-star" /> Key Features</h3>
                  <ul className="feature-list">
                    {project.features.map((f, i) => (
                      <li key={i}><i className="fas fa-check" /> {f}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-column">
                  <h3><i className="fas fa-cogs" /> Technologies Used</h3>
                  <div className="tech-list">
                    {project.technologies.map((t, i) => (
                      <span key={i} className="tech-tag large">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="project-section">
                <h3><i className="fas fa-chart-bar" /> Project Stats</h3>
                <div className="stats-grid">
                  {[
                    { value: project.stats.linesOfCode, label: 'Lines of Code' },
                    { value: project.stats.developmentTime, label: 'Development Time' },
                    { value: project.stats.performanceScore, label: 'Performance Score' },
                    { value: project.stats.accessibility, label: 'Accessibility' },
                  ].map(s => (
                    <div key={s.label} className="stat-card">
                      <div className="stat-value">{s.value}</div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="project-section">
                <h3><i className="fas fa-lightbulb" /> Design Inspiration</h3>
                <p>{project.designInspiration}</p>
              </div>

              <div className="project-section">
                <h3><i className="fas fa-layer-group" /> Best Used For</h3>
                <div className="usecase-grid">
                  {project.useCases.map((uc, i) => (
                    <div key={i} className="usecase-item">
                      <div className="usecase-icon"><i className={`fas ${uc.icon}`} /></div>
                      <span className="usecase-label">{uc.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="project-actions">
                <a href={project.github} target="_blank" rel="noreferrer" className="action-btn primary">
                  <i className="fab fa-github" /> View Code on GitHub
                </a>
                <button
                  className="action-btn secondary modal-demo-btn"
                  onClick={() => { onClose(); onRequestDemo(project.demo); }}
                >
                  <i className="fas fa-external-link-alt" /> Live Demo
                </button>
                <button className="action-btn tertiary close-modal" onClick={onClose}>
                  <i className="fas fa-times" /> Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
