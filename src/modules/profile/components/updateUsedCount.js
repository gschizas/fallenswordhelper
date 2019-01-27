import getInvTable from './getInvTable';
import getText from '../../common/getText';
import setText from '../../common/setText';

export default function updateUsedCount(del) {
  var invTableParent = getInvTable().parentNode;
  if (!invTableParent) {return;}
  var fshTally = invTableParent.children[2].children[1].children[0];
  if (fshTally.tagName !== 'TABLE') {return;}
  var tallyRows = fshTally.rows;
  var usedCountDom = tallyRows[tallyRows.length - 1].cells[1].children[0];
  var usedCount = Number(getText(usedCountDom));
  usedCount -= del;
  setText(usedCount, usedCountDom);
}
