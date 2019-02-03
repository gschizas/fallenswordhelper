import getElementsByClassName from './getElementsByClassName';
import getValue from '../system/getValue';
import intValue from '../system/intValue';
import partial from './partial';
import valueText from './valueText';
import {def_characterVirtualLevel, def_statLevel} from '../support/constants';

export var pvpLowerLevel;
export var pvpUpperLevel;
export var gvgLowerLevel;
export var gvgUpperLevel;

var lowerGvgCalcs = [
  function(levelToTest) {if (levelToTest >= 801) {return 100;}},
  function(levelToTest) {if (levelToTest >= 752) {return levelToTest - 701;}},
  function(levelToTest) {if (levelToTest >= 351) {return 50;}},
  function(levelToTest) {if (levelToTest >= 326) {return levelToTest - 301;}},
  function() {return 25;}
];

function calcLvlToTest() {
  return getValue(def_characterVirtualLevel) ||
    intValue(valueText(getElementsByClassName(def_statLevel)));
}

function band(levelToTest, ary) {return ary(levelToTest);}

function lowerModifier(levelToTest) {
  return lowerGvgCalcs.find(partial(band, levelToTest))(levelToTest);
}

function calcLowerGvGLevel(levelToTest) {
  return levelToTest - lowerModifier(levelToTest);
}

function calcLowerPvpLevel(levelToTest) {
  var modifier = 10;
  if (levelToTest <= 209) {modifier = levelToTest - 200;}
  if (levelToTest <= 205) {modifier = 5;}
  return levelToTest - modifier;
}

function calcUpperPvpLevel(levelToTest) {
  var modifier = 10;
  if (levelToTest < 200) {modifier = 5;}
  return levelToTest + modifier;
}

function calcUpperGvgLevel(levelToTest) {
  var modifier = 100;
  if (levelToTest <= 700) {modifier = 50;}
  if (levelToTest <= 300) {modifier = 25;}
  return levelToTest + modifier;
}

export function calculateBoundaries() {
  var levelToTest = calcLvlToTest();
  pvpLowerLevel = calcLowerPvpLevel(levelToTest);
  pvpUpperLevel = calcUpperPvpLevel(levelToTest);
  gvgLowerLevel = calcLowerGvGLevel(levelToTest);
  gvgUpperLevel = calcUpperGvgLevel(levelToTest);
}
