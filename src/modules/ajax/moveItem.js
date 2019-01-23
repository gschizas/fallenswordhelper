import dialog from './dialog';
import indexAjax from './indexAjax';

export default function moveItem(invIdList, folderId) {
  return indexAjax({
    data: {
      cmd: 'profile',
      subcmd: 'sendtofolder',
      inv_list: JSON.stringify(invIdList),
      folder_id: folderId,
      ajax: 1
    },
    dataType: 'json'
  }).done(dialog);
}
