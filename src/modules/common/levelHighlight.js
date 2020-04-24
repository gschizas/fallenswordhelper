import getElementsByClassName from './getElementsByClassName';
import getValue from '../system/getValue';
import intValue from '../system/intValue';
import valueText from './valueText';
import { defCharacterVirtualLevel, defStatLevel } from '../support/constants';

export let pvpLowerLevel;
export let pvpUpperLevel;
export let gvgLowerLevel;
export let gvgUpperLevel;

const lowerGvgCalcs = [
  (levelToTest) => { if (levelToTest >= 801) { return 100; } },
  (levelToTest) => { if (levelToTest >= 752) { return levelToTest - 701; } },
  (levelToTest) => { if (levelToTest >= 351) { return 50; } },
  (levelToTest) => { if (levelToTest >= 326) { return levelToTest - 301; } },
  () => 25,
];

function calcLvlToTest() {
  return getValue(defCharacterVirtualLevel)
    || intValue(valueText(getElementsByClassName(defStatLevel)));
}

function lowerModifier(levelToTest) {
  return lowerGvgCalcs.find((ary) => ary(levelToTest))(levelToTest);
}

function calcLowerGvGLevel(levelToTest) {
  return levelToTest - lowerModifier(levelToTest);
}

function calcLowerPvpLevel(levelToTest) {
  let modifier = 10;
  if (levelToTest <= 209) { modifier = levelToTest - 200; }
  if (levelToTest <= 205) { modifier = 5; }
  return levelToTest - modifier;
}

function calcUpperPvpLevel(levelToTest) {
  let modifier = 10;
  if (levelToTest < 200) { modifier = 5; }
  return levelToTest + modifier;
}

function calcUpperGvgLevel(levelToTest) {
  let modifier = 100;
  if (levelToTest <= 700) { modifier = 50; }
  if (levelToTest <= 300) { modifier = 25; }
  return levelToTest + modifier;
}

export function calculateBoundaries() {
  const levelToTest = calcLvlToTest();
  pvpLowerLevel = calcLowerPvpLevel(levelToTest);
  pvpUpperLevel = calcUpperPvpLevel(levelToTest);
  gvgLowerLevel = calcLowerGvGLevel(levelToTest);
  gvgUpperLevel = calcUpperGvgLevel(levelToTest);
}
