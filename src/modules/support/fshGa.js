import isUndefined from '../common/isUndefined';
import {log} from './debug';
import playerId from '../common/playerId';

var times = {};
var refAry = ['www.lazywebtools.co.uk', 'refreshthing.com'];

function isAuto() {
  var docRef = document.referrer
    .match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  if (docRef) {docRef = docRef[1];}
  return refAry.includes(docRef);
}

function noGa() {
  return isAuto() || isUndefined(window.ga);
}

export function start(category, variable, label) {
  if (noGa()) {return;}
  times[category + ':' + variable + ':' + label] =
    performance.now() * 1000;
}

function sendTiming(category, variable, label) {
  var myTime = Math.round(performance.now() * 1000 -
    times[category + ':' + variable + ':' + label]) / 1000;
  if (myTime > 10) {
    ga('fshApp.send', 'timing', category, variable, Math.round(myTime),
      label);
  }
  //#if _BETA  //  Timing output
  log(variable, myTime + 'ms');
  //#endif
}

export function end(category, variable, label) {
  if (noGa()) {return;}
  sendTiming(category, variable, label);
}

function fixupUrl() {
  var origPath = window.location.pathname + window.location.search;
  var page = origPath.replace(/&m=.*/, '')
    .replace(/&subcmd=&.*/, '')
    .replace(/&subcmd2=&.*/, '')
    .replace(/&[a-z_]+_id=.+/, '')
    .replace(/&id=.+/, '')
    .replace(/&target_player=.+/, '')
    .replace(/&[a-z]+_username=.+/, '')
    .replace(/\?cmd=auctionhouse.+/, '?cmd=auctionhouse')
    .replace(/&subcmd=[0-9a-f]{32}/, '')
    .replace(/&search_active=.+/, '')
    .replace(/&letter=.+/, '')
    .replace(/&guild_name=.+/, '')
    .replace(/&user=.+/, '')
    .replace(/&[a-z_]*page=.+/, '')
    .replace(/&prestige=.+/, '')
    .replace(/&withdraw_amount=.+/, '')
    .replace(/&tickets=.+/, '')
    .replace(/&search=.+/, '')
    .replace(/&target=.+/, '')
    .replace(/&xcv=[0-9a-f]{32}/, '')
    .replace(/\?ref=[0-9]+/, '');
  ga('fsh.set', 'page', page);
}

export function setup() {
  if (noGa()) {return;}

  ga('create', 'UA-76488113-1', 'auto', 'fshApp', {
    userId: playerId(),
    siteSpeedSampleRate: 10
  });
  ga('fshApp.set', 'appName', 'fshApp');
  ga('fshApp.set', 'appVersion', FSH.version + '(' + FSH.calf + ')');
  ga('create', 'UA-76488113-2', 'auto', 'fsh', {
    userId: playerId(),
    siteSpeedSampleRate: 10
  });
  fixupUrl();
  ga('fsh.send', 'pageview');
}

export function screenview(funcName) {
  if (noGa()) {return;}
  ga('fshApp.send', 'screenview', {screenName: funcName});
}

export function sendEvent(eventCategory, eventAction, eventLabel) {
  if (noGa()) {return;}
  ga('fshApp.send', 'event', eventCategory, eventAction, eventLabel);
}

export function sendException(desc, fatal) {
  //#if _BETA  //  sendException
  console.log('sendException', desc); // eslint-disable-line no-console
  //#endif
  if (noGa()) {return;}
  ga('fshApp.send', 'exception', {
    exDescription: desc,
    exFatal: fatal
  });
}

// TODO needs CORS

// window.addEventListener('error', function(e) {
//   // console.log('e.message', e.message);
//   // console.log('e.filename', e.filename);
//   // console.log('e.lineno', e.lineno);
//   // console.log('e.colno', e.colno);
//   console.log('error event', e);
//   if (e.error) {
//     console.log('error event message', e.error.message);
//     console.log('error event stack', e.error.stack);
//   }
//   // sendException(e.error.stack, true);
// });

// var oldError = window.onerror;
// window.onerror = function(message, source, lineno, colno, error) {
//   console.log('onerror message', message);
//   console.log('onerror source', source);
//   console.log('onerror lineno', lineno);
//   console.log('onerror colno', colno);
//   console.log('onerror error', error);
//   console.log('onerror error.message', error.message);
//   console.log('onerror error.stack', error.stack);
// };
