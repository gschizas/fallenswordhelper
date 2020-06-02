import { a3 as arrayFrom } from './calfSystem-6e4b53e3.js';

const dataRows = (rows, cols, skip) => arrayFrom(rows)
  .filter((el, i) => el.children.length === cols && i > skip);

export { dataRows as d };
//# sourceMappingURL=dataRows-ca15bfda.js.map
