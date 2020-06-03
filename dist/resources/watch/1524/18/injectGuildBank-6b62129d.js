import './calfSystem-940bc1b5.js';
import { a as ajaxifyBank } from './ajaxifyBank-86f5c71b.js';

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
//# sourceMappingURL=injectGuildBank-6b62129d.js.map
