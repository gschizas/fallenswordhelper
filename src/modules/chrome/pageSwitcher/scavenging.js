import runDefault from '../../common/runDefault';

const injectScavenging = () => {
  runDefault(import('../../scavenging/scavenging'));
};

export default {
  '-': { '-': injectScavenging },
  process: { '-': injectScavenging },
};
