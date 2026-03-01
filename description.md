# SICODER Showcase — React + TypeScript + Tailwind + Vite

Implementasi ulang project SICODER Showcase dari vanilla HTML/CSS/JS ke React, TypeScript, Tailwind CSS, dan Vite — dengan struktur file yang rapi dan maintainable.

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

## 📁 Struktur File

```
src/
├── components/
│   ├── AboutSection.tsx      # Seksi about/kenapa login pages
│   ├── ContactModal.tsx      # Modal kontak
│   ├── DesignSection.tsx     # Seksi design philosophy
│   ├── FeaturesSection.tsx   # Auth gate demo form (fitur lengkap)
│   ├── FilterSection.tsx     # Filter & search gallery
│   ├── Footer.tsx            # Footer dengan newsletter
│   ├── Gallery.tsx           # Grid gallery dengan filtering & sorting
│   ├── Hero.tsx              # Hero section
│   ├── Navigation.tsx        # Navbar dengan theme toggle & mobile menu
│   ├── ParticleCanvas.tsx    # Particle system canvas
│   ├── ProjectCard.tsx       # Kartu project individual
│   └── ProjectModal.tsx      # Modal detail project
├── data/
│   └── projects.ts           # Data semua project & kartu
├── hooks/
│   ├── useAnimations.ts      # Scroll progress, tilt effect, mouse trail, dll
│   ├── useParticles.ts       # Particle system logic
│   ├── useScrollReveal.ts    # Reveal on scroll
│   └── useTheme.ts           # Dark/light theme toggle
├── styles/
│   ├── animations.css        # Animasi keyframes & efek (original)
│   ├── features.css          # Auth gate & features section (original)
│   ├── particles.css         # Particle canvas styles (original)
│   ├── responsive.css        # Responsive breakpoints (original)
│   └── style.css             # Base styles & CSS variables (original)
├── types/
│   └── index.ts              # TypeScript types & interfaces
├── App.tsx                   # Root component
└── main.tsx                  # Entry point
```

## 🎨 Catatan Desain

- **Semua CSS original dipertahankan** — tema, warna, dan CSS variables sama persis
- **Tailwind tersedia** tapi styling utama tetap via custom CSS untuk menjaga konsistensi desain
- **Fonts & Icons** dimuat via CDN di `index.html` (Google Fonts + Font Awesome)

## 🔑 Demo Login

- **Email:** `demo@sicoder.dev`
- **Password:** `SiCoder@2026`

## 📦 Assets

Salin folder `assets/` dari project original ke `public/assets/` agar gambar tampil:

```
public/
└── assets/
    └── img/
        ├── login-page-blackcat.png
        ├── login-page-panorama.png
        ├── login-page-basic-purple.png
        ├── review-bg-astronaut.png
        ├── review-login-signup-page.jpeg
        ├── login-page-red-rose.png
        ├── preview-otakore.png
        ├── cherry-cart-preview.jpeg
        ├── sicoder-logo.png
        └── favicon.ico
```
