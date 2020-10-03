import { m as getArrayByTagName, y as getElementById, B as getText, G as getValue, c1 as joinallUrl, c2 as joinUnderUrl } from './calfSystem-c851a12c.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-21fda3e0.js';

function findNewGroup(el) {
  if (!getText(el).includes('New attack group created.')) { return; }
  let groupJoinHTML = '';
  if (!getValue('enableMaxGroupSizeToJoin')) {
    groupJoinHTML = `<a href="${joinallUrl}"><span `
      + 'class="notification-icon"></span><p class="notification-content">'
      + 'Join all attack groups.</p></a>';
  } else {
    const maxGroupSizeToJoin = getValue('maxGroupSizeToJoin');
    groupJoinHTML = `<a href="${joinUnderUrl}"><span `
      + 'class="notification-icon"></span><p class="notification-content">'
      + `Join all attack groups less than size ${maxGroupSizeToJoin
      }.</p></a>`;
  }
  insertHtmlAfterEnd(el, `<li class="notification">${groupJoinHTML}</li>`);
}

function injectJoinAllLink() {
  getArrayByTagName('li', getElementById('pCL')).forEach(findNewGroup);
}

export default injectJoinAllLink;
//# sourceMappingURL=injectJoinAllLink-fca9fc8e.js.map
