import getArrayByTagName from '../../common/getArrayByTagName';
import {getElementById} from '../../common/getElement';
import getText from '../../common/getText';
import getValue from '../../system/getValue';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import {joinUnderUrl, joinallUrl} from '../../support/constants';

function findNewGroup(el) {
  if (!getText(el).includes('New attack group created.')) {return;}
  var groupJoinHTML = '';
  if (!getValue('enableMaxGroupSizeToJoin')) {
    groupJoinHTML = '<a href="' + joinallUrl + '"><span ' +
      'class="notification-icon"></span><p class="notification-content">' +
      'Join all attack groups.</p></a>';
  } else {
    var maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
    groupJoinHTML = '<a href="' + joinUnderUrl + '"><span ' +
      'class="notification-icon"></span><p class="notification-content">' +
      'Join all attack groups less than size ' + maxGroupSizeToJoin +
      '.</p></a>';
  }
  insertHtmlAfterEnd(el, '<li class="notification">' + groupJoinHTML + '</li>');
}

export default function injectJoinAllLink() {
  getArrayByTagName('li', getElementById('pCL')).forEach(findNewGroup);
}
