import {dialog} from '../support/ajax';

export default function dropItem(invIdList) {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'profile',
      subcmd: 'dodropitems',
      removeIndex: invIdList,
      ajax: 1
    },
    dataType: 'json'
  }).done(dialog);
}
