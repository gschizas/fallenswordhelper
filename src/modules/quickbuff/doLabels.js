import {excludeBuff} from './assets';
import parseBuffLevel from './parseBuffLevel';
import querySelectorArray from '../common/querySelectorArray';

function addStamCost(el, nameSpan) {
  var dataTipped = nameSpan.dataset.tipped;
  var cost = el.previousElementSibling.dataset.cost;
  nameSpan.dataset.tipped = dataTipped
    .replace('</center>', '<br>Stamina Cost: ' + cost + '$&');
}

function canBeDimmed(el, nameSpan) {
  return !excludeBuff.includes(Number(el.htmlFor.slice(6))) &&
    parseBuffLevel(nameSpan.children[0]) < 125;
}

function dimPreReqs(el, nameSpan) {
  if (canBeDimmed(el, nameSpan)) {
    el.classList.add('fshDim');
  }
}

function decorate(el) {
  var nameSpan = el.children[0];
  addStamCost(el, nameSpan);
  dimPreReqs(el, nameSpan);
}

export default function doLabels() {
  querySelectorArray('#buff-outer label[for^="skill-"]').forEach(decorate);
}
