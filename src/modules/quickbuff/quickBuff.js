import addBuffLevels from './addBuffLevels';
import doLabels from './doLabels';
import doPassThru from './doPassThru';
import firstPlayerStats from './firstPlayerStats';
import getElementById from '../common/getElement';
import getProfile from '../ajax/getProfile';
import getSustain from './getSustain';
import insertHtmlAfterEnd from '../common/insertHtmlAfterEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import onclick from '../common/onclick';
import quickActivate from './quickActivate';
import { quickBuffHeader } from './assets';

function setupEventHandlers() {
  onclick(getElementById('helperQBheader'), quickActivate);
  onclick(getElementById('players'), addBuffLevels);
}

export default function injectQuickBuff() { // jQuery.min
  if (jQueryNotPresent()) { return; }
  const quickbuffDiv = getElementById('quickbuff');
  if (!quickbuffDiv) { return; }
  getProfile(window.self).then(getSustain);
  insertHtmlAfterEnd(quickbuffDiv.children[0], quickBuffHeader);
  doLabels();
  doPassThru();
  setupEventHandlers();
  firstPlayerStats();
}
