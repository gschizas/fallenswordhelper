import createDocument from '../../../system/createDocument';
import querySelectorAll from '../../../common/querySelectorAll';
import {lDPercentageElement, relicCountElement} from './secondaryElements';

export var relicMultiplier;

function calcRelicMultiplier(rels) {
  if (rels === 1) {return 1.5;}
  return Math.round((1 - rels / 10) * 100) / 100;
}

export function parseGuild(html) {
  var doc = createDocument(html);
  var nodeList = querySelectorAll('#pCC img[src*="/relics/"]', doc);
  var relicCount = nodeList.length;
  relicCountElement.textContent = relicCount.toString();
  relicMultiplier = calcRelicMultiplier(relicCount);
  lDPercentageElement.textContent = (relicMultiplier * 100).toString() + '%';
}
