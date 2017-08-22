import {dialog} from '../support/ajax';
import retryAjax from './retryAjax';

export default function dropItem(invIdList) {
  return retryAjax({
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
