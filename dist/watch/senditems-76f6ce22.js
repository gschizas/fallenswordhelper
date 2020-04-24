import { y as callApp } from './calfSystem-69cf053a.js';

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
//# sourceMappingURL=senditems-76f6ce22.js.map
