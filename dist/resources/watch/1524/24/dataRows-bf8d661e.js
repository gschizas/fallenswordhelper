import { M as arrayFrom } from './calfSystem-dea093d3.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-bf8d661e.js.map
