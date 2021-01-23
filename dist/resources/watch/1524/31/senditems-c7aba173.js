import { w as callApp } from './calfSystem-91adbec8.js';

function senditems(user, invIdAry) {
  return callApp({
    cmd: 'trade',
    subcmd: 'senditems',
    xc: window.ajaxXC,
    target_username: user,
    items: invIdAry,
  });
}

export { senditems as s };
//# sourceMappingURL=senditems-c7aba173.js.map
