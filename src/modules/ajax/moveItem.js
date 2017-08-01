import {dialog} from '../support/ajax';

export default function moveItem(invIdList, folderId) {
  return $.ajax({
    url: 'index.php',
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
