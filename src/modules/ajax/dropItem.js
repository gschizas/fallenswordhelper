import dialog from './dialog';
import indexAjax from './indexAjax';

export default function dropItem(invIdList) {
  return indexAjax({
    data: {
      cmd: 'profile',
      subcmd: 'dodropitems',
      removeIndex: invIdList,
      ajax: 1
    },
    dataType: 'json'
  }).done(dialog);
}
