import dialog from './dialog';
import indexAjax from './indexAjax';

export default function equipItem(backpackInvId) {
  return indexAjax({
    data: {
      cmd: 'profile',
      subcmd: 'equipitem',
      inventory_id: backpackInvId,
      ajax: 1
    },
    dataType: 'json'
  }).done(dialog);
}
