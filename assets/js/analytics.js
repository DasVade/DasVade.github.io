(function () {
  'use strict';

  const measurementId = 'G-ML2YMGCHN5';
  const preferenceKey = 'portfolio.analytics-consent.v1';
  const disableKey = 'ga-disable-' + measurementId;

  function preference() {
    try {
      return localStorage.getItem(preferenceKey);
    } catch {
      return null;
    }
  }

  // Run the Google tag in a document with no links, forms or personal content,
  // so enhanced measurement does not see interactions with the portfolio.
  if (window.parent !== window) {
    if (location.origin !== 'https://yixiaoliu.me' ||
        location.pathname !== '/assets/analytics/collector.html' ||
        preference() !== 'granted') return;
    let route;
    try {
      const canonical = window.parent.document.querySelector('link[rel="canonical"]');
      if (!canonical || window.parent.location.origin !== location.origin) return;
      route = new URL(canonical.href);
      if (route.origin !== location.origin ||
          !/^\/(?:[a-z0-9-]+\/)*$/.test(route.pathname)) return;
    } catch {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    gtag('consent', 'update', { analytics_storage: 'granted' });
    gtag('js', new Date());
    gtag('config', measurementId, {
      send_page_view: true,
      page_location: route.origin + route.pathname,
      page_title: 'Portfolio ' + route.pathname,
      page_referrer: '',
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.referrerPolicy = 'no-referrer';
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.append(tag);
    return;
  }

  const panel = document.getElementById('analytics-preferences');
  const settings = document.getElementById('analytics-settings');
  if (!panel || !settings) return;
  const status = document.getElementById('analytics-status');
  const decline = document.getElementById('analytics-decline');
  const allow = document.getElementById('analytics-allow');
  let frame;
  let started = false;

  function show(visible) {
    panel.hidden = !visible;
    settings.setAttribute('aria-expanded', String(visible));
  }

  function start() {
    if (started || preference() !== 'granted') return;
    started = true;
    frame = document.createElement('iframe');
    frame.hidden = true;
    frame.title = 'Google Analytics';
    frame.referrerPolicy = 'no-referrer';
    frame.src = '/assets/analytics/collector.html';
    document.body.append(frame);
  }

  function stop() {
    if (frame) {
      frame.contentWindow[disableKey] = true;
      frame.remove();
      frame = undefined;
    }
    // Clear only the analytics cookies from this site's stream.
    for (const cookie of ['_ga', '_ga_' + measurementId.slice(2)]) {
      document.cookie = cookie + '=; Max-Age=0; Path=/; SameSite=Lax';
      document.cookie = cookie + '=; Max-Age=0; Path=/; Domain=' + location.hostname + '; SameSite=Lax';
    }
  }

  function sync() {
    const choice = preference();
    if (choice === 'granted') start();
    else if (frame) stop();
    status.textContent = choice === 'granted' ? 'Google Analytics is allowed.' :
      choice === 'denied' ? 'Google Analytics is off.' : '';
    return choice;
  }

  function choose(choice) {
    try {
      localStorage.setItem(preferenceKey, choice);
    } catch {
      stop();
      status.textContent = 'Google Analytics is off. This browser could not save your choice.';
      return;
    }
    if (choice === 'denied') stop();
    sync();
    const restoreFocus = panel.contains(document.activeElement);
    show(false);
    if (restoreFocus && settings.getBoundingClientRect().top < window.innerHeight) {
      settings.focus({ preventScroll: true });
    }
  }

  decline.addEventListener('click', () => choose('denied'));
  allow.addEventListener('click', () => choose('granted'));
  settings.addEventListener('click', () => {
    const open = panel.hidden;
    sync();
    show(open);
    if (open) decline.focus({ preventScroll: true });
  });
  panel.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      show(false);
      settings.focus({ preventScroll: true });
    }
  });
  window.addEventListener('storage', (event) => {
    if (event.key === preferenceKey || event.key === null) {
      const choice = sync();
      if (choice) show(false);
    }
  });
  window.addEventListener('pageshow', sync);
  settings.hidden = false;
  show(!sync());
})();
