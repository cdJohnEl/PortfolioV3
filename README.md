# Chimdike John — Portfolio & Academic Planner

> A personal portfolio website and interactive academic task planner built with vanilla HTML, CSS, and JavaScript — submitted as a COS 106 project at MIVA Open University.

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Pages](#pages)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [JavaScript Modules](#javascript-modules)
- [Accessibility](#accessibility)
- [Getting Started](#getting-started)
- [Featured Projects](#featured-projects)
- [Academic Context](#academic-context)
- [Author](#author)

---

## Overview

This project is a multi-page personal portfolio website for **John Chimdike Ezekiel**, a Computer Science student at MIVA Open University and full-stack developer. It showcases featured projects, an educational background, technical skills, a contact form, and a fully functional browser-based academic task planner — all without any frameworks or build tools.

---

## Live Demo

Open `index.html` directly in any modern browser — no server or build step required.

---

## Pages

| Page | File | Description |
|------|------|-------------|
| **Home** | `index.html` | Hero section, brief biography, stats, and an introduction video |
| **About** | `about.html` | Profile photo, detailed bio, skills chips, education table, hobbies, and an audio story |
| **Projects** | `projects.html` | Featured project panels with screenshots, tech stacks, live demo links, and source code links |
| **Planner** | `planner.html` | Interactive academic task planner with add, complete, delete, and filter functionality |
| **Contact** | `contact.html` | Validated contact form with real-time inline error messages |

---

## Features

### Design & UI
- **Retro-paper aesthetic** — the entire site is wrapped in a "window" frame styled to look like a physical notebook, complete with a grid-lined paper background
- **macOS-style traffic-light dots** in the sticky header chrome
- **Polaroid-style photos** with tape accents and subtle tilts
- **Sticker tags** with torn-edge `clip-path` shapes
- **"Scrap paper" stat cards** with irregular polygon clip paths
- **Project panels** with a folded-corner cut (`clip-path`) and hover lift effect

### Dark / Light Mode
- Automatically respects the user's OS preference via `prefers-color-scheme`
- Manual toggle button in the header persists the choice to `localStorage`

### Responsive Design
- Fully mobile-friendly at every breakpoint
- Collapsible hamburger navigation on small screens (767 px and below)
- Decorative polaroid images hidden on small screens to keep the contact page clean

### Academic Planner
- **Add tasks** — up to 120 characters each
- **Mark complete** — checkbox toggles strikethrough style
- **Delete tasks** — per-task delete button with ARIA labels
- **Filter** — All / Active / Completed tabs
- **Persistence** — tasks are saved to `localStorage` and survive page reloads
- **Live task count** — shows total tasks and remaining count in real time
- **Empty state** — friendly message when the list is empty

### Contact Form
- **Real-time validation on blur** for all four fields (Name, Email, Phone, Message)
- Inline error messages linked to their fields via `id` attributes
- Simulated success confirmation on valid submission
- Form resets cleanly after a successful submission

### Performance
- Images use `loading="lazy"` where appropriate
- Video uses `preload="metadata"` to avoid unnecessary data download
- Audio uses `preload="none"` so it only loads on user interaction
- Google Fonts loaded with `preconnect` for faster DNS resolution
- Zero JavaScript frameworks or third-party dependencies

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (semantic elements) |
| Styling | Vanilla CSS3 (Custom Properties, Grid, Flexbox, `clip-path`, animations) |
| Behaviour | Vanilla JavaScript (ES6+, IIFEs, `localStorage`) |
| Fonts | Google Fonts — Inter, Caveat, Jersey 10, Space Mono |
| Icons | Unicode characters (no icon library needed) |

---

## Project Structure

```
Portfolio/
├── index.html          # Home page
├── about.html          # About page
├── projects.html       # Projects showcase
├── planner.html        # Academic task planner
├── contact.html        # Contact form
│
├── css/
│   └── style.css       # Single stylesheet — design tokens + all component styles
│
├── js/
│   ├── main.js         # Shared: theme toggle, mobile nav, footer year
│   ├── planner.js      # Planner CRUD logic + localStorage persistence
│   └── contact.js      # Contact form validation
│
└── assets/
    ├── profile_photo1.jpg   # Hero profile photo
    ├── profile_photo2.jpg   # About page profile photo
    ├── workspace.png        # Contact page desk photo
    ├── project1.png         # Naija Freelance screenshot
    ├── project2.png         # PocketLens screenshot
    └── project3.png         # Awalane screenshot
```

---

## Design System

All design tokens are defined as CSS custom properties on `:root` in `style.css`.

### Colour Palette

| Token | Value | Role |
|-------|-------|------|
| `--paper` | `#faf8f1` | Page background (warm off-white) |
| `--ink` | `#111` | Primary text and borders |
| `--muted` | `#444` | Secondary text |
| `--surface` | `#fff` | Cards and header background |
| `--focus` | `#3b5bff` | Focus ring colour |
| `--yellow` | `#f5c842` | Active nav, primary sticker |
| `--pink` | `#ff5fa2` | Accent sticker / chip |
| `--green` | `#1fbf75` | Live indicator, accent |
| `--blue` | `#3b5bff` | Focus states |
| `--p-blue/sand/pink/green` | pastel variants | Scrap cards, task rows |
| `--note` | `#f8e9a1` | Sticky-note background |

Dark mode overrides are applied via `[data-theme=dark]` and the `prefers-color-scheme` media query.

### Typography

| Class | Font | Use |
|-------|------|-----|
| `.display` | Jersey 10 | Large hero and project headings |
| `.hand` | Caveat | Handwritten labels and captions |
| `.mono` | Space Mono | Nav, buttons, timestamps, counts |
| *(body)* | Inter | All body copy |

### Spacing Scale (8 pt grid)

| Token | Value |
|-------|-------|
| `--s1` | 8 px |
| `--s2` | 16 px |
| `--s3` | 24 px |
| `--s4` | 32 px |
| `--s6` | 48 px |
| `--s8` | 64 px |

---

## JavaScript Modules

### `js/main.js` — Shared Behaviour
Runs on every page as an IIFE (Immediately Invoked Function Expression):
- Reads the saved theme from `localStorage` and applies it immediately (prevents flash of wrong theme)
- Wires the theme-toggle button to flip between `light` and `dark` and save the preference
- Wires the hamburger button to toggle `.open` on the `<nav>` and update `aria-expanded`
- Sets the footer copyright year dynamically via `Date.getFullYear()`

### `js/planner.js` — Academic Planner
- Loads saved tasks from `localStorage` on initialisation
- `addTask(text)` — pushes a new task object `{ id, text, done }` and re-renders
- `render()` — rebuilds the task list DOM, respecting the active filter, and updates the task counter
- Event delegation on the list handles checkbox toggles and delete button clicks efficiently
- Filter chip buttons update the `filter` variable and call `render()`

### `js/contact.js` — Form Validation
- A `rules` object maps each field name to a validator function that returns an error string or `""`
- `check(field)` runs the validator, writes the error message to the associated `#field-err` element, and toggles `.invalid` / `aria-invalid` on the input
- All fields validate `onblur` for real-time feedback
- On submit, all fields are validated together; the form only resets on full success

---

## Accessibility

This project was built with accessibility as a core requirement:

- **Skip-to-content link** — visible on focus for keyboard users
- **`aria-current="page"`** — marks the active navigation link on every page
- **`aria-expanded`** — reflects the open/closed state of the mobile navigation
- **`aria-label`** — descriptive labels on icon buttons, checkboxes, and delete buttons
- **`aria-live="polite"`** — task count updates are announced to screen readers
- **`role="alert"`** — task input error is announced immediately
- **`role="status"`** — contact form submission status
- **`.sr` class** — visually hidden text for screen-reader-only content (e.g., table caption, planner input label)
- **Semantic HTML** — `<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`, `<section>`, `<figure>`, `<figcaption>`, `<table>`
- **`prefers-reduced-motion`** — all CSS animations and transitions are disabled for users who prefer reduced motion
- **`:focus-visible`** — 3 px focus ring visible only during keyboard navigation
- **Form `autocomplete`** — appropriate `autocomplete` attributes on all form inputs

---

## Getting Started

No build tools, package manager, or server needed.

1. **Clone or download** the repository.
2. **Open `index.html`** in any modern browser (Chrome, Firefox, Safari, Edge).

That's it. All pages link to each other via relative paths, and all assets are local.

> **Note:** The introduction video (`assets/intro.mp4`) and the audio story (`assets/story.mp3`) are referenced in the HTML but must be added separately as they are not tracked in the repository due to file size.

---

## Featured Projects

### 1. Naija Freelance *(Mar 2026)*
A job board platform connecting remote workers in Nigeria with global remote opportunities — featuring job listings, applications, and AI-generated tailored resumes and cover letters.
- **Stack:** HTML / CSS / JavaScript / Firebase
- **Live:** https://naijafreelance.onrender.com/
- **Source:** https://github.com/cdJohnEl/naija_freelancer

### 2. PocketLens *(May 2026)*
A web application that lets users upload receipts, automatically extract and categorise expense data using OCR and AI, and receive AI-powered financial insights.
- **Stack:** Next.js / TypeScript / Firebase
- **Live:** https://pocketlens.onrender.com/
- **Source:** https://github.com/cdJohnEl/PocketLens

### 3. Awalane *(Aug 2026)*
An AI-powered niche discovery dashboard for Nigerian content creators — surfacing underserved niches with high growth potential using real-time data and Groq AI.
- **Stack:** Next.js / Tailwind CSS / Groq AI
- **Live:** https://awalane.vercel.app/
- **Source:** https://github.com/cdJohnEl/Awalane

---

## Academic Context

| Detail | Info |
|--------|------|
| **Course** | COS 106 — Introduction to Web Technologies |
| **Institution** | MIVA Open University |
| **Submission** | Portfolio v2 |
| **Year** | 2026 |

---

## Author

**John Chimdike Ezekiel**  
Full-stack developer & Computer Science student at MIVA Open University.

- ALX Africa — Diploma in Software Engineering (2023–2024)
- MIVA Open University — B.Sc. Computer Science (2026–present)

---

*© 2026 Chimdike John · Built for COS 106, MIVA Open University*
