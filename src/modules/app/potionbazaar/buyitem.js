import callApp from '../callApp';

export default function buyitem(item) {
  return callApp({
    cmd: 'potionbazaar',
    subcmd: 'buyitem',
    item_id: item
  });
}
