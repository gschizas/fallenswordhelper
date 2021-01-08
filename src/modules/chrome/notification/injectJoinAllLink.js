import calf from '../../support/calf';
import getArrayByTagName from '../../common/getArrayByTagName';
import getText from '../../common/getText';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import { pCL } from '../../support/layout';
import { joinUnderUrl, joinallUrl } from '../../support/constants';

function findNewGroup(el) {
  if (!getText(el).includes('New attack group created.')) { return; }
  let groupJoinHTML = '';
  if (!calf.enableMaxGroupSizeToJoin) {
    groupJoinHTML = `<a href="${joinallUrl}"><span `
      + 'class="notification-icon"></span><p class="notification-content">'
      + 'Join all attack groups.</p></a>';
  } else {
    groupJoinHTML = `<a href="${joinUnderUrl}"><span `
      + 'class="notification-icon"></span><p class="notification-content">'
      + `Join all attack groups less than size ${calf.maxGroupSizeToJoin
      }.</p></a>`;
  }
  insertHtmlAfterEnd(el, `<li class="notification">${groupJoinHTML}</li>`);
}

export default function injectJoinAllLink() {
  getArrayByTagName('li', pCL).forEach(findNewGroup);
}
