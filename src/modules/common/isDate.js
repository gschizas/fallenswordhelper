export default function isDate(aDate) {
  return Object.prototype.toString.call(aDate) === '[object Date]' &&
    !isNaN(aDate.getTime());
}
