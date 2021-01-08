import closest from './closest';
import { defTable } from '../support/constants';

export default function closestTable(el) {
  return closest(defTable, el);
}
