import guildInventory from './guildInventory';
// import failStub from '../../failStub';

export default function recall(invId, playerId, mode) {
  // return failStub();
  return guildInventory({
    subcmd2: 'recall',
    id: invId, // + 10000000,
    player_id: playerId,
    mode: mode
  });
}
