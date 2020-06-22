import { b0 as profile } from './calfSystem-995e3482.js';

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
//# sourceMappingURL=daUseItem-dbacd00d.js.map
