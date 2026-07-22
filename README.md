# 👋 Hi, I'm Thiago Ibrahim

> Software Engineering Student from Brazil 🇧🇷

I enjoy building real-world software while continuously improving my programming and problem-solving skills.

Currently focused on:

<<<<<<< HEAD
- ☕ Java
- 🐍 Python
- 🌐 Backend Development
- 🤖 Artificial Intelligence
- 🧠 Software Engineering
=======
## Features

- **Cinematic Hero** — Mouse parallax, animated portrait, rotating titles, premium CTA buttons
- **Active Section Navigation** — Smooth scroll spy with animated indicator
- **Background Atmosphere** — Subtle dot grid, noise texture, floating light orbs
- **About Section** — Premium info blocks with stagger reveal animations
- **Current Status Dashboard** — Widget-style cards with color-coded indicators
- **Projects Case Studies** — Expandable details (architecture, challenges, lessons, future)
- **Skills Matrix** — Categorized cards with learning status badges (no fake percentages)
- **Learning Journey** — 7-milestone animated timeline with scroll reveals
- **GitHub Integration** — Live API data (profile, repos, stats, languages, contribution summary)
- **Contact Form** — Client-side validation, animated loading/success states
- **Internationalization** — Instant language switching (PT/EN/ES) with animated transitions
- **Micro-interactions** — Card hovers, button presses, link effects across all components
- **Responsive Design** — Handcrafted for desktop, laptop, tablet, mobile, and ultra-wide

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework |
| React 19 | UI Library |
| TypeScript | Type Safety |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |

## Installation

```bash
# Clone the repository
git clone https://github.com/ThiagoIbrahimVieira/developer-portfolio.git

# Navigate to the project
cd developer-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles + Tailwind theme
│   ├── layout.tsx           # Root layout (metadata, SEO, providers)
│   ├── page.tsx             # Home page (section composition)
│   └── not-found.tsx        # Custom 404 page
├── components/
│   ├── ui/                  # Reusable animation components
│   │   ├── FadeIn.tsx       # Fade-in animation wrapper
│   │   ├── SlideIn.tsx      # Slide-in animation wrapper
│   │   └── StaggerChildren.tsx  # Staggered children animation
│   ├── Navbar.tsx           # Navigation with active indicator
│   ├── Hero.tsx             # Cinematic hero with parallax
│   ├── About.tsx            # About section with info blocks
│   ├── CurrentStatus.tsx    # Dashboard-style status widgets
│   ├── Projects.tsx         # SaaS case study project cards
│   ├── Skills.tsx           # Categorized skill matrix
│   ├── LearningJourney.tsx  # Animated timeline
│   ├── GitHubSection.tsx    # Live GitHub API integration
│   ├── Contact.tsx          # Validated contact form
│   ├── Footer.tsx           # Site footer
│   └── GithubIcon.tsx       # Custom GitHub SVG icon
├── hooks/
│   ├── useActiveSection.ts  # IntersectionObserver scroll spy
│   └── useGitHub.ts         # GitHub API data fetching hook
├── i18n/
│   ├── en.json              # English translations
│   ├── pt.json              # Portuguese translations
│   └── es.json              # Spanish translations
└── lib/
    ├── i18n.ts              # i18n utility and locale config
    ├── LanguageContext.tsx   # React Context for language state
    └── utils.ts             # cn() utility (clsx + tailwind-merge)
```

## Internationalization

Three languages supported with instant switching:
- **Portuguese (PT)** — Default
- **English (EN)**
- **Spanish (ES)**

Language persists in localStorage and updates the HTML `lang` attribute.

## GitHub Integration

The GitHub section fetches real data from the GitHub API:
- Profile information (avatar, bio, stats)
- Repository list with stars, language, and last update
- Top languages breakdown
- Total stars across all repositories
- Data cached for 10 minutes to reduce API calls

## Performance

- Framer Motion animations triggered on scroll (not on load)
- Image lazy loading
- GitHub data caching
- Tailwind CSS purging
- Static generation with Next.js

## Deployment

This project is deployed via GitHub Actions to a static hosting provider.

```bash
# Build for production
npm run build

# Preview production build
npm run start
```

## Author

**Thiago Ibrahim** — Software Developer

- GitHub: [@ThiagoIbrahimVieira](https://github.com/ThiagoIbrahimVieira)
- Website: [thiagoibrahim.dev](https://thiagoibrahim.dev)

## Version History

- **v2.0** — Complete redesign with cinematic hero, Framer Motion animations, GitHub API integration, premium micro-interactions, and i18n support
- **v1.0** — Initial portfolio with HTML/CSS/JavaScript
>>>>>>> 7c14683 (fix: QA polish — i18n, accessibility, dead code removal, security headers)

---

# 🚀 About this Portfolio

This portfolio represents my learning journey as a developer.

Instead of only showing finished projects, my goal is to document my evolution, share what I'm building, and improve with every new project.

Everything here is part of my growth as a future Software Engineer.

---

# 💻 Technologies

### Languages

- Java
- Python
- TypeScript
- JavaScript

### Frontend

- Next.js
- React
- HTML
- CSS
- Tailwind CSS

### Backend

- FastAPI
- REST APIs

### Tools

- Git
- GitHub
- VS Code
- Framer Motion

---

# 📂 Featured Projects

## 🎤 InterviewAI

AI-powered interview simulator built for practicing job interviews.

Features:

- Speech Recognition
- AI Responses
- Interview Dashboard
- Interview History
- Real-time Communication
- Modern UI

Status:

🚧 Currently under development

---

More projects will be added as I continue learning.

---

# 📈 Current Learning

Currently studying:

- Object-Oriented Programming
- Backend Development
- Python
- Artificial Intelligence
- Software Engineering

Next goals:

- Spring Boot
- Docker
- SQL
- Cloud

---

# 🌍 Portfolio

You can explore my portfolio to learn more about me, my projects, and my development journey.

---

# 📫 Contact

GitHub

https://github.com/ThiagoIbrahimVieira

LinkedIn

(Coming Soon)

Email

(Add later)

---

# 🎯 Goals

My objective is to become a Software Engineer capable of building scalable, high-quality software while continuously learning new technologies.

---

# ⭐ Philosophy

I believe consistency beats perfection.

Every project I build teaches me something new.

This repository is part of that journey.
