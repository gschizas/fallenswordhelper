import getArrayByTagName from '../../common/getArrayByTagName';
import {getElementById} from '../../common/getElement';

export default function getFolderImgs(doc) {
  var el = getElementById('pCC', doc).children[0].rows[4].cells[0].children[0];
  return getArrayByTagName('img', el);
}
