import closest from './closest';
import { defTr } from '../support/constants';

export default function closestTr(el) {
  return closest(defTr, el);
}
