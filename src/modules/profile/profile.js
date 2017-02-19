import * as task from '../support/task';
import * as system from '../support/system';
import * as layout from '../support/layout';
import * as common from '../support/common';
import * as debuff from './debuff';
import * as profileAllyEnemy from './profileAllyEnemy';
import * as fastWear from './fastWear';
import * as components from './components';
import * as bio from './bio';

var guildId;
var currentGuildRelationship;
var guildMessages = {
  self: {'color': 'fshGreen',
    'message': 'Member of your own guild!'},
  friendly: {'color': 'fshOliveDrab',
    'message': 'Do not attack - Guild is friendly!'},
  old: {'color': 'fshDarkCyan',
    'message': 'Do not attack - You\'ve been in that guild once!'},
  enemy: {'color': 'fshRed',
    'message': 'Enemy guild. Attack at will!'}
};

function quickWearLink() { // Native
  // quick wear manager link
  var node = document.querySelector('#profileRightColumn ' +
    'a[href="index.php?cmd=profile&subcmd=togglesection&section_id=2"]');
  if (!node) {return;}
  node.parentNode.insertAdjacentHTML('beforeend',
    '&nbsp;[<a href="/index.php?cmd=notepad&blank=1&subcmd=quickwear" ' +
    'class="fshBlue">Quick&nbsp;Wear</a>]');
}

function profileSelectAll() { // Native
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
    el.dispatchEvent(new MouseEvent('click', {bubbles: true,
      ctrlKey: true, metaKey: true}));
  });
}

function selectAllLink() { // Native
  //select all link
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

function storeVL() { // Native
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

function guildRelationship(txt) { // Native
  var output;
  var guildSelf = system.getValue('guildSelf') || '';
  var guildFrnd = system.getValue('guildFrnd') || '';
  var guildPast = system.getValue('guildPast') || '';
  var guildEnmy = system.getValue('guildEnmy') || '';
  guildSelf = guildSelf.toLowerCase().replace(/\s*,\s*/, ',')
    .replace(/\s\s*/g, ' ').split(',');
  guildFrnd = guildFrnd.toLowerCase().replace(/\s*,\s*/, ',')
    .replace(/\s\s*/g, ' ').split(',');
  guildPast = guildPast.toLowerCase().replace(/\s*,\s*/, ',')
    .replace(/\s\s*/g, ' ').split(',');
  guildEnmy = guildEnmy.toLowerCase().replace(/\s*,\s*/, ',')
    .replace(/\s\s*/g, ' ').split(',');
  txt = txt.toLowerCase().replace(/\s\s*/g, ' ');
  if (guildSelf.indexOf(txt) !== -1) {output = 'self';} else
  if (guildFrnd.indexOf(txt) !== -1) {output = 'friendly';} else
  if (guildPast.indexOf(txt) !== -1) {output = 'old';} else
  if (guildEnmy.indexOf(txt) !== -1) {output = 'enemy';}
  return output;
}

function profileInjectGuildRel() { // Native
  var aLink = document.querySelector(
    '#pCC a[href^="index.php?cmd=guild&subcmd=view&guild_id="]');
  if (!aLink) {return;}
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

function profileInjectQuickButton(avyImg, playerid, playername) { // Native
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

function removeStatTable(el) { // Native
  var tde = el.getElementsByTagName('td');
  el.parentNode.innerHTML = tde[0].innerHTML.replace(/&nbsp;/g, ' ') +
    '<div class="profile-stat-bonus">' +
    tde[1].textContent + '</div>';
}

function updateStatistics() { // Native
  var charStats = document.getElementById('profileLeftColumn')
    .getElementsByTagName('table')[0];
  var dodgyTables = charStats.getElementsByTagName('table');
  Array.prototype.forEach.call(dodgyTables, removeStatTable);
}

export function injectProfile() { // Native
  var avyImg = document
    .querySelector('#profileLeftColumn img[oldtitle*="\'s Avatar"]');
  if (!avyImg) {return;}
  var playername = layout.pCC
    .getElementsByTagName('h1')[0].textContent;
  var self = playername === layout.playerName();
  if (self) {
    // self inventory
    debuff.fastDebuff();
    profileAllyEnemy.profileParseAllyEnemy();
    fastWear.injectFastWear();
    components.profileComponents();
    quickWearLink();
    selectAllLink();
    storeVL();
  }
  // Must be before profileInjectQuickButton
  profileInjectGuildRel();
  // It sets up guildId and currentGuildRelationship
  var playerid = system.getUrlParameter('player_id') || layout.playerId();
  profileInjectQuickButton(avyImg, playerid, playername);

  //************** yuuzhan having fun
  if (playername === 'yuuzhan') {
    avyImg.setAttribute('src',
      'http://evolutions.yvong.com/images/tumbler.gif');
    avyImg.addEventListener('click', function(){alert('Winner!');});
  }
  //**************

  common.updateHCSQuickBuffLinks('#profileRightColumn a[href*="quickbuff"]');
  updateStatistics();
  bio.profileRenderBio(self);
  common.addStatTotalToMouseover();
  task.add(3, layout.colouredDots);
}
