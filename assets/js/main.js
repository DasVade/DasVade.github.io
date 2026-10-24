(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  var button = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-navigation');
  if (!button || !nav) return;
  var mobile = window.matchMedia('(max-width: 650px)');
  function setOpen(open) {
    button.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-collapsed', mobile.matches && !open);
  }
  function update() { button.hidden = !mobile.matches; setOpen(!mobile.matches); }
  button.addEventListener('click', function () { setOpen(button.getAttribute('aria-expanded') !== 'true'); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mobile.matches && button.getAttribute('aria-expanded') === 'true') { setOpen(false); button.focus(); }
  });
  mobile.addEventListener('change', update);
  update();
})();
