import calf from '../support/calf';
import navigateTo from './navigateTo';
import { joinUnderUrl, joinallUrl } from '../support/constants';

export default function joinGroups() {
  if (!calf.enableMaxGroupSizeToJoin) {
    navigateTo(joinallUrl);
  } else {
    navigateTo(joinUnderUrl);
  }
}
