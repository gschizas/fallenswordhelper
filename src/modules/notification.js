import add from './support/task';
import calf from './support/calf';
import {getElementById} from './common/getElement';
import {now} from './support/dataObj';
import retryAjax from './ajax/retryAjax';
import {
  createDocument,
  getValue,
  imageServer,
  setValue
} from './support/system';

var havePrayedMsg =
  '<span class="notification-icon"></span><p class="notification-content">' +
  'You are currently praying at the temple.</p>';
var godsNotification =
  '<li class="notification">' +
  '<span id="helperPrayToGods" class="fastPray">' +
  '<table><tbody><tr><td>' +
  '<span class="tip-static" data-tipped="Pray to Sahria" ' +
  'style="background-image: url(\'' + imageServer +
  '/temple/0.gif\');" praytype="0"></span></td><td>' +
  '<span class="tip-static" data-tipped="Pray to Osverin" ' +
  'style="background-image: url(\'' + imageServer +
  '/temple/1.gif\');" praytype="1"></span></td></tr><tr><td>' +
  '<span class="tip-static" data-tipped="Pray to Gurgriss" ' +
  'style="background-image: url(\'' + imageServer +
  '/temple/2.gif\');" praytype="2"></span></td><td>' +
  '<span class="tip-static" data-tipped="Pray to Lindarsil" ' +
  'style="background-image: url(\'' + imageServer +
  '/temple/3.gif\');" praytype="3"></span></td></tr></tbody></table>' +
  '<a href="index.php?cmd=temple">' +
  '<p class="notification-content">Bow down to the gods</p>' +
  '</a></span></li>';
var goldUpgradeMsg =
  '<li class="notification"><a href="index.php?cmd=points&type=1"><span' +
  ' class="notification-icon"></span><p class="notification-content">Up' +
  'grade stamina with gold</p></a></li>';

function havePrayed() {
  getElementById('helperPrayToGods').outerHTML = havePrayedMsg;
  setValue('needToPray', false);
  setValue('lastTempleCheck', new Date()
    .setUTCHours(23, 59, 59, 999) + 1); // Midnight
}

function prayToGods(e) { // jQuery
  var myGod = e.target.getAttribute('praytype');
  if (!myGod) {return;}
  getElementById('helperPrayToGods').removeEventListener('click',
    prayToGods);
  retryAjax('index.php?cmd=temple&subcmd=pray&type=' + myGod)
    .done(havePrayed);
  $(e.target).qtip('hide');
}

function displayDisconnectedFromGodsMessage() {
  getElementById('notifications').insertAdjacentHTML('afterbegin',
    godsNotification);
  getElementById('helperPrayToGods').addEventListener('click',
    prayToGods);
}

function displayUpgradeMsg() {
  if (location.search.indexOf('cmd=points&type=1') === -1) {
    getElementById('notifications').insertAdjacentHTML('afterbegin',
      goldUpgradeMsg);
  }
}

function findNewGroup(el) {
  if (el.textContent.indexOf('New attack group created.') === -1) {return;}
  var groupJoinHTML = '';
  if (!getValue('enableMaxGroupSizeToJoin')) {
    groupJoinHTML = '<a href="index.php?cmd=guild&subcmd=groups&' +
      'subcmd2=joinall"><span class="notification-icon"></span>' +
      '<p class="notification-content">Join all attack groups.</p></a>';
  } else {
    var maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
    groupJoinHTML = '<a href="index.php?cmd=guild&subcmd=groups&' +
      'subcmd2=joinallgroupsundersize"><span class="notification-icon">' +
      '</span><p class="notification-content">Join all attack groups ' +
      'less than size ' + maxGroupSizeToJoin + '.</p></a>';
  }
  el.insertAdjacentHTML('afterend',
    '<li class="notification">' + groupJoinHTML + '</li>');
}

function templeAlertEnabled(responseText) {
  var checkNeedToPray;
  var doc;
  if (calf.cmd !== 'temple') {
    doc = createDocument(responseText);
  } else {
    doc = document;
  }
  checkNeedToPray = doc.querySelector('input[value="Pray to Osverin"]');
  var needToPray = false;
  if (checkNeedToPray) {
    displayDisconnectedFromGodsMessage();
    needToPray = true;
  }
  setValue('needToPray', needToPray);
  setValue('lastTempleCheck', new Date()
    .setUTCHours(23, 59, 59, 999) + 1); // midnight
}

export function parseTemplePage(responseText) {
  if (calf.enableTempleAlert) {templeAlertEnabled(responseText);}
}

function checkLastUpdate(templeAlertLastUpdate) {
  return !templeAlertLastUpdate || now > templeAlertLastUpdate;
}

function doWeNeedToParse() {
  if (checkLastUpdate(getValue('lastTempleCheck'))) {return true;}
  if (getValue('needToPray')) {
    displayDisconnectedFromGodsMessage();
  }
  return false;
}

export function injectTempleAlert() { // jQuery
  // Checks to see if the temple is open for business.
  if (calf.cmd === 'temple') {return;}
  if (doWeNeedToParse()) {
    retryAjax('index.php?cmd=temple').done(parseTemplePage);
  }
}

function findDoc(data) {
  if (location.search.indexOf('cmd=points&type=1') === -1) {
    return createDocument(data);
  }
  document.querySelectorAll('#pCC input[name="quantity"]')[1].value = '10';
  return document;
}

export function parseGoldUpgrades(data) {
  if (!calf.enableUpgradeAlert) {return;}
  var doc = findDoc(data);
  var limit = getElementById('pCC', doc).getElementsByTagName('TABLE')[0]
    .rows[3].cells[2];
  var checkDoneUpgrade = limit.textContent.split(' / ');
  if (checkDoneUpgrade[0] !== checkDoneUpgrade[1]) {
    displayUpgradeMsg();
    setValue('needToDoUpgrade', true);
  } else {
    setValue('needToDoUpgrade', false);
    setValue('lastUpgradeCheck',
      Date.parse(limit.nextElementSibling.textContent + ' GMT'));
  }
}

function checkLastUpgrade() {
  var lastUpgradeCheck = getValue('lastUpgradeCheck');
  if (lastUpgradeCheck && now < lastUpgradeCheck) {return;}
  retryAjax('index.php?cmd=points&type=1').done(function(data) {
    add(3, parseGoldUpgrades, [data]);
  });
}

function notUpgradesPage() {
  if (getValue('needToDoUpgrade')) {
    displayUpgradeMsg();
    return;
  }
  checkLastUpgrade();
}

export function injectUpgradeAlert() { // jQuery
  if (location.search.indexOf('cmd=points&type=1') === -1) {notUpgradesPage();}
}

export function injectJoinAllLink() {
  var nodeList = getElementById('pCL').getElementsByTagName('li');
  Array.prototype.forEach.call(nodeList, findNewGroup);
}
