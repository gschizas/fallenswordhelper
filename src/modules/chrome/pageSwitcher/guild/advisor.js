import runDefault from '../../../common/runDefault';

const injectAdvisor = () => {
  runDefault(import('../../../guild/advisor/guildAdvisor'));
};

export default {
  '-': injectAdvisor,
  weekly: injectAdvisor,
};
