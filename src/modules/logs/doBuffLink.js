import buffList from '../support/buffObj';
import csvSplit from '../common/csvSplit';
import partial from '../common/partial';
import quickBuffHref from '../common/quickBuffHref';
import toLowerCase from '../common/toLowerCase';

function thisNick(nick, buffObj) {
  return csvSplit(buffObj.nicks).includes(toLowerCase(nick));
}

function getBuffId(nick) {
  return buffList.find(partial(thisNick, nick)).id;
}

export default function doBuffLink(targetPlayerID, buffsSent) {
  var href = '';
  if (buffsSent) {
    href = quickBuffHref(targetPlayerID,
      csvSplit(buffsSent[0].replace(/`~|~`/g, '')).map(getBuffId).join(';'));
  } else {
    href = quickBuffHref(targetPlayerID);
  }
  return ' | <a ' + href + '>Buff</a></span>';
}
