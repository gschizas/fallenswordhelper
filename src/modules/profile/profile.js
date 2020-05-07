import add from '../support/task';
import addStatTotalToMouseover from '../common/addStatTotalToMouseover';
import ajaxifyProfileSections from './ajaxifyProfileSections';
import arrayFrom from '../common/arrayFrom';
import colouredDots from '../common/colouredDots';
import components from './components/components';
import fallback from '../system/fallback';
import fastDebuff from './debuff';
import getElementsByTagName from '../common/getElementsByTagName';
import getText from '../common/getText';
import getUrlParameter from '../system/getUrlParameter';
import highlightPvpProtection from './highlightPvpProtection';
import { indexPhp } from '../support/constants';
import injectFastWear from './fastWear';
import jQueryNotPresent from '../common/jQueryNotPresent';
import nekidBtn from './nekidBtn';
import on from '../common/on';
import { pCC } from '../support/layout';
import playerId from '../common/playerId';
import playerName from '../common/playerName';
import { profileInjectGuildRel } from './profileInjectGuildRel';
import profileInjectQuickButton from './profileInjectQuickButton';
import profileParseAllyEnemy from './profileAllyEnemy';
import profileRenderBio from './bio/bio';
import querySelector from '../common/querySelector';
import quickWearLink from './quickWearLink';
import selectAllLink from './selectAllLink';
import storeVL from './storeVL';
import updateBuffs from './updateBuffs';
import updateStatistics from './updateStatistics';

function ifSelf(isSelf) {
  if (isSelf) {
    // self inventory
    fastDebuff();
    profileParseAllyEnemy();
    injectFastWear();
    components();
    quickWearLink();
    selectAllLink();
    storeVL();
    nekidBtn();
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

function updateUrl(e) {
  e.preventDefault();
  const validInputs = arrayFrom(e.target.closest('form').elements)
    .filter((i) => i.type !== 'submit')
    .map((i) => `${i.name}=${i.value}`).join('&');
  window.location = `${indexPhp}?${validInputs}`;
}

function allowBack(isSelf) {
  if (!isSelf) {
    on(querySelector('#profileRightColumn'), 'submit', updateUrl);
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
