import calf from '../../support/calf';
import {getElementById} from '../../common/getElement';
import getElementsByClassName from '../../common/getElementsByClassName';
import hideElement from '../../common/hideElement';
import hideNodeList from './hideNodeList';

export default function doHideBuffSelected(parent, checkOn, quickBuff) {
  if (calf.hideBuffSelected) {
    hideNodeList(getElementsByClassName(checkOn, parent));
    hideElement(getElementById(quickBuff));
  }
}
