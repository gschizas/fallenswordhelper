import dialog from './dialog';
import indexAjaxJson from './indexAjaxJson';

export default function takeItem(invId) {
  return indexAjaxJson({
    cmd: 'guild',
    subcmd: 'inventory',
    subcmd2: 'takeitem',
    guildstore_id: invId,
    ajax: 1
  }).done(dialog);
}
