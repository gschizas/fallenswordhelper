import {getElementById} from '../../common/getElement';

var invTableCache;

export default function getInvTable() {
  if (!invTableCache) {
    var invTables = getElementById('profileRightColumn')
      .getElementsByClassName('inventory-table');
    if (invTables.length === 2) {invTableCache = invTables[1];}
  }
  return invTableCache;
}
