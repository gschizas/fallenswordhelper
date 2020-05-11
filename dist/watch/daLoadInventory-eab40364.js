import { bl as profile } from './calfSystem-05ea3a63.js';

function loadInventory() {
  return profile({ subcmd: 'loadinventory' });
}

// import { $dataAccess } from './_dataAccess';

function daLoadInventory() {
  // return $dataAccess(loadInventory, fetchinv);
  return loadInventory();
}

export { daLoadInventory as d };
//# sourceMappingURL=daLoadInventory-eab40364.js.map
