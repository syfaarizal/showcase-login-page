# 🚀 SICODER Showcase

> **Crafting aesthetic login pages with modern code**

A beautiful, interactive showcase website for displaying login page designs with dark/light mode toggle, filtering system, and live demo functionality.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🌗 **Theme Toggle**
- **Smooth Dark/Light Mode Switch** with animated toggle button
- **Persistent Theme** - remembers user preference using localStorage
- **Color-Consistent Design** - maintains red color scheme across both themes
- **Animated Transitions** - smooth color transitions between themes

### 🎯 **Interactive Gallery**
- **Smart Filtering System** - filter projects by category (All, Minimalist, Dark Mode, Gradient Style)
- **Responsive Grid Layout** - 2 columns on desktop, 1 on mobile
- **Hover Effects** - smooth scaling and shadow effects
- **Live Demo Modal** - interactive login form demonstration

### 🎨 **Visual Effects**
- **Particle Trail System** - mouse-following particles that adapt to theme colors
- **Scroll Animations** - reveal animations for design notes section
- **Micro-interactions** - pulse effects on buttons and smooth transitions
- **Glassmorphism Effects** - modern backdrop blur and transparency

### 📱 **Responsive Design**
- **Mobile-First Approach** - optimized for all device sizes
- **Touch-Friendly** - proper touch targets and gestures
- **Flexible Grid** - adapts seamlessly from desktop to mobile

## 🛠️ Tech Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Custom properties (CSS Variables), Grid, Flexbox, Animations
- **Vanilla JavaScript** - No frameworks, pure JS for better performance
- **Canvas API** - For particle effects system
- **Intersection Observer API** - For scroll-triggered animations
- **Local Storage API** - For theme preference persistence

## 🎯 Demo Features

### Interactive Login Demo
- **Gradient Login Form** - Click "Live Demo" on the Gradient Login card
- **Form Validation** - Real-time input validation with visual feedback
- **Animation Effects** - Smooth form interactions and success states
- **Modal System** - Backdrop blur with click-outside-to-close functionality

## 🚀 Getting Started

### Quick Setup
1. **Clone or Download** the HTML file
2. **Open in Browser** - No build process required!
3. **Customize** - Edit colors, content, or add your own projects

### File Structure
```
sicoder-showcase/
├── index.html          # Main HTML file with embedded CSS & JS
├── README.md           # This documentation
└── assets/            
```

## 🎨 Customization

### Theme Colors
Easily customize colors by modifying CSS custom properties:

```css
:root {
  --accent-primary: #7e0b0b;    /* Primary red */
  --accent-secondary: #ff3b3b;  /* Secondary red */
  /* ... other variables */
}

[data-theme="light"] {
  --accent-primary: #c41e3a;    /* Light mode red */
  --accent-secondary: #dc3545;  /* Light mode secondary */
  /* ... other variables */
}
```

### Adding New Projects
Add new project cards by duplicating the card structure:

```html
<div class="card" data-category="your-category">
  <span class="badge">Your Badge</span>
  <img src="your-image.jpg" alt="Project Name">
  <div class="card-content">
    <h3>Project Name</h3>
    <p>Project description</p>
    <div class="tech-stack">HTML | CSS | JS</div>
    <div class="links">
      <a href="#" onclick="openDemo('project')">GitHub</a>
      <a href="#" onclick="openDemoModal()">Live Demo</a>
    </div>
  </div>
</div>
```

### Filter Categories
Update filter buttons and add corresponding `data-category` attributes:

```html
<button class="filter-btn" data-filter="new-category">New Category</button>
```

## 🌟 Key Components

### 1. Theme Toggle System
- **CSS Variables** for dynamic theming
- **Local Storage** integration
- **Smooth transitions** between themes
- **Icon switching** (🌙/☀️)

### 2. Particle System
- **Canvas-based** particle trail
- **Theme-aware colors** that change with dark/light mode
- **Performance optimized** with requestAnimationFrame
- **Mouse interaction** responsive

### 3. Modal Demo System
- **Backdrop blur** effect
- **Form validation** with visual feedback
- **Keyboard accessibility** (ESC to close)
- **Smooth animations** for open/close states

### 4. Filter & Animation System
- **Category-based filtering** with smooth transitions
- **Intersection Observer** for scroll animations
- **CSS transitions** for hover effects
- **Responsive grid** with CSS Grid

## 📱 Browser Support

- ✅ **Chrome** 88+
- ✅ **Firefox** 85+
- ✅ **Safari** 14+
- ✅ **Edge** 88+

### Required Features:
- CSS Custom Properties
- CSS Grid & Flexbox
- Intersection Observer API
- Local Storage API
- Canvas API

## 🔧 Performance Features

- **No External Dependencies** - Zero frameworks or libraries
- **Optimized Animations** - Uses transform and opacity for smooth 60fps
- **Lazy Loading Ready** - Structure supports easy image lazy loading
- **Minimal JS** - Efficient vanilla JavaScript implementation
- **CSS-First Approach** - Animations handled primarily with CSS

## 🎯 Use Cases

- **Portfolio Websites** - Showcase your login page designs
- **UI/UX Demos** - Present interactive design concepts
- **Client Presentations** - Professional project showcases
- **Learning Resource** - Study modern web development techniques
- **Template Base** - Starting point for similar showcase sites

## 📋 TODO / Roadmap

- [ ] Add more demo types (Registration, Reset Password)
- [ ] Implement image lazy loading
- [ ] Add project search functionality  
- [ ] Create admin panel for easy content management
- [ ] Add social media sharing buttons
- [ ] Implement contact form
- [ ] Add project rating/voting system

## 🤝 Contributing

Feel free to:
- **Submit Issues** - Report bugs or suggest features
- **Create Pull Requests** - Improve code or add features
- **Share Ideas** - Discuss new concepts or improvements
- **Spread the Word** - Share with other developers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**SICODER Team**
- Website: [sicoder.github.io](https://syfaarizal.github.io/sicoder-main-portfolio/)
- GitHub: syfaarizal
- Email: syifairgi@gmail.com

---

### 🌟 **"Crafting design, one login at a time."**

*Built with ❤️ for the developer community*