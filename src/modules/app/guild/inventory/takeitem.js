import errorDialog from '../../errorDialog';
import guildInventory from './guildInventory';

export default function takeitem(invId) {
  return guildInventory({
    subcmd2: 'takeitem',
    guildstore_id: invId, // + 10000000,
  }).pipe(errorDialog);
}
