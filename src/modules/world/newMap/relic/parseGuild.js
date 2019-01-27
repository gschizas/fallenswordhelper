import createDocument from '../../../system/createDocument';
import querySelectorAll from '../../../common/querySelectorAll';
import setText from '../../../common/setText';
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
  setText(relicCount, relicCountElement);
  relicMultiplier = calcRelicMultiplier(relicCount);
  setText(String(relicMultiplier * 100) + '%', lDPercentageElement);
}
