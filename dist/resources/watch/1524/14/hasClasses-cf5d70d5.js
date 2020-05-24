import { aK as hasClass, u as partial } from './calfSystem-43606e5e.js';

function exists(el, className) { return hasClass(className, el); }

function hasClasses(classAry, el) {
  return classAry.every(partial(exists, el));
}

export { hasClasses as h };
//# sourceMappingURL=hasClasses-cf5d70d5.js.map
