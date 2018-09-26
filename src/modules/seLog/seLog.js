import calf from '../support/calf';
import getForage from '../ajax/getForage';
import jQueryPresent from '../common/jQueryPresent';
import {nowSecs} from '../support/constants';
import partial from '../common/partial';
import setForage from '../ajax/setForage';
import superelite from '../app/superelite';

export var oldLog;
var timeoutId;
var intervalId;

export function disableBackgroundChecks() {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
    timeoutId = false;
  }
  if (intervalId) {
    window.clearInterval(intervalId);
    intervalId = false;
  }
}

function dataLooksOk(data) {
  return data && data.t;
}

function updateSeLog(serverTime, element) {
  var myTime = serverTime - element.time;
  var mobName = element.creature.name.replace(' (Super Elite)', '');
  if (!oldLog.se[mobName] || oldLog.se[mobName] < myTime) {
    oldLog.se[mobName] = myTime;
  }
}

function processSeData(data) {
  var serverTime = Number(data.t.split(' ')[1]);
  if (!oldLog) {oldLog = {lastUpdate: 0, se: {}};}
  oldLog.lastUpdate = serverTime;
  var resultAry = data.r;
  if (resultAry) {
    resultAry.forEach(partial(updateSeLog, serverTime));
    setForage('fsh_seLog', oldLog);
  }
}

function gotSe(data) {
  if (dataLooksOk(data)) {processSeData(data);}
}

function getSeLog() { // jQuery.min
  return superelite().done(gotSe);
}

export function doBackgroundCheck() {
  disableBackgroundChecks();
  intervalId = window.setInterval(getSeLog, 300000);
  return getSeLog();
}

function whenWasLastCheck() {
  return nowSecs - (oldLog && oldLog.lastUpdate || 0);
}

function setupBackgroundCheck() {
  var lastCheckSecs = whenWasLastCheck();
  if (lastCheckSecs >= 600) {
    doBackgroundCheck();
  } else {
    timeoutId = window.setTimeout(doBackgroundCheck,
      (600 - lastCheckSecs) * 1000);
  }
}

function gotLog(data) {
  if (data) {oldLog = data;}
}

export function getFshSeLog() { // jQuery.min
  return getForage('fsh_seLog').done(gotLog);
}

function shouldLog() {
  return jQueryPresent() && calf.enableSeTracker && calf.cmd !== 'superelite';
}

export function seLog() { // jQuery.min
  if (shouldLog()) {
    getFshSeLog().done(setupBackgroundCheck);
  }
}
