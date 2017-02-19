import * as ajax from './support/ajax';
import * as layout from './support/layout';
import * as system from './support/system';
import * as task from './support/task';

var ranks;
var myRank;
var theRows;
var rankCount;
var characterRow;

function parseRankData(responseText) { // Native
  /* jshint validthis: true */
  // Makes a weighted calculation of available permissions and gets tax rate
  var doc = system.createDocument(responseText);
  var checkBoxes = doc.querySelectorAll(
    '#pCC input[type="checkbox"]:checked');
  var count = 0;
  Array.prototype.forEach.call(checkBoxes, function(checkbox) {
    var privName = checkbox.nextElementSibling.textContent.trim();
    if (privName === 'Bank Withdraw' ||
      privName === 'Build/Upgrade/Demolish Structures' ||
      privName === 'Can Un-Tag Items') {
      count += 5;
    } else if (privName === 'Build/Upgrade Structures' ||
      privName === 'Can Kick Members') {
      count += 4;
    } else if (privName === 'Can Mass Messages') {
      count += 0.5;
    } else if (privName === 'Take Items' ||
      privName === 'Can Recall Tagged Items') {
      count += 0.2;
    } else if (privName === 'Store Items' ||
      privName === 'Can View Advisor') {
      count += 0.1;
    } else {
      count+= 1;
    }
  });
  var taxRate = doc.querySelector('#pCC input[name="rank_tax"]').value;
  var linkElement = this.linkElement;
  linkElement.insertAdjacentHTML('afterbegin', '<span class="fshBlue">(' +
    Math.round(10*count)/10 + ') Tax:(' + taxRate + '%)</span> ');
}

function fetchRankData() { // jQuery
  var calcButton = document.getElementById('getrankweightings');
  calcButton.classList.add('fshHide');
  var allItems = document.querySelectorAll('#pCC input[value="Edit"]');
  Array.prototype.forEach.call(allItems, function(anItem) {
    var targetNode = anItem.parentNode.parentNode.previousElementSibling;
    var href = /window\.location='(.*)';/.exec(anItem
      .getAttribute('onclick'))[1];
    $.ajax({url: href, linkElement: targetNode}).done(parseRankData);
  });
}

function ajaxifyRankControls(evt) { // jQuery
  var val = evt.target.getAttribute('value');
  if (val !== 'Up' && val !== 'Down') {return;}
  evt.stopPropagation();
  var onclickHREF = /window.location=\'(.*)\';/
    .exec(evt.target.getAttribute('onclick'))[1];
  var thisRankRow = evt.target.parentNode.parentNode.parentNode;
  var thisRankRowNum = thisRankRow.rowIndex;
  var targetRowNum = thisRankRowNum + (val === 'Up' ? -1 : 2);
  var parentTable = thisRankRow.parentNode;
  if (characterRow >= Math.min(thisRankRowNum, targetRowNum) ||
      targetRowNum < 1 ||
      targetRowNum > parentTable.rows.length) {return;}
  $.get(onclickHREF);
  var injectRow = parentTable.rows[targetRowNum];
  parentTable.insertBefore(thisRankRow, injectRow);
  window.scrollBy(0, val === 'Up' ? -22 : 22);
}

function doButtons() { // Native
  // gather rank info button
  var weightButton = document.createElement('input');
  weightButton.id = 'getrankweightings';
  weightButton.className = 'custombutton';
  weightButton.setAttribute('type', 'button');
  weightButton.setAttribute('value', 'Get Rank Weightings');
  weightButton.addEventListener('click', fetchRankData);
  var theTd = document.getElementById('show-guild-founder-rank-name')
    .parentNode;
  theTd.insertAdjacentHTML('beforeend', '&nbsp;');
  theTd.insertAdjacentElement('beforeend', weightButton);

  if (system.getValue('ajaxifyRankControls')) {
    layout.pCC.addEventListener('click',
      ajaxifyRankControls, true);
  }
}

function paintRanks() { // Native
  var limit = performance.now() + 10;
  while (performance.now() < limit &&
      rankCount < theRows.length) {
    var el = theRows[rankCount];
    var rankCell = el.firstElementChild;
    var rankName = rankCell.textContent;
    if (ranks[rankName]) { // has members
      if (rankName === myRank) {
        characterRow = rankCount; // limit for ajaxify later
      }
      rankCell.insertAdjacentHTML('beforeend', ' <span class="fshBlue">- ' +
        ranks[rankName].join(', ') + '</span>');
    }
    rankCount += 1;
  }
  if (rankCount < theRows.length) {
    task.add(3, paintRanks);
  }
}

function getRanks(membrList) { // Native
  ranks = Object.keys(membrList).reduce(function(prev, curr) {
    if (curr !== 'lastUpdate') {
      var rankName = membrList[curr].rank_name;
      prev[rankName] = prev[rankName] || [];
      prev[rankName].push(curr);
    }
    return prev;
  }, {});
  myRank = membrList[layout.playerName()].rank_name;
  theRows = layout.pCC.firstElementChild
    .nextElementSibling.rows[13].firstElementChild.firstElementChild.rows;
  rankCount = 1;
  task.add(3, paintRanks);
}

export function injectGuildRanks() { // jQuery
  ajax.getMembrList(true).done(function(membrList) {
    task.add(3, getRanks, [membrList]);
  });
  task.add(3, doButtons);
}
