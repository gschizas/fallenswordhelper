import { aK as hasClass, u as partial } from './calfSystem-cb5d894f.js';

function exists(el, className) { return hasClass(className, el); }

function hasClasses(classAry, el) {
  return classAry.every(partial(exists, el));
}

export { hasClasses as h };
//# sourceMappingURL=hasClasses-e43b6836.js.map
