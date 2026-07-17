# Rithu Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page hyperpop-styled portfolio site for DJ Rithu with hero, about, music, gallery, and footer/contact sections.

**Architecture:** Vite + React + TypeScript single-page app (no router — one `Index` page rendered directly by `App`). Each section is its own component under `src/components/`. Styling is Tailwind with HSL design tokens in `index.css`, plus custom CSS for glitch/grain effects. Media is preprocessed once by a shell script into `src/assets/` (webp photos, short trimmed mp4 loops) and imported through Vite.

**Tech Stack:** Vite 5, React 18, TypeScript 5, Tailwind CSS 3.4, `@icons-pack/react-simple-icons` (TikTok/SoundCloud brand icons), Vitest 3 + Testing Library + jsdom. Media tooling: `cwebp` (installed), `ffmpeg` (must be installed via Homebrew).

## Global Constraints

- Artist name: **RITHU** (all caps in display contexts). No logo — wordmark is text in the **Unbounded** font; body font is **Space Grotesk** (both from Google Fonts).
- Booking email (exact): `rithumusic999@gmail.com`
- TikTok (exact): `https://www.tiktok.com/@rithu.h`
- SoundCloud profile (exact): `https://soundcloud.com/sparkleunicorn999`
- Mix (exact): `https://soundcloud.com/sparkleunicorn999/hyperpopish-mix`
- Source media directory (note the `&` — always quote it in shell): `/Users/arnavsingh/Pictures/RITHU STUFF/photos&stuff`
- NEVER copy into the repo: `full_mix_hyperpop.wav` (518 MB), `A_0008C698H260409_235211I4_CANON.mov`, or any original multi-GB video. Only processed outputs (webp images, ≤ ~8 MB trimmed mp4s) enter git.
- Visual direction: near-black background, periwinkle/violet/neon-red gradient accents, RGB-split glitch on display headings, grain overlay. Chaos only in the display layer — body copy stays plainly legible.
- Bio copy must be used verbatim (see Task 5 for the exact text).
- All external links: `target="_blank" rel="noreferrer"`.
- Package manager: npm. Run all commands from the repo root `/Users/arnavsingh/Music/CS/Rithu-Portfolio-Site`.

---

### Task 1: Project scaffold, design tokens, and build pipeline

**Files:**
- Create: `.gitignore`, `package.json`, `vite.config.ts`, `vitest.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `tailwind.config.ts`, `postcss.config.js`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/pages/Index.tsx`, `src/index.css`, `src/vite-env.d.ts`, `src/test/setup.ts`, `src/test/smoke.test.tsx`

**Interfaces:**
- Produces: `@` alias → `src/`; Tailwind tokens `background`, `foreground`, `card`, `muted`, `muted-foreground`, `primary`, `secondary`, `accent`, `border`; font classes `font-display` (Unbounded) and `font-sans` (Space Grotesk); CSS classes `.glitch` (requires `data-text` attribute) and `.section-heading`; `Index` page component at `@/pages/Index` that later tasks add sections to.

- [ ] **Step 1: Write config and scaffold files**

`.gitignore`:
```
node_modules
dist
*.local
.DS_Store
```

`package.json`:
```json
{
  "name": "rithu-portfolio-site",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@icons-pack/react-simple-icons": "^13.8.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.0.0",
    "@types/node": "^22.16.5",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "@vitejs/plugin-react-swc": "^3.11.0",
    "autoprefixer": "^10.4.21",
    "jsdom": "^20.0.3",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3",
    "vite": "^5.4.19",
    "vitest": "^3.2.4"
  }
}
```

`vite.config.ts`:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: { host: "::", port: 8080 },
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

`tsconfig.json`:
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

`tsconfig.app.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
```

`tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true
  },
  "include": ["vite.config.ts", "vitest.config.ts"]
}
```

`tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        border: "hsl(var(--border))",
      },
      fontFamily: {
        display: ["Unbounded", "sans-serif"],
        sans: ["'Space Grotesk'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

`postcss.config.js`:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

`index.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RITHU</title>
    <meta
      name="description"
      content="Rithu is a DJ and artist blending electronic, hyperpop, and boundary-pushing pop. 60M+ views. Atlanta ⇄ Los Angeles."
    />
    <meta name="author" content="Rithu" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Unbounded:wght@400;600;800;900&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`src/main.tsx`:
```tsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

`src/App.tsx`:
```tsx
import Index from "./pages/Index";

const App = () => <Index />;

export default App;
```

`src/pages/Index.tsx` (placeholder — sections are added by later tasks):
```tsx
const Index = () => {
  return <div className="min-h-screen bg-background" />;
};

export default Index;
```

`src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 240 15% 4%;
    --foreground: 240 20% 96%;
    --card: 240 12% 8%;
    --muted: 240 10% 16%;
    --muted-foreground: 240 10% 65%;
    --primary: 235 65% 72%; /* periwinkle from press shots */
    --secondary: 270 70% 65%; /* violet */
    --accent: 350 100% 62%; /* club neon red */
    --border: 240 10% 18%;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background font-sans text-foreground antialiased;
  }

  /* film grain over everything; below the fixed nav (z-50) */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 40;
    pointer-events: none;
    opacity: 0.05;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
}

@layer components {
  .section-heading {
    @apply font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl;
  }

  .section-heading::after {
    content: "";
    display: block;
    margin-top: 0.75rem;
    height: 4px;
    width: 4rem;
    background: linear-gradient(
      90deg,
      hsl(var(--primary)),
      hsl(var(--secondary)),
      hsl(var(--accent))
    );
  }

  .icon-link {
    @apply flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-all hover:scale-110 hover:border-primary hover:text-primary;
  }
}

/* RGB-split glitch for display headings. Usage:
   <h1 className="glitch" data-text="RITHU">RITHU</h1> */
.glitch {
  position: relative;
  display: inline-block;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.glitch::before {
  color: hsl(var(--accent) / 0.8);
  animation: glitch-a 2.7s infinite steps(2, jump-none) alternate;
}

.glitch::after {
  color: hsl(var(--primary) / 0.8);
  animation: glitch-b 3.3s infinite steps(2, jump-none) alternate;
}

@keyframes glitch-a {
  0% {
    transform: translate(0);
    clip-path: none;
  }
  25% {
    transform: translate(-3px, 2px);
    clip-path: inset(15% 0 60% 0);
  }
  50% {
    transform: translate(2px, -1px);
    clip-path: inset(55% 0 15% 0);
  }
  75% {
    transform: translate(-2px, 1px);
    clip-path: inset(30% 0 40% 0);
  }
  100% {
    transform: translate(3px, -2px);
    clip-path: none;
  }
}

@keyframes glitch-b {
  0% {
    transform: translate(0);
    clip-path: none;
  }
  25% {
    transform: translate(3px, -2px);
    clip-path: inset(60% 0 10% 0);
  }
  50% {
    transform: translate(-2px, 2px);
    clip-path: inset(10% 0 65% 0);
  }
  75% {
    transform: translate(2px, -1px);
    clip-path: inset(40% 0 30% 0);
  }
  100% {
    transform: translate(-3px, 1px);
    clip-path: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .glitch::before,
  .glitch::after {
    display: none;
  }
}
```

`src/vite-env.d.ts`:
```ts
/// <reference types="vite/client" />
```

`src/test/setup.ts`:
```ts
import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
```

- [ ] **Step 2: Write the smoke test**

`src/test/smoke.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "@/App";

describe("app smoke", () => {
  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeTruthy();
  });
});
```

- [ ] **Step 3: Install and verify test fails before install / passes after**

Run: `npm install`
Expected: completes without errors (lockfile `package-lock.json` created).

Run: `npm test`
Expected: PASS (1 test).

- [ ] **Step 4: Verify production build**

Run: `npm run build`
Expected: `dist/` produced, no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite/React/Tailwind project with hyperpop design tokens"
```

---

### Task 2: Media pipeline — processed photos and trimmed video loops

**Files:**
- Create: `scripts/prepare-assets.sh`
- Create (generated, committed): `src/assets/press-hero.webp`, `src/assets/press-about.webp`, `src/assets/gallery-01.webp` … `gallery-12.webp`, `src/assets/district-loop-1.mp4`, `src/assets/district-loop-2.mp4`, `src/assets/district-loop-3.mp4`, `src/assets/district-poster-1.jpg`, `district-poster-2.jpg`, `district-poster-3.jpg`

