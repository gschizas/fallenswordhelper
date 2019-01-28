import {getElementById} from '../common/getElement';
import partial from '../common/partial';

function thisName(name, enhancement) {
  return enhancement.name === name;
}

function thisEnhancementLevel(enhancements, name) {
  var thisEnhancement = enhancements.find(partial(thisName, name));
  return thisEnhancement && thisEnhancement.value || 0;
}

function getEnhancement(enhancements, name, inject) {
  var enhLevel = thisEnhancementLevel(enhancements, name);
  var enhClass = 'fshLime';
  if (enhLevel < 100) {enhClass = 'fshRed';}
  inject.innerHTML = '<span class="' + enhClass + '">' + enhLevel + '%</span>';
}

export default function populateEnhancements(responseText) {
  var enh = responseText._enhancements;
  getEnhancement(enh, 'Sustain', getElementById('fshSus'));
  getEnhancement(enh, 'Fury Caster', getElementById('fshFur'));
}
