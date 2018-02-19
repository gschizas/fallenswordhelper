export default function stringifyError(err) {
  var plainObject = {};
  Object.getOwnPropertyNames(err).forEach(function(key) {
    plainObject[key] = err[key];
  });
  return JSON.stringify(plainObject);
}
