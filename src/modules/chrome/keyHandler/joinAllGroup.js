import expandMenu from './expandMenu';
import getValue from '../../system/getValue';
import keyHandlerEvent from './keyHandlerEvent';
import {joinUnderUrl, joinallUrl} from '../../support/constants';

export default function joinAllGroup() {
  keyHandlerEvent('joinAllGroup');
  expandMenu('4');
  if (!getValue('enableMaxGroupSizeToJoin')) {
    location.href = joinallUrl;
  } else {
    location.href = joinUnderUrl;
  }
}
