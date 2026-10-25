from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import re
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self,s):
  super().__init__(); self.refs=[];self.ids=set();self.nav=[];self.innav=False;self.current=[];self.feed(s)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.add(a['id'])
  if tag=='nav':self.innav=True
  if self.innav and tag=='a':self.nav.append(a['href'])
  if a.get('aria-current')=='page':self.current.append(a['href'])
  for key in ['href','src','poster','data-animation']:
   if a.get(key):self.refs.append(a[key])
  if tag=='img':assert a.get('alt'), 'Missing descriptive image alt'
 def handle_endtag(self,t):
  if t=='nav':self.innav=False
paths=[ROOT/'index.html',*ROOT.glob('*/index.html'),*ROOT.glob('projects/*/index.html')]
for p in paths:
 s=p.read_text(encoding='utf-8'); parsed=Page(s)
 assert parsed.nav==['/','/publications/','/projects/','/experience/'],p
 expected='/' if p==ROOT/'index.html' else '/'+p.relative_to(ROOT).parts[0]+'/'
 assert parsed.current==[expected],p
 assert '<title>' in s and 'name="description"' in s
 assert 'yxlewis@seas.upenn.edu' not in s
 for ref in parsed.refs:
  u=urlsplit(ref)
  if u.scheme or u.netloc:continue
  target=(ROOT/unquote(u.path.lstrip('/'))) if u.path.startswith('/') else p.parent/unquote(u.path)
  if not u.path:target=p
  if target.is_dir():target=target/'index.html'
  assert target.is_file(),(p,ref)
  if u.fragment and target.suffix=='.html':assert u.fragment in Page(target.read_text(encoding='utf-8')).ids,(p,ref)

print(f'PASS: {len(paths)} static pages; nav order and active states; metadata; local links, fragments and media paths; image alt text and email')
