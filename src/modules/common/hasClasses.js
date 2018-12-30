import hasClass from './hasClass';

export default function hasClasses(classAry, el) {
  return classAry.every(function(className) {
    return hasClass(className, el);
  });
}
