import getInvTable from './getInvTable';

export default function updateUsedCount(del) {
  var fshTally = getInvTable().parentNode.children[2].children[1].children[0];
  if (fshTally.tagName !== 'TABLE') {return;}
  var tallyRows = fshTally.rows;
  var usedCountDom = tallyRows[tallyRows.length - 1].cells[1].children[0];
  var usedCount = Number(usedCountDom.textContent);
  usedCount -= del;
  usedCountDom.textContent = usedCount.toString();
}
