import calf from '../support/calf';
import getForage from '../ajax/getForage';
import {nowSecs} from '../support/dataObj';
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

function gotSe(data) {
  var serverTime = Number(data.t.split(' ')[1]);
  if (!oldLog) {oldLog = {lastUpdate: 0, se: {}};}
  oldLog.lastUpdate = serverTime;
  var resultAry = data.r;
  resultAry.forEach(function(element) {
    var myTime = serverTime - element.time;
    var mobName = element.creature.name.replace(' (Super Elite)', '');
    if (!oldLog.se[mobName] || oldLog.se[mobName] < myTime) {
      oldLog.se[mobName] = myTime;
    }
  });
  setForage('fsh_seLog', oldLog);
}

function getSeLog() {
  return superelite().done(gotSe);
}

export function doBackgroundCheck() {
  disableBackgroundChecks();
  intervalId = window.setInterval(getSeLog, 600000);
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

export function getFshSeLog() {
  return getForage('fsh_seLog').done(gotLog);
}

export function seLog() {
  if (calf.enableSeTracker && calf.cmd !== 'superelite') {
    getFshSeLog().done(setupBackgroundCheck);
  }
}
