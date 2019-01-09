import guildInventory from './guildInventory';

export default function recall(invId, playerId, mode) {
  return guildInventory({
    subcmd2: 'recall',
    id: invId,
    player_id: playerId,
    mode: mode
  });
}
