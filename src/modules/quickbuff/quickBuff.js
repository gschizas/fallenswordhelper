import addBuffLevels from './addBuffLevels';
import doLabels from './doLabels';
import doPassThru from './doPassThru';
import firstPlayerStats from './firstPlayerStats';
import {getElementById} from '../common/getElement';
import getProfile from '../ajax/getProfile';
import getSustain from './getSustain';
import insertHtmlAfterEnd from '../common/insertHtmlAfterEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import on from '../common/on';
import quickActivate from './quickActivate';
import {quickBuffHeader} from './assets';

function setupEventHandlers() {
  on(getElementById('helperQBheader'), 'click', quickActivate);
  on(getElementById('players'), 'click', addBuffLevels);
}

export default function injectQuickBuff() { // jQuery.min
  if (jQueryNotPresent()) {return;}
  var quickbuffDiv = getElementById('quickbuff');
  if (!quickbuffDiv) {return;}
  getProfile(window.self).then(getSustain);
  insertHtmlAfterEnd(quickbuffDiv.children[0], quickBuffHeader);
  doLabels();
  doPassThru();
  setupEventHandlers();
  firstPlayerStats();
}
