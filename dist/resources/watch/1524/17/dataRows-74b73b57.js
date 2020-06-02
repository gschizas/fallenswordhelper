import { a3 as arrayFrom } from './calfSystem-f6498976.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-74b73b57.js.map
