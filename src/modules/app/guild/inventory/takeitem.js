import guildInventory from './guildInventory';

export default function takeitem(invId) {
  return guildInventory({
    subcmd2: 'takeitem',
    guildstore_id: invId,
  });
}
