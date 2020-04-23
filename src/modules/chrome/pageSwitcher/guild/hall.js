import { injectBioWidgets } from '../loader';
import runDefault from '../../../common/runDefault';

const guildHall = () => { runDefault(import('../../../guild/hall/hall')); };

export default {
  '-': guildHall,
  post: injectBioWidgets,
};
