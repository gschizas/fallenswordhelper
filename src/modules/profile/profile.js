import add from '../support/task';
import colouredDots from '../common/colouredDots';
import doStatTotal from './dropitems/doStatTotal';
import fallback from '../system/fallback';
import getElementsByTagName from '../common/getElementsByTagName';
import getText from '../common/getText';
import getUrlParameter from '../system/getUrlParameter';
import getValue from '../system/getValue';
import ifSelf from './ifSelf/ifSelf';
import interceptSubmit from '../common/interceptSubmit';
import jQueryNotPresent from '../common/jQueryNotPresent';
import { pCC } from '../support/layout';
import playerId from '../common/playerId';
import playerName from '../common/playerName';
import { profileInjectGuildRel } from './profileInjectGuildRel';
import profileInjectQuickButton from './profileInjectQuickButton';
import profileRenderBio from './bio/bio';
import querySelector from '../common/querySelector';
import runDefault from '../common/runDefault';

function guildRelationship(avyImg, playername, isSelf) {
  // Must be before profileInjectQuickButton
  profileInjectGuildRel(isSelf);
  // It sets up guildId and currentGuildRelationship
  const playerid = fallback(getUrlParameter('player_id'), playerId());
  profileInjectQuickButton(avyImg, playerid, playername);
}

function doUpdateBuffs() {
  if (getValue('injectBuffGuide')) { runDefault(import('./updateBuffs')); }
}

function doUpdateStatistics() {
  if (getValue('statisticsWrap')) { runDefault(import('./updateStatistics')); }
}

function doHighlightPvPProt() {
  if (getValue('highlightPvpProtection')) {
    runDefault(import('./highlightPvpProtection'));
  }
}

function updateDom(avyImg, playername, isSelf) {
  ifSelf(isSelf);
  guildRelationship(avyImg, playername, isSelf);
  doUpdateBuffs();
  doUpdateStatistics();
  doHighlightPvPProt();
  add(3, profileRenderBio, [isSelf]);
  doStatTotal();
  add(3, colouredDots);
}

function allowBack(isSelf) {
  if (!isSelf) {
    interceptSubmit();
  }
}

export default function injectProfile() { // Legacy
  if (jQueryNotPresent()) { return; }
  const avyImg = querySelector(
    '#profileLeftColumn img[src*="/avatars/"][width="200"]',
  );
  if (!avyImg) { return; }
  const playername = getText(getElementsByTagName('h1', pCC)[0]);
  const isSelf = playername === playerName();
  updateDom(avyImg, playername, isSelf);
  allowBack(isSelf);
}
