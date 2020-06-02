import { k as getArrayByTagName, x as getElementById, A as getText, D as getValue, by as joinallUrl, bz as joinUnderUrl } from './calfSystem-f6498976.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-c351a35c.js';

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
//# sourceMappingURL=injectJoinAllLink-98087b4e.js.map
