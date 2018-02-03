import callApp from '../../callApp';
import errorDialog from '../../errorDialog';

export default function takeitem(invId) {
  return callApp({
    cmd: 'guild',
    subcmd: 'inventory',
    subcmd2: 'takeitem',
    guildstore_id: invId, // + 10000000,
  }).pipe(errorDialog);
}
