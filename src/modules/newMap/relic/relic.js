import {createDocument} from '../../system/system';
import {def_suffixSuccessActionResponse} from '../../support/dataObj';
import getGroupStats from '../../ajax/getGroupStats';
import getMercStats from '../../ajax/getMercStats';
import getProfile from '../../ajax/getProfile';
import retryAjax from '../../ajax/retryAjax';
import {
  doCalculations,
  parseDefender,
  resetCounters,
  storeGroupStats,
  storeLeadDefender,
  storeMercStats
} from './calcs';
import {
  lDPercentageElement,
  prepareSecondaryDivs,
  processingStatus,
  relicCountElement,
} from './secondaryElements';
import {myDefenders, primaryElementsSetup} from './primaryElements';

var relicData;
export var player;
export var relicMultiplier;

function ajaxFailure(jqXHR) {
  processingStatus.textContent = jqXHR.status.toString() + ' ' +
    jqXHR.statusText;
}

function getGuild() {
  return retryAjax({
    url: 'index.php',
    data: {
      no_mobile: 1,
      cmd: 'guild',
      subcmd: 'view',
      guild_id: relicData.controlled_by.guild_id
    }
  });
}

function calcRelicMultiplier(rels) {
  if (rels === 1) {return 1.5;}
  return Math.round((1 - rels / 10) * 100) / 100;
}

function parseGuild(html) {
  var doc = createDocument(html);
  var nodeList = doc.querySelectorAll('#pCC img[src*="/relics/"]');
  var relicCount = nodeList.length;
  relicCountElement.textContent = relicCount.toString();
  relicMultiplier = calcRelicMultiplier(relicCount);
  lDPercentageElement.textContent = (relicMultiplier * 100).toString() + '%';
}

function getGroups() {
  return retryAjax({
    url: 'index.php',
    data: {
      no_mobile: 1,
      cmd: 'guild',
      subcmd: 'groups'
    }
  });
}

function parseGroups(html) {
  var doc = createDocument(html);
  var disband = doc.querySelector('#pCC a[href*="confirmDisband"]');
  var viewStats = disband.previousElementSibling.href;
  var prm = [getGroupStats(viewStats).done(storeGroupStats)];
  var hasMerc = disband.parentNode.parentNode.previousElementSibling
    .previousElementSibling.innerHTML.indexOf('"#000099"') !== -1;
  if (hasMerc) {
    prm.push(getMercStats().done(storeMercStats));
  }
  return $.when.apply($, prm);
}

export function getStats() {
  prepareSecondaryDivs(relicData);
  resetCounters();
  player = GameData.player();
  var prm = [];
  prm.push(getGuild().done(parseGuild));
  if (player.hasGroup) {
    prm.push(getGroups().pipe(parseGroups));
  }
  for (var i = 1; i < myDefenders.length; i += 1) {
    prm.push(getProfile(myDefenders[i]).done(parseDefender)
      .fail(ajaxFailure));
  }
  prm.push(getProfile(myDefenders[0]).done(storeLeadDefender));
  $.when.apply($, prm).done(doCalculations);
}

function viewRelic(e, data) {
  relicData = data.response.data;
  if (relicData.defenders.length > 0) {primaryElementsSetup(relicData);}
}

export default function injectRelic() {
  $.subscribe('9' + def_suffixSuccessActionResponse, viewRelic);
}
