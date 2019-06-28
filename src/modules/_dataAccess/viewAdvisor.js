import {arrayFrom} from '../common/arrayFrom';
import createDocument from '../system/createDocument';
import getTextTrim from '../common/getTextTrim';
import indexAjaxData from '../ajax/indexAjaxData';
import intValue from '../system/intValue';
import querySelector from '../common/querySelector';

const getInt = cell => intValue(getTextTrim(cell));

function formatData(row) {
  return {
    player: {level: 0, name: getTextTrim(row.cells[0])},
    stats: [
      getInt(row.cells[3]),
      getInt(row.cells[4]),
      getInt(row.cells[5]),
      getInt(row.cells[6]),
      getInt(row.cells[7]),
      getInt(row.cells[9]),
      getInt(row.cells[1]),
      getInt(row.cells[2]),
      getInt(row.cells[8])
    ]
  };
}

function parseReport(html) {
  const doc = createDocument(html);
  const advisorTable = querySelector('#pCC table table', doc);
  const advisorRows = arrayFrom(advisorTable.rows).slice(1, -1);
  const advisorData = advisorRows.map(formatData);
  return {r: advisorData, s: true};
}

// Incomplete
export default function viewAdvisor(period) {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'advisor',
    subcmd2: 'view',
    period: period
  }).then(parseReport);
}
