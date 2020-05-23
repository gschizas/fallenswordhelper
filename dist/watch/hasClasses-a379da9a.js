import { aK as hasClass, u as partial } from './calfSystem-e592bbc5.js';

function exists(el, className) { return hasClass(className, el); }

function hasClasses(classAry, el) {
  return classAry.every(partial(exists, el));
}

export { hasClasses as h };
//# sourceMappingURL=hasClasses-a379da9a.js.map
