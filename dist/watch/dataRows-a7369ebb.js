import { aJ as arrayFrom } from './calfSystem-cb5d894f.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-a7369ebb.js.map
