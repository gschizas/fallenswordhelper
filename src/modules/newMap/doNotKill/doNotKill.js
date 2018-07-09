import afterUpdateActionList from './afterUpdateActionList';
import {def_afterUpdateActionlist} from '../../support/constants';
import interceptDoAction from './interceptDoAction';

export default function doNotKill() {
  $.subscribe(def_afterUpdateActionlist, afterUpdateActionList);
  afterUpdateActionList();
  // then intercept the action call
  interceptDoAction();
}
