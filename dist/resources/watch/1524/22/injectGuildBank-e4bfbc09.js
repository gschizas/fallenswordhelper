import './calfSystem-995e3482.js';
import { a as ajaxifyBank } from './ajaxifyBank-8f457207.js';

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
//# sourceMappingURL=injectGuildBank-e4bfbc09.js.map
