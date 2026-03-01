import { useMemo } from 'react';
import { ProjectCard } from './ProjectCard';
import { cardsData } from '../data/projects';
import type { CardData, FilterCategory, SortCriteria } from '../types';

interface GalleryProps {
  activeFilter: FilterCategory;
  sortCriteria: SortCriteria;
  searchQuery: string;
  onQuickView: (id: string) => void;
  onRequestDemo: (url: string) => void;
}

function getPopularityScore(card: CardData): number {
  let score = 0;
  if (card.badges.some(b => b.type === 'popular')) score += 3;
  if (card.badges.some(b => b.type === 'featured')) score += 2;
  if (card.badges.some(b => b.type === 'new')) score += 1;
  return score;
}

function getFeaturedScore(card: CardData): number {
  if (card.badges.some(b => b.type === 'featured')) return 3;
  if (card.badges.some(b => b.type === 'new')) return 2;
  if (card.badges.some(b => b.type === 'popular')) return 1;
  return 0;
}

function getDateScore(card: CardData): number {
  const monthMap: Record<string, number> = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
  };
  const parts = card.date.split(' ');
  const month = monthMap[parts[0]] || 0;
  const year = parseInt(parts[1]) || 2025;
  return new Date(year, month - 1).getTime();
}

export function Gallery({ activeFilter, sortCriteria, searchQuery, onQuickView, onRequestDemo }: GalleryProps) {
  const filtered = useMemo(() => {
    let cards = cardsData.filter(card => {
      const matchFilter =
        activeFilter === 'all' || card.categories.includes(activeFilter);
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        card.title.toLowerCase().includes(q) ||
        card.description.toLowerCase().includes(q) ||
        card.tags.some(t => t.toLowerCase().includes(q)) ||
        card.categories.some(c => c.includes(q));
      return matchFilter && matchSearch;
    });

    cards = [...cards].sort((a, b) => {
      if (sortCriteria === 'newest') return getDateScore(b) - getDateScore(a);
      if (sortCriteria === 'popular') return getPopularityScore(b) - getPopularityScore(a);
      return getFeaturedScore(b) - getFeaturedScore(a);
    });

    return cards;
  }, [activeFilter, sortCriteria, searchQuery]);

  return (
    <section className="gallery reveal">
      {filtered.map(card => (
        <ProjectCard
          key={card.id}
          card={card}
          onQuickView={onQuickView}
          onRequestDemo={onRequestDemo}
        />
      ))}
      {filtered.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            width: '100%',
            gridColumn: '1/-1',
            padding: '2rem',
            color: 'var(--text-secondary)',
          }}
        >
          No search results
        </div>
      )}
    </section>
  );
}
