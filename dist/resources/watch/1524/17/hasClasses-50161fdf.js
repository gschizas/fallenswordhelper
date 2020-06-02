import { aH as hasClass, r as partial } from './calfSystem-f6498976.js';

function exists(el, className) { return hasClass(className, el); }

function hasClasses(classAry, el) {
  return classAry.every(partial(exists, el));
}

export { hasClasses as h };
//# sourceMappingURL=hasClasses-50161fdf.js.map
