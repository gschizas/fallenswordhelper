import { aK as hasClass, u as partial } from './calfSystem-05ea3a63.js';

function exists(el, className) { return hasClass(className, el); }

function hasClasses(classAry, el) {
  return classAry.every(partial(exists, el));
}

export { hasClasses as h };
//# sourceMappingURL=hasClasses-1989e611.js.map
