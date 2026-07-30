# 🤖 Gbot — AI SaaS Platform

> A unified, production-ready **AI content generation platform** that puts conversation, code, image, music, and video creation behind a single polished interface.

🌐 **Live demo:** [ai-saas-ruby-two.vercel.app](https://ai-saas-ruby-two.vercel.app)
🛠️ **Repo layout:** monorepo — actual app lives in `Projects/ai-saas/`

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=for-the-badge&logo=google)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)

---

## ✨ Features

- 💬 **Conversation** — chat with the latest Gemini model, streaming responses
- 💻 **Code Generation** — generate clean code in any language on demand
- 🖼️ **Image Generation** — text-to-image via the Gemini multimodal API
- 🎵 **Music Generation** — create original audio compositions
- 🎬 **Video Generation** — generate compelling short-form video content
- 🎨 **Polished landing page** — animated typewriter hero, testimonials, pricing tiers
- 📊 **Dashboard** — sidebar-driven, 5 tools, free-usage counter with Pro upgrade CTA
- ⚙️ **Settings** — account / subscription management
- 💎 **Freemium model** — 5 free generations, then Pro at $20/month

---

## 🏗️ Architecture

```
Ai-saas/
├── netlify.toml                    # Netlify build config (base = Projects/ai-saas)
└── Projects/ai-saas/
    ├── package.json                # next 16, react 19, @google/generative-ai
    ├── next.config.ts              # static export, trailingSlash, unoptimized images
    ├── app/
    │   ├── layout.tsx              # root layout
    │   ├── globals.css             # tailwind + global styles
    │   ├── page.tsx                # landing (hero, features, testimonials, pricing)
    │   └── dashboard/
    │       ├── layout.tsx          # sidebar shell
    │       ├── page.tsx            # tool grid + free-usage counter
    │       ├── conversation/       # chat UI (Gemini streaming)
    │       ├── code/               # code generator
    │       ├── image/              # text-to-image
    │       ├── music/              # text-to-music
    │       ├── video/              # text-to-video
    │       ├── settings/           # account settings
    │       └── _components/
    │           └── Sidebar.tsx     # navigation
    └── public/                     # static assets
```

The data flow is identical for every tool: the dashboard calls a Next.js client component which talks **directly to the Google Generative AI SDK** in the browser using a `NEXT_PUBLIC_GEMINI_API_KEY`.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- A **Google Gemini API key** — get one at [aistudio.google.com](https://aistudio.google.com/apikey)

### Install & run

```bash
cd Projects/ai-saas
npm install
```

Create `.env.local`:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here
```

Then:

```bash
npm run dev          # http://localhost:3000
npm run build        # static export → ./out
npm run start        # next start
npm run lint         # eslint
```

Open the dashboard at [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

---

## 🔑 Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_GEMINI_API_KEY` | ✅ | Google AI Studio key. Exposed to the client because the API is called directly from the browser. |

> ⚠️ The `NEXT_PUBLIC_` prefix is intentional. **Do not** put a server-only secret here. For production, proxy Gemini calls through a Next.js API route or a serverless function so the key is never shipped to clients.

---

## 🎨 Design System

- **Color palette:** indigo-500 → violet-500 gradient (`#6366f1 → #8b5cf6`)
- **Typography:** Geist (loaded via `next/font`)
- **Card style:** `rgba(255,255,255,0.03)` background, `rgba(255,255,255,0.08)` border, `24px` radius
- **Motion:** CSS-only `transition: opacity 0.4s, transform 0.4s` typewriter + hover lift

---

## 📦 Deployment

The repo ships with a **`netlify.toml`** that builds and publishes the static export:

```toml
[build]
  base    = "Projects/ai-saas"
  command = "npm install && npm run build"
  publish = "out"
```

You can deploy to **Vercel** with one click — `next.config.ts` already enables `output: "export"`, so `next build` produces a fully static site in `./out` that any CDN can host.

---

## 🗺️ Roadmap

- [ ] Move all Gemini calls server-side (proxy routes) so the API key is not exposed
- [ ] Add Clerk / Supabase auth for real user accounts
- [ ] Stripe checkout for the $20/mo Pro tier
- [ ] Usage metering (currently a static "5 free generations" copy)
- [ ] Persistent conversation history
- [ ] Voice input for the conversation tool

---

## 📄 License

MIT — see `LICENSE` for details.
