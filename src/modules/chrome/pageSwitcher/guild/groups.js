import injectGroupStats from '../../../guild/groups/injectGroupStats';
import injectGroups from '../../../guild/groups/groups';

export default {
  viewstats: injectGroupStats,
  joinallgroupsundersize: injectGroups,
  joinall: injectGroups,
  '-': injectGroups
};
