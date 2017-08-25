import callApp from '../callApp';

export default function unequipitem(item) {
  return callApp({
    cmd: 'profile',
    subcmd: 'unequipitem',
    inventory_id: item,
    app: '1'
  });
}
