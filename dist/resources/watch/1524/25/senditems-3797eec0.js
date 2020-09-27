import { w as callApp } from './calfSystem-0ffc234f.js';

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
//# sourceMappingURL=senditems-3797eec0.js.map
