import { ay as hasClass, r as partial } from './calfSystem-b469667c.js';

function exists(el, className) { return hasClass(className, el); }

function hasClasses(classAry, el) {
  return classAry.every(partial(exists, el));
}

export { hasClasses as h };
//# sourceMappingURL=hasClasses-6bd4aae7.js.map
