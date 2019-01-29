import dontPost from '../common/dontPost';
import getElementsByTagName from '../common/getElementsByTagName';
import on from '../common/on';
import {pCC} from '../support/layout';
import partial from '../common/partial';

export default function allowBack(topTable) { // jQuery
  var thisSelect = getElementsByTagName('select', topTable)[0];
  $(thisSelect).off();
  on(thisSelect, 'change', partial(dontPost, pCC));
}
