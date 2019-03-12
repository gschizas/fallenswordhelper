import ajaxifyBank from './ajaxifyBank';

export default function injectBank() {
  ajaxifyBank({
    headSelector: '#pCC h2',
    headText: 'Bank',
    appLink: true,
    depoPos: 1,
    balPos: 0,
    data: {
      cmd: 'bank',
      subcmd: 'transaction'
    },
    initWithdraw: ''
  });
}
