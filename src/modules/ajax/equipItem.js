import dialog from './dialog';
import indexAjaxJson from './indexAjaxJson';

export default function equipItem(backpackInvId) {
  return indexAjaxJson({
    cmd: 'profile',
    subcmd: 'equipitem',
    inventory_id: backpackInvId,
    ajax: 1
  }).done(dialog);
}
