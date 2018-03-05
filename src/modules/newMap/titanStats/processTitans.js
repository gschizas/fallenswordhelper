import {addRows} from './common';
import padZ from '../../system/padZ';
import {realmName} from './realm';
import roundToString from '../../common/roundToString';
import {textSpan} from '../../common/cElement';
import {titanId} from './hasTitan';
import {clearMemberRows, titanTbl} from './buildTitanInfoTable';
import {
  cooldownText,
  currentHp,
  currentPct,
  guildKills,
  maxHp,
  statusText,
  totalPct
} from './placeholders';
import {getKillsPct, getTitanString} from '../../scoutTower/injectScouttower';
import {months, now} from '../../support/constants';

function formatOffset(secs) {
  var aDate = new Date(now + secs * 1000);
  var yyyy = aDate.getFullYear();
  var dd = padZ(aDate.getDate());
  var month = months[aDate.getMonth()];
  var hh = padZ(aDate.getHours());
  var mm = padZ(aDate.getMinutes());
  return hh + ':' + mm + ' ' + dd + '/' + month + '/' + yyyy;
}

function getCooldownHtml(cooldown) {
  if (cooldown <= 0) {
    return '<span class="fshGreen cooldown">No active cooldown</span>';
  }
  return '<span class="fshMaroon cooldown">Cooldown until: ' +
    formatOffset(cooldown) +
    '</span>';
}

function doTopLabels(ourTitan) {
  currentHp.textContent = ourTitan.current_hp.toString();
  maxHp.textContent = ourTitan.max_hp.toString();
  guildKills.textContent = ourTitan.kills.toString();
  currentPct.textContent = roundToString(getKillsPct(ourTitan.max_hp -
    ourTitan.current_hp, ourTitan.kills), 2);
  totalPct.textContent = roundToString(ourTitan.kills * 100 / ourTitan.max_hp,
    2);
  statusText.innerHTML = getTitanString(ourTitan.kills, ourTitan.max_hp,
    ourTitan.current_hp);
  cooldownText.innerHTML = getCooldownHtml(ourTitan.cooldown);
}

function doMemberRows(ourTitan) {
  clearMemberRows();
  var memberRows = ourTitan.contributors.map(function(member) {
    return [[
      [2, textSpan(member.player.name)],
      [2, textSpan(member.kills.toString())],
      [2, textSpan(roundToString(member.kills * 100 / ourTitan.kills, 2) + '%')]
    ]];
  });
  addRows(titanTbl, memberRows);
}

function currentTitan(el) {
  return el.realm && el.creature.base_id === titanId && el.realm === realmName;
}

export function processTitans(r) {
  var ourTitan = r.find(currentTitan);
  if (ourTitan) {
    doTopLabels(ourTitan);
    doMemberRows(ourTitan);
  }
}
