import hasClass from './hasClass';

export default function hasClasses(classAry, el) {
  return classAry.every((className) => hasClass(className, el));
}
