import add from '../support/task';
import addStatTotalToMouseover from '../common/addStatTotalToMouseover';
import fastDebuff from './debuff';
import injectFastWear from './fastWear';
import nekidBtn from './nekidBtn';
import profileComponents from './components';
import profileParseAllyEnemy from './profileAllyEnemy';
import profileRenderBio from './bio/bio';
import * as common from '../common/common';
import * as layout from '../support/layout';
import * as system from '../support/system';

var guildId;
var currentGuildRelationship;
var guildMessages = {
  self: {
    color: 'fshGreen',
    message: system.getValue('guildSelfMessage')
  },
  friendly: {
    color: 'fshOliveDrab',
    message: system.getValue('guildFrndMessage')
  },
  old: {
    color: 'fshDarkCyan',
    message: system.getValue('guildPastMessage')
  },
  enemy: {
    color: 'fshRed',
    message: system.getValue('guildEnmyMessage')
  }
};

function quickWearLink() {
  // quick wear manager link
  var node = document.querySelector('#profileRightColumn ' +
    'a[href="index.php?cmd=profile&subcmd=togglesection&section_id=2"]');
  if (!node) {return;}
  node.parentNode.insertAdjacentHTML('beforeend',
    '&nbsp;[<a href="/index.php?cmd=notepad&blank=1&subcmd=quickwear" ' +
    'class="fshBlue">Quick&nbsp;Wear</a>]');
}

function profileSelectAll() {
  var bpTabs = document.getElementById('backpack_tabs');
  var type = bpTabs.getElementsByClassName('tab-selected')[0]
    .getAttribute('data-type');
  var items = document.querySelectorAll('#backpackTab_' + type +
    ' li:not(.hcsPaginate_hidden) .backpackItem');
  if (items.length === 0) {return;}
  var checkboxes = document.querySelectorAll('#backpackTab_' + type +
    ' li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)');
  if (checkboxes.length > 0) {items = checkboxes;}
  Array.prototype.forEach.call(items, function(el) {
    el.click();
  });
}

function selectAllLink() {
  // select all link
  var node = document.querySelector('#profileRightColumn' +
    ' a[href="index.php?cmd=profile&subcmd=dropitems"]');
  if (!node) {return;}
  var allSpan = document.createElement('SPAN');
  allSpan.className = 'smallLink';
  allSpan.textContent = 'All';
  allSpan.addEventListener('click', profileSelectAll);
  var wrapper = document.createElement('SPAN');
  wrapper.insertAdjacentHTML('beforeend', '[&nbsp;');
  wrapper.appendChild(allSpan);
  wrapper.insertAdjacentHTML('beforeend', '&nbsp;]&nbsp;');
  node.parentNode.appendChild(wrapper);
}

function storeVL() {
  // store the VL of the player
  var virtualLevel = parseInt(
    document.getElementById('stat-vl').textContent, 10);
  if (system.intValue(document.getElementsByClassName('stat-level')[0]
    .nextElementSibling.textContent) === virtualLevel) {
    system.setValue('characterVirtualLevel', ''); // ?
  } else {
    system.setValue('characterVirtualLevel', virtualLevel);
  }
}

function guildAry(val) {
  if (val) {
    return val.toLowerCase().replace(/\s\s*/g, ' ').split(/\s*,\s*/);
  }
  return [];
}

function guildRelationship(_txt) {
  var scenario = [
    {test: guildAry(system.getValue('guildSelf')), type: 'self'},
    {test: guildAry(system.getValue('guildFrnd')), type: 'friendly'},
    {test: guildAry(system.getValue('guildPast')), type: 'old'},
    {test: guildAry(system.getValue('guildEnmy')), type: 'enemy'}
  ];
  var txt = _txt.toLowerCase().replace(/\s\s*/g, ' ');
  for (var i = 0; i < scenario.length; i += 1) {
    if (scenario[i].test.indexOf(txt) !== -1) {return scenario[i].type;}
  }
}

function foundGuildLink(aLink) {
  var guildIdResult = /guild_id=([0-9]+)/i.exec(aLink.getAttribute('href'));
  if (guildIdResult) {guildId = parseInt(guildIdResult[1], 10);}
  currentGuildRelationship = guildRelationship(aLink.text);
  if (currentGuildRelationship) {
    aLink.parentNode.classList.add(
      guildMessages[currentGuildRelationship].color);
    aLink.parentNode.insertAdjacentHTML('beforeend', '<br>' +
      guildMessages[currentGuildRelationship].message);
  }
}

function profileInjectGuildRel() {
  var aLink = document.querySelector(
    '#pCC a[href^="index.php?cmd=guild&subcmd=view&guild_id="]');
  if (aLink) {foundGuildLink(aLink);}
}

