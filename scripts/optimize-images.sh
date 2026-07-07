#!/usr/bin/env bash
#
# optimize-images.sh — generate small JPEG display thumbnails for the Backgrounds
# and Image Library galleries. The grid tiles show these lightweight thumbnails;
# the download links still point at the full-resolution PNG originals.
#
# macOS `sips` only — no dependencies (sips can't write WebP, JPEG is the win:
# a ~3 MB PNG becomes ~150 KB at 800px). Idempotent: skips thumbnails that are
# already newer than their source, so re-running after adding images is cheap.
#
#   Usage:  bash scripts/optimize-images.sh
#
# Output:  public/backgrounds/thumbs/<name>.jpg
#          public/imagery/<theme>/thumbs/<name>.jpg
#
set -euo pipefail
shopt -s nullglob nocaseglob

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MAXEDGE=800   # longest edge, px
QUALITY=80    # JPEG quality

count=0
skipped=0

gen() {
  local png="$1" base thumbdir out
  base="$(basename "$png")"; base="${base%.*}"
  thumbdir="$(dirname "$png")/thumbs"
  mkdir -p "$thumbdir"
  out="$thumbdir/$base.jpg"
  # skip if an up-to-date thumbnail already exists
  if [ -f "$out" ] && [ "$out" -nt "$png" ]; then
    skipped=$((skipped + 1)); return
  fi
  sips -s format jpeg -s formatOptions "$QUALITY" -Z "$MAXEDGE" "$png" --out "$out" >/dev/null 2>&1
  count=$((count + 1))
}

# Backgrounds — flat directory
for png in "$ROOT"/public/backgrounds/*.png; do gen "$png"; done
# Imagery — one level of theme sub-directories
for png in "$ROOT"/public/imagery/*/*.png; do gen "$png"; done

echo "thumbnails written: $count  skipped: $skipped  (${MAXEDGE}px longest edge, q${QUALITY})"
