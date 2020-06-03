import { a3 as arrayFrom } from './calfSystem-03895320.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-40826543.js.map
