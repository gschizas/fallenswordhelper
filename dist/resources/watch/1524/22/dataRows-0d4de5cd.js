import { M as arrayFrom } from './calfSystem-995e3482.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-0d4de5cd.js.map
