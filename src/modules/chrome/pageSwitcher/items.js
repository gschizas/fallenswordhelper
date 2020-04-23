import { allowBack } from './loader';
import runDefault from '../../common/runDefault';

const itemsView = () => { runDefault(import('../../guide/itemsView')); };

export default {
  '-': { '-': allowBack },
  view: { '-': itemsView },
};