**Interfaces:**
- Produces: the exact asset filenames above, imported by Tasks 4, 5, and 7 via `@/assets/<name>`.

- [ ] **Step 1: Install ffmpeg**

Run: `brew install ffmpeg`
Expected: `ffmpeg -version` prints a version banner. (`cwebp` is already installed at `/opt/homebrew/bin/cwebp`.)

- [ ] **Step 2: Write the asset preparation script**

`scripts/prepare-assets.sh`:
```bash
#!/usr/bin/env bash
# Converts Rithu source media into web-ready assets under src/assets/.
# Requires: cwebp, ffmpeg. Safe to re-run; overwrites outputs.
set -euo pipefail

SRC="/Users/arnavsingh/Pictures/RITHU STUFF/photos&stuff"
OUT="$(cd "$(dirname "$0")/.." && pwd)/src/assets"
mkdir -p "$OUT"

# --- Press shots ---
cwebp -q 82 -resize 1600 0 "$SRC/RITHU_kirt_photo2.png" -o "$OUT/press-hero.webp"
cwebp -q 82 -resize 1400 0 "$SRC/RITHU_kirt_photo1.png" -o "$OUT/press-about.webp"

# --- Gallery photos (longest ~1200px wide, q80) ---
photos=(
  "0Y7A9397.JPG"
  "IMG_7135.JPG"
  "IMG_7138.JPG"
  "IMG_7142.jpg"
  "IMG_7144.jpg"
  "IMG_7149.jpg"
  "IMG_7150.jpg"
  "IMG_7151.JPG"
  "IMG_7153.jpg"
  "IMG_7156.jpg"
  "IMG_7157.jpg"
  "IMG_7160.JPG"
)
i=1
for f in "${photos[@]}"; do
  cwebp -q 80 -resize 1200 0 "$SRC/$f" -o "$OUT/$(printf 'gallery-%02d.webp' "$i")"
  i=$((i + 1))
done

# --- Video highlight loops: ~20s each, H.264, web bitrate, keep audio ---
# -ss before -i = fast seek. Offsets picked to land mid-set; adjust if a
# segment turns out to be dead air (check with QuickTime first).
ffmpeg -y -ss 00:01:30 -t 20 -i "$SRC/District_4.9_Clip_1.mp4" \
  -vf "scale=1280:-2" -c:v libx264 -crf 26 -preset slow \
  -c:a aac -b:a 96k -movflags +faststart "$OUT/district-loop-1.mp4"

ffmpeg -y -ss 00:03:00 -t 20 -i "$SRC/District_4.9_Closing.mp4" \
  -vf "scale=1280:-2" -c:v libx264 -crf 26 -preset slow \
  -c:a aac -b:a 96k -movflags +faststart "$OUT/district-loop-2.mp4"

# vertical phone video (1080x1920), 34 min long
ffmpeg -y -ss 00:10:00 -t 20 -i "$SRC/district_1.15.26.mp4" \
  -vf "scale=720:-2" -c:v libx264 -crf 26 -preset slow \
  -c:a aac -b:a 96k -movflags +faststart "$OUT/district-loop-3.mp4"

# --- Poster frames (first frame of each trimmed loop) ---
for n in 1 2 3; do
  ffmpeg -y -i "$OUT/district-loop-$n.mp4" -frames:v 1 -q:v 4 \
    "$OUT/district-poster-$n.jpg"
done

echo "Done. Output sizes:"
du -sh "$OUT"/*
```

- [ ] **Step 3: Run the script**

Run: `chmod +x scripts/prepare-assets.sh && ./scripts/prepare-assets.sh`
Expected: 14 webp files, 3 mp4 files, 3 jpg posters in `src/assets/`. Each mp4 ≤ ~8 MB. If any mp4 exceeds 8 MB, re-run that ffmpeg command with `-crf 28`.

- [ ] **Step 4: Eyeball the outputs**

