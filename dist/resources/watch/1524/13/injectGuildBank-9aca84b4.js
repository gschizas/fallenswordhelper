import './calfSystem-5ce1fc75.js';
import { a as ajaxifyBank } from './ajaxifyBank-b265ab3a.js';

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
//# sourceMappingURL=injectGuildBank-9aca84b4.js.map
