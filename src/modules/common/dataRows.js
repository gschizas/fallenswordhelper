export const dataRows = (cols, skip) =>
  (el, i) => el.children.length === cols && i > skip;

