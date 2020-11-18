import './calfSystem-b31646eb.js';
import { a as ajaxifyBank } from './ajaxifyBank-6d610026.js';

function injectGuildBank() {
  ajaxifyBank({
    headSelector: '#pCC b',
    headText: 'Guild Bank',
    appLink: false,
    depoPos: 3,
    balPos: 2,
    data: {
      cmd: 'guild',
      subcmd: 'bank',
      subcmd2: 'transaction',
    },
    initWithdraw: '1',
  });
}

export default injectGuildBank;
//# sourceMappingURL=injectGuildBank-d8281bdd.js.map
