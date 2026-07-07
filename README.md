# Hoang Huy Le — Personal Portfolio

Modern full-stack portfolio built with **Next.js 15**, showcasing projects, skills, experience, testimonials, and an AI assistant powered by Google Gemini.

## Features

- Responsive single-page layout with smooth scroll navigation
- Hero section with animated gradient background and stats strip
- Project portfolio with case-study modals
- Skills grid and work experience timeline
- Visitor testimonials with optional Sanity CMS sync
- Education and certifications section
- Contact form with email delivery (Nodemailer + Gmail SMTP)
- AI portfolio assistant (`/api/chat`) with Gemini and Upstash rate limiting
- Dark mode, scroll progress, SEO metadata, sitemap, and JSON-LD

## Tech Stack

| Layer | Technologies |
|-------|----------------|
| Framework | Next.js 15 (App Router), React 19 |
| Styling | Sass, Framer Motion |
| CMS | Sanity (projects, brands, testimonials, CV) |
| AI | Google Gemini API |
| Email | Nodemailer |
| Rate limiting | Upstash Redis |
| Deploy | Netlify |

## Project Structure

```
src/
├── app/              # Next.js App Router, API routes, SEO
├── components/       # Shared UI (navbar, chat, theme toggle, …)
├── container/        # Page sections (Header, Work, Skills, …)
├── data/cvData.js    # Local fallback content (profile, projects, skills)
├── lib/              # Server utilities (chat, contact, SEO, Sanity)
└── constants/        # Images and navigation config

backend_sanity_portfolio/   # Sanity Studio schemas
public/                     # Static assets (CV PDF, favicon, …)
scripts/                    # CV upload helper for Sanity
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & run locally

```bash
git clone https://github.com/dk-hhuy/Portfolio-Page.git
cd Portfolio-Page
npm install
cp .env.example .env   # then fill in your values
npm run dev
```

## Sanity CMS

The `backend_sanity_portfolio/` folder contains Sanity schemas for works, testimonials, brands, and site settings (CV file). Content from Sanity overrides local data in `src/data/cvData.js` when available.




