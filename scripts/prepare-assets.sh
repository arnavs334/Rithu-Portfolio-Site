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
#
# District_4.9_Clip_1.mp4 and District_4.9_Closing.mp4 carry a -90deg
# rotation tag, so ffmpeg auto-rotates to portrait before the scale filter
# runs: "scale=1280:-2" yields ~1280x2276 (3x the pixels of a 1280x720
# landscape frame), which blew well past the ~8MB budget at crf 26/28.
# Bumped crf until each landed under ~8MB; scale/trim points left as-is.
ffmpeg -y -ss 00:01:30 -t 20 -i "$SRC/District_4.9_Clip_1.mp4" \
  -vf "scale=1280:-2" -c:v libx264 -crf 39 -preset slow \
  -c:a aac -b:a 96k -movflags +faststart "$OUT/district-loop-1.mp4"

ffmpeg -y -ss 00:03:00 -t 20 -i "$SRC/District_4.9_Closing.mp4" \
  -vf "scale=1280:-2" -c:v libx264 -crf 35 -preset slow \
  -c:a aac -b:a 96k -movflags +faststart "$OUT/district-loop-2.mp4"

# district_1.15.26.mp4 is actually native landscape 1920x1080 (no rotation
# tag), despite the filename suggesting a vertical phone clip.
ffmpeg -y -ss 00:10:00 -t 20 -i "$SRC/district_1.15.26.mp4" \
  -vf "scale=720:-2" -c:v libx264 -crf 26 -preset slow \
  -c:a aac -b:a 96k -movflags +faststart "$OUT/district-loop-3.mp4"

# --- Poster frames (first frame of each trimmed loop) ---
# Loop 3's literal frame 0 is black (pre-strobe); grab 0.6s in instead.
for n in 1 2 3; do
  offset=0
  if [ "$n" = "3" ]; then offset=0.6; fi
  ffmpeg -y -ss "$offset" -i "$OUT/district-loop-$n.mp4" -frames:v 1 -q:v 4 \
    "$OUT/district-poster-$n.jpg"
done

echo "Done. Output sizes:"
du -sh "$OUT"/*