Open each `district-loop-*.mp4` (`open src/assets/district-loop-1.mp4`) and confirm the 20 s segment shows an actual performance moment (not black/dead air). If not, adjust the `-ss` offset in the script and re-run. View the webp files (`open src/assets/`) and confirm none are blurry or accidental duplicates.

- [ ] **Step 5: Verify nothing oversized or forbidden is staged, then commit**

Run: `du -sh src/assets && git add -A && git status --short`
Expected: total well under 40 MB; no `.wav`, no `.mov`, no multi-GB file staged.

```bash
git commit -m "feat: add processed photo and video assets with prep script"
```

---

### Task 3: Page shell — Navigation, Footer, and assembled Index

**Files:**
- Create: `src/components/Navigation.tsx`, `src/components/Footer.tsx`
- Modify: `src/pages/Index.tsx`
- Test: `src/test/shell.test.tsx`

**Interfaces:**
- Consumes: design tokens and `.glitch`/`.icon-link` classes from Task 1.
- Produces: `Navigation` (default export, no props) — fixed header with anchor links `#about`, `#music`, `#gallery`, `#contact`; `Footer` (default export, no props) — `<footer id="contact">` with mailto + social links. Index renders `<Navigation />` then section placeholders then `<Footer />`.

- [ ] **Step 1: Write the failing test**

`src/test/shell.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

describe("Navigation", () => {
  it("links to each section anchor", () => {
    render(<Navigation />);
    for (const href of ["#about", "#music", "#gallery", "#contact"]) {
      const link = screen
        .getAllByRole("link")
        .find((a) => a.getAttribute("href") === href);
      expect(link, `link to ${href}`).toBeTruthy();
    }
  });
});

describe("Footer", () => {
  it("has booking email and social links", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("mailto:rithumusic999@gmail.com");
    expect(hrefs).toContain("https://www.tiktok.com/@rithu.h");
    expect(hrefs).toContain("https://soundcloud.com/sparkleunicorn999");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/components/Navigation`.

- [ ] **Step 3: Implement Navigation and Footer**

`src/components/Navigation.tsx`:
```tsx
const links = [
  { href: "#about", label: "About" },
  { href: "#music", label: "Music" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const Navigation = () => (
  <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <a
        href="#home"
        className="font-display text-lg font-extrabold tracking-widest text-foreground transition-colors hover:text-primary"
      >
        RITHU
      </a>
      <ul className="flex items-center gap-4 sm:gap-7">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary sm:text-sm"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

export default Navigation;
```

`src/components/Footer.tsx`:
```tsx
import { SiTiktok, SiSoundcloud } from "@icons-pack/react-simple-icons";

const Footer = () => (
  <footer id="contact" className="border-t border-border px-4 py-20 text-center">
    <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
      Bookings
    </h2>
    <a
      href="mailto:rithumusic999@gmail.com"
      className="mt-6 inline-block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text font-display text-xl font-bold text-transparent transition-opacity hover:opacity-80 sm:text-3xl"
    >
      rithumusic999@gmail.com
    </a>
    <div className="mt-10 flex justify-center gap-5">
      <a
        href="https://www.tiktok.com/@rithu.h"
        target="_blank"
        rel="noreferrer"
        aria-label="TikTok"
        className="icon-link"
      >
        <SiTiktok size={20} />
      </a>
      <a
        href="https://soundcloud.com/sparkleunicorn999"
        target="_blank"
        rel="noreferrer"
        aria-label="SoundCloud"
        className="icon-link"
      >
        <SiSoundcloud size={20} />
      </a>
    </div>
    <p className="mt-12 text-xs uppercase tracking-widest text-muted-foreground">
      © {new Date().getFullYear()} RITHU
    </p>
  </footer>
);

export default Footer;
```

Update `src/pages/Index.tsx`:
```tsx
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* HeroSection (Task 4) */}
      {/* AboutSection (Task 5) */}
      {/* MusicSection (Task 6) */}
      {/* GallerySection (Task 7) */}
      <Footer />
    </div>
  );
};

export default Index;
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (smoke + shell tests).

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "feat: add navigation and footer shell"
```

---

### Task 4: Hero section

**Files:**
- Create: `src/components/HeroSection.tsx`
- Modify: `src/pages/Index.tsx` (replace the Hero placeholder comment)
- Test: `src/test/hero.test.tsx`

