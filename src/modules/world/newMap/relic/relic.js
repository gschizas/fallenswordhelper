import badData from '../badData';
import createDocument from '../../../system/createDocument';
import {def_relicView} from '../../../support/constants';
import getGroupStats from '../../../ajax/getGroupStats';
import getMercStats from '../../../ajax/getMercStats';
import getProfile from '../../../ajax/getProfile';
import once from '../../../common/once';
import {parseGuild} from './parseGuild';
import retryAjax from '../../../ajax/retryAjax';
import {
  doCalculations,
  parseDefender,
  resetCounters,
  storeGroupStats,
  storeLeadDefender,
  storeMercStats
} from './calcs';
import {
  fetchStatsBtn,
  myDefenders,
  primaryElementsSetup
} from './primaryElements';
import {
  prepareSecondaryDivs,
  processingStatus
} from './secondaryElements';

var relicData;

function ajaxFailure(jqXHR) {
  processingStatus.textContent = jqXHR.status.toString() + ' ' +
    jqXHR.statusText;
}

function hasMerc(disband) {
  return disband.parentNode.parentNode.previousElementSibling
    .previousElementSibling.innerHTML.indexOf('"#000099"') !== -1;
}

function buildGroupPrm(disband) {
  var viewStats = disband.previousElementSibling.href;
  var prm = [getGroupStats(viewStats).done(storeGroupStats)];
  if (hasMerc(disband)) {
    prm.push(getMercStats().done(storeMercStats));
  }
  return prm;
}

function parseGroups(html) {
  var doc = createDocument(html);
  var disband = doc.querySelector('#pCC a[href*="confirmDisband"]');
  if (!disband) {return;}
  var prm = buildGroupPrm(disband);
  return $.when.apply($, prm);
}

function getGroups() {
  return retryAjax({
    url: 'index.php',
    data: {
      no_mobile: 1,
      cmd: 'guild',
      subcmd: 'groups'
    }
  }).pipe(parseGroups);
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
  }).done(parseGuild);
}

function getDefenders() {
  return myDefenders.map(function(el, i) {
    if (i === 0) {return getProfile(el).done(storeLeadDefender);}
    return getProfile(el).done(parseDefender).fail(ajaxFailure);
  });
}

function buildStatPrm() {
  var prm = [getGuild()];
  if (GameData.player().hasGroup) {
    prm.push(getGroups());
  }
  prm = prm.concat(getDefenders());
  return prm;
}

export function getStats() {
  prepareSecondaryDivs(relicData);
  resetCounters();
  var prm = buildStatPrm();
  $.when.apply($, prm).done(doCalculations);
}

function viewRelic(e, data) {
  if (badData(data)) {return;}
  relicData = data.response.data;
  if (relicData.defenders.length > 0) {
    primaryElementsSetup(relicData);
    once(fetchStatsBtn, 'click', getStats);
  }
}

export default function injectRelic() {
  $.subscribe(def_relicView, viewRelic);
}
