import basicBounty from './basicBounty';
import calf from '../../support/calf';
import extend from '../../common/extend';
import getTextTrim from '../../common/getTextTrim';
import partial from '../../common/partial';
import {wantedArray, wantedList} from './lists';

function acceptBtn(theCells) {
  var cell = theCells[6];
  if (getTextTrim(cell) !== '[n/a]') {
    return cell.children[0].children[0].getAttribute('onclick');
  }
  return '';
}

function getTarget(theCells) {
  return extend(basicBounty(theCells), {
    offerer: getTextTrim(theCells[1].children[0].children[0]),
    tickets: getTextTrim(theCells[5]),
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

function condition(target, theRow, el) {return el(target, theRow);}

function wanted(target, theRow) {
  return getTextTrim(theRow.cells[6]) !== '[active]' &&
    isWanted.some(partial(condition, target, theRow));
}

function wantedTarget(target, theRow) {
  if (wanted(target, theRow)) {
    wantedList.bounty.push(getTarget(theRow.cells));
  }
}

export default function findTarget(activeTable) {
  for (var i = 1; i < activeTable.rows.length - 2; i += 2) {
    var theRow = activeTable.rows[i];
    var target = getTextTrim(theRow.cells[0].children[0].children[0]);
    if (target === '[ No bounties available. ]') {break;}
    wantedTarget(target, theRow);
  }
}