**Interfaces:**
- Consumes: `@/assets/press-hero.webp` (Task 2), `.glitch` class (Task 1).
- Produces: `HeroSection` (default export, no props) — `<section id="home">`.

- [ ] **Step 1: Write the failing test**

`src/test/hero.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/HeroSection";

describe("HeroSection", () => {
  it("shows the RITHU wordmark with glitch data-text", () => {
    render(<HeroSection />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("RITHU");
    expect(h1).toHaveAttribute("data-text", "RITHU");
  });

  it("links to TikTok and SoundCloud", () => {
    render(<HeroSection />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("https://www.tiktok.com/@rithu.h");
    expect(hrefs).toContain("https://soundcloud.com/sparkleunicorn999");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/components/HeroSection`.

- [ ] **Step 3: Implement HeroSection**

`src/components/HeroSection.tsx`:
```tsx
import { SiTiktok, SiSoundcloud } from "@icons-pack/react-simple-icons";
import heroImage from "@/assets/press-hero.webp";

const HeroSection = () => (
  <section
    id="home"
    className="relative flex min-h-screen items-center justify-center overflow-hidden"
  >
    <img
      src={heroImage}
      alt="Rithu press shot"
      className="absolute inset-0 h-full w-full object-cover object-top"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
    <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
      <h1
        data-text="RITHU"
        className="glitch font-display text-6xl font-black tracking-tight sm:text-8xl md:text-9xl"
      >
        RITHU
      </h1>
      <p className="text-sm uppercase tracking-[0.4em] text-foreground/80 sm:text-base">
        DJ · Hyperpop · ATL ⇄ LA
      </p>
      <div className="flex gap-5">
        <a
          href="https://www.tiktok.com/@rithu.h"
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok"
          className="icon-link"
        >
          <SiTiktok size={22} />
        </a>
        <a
          href="https://soundcloud.com/sparkleunicorn999"
          target="_blank"
          rel="noreferrer"
          aria-label="SoundCloud"
          className="icon-link"
        >
          <SiSoundcloud size={22} />
        </a>
      </div>
    </div>
    <a
      href="#about"
      aria-label="Scroll to about section"
      className="absolute bottom-8 z-10 animate-bounce text-primary"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </a>
  </section>
);

export default HeroSection;
```

In `src/pages/Index.tsx`, replace `{/* HeroSection (Task 4) */}` with `<HeroSection />` and add `import HeroSection from "@/components/HeroSection";`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Visual check**

Run: `npm run dev` and open `http://localhost:8080`.
Expected: full-screen periwinkle press shot, giant glitching RITHU wordmark, icons, bouncing scroll chevron. Check a narrow viewport (~375 px) — wordmark must not overflow horizontally.

- [ ] **Step 6: Commit**

```bash
git add src
git commit -m "feat: add glitch hero section"
```

---

### Task 5: About section with inline stats

**Files:**
- Create: `src/components/AboutSection.tsx`
- Modify: `src/pages/Index.tsx` (replace the About placeholder comment)
- Test: `src/test/about.test.tsx`

**Interfaces:**
- Consumes: `@/assets/press-about.webp` (Task 2), `.section-heading` class (Task 1).
- Produces: `AboutSection` (default export, no props) — `<section id="about">`.

- [ ] **Step 1: Write the failing test**

`src/test/about.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutSection from "@/components/AboutSection";

describe("AboutSection", () => {
  it("renders the bio and stats", () => {
    render(<AboutSection />);
    expect(
      screen.getByText(/emerging DJ and artist/i)
    ).toBeInTheDocument();
    expect(screen.getByText("60M+")).toBeInTheDocument();
    expect(screen.getByText("10M")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/components/AboutSection`.

- [ ] **Step 3: Implement AboutSection**

The bio text below is contractual — use it verbatim.

