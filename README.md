<div align="center">

# 💄 Hosiane Makeup

### Luxury Makeup Artistry — Portfolio &amp; Online Booking

A romantic, glamorous single-page web app for a professional makeup artist based in
Kigali, Rwanda. Showcase a portfolio, let clients explore services, and take bookings —
all wrapped in an elegant wine-and-gold design.

</div>

---

## ✨ Features

- **Cinematic hero** — animated typewriter headline, floating portraits, shimmering gold accents, and a rich wine-to-rose gradient (no flat white backgrounds).
- **Service catalogue** — bridal, graduation, editorial, and luxury home services with pricing in **Rwandan Francs (RWF)**.
- **Multi-step booking wizard** — pick a service, add luxury add-ons, choose a date &amp; time, and confirm — with a live running total.
- **Interactive before/after slider** — drag to reveal the makeup transformation.
- **Portfolio gallery** — filterable masterpieces with an elegant lightbox detail view.
- **Client testimonials** — social proof with the ability to add new reviews.
- **Artist admin portal** — manage bookings, edit service prices, moderate reviews, and view revenue (access is hidden from the public navigation).
- **Scroll-reveal animations** throughout, with graceful support for `prefers-reduced-motion`.
- **Fully responsive** and theme-consistent across mobile and desktop.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [React 19](https://react.dev/) |
| Build tool | [Vite 6](https://vite.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Icons | [lucide-react](https://lucide.dev/) + Material Symbols |
| Animation | CSS keyframes + [motion](https://motion.dev/) |
| Persistence | Browser `localStorage` (no backend required) |

## 🚀 Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/) 18+

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open **http://localhost:3000**.

### Build for production

```bash
npm run build     # outputs to /dist
npm run preview   # preview the production build locally
```

> **Note on the folder name:** this project's directory contains an `&`
> (`hosiane-makeup-portfolio-&-booking`), which breaks npm's script runner on
> some shells. If `npm run dev` fails, either rename the folder to remove the `&`,
> or run the tools directly:
> ```bash
> node ./node_modules/vite/bin/vite.js --port=3000    # dev
> node ./node_modules/vite/bin/vite.js build          # build
> node ./node_modules/typescript/bin/tsc --noEmit     # typecheck
> ```

### Environment (optional)

AI-assisted features use a Gemini API key. Copy `.env.example` to `.env.local` and set
`GEMINI_API_KEY` only if you enable those features — the site runs fine without it.

## 📁 Project Structure

```
src/
├── App.tsx                    # Main page: hero, services, portfolio, booking, footer
├── data.ts                    # Seed data: services, add-ons, portfolio, testimonials
├── types.ts                   # Shared TypeScript types
├── index.css                  # Theme tokens, gradients & animations (Tailwind v4)
└── components/
    ├── Navbar.tsx             # Sticky navigation (adapts over the dark hero)
    ├── Typewriter.tsx         # Rotating typewriter headline effect
    ├── BeforeAfterSlider.tsx  # Draggable before/after reveal
    ├── BookingWizard.tsx      # Multi-step booking flow
    ├── TestimonialSection.tsx # Reviews carousel + submission
    └── AdminPortal.tsx        # Artist management dashboard
public/portfolio/              # Portfolio & hero imagery
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Build for production into `/dist` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Type-check with `tsc --noEmit` |

## 📄 License

This project is for portfolio and client use. All imagery and branding belong to
Hosiane Makeup Artistry.

---

<div align="center">

Designed &amp; built by **[Hozana](https://github.com/hozana-dusabimana)** 💛

</div>
