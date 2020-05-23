import { aJ as arrayFrom } from './calfSystem-98d7118c.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-6176e0e4.js.map
