# SICODER Showcase

A curated collection of beautifully crafted login page designs — built with modern code and interactive aesthetics.

---

## What is this?

SICODER Showcase is a personal portfolio project that displays a collection of login page UIs I've designed and built from scratch. Each project in the gallery represents a different design direction — minimalist, dark mode, gradient, and premium — all with real demos you can explore directly.

The showcase itself acts as a meta-design: a portfolio site that demonstrates what I can do, through the very medium I'm talking about.

---

## Why this project exists

The login page is almost always the **first screen** a user sees when they open an application. Yet it's also the most commonly neglected in terms of design quality — most developers treat it as a formality rather than an opportunity.

I built this project to challenge that. Every login page in this collection is intentionally crafted with a specific design goal, whether that's reducing visual noise, creating emotional impact through color, or delivering a premium feel through micro-interactions.

This showcase exists to prove that functional doesn't have to mean boring.

---

## Why React + TypeScript + Vite?

The original project was built in **vanilla HTML, CSS, and JavaScript** — and it worked well. But as the project grew, a few pain points became obvious:

- **Scalability** — adding a new project card meant duplicating large blocks of HTML by hand. With React, a single component handles all cards from a central data file.
- **State management** — things like the active filter, search query, theme toggle, and auth gate state were being managed through scattered DOM manipulations. React's state model makes this clean and predictable.
- **Maintainability** — splitting the codebase into focused components (Navigation, Gallery, FeaturesSection, etc.) means any part of the UI can be updated without touching everything else.
- **TypeScript** catches mistakes at compile time rather than runtime — especially useful for managing project data structures and component props.
- **Vite** provides near-instant hot module replacement during development, which makes the iteration cycle significantly faster.

The visual design, colors, animations, and CSS were kept **exactly as-is** from the original. This was a migration for developer experience, not a redesign.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Styling | Custom CSS (original) + Tailwind CSS |
| Build Tool | Vite |
| Icons | Font Awesome 6 |
| Fonts | Google Fonts — Poppins, Space Grotesk |

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/syfaarizal/sicoder-showcase.git
cd sicoder-showcase

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other commands

```bash
npm run build    # Production build
npm run preview  # Preview the production build locally
```

---

## Assets Setup

After cloning, copy your `assets/img/` folder into `public/assets/img/` so all project preview images load correctly. The images are not included in this repository.

---

## Demo Login

The Features section includes a fully interactive auth UI demo. Use these credentials to explore it:

| Field | Value |
|---|---|
| Email | `demo@sicoder.dev` |
| Password | `SiCoder@2026` |

This is a frontend-only demo. No data is stored or transmitted anywhere.

---

## Projects in the Gallery

| Project | Style | Stack |
|---|---|---|
| BlackCat Minimalist | Dark / Minimalist | HTML, CSS, JS |
| Panorama Gradient | Gradient | HTML, CSS, JS |
| Basic Purple | Minimalist | HTML, CSS, JS |
| Astronaut Premium | Premium / Glassmorphism | HTML, CSS, JS |
| Purple Pink Login & Signup | Premium / Gradient | HTML, CSS, JS |
| Red Rose Login & Signup | Dark / Minimalist | React, Tailwind |
| Otakore Login & Signup | Premium / Gradient | HTML, CSS, JS |
| Cherry Cart Login & Signup | Premium / Minimalist | React, Tailwind, Vite |

---

## License

All designs and code in this repository are open source. Feel free to use, modify, or learn from anything here — just give credit where it's due.

---

## Author

**Syifa F.A** — [@syfaarizal](https://github.com/syfaarizal)

> *"Crafting design, one login at a time."*