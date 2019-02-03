import currentGuildId from '../common/currentGuildId';
import functionPasses from '../common/functionPasses';
import getArrayByTagName from '../common/getArrayByTagName';
import getElementsByTagName from '../common/getElementsByTagName';
import getProfile from '../ajax/getProfile';
import getText from '../common/getText';
import getTextTrim from '../common/getTextTrim';
import getValue from '../system/getValue';
import guildView from '../app/guild/view';
import hideElement from '../common/hideElement';
import hideQTip from '../common/hideQTip';
import insertElementAfterBegin from '../common/insertElementAfterBegin';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import isObject from '../common/isObject';
import isUndefined from '../common/isUndefined';
import jQueryPresent from '../common/jQueryPresent';
import on from '../common/on';
import onlineDot from '../common/onlineDot';
import {pCC} from '../support/layout';
import partial from '../common/partial';
//#if _DEV  //  get cloaked players
import playerDataObject from '../common/playerDataObject';
//#endif
import {sendEvent} from '../support/fshGa';
import uniq from '../common/uniq';
import when from '../common/when';
import {
  calculateBoundaries,
  pvpLowerLevel,
  pvpUpperLevel
} from '../common/levelHighlight';
import {createInput, createSpan} from '../common/cElement';
import {def_table, nowSecs} from '../support/constants';

var highlightPlayersNearMyLvl;
var spinner;
var validPvP = nowSecs - 604800;
var guilds;
var myGuildId;

var highlightTests = [
  function() {return highlightPlayersNearMyLvl;},
  function(guildId) {return isUndefined(guildId) || guildId !== myGuildId;},
  function(guildId, data) {return data.last_login >= validPvP;},
  function(guildId, data) {return data.virtual_level >= pvpLowerLevel;},
  function(guildId, data) {return data.virtual_level <= pvpUpperLevel;}
];

function condition(guildId, data, el) {return el(guildId, data);}

function pvpHighlight(guildId, data) {
  return highlightTests.every(partial(condition, guildId, data));
}

function doOnlineDot(aTable, guildId, data) {
  insertHtmlBeforeEnd(aTable.rows[0],
    '<td>' + onlineDot({last_login: data.last_login}) + '</td>');
  if (pvpHighlight(guildId, data)) {
    aTable.parentNode.parentNode.classList.add('lvlHighlight');
  }
}

function parsePlayer(aTable, guildId, data, jqXhr) {
  if (data) {
    doOnlineDot(aTable, guildId, data);
    //#if _DEV  //  get cloaked players
    var defender = playerDataObject(data);
    if (defender.cloakLevel !== 0) {console.log('Cloaked Player', data);} // eslint-disable-line no-console
    //#endif
  } else {
    insertHtmlBeforeEnd(aTable.rows[0],
      '<td class="fshBkRed">' + jqXhr.status + '</td>');
  }
}

function failFilter(jqXhr) {
  return $.Deferred().resolve(null, jqXhr).promise();
}

function addPlayerObjectToGuild(guildId, obj) {
  if (guilds[guildId]) {
    guilds[guildId].push(obj);
  } else {
    guilds[guildId] = [obj];
  }
}

function addPlayerToGuild(tbl, playerName) {
  var guildHRef = tbl.rows[0].cells[0].children[0].href;
  var guildId = /guild_id=(\d+)/.exec(guildHRef)[1];
  addPlayerObjectToGuild(guildId, {dom: tbl, player: playerName});
}

function stackAjax(prm, playerName, tbl, guildId) {
  prm.push(getProfile(playerName)
    .pipe(null, failFilter)
    .done(partial(parsePlayer, tbl, guildId))
  );
}

function eachPlayer(member, guildId, player) {
  if (member.name === player.player) {
    doOnlineDot(player.dom, guildId, {
      last_login: member.last_activity.toString(),
      virtual_level: member.vl
    });
  }
}

function eachMember(guildId, member) {
  guilds[guildId].forEach(partial(eachPlayer, member, guildId));
}

function eachRank(guildId, rank) {
  rank.members.forEach(partial(eachMember, guildId));
}

function parseGuild(data) {
  var guildId = data.r.id;
  // data.r.ranks.forEach(partial(eachRank, guildId));
  uniq(data.r.ranks, 'id').forEach(partial(eachRank, guildId)); // BUG
}

function hideSpinner() {
  hideElement(spinner);
}

function findOnlinePlayers() { // jQuery
  var someTables = getArrayByTagName(def_table, pCC);
  var prm = [];
  guilds = {};
  someTables.slice(4).forEach(function(tbl) {
    var playerName = getTextTrim(tbl);
    if (tbl.rows[0].cells[0].children[0]) {
      addPlayerToGuild(tbl, playerName);
    } else {
      stackAjax(prm, playerName, tbl);
    }
  });
  Object.keys(guilds).forEach(function(guildId) {
    if (guilds[guildId].length === 1) {
      stackAjax(prm, guilds[guildId][0].player, guilds[guildId][0].dom,
        guildId);
    } else {
      guildView(guildId).done(parseGuild);
    }
  });
  when(prm, hideSpinner);
}

function getMyVL(e) {
  sendEvent('toprated', 'FindOnlinePlayers');
  hideQTip(e.target);
  spinner = createSpan({
    className: 'fshCurveContainer fshTopListSpinner',
    innerHTML: '<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'
  });
  e.target.parentNode.replaceChild(spinner, e.target);
  highlightPlayersNearMyLvl = getValue('highlightPlayersNearMyLvl');
  if (highlightPlayersNearMyLvl) {
    calculateBoundaries();
    myGuildId = currentGuildId();
  }
  findOnlinePlayers();
}

function looksLikeTopRated() {
  var theCell = getElementsByTagName('td', pCC)[0];
  theCell.children[0].className = 'fshTopListWrap';
  var findBtn = createInput({
    id: 'fshFindOnlinePlayers',
    className: 'custombutton tip-static',
    type: 'button',
    value: 'Find Online Players',
    dataset: {
      tipped: 'Fetch the online status of the ' +
        'top 250 players (warning ... takes a few seconds).'
    }
  });
  insertElementAfterBegin(theCell, findBtn);
  on(findBtn, 'click', getMyVL);
}

var topRatedTests = [
  function() {return jQueryPresent();},
  function() {return isObject(pCC);},
  function() {return isObject(pCC.children[0]);},
  function() {return isObject(pCC.children[0].rows);},
  function() {return pCC.children[0].rows.length > 2;},
  function() {
    return getText(pCC.children[0].rows[1]).startsWith('Last Updated');
  }
];

function testforTopRated() {
  return topRatedTests.every(functionPasses);
}

export default function injectTopRated() {
  if (testforTopRated()) {looksLikeTopRated();}
}
