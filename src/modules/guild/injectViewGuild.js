import add from '../support/task';
import {lastActivityRE} from '../support/dataObj';
import * as guildUtils from './guildUtils';
import * as layout from '../support/layout';
import * as system from '../support/system';

function calcLvlToTest() {
  var levelToTest = system.intValue(document.getElementsByClassName(
    'stat-level')[0].nextElementSibling.textContent);
  var characterVirtualLevel = system.getValue('characterVirtualLevel');
  if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
  return levelToTest;
}

function calcPvpRange(levelToTest) {
  if (levelToTest <= 205) {return 5;}
  return 10;
}

function calcGvgRange(levelToTest) {
  if (levelToTest <= 300) {
    return 25;
  }
  if (levelToTest <= 700) {
    return 50;
  }
  return 100;
}

export default function injectViewGuild() {
  add(3, layout.colouredDots);
  guildUtils.removeGuildAvyImgBorder();
  guildUtils.guildXPLock();
  var highlightPlayersNearMyLvl =
    system.getValue('highlightPlayersNearMyLvl');
  var highlightGvGPlayersNearMyLvl =
    system.getValue('highlightGvGPlayersNearMyLvl');
  if (!highlightPlayersNearMyLvl && !highlightGvGPlayersNearMyLvl) {return;}
  var levelToTest = calcLvlToTest();
  var pvpRange = calcPvpRange(levelToTest);
  var gvgRange = calcGvgRange(levelToTest);
  var memList = document.querySelectorAll(
    '#pCC a[data-tipped*="<td>VL:</td>"]');
  Array.prototype.forEach.call(memList, function(el) {
    var tipped = el.getAttribute('data-tipped');
    var lastActDays = lastActivityRE.exec(tipped)[1];
    var vlevel = Number(/VL:.+?(\d+)/.exec(tipped)[1]);
    var aRow = el.parentNode.parentNode;
    if (lastActDays < 7 &&
        highlightPlayersNearMyLvl &&
        Math.abs(vlevel - levelToTest) <= pvpRange) {
      aRow.classList.add('lvlHighlight');
    } else if (lastActDays < 7 &&
        highlightGvGPlayersNearMyLvl &&
        Math.abs(vlevel - levelToTest) <= gvgRange) {
      aRow.classList.add('lvlGvGHighlight');
    }
  });
}
