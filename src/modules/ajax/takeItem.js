import dialog from './dialog';
import retryAjax from './retryAjax';

export default function takeItem(invId) {
  return retryAjax({
    url: 'index.php',
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
