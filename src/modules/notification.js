import add from './support/task';
import calf from './support/calf';
import * as system from './support/system';

var havePrayedMsg =
  '<span class="notification-icon"></span><p class="notification-content">' +
  'You are currently praying at the temple.</p>';
var godsNotification =
  '<li class="notification">' +
  '<span id="helperPrayToGods" class="fastPray">' +
  '<table><tbody><tr><td>' +
  '<span class="tip-static" data-tipped="Pray to Sahria" ' +
  'style="background-image: url(\'' + system.imageServer +
  '/temple/0.gif\');" praytype="0"></span></td><td>' +
  '<span class="tip-static" data-tipped="Pray to Osverin" ' +
  'style="background-image: url(\'' + system.imageServer +
  '/temple/1.gif\');" praytype="1"></span></td></tr><tr><td>' +
  '<span class="tip-static" data-tipped="Pray to Gurgriss" ' +
  'style="background-image: url(\'' + system.imageServer +
  '/temple/2.gif\');" praytype="2"></span></td><td>' +
  '<span class="tip-static" data-tipped="Pray to Lindarsil" ' +
  'style="background-image: url(\'' + system.imageServer +
  '/temple/3.gif\');" praytype="3"></span></td></tr></tbody></table>' +
  '<a href="index.php?cmd=temple">' +
  '<p class="notification-content">Bow down to the gods</p>' +
  '</a></span></li>';
var goldUpgradeMsg =
  '<li class="notification"><a href="index.php?cmd=points&type=1"><span' +
  ' class="notification-icon"></span><p class="notification-content">Up' +
  'grade stamina with gold</p></a></li>';

function havePrayed() { // Native
  document.getElementById('helperPrayToGods').outerHTML = havePrayedMsg;
  system.setValue('needToPray', false);
  system.setValue('lastTempleCheck', new Date()
    .setUTCHours(23, 59, 59, 999) + 1); // Midnight
}

function prayToGods(e) { // jQuery
  var myGod = e.target.getAttribute('praytype');
  if (!myGod) {return;}
  document.getElementById('helperPrayToGods').removeEventListener('click',
    prayToGods);
  $.get('index.php?cmd=temple&subcmd=pray&type=' + myGod)
    .done(havePrayed);
  $(e.target).qtip('hide');
}

function displayDisconnectedFromGodsMessage() { // Native
  document.getElementById('notifications').insertAdjacentHTML('afterbegin',
    godsNotification);
  document.getElementById('helperPrayToGods').addEventListener('click',
    prayToGods);
}

function displayUpgradeMsg() { // Native
  if (location.search.indexOf('cmd=points&type=1') === -1) {
    document.getElementById('notifications').insertAdjacentHTML('afterbegin',
      goldUpgradeMsg);
  }
}

function findNewGroup(el) { // Native
  if (el.textContent.indexOf('New attack group created.') === -1) {return;}
  var groupJoinHTML = '';
  if (!system.getValue('enableMaxGroupSizeToJoin')) {
    groupJoinHTML = '<a href="index.php?cmd=guild&subcmd=groups&' +
      'subcmd2=joinall"><span class="notification-icon"></span>' +
      '<p class="notification-content">Join all attack groups.</p></a>';
  } else {
    var maxGroupSizeToJoin = system.getValue('maxGroupSizeToJoin');
    groupJoinHTML = '<a href="index.php?cmd=guild&subcmd=groups&' +
      'subcmd2=joinallgroupsundersize"><span class="notification-icon">' +
      '</span><p class="notification-content">Join all attack groups ' +
      'less than size ' + maxGroupSizeToJoin + '.</p></a>';
  }
  el.insertAdjacentHTML('afterend',
    '<li class="notification">' + groupJoinHTML + '</li>');
}

function templeAlertEnabled(responseText) { // Native
  var checkNeedToPray;
  var doc;
  if (calf.cmd !== 'temple') {
    doc = system.createDocument(responseText);
  } else {
    doc = document;
  }
  checkNeedToPray = doc.querySelector('input[value="Pray to Osverin"]');
  var needToPray = false;
  if (checkNeedToPray) {
    displayDisconnectedFromGodsMessage();
    needToPray = true;
  }
  system.setValue('needToPray', needToPray);
  system.setValue('lastTempleCheck', new Date()
    .setUTCHours(23, 59, 59, 999) + 1); // midnight
}

export function parseTemplePage(responseText) { // Native
  if (calf.enableTempleAlert) {templeAlertEnabled(responseText);}
}

function checkLastUpdate(templeAlertLastUpdate) { // Native
  return !templeAlertLastUpdate ||
    Date.now() > templeAlertLastUpdate;
}

function doWeNeedToParse() { // Native
  if (checkLastUpdate(system.getValue('lastTempleCheck'))) {return true;}
  if (system.getValue('needToPray')) {
    displayDisconnectedFromGodsMessage();
  }
  return false;
}

export function injectTempleAlert() { // jQuery
  // Checks to see if the temple is open for business.
  if (calf.cmd === 'temple') {return;}
  if (doWeNeedToParse()) {
    $.get('index.php?cmd=temple', parseTemplePage);
  }
}

function findDoc(data) { // Native
  if (location.search.indexOf('cmd=points&type=1') === -1) {
    return system.createDocument(data);
  }
  document.querySelectorAll('#pCC input[name="quantity"]')[1].value = '10';
  return document;
}

export function parseGoldUpgrades(data) { // Native
  if (!calf.enableUpgradeAlert) {return;}
  var doc = findDoc(data);
  var limit = doc.getElementById('pCC').getElementsByTagName('TABLE')[0]
    .rows[3].cells[2];
  var checkDoneUpgrade = limit.textContent.split(' / ');
  if (checkDoneUpgrade[0] !== checkDoneUpgrade[1]) {
    displayUpgradeMsg();
    system.setValue('needToDoUpgrade', true);
  } else {
    system.setValue('needToDoUpgrade', false);
    system.setValue('lastUpgradeCheck',
      Date.parse(limit.nextElementSibling.textContent + ' GMT'));
  }
}

function notUpgradesPage() {
  var needToDoUpgrade = system.getValue('needToDoUpgrade');
  if (needToDoUpgrade) {
    displayUpgradeMsg();
    return;
  }
  var lastUpgradeCheck = system.getValue('lastUpgradeCheck');
  if (lastUpgradeCheck && Date.now() < lastUpgradeCheck) {return;}
  $.get('index.php?cmd=points&type=1', function(data) {
    add(3, parseGoldUpgrades, [data]);
  });
}

export function injectUpgradeAlert() { // jQuery
  if (location.search.indexOf('cmd=points&type=1') === -1) {notUpgradesPage();}
}

export function injectJoinAllLink() { // Native
  var nodeList = document.getElementById('pCL').getElementsByTagName('li');
  Array.prototype.forEach.call(nodeList, findNewGroup);
}