`src/components/AboutSection.tsx`:
```tsx
import aboutImage from "@/assets/press-about.webp";

const stats = [
  { value: "60M+", label: "views in the past year" },
  { value: "10M", label: "likes and counting" },
];

const AboutSection = () => (
  <section id="about" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24">
    <h2 className="section-heading">About</h2>
    <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
      <img
        src={aboutImage}
        alt="Rithu studio portrait"
        loading="lazy"
        className="w-full rounded-xl border border-border"
      />
      <div>
        <p className="text-lg leading-relaxed text-foreground/85">
          Rithu is an emerging DJ and artist bringing a high-energy blend of
          electronic, hyperpop, and boundary-pushing pop to the club scene.
          Known for seamless genre-blending and an infectious stage presence,
          Rithu has played at major venues across Atlanta and Los Angeles,
          including District Atlanta. Backed by a powerhouse digital
          footprint—capturing over 60 million views and nearly 10 million likes
          in the past year alone—Rithu is rapidly cementing her status as a
          defining new voice in the electronic landscape.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text font-display text-4xl font-extrabold text-transparent sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
```

In `src/pages/Index.tsx`, replace `{/* AboutSection (Task 5) */}` with `<AboutSection />` and add the import.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "feat: add about section with bio and stats"
```

---

### Task 6: Music section with SoundCloud embed and fallback

**Files:**
- Create: `src/components/MusicSection.tsx`
- Modify: `src/pages/Index.tsx` (replace the Music placeholder comment)
- Test: `src/test/music.test.tsx`

**Interfaces:**
- Consumes: `.section-heading` class (Task 1).
- Produces: `MusicSection` (default export, no props) — `<section id="music">`. Renders an iframe titled `"Hyperpopish Mix on SoundCloud"`; if the iframe hasn't fired `onLoad` within 6 s, swaps to a fallback link card.

- [ ] **Step 1: Write the failing test**

`src/test/music.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MusicSection from "@/components/MusicSection";

