import buffReportParser from '../notepad/buffLog/buffReportParser';
import createDocument from '../system/createDocument';
import { getBuffId } from '../common/buffUtils';
import indexAjaxData from '../ajax/indexAjaxData';

const playerName = (result) => result[3] || result[6] || result[7];
const successObject = (result) => (
  { id: getBuffId(result[1]), level: Number(result[2]) }
);

function failObject(result) {
  if (result[4]) {
    return { id: getBuffId(result[4]), reason: result[5] };
  }
  return { id: getBuffId(result[9]), reason: result[8] };
}

function byPlayer(acc, curr) {
  const thisPlayer = playerName(curr);
  let thisObj = acc.find((o) => o.player.name === thisPlayer);
  if (!thisObj) {
    thisObj = { player: { name: thisPlayer }, casts: [], failed: [] };
    acc.push(thisObj);
  }
  if (curr[1]) {
    thisObj.casts.push(successObject(curr));
  } else {
    thisObj.failed.push(failObject(curr));
  }
  return acc;
}

function buffFormatter(buffsParsed) {
  const buffsByPlayer = buffsParsed.reduce(byPlayer, []); // FIXME
  return { r: buffsByPlayer, s: true };
}

function formatResponse(html) {
  const buffsParsed = buffReportParser(createDocument(html));
  return buffFormatter(buffsParsed);
}

export default function quickbuff(userAry, buffAry) {
  return indexAjaxData({
    cmd: 'quickbuff',
    subcmd: 'activate',
    targetPlayers: userAry.join(),
    skills: buffAry,
  }).then(formatResponse);
}
