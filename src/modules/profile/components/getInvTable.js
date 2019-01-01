import {getElementById} from '../../common/getElement';
import getElementsByClassName from '../../common/getElementsByClassName';

var invTableCache;

export default function getInvTable() {
  if (!invTableCache) {
    var invTables = getElementsByClassName('inventory-table',
      getElementById('profileRightColumn'));
    if (invTables.length === 2) {invTableCache = invTables[1];}
  }
  return invTableCache;
}
