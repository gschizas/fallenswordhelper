import { b0 as profile } from './calfSystem-c0288c6c.js';

function loadInventory() {
  return profile({ subcmd: 'loadinventory' });
}

// import { $dataAccess } from './_dataAccess';

function daLoadInventory() {
  // return $dataAccess(loadInventory, fetchinv);
  return loadInventory();
}

export { daLoadInventory as d };
//# sourceMappingURL=daLoadInventory-a317d78c.js.map
