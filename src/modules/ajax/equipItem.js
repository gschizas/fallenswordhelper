import dialog from './dialog';
import retryAjax from './retryAjax';

export default function equipItem(backpackInvId) {
  return retryAjax({
    url: 'index.php',
    data: {
      cmd: 'profile',
      subcmd: 'equipitem',
      inventory_id: backpackInvId,
      ajax: 1
    },
    dataType: 'json'
  }).done(dialog);
}
