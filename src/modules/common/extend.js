export default function extend(obj, mixins) {
  Object.keys(mixins).forEach(function(key) {
    if (typeof mixins[key] === 'object' && mixins[key] !== null) {
      obj[key] = extend(mixins[key].constructor(), mixins[key]);
    } else {
      obj[key] = mixins[key];
    }
  });
  return obj;
}
