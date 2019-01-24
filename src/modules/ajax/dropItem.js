import dialog from './dialog';
import indexAjaxJson from './indexAjaxJson';

export default function dropItem(invIdList) {
  return indexAjaxJson({
    cmd: 'profile',
    subcmd: 'dodropitems',
    removeIndex: invIdList,
    ajax: 1
  }).done(dialog);
}
