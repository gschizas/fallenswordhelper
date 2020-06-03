import { a3 as arrayFrom } from './calfSystem-940bc1b5.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-ef529462.js.map
