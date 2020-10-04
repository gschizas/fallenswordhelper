import { b0 as profile } from './calfSystem-975d976a.js';

function useitem(item) {
  return profile({
    subcmd: 'useitem',
    inventory_id: item,
  });
}

// import { $dataAccess } from './_dataAccess';

function daUseItem(item) {
  // return $dataAccess(useitem, useItem, item);
  return useitem(item);
}

export { daUseItem as d };
//# sourceMappingURL=daUseItem-d416b7cf.js.map
