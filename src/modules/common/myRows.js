export default function myRows(cols, skip) {
  return function(el, i) {return el.children.length === cols && i > skip;};
}
