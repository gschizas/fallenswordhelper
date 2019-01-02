import getElementsByTagName from './getElementsByTagName';

export default function getArrayByTagName(tagName, element) {
  return Array.from(getElementsByTagName(tagName, element));
}
