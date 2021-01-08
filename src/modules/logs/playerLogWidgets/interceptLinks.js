import arrayFrom from '../../common/arrayFrom';
import buffList from '../../support/buffObj.json';
import { chatSelector } from '../../support/constants';
import closestTd from '../../common/closestTd';
import closestTr from '../../common/closestTr';
import csvSplit from '../../common/csvSplit';
import getTextTrim from '../../common/getTextTrim';
import getValue from '../../system/getValue';
import onclick from '../../common/onclick';
import openQuickBuffByName from '../../common/openQuickBuffByName';
import querySelector from '../../common/querySelector';
import toLowerCase from '../../common/toLowerCase';

const isChat = (target) => querySelector(chatSelector, closestTr(target));
const getChildNodes = (target) => arrayFrom(closestTd(target).childNodes);
const childText = (target) => getChildNodes(target).map(getTextTrim);
const thisNick = (nick, buffObj) => csvSplit(buffObj.nicks)
  .includes(toLowerCase(nick));

function needToParse(target, btnText) {
  return isChat(target) && (btnText === 'Buff'
    || (btnText === 'Reply'
    && getValue('enableChatParsing')));
}

function parseReply(target) {
  const msgNodesArray = childText(target).slice(0, 2);
  const msg = msgNodesArray.join(' ');
  let tip = msg;
  if (msg.length > 140) {
    tip = `${msg.substring(0, 140)}...`;
  }
  window.openQuickMsgDialog(msgNodesArray[0], '', tip);
}

function getBuffId(nick) {
  const thisBuff = buffList.find((buffObj) => thisNick(nick, buffObj));
  if (thisBuff) { return thisBuff.id; }
}

function parseBuffs(e, target) {
  const [playerName, msg] = childText(target);
  const buffs = /`~(.*)~`/.exec(msg);
  if (buffs) {
    const ids = csvSplit(buffs[1]).map(getBuffId).filter((b) => b).join(';');
    openQuickBuffByName(playerName, ids);
    e.preventDefault();
  }
}

function intercept(e) {
  const { target } = e;
  const btnText = getTextTrim(target);
  if (needToParse(target, btnText)) {
    if (btnText === 'Reply') {
      parseReply(target);
      e.preventDefault();
    }
    if (btnText === 'Buff') {
      parseBuffs(e, target);
    }
  }
}

export default function interceptLinks(logTable) {
  onclick(logTable, intercept);
}
