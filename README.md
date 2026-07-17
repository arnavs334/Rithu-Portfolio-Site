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
