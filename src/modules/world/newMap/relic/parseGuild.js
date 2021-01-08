import createDocument from '../../../system/createDocument';
import querySelectorAll from '../../../common/querySelectorAll';
import round from '../../../common/round';
import setText from '../../../dom/setText';
import { lDPercentageElement, relicCountElement } from './secondaryElements';

export let relicMultiplier;

function calcRelicMultiplier(rels) {
  if (rels === 1) { return 1.5; }
  return round(1 - rels / 10, 2);
}

export function parseGuild(html) {
  const doc = createDocument(html);
  const nodeList = querySelectorAll('#pCC img[src*="/relics/"]', doc);
  const relicCount = nodeList.length;
  setText(relicCount, relicCountElement);
  relicMultiplier = calcRelicMultiplier(relicCount);
  setText(`${String(relicMultiplier * 100)}%`, lDPercentageElement);
}
