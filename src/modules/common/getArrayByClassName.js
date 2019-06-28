import {arrayFrom} from './arrayFrom';
import getElementsByClassName from './getElementsByClassName';

export default function getArrayByClassName(names, element) {
  return arrayFrom(getElementsByClassName(names, element));
}
