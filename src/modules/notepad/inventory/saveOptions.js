import calf from '../../support/calf';
import {set} from 'idb-keyval';

export default function saveOptions(options) {
  set('fsh_' + calf.subcmd, options);
}
