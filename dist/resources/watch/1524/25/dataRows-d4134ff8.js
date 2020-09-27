import { M as arrayFrom } from './calfSystem-0ffc234f.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-d4134ff8.js.map
