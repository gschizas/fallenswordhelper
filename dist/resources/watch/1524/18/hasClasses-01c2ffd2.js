import { aH as hasClass, r as partial } from './calfSystem-940bc1b5.js';

function exists(el, className) { return hasClass(className, el); }

function hasClasses(classAry, el) {
  return classAry.every(partial(exists, el));
}

export { hasClasses as h };
//# sourceMappingURL=hasClasses-01c2ffd2.js.map
