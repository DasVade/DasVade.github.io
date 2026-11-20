(() => {
  const records = JSON.parse(document.getElementById('episode-data').textContent);
  const buttons = Array.from(document.querySelectorAll('button[data-record]'));
  const detail = document.getElementById('episode-detail');
  const overview = document.querySelector('.econ-grid');
  const narrow = window.matchMedia('(max-width: 740px)');
  let active;
  function placeDetail() {
    if (narrow.matches && active) {
      active.parentElement.after(detail);
    } else {
      overview.after(detail);
    }
  }
  narrow.addEventListener('change', placeDetail);
  function select(button) {
    if (active) active.setAttribute('aria-pressed', 'false');
    active = button;
    placeDetail();
    button.setAttribute('aria-pressed', 'true');
    const row = records[Number(button.dataset.record)];
    document.getElementById('episode-name').textContent = row.family + ' · Episode ' + row.episode;
    document.getElementById('episode-record').textContent = row.rounds + ' rounds · Contracts accepted: ' + row.accepted + ' · Fulfilled: ' + row.fulfilled;
    document.getElementById('episode-events').textContent = Object.entries(row.events)
      .map(([name, count]) => name + ': ' + count).join(' · ');
    const gains = row.gains.map((gain, i) => 'Agent ' + (i + 1) + ': ' + (gain > 0 ? '+' : '') + Number(gain.toFixed(2)));
    document.getElementById('episode-gains').textContent = 'Gain over exit (points) · ' + gains.join('  /  ');
  }
  document.querySelectorAll('.episode-grid').forEach(group => {
    const cells = Array.from(group.querySelectorAll('button'));
    cells.forEach((cell, i) => {
      cell.tabIndex = i === 0 ? 0 : -1;
      cell.addEventListener('click', () => {
        cells.forEach(item => item.tabIndex = item === cell ? 0 : -1);
        select(cell);
      });
      cell.addEventListener('keydown', event => {
        const offsets = {ArrowRight: 1, ArrowLeft: -1, ArrowUp: -10, ArrowDown: 10};
        if (!(event.key in offsets)) return;
        event.preventDefault();
        const next = cells[Math.max(0, Math.min(cells.length - 1, i + offsets[event.key]))];
        next.click();
        next.focus();
      });
    });
  });
  select(buttons[0]);
})();