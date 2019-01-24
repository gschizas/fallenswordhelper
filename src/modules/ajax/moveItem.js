import dialog from './dialog';
import indexAjaxJson from './indexAjaxJson';

export default function moveItem(invIdList, folderId) {
  return indexAjaxJson({
    cmd: 'profile',
    subcmd: 'sendtofolder',
    inv_list: JSON.stringify(invIdList),
    folder_id: folderId,
    ajax: 1
  }).done(dialog);
}
