import callApp from '../callApp';

export default function useitem(item) {
  return callApp({
    cmd: 'profile',
    subcmd: 'useitem',
    inventory_id: item,
    app: '1'
  });
}
