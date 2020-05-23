import { aJ as arrayFrom } from './calfSystem-e592bbc5.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-fb71f2a0.js.map
