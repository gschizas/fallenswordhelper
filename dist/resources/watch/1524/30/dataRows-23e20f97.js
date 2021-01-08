import { M as arrayFrom } from './calfSystem-d357ca6f.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-23e20f97.js.map