function profileInjectQuickButton(avyImg, playerid, playername) {
  var newhtml = '<div align="center">';
  newhtml += '<a class="quickButton buttonQuickBuff tip-static" ' +
    layout.quickBuffHref(playerid) + 'data-tipped="Buff ' + playername +
    '" style="background-image: url(\'' + system.imageServer +
    '/skin/realm/icon_action_quickbuff.gif\');"></a>&nbsp;&nbsp;';
  if (!system.getValue('enableMaxGroupSizeToJoin')) {
    newhtml += '<a class="quickButton buttonJoinAll tip-static" ' +
      'href="index.php?cmd=guild&subcmd=groups&subcmd2=joinall" ' +
      'data-tipped="Join All Groups" style="background-image: url(\'' +
      system.imageServer +
      '/skin/icon_action_join.gif\');"></a>&nbsp;&nbsp;';
  } else {
    var maxGroupSizeToJoin = system.getValue('maxGroupSizeToJoin');
    newhtml += '<a class="quickButton buttonJoinUnder tip-static" ' +
      'href="index.php?cmd=guild&subcmd=groups&subcmd2=' +
      'joinallgroupsundersize" data-tipped="Join All Groups < ' +
      maxGroupSizeToJoin + ' Members" style="background-image: url(\'' +
      system.imageServer +
      '/skin/icon_action_join.gif\');"></a>&nbsp;&nbsp;';
  }
  newhtml += '<a class="quickButton tip-static" ' +
    'href="index.php?cmd=auctionhouse&type=-3&tid=' + playerid +
    '" data-tipped="Go to ' + playername +
    '\'s auctions" style="background-image: url(\'' +
    system.imageServer + '/skin/gold_button.gif\');"></a>&nbsp;&nbsp;';
  newhtml += '<a class="quickButton tip-static" ' +
    'href="index.php?cmd=trade&subcmd=createsecure&target_username=' +
    playername + '" data-tipped="Create Secure Trade to ' + playername +
    '" style="background-image: url(\'' + system.imageServer +
    '/temple/2.gif\');"></a>&nbsp;&nbsp;';
  newhtml += '<a class="quickButton tip-static" ' +
    'href="index.php?cmd=guild&subcmd=inventory&subcmd2=report&user=' +
    playername + '" data-tipped="Recall items from ' + playername +
    '" style="background-image: url(\'' + system.imageServer +
    '/temple/3.gif\');"></a>&nbsp;&nbsp;';
  if (currentGuildRelationship === 'self' &&
      system.getValue('showAdmin')) {
    newhtml += '<a class="quickButton buttonGuildRank tip-static" href="' +
      'index.php?cmd=guild&subcmd=members&subcmd2=changerank&member_id=' +
      playerid + '" data-tipped="Rank ' + playername +
      '" style="background-image: url(\'' + system.imageServer +
      '/guilds/' + guildId + '_mini.jpg\');"></a>&nbsp;&nbsp;';
  }
  newhtml += '</div>';
  avyImg.insertAdjacentHTML('afterend', newhtml);
}

function removeStatTable(el) {
  var tde = el.getElementsByTagName('td');
  el.parentNode.innerHTML = tde[0].innerHTML.replace(/&nbsp;/g, ' ') +
    '<div class="profile-stat-bonus">' +
    tde[1].textContent + '</div>';
}

function updateStatistics() {
  var charStats = document.getElementById('profileLeftColumn')
    .getElementsByTagName('table')[0];
  var dodgyTables = charStats.getElementsByTagName('table');
  Array.prototype.forEach.call(dodgyTables, removeStatTable);
}

function ifSelf(self) { // Legacy
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
  }
}

function yuuzhan(playername, avyImg) { // Legacy
  if (playername === 'yuuzhan') {
    avyImg.setAttribute('src',
      'http://evolutions.yvong.com/images/tumbler.gif');
    avyImg.addEventListener('click', function() {
      $('#dialog_msg').text('Winner!').dialog('open');
    });
  }
}

export default function injectProfile() { // Legacy
  var avyImg = document
    .querySelector('#profileLeftColumn img[oldtitle*="\'s Avatar"]');
  if (!avyImg) {return;}
  var playername = layout.pCC
    .getElementsByTagName('h1')[0].textContent;
  var self = playername === layout.playerName();
  ifSelf(self);
  // Must be before profileInjectQuickButton
  profileInjectGuildRel();
  // It sets up guildId and currentGuildRelationship
  var playerid = system.fallback(system.getUrlParameter('player_id'),
    layout.playerId());
  profileInjectQuickButton(avyImg, playerid, playername);

  //* ************* yuuzhan having fun
  yuuzhan(playername, avyImg);
  //* *************

  common.updateHCSQuickBuffLinks('#profileRightColumn a[href*="quickbuff"]');
  updateStatistics();
  profileRenderBio(self);
  addStatTotalToMouseover();
  add(3, layout.colouredDots);
}
