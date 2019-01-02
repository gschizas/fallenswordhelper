import {getElementById} from '../../common/getElement';
import getElementsByTagName from '../../common/getElementsByTagName';
import getValue from '../../system/getValue';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';

function findNewGroup(el) {
  if (el.textContent.indexOf('New attack group created.') === -1) {return;}
  var groupJoinHTML = '';
  if (!getValue('enableMaxGroupSizeToJoin')) {
    groupJoinHTML = '<a href="index.php?cmd=guild&subcmd=groups&' +
      'subcmd2=joinall"><span class="notification-icon"></span>' +
      '<p class="notification-content">Join all attack groups.</p></a>';
  } else {
    var maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
    groupJoinHTML = '<a href="index.php?cmd=guild&subcmd=groups&' +
      'subcmd2=joinallgroupsundersize"><span class="notification-icon">' +
      '</span><p class="notification-content">Join all attack groups ' +
      'less than size ' + maxGroupSizeToJoin + '.</p></a>';
  }
  insertHtmlAfterEnd(el, '<li class="notification">' + groupJoinHTML + '</li>');
}

export default function injectJoinAllLink() {
  var nodeList = getElementsByTagName('li', getElementById('pCL'));
  Array.prototype.forEach.call(nodeList, findNewGroup);
}
