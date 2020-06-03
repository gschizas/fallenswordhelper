import runDefault from '../../common/runDefault';
import { ufsgAllowBack } from './loader';

const itemsView = () => { runDefault(import('../../guide/itemsView')); };

export default {
  '-': { '-': ufsgAllowBack },
  view: { '-': itemsView },
};
