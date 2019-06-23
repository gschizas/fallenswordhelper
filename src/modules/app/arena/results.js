import arena from './arena';

export default function results(pvpId) {
  return arena({subcmd: 'results', pvp_id: pvpId});
}
