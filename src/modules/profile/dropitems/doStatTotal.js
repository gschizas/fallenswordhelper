import getValue from '../../system/getValue';
import runDefault from '../../common/runDefault';

export default function doStatTotal() {
  if (getValue('showStatBonusTotal')) {
    runDefault(import('../../common/addStatTotalToMouseover'));
  }
}
