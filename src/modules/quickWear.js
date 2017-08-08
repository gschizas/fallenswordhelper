import {backpack, equipItem, useItem} from './support/ajax';
import * as layout from './support/layout';
import * as system from './support/system';

var content;
var itemList;
var playerId;

function itemName(item) {
  return item.n;
}

function foundInvItem(invCount, name) { // Legacy
  if (invCount[name]) {
    invCount[name].count += 1;
  } else {
    invCount[name] = {count: 1, nicknameList: ''};
  }
}

function showAHInvManager() { // Legacy
  var output = '<table width="100%" cellspacing="2" cellpadding="2">' +
    '<tr><th colspan="5" class="fshCenter">Items from ' +
    '<a href="index.php?cmd=notepad&blank=1&subcmd=auctionsearch">' +
    'AH Quick Search</a> found in your inventory</td>' +
    '<tr><th>Name</th><th>Nick Name<th>Inv Count</th><th>' +
    'AH Min Price</th><th>AH BuyNow Price</th></tr>';
  var invCount = {};
  var i;
  var quickSL = system.getValueJSON('quickSearchList');
  // fill up the Inv Counter
  itemList.forEach(function(item) {
    var name = itemName(item);
    foundInvItem(invCount, name);
    for (i = 0; i < quickSL.length; i += 1) {
      if (name.indexOf(quickSL[i].searchname) >= 0 &&
          invCount[name].nicknameList.indexOf(quickSL[i].nickname) < 0) {
        invCount[name].nicknameList += '<a href="index.php?cmd=' +
          'auctionhouse&search_text=' + quickSL[i].searchname + '">' +
          quickSL[i].nickname + '</a> ';
        quickSL[i].found = true;
      }
    }
  });
  // show inv & counter for item with nickname found
  Object.keys(invCount).forEach(function(key) {
    if (invCount[key].nicknameList !== '') {
      output += '<tr><td>' + key + '</td><td>' +
        invCount[key].nicknameList + '</td><td>' +
        invCount[key].count + '</td><td></td><td></td><td></td></tr>';
    }
  });
  // show item from quick AH search that are not in our inv
  output += '</td></tr><tr><td colspan="5"><hr></td></tr>';
  output += '<tr><td>Did not find:</td><td colspan="4">';
  for (i = 0; i < quickSL.length; i += 1) {
    if (quickSL[i].displayOnAH && !quickSL[i].found) {
      output += '<a href="index.php?cmd=auctionhouse&' +
        'search_text=' + quickSL[i].searchname + '">' +
        quickSL[i].nickname + '</a>, ';
    }
  }
  output += '</td></tr><tr><td colspan="5"><hr></td></tr>' +
    '<tr><th colspan="5" class="fshCenter">Items NOT from ' +
    '<a href="index.php?cmd=notepad&blank=1&subcmd=auctionsearch">' +
    'AH Quick Search</a> found in your inventory</td>';
  // show inv & counter for item with nickname NOT found
  Object.keys(invCount).forEach(function(key) {
    if (invCount[key].nicknameList === '') {
      output += '<tr><td>' + key + '</td><td>' +
      invCount[key].nicknameList + '</td><td>' +
      invCount[key].count + '</td><td></td><td></td><td></td></tr>';
    }
  });
  output += '</table>';
  document.getElementById('invTabs-ah').innerHTML = output;
}

function doUseItem(evt) { // Legacy
  var invId = evt.target.getAttribute('itemID');
  useItem(invId).done(function(data) {
    if (data.r !== 0) {return;}
    evt.target.parentNode.innerHTML = '<span class="fastWorn">Used</span>';
  });
}

function useProfileInventoryItem(evt) {
  layout.confirm('Use/Extract Item',
    'Are you sure you want to use/extract the item?',
    doUseItem.bind(null, evt)
  );
}

function equipProfileInventoryItem(evt) { // Legacy
  var invId = evt.target.getAttribute('itemID');
  equipItem(invId).done(function(data) {
    if (data.r !== 0) {return;}
    evt.target.parentNode.innerHTML = '<span class="fastWorn">Worn</span>';
  });
}

function itemImage(item) {
  var ret = system.imageServer + '/';
  if (item.b === 13699) {
    ret += 'composing/potions/' + item.extra.design + '_' +
      item.extra.color + '.gif';
  } else {
    ret += 'items/' + item.b + '.gif';
  }
  return ret;
}

function listen(evt) {
  if (evt.target.classList.contains('smallLink') &&
      evt.target.classList.contains('fshEq')) {
    equipProfileInventoryItem(evt);
    return;
  }
  if (evt.target.classList.contains('smallLink') &&
      evt.target.classList.contains('fshUse')) {
    useProfileInventoryItem(evt);
  }
}

function alpha(a, b) {
  if (a.n.toLowerCase() < b.n.toLowerCase()) {return -1;}
  if (a.n.toLowerCase() > b.n.toLowerCase()) {return 1;}
  return 0;
}

function folder(a, b) {
  if (a.f === b.f) {
    return alpha(a, b);
  }
  return a.f - b.f;
}

function showQuickWear(data) { // jQuery
  itemList = data.items;
  var output = '<div id="invTabs"><ul>' +
    '<li><a href="#invTabs-qw">Quick Wear / Use / Extract<br>Manager</a></li>' +
    '<li><a href="#invTabs-ah">Inventory Manager Counter<br>' +
    'filtered by AH Quick Search</a></li></ul>' +
    '<div id="invTabs-qw"><table width="100%"><tr ' +
    'class="fshHeader"><td><b>' +
    'Quick Wear / Use / Extract Manager</b></td></tr></table>' +
    '<table width="100%"><tr><th class="fshCenter" width="20%">Actions</th>' +
    '<th colspan="4">Items</th></tr>';
  itemList.sort(folder);
  itemList.forEach(function(item) {
    var equipClass = 'fshEq ';
    var useClass = 'fshUse ';
    if (item.eq) {equipClass += 'smallLink';} else {equipClass += 'notLink';}
    if (!item.c && item.u) {
      useClass += 'smallLink';
    } else {useClass += 'notLink';}
    output += '<tr><td class="fshCenter">' +
      '<span class="' + equipClass + '" ' +
      'itemID="' + item.a + '">Wear</span>&nbsp;|&nbsp;' +
      '<span class="' + useClass + '" ' +
      'itemID="' + item.a + '">Use/Ext</span>' +
      '</td><td></td><td>' +
      '<img src="' + itemImage(item) + '" ' +
      'class="tip-dynamic" data-tipped="fetchitem.php?item_id=' + item.b +
      '&amp;inv_id=' + item.a + '&amp;t=1&amp;p=' + playerId + '&amp;' +
      'currentPlayerId=' + playerId + '" width="30" height="30" border="0">' +
      '</td><td width="90%">&nbsp;' + itemName(item) + '</td></tr>';
  });
  output += '</table></div><div id="invTabs-ah"></div></div>';
  content.innerHTML = output;
  document.getElementById('invTabs').addEventListener('click', listen);
  $('#invTabs').tabs();
  $('#invTabs').tabs('select', 0);
  showAHInvManager('#invTabs-ah');
}

export default function insertQuickWear(injector) { // Legacy
  content = injector || layout.pCC;
  if (!content) {return;}
  content.innerHTML = 'Getting item list from backpack';
  backpack().done(showQuickWear);
  playerId = layout.playerId();
}
