import './calfSystem-21d16a0e.js';
import { a as ajaxifyBank } from './ajaxifyBank-9f28e1f8.js';

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
//# sourceMappingURL=injectBank-12856d08.js.map
