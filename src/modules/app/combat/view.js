import callApp from '../callApp';

export default function viewCombat(id) {
  return callApp({
    cmd: 'combat',
    subcmd: 'view',
    combat_id: id
  });
}
