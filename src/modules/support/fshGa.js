import {log} from './debug';
import {playerId} from './layout';

var times = {};
var refAry = ['www.lazywebtools.co.uk', 'refreshthing.com'];

function isAuto() {
  var docRef = document.referrer
    .match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  if (docRef) {docRef = docRef[1];}
  return refAry.includes(docRef);
}

function noGa() {
  return isAuto() || typeof ga === 'undefined';
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
  if (noGa()) {return;}
  ga('fshApp.send', 'exception', {
    exDescription: desc,
    exFatal: fatal
  });
}

window.addEventListener('error', function(e) {
  sendException(e.error.stack, true);
});
