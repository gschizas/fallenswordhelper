import {getElementById} from '../common/getElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';

var timers = {};
var footWrap = getElementById('foot-wrap');

export function log(text, value) {
  if (footWrap) {
    insertHtmlBeforeEnd(footWrap,
      '<br>' + text + ': ' + value + ' (' + typeof value + ')');
  }
}

export function time(name) {
  if (name) {timers[name] = performance.now() * 1000;}
}

export function timeEnd(name) {
  if (timers[name]) {
    log(name, Math.round(performance.now() * 1000 -
      timers[name]) / 1000 + 'ms');
    delete timers[name];
  }
}
