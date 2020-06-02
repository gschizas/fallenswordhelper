import { b1 as profile } from './calfSystem-f6498976.js';

function loadInventory() {
  return profile({ subcmd: 'loadinventory' });
}

// import { $dataAccess } from './_dataAccess';

function daLoadInventory() {
  // return $dataAccess(loadInventory, fetchinv);
  return loadInventory();
}

export { daLoadInventory as d };
//# sourceMappingURL=daLoadInventory-d16236a1.js.map
