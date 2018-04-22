import profile from './profile';

export default function useitem(item) {
  return profile({
    subcmd: 'useitem',
    inventory_id: item
  });
}
