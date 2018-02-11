import getValue from '../system/getValue';
import intValue from '../system/intValue';

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

var lowerPvpCalcs = [
  {
    a: function(levelToTest) {return levelToTest <= 205;},
    b: function() {return 5;}
  },
  {
    a: function(levelToTest) {return levelToTest >= 206 && levelToTest <= 209;},
    b: function(levelToTest) {return levelToTest - 200;}
  },
  {a: function() {return true;}, b: function() {return 10;}}
];

function calcLowerPvpLevel(levelToTest) {
  return levelToTest -
    lowerPvpCalcs.find(function(e) {return e.a(levelToTest);}).b(levelToTest);
}

function calcUpperPvpLevel(levelToTest) {
  var modifier = 10;
  if (levelToTest < 200) {modifier = 5;}
  return levelToTest + modifier;
}

var lowerGvgCalcs = [
  {
    a: function(levelToTest) {return levelToTest >= 801;},
    b: function() {return 100;}
  },
  {
    a: function(levelToTest) {return levelToTest >= 752;},
    b: function(levelToTest) {return levelToTest - 701;}
  },
  {
    a: function(levelToTest) {return levelToTest >= 351;},
    b: function() {return 50;}
  },
  {
    a: function(levelToTest) {return levelToTest >= 326;},
    b: function(levelToTest) {return levelToTest - 301;}
  },
  {a: function() {return true;}, b: function() {return 25;}}
];

function calcLowerGvgLevel(levelToTest) {
  return levelToTest -
    lowerGvgCalcs.find(function(e) {return e.a(levelToTest);}).b(levelToTest);
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
