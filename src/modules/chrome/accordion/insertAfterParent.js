import {getElementById} from '../../common/getElement';
import {sendException} from '../../support/fshGa';

export default function insertAfterParent(target, fn, listItem) {
  var tgt = getElementById(target);
  if (tgt instanceof Node) {
    var parent = tgt.parentNode;
    fn(parent, listItem);
  } else {sendException('#' + target + ' is not a Node', false);}
}
