import { I as getElementsByClassName, aI as months, a6 as now } from './calfSystem-2b1fed3f.js';
import { i as intValue } from './intValue-0e84cdad.js';
import { v as valueText } from './valueText-a309b391.js';
import { p as padZ } from './padZ-ce2146a0.js';

function asInt(className) {
  return intValue(
    valueText(getElementsByClassName(className)),
  );
}

function formatShortDate(aDate) {
  return `${padZ(aDate.getHours())}:${
    padZ(aDate.getMinutes())} ${
    aDate.toLocaleString('en', { weekday: 'short' })} ${
    padZ(aDate.getDate())}/${
    months[aDate.getMonth()]}/${
    aDate.getFullYear()}`;
}

function timeBox(nextGainTime, hrsToGo) {
  const nextGain = /([0-9]+)m ([0-9]+)s/.exec(nextGainTime);
  if (!nextGain) { return; }
  return `<dd>${formatShortDate(new Date(
    now + ((hrsToGo * 60 + Number(nextGain[1])) * 60
    + Number(nextGain[2])) * 1000,
  ))}</dd>`;
}

export { asInt as a, timeBox as t };
//# sourceMappingURL=timeBox-4a028222.js.map
