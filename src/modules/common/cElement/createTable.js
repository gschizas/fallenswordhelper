import cElement from './cElement';
import { defTable } from '../../support/constants';

export default function createTable(props) {
  return cElement(defTable, props);
}
