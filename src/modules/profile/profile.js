import add from '../support/task';
import addStatTotalToMouseover from '../common/addStatTotalToMouseover';
import ajaxifyProfileSections from './ajaxifyProfileSections';
import colouredDots from '../common/colouredDots';
import fallback from '../system/fallback';
import getElementsByTagName from '../common/getElementsByTagName';
import getText from '../common/getText';
import getUrlParameter from '../system/getUrlParameter';
import getValue from '../system/getValue';
import highlightPvpProtection from './highlightPvpProtection';
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
import storeVL from './storeVL';
import updateBuffs from './updateBuffs';
import updateStatistics from './updateStatistics';

async function doFastDebuff() {
  const fastDebuff = getValue('fastDebuff');
  const disableDeactivatePrompts = getValue('disableDeactivatePrompts');
  if (fastDebuff || disableDeactivatePrompts) {
    const m = await import('./debuff');
    m.default(fastDebuff, disableDeactivatePrompts);
  }
}

function doAllyEnemy() {
  if (getValue('countAllyEnemy')) { runDefault(import('./profileAllyEnemy')); }
}

function doFastWear() {
  if (getValue('enableQuickDrink')) {
    runDefault(import('./backpack/fastWear'));
  }
}

function doFixFolders() {
  if (getValue('fixFolderImages')) {
    runDefault(import('./backpack/fixFolders'));
  }
}

function doComponents() {
  if (getValue('componentWidgets')) {
    runDefault(import('./components/components'));
  }
}

function doQuickWearLink() {
  if (getValue('quickWearLink')) { runDefault(import('./quickWearLink')); }
}

function doSelectAllLink() {
  if (getValue('selectAllLink')) { runDefault(import('./selectAllLink')); }
}

function doNekidBtn() {
  if (getValue('nekidButton')) { runDefault(import('./nekidBtn')); }
}

function ifSelf(isSelf) {
  if (isSelf) {
    // self inventory
    doFastDebuff();
    doAllyEnemy();
    doFastWear();
    doFixFolders();
    doComponents();
    doQuickWearLink();
    doSelectAllLink();
    storeVL();
    doNekidBtn();
    ajaxifyProfileSections();
  }
}

function guildRelationship(avyImg, playername, isSelf) {
  // Must be before profileInjectQuickButton
  profileInjectGuildRel(isSelf);
  // It sets up guildId and currentGuildRelationship
  const playerid = fallback(getUrlParameter('player_id'), playerId());
  profileInjectQuickButton(avyImg, playerid, playername);
}

function updateDom(avyImg, playername, isSelf) {
  ifSelf(isSelf);
  guildRelationship(avyImg, playername, isSelf);
  updateBuffs();
  updateStatistics();
  highlightPvpProtection();
  add(3, profileRenderBio, [isSelf]);
  addStatTotalToMouseover();
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
