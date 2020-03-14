import calf from './calf';
import isUndefined from '../common/isUndefined';
//#if _BETA  //  Timing output
import {log} from './debug';
//#endif
import playerId from '../common/playerId';

var times = {};
var refAry = ['pagereboot.com', 'refreshthing.com', 'refreshthis.com',
  'lazywebtools.co.uk'];
var urlPatch = [
  [/&m=.*/],
  [/&subcmd=&.*/],
  [/&subcmd2=&.*/],
  [/&[a-z_]+_id=.+/],
  [/&id=.+/],
  [/&target_player=.+/],
  [/&[a-z]+_username=.+/],
  [/\?cmd=auctionhouse.+/, '?cmd=auctionhouse'],
  [/&subcmd=[0-9a-f]{32}/],
  [/&search_active=.+/],
  [/&letter=.+/],
  [/&guild_name=.+/],
  [/&user=.+/],
  [/&[a-z_]*page=.+/],
  [/&prestige=.+/],
  [/&withdraw_amount=.+/],
  [/&amount=.+/],
  [/&tickets=.+/],
  [/&search=.+/],
  [/&target=.+/],
  [/&xcv=[0-9a-f]{32}/],
  [/\?ref=[0-9]+/]
];

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

function stripExtra(prev, curr) {
  return prev.replace(curr[0], curr[1] || '');
}

function fixupUrl() {
  var origPath = window.location.pathname + window.location.search;
  var page = urlPatch.reduce(stripExtra, origPath);
  ga('fsh.set', 'page', page);
}

export function setup() {
  if (noGa()) {return;}

  ga('create', 'UA-76488113-1', 'auto', 'fshApp', {
    userId: playerId(),
    siteSpeedSampleRate: 10
  });
  ga('fshApp.set', 'appName', 'fshApp');
  ga('fshApp.set', 'appVersion', calf.fshVer + '(' + calf.calfVer + ')');
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
