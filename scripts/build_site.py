"""Render shared static navigation/footer. No dependencies; GitHub Pages serves HTML directly."""
from pathlib import Path
import argparse, re, json, hashlib
from html import escape
from contact_icons import contact_link
ROOT = Path(__file__).resolve().parents[1]
NAV = [('Home', '/'), ('Publications', '/publications/'), ('Projects', '/projects/'), ('Experience', '/experience/')]
DOCUMENTS = ('Yixiao_Liu_CV.pdf', 'Yixiao_Liu_Resume.pdf')
def document_url(filename):
    """Keep stable PDF paths and refresh cached downloads when their bytes change."""
    digest = hashlib.sha256((ROOT/'assets'/filename).read_bytes()).hexdigest()[:12]
    return f'/assets/{filename}?v={digest}'
def publication_markup(compact=False):
    entries = json.loads((ROOT / 'content/publications.json').read_text(encoding='utf-8-sig'))
    cards = []
    heading = 'h3' if compact else 'h2'
    for entry in entries:
        authors = ', '.join('<strong>' + escape(name) + '</strong>' if name == 'Yixiao Liu' else escape(name) for name in entry['authors'])
        figure = escape(entry['figure'], quote=True)
        cards.append(f'''<article class="publication-entry{' publication-compact' if compact else ''}">
  <figure class="publication-figure"><a href="{figure}" aria-label="Open full-size UUBench overview figure"><img src="{figure}" width="{int(entry['figure_width'])}" height="{int(entry['figure_height'])}" alt="{escape(entry['figure_alt'], quote=True)}" loading="lazy" /><span>Open full-size figure</span></a></figure>
  <div class="publication-copy"><{heading} class="publication-heading">{escape(entry['title'])}</{heading}><p class="publication-authors">{authors}</p><p class="publication-summary">{escape(entry['summary'])}</p></div>
</article>''')
    return '\n'.join(cards)

def render(path, source):
    relative = path.relative_to(ROOT).as_posix()
    active = '/' if relative == 'index.html' else '/' + relative.split('/')[0] + '/'
    links = ''.join(f'<a href="{url}"' + (' aria-current="page"' if url == active else '') + f'>{label}</a>' for label, url in NAV)
    header = '<a class="skip-link" href="#main-content">Skip to content</a><header class="site-header"><a class="site-name" href="/">Yixiao Liu</a><button class="menu-toggle" aria-expanded="false" aria-controls="site-navigation" hidden>Menu</button><nav id="site-navigation" aria-label="Main navigation">' + links + '</nav></header>'
    footer = '<footer class="site-footer"><p>© <span id="year">2026</span> Yixiao Liu <span class="footer-contact-links">' + ' '.join([contact_link('email', 'Email', 'mailto:yxlewis@engineering.upenn.edu'), contact_link('cv', 'CV', document_url('Yixiao_Liu_CV.pdf')), contact_link('github', 'GitHub', 'https://github.com/DasVade')]) + '</span></p><p>Hosted by GitHub Pages.</p></footer>'
    for name, text in [('header', header), ('footer', footer)]:
        pattern = f'<!-- shared-{name}:start -->.*?<!-- shared-{name}:end -->'
        source, count = re.subn(pattern, f'<!-- shared-{name}:start -->{text}<!-- shared-{name}:end -->', source, flags=re.S)
        if count != 1:
            raise ValueError(f'{relative}: expected one shared {name} region')
    if relative in ('index.html', 'publications/index.html'):
        source, count = re.subn(r'<!-- shared-publications:start -->.*?<!-- shared-publications:end -->',
            lambda _: '<!-- shared-publications:start -->' + publication_markup(relative == 'index.html') + '<!-- shared-publications:end -->', source, flags=re.S)
        if count != 1:
            raise ValueError(f'{relative}: expected one shared publication region')
    for filename in DOCUMENTS:
        source = re.sub(r'href="/?assets/' + re.escape(filename) + r'(?:\?[^\"]*)?"',
            lambda _: 'href="' + document_url(filename) + '"', source)
    return source
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true', help='Fail if shared regions are stale')
    args = parser.parse_args()
    paths = [ROOT/'index.html', *sorted(ROOT.glob('*/index.html')), *sorted(ROOT.glob('projects/*/index.html'))]
    stale = []
    for path in paths:
        source = path.read_text(encoding='utf-8')
        result = render(path, source)
        if source != result:
            stale.append(str(path.relative_to(ROOT)))
            if not args.check:
                path.write_text(result, encoding='utf-8')
    if args.check and stale:
        raise SystemExit('Stale shared components: ' + ', '.join(stale))
    print(f'{len(paths)} static pages: shared components ' + ('verified' if args.check else 'rendered'))
