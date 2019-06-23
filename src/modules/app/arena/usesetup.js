import arena from './arena';

export default function usesetup(setId) {
  return arena({subcmd: 'usesetup', set_id: setId});
}
