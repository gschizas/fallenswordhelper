import './calfSystem-995e3482.js';
import { a as ajaxifyBank } from './ajaxifyBank-8f457207.js';

function injectBank() {
  ajaxifyBank({
    headSelector: '#pCC h2',
    headText: 'Bank',
    appLink: true,
    depoPos: 1,
    balPos: 0,
    data: {
      cmd: 'bank',
      subcmd: 'transaction',
    },
    initWithdraw: '',
  });
}

export default injectBank;
//# sourceMappingURL=injectBank-64c94591.js.map
