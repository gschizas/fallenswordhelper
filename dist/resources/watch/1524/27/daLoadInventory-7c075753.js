import { b0 as profile } from './calfSystem-975d976a.js';

function loadInventory() {
  return profile({ subcmd: 'loadinventory' });
}

// import { $dataAccess } from './_dataAccess';

function daLoadInventory() {
  // return $dataAccess(loadInventory, fetchinv);
  return loadInventory();
}

export { daLoadInventory as d };
//# sourceMappingURL=daLoadInventory-7c075753.js.map
