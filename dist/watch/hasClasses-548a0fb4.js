import { aK as hasClass, u as partial } from './calfSystem-69cf053a.js';

function exists(el, className) { return hasClass(className, el); }

function hasClasses(classAry, el) {
  return classAry.every(partial(exists, el));
}

export { hasClasses as h };
//# sourceMappingURL=hasClasses-548a0fb4.js.map
