import add from '../support/task';
import addStatTotalToMouseover from '../common/addStatTotalToMouseover';
import ajaxifyProfileSections from './ajaxifyProfileSections';
import {colouredDots} from '../common/colouredDots';
import fallback from '../system/fallback';
import fastDebuff from './debuff';
import getUrlParameter from '../system/getUrlParameter';
import highlightPvpProtection from './highlightPvpProtection';
import injectFastWear from './fastWear';
import jQueryNotPresent from '../common/jQueryNotPresent';
import nekidBtn from './nekidBtn';
import profileComponents from './components';
import {profileInjectGuildRel} from './profileInjectGuildRel';
import profileInjectQuickButton from './profileInjectQuickButton';
import profileParseAllyEnemy from './profileAllyEnemy';
import profileRenderBio from './bio/bio';
import quickWearLink from './quickWearLink';
import selectAllLink from './selectAllLink';
import storeVL from './storeVL';
import updateHCSQuickBuffLinks from '../common/updateHCSQuickBuffLinks';
import updateNmv from './updateNmv';
import updateStatistics from './updateStatistics';
import {
  pCC,
  playerId,
  playerName
} from '../support/layout';

function ifSelf(self) {
  if (self) {
    // self inventory
    fastDebuff();
    profileParseAllyEnemy();
    injectFastWear();
    profileComponents();
    quickWearLink();
    selectAllLink();
    storeVL();
    nekidBtn();
    ajaxifyProfileSections();
  }
}

function yuuzhan(playername, avyImg) {
  if (playername === 'yuuzhan') {
    avyImg.src = 'http://evolutions.yvong.com/images/tumbler.gif';
    avyImg.addEventListener('click', function() {
      $('#dialog_msg').text('Winner!').dialog('open');
    });
  }
}

export default function injectProfile() { // Legacy
  if (jQueryNotPresent()) {return;}
  var avyImg = document
    .querySelector('#profileLeftColumn img[oldtitle*="\'s Avatar"]');
  if (!avyImg) {return;}
  var playername = pCC.getElementsByTagName('h1')[0].textContent;
  var self = playername === playerName();
  ifSelf(self);
  // Must be before profileInjectQuickButton
  profileInjectGuildRel();
  // It sets up guildId and currentGuildRelationship
  var playerid = fallback(getUrlParameter('player_id'), playerId());
  profileInjectQuickButton(avyImg, playerid, playername);

  //* ************* yuuzhan having fun
  yuuzhan(playername, avyImg);
  //* *************

  updateHCSQuickBuffLinks('#profileRightColumn a[href*="quickbuff"]');
  updateNmv();
  updateStatistics();
  //#if _DEV  //  highlightPvpProtection
  highlightPvpProtection();
  //#endif
  profileRenderBio(self);
  addStatTotalToMouseover();
  add(3, colouredDots);
}
