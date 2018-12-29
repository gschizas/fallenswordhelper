import calf from '../../support/calf';
import {wantedArray, wantedList} from './lists';

var thisBounty;

function acceptBtn(action, cell) {
  if (action !== '[n/a]') {
    return cell.firstChild.firstChild.getAttribute('onclick');
  }
  return '';
}

function getTarget(target, theRow) {
  thisBounty = {};
  thisBounty.target = target;
  thisBounty.link = theRow.cells[0].firstChild.firstChild.href;
  thisBounty.lvl = theRow.cells[0].firstChild.firstChild.nextSibling
    .textContent.replace(/\[/, '').replace(/\]/, '');
  thisBounty.offerer = theRow.cells[1].firstChild.firstChild.firstChild
    .textContent;
  thisBounty.reward = theRow.cells[2].textContent;
  thisBounty.rewardType = theRow.cells[2].firstChild.firstChild.firstChild
    .firstChild.nextSibling.firstChild.title;
  thisBounty.xpLoss = theRow.cells[3].textContent;
  thisBounty.posted = theRow.cells[4].textContent;
  thisBounty.tickets = theRow.cells[5].textContent;
  thisBounty.accept = acceptBtn(theRow.cells[6].textContent.trim(),
    theRow.cells[6]);
  wantedList.bounty.push(thisBounty);
}

var isWanted = [
  function() {return wantedArray.includes('*');},
  function(target) {return wantedArray.includes(target);},
  function(target, theRow) {
    return calf.wantedGuildMembers &&
      theRow.cells[6].textContent.trim() === '[n/a]';
  }
];

function wantedTarget(target, theRow) {
  if (theRow.cells[6].textContent.trim() !== '[active]' &&
      isWanted.some(function(el) {return el(target, theRow);})) {
    getTarget(target, theRow);
  }
}

export default function findTarget(activeTable) {
  for (var i = 1; i < activeTable.rows.length - 2; i += 2) {
    var theRow = activeTable.rows[i];
    var target = theRow.cells[0].firstChild
      .firstChild.firstChild.textContent;
    if (target === '[ No bounties available. ]') {break;}
    wantedTarget(target, theRow);
  }
}
