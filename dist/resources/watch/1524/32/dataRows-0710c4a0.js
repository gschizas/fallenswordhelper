import { M as arrayFrom } from './calfSystem-e64be67d.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-0710c4a0.js.map
