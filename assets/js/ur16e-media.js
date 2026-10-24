(function () {
  'use strict';
  var videos = Array.from(document.querySelectorAll('video'));
  var preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  videos.forEach(function (video) {
    video.addEventListener('play', function () {
      videos.forEach(function (other) { if (other !== video) other.pause(); });
    });
  });
  function motionChanged(event) {
    if (event.matches) videos.forEach(function (video) { video.pause(); });
  }
  if (preference.addEventListener) preference.addEventListener('change', motionChanged);
  else preference.addListener(motionChanged);
})();
