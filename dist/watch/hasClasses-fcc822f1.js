import { aK as hasClass, u as partial } from './calfSystem-98d7118c.js';

function exists(el, className) { return hasClass(className, el); }

function hasClasses(classAry, el) {
  return classAry.every(partial(exists, el));
}

export { hasClasses as h };
//# sourceMappingURL=hasClasses-fcc822f1.js.map
