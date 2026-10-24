"""Render shared static navigation/footer. No dependencies; GitHub Pages serves HTML directly."""
from pathlib import Path
import argparse, re
ROOT = Path(__file__).resolve().parents[1]
NAV = [('Home', '/'), ('Publications', '/publications/'), ('Projects', '/projects/'), ('Experience', '/experience/')]
def render(path, source):
    relative = path.relative_to(ROOT).as_posix()
    active = '/' if relative == 'index.html' else '/' + relative.split('/')[0] + '/'
    links = ''.join(f'<a href="{url}"' + (' aria-current="page"' if url == active else '') + f'>{label}</a>' for label, url in NAV)
    header = '<a class="skip-link" href="#main-content">Skip to content</a><header class="site-header"><a class="site-name" href="/">Yixiao Liu</a><button class="menu-toggle" aria-expanded="false" aria-controls="site-navigation" hidden>Menu</button><nav id="site-navigation" aria-label="Main navigation">' + links + '</nav></header>'
    footer = '<footer class="site-footer"><p>© <span id="year">2026</span> Yixiao Liu · <a href="mailto:yxlewis@engineering.upenn.edu">Email</a> · <a href="/assets/Yixiao_Liu_Resume.pdf">CV</a> · <a href="https://github.com/DasVade">GitHub</a></p><p>Hosted by GitHub Pages.</p></footer>'
    for name, text in [('header', header), ('footer', footer)]:
        pattern = f'<!-- shared-{name}:start -->.*?<!-- shared-{name}:end -->'
        source, count = re.subn(pattern, f'<!-- shared-{name}:start -->{text}<!-- shared-{name}:end -->', source, flags=re.S)
        if count != 1:
            raise ValueError(f'{relative}: expected one shared {name} region')
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
