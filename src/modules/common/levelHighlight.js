import {getValue, intValue} from '../support/system';

export var pvpLowerLevel;
export var pvpUpperLevel;
export var gvgLowerLevel;
export var gvgUpperLevel;

function calcLvlToTest() {
  var levelToTest = intValue(document.getElementsByClassName(
    'stat-level')[0].nextElementSibling.textContent);
  var characterVirtualLevel = getValue('characterVirtualLevel');
  if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
  return levelToTest;
}

function calcLowerPvpLevel(levelToTest) {
  var modifier = 10;
  if (levelToTest <= 205) {modifier = 5;}
  if (levelToTest >= 206 && levelToTest <= 209) {
    modifier = levelToTest - 200;
  }
  return levelToTest - modifier;
}

function calcUpperPvpLevel(levelToTest) {
  var modifier = 10;
  if (levelToTest < 200) {modifier = 5;}
  return levelToTest + modifier;
}

var lowerGvgCalcs = [
  {
    test: function(levelToTest) {return levelToTest >= 801;},
    act: function() {return 100;}
  },
  {
    test: function(levelToTest) {return levelToTest >= 752;},
    act: function(levelToTest) {return levelToTest - 701;}
  },
  {
    test: function(levelToTest) {return levelToTest >= 351;},
    act: function() {return 50;}
  },
  {
    test: function(levelToTest) {return levelToTest >= 326;},
    act: function(levelToTest) {return levelToTest - 301;}
  }
];

function calcLowerGvgLevel(levelToTest) {
  var modifier = 25;
  lowerGvgCalcs.some(function(el) {
    if (el.test(levelToTest)) {
      modifier = el.act(levelToTest);
      return true;
    }
    return false;
  });
  return levelToTest - modifier;
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
  gvgLowerLevel = calcLowerGvgLevel(levelToTest);
  gvgUpperLevel = calcUpperGvgLevel(levelToTest);
}
