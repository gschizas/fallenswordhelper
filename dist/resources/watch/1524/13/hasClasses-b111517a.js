import { aK as hasClass, u as partial } from './calfSystem-5ce1fc75.js';

function exists(el, className) { return hasClass(className, el); }

function hasClasses(classAry, el) {
  return classAry.every(partial(exists, el));
}

export { hasClasses as h };
//# sourceMappingURL=hasClasses-b111517a.js.map
