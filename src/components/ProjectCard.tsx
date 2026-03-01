import type { CardData } from '../types';

interface ProjectCardProps {
  card: CardData;
  onQuickView: (id: string) => void;
  onRequestDemo: (url: string) => void;
}

const badgeClass: Record<string, string> = {
  dark: 'dark',
  minimalist: 'minimalist',
  gradient: 'gradient',
  premium: 'premium',
  new: 'new',
  popular: 'popular',
  featured: 'featured',
};

export function ProjectCard({ card, onQuickView, onRequestDemo }: ProjectCardProps) {
  return (
    <div className="card active" data-category={card.categories.join(' ')} data-id={card.id}>
      <div className="card-badge">
        {card.badges.map((b, i) => (
          <span key={i} className={`badge ${badgeClass[b.type] || ''}`}>
            {b.label}
          </span>
        ))}
      </div>

      <div className="card-image">
        <img src={card.imageSrc} alt={card.imageAlt} loading="lazy" />
        <div className="card-overlay">
          <button className="quick-view" data-project={card.id} onClick={() => onQuickView(card.id)}>
            <i className="fas fa-expand" /> Quick View
          </button>
        </div>
      </div>

      <div className="card-content">
        <h3>{card.title}</h3>
        <p className="card-desc">{card.description}</p>

        <div className="card-meta">
          <span className="meta-item">
            <i className="fas fa-code" /> {card.tech}
          </span>
          <span className="meta-item">
            <i className="fas fa-calendar" /> {card.date}
          </span>
        </div>

        <div className="tech-stack">
          {card.tags.map((tag, i) => (
            <span key={i} className="tech-tag">{tag}</span>
          ))}
        </div>

        <div className="card-actions">
          <button className="action-btn view-details" data-project={card.id} onClick={() => onQuickView(card.id)}>
            <i className="fas fa-info-circle" /> Details
          </button>
          <a href={card.github} className="action-btn github" target="_blank" rel="noreferrer">
            <i className="fab fa-github" /> Code
          </a>
          <button
            className="action-btn demo demo-gate-btn"
            data-demo-url={card.demoUrl}
            onClick={() => onRequestDemo(card.demoUrl)}
          >
            <i className="fas fa-external-link-alt" /> Demo
          </button>
        </div>
      </div>
    </div>
  );
}
