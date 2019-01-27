import basicBounty from './basicBounty';
import calf from '../../support/calf';
import extend from '../../common/extend';
import getText from '../../common/getText';
import getTextTrim from '../../common/getTextTrim';
import {wantedArray, wantedList} from './lists';

function acceptBtn(theCells) {
  var cell = theCells[6];
  if (getTextTrim(cell) !== '[n/a]') {
    return cell.firstChild.firstChild.getAttribute('onclick');
  }
  return '';
}

function getTarget(theCells) {
  return extend(basicBounty(theCells), {
    offerer: getText(theCells[1].firstChild.firstChild.firstChild),
    tickets: getText(theCells[5]),
    accept: acceptBtn(theCells)
  });
}

var isWanted = [
  function() {return wantedArray.includes('*');},
  function(target) {return wantedArray.includes(target);},
  function(target, theRow) {
    return calf.wantedGuildMembers && getTextTrim(theRow.cells[6]) === '[n/a]';
  }
];

function wanted(target, theRow) {
  return getTextTrim(theRow.cells[6]) !== '[active]' &&
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
    var target = getText(theRow.cells[0].firstChild.firstChild.firstChild);
    if (target === '[ No bounties available. ]') {break;}
    wantedTarget(target, theRow);
  }
}
