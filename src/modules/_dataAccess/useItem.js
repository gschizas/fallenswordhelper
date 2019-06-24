import dialog from '../ajax/dialog';
import {htmlResult} from './htmlResult';
import indexAjaxData from '../ajax/indexAjaxData';

export default function useItem(backpackInvId) {
  return indexAjaxData({
    url: 'index.php',
    data: {
      cmd: 'profile',
      subcmd: 'useitem',
      inventory_id: backpackInvId
    }
  }).pipe(htmlResult)
    .done(dialog);
}
