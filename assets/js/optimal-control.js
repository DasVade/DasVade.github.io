(function () {
  'use strict';
  var image = document.getElementById('hover-demo');
  var button = document.getElementById('demo-toggle');
  var status = document.getElementById('demo-status');
  if (!image || !button || !status) return;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var playing = false;

  function setPlaying(next) {
    playing = next;
    image.src = next ? image.dataset.animation : image.dataset.poster;
    button.textContent = next ? 'Pause animation' : 'Play animation';
    button.setAttribute('aria-pressed', String(next));
    status.textContent = next ? 'Playing the original 10-second simulation.' : 'Static starting frame.';
  }

  button.hidden = false;
  setPlaying(!reducedMotion.matches);
  button.addEventListener('click', function () { setPlaying(!playing); });
  function preferenceChanged(event) {
    if (event.matches) setPlaying(false);
  }
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', preferenceChanged);
  else reducedMotion.addListener(preferenceChanged);
})();
