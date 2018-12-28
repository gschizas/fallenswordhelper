import {getElementById} from '../common/getElement';
import getElementsByTagName from '../common/getElementsByTagName';

export default function getFolderImgs(doc) {
  var el = getElementById('pCC', doc).children[0].rows[4].cells[0].children[0];
  return Array.from(getElementsByTagName('img', el));
}
