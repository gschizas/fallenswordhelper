import add from '../support/task';
import calf from '../support/calf';
import changeGuildLogHREF from './changeGuildLogHREF';
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
import * as calc from './calc';
import * as composing from '../composing/composing';
import * as notification from '../notification';
import * as system from '../support/system';
import * as widgets from './widgets';

function gameHelpLink() {
  var nodeList = document.querySelectorAll('#pCR h3');
  Array.prototype.forEach.call(nodeList, function(el) {
    if (el.textContent === 'Game Help') {
      el.innerHTML = '<a href="index.php?cmd=settings">Game Help</a>';
    }
  });
}

function getEnvVars() {
  calf.enableAllyOnlineList = system.getValue('enableAllyOnlineList');
  calf.enableEnemyOnlineList = system.getValue('enableEnemyOnlineList');
  calf.enableGuildInfoWidgets = system.getValue('enableGuildInfoWidgets');
  calf.enableOnlineAlliesWidgets =
    system.getValue('enableOnlineAlliesWidgets');
  calf.hideGuildInfoTrade = system.getValue('hideGuildInfoTrade');
  calf.hideGuildInfoSecureTrade = system.getValue('hideGuildInfoSecureTrade');
  calf.hideGuildInfoBuff = system.getValue('hideGuildInfoBuff');
  calf.hideGuildInfoMessage = system.getValue('hideGuildInfoMessage');
  calf.hideBuffSelected = system.getValue('hideBuffSelected');
  calf.enableTempleAlert = system.getValue('enableTempleAlert');
  calf.enableUpgradeAlert = system.getValue('enableUpgradeAlert');
  calf.enableComposingAlert = system.getValue('enableComposingAlert');
  calf.enableActiveBountyList = system.getValue('enableActiveBountyList');
  calf.enableWantedList = system.getValue('enableWantedList');
  calf.allyEnemyOnlineRefreshTime =
    system.getValue('allyEnemyOnlineRefreshTime') * 1000;
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
    add(3, widgets.addGuildInfoWidgets);
  }
}

function callAllies() {
  if (calf.enableOnlineAlliesWidgets) {
    add(3, widgets.addOnlineAlliesWidgets);
  }
}

function callTemple() {
  if (calf.enableTempleAlert) {
    add(3, notification.injectTempleAlert);
  }
}

function callUpgrade() {
  if (calf.enableUpgradeAlert) {
    add(3, notification.injectUpgradeAlert);
  }
}

function callComposing() {
  if (calf.enableComposingAlert) {
    add(3, composing.injectComposeAlert);
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
  if (system.getValue('moveGuildList')) {
    add(3, moveRHSBoxUpOnRHS, ['minibox-guild']);
  }
}

function doMoveAllyList() {
  if (system.getValue('moveOnlineAlliesList')) {
    add(3, moveRHSBoxUpOnRHS, ['minibox-allies']);
  }
}

function doMoveFsBox() {
  if (system.getValue('moveFSBox')) {
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

  add(3, calc.injectStaminaCalculator);
  add(3, calc.injectLevelupCalculator);

  add(3, injectMenu);

  if (system.getValue('fsboxlog')) {
    add(3, injectFSBoxLog);
  }
  add(3, fixOnlineGuildBuffLinks);

  add(3, notification.injectJoinAllLink);
  add(3, changeGuildLogHREF);
  add(3, injectHomePageTwoLink);

  add(3, injectQuickMsgDialogJQ);
}

function prepareEnv() {
  if (system.getValue('gameHelpLink')) {
    add(3, gameHelpLink);
  }
  calf.huntingMode = system.getValue('huntingMode');
  add(3, replaceKeyHandler);
  notHuntMode();
  if (!system.getValue('hideHelperMenu')) {
    add(3, injectHelperMenu);
  }
}

export default function lookForHcsData() {
  var hcsData = document.getElementById('html');
  if (hcsData && JSON.parse(hcsData.getAttribute('data-hcs'))['new-ui']) {
    prepareEnv();
  }
}
