import all from '../../../common/all';
import allthen from '../../../common/allthen';
import badData from '../badData';
import createDocument from '../../../system/createDocument';
import {def_relicView} from '../../../support/constants';
import getGroupStats from '../../../ajax/getGroupStats';
import getMercStats from '../../../ajax/getMercStats';
import getProfile from '../../../ajax/getProfile';
import indexAjaxData from '../../../ajax/indexAjaxData';
import once from '../../../common/once';
import {parseGuild} from './parseGuild';
import querySelector from '../../../common/querySelector';
import setText from '../../../common/setText';
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
  setText(String(jqXHR.status) + ' ' + jqXHR.statusText, processingStatus);
}

function hasMerc(disband) {
  return disband.parentNode.parentNode.previousElementSibling
    .previousElementSibling.innerHTML.indexOf('"#000099"') !== -1;
}

function buildGroupPrm(disband) {
  var viewStats = disband.previousElementSibling.href;
  var prm = [getGroupStats(viewStats).then(storeGroupStats)];
  if (hasMerc(disband)) {
    prm.push(getMercStats().then(storeMercStats));
  }
  return prm;
}

function parseGroups(html) {
  var doc = createDocument(html);
  var disband = querySelector('#pCC a[href*="confirmDisband"]', doc);
  if (!disband) {return;}
  var prm = buildGroupPrm(disband);
  return all(prm);
}

function getGroups() {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'groups'
  }).then(parseGroups);
}

function getGuild() {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'view',
    guild_id: relicData.controlled_by.guild_id
  }).then(parseGuild);
}

function getDefenderProfile(el, i) {
  if (i === 0) {return getProfile(el).then(storeLeadDefender);}
  return getProfile(el).then(parseDefender).catch(ajaxFailure);
}

function getDefenders() {
  return myDefenders.map(getDefenderProfile);
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
  allthen(prm, doCalculations);
}

function viewRelic(e, data) {
  if (badData(data)) {return;}
  relicData = data.response.data;
  if (relicData.defenders.length > 0) {
    primaryElementsSetup(relicData);
    once([fetchStatsBtn, 'click', getStats]);
  }
}

export default function injectRelic() {
  $.subscribe(def_relicView, viewRelic);
}