describe("MusicSection", () => {
  it("renders the SoundCloud embed for the mix", () => {
    render(<MusicSection />);
    const iframe = screen.getByTitle("Hyperpopish Mix on SoundCloud");
    expect(iframe.getAttribute("src")).toContain(
      encodeURIComponent("https://soundcloud.com/sparkleunicorn999/hyperpopish-mix")
    );
  });

  it("always offers a direct SoundCloud profile link", () => {
    render(<MusicSection />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("https://soundcloud.com/sparkleunicorn999");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/components/MusicSection`.

- [ ] **Step 3: Implement MusicSection**

`src/components/MusicSection.tsx`:
```tsx
import { useEffect, useState } from "react";

const MIX_URL = "https://soundcloud.com/sparkleunicorn999/hyperpopish-mix";
const PROFILE_URL = "https://soundcloud.com/sparkleunicorn999";
const EMBED_SRC = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
  MIX_URL
)}&color=%238b8bff&auto_play=false&hide_related=true&show_comments=false&show_teaser=false&visual=true`;

const MusicSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, [loaded]);

  return (
    <section id="music" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24">
      <h2 className="section-heading">Music</h2>
      <div className="mt-12">
        {failed ? (
          <a
            href={MIX_URL}
            target="_blank"
            rel="noreferrer"
            className="flex h-40 items-center justify-center rounded-xl border border-border bg-card text-lg font-bold text-primary transition-colors hover:border-primary"
          >
            ▶ Listen to the Hyperpopish Mix on SoundCloud
          </a>
        ) : (
          <iframe
            title="Hyperpopish Mix on SoundCloud"
            width="100%"
            height="400"
            allow="autoplay"
            src={EMBED_SRC}
            onLoad={() => setLoaded(true)}
            className="rounded-xl border border-border"
          />
        )}
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
        >
          More on SoundCloud →
        </a>
      </div>
    </section>
  );
};

export default MusicSection;
```

In `src/pages/Index.tsx`, replace `{/* MusicSection (Task 6) */}` with `<MusicSection />` and add the import.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Visual check**

Run: `npm run dev`, open the Music section.
Expected: SoundCloud visual player loads with the mix artwork. Temporarily block `w.soundcloud.com` (or set the timeout to 100 ms) to confirm the fallback card renders, then restore.

- [ ] **Step 6: Commit**

```bash
git add src
git commit -m "feat: add music section with SoundCloud embed and fallback"
```

---

### Task 7: Gallery section with photo grid and video loop tiles

**Files:**
- Create: `src/components/GallerySection.tsx`, `src/components/VideoTile.tsx`
- Modify: `src/pages/Index.tsx` (replace the Gallery placeholder comment)
- Test: `src/test/gallery.test.tsx`

**Interfaces:**
- Consumes: `@/assets/gallery-01.webp` … `gallery-12.webp`, `@/assets/district-loop-{1,2,3}.mp4`, `@/assets/district-poster-{1,2,3}.jpg` (Task 2).
- Produces: `GallerySection` (default export, no props) — `<section id="gallery">`; `VideoTile` component with props `{ src: string; poster: string; label: string }` — autoplaying muted loop, click toggles mute.

- [ ] **Step 1: Write the failing test**

`src/test/gallery.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import GallerySection from "@/components/GallerySection";
import VideoTile from "@/components/VideoTile";

describe("GallerySection", () => {
  it("renders lazy-loaded photos and video tiles", () => {
    render(<GallerySection />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThanOrEqual(10);
    for (const img of images) {
      expect(img).toHaveAttribute("loading", "lazy");
    }
    expect(
      screen.getAllByRole("button", { name: /unmute/i }).length
    ).toBe(3);
  });
});

describe("VideoTile", () => {
  it("toggles mute on click", () => {
    render(<VideoTile src="loop.mp4" poster="poster.jpg" label="District set" />);
    const button = screen.getByRole("button", { name: /unmute district set/i });
    fireEvent.click(button);
    expect(
      screen.getByRole("button", { name: /mute district set/i })
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/components/GallerySection`.

- [ ] **Step 3: Implement VideoTile and GallerySection**

`src/components/VideoTile.tsx`:
```tsx
import { useState } from "react";

type VideoTileProps = {
  src: string;
  poster: string;
  label: string;
};

const VideoTile = ({ src, poster, label }: VideoTileProps) => {
  const [muted, setMuted] = useState(true);

  return (
    <button
      type="button"
      aria-label={muted ? `Unmute ${label}` : `Mute ${label}`}
      onClick={() => setMuted((m) => !m)}
      className="group relative block w-full overflow-hidden rounded-xl border border-border"
    >
      <video
        src={src}
        poster={poster}
        muted={muted}
        autoPlay
        loop
        playsInline
        preload="metadata"
        className="w-full"
      />
      <span className="absolute bottom-2 right-2 rounded-full bg-background/70 px-2.5 py-1 text-xs text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
        {muted ? "🔇 tap for sound" : "🔊 sound on"}
      </span>
    </button>
  );
};

export default VideoTile;
```

`src/components/GallerySection.tsx`:
```tsx
import VideoTile from "@/components/VideoTile";
import g01 from "@/assets/gallery-01.webp";
import g02 from "@/assets/gallery-02.webp";
import g03 from "@/assets/gallery-03.webp";
import g04 from "@/assets/gallery-04.webp";
import g05 from "@/assets/gallery-05.webp";
import g06 from "@/assets/gallery-06.webp";
import g07 from "@/assets/gallery-07.webp";
import g08 from "@/assets/gallery-08.webp";
import g09 from "@/assets/gallery-09.webp";
import g10 from "@/assets/gallery-10.webp";
import g11 from "@/assets/gallery-11.webp";
import g12 from "@/assets/gallery-12.webp";
import loop1 from "@/assets/district-loop-1.mp4";
import loop2 from "@/assets/district-loop-2.mp4";
import loop3 from "@/assets/district-loop-3.mp4";
import poster1 from "@/assets/district-poster-1.jpg";
import poster2 from "@/assets/district-poster-2.jpg";
import poster3 from "@/assets/district-poster-3.jpg";

type Tile =
  | { kind: "photo"; src: string; alt: string }
  | { kind: "video"; src: string; poster: string; label: string };

const tiles: Tile[] = [
  { kind: "photo", src: g01, alt: "Rithu behind the decks in red neon light" },
  { kind: "photo", src: g02, alt: "Rithu performing live" },
  { kind: "video", src: loop1, poster: poster1, label: "District Atlanta set" },
  { kind: "photo", src: g03, alt: "Rithu performing live" },
  { kind: "photo", src: g04, alt: "Crowd at a Rithu set" },
  { kind: "photo", src: g05, alt: "Rithu performing live" },
  { kind: "video", src: loop2, poster: poster2, label: "District Atlanta closing set" },
  { kind: "photo", src: g06, alt: "Rithu performing live" },
  { kind: "photo", src: g07, alt: "Rithu on stage" },
  { kind: "photo", src: g08, alt: "Rithu performing live" },
  { kind: "video", src: loop3, poster: poster3, label: "District Atlanta January set" },
  { kind: "photo", src: g09, alt: "Rithu performing live" },
  { kind: "photo", src: g10, alt: "Rithu on stage" },
  { kind: "photo", src: g11, alt: "Rithu performing live" },
  { kind: "photo", src: g12, alt: "Rithu performing live" },
];

const GallerySection = () => (
  <section id="gallery" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24">
    <h2 className="section-heading">Live</h2>
    <div className="mt-12 columns-2 gap-3 md:columns-3 [&>*]:mb-3 [&>*]:break-inside-avoid">
      {tiles.map((tile) =>
        tile.kind === "photo" ? (
          <img
            key={tile.src}
            src={tile.src}
            alt={tile.alt}
            loading="lazy"
            className="w-full rounded-xl border border-border"
          />
        ) : (
          <VideoTile
            key={tile.src}
            src={tile.src}
            poster={tile.poster}
            label={tile.label}
          />
        )
      )}
    </div>
  </section>
);

export default GallerySection;
```

In `src/pages/Index.tsx`, replace `{/* GallerySection (Task 7) */}` with `<GallerySection />` and add the import. After this task Index has no placeholder comments left:

```tsx
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MusicSection from "@/components/MusicSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MusicSection />
      <GallerySection />
      <Footer />
    </div>
  );
};

export default Index;
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Visual check**

Run: `npm run dev`, scroll the gallery.
Expected: masonry columns, videos loop muted, clicking a video shows the "sound on" badge and unmutes. Reorder the `tiles` array if adjacent photos look too similar (several club shots are near-duplicates from the same burst — spread them out or drop the weakest).

- [ ] **Step 6: Commit**

```bash
git add src
git commit -m "feat: add live gallery with photo grid and video loop tiles"
```

---

### Task 8: Favicon, meta polish, README, and final verification

**Files:**
- Create: `public/favicon.svg`, `README.md`
- Modify: `index.html`

**Interfaces:**
- Consumes: everything prior.
- Produces: shippable site — `npm run build` output in `dist/`.

- [ ] **Step 1: Add favicon**

`public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8b8bff"/>
      <stop offset="0.5" stop-color="#a855f7"/>
      <stop offset="1" stop-color="#ff3355"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#0a0a12"/>
  <text x="32" y="45" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="38" font-weight="900" fill="url(#g)">R</text>
</svg>
```

In `index.html`, add inside `<head>`:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

- [ ] **Step 2: Write README**

`README.md`:
```markdown
# RITHU — Portfolio Site

Single-page portfolio for DJ/artist Rithu. Vite + React + TypeScript + Tailwind.

## Develop

    npm install
    npm run dev        # http://localhost:8080

## Test / Build

    npm test
    npm run build      # outputs dist/
    npm run preview

## Media pipeline

Web assets in `src/assets/` are generated from the source folder
`/Users/arnavsingh/Pictures/RITHU STUFF/photos&stuff` by:

    ./scripts/prepare-assets.sh

Requires `cwebp` and `ffmpeg` (both via Homebrew). Originals (raw videos,
`full_mix_hyperpop.wav`) are never committed — only processed webp/mp4 outputs.

## Links

- TikTok: https://www.tiktok.com/@rithu.h
- SoundCloud: https://soundcloud.com/sparkleunicorn999
- Booking: rithumusic999@gmail.com
```

- [ ] **Step 3: Full verification**

Run: `npm test && npm run build`
Expected: all tests pass; build succeeds. Then `npm run preview` and click through every nav anchor, the mailto link, both social links, the SoundCloud embed, and confirm video tiles play. Check `du -sh dist` — expect well under 50 MB.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add favicon, meta polish, and README"
```
