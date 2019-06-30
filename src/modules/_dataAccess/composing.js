import createDocument from '../system/createDocument';
import getArrayByClassName from '../common/getArrayByClassName';
import getTextTrim from '../common/getTextTrim';
import indexAjaxData from '../ajax/indexAjaxData';

function formatTime(e) {
  const thisTime = e.match(/ETA: (\d+)h (\d+)m (\d+)s/);
  return {
    time_remaining: Number(thisTime[1]) * 60 * 60 +
    Number(thisTime[2]) * 60 +
    Number(thisTime[3])
  };
}

function parseReport(html) {
  const doc = createDocument(html);
  const slots = getArrayByClassName('composing-potion', doc);
  if (!slots) {return {s: false};}
  const max_potions = slots.length;
  const potions = getArrayByClassName('composing-potion-time', doc)
    .map(getTextTrim)
    .filter(e => e.endsWith('s'))
    .map(formatTime);
  return {r: {max_potions, potions}, s: true};
}

// Incomplete
export default function composing() {
  return indexAjaxData({cmd: 'composing'}).then(parseReport);
}
