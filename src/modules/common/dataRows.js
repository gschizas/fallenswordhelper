import arrayFrom from './arrayFrom';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export default dataRows;
