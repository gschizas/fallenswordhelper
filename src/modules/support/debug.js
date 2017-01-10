var timers = {};
var footWrap = document.getElementById('foot-wrap');

function log(text, value) { // Native
  if (footWrap) {
    footWrap.insertAdjacentHTML('beforeend',
      '<br>' + text + ': ' + value + ' (' + typeof value + ')');
  }
}

function time(name) { // Native
  if (name) {timers[name] = performance.now() * 1000;}
}

function timeEnd(name) { // Native
  if (timers[name]) {
    log(name, Math.round(performance.now() * 1000 -
      timers[name]) / 1000 + 'ms' );
    delete timers[name];
  }
}

export default { // Native
  log: log,
  time: time,
  timeEnd: timeEnd
};
