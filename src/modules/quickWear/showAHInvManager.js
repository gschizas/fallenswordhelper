import {createDiv} from '../common/cElement';
import * as system from '../support/system';

function ahLink(searchname, nickname) {
  return '<a href="index.php?cmd=auctionhouse&search_text=' + searchname +
    '">' + nickname + '</a>';
}

function foundInvItem(invCount, name) {
  if (invCount[name]) {
    invCount[name].count += 1;
  } else {
    invCount[name] = {count: 1, nicknameList: []};
  }
}

function displayFoundCount(invCount) {
  return Object.keys(invCount).reduce(function(prev, key) {
    if (invCount[key].nicknameList.length !== 0) {
      return prev + '<tr><td>' + key + '</td><td>' +
        invCount[key].nicknameList.map(function(nickname) {
          return ahLink(key, nickname);
        }).join(' ') + '</td><td>' +
        invCount[key].count + '</td><td></td><td></td></tr>';
    }
    return prev;
  }, '');
}

function displayNotFound(quickSL) {
  return quickSL.reduce(function(prev, item) {
    if (item.displayOnAH && !item.found) {
      return prev + ahLink(item.searchname, item.nickname) + ', ';
    }
    return prev;
  }, '');
}

function displayOtherCount(invCount) {
  return Object.keys(invCount).reduce(function(prev, key) {
    if (invCount[key].nicknameList.length === 0) {
      return prev + '<tr><td>' + key + '</td><td></td><td>' +
        invCount[key].count + '</td><td></td><td></td><td></td></tr>';
    }
    return prev;
  }, '');
}

function buildHTML(invCount, quickSL) {
  return '<table width="100%" cellspacing="2" cellpadding="2"><thead>' +
    '<tr><th colspan="5" class="fshCenter">Items from ' +
    '<a href="index.php?cmd=notepad&blank=1&subcmd=auctionsearch">' +
    'AH Quick Search</a> found in your inventory</th></tr>' +
    '<tr><th>Name</th><th>Nick Name</th><th>Inv Count</th>' +
    '<th>AH Min Price</th><th>AH BuyNow Price</th></tr></thead><tbody>' +
    // show inv & counter for item with nickname found
    displayFoundCount(invCount) +
    // show item from quick AH search that are not in our inv
    '<tr><td colspan="5"><hr></td></tr>' +
    '<tr><td>Did not find:</td><td colspan="4">' +
    displayNotFound(quickSL) +
    '</td></tr><tr><td colspan="5"><hr></td></tr></tbody>' +
    '<thead><tr><th colspan="5" class="fshCenter">Items NOT from ' +
    '<a href="index.php?cmd=notepad&blank=1&subcmd=auctionsearch">' +
    'AH Quick Search</a> found in your inventory</td></thead><tbody>' +
    // show inv & counter for item with nickname NOT found
    displayOtherCount(invCount) +
    '</tbody></table>';
}

function inQuickSearchList(invCount, name, listItem) {
  if (name === listItem.searchname) {
    listItem.found = true;
    if (invCount[name].nicknameList.indexOf(listItem.nickname) < 0) {
      invCount[name].nicknameList.push(listItem.nickname);
    }
  }
}

function testItemList(invCount, quickSL, item) {
  var name = item.n;
  foundInvItem(invCount, name);
  quickSL.forEach(inQuickSearchList.bind(null, invCount, name));
}

export default function showAHInvManager(itemList) {
  var invCount = {};
  var quickSL = system.getValueJSON('quickSearchList');
  // fill up the Inv Counter
  itemList.result.forEach(function(aFolder) {
    aFolder.items.forEach(testItemList.bind(null, invCount, quickSL));
  });
  var im = createDiv({
    id: 'invTabs-ah',
    className: 'ui-tabs-panel ui-corner-bottom'
  });
  im.insertAdjacentHTML('beforeend', buildHTML(invCount, quickSL));
  return im;
}
