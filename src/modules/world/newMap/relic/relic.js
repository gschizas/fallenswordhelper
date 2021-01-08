import all from '../../../common/all';
import allthen from '../../../common/allthen';
import badData from '../badData';
import createDocument from '../../../system/createDocument';
import { defRelicView } from '../../../support/constants';
import getGroupStats from '../../../ajax/getGroupStats';
import getMercStats from '../../../ajax/getMercStats';
import getProfile from '../../../ajax/getProfile';
import indexAjaxData from '../../../ajax/indexAjaxData';
import once from '../../../common/once';
import { parseGuild } from './parseGuild';
import querySelector from '../../../common/querySelector';
import setText from '../../../dom/setText';
import {
  doCalculations,
  parseDefender,
  resetCounters,
  storeGroupStats,
  storeLeadDefender,
  storeMercStats,
} from './calcs';
import {
  fetchStatsBtn,
  myDefenders,
  primaryElementsSetup,
} from './primaryElements';
import {
  prepareSecondaryDivs,
  processingStatus,
} from './secondaryElements';

let relicData;

function ajaxFailure(err) {
  setText(err.message, processingStatus);
}

function hasMerc(disband) {
  return disband.parentNode.parentNode.previousElementSibling
    .previousElementSibling.innerHTML.indexOf('"#000099"') !== -1;
}

function buildGroupPrm(disband) {
  const viewStats = disband.previousElementSibling.href;
  const prm = [getGroupStats(viewStats).then(storeGroupStats)];
  if (hasMerc(disband)) {
    prm.push(getMercStats().then(storeMercStats));
  }
  return prm;
}

function parseGroups(html) {
  const doc = createDocument(html);
  const disband = querySelector('#pCC a[href*="confirmDisband"]', doc);
  if (!disband) { return; }
  const prm = buildGroupPrm(disband);
  return all(prm);
}

function getGroups() {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'groups',
  }).then(parseGroups);
}

function getGuild() {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'view',
    guild_id: relicData.controlled_by.guild_id,
  }).then(parseGuild);
}

function getDefenderProfile(el, i) {
  if (i === 0) { return getProfile(el).then(storeLeadDefender); }
  return getProfile(el).then(parseDefender).catch(ajaxFailure);
}

function getDefenders() {
  return myDefenders.map(getDefenderProfile);
}

function buildStatPrm() {
  let prm = [getGuild()];
  if (GameData.player().hasGroup) {
    prm.push(getGroups());
  }
  prm = prm.concat(getDefenders());
  return prm;
}

export function getStats() {
  prepareSecondaryDivs(relicData);
  resetCounters();
  const prm = buildStatPrm();
  allthen(prm, doCalculations);
}

function viewRelic(e, data) {
  if (badData(data)) { return; }
  relicData = data.response.data;
  if (relicData.defenders.length > 0) {
    primaryElementsSetup(relicData);
    once(fetchStatsBtn, 'click', getStats);
  }
}

export default function injectRelic() {
  $.subscribe(defRelicView, viewRelic);
}
