import addBuffLevels from './addBuffLevels';
import firstPlayerStats from './firstPlayerStats';
import {getElementById} from '../common/getElement';
import getProfile from '../ajax/getProfile';
import insertHtmlAfterEnd from '../common/insertHtmlAfterEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import on from '../common/on';
import populateBuffs from './populateBuffs';
import quickActivate from './quickActivate';
import {excludeBuff, quickBuffHeader} from './assets';

function getEnhancement(doc, enh, inject) {
  var enhLevel = doc[enh] || 0;
  var enhClass = 'fshLime';
  if (enhLevel < 100) {enhClass = 'fshRed';}
  inject.innerHTML = '<span class="' + enhClass + '">' + enhLevel + '%</span>';
}

function populateEnhancements(responseText) {
  var enh = responseText._enhancements.reduce(function(prev, curr) {
    prev[curr.name] = curr.value;
    return prev;
  }, {});
  getEnhancement(enh, 'Sustain', getElementById('fshSus'));
  getEnhancement(enh, 'Fury Caster', getElementById('fshFur'));
}

function setupEventHandlers() {
  on(getElementById('helperQBheader'), 'click', quickActivate);
  on(getElementById('players'), 'click', addBuffLevels);
}

function eachLabel(el) {
  var nameSpan = el.children[0];
  var dataTipped = nameSpan.dataset.tipped;
  var cost = el.previousElementSibling.dataset.cost;
  nameSpan.dataset.tipped = dataTipped
    .replace('</center>', '<br>Stamina Cost: ' + cost + '$&');
  var lvlSpan = nameSpan.children[0];
  var myLvl = Number(lvlSpan.textContent.replace(/\[|\]/g, ''));
  if (!excludeBuff[el.for] && myLvl < 125) {
    el.classList.add('fshDim');
  }
}

function doLabels() {
  var labels = document.querySelectorAll('#buff-outer label[for^="skill-"]');
  Array.from(labels).forEach(eachLabel);
}

function getSustain(responseText) {
  populateEnhancements(responseText);
  populateBuffs(responseText);
  setupEventHandlers();
  doLabels();
  firstPlayerStats();
}

export default function injectQuickBuff() { // jQuery.min
  if (jQueryNotPresent()) {return;}
  var quickbuffDiv = getElementById('quickbuff');
  if (!quickbuffDiv) {return;}
  insertHtmlAfterEnd(quickbuffDiv.children[0], quickBuffHeader);
  getProfile(window.self).done(getSustain);
}
