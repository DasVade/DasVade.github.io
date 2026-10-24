(function () {
  'use strict';
  document.querySelectorAll('img[data-animation]').forEach(function (image) {
  var figure = image.closest('figure');
  var button = figure.querySelector('button');
  var status = figure.querySelector('[role="status"]');
  if (!image || !button || !status) return;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var playing = false;

  function setPlaying(next) {
    playing = next;
    image.src = next ? image.dataset.animation : image.dataset.poster;
    button.textContent = next ? 'Pause animation' : 'Play animation';
    button.setAttribute('aria-pressed', String(next));
    status.textContent = next ? (image.dataset.description || 'Playing the original 10-second simulation.') : 'Static starting frame.';
  }

  button.hidden = false;
  setPlaying(image.id === 'hover-demo' && !reducedMotion.matches);
  button.addEventListener('click', function () { setPlaying(!playing); });
  function preferenceChanged(event) {
    if (event.matches) setPlaying(false);
  }
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', preferenceChanged);
  else reducedMotion.addListener(preferenceChanged);
  });
})();
