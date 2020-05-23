import { bl as profile } from './calfSystem-5ce1fc75.js';

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
//# sourceMappingURL=daUseItem-6e748997.js.map
