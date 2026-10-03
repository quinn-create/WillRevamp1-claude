#!/usr/bin/env python3
"""A23 P800: trim the self-hosted variable web fonts to the axis ranges the site uses.

Source: the Google Fonts originals (latin + latin-ext unicode-range subsets, OFL 1.1) kept in
mockups/A/public/fonts/ (downloaded once in Stage 3). Output: public/fonts/ (same file names).
  Newsreader  wght 400-700 (uses 460 display, 560 strong, 400 quote text, 700 for <strong>), opsz 32-60
              (every Newsreader rule sets "opsz" to --opsz-heading 32 or --opsz-display 60)
  Public Sans wght 400-700 (uses 400 / 500 / 600, 700 for <b>/<strong> fallbacks)
Glyph coverage is unchanged (latin and latin-ext stay split by unicode-range in tokens.css).
Newsreader latin 129 KB -> ~66 KB, the preloaded H1 face. Keep the @font-face font-weight descriptors in
src/styles/tokens.css equal to these ranges.
Run: pip install fonttools brotli && python3 tools/fonts/subset-web.py
"""
import os
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
SRC = os.path.join(ROOT, 'mockups', 'A', 'public', 'fonts')
OUT = os.path.join(ROOT, 'public', 'fonts')
AXES = {
    'newsreader': {'wght': (400, 700), 'opsz': (32, 60)},
    'public-sans': {'wght': (400, 700)},
}
for name in sorted(os.listdir(SRC)):
    if not name.endswith('.woff2'):
        continue
    fam = 'newsreader' if name.startswith('newsreader') else 'public-sans'
    f = TTFont(os.path.join(SRC, name))
    inst = instantiateVariableFont(f, AXES[fam], inplace=False)
    inst.flavor = 'woff2'
    inst.save(os.path.join(OUT, name))
    print(f'{name}: {os.path.getsize(os.path.join(SRC, name)) // 1024} KB -> {os.path.getsize(os.path.join(OUT, name)) // 1024} KB')
