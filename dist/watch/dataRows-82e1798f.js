import { aJ as arrayFrom } from './calfSystem-1499e8da.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-82e1798f.js.map
