import { b0 as profile } from './calfSystem-2b1fed3f.js';

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
//# sourceMappingURL=daUseItem-8fd000c2.js.map
