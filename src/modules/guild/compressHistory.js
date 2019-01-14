import compressBio from '../profile/bio/compressBio';
import {def_table} from '../support/constants';
import getArrayByTagName from '../common/getArrayByTagName';
import {pCC} from '../support/layout';

export default function compressHistory() {
  compressBio(getArrayByTagName(def_table, pCC).slice(-2, -1)[0]);
}
