import runDefault from '../../common/runDefault';

const injectTrade = () => { runDefault(import('../../trade/trade')); };

export default {
  '-': { '-': injectTrade },
  sendgold: { '-': injectTrade },
  createsecure: { '-': injectTrade },
  docreatesecure: { '-': injectTrade },
};
