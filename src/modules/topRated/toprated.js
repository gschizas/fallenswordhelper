import getProfile from '../ajax/getProfile';
import {getValue} from '../support/system';
import guildView from '../app/guild/view';
import myStats from '../ajax/myStats';
import {nowSecs} from '../support/dataObj';
import {playerDataObject} from '../common/common';
import {createInput, createSpan} from '../common/cElement';
import {onlineDot, pCC} from '../support/layout';

var highlightPlayersNearMyLvl;
var lvlDiffToHighlight;
var myVL;
var spinner;
var validPvP = nowSecs - 604800;
var guilds;

function doOnlineDot(aTable, data) {
  aTable.rows[0].insertAdjacentHTML('beforeend',
    '<td>' + onlineDot({last_login: data.last_login}) + '</td>');
  if (myVL &&
      data.last_login >= validPvP &&
      data.virtual_level > myVL - lvlDiffToHighlight &&
      data.virtual_level < myVL + lvlDiffToHighlight) {
    aTable.parentNode.parentNode.classList.add('lvlHighlight');
  }
}

function parsePlayer(aTable, data, jqXhr) {
  if (data) {
    doOnlineDot(aTable, data);
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

function stackAjax(prm, playerName, tbl) {
  prm.push(getProfile(playerName)
    .pipe(null, failFilter)
    .done(parsePlayer.bind(null, tbl))
  );
}

function parseGuild(data) {
  var guildId = data.r.id;
  data.r.members.forEach(function(member) {
    guilds[guildId].forEach(function(player) {
      if (member.name === player.player) {
        doOnlineDot(player.dom, {
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
      stackAjax(prm, guilds[guildId][0].player, guilds[guildId][0].dom);
    } else {
      guildView(guildId).done(parseGuild);
    }
  });
  $.when.apply($, prm).done(function() {
    spinner.classList.add('fshHide');
  });
}

function gotMyVl(data) {
  myVL = data.virtual_level;
  lvlDiffToHighlight = 11;
  if (myVL <= 205) {lvlDiffToHighlight = 6;}
}

function getMyVL(e) { // jQuery
  $(e.target).qtip('hide');
  spinner = createSpan({
    className: 'fshCurveContainer fshTopListSpinner',
    innerHTML: '<div class="fshCurveEle fshCurveLbl fshOldSpinner"></div>'
  });
  e.target.parentNode.replaceChild(spinner, e.target);
  if (highlightPlayersNearMyLvl) {
    myStats(false).done(gotMyVl).done(findOnlinePlayers);
  } else {findOnlinePlayers();}
}

function looksLikeTopRated() {
  highlightPlayersNearMyLvl =
    getValue('highlightPlayersNearMyLvl');
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

export default function injectTopRated() {
  if (pCC &&
      pCC.firstElementChild &&
      pCC.firstElementChild.rows &&
      pCC.firstElementChild.rows.length > 2 &&
      pCC.firstElementChild.rows[1].textContent
        .indexOf('Last Updated') === 0) {looksLikeTopRated();}
}
