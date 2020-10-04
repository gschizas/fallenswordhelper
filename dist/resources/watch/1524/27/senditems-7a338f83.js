import { w as callApp } from './calfSystem-975d976a.js';

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
//# sourceMappingURL=senditems-7a338f83.js.map
