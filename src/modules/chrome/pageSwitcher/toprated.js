import runDefault from '../../common/runDefault';

const globalQuest = () => { runDefault(import('../../topRated/globalQuest')); };
const injectTopRated = () => { runDefault(import('../../topRated/toprated')); };

export default {
  xp: { '-': injectTopRated },
  monthlyxp: { '-': injectTopRated },
  gold: { '-': injectTopRated },
  killstreak: { '-': injectTopRated },
  bounties: { '-': injectTopRated },
  risingstars: { '-': injectTopRated },
  arena: { '-': injectTopRated },
  superelites: { '-': injectTopRated },
  smasher: { '-': injectTopRated },
  globalquest: { '-': globalQuest },
};
