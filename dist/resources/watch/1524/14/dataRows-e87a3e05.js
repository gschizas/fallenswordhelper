import { aJ as arrayFrom } from './calfSystem-43606e5e.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-e87a3e05.js.map
