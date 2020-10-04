import { I as getElementsByClassName, aJ as months, a7 as now } from './calfSystem-975d976a.js';
import { i as intValue } from './intValue-ef353ded.js';
import { v as valueText } from './valueText-987489d3.js';
import { p as padZ } from './padZ-b87d0d09.js';

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
//# sourceMappingURL=timeBox-ba2a3fa6.js.map
