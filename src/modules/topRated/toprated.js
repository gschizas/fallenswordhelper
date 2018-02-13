import currentGuildId from '../common/currentGuildId';
import getProfile from '../ajax/getProfile';
import getValue from '../system/getValue';
import guildView from '../app/guild/view';
import isObject from '../common/isObject';
import jQueryPresent from '../common/jQueryPresent';
import {nowSecs} from '../support/constants';
import {onlineDot} from '../common/colouredDots';
import {pCC} from '../support/layout';
import {playerDataObject} from '../common/common';
import {
  calculateBoundaries,
  pvpLowerLevel,
  pvpUpperLevel
} from '../common/levelHighlight';
import {createInput, createSpan} from '../common/cElement';

var highlightPlayersNearMyLvl;
var spinner;
var validPvP = nowSecs - 604800;
var guilds;
var myGuildId;

var highlightTests = [
  function() {return highlightPlayersNearMyLvl;},
  function(guildId) {
    return typeof guildId === 'undefined' || guildId !== myGuildId;
  },
  function(guildId, data) {return data.last_login >= validPvP;},
  function(guildId, data) {return data.virtual_level >= pvpLowerLevel;},
  function(guildId, data) {return data.virtual_level <= pvpUpperLevel;}
];

function pvpHighlight(guildId, data) {
  return highlightTests.every(function(el) {
    return el(guildId, data);
  });
}

function doOnlineDot(aTable, guildId, data) {
  aTable.rows[0].insertAdjacentHTML('beforeend',
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
    aTable.rows[0].insertAdjacentHTML('beforeend',
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
  var guildHRef = tbl.rows[0].cells[0].firstElementChild.href;
  var guildId = /guild_id=(\d+)/.exec(guildHRef)[1];
  addPlayerObjectToGuild(guildId, {dom: tbl, player: playerName});
}

function stackAjax(prm, playerName, tbl, guildId) {
  prm.push(getProfile(playerName)
    .pipe(null, failFilter)
    .done(parsePlayer.bind(null, tbl, guildId))
  );
}

function parseGuild(data) {
  var guildId = data.r.id;
  data.r.members.forEach(function(member) {
    guilds[guildId].forEach(function(player) {
      if (member.name === player.player) {
        doOnlineDot(player.dom, guildId, {
          last_login: (nowSecs - member.last_activity).toString(),
          virtual_level: member.vl
        });
      }
    });
  });
}

function findOnlinePlayers() { // jQuery
  var someTables = pCC.getElementsByTagName('table');
  var prm = [];
  guilds = {};
  Array.prototype.slice.call(someTables, 4).forEach(function(tbl) {
    var playerName = tbl.textContent.trim();
    if (tbl.rows[0].cells[0].firstElementChild) {
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
  $.when.apply($, prm).done(function() {
    spinner.classList.add('fshHide');
  });
}

function getMyVL(e) { // jQuery
  $(e.target).qtip('hide');
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
  var theCell = pCC.getElementsByTagName('TD')[0];
  theCell.firstElementChild.className = 'fshTopListWrap';
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
  theCell.insertBefore(findBtn, theCell.firstElementChild);
  findBtn.addEventListener('click', getMyVL);
}

var topRatedTests = [
  function() {return jQueryPresent();},
  function() {return isObject(pCC);},
  function() {return isObject(pCC.firstElementChild);},
  function() {return isObject(pCC.firstElementChild.rows);},
  function() {return pCC.firstElementChild.rows.length > 2;},
  function() {
    return pCC.firstElementChild.rows[1].textContent.indexOf(
      'Last Updated') === 0;
  }
];

function testforTopRated() {
  return topRatedTests.every(function(e) {return e();});
}

export default function injectTopRated() {
  if (testforTopRated()) {looksLikeTopRated();}
}
