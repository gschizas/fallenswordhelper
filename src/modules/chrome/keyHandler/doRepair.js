import notWorld from './notWorld';
import {blacksmithUrl, def_subcmd} from '../../support/constants';

export default function doRepair() {
  // do not use repair link for new map
  notWorld('doRepair', blacksmithUrl + def_subcmd + 'repairall');
}
