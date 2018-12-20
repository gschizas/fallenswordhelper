import calf from '../support/calf';
import setForage from '../ajax/setForage';

export default function saveOptions(options) {
  setForage('fsh_' + calf.subcmd, options);
}
