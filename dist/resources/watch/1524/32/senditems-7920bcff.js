import { w as callApp } from './calfSystem-e64be67d.js';

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
//# sourceMappingURL=senditems-7920bcff.js.map
