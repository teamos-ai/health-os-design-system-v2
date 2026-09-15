"""icon-tiles.py: turn raw icon renders into the three files every Health OS icon needs.

For each <id>.png in <raw_dir> (a GPT Image 2 render on a transparent ground, see
design-system/ASSET-RECIPES.md, Icon), it trims to the object, pads it to 80% of a square and
writes, to <out_dir>:
  <id>.png       1024px object on a transparent ground
  <id>.webp      320px display file
  <id>-tile.png  512px baked tile: the object on the warm charcoal squircle, for Canva and slides
Copy the three files to public/heading-tiles/ and add the entry to src/data/headline-tiles.ts.

  python3 scripts/icon-tiles.py raw/ out/ [--sheet sheet.png] [--only id,id]

Needs Pillow (with WebP). The ground colours match tokens.json → icon.ground.
"""
import sys, os, math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

def trim_pad(im, fill=0.80, size=1024):
    im = im.convert('RGBA')
    a = im.split()[3].point(lambda v: 255 if v > 12 else 0)
    bbox = a.getbbox()
    if not bbox:
        return im.resize((size, size))
    obj = im.crop(bbox)
    w, h = obj.size
    scale = (size * fill) / max(w, h)
    obj = obj.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    canvas.paste(obj, ((size - obj.size[0]) // 2, (size - obj.size[1]) // 2), obj)
    return canvas

def ground(size):
    # warm charcoal radial: centre #36322F to edge #252220 (sampled from Tumai's mock-up)
    inner, outer = (54, 50, 47), (37, 34, 32)
    g = Image.new('RGBA', (size, size))
    px = g.load()
    cx, cy = size * 0.5, size * 0.42
    maxd = math.hypot(size * 0.5, size * 0.58)
    for y in range(size):
        for x in range(size):
            t = min(1.0, math.hypot(x - cx, y - cy) / maxd)
            t = t * t * (3 - 2 * t)
            px[x, y] = tuple(round(inner[i] + (outer[i] - inner[i]) * t) for i in range(3)) + (255,)
    return g

def squircle_mask(size, radius=0.24):
    m = Image.new('L', (size * 4, size * 4), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, size * 4 - 1, size * 4 - 1), radius=round(size * 4 * radius), fill=255)
    return m.resize((size, size), Image.LANCZOS)

_GROUND = {}
def bake(obj1024, size=512, fill=0.64):
    if size not in _GROUND:
        _GROUND[size] = ground(size)
    tile = _GROUND[size].copy()
    o = obj1024.resize((round(size * fill / 0.80), round(size * fill / 0.80)), Image.LANCZOS)
    off = (size - o.size[0]) // 2
    tile.alpha_composite(o, (off, off))
    tile.putalpha(squircle_mask(size))
    return tile

def main():
    raw_dir, out_dir = sys.argv[1], sys.argv[2]
    sheet = sys.argv[sys.argv.index('--sheet') + 1] if '--sheet' in sys.argv else None
    only = sys.argv[sys.argv.index('--only') + 1].split(',') if '--only' in sys.argv else None
    os.makedirs(out_dir, exist_ok=True)
    names = sorted(f[:-4] for f in os.listdir(raw_dir) if f.endswith('.png') and (not only or f[:-4] in only))
    baked = []
    for n in names:
        obj = trim_pad(Image.open(os.path.join(raw_dir, n + '.png')))
        obj.save(os.path.join(out_dir, n + '.png'), optimize=True)
        obj.resize((320, 320), Image.LANCZOS).save(os.path.join(out_dir, n + '.webp'), 'WEBP', quality=90, method=6)
        t = bake(obj)
        t.save(os.path.join(out_dir, n + '-tile.png'), optimize=True)
        baked.append((n, t))
    if sheet and baked:
        cols = 8
        cell = 180
        rows = math.ceil(len(baked) / cols)
        s = Image.new('RGB', (cols * cell, rows * (cell + 26)), (255, 255, 255))
        d = ImageDraw.Draw(s)
        for i, (n, t) in enumerate(baked):
            x, y = (i % cols) * cell, (i // cols) * (cell + 26)
            tt = t.resize((cell - 20, cell - 20), Image.LANCZOS)
            s.paste(tt, (x + 10, y + 10), tt)
            d.text((x + 10, y + cell - 6), n[:22], fill=(40, 40, 40))
        s.save(sheet)
    print('processed', len(names))

main()
