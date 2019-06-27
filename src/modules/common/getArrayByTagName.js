import {arrayFrom} from './arrayFrom';
import getElementsByTagName from './getElementsByTagName';

export default function getArrayByTagName(tagName, element) {
  return arrayFrom(getElementsByTagName(tagName, element));
}
