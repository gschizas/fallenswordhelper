import basicBounty from './basicBounty';
import calf from '../../support/calf';
import extend from '../../common/extend';
import {wantedArray, wantedList} from './lists';

function acceptBtn(theCells) {
  var cell = theCells[6];
  if (cell.textContent.trim() !== '[n/a]') {
    return cell.firstChild.firstChild.getAttribute('onclick');
  }
  return '';
}

function getTarget(theCells) {
  return extend(basicBounty(theCells), {
    offerer: theCells[1].firstChild.firstChild.firstChild.textContent,
    tickets: theCells[5].textContent,
    accept: acceptBtn(theCells)
  });
}

var isWanted = [
  function() {return wantedArray.includes('*');},
  function(target) {return wantedArray.includes(target);},
  function(target, theRow) {
    return calf.wantedGuildMembers &&
      theRow.cells[6].textContent.trim() === '[n/a]';
  }
];

function wanted(target, theRow) {
  return theRow.cells[6].textContent.trim() !== '[active]' &&
    isWanted.some(function(el) {return el(target, theRow);});
}

function wantedTarget(target, theRow) {
  if (wanted(target, theRow)) {
    wantedList.bounty.push(getTarget(theRow.cells));
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
