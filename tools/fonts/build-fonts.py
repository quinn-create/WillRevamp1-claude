#!/usr/bin/env python3
"""A23 P700: static TTF instances of the brand fonts for build-time rendering (OG cards, favicon monogram).

Source: the variable WOFF2 originals in mockups/A/public/fonts/ (downloaded once from Google Fonts in Stage 3,
SIL Open Font License 1.1). Nothing is fetched here. Outputs, committed so the Node build needs no Python:
  tools/fonts/Newsreader-Display.ttf      wght 460, opsz 60  (= --weight-display / --opsz-display)
  tools/fonts/Newsreader-DisplayStrong.ttf wght 560, opsz 60 (= --weight-display-strong), monogram source
  tools/fonts/PublicSans-SemiBold.ttf     wght 600           (= --weight-text-strong)
  tools/fonts/PublicSans-Regular.ttf      wght 400           (= --weight-text)
  tools/fonts/monogram.json               "WF" outlines as SVG path data (font units, y flipped) for the favicon
Run: pip install fonttools brotli && python3 tools/fonts/build-fonts.py
"""
import json
import os
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

HERE = os.path.dirname(os.path.abspath(__file__))
# Google Fonts originals (full axis ranges); public/fonts/ holds the trimmed web copies (subset-web.py).
FONTS = os.path.join(HERE, '..', '..', 'mockups', 'A', 'public', 'fonts')


def instance(src, axes, family, style, out):
    f = TTFont(os.path.join(FONTS, src))
    inst = instantiateVariableFont(f, axes, inplace=False)
    name = inst['name']
    full = f'{family} {style}'
    ps = f'{family.replace(" ", "")}-{style.replace(" ", "")}'
    for rec in list(name.names):
        if rec.nameID in (1, 2, 3, 4, 6, 16, 17, 21, 22, 25):
            name.removeNames(nameID=rec.nameID)
    for nid, val in ((1, family), (2, style), (3, ps + ';A23'), (4, full), (6, ps), (16, family), (17, style)):
        name.setName(val, nid, 3, 1, 0x409)
        name.setName(val, nid, 1, 0, 0)
    if 'STAT' in inst:
        del inst['STAT']
    inst.flavor = None
    inst.save(os.path.join(HERE, out))
    return inst


nd = instance('newsreader-latin.woff2', {'wght': 460, 'opsz': 60}, 'Newsreader Display', 'Regular', 'Newsreader-Display.ttf')
ns = instance('newsreader-latin.woff2', {'wght': 560, 'opsz': 60}, 'Newsreader DisplayStrong', 'Regular', 'Newsreader-DisplayStrong.ttf')
instance('public-sans-latin.woff2', {'wght': 600}, 'Public Sans Card', 'SemiBold', 'PublicSans-SemiBold.ttf')
instance('public-sans-latin.woff2', {'wght': 400}, 'Public Sans Card', 'Regular', 'PublicSans-Regular.ttf')

# "WF" outlines from the strong display instance, laid out with the font's own advance widths and a
# small optical tightening (-2% of the em) between the letters.
gs = ns.getGlyphSet()
cmap = ns.getBestCmap()
upm = ns['head'].unitsPerEm
x = 0
paths = []
bounds = BoundsPen(gs)
for i, ch in enumerate('WF'):
    g = cmap[ord(ch)]
    pen = SVGPathPen(gs)
    # flip y (font units are y-up) and shift by the running advance
    gs[g].draw(TransformPen(pen, (1, 0, 0, -1, x, 0)))
    paths.append(pen.getCommands())
    gs[g].draw(TransformPen(bounds, (1, 0, 0, -1, x, 0)))
    x += ns['hmtx'][g][0] - (upm * 0.02 if i == 0 else 0)
xmin, ymin, xmax, ymax = bounds.bounds
json.dump({'upm': upm, 'd': ' '.join(paths), 'bbox': [xmin, ymin, xmax, ymax], 'source': 'Newsreader wght 560 opsz 60'},
          open(os.path.join(HERE, 'monogram.json'), 'w'), indent=1)
print('fonts + monogram written to', HERE)
