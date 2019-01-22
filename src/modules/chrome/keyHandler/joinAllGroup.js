import expandMenu from './expandMenu';
import getValue from '../../system/getValue';
import keyHandlerEvent from './keyHandlerEvent';

export default function joinAllGroup() {
  keyHandlerEvent('joinAllGroup');
  expandMenu('4');
  if (!getValue('enableMaxGroupSizeToJoin')) {
    location.href = 'index.php?cmd=guild&subcmd=groups&subcmd2=joinall';
  } else {
    location.href =
      'index.php?cmd=guild&subcmd=groups&subcmd2=joinallgroupsundersize';
  }
}
