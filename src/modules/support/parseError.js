function parseStack(e) {
  var concatStack = e.stack.replace(/\n +/g, '|');
  if (e.stack.includes(e.message)) {
    return concatStack;
  }
  return e.message + '|' + concatStack;
}

export default function parseError(e) {
  if (e.stack) {return parseStack(e);}
  if (e.message) {return e.message;}
  return String(e);
}
