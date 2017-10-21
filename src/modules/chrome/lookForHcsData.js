import add from '../support/task';
import calf from '../support/calf';
import changeGuildLogHREF from './changeGuildLogHREF';
import {getValue} from '../support/system';
import {injectComposeAlert} from '../composing/composing';
import injectFSBoxLog from './injectFSBoxLog';
import injectHelperMenu from './helperMenu';
import injectHomePageTwoLink from '../news/injectHomePageTwoLink';
import injectMenu from './accordion';
import injectQuickMsgDialogJQ from './messaging';
import prepareAllyEnemyList from './allyEnemy';
import prepareBountyData from './activeWantedBounties';
import replaceKeyHandler from './keyHandler';
import statbar from './statBar';
import updateHCSQuickBuffLinks from '../common/updateHCSQuickBuffLinks';
import {addGuildInfoWidgets, addOnlineAlliesWidgets} from './widgets';
import {
  injectJoinAllLink,
  injectTempleAlert,
  injectUpgradeAlert
} from '../notification';
import {injectLevelupCalculator, injectStaminaCalculator} from './calc';

function gameHelpLink() {
  var nodeList = document.querySelectorAll('#pCR h3');
  Array.prototype.forEach.call(nodeList, function(el) {
    if (el.textContent === 'Game Help') {
      el.innerHTML = '<a href="index.php?cmd=settings">Game Help</a>';
    }
  });
}

function getEnvVars() {
  calf.enableAllyOnlineList = getValue('enableAllyOnlineList');
  calf.enableEnemyOnlineList = getValue('enableEnemyOnlineList');
  calf.enableGuildInfoWidgets = getValue('enableGuildInfoWidgets');
  calf.enableOnlineAlliesWidgets =
    getValue('enableOnlineAlliesWidgets');
  calf.hideGuildInfoTrade = getValue('hideGuildInfoTrade');
  calf.hideGuildInfoSecureTrade = getValue('hideGuildInfoSecureTrade');
  calf.hideGuildInfoBuff = getValue('hideGuildInfoBuff');
  calf.hideGuildInfoMessage = getValue('hideGuildInfoMessage');
  calf.hideBuffSelected = getValue('hideBuffSelected');
  calf.enableTempleAlert = getValue('enableTempleAlert');
  calf.enableUpgradeAlert = getValue('enableUpgradeAlert');
  calf.enableComposingAlert = getValue('enableComposingAlert');
  calf.enableActiveBountyList = getValue('enableActiveBountyList');
  calf.enableWantedList = getValue('enableWantedList');
  calf.allyEnemyOnlineRefreshTime =
    getValue('allyEnemyOnlineRefreshTime') * 1000;
}

function callAllyEnemy() {
  if (calf.enableAllyOnlineList ||
      calf.enableEnemyOnlineList) {
    add(3, prepareAllyEnemyList);
  }
}

function callBounties() {
  if (calf.enableWantedList ||
      calf.enableActiveBountyList) {
    add(3, prepareBountyData);
  }
}

function callGuildInfo() {
  if (calf.enableGuildInfoWidgets) {
    add(3, addGuildInfoWidgets);
  }
}

function callAllies() {
  if (calf.enableOnlineAlliesWidgets) {
    add(3, addOnlineAlliesWidgets);
  }
}

function callTemple() {
  if (calf.enableTempleAlert) {
    add(3, injectTempleAlert);
  }
}

function callUpgrade() {
  if (calf.enableUpgradeAlert) {
    add(3, injectUpgradeAlert);
  }
}

function callComposing() {
  if (calf.enableComposingAlert) {
    add(3, injectComposeAlert);
  }
}

function conditional() {
  callAllyEnemy();
  callBounties();
  callGuildInfo();
  callAllies();
  callTemple();
  callUpgrade();
  callComposing();
}

function navMenu() { // jQuery
  var myNav = $('#nav').data('nav');
  if (!myNav) {return;}
  var oldSave = myNav._saveState;
  myNav._saveState = function(_id) {
    var id = _id;
    var myHeight = $('li.nav-level-0', '#nav').eq(id).find('ul').height();
    if (myHeight === 0) {id = -1;}
    oldSave.call(myNav, id);
  };
}

function moveRHSBoxUpOnRHS(title) {
  document.getElementById('pCR').insertAdjacentElement('afterbegin',
    document.getElementById(title));
}

function moveRHSBoxToLHS(title) {
  var boxDiv = document.getElementById(title);
  boxDiv.classList.add('pCR');
  document.getElementById('pCL').appendChild(boxDiv);
}

function doMoveGuildList() {
  if (getValue('moveGuildList')) {
    add(3, moveRHSBoxUpOnRHS, ['minibox-guild']);
  }
}

function doMoveAllyList() {
  if (getValue('moveOnlineAlliesList')) {
    add(3, moveRHSBoxUpOnRHS, ['minibox-allies']);
  }
}

function doMoveFsBox() {
  if (getValue('moveFSBox')) {
    add(3, moveRHSBoxToLHS, ['minibox-fsbox']);
  }
}

function fixOnlineGuildBuffLinks() {
  updateHCSQuickBuffLinks(
    '#minibox-guild-members-list #guild-minibox-action-quickbuff');
  updateHCSQuickBuffLinks(
    '#minibox-allies-list #online-allies-action-quickbuff');
}

function notHuntMode() {
  if (calf.huntingMode) {return;}
  // move boxes in opposite order that you want them to appear.
  doMoveGuildList();
  doMoveAllyList();
  doMoveFsBox();

  getEnvVars();
  conditional();

  add(3, navMenu);
  add(3, statbar);

  add(3, injectStaminaCalculator);
  add(3, injectLevelupCalculator);

  add(3, injectMenu);

  if (getValue('fsboxlog')) {
    add(3, injectFSBoxLog);
  }
  add(3, fixOnlineGuildBuffLinks);

  add(3, injectJoinAllLink);
  add(3, changeGuildLogHREF);
  add(3, injectHomePageTwoLink);

  add(3, injectQuickMsgDialogJQ);
}

function prepareEnv() {
  if (getValue('gameHelpLink')) {
    add(3, gameHelpLink);
  }
  calf.huntingMode = getValue('huntingMode');
  add(3, replaceKeyHandler);
  notHuntMode();
  if (!getValue('hideHelperMenu')) {
    add(3, injectHelperMenu);
  }
}

export default function lookForHcsData() {
  var hcsData = document.getElementById('html');
  if (hcsData && JSON.parse(hcsData.getAttribute('data-hcs'))['new-ui']) {
    prepareEnv();
  }
}
