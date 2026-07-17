# Rithu Portfolio Site — Design Spec

**Date:** 2026-07-17
**Status:** Approved direction: single-page artist portfolio, "full hyperpop chaos" visual treatment.

## Purpose

A bare-bones single-page portfolio for Rithu, an Atlanta/LA DJ (electronic / hyperpop). Modeled on the existing Mantra portfolio site (`/Users/arnavsingh/Music/CS/Mantra Portfolio/mantra-portfolio-site`) but with fewer sections. Source media lives in `/Users/arnavsingh/Pictures/RITHU STUFF/photos&stuff`.

## Stack

- Vite + React + TypeScript + Tailwind CSS, with shadcn/ui components only where needed.
- Same skeleton as the Mantra site: single `Index` page composed of section components, sticky nav with smooth-scroll anchor links.
- Vitest for smoke tests, following the Mantra repo's test setup.
- Built in this repo: `/Users/arnavsingh/Music/CS/Rithu-Portfolio-Site`.

## Visual direction: full hyperpop chaos (curated)

- **Base:** near-black background with grainy texture overlay.
- **Accents:** saturated gradients sampled from her photos — periwinkle/lavender-blue (studio press shots) → violet → hot neon red (club shots).
- **Effects:** glitch / RGB-split chromatic aberration on display headings (CSS only), prism-flare gradient accents. Chaos lives in the display layer; body copy stays legible.
- **Wordmark:** no logo exists, so "RITHU" is set in **Unbounded** (Google Fonts) with an RGB-split glitch treatment. Body text in **Space Grotesk**.

## Sections (top to bottom)

1. **Hero** — full-viewport. Backdrop: `RITHU_kirt_photo2.png` (periwinkle studio press shot). Giant glitched "RITHU" wordmark, tagline ("DJ / hyperpop / ATL⇄LA"), TikTok + SoundCloud icon links, scroll cue.
2. **About** — provided bio text alongside the other press shot (`RITHU_kirt_photo1.png`). The 60M+ views and ~10M likes stats render as two large gradient numbers inline within the section (no separate stats strip).
3. **Music** — embedded SoundCloud player for the hyperpopish mix (`https://soundcloud.com/sparkleunicorn999/hyperpopish-mix`) plus a "More on SoundCloud" link to the profile. If the embed fails/is blocked, a styled fallback link card shows instead.
4. **Gallery** — masonry-style grid of the strongest ~10 live/club photos (converted to webp) with the District video clips (`District_4.9_Clip_1.mp4`, `District_4.9_Closing.mp4`, `district_1.15.26.mp4`) as muted looping tiles; click toggles sound/fullscreen play. All media lazy-loaded with poster frames.
5. **Footer** — booking email `rithumusic999@gmail.com` (mailto link), TikTok (`https://www.tiktok.com/@rithu.h`) + SoundCloud (`https://soundcloud.com/sparkleunicorn999`) links.

## Assets pipeline

- Photos: select best ~10 club/live shots + the 2 press shots; convert/resize to webp (with jpeg fallback only if needed) into `src/assets/`.
- Videos: compress the three District mp4 clips with ffmpeg (H.264, web-friendly bitrate, ~720p) and generate poster frames.
- Excluded from the repo: `full_mix_hyperpop.wav` (music is served via SoundCloud embed) and `A_0008C698H260409_235211I4_CANON.mov` (raw camera file).

## Bio copy (verbatim)

> Rithu is an emerging DJ and artist bringing a high-energy blend of electronic, hyperpop, and boundary-pushing pop to the club scene. Known for seamless genre-blending and an infectious stage presence, Rithu has played at major venues across Atlanta and Los Angeles, including District Atlanta. Backed by a powerhouse digital footprint—capturing over 60 million views and nearly 10 million likes in the past year alone—Rithu is rapidly cementing her status as a defining new voice in the electronic landscape.

## Error handling & testing

- Lazy-loaded images/videos with poster frames; no layout shift (explicit aspect ratios).
- SoundCloud embed wrapped so a blocked/failed iframe degrades to a link card.
- Vitest smoke tests: page renders, nav anchors resolve, external links present with correct hrefs.

## Out of scope

- No CMS, no routing beyond the single page (plus NotFound), no venues section, no analytics, no logo design.
