import isFunction from './isFunction';

export default function jQueryNotPresent() {return !isFunction(window.$);}
