import { b2 as profile } from './calfSystem-b469667c.js';

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
//# sourceMappingURL=daUseItem-98246ca2.js.map
