import hasClass from './hasClass';
import partial from './partial';

function exists(el, className) {return hasClass(className, el);}

export default function hasClasses(classAry, el) {
  return classAry.every(partial(exists, el));
}
