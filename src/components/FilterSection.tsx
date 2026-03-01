import type { FilterCategory, SortCriteria } from '../types';

interface FilterSectionProps {
  activeFilter: FilterCategory;
  onFilterChange: (f: FilterCategory) => void;
  onSortChange: (s: SortCriteria) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const filters: Array<{ value: FilterCategory; icon: string; label: string }> = [
  { value: 'all', icon: 'fa-layer-group', label: 'All Projects' },
  { value: 'minimalist', icon: 'fa-minimize', label: 'Minimalist' },
  { value: 'dark', icon: 'fa-moon', label: 'Dark Mode' },
  { value: 'gradient', icon: 'fa-palette', label: 'Gradient' },
  { value: 'premium', icon: 'fa-gem', label: 'Premium' },
];

export function FilterSection({
  activeFilter,
  onFilterChange,
  onSortChange,
  searchQuery,
  onSearchChange,
}: FilterSectionProps) {
  return (
    <section className="filter-section reveal" id="showcase">
      <div className="section-header">
        <h2>
          Project <span className="accent">Gallery</span>
        </h2>
        <p>Filter by style to find exactly what you're looking for</p>
      </div>

      <div
        className="search-container"
        style={{ marginBottom: '1.5rem', position: 'relative', maxWidth: '400px', marginInline: 'auto' }}
      >
        <i
          className="fas fa-search"
          style={{
            position: 'absolute', left: '15px', top: '50%',
            transform: 'translateY(-50%)', color: 'var(--text-muted)',
          }}
        />
        <input
          type="text"
          id="projectSearch"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 12px 12px 40px',
            borderRadius: '25px',
            border: '2px solid var(--border-color)',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            outline: 'none',
            transition: 'all 0.3s',
          }}
        />
      </div>

      <div className="filter-nav">
        {filters.map(f => (
          <button
            key={f.value}
            className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
            data-filter={f.value}
            onClick={() => onFilterChange(f.value)}
          >
            <i className={`fas ${f.icon}`} /> {f.label}
          </button>
        ))}
      </div>

      <div className="sort-controls">
        <span>Sort by:</span>
        <select
          id="sortSelect"
          onChange={e => onSortChange(e.target.value as SortCriteria)}
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </section>
  );
}
