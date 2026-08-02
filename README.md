# AI SaaS

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

> **AI-Powered SaaS Platform** -- Full-stack Next.js application with AI integration, deployed on Netlify.

---

## Overview

**Ai-saas** is a modern Software-as-a-Service starter built with Next.js 14+ (App Router), TypeScript, and AI capabilities. Designed for rapid iteration and production deployment on Netlify with edge functions.

---

## Features

- **Next.js 14 App Router** -- Server Components, Server Actions, Streaming
- **TypeScript Strict Mode** -- End-to-end type safety
- **AI Integration** -- OpenAI / Anthropic / local model support
- **Authentication** -- NextAuth.js (email, OAuth, magic links)
- **Database** -- Prisma ORM (PostgreSQL/Supabase/PlanetScale)
- **Styling** -- Tailwind CSS + shadcn/ui components
- **Deployment** -- Netlify (edge functions, preview deploys)
- **Observability** -- Vercel Analytics / Sentry ready

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript 5+ |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Database** | Prisma + PostgreSQL |
| **Auth** | NextAuth.js v5 |
| **AI** | Vercel AI SDK / OpenAI SDK |
| **Deployment** | Netlify (netlify.toml configured) |
| **Linting** | ESLint + Prettier |

---

## Project Structure

```text
Ai-saas/
+-- Projects/
|   +-- ai-saas/              # Main application
|       +-- app/              # Next.js App Router pages
|       |   +-- (auth)/       # Auth route group
|       |   +-- (dashboard)/  # Protected dashboard
|       |   +-- api/          # API routes / Server Actions
|       |   +-- layout.tsx    # Root layout
|       +-- components/       # React components
|       |   +-- ui/           # shadcn/ui primitives
|       |   +-- features/     # Feature-specific components
|       +-- lib/              # Utilities, configs
|       |   +-- auth.ts       # NextAuth config
|       |   +-- db.ts         # Prisma client
|       |   +-- ai.ts         # AI provider setup
|       +-- prisma/
|       |   +-- schema.prisma # Database schema
|       +-- public/           # Static assets
|       +-- netlify.toml      # Netlify deployment config
|       +-- package.json
|       +-- tsconfig.json
|       +-- tailwind.config.ts
+-- README.md                 # This file
+-- netlify.toml              # Root Netlify config (monorepo)
```

---

## Quick Start

### Prerequisites
- Node.js 18.17+
- pnpm (recommended) or npm/yarn
- PostgreSQL database (local or cloud: Supabase, Neon, PlanetScale)
- OpenAI API key (or Anthropic, etc.)

### Installation

```bash
# Clone
git clone https://github.com/orange-05/Ai-saas.git
cd Ai-saas/Projects/ai-saas

# Install dependencies
pnpm install

# Environment setup
cp .env.example .env
# Edit .env with your keys:
# DATABASE_URL=postgresql://...
# NEXTAUTH_SECRET=***
# OPENAI_API_KEY=***
# NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database setup
pnpm db:generate
pnpm db:push
# or: pnpm db:migrate

# Development
pnpm dev
```

Visit http://localhost:3000.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Yes | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Yes | `http://localhost:3000` (dev) |
| `OPENAI_API_KEY` | Yes | OpenAI API key |
| `NEXT_PUBLIC_APP_URL` | Yes | Public app URL |
| `GITHUB_ID` / `GITHUB_SECRET` | No | GitHub OAuth |
| `GOOGLE_ID` / `GOOGLE_SECRET` | No | Google OAuth |

---

## Deployment (Netlify)

### Automatic (Recommended)
1. Push to GitHub
2. Connect repo in Netlify Dashboard
3. Build command: `pnpm build`
4. Publish directory: `.next`
5. Add environment variables in Netlify UI
6. Deploy!

### netlify.toml Configuration
```toml
[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/:splat"
  status = 200
```

---

## Available Scripts

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # TypeScript check
pnpm db:studio    # Open Prisma Studio
pnpm db:generate  # Generate Prisma Client
pnpm db:push      # Push schema changes
pnpm db:migrate   # Run migrations
```

---

## Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feat/amazing-feature`
3. Follow conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`
4. Ensure `pnpm lint && pnpm type-check` pass
5. Open PR with clear description

---

## License

**MIT License** -- See LICENSE file (add one if missing).

---

## Author

**Karthikeyan K** (BCA Analytics)
- GitHub: [@orange-05](https://github.com/orange-05)
- Location: Bengaluru, India

---

*Build fast, ship faster.* -- Last updated July 2026
