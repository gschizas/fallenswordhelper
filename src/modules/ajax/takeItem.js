import dialog from './dialog';
import indexAjax from './indexAjax';

export default function takeItem(invId) {
  return indexAjax({
    data: {
      cmd: 'guild',
      subcmd: 'inventory',
      subcmd2: 'takeitem',
      guildstore_id: invId,
      ajax: 1
    },
    dataType: 'json'
  }).done(dialog);
}
