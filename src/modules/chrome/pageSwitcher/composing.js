import runDefault from '../../common/runDefault';

const composingBreakdown = () => { runDefault(import('../../composing/breakdown')); };
const composingCreate = () => { runDefault(import('../../composing/composingCreate')); };
const injectComposing = () => { runDefault(import('../../composing/composing')); };

export default {
  '-': { '-': injectComposing },
  breakdown: { '-': composingBreakdown },
  create: { '-': composingCreate },
};
