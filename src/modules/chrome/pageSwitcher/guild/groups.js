import runDefault from '../../../common/runDefault';

const injectGroups = () => {
  runDefault(import('../../../guild/groups/groups'));
};
const injectGroupStats = () => {
  runDefault(import('../../../guild/groups/injectGroupStats'));
};

export default {
  viewstats: injectGroupStats,
  joinallgroupsundersize: injectGroups,
  joinall: injectGroups,
  '-': injectGroups,
};
