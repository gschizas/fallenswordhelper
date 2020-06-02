import { aI as months } from './calfSystem-6e4b53e3.js';

function parseDateAsTimestamp(textDate) {
  const dateAry = textDate.split(/[: /[]/);
  return Date.UTC(Number(dateAry[4]), months.indexOf(dateAry[3]),
    Number(dateAry[2]), Number(dateAry[0]), Number(dateAry[1]), 0);
}

export { parseDateAsTimestamp as p };
//# sourceMappingURL=parseDateAsTimestamp-fd1018b2.js.map
