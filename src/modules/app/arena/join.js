import arena from './arena';

export default function join(pvpId) {
  return arena({subcmd: 'join', pvp_id: pvpId});
}
