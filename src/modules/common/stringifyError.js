export default function stringifyError(err) {
  return JSON.stringify(err,
    Object.getOwnPropertyNames(Object.getPrototypeOf(err)), '|');
}
