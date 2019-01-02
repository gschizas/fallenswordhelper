import getElementsByClassName from './getElementsByClassName';

export default function getArrayByClassName(names, element) {
  return Array.from(getElementsByClassName(names, element));
}
