(function () {
  'use strict';

  // Measure the real page, never an embedded or local-preview document.
  const measurementId = 'G-ML2YMGCHN5';
  if (window.parent !== window || location.origin !== 'https://yixiaoliu.me' ||
      document.getElementById('portfolio-google-tag')) return;

  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) return;
  let route;
  try {
    route = new URL(canonical.href);
    if (route.origin !== location.origin ||
        !/^\/(?:[a-z0-9-]+\/)*$/.test(route.pathname)) return;
  } catch {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  // Standard cookie-based GA4; no fabricated consent choices or custom timer.
  // GA4 measures focus/visibility on this top-level document itself.
  window.gtag('config', measurementId, {
    send_page_view: true,
    page_location: route.origin + route.pathname,
    page_title: 'Portfolio ' + route.pathname,
    page_referrer: '',
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  const tag = document.createElement('script');
  tag.id = 'portfolio-google-tag';
  tag.async = true;
  tag.referrerPolicy = 'no-referrer';
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.append(tag);
})();
