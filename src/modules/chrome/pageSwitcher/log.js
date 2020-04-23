import runDefault from '../../common/runDefault';

const playerLog = () => { runDefault(import('../../logs/playerLog')); };
const outbox = () => { runDefault(import('../../logs/outbox')); };

export default {
  '-': { '-': playerLog },
  outbox: { '-': outbox },
};
