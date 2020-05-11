import { aJ as arrayFrom } from './calfSystem-05ea3a63.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-3b603b30.js.map
