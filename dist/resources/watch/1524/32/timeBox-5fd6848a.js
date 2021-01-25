import { J as getElementsByClassName, aA as months, a5 as now } from './calfSystem-e64be67d.js';
import { i as intValue } from './intValue-da5ad0eb.js';
import { v as valueText } from './valueText-9ff440bc.js';
import { p as padZ } from './padZ-0fd2ec23.js';

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
//# sourceMappingURL=timeBox-5fd6848a.js.map
