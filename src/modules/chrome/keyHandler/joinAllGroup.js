import calf from '../../support/calf';
import expandMenu from './expandMenu';
import keyHandlerEvent from './keyHandlerEvent';
import { joinUnderUrl, joinallUrl } from '../../support/constants';

export default function joinAllGroup() {
  keyHandlerEvent('joinAllGroup');
  expandMenu('4');
  if (!calf.enableMaxGroupSizeToJoin) {
    window.location.href = joinallUrl;
  } else {
    window.location.href = joinUnderUrl;
  }
}
