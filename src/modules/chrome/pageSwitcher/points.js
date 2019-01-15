import parseGoldUpgrades from '../notification/parseGoldUpgrades';
import storePlayerUpgrades from '../../upgrades';

export default {
  '-': {
    '-': {
      '-': {'-': storePlayerUpgrades},
      '0': {'-': storePlayerUpgrades},
      '1': {'-': parseGoldUpgrades}
    }
  }
};
