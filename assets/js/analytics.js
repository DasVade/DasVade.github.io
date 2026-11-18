(function () {
  'use strict';

  const measurementId = 'G-ML2YMGCHN5';

  // Keep enhanced measurement away from names, email links, and downloads.
  if (window.parent !== window) {
    if (location.origin !== 'https://yixiaoliu.me' ||
        location.pathname !== '/assets/analytics/collector.html') return;
    let route;
    try {
      const canonical = window.parent.document.querySelector('link[rel="canonical"]');
      if (!canonical || window.parent.location.origin !== location.origin) return;
      route = new URL(canonical.href);
      if (route.origin !== location.origin ||
          !/^\/(?:[a-z0-9-]+\/)*$/.test(route.pathname)) return;
      history.replaceState(null, '', route.pathname);
      document.title = 'Portfolio ' + route.pathname;
    } catch {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    // Load immediately without claiming consent or allowing analytics/ad cookies.
    gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    gtag('js', new Date());
    gtag('config', measurementId, {
      send_page_view: true,
      page_location: route.origin + route.pathname,
      page_title: document.title,
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

  // Exactly one collector per document, independent of past popup choices.
  if (document.getElementById('portfolio-analytics-frame')) return;
  const frame = document.createElement('iframe');
  frame.id = 'portfolio-analytics-frame';
  frame.hidden = true;
  frame.title = 'Google Analytics';
  frame.referrerPolicy = 'no-referrer';
  frame.src = '/assets/analytics/collector.html?v=4';
  document.body.append(frame);
})();
