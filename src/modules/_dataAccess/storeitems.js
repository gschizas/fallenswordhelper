import {htmlResult} from './htmlResult';
import indexAjaxData from '../ajax/indexAjaxData';

export default function storeitems(invIdAry) {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'inventory',
    subcmd2: 'dostoreitems',
    storeIndex: invIdAry
  }).then(htmlResult);
}
