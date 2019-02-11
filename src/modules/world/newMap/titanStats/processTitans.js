import {addRows} from './addRows';
import {months} from '../../../support/constants';
import {now} from '../../../support/now';
import padZ from '../../../system/padZ';
import partial from '../../../common/partial';
import {realmName} from './realm';
import roundToString from '../../../common/roundToString';
import setText from '../../../common/setText';
import {textSpan} from '../../../common/cElement';
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
import {
  getKillsPct,
  getTitanString
} from '../../../guild/scoutTower/injectScouttower';

function formatOffset(secs) {
  var aDate = new Date(now + secs * 1000);
  return padZ(aDate.getHours()) + ':' + padZ(aDate.getMinutes()) + ' ' +
    padZ(aDate.getDate()) + '/' + months[aDate.getMonth()] + '/' +
    aDate.getFullYear();
}

function getCooldownHtml(cooldown) {
  if (cooldown <= 0) {
    return '<span class="fshGreen cooldown">No active cooldown</span>';
  }
  return '<span class="fshMaroon cooldown">Cooldown until: ' +
    formatOffset(cooldown) +
    '</span>';
}

function currentPctText(ourTitan) {
  return roundToString(
    getKillsPct(ourTitan.max_hp - ourTitan.current_hp, ourTitan.kills), 2
  );
}

function totalPctText(ourTitan) {
  return roundToString(ourTitan.kills * 100 / ourTitan.max_hp, 2);
}

function statusTextHtml(ourTitan) {
  return getTitanString(ourTitan.kills, ourTitan.max_hp, ourTitan.current_hp);
}

function doTopLabels(ourTitan) {
  setText(ourTitan.current_hp, currentHp);
  setText(ourTitan.max_hp, maxHp);
  setText(ourTitan.kills, guildKills);
  setText(currentPctText(ourTitan), currentPct);
  setText(totalPctText(ourTitan), totalPct);
  statusText.innerHTML = statusTextHtml(ourTitan);
  cooldownText.innerHTML = getCooldownHtml(ourTitan.cooldown);
}

function memberRow(ourTitan, member) {
  return [[
    [2, textSpan(member.player.name)],
    [2, textSpan(member.kills.toString())],
    [2, textSpan(roundToString(member.kills * 100 / ourTitan.kills, 2) + '%')]
  ]];
}

function doMemberRows(ourTitan) {
  clearMemberRows();
  if (!ourTitan.contributors) {return;}
  var memberRows = ourTitan.contributors.map(partial(memberRow, ourTitan));
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
