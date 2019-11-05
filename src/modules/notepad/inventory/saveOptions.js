import calf from '../../support/calf';
import {set} from '../../system/idb';

export default function saveOptions(options) {
  set('fsh_' + calf.subcmd, options);
}
