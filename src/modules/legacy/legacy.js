import calf from '../support/calf';
import {createDiv} from '../common/cElement';
import createDocument from '../system/createDocument';
import findImps from './findImps';
import findNode from '../system/findNode';
import {getElementById} from '../common/getElement';
import getImpsRemaining from './getImpsRemaining';
import getValue from '../system/getValue';
import hasCA from './hasCA';
import hasDblr from './hasDblr';
import {imageServer} from '../system/system';
import insertElement from '../common/insertElement';
import jQueryPresent from '../common/jQueryPresent';
import retryAjax from '../ajax/retryAjax';
import setValue from '../system/setValue';
import subscribes from '../newMap/newMap';

function recastImpAndRefresh(responseText) { // Legacy
  var doc = createDocument(responseText);
  if (doc) {
    location.reload();
  }
}

function toggleKsTracker() { // Legacy
  var trackKS = getElementById('Helper:toggleKStracker');
  if (trackKS) {
    trackKS.addEventListener('click', function() {
      setValue('trackKillStreak',
        !getValue('trackKillStreak'));
      location.reload();
    }, true);
  }
}

function canRecast(hasDd, hasSsi, impsRem) {
  return (hasDd || hasSsi) && impsRem === 0;
}

function impRecast(hasDd, hasSsi, impsRem) { // Legacy - Old Map
  if (canRecast(hasDd, hasSsi, impsRem)) {
    var _recastImpAndRefresh = getElementById('Helper:recastImpAndRefresh');
    var impHref = 'index.php?no_mobile=1&cmd=quickbuff&subcmd=activate&target' +
      'Players=' +
      $('dt.stat-name:first').next().text().replace(/,/g, '') +
      '&skills%5B%5D=55';
    _recastImpAndRefresh.addEventListener('click', function() {
      retryAjax(impHref).done(recastImpAndRefresh);
    }, true);
  }
}

function injectOldMap() { // Legacy - Old Map
  // extra world screen text
  var replacementText = '<td background="' + imageServer +
    '/skin/realm_right_bg.jpg"><table align="right" cellpadding="1" ' +
    'style="width:270px;margin-left:38px;margin-right:38px;font-size' +
    ':medium; border-spacing: 1px; border-collapse: collapse;"><tr><' +
    'td colspan="2" height="10"></td></tr><tr>';
  var hasShieldImp = findNode('//img[contains(@src,"/55_sm.gif")]');
  var hasDeathDealer = findNode('//img[contains(@src,"/50_sm.gif")]');
  var impsRemaining = getImpsRemaining(hasShieldImp);
  replacementText += findImps(hasDeathDealer, hasShieldImp, impsRemaining);
  replacementText += hasCA();
  replacementText += hasDblr();
  if (calf.huntingMode) {
    replacementText += '<tr><td style="font-size: small; color:red">' +
      'Hunting mode enabled</td></tr>';
  }
  replacementText += '<tr><td colspan="2" height="10"></td></tr>';
  replacementText += '</td>';

  var injectHere = findNode('//div[table[@class="centered" ' +
    'and @style="width: 270px;"]]');
  if (!injectHere) {return;}
  // insert after kill all monsters image and text
  var newSpan = createDiv({innerHTML: replacementText});
  insertElement(injectHere, newSpan);

  impRecast(hasDeathDealer, hasShieldImp, impsRemaining);
  toggleKsTracker();
}

function oldOrNew() {
  if (getElementById('worldPage') && window.GameData) { // new map
    subscribes();
  } else { // not new map.
    injectOldMap();
  }
}

export default function injectWorld() {
  if (jQueryPresent()) {oldOrNew();}
}
