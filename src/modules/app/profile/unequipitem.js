import profile from './profile';

export default function unequipitem(item) {
  return profile({
    subcmd: 'unequipitem',
    inventory_id: item
  });
}
