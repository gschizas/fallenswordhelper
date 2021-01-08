import basicBounty from './basicBounty';
import calf from '../../support/calf';
import extend from '../../common/extend';
import getTextTrim from '../../common/getTextTrim';
import { wantedArray, wantedList } from './lists';

function acceptBtn(theCells) {
  const cell = theCells[6];
  if (getTextTrim(cell) !== '[n/a]') {
    return cell.children[0].children[0].getAttribute('onclick');
  }
  return '';
}

function getTarget(theCells) {
  return extend(basicBounty(theCells), {
    offerer: getTextTrim(theCells[1].children[0].children[0]),
    tickets: getTextTrim(theCells[5]),
    accept: acceptBtn(theCells),
  });
}

const isWanted = [
  () => wantedArray.includes('*'),
  (target) => wantedArray.includes(target),
  (target, theRow) => calf.wantedGuildMembers
    && getTextTrim(theRow.cells[6]) === '[n/a]',
];

function wanted(target, theRow) {
  return getTextTrim(theRow.cells[6]) !== '[active]'
    && isWanted.some((el) => el(target, theRow));
}

function wantedTarget(target, theRow) {
  if (wanted(target, theRow)) {
    wantedList.bounty.push(getTarget(theRow.cells));
  }
}

export default function findTarget(activeTable) {
  for (let i = 1; i < activeTable.rows.length - 2; i += 2) {
    const theRow = activeTable.rows[i];
    const target = getTextTrim(theRow.cells[0].children[0].children[0]);
    if (target === '[ No bounties available. ]') { break; }
    wantedTarget(target, theRow);
  }
}
