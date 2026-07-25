# ⚡ Slug N Plug — AKR Brand Guidelines Interactive Viewer

> An ultra-fast, modern, interactive web application built with **Bun**, **React 19**, and **TypeScript** for navigating, inspecting, and presenting the official **AKR Brand Guidelines**.

---

## 🌐 Live Production Deployment

Explore the live, deployed web application on Vercel:

👉 **[https://akr-brand-guidelines-snp.vercel.app/](https://akr-brand-guidelines-snp.vercel.app/)**

[![Live Demo](https://img.shields.io/badge/Live_App-akr--brand--guidelines--snp.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://akr-brand-guidelines-snp.vercel.app/)

---

## 🚀 Overview

**Slug N Plug** is the official digital interactive viewer for the **AKR Brand Guidelines & Delivery Repository**. It provides an intuitive, high-performance web experience that allows designers, developers, and stakeholders to explore all 18 brand guideline vector slides seamlessly.

Powered by Bun's native high-performance HTTP server (`Bun.serve()`) for local development and static CDN bundling for Vercel edge deployment, the application dynamically serves SVG assets and renders an interactive web presentation interface with keyboard shortcuts, full-screen lightbox viewing, and categorized section filtering.

---

## ✨ Key Features

- **🌐 Live Vercel Edge & Bun REST Server**: Zero-overhead static asset streaming and dynamic API routing.
- **📂 Categorized Section Navigation**:
  - `01. Strategy` — Index, Vision, Brand Identity, & Palette Rules (Slides 01–05)
  - `02. Identity` — Grid Systems, Type Hierarchy, Fonts, & Layouts (Slides 06–10)
  - `03. Design Guidelines & Rules` — Components, Tokens, Logomarks, & Specifications (Slides 11–18)
- **🔍 Fullscreen Lightbox Modal**: High-resolution SVG preview modal with keyboard navigation (`←` Prev, `→` Next, `ESC` Close).
- **🎨 Glassmorphic & Dark Mode UI**: Modern visual layout with responsive sidebar selection, slide counters, and smooth scrolling.
- **🔄 Dynamic API Asset Loading**: Asynchronously fetches and sorts guideline assets (`/api/assets`) with static JSON fallback for Vercel CDN deployment.

---

## 🛠️ Tech Stack & Architecture

| Technology | Purpose |
| :--- | :--- |
| **[Vercel Cloud Platform](https://vercel.com)** | Global CDN hosting and serverless edge deployment |
| **[Bun Runtime](https://bun.sh)** | All-in-one JavaScript runtime, bundler, and server environment |
| **[React 19](https://react.dev)** | UI framework for responsive component architecture |
| **[TypeScript](https://www.typescriptlang.org)** | Type safety across components and server routes |
| **[Framer Motion](https://www.framer.com/motion/)** | Dynamic micro-animations and smooth layout transitions |
| **[Lenis](https://lenis.darkroom.engineering/)** | Smooth scroll engine for web presentation feeling |
| **Custom CSS Design Tokens** | Bespoke design system, CSS custom variables, and dark aesthetic |

---

## 💻 Quick Start & Commands

Ensure you have **Bun v1.0+** installed on your system.

### 1. Install Dependencies
```bash
bun install
```

### 2. Start Development Server
Starts the dev server with Hot Module Replacement (HMR) enabled:
```bash
bun dev
```
Navigate to `http://localhost:3000` in your web browser.

### 3. Production Build
Bundles the single page application and prepares static vector assets in `dist/`:
```bash
bun build
```

### 4. Run in Production Mode
```bash
bun start
```

---

## 📡 API Reference & Routing

The application serves standard endpoints both dynamically during local development and statically on Vercel deployment:

### Endpoints

| Endpoint | Method | Response | Description |
| :--- | :---: | :--- | :--- |
| `/api/assets` | `GET` | `JSON` | Returns a sorted array of available SVG asset filenames |
| `/assets/:name` | `GET` | `SVG File` | Serves the requested SVG file with `image/svg+xml` headers |
| `/*` | `GET` | `HTML` | Serves `index.html` single page application entry point |

---

## 📁 Directory Structure

```directory
SlugNplug/
├── Main - asssets/         # 🎨 SVG vector slide assets directory
│   ├── 1.svg               # Slide 01: Index & Overview
│   ├── p2.svg              # Slide 02: Brand Identity
│   └── ...                 # Slides 03 through 18
├── scripts/
│   └── build.ts            # Vercel & Bun production static bundler
├── src/
│   ├── index.ts            # Bun.serve() backend entry point & REST API
│   ├── index.html          # HTML5 entry template
│   ├── frontend.tsx        # React root mounting entry point
│   ├── App.tsx             # Main application component & lightbox logic
│   ├── logo.svg            # Official AKR brand favicon
│   └── index.css           # Global stylesheet & design system CSS tokens
├── vercel.json             # Vercel deployment configuration
├── package.json            # Manifest file & script definitions
└── README.md               # App documentation
```

---

## 👤 Author & Maintainer

Designed & Developed by **Ajay Kumar Reddy Krishnareddygari**
- 🌐 **Live Web Application**: [https://akr-brand-guidelines-snp.vercel.app/](https://akr-brand-guidelines-snp.vercel.app/)
- 🌐 **Portfolio**: [ajaykumarreddykrishnareddygari-portfolio.vercel.app](https://ajaykumarreddykrishnareddygari-portfolio.vercel.app/)
- 🐙 **GitHub**: [@ajaykumarreddy-k](https://github.com/ajaykumarreddy-k)

---

## 📜 License

Licensed under the MIT License.
