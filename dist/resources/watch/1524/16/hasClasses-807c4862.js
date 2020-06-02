import { aH as hasClass, r as partial } from './calfSystem-6e4b53e3.js';

function exists(el, className) { return hasClass(className, el); }

function hasClasses(classAry, el) {
  return classAry.every(partial(exists, el));
}

export { hasClasses as h };
//# sourceMappingURL=hasClasses-807c4862.js.map
