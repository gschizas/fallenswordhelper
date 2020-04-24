import { aJ as arrayFrom } from './calfSystem-69cf053a.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-07dea2e7.js.map
