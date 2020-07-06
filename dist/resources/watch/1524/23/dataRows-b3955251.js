import { M as arrayFrom } from './calfSystem-2b1fed3f.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-b3955251.js.map
