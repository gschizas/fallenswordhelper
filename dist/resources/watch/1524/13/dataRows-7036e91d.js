import { aJ as arrayFrom } from './calfSystem-5ce1fc75.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-7036e91d.js.map
