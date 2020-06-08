import './calfSystem-c0288c6c.js';
import { a as ajaxifyBank } from './ajaxifyBank-f654517a.js';

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
//# sourceMappingURL=injectBank-dacca57f.js.map
