import { aK as hasClass, u as partial } from './calfSystem-1499e8da.js';

function exists(el, className) { return hasClass(className, el); }

function hasClasses(classAry, el) {
  return classAry.every(partial(exists, el));
}

export { hasClasses as h };
//# sourceMappingURL=hasClasses-36237eec.js.map
