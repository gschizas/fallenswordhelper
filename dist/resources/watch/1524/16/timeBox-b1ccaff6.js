import { F as getElementsByClassName, aI as months, a6 as now } from './calfSystem-6e4b53e3.js';
import { i as intValue } from './intValue-8ba42bf3.js';
import { v as valueText } from './valueText-424c7b17.js';
import { p as padZ } from './padZ-e4d6f7a0.js';

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
//# sourceMappingURL=timeBox-b1ccaff6.js.map
