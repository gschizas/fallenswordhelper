import calf from '../../support/calf';
import {getElementById} from '../../common/getElement';
import hideElement from '../../common/hideElement';
import hideNodeList from './hideNodeList';

export default function doHideBuffSelected(parent, checkOn, quickBuff) {
  if (calf.hideBuffSelected) {
    hideNodeList(parent.getElementsByClassName(checkOn));
    hideElement(getElementById(quickBuff));
  }
}
