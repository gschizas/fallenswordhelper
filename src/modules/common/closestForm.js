import closest from './closest';
import { defForm } from '../support/constants';

export default function closestForm(el) {
  return closest(defForm, el);
}
