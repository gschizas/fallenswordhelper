import closest from './closest';
import { defTd } from '../support/constants';

export default function closestTd(el) {
  return closest(defTd, el);
}
