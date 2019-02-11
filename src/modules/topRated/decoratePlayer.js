import currentGuildId from '../common/currentGuildId';
import getValue from '../system/getValue';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import isUndefined from '../common/isUndefined';
import {nowSecs} from '../support/now';
import onlineDot from '../common/onlineDot';
import partial from '../common/partial';
import {
  calculateBoundaries,
  pvpLowerLevel,
  pvpUpperLevel
} from '../common/levelHighlight';

var highlightPlayersNearMyLvl;
var myGuildId;

var highlightTests = [
  function() {return highlightPlayersNearMyLvl;},
  function(guildId) {return isUndefined(guildId) || guildId !== myGuildId;},
  function(guildId, data) {return data.last_login >= nowSecs - 604800;},
  function(guildId, data) {return data.virtual_level >= pvpLowerLevel;},
  function(guildId, data) {return data.virtual_level <= pvpUpperLevel;}
];

function condition(guildId, data, el) {return el(guildId, data);}

function pvpHighlight(guildId, data) {
  return highlightTests.every(partial(condition, guildId, data));
}

export function decoratePlayer(aTable, guildId, data) {
  insertHtmlBeforeEnd(aTable.rows[0],
    '<td>' + onlineDot({last_login: data.last_login}) + '</td>');
  if (pvpHighlight(guildId, data)) {
    aTable.parentNode.parentNode.classList.add('lvlHighlight');
  }
}

export function initDecorate() {
  highlightPlayersNearMyLvl = getValue('highlightPlayersNearMyLvl');
  if (highlightPlayersNearMyLvl) {
    calculateBoundaries();
    myGuildId = currentGuildId();
  }
}
