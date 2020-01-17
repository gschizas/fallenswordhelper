import advisorView from '../app/guild/advisorView';
import ajaxQb from './quickbuff';
import appFetchinv from '../app/guild/fetchinv';
import appFindPlayer from '../app/findplayer';
import appGuildManage from '../app/guild/manage';
import appGuildView from '../app/guild/view';
import appQb from '../app/quickbuff';
import appScouttower from '../app/guild/scouttower';
import appSe from '../app/superelite';
import appSend from '../app/trade/senditems';
import appViewCombat from '../app/combat/view';
import appViewProfile from '../app/profile/view';
import bazaarBuy from './bazaarBuy';
import buyitem from '../app/potionbazaar/buyitem';
import components from './components';
import composing from './composing';
import composingView from '../app/composing/view';
import destroyComponent from '../app/profile/destroycomponent';
import doinvent from '../app/inventing/doinvent';
import dostoreitems from '../app/guild/inventory/dostoreitems';
import dropComponent from './dropComponent';
import fetchinv from './fetchinv';
import findPlayer from './findPlayer';
import getValueJSON from '../system/getValueJSON';
import groupStats from './groupStats';
import groupsView from '../app/guild/groups/view';
import groupsViewStats from '../app/guild/groups/viewStats';
import gsTake from './gsTake';
import guildFetchInv from './guildFetchInv';
import guildInvRecall from './guildInvRecall';
import guildManage from './guildManage';
import guildReport from './guildReport';
import guildView from './guildView';
import hasFailed from './hasFailed';
import invent from './invent';
import loadComponents from '../app/profile/loadcomponents';
import loadInventory from '../app/profile/loadInventory';
import mailboxTake from './mailboxTake';
import moveItems from './moveItems';
import moveRank from './moveRank';
import {nowSecs} from '../support/now';
import rankPosition from '../app/guild/ranks/position';
import ranks from '../app/guild/ranks/ranks';
import ranksView from './ranksView';
import recall from '../app/guild/inventory/recall';
import report from '../app/guild/inventory/report';
import scouttower from './scouttower';
import senditems from './sendItems';
import sendtofolder from '../app/profile/sendtofolder';
import setValueJSON from '../system/setValueJSON';
import storeitems from './storeitems';
import superelite from './superelite';
import takeitem from '../app/guild/inventory/takeitem';
import takeitems from '../app/tempinv/take';
import unequip from './unequip';
import unequipitem from '../app/profile/unequipitem';
import useItem from './useItem';
import useitem from '../app/profile/useitem';
import viewAdvisor from './viewAdvisor';
import viewCombat from './viewCombat';
import viewGroups from './viewGroups';
import viewProfile from './viewProfile';

let appBad;

function resetAppBad() {
  if (appBad[0] < nowSecs - 24 * 60 * 60) {appBad = [nowSecs, false];}
}

function initAppBad() {
  if (!appBad) {
    appBad = getValueJSON('appBad') || [nowSecs, false];
    resetAppBad();
    // setValueJSON('appBad', appBad);
  }
}

export function _dataAccess(appFn, fallbackFn, ...args) {
  initAppBad();
  if (appBad[1]) {return fallbackFn(...args);}
  return appFn(...args)
    .then(function(json) {
      // if (hasFailed(json)) {
      if (hasFailed()) {
        appBad = [nowSecs, true];
        setValueJSON('appBad', appBad);
        return fallbackFn(...args);
      }
      return json;
    })
    .catch(() => fallbackFn(...args));
}

export const daAdvisor = period =>
  _dataAccess(advisorView, viewAdvisor, period);
export const daBazaarBuy = item => _dataAccess(buyitem, bazaarBuy, item);
export const daComponents = () => _dataAccess(loadComponents, components);
export const daComposing = () => _dataAccess(composingView, composing);
export const daDestroyComponent = componentIdAry =>
  _dataAccess(destroyComponent, dropComponent, componentIdAry);
export const daDoInvent = recipe => _dataAccess(doinvent, invent, recipe);
export const daFindPlayer = username =>
  _dataAccess(appFindPlayer, findPlayer, username);
export const daGroupStats = groupId =>
  _dataAccess(groupsViewStats, groupStats, groupId);
export const daGsTake = invId =>
  _dataAccess(takeitem, gsTake, invId);
export const daGuildFetchInv = () => _dataAccess(appFetchinv, guildFetchInv);
export const daGuildManage = () => _dataAccess(appGuildManage, guildManage);
export const daGuildRecall = (invId, playerId, mode) =>
  _dataAccess(recall, guildInvRecall, invId, playerId, mode);
export const daGuildReport = () => _dataAccess(report, guildReport);
export const daGuildView = guildId =>
  _dataAccess(appGuildView, guildView, guildId);
export const daLoadInventory = () => _dataAccess(loadInventory, fetchinv);
export const daMailboxTake = invIdAry =>
  _dataAccess(takeitems, mailboxTake, invIdAry);
export const daQuickbuff = (userAry, buffAry) =>
  _dataAccess(appQb, ajaxQb, userAry, buffAry);
export const daRankPosition = (direction, rankId) =>
  _dataAccess(rankPosition, moveRank, direction, rankId);
export const daRanksView = () => _dataAccess(ranks, ranksView);
export const daScoutTower = () => _dataAccess(appScouttower, scouttower);
export const daSendItems = invIdAry =>
  _dataAccess(appSend, senditems, invIdAry);
export const daSendToFolder = (folderId, itemsAry) =>
  _dataAccess(sendtofolder, moveItems, folderId, itemsAry);
export const daStoreItems = invIdAry =>
  _dataAccess(dostoreitems, storeitems, invIdAry);
export const daSuperElite = () => _dataAccess(appSe, superelite);
export const daUnequipItem = item => _dataAccess(unequipitem, unequip, item);
export const daUseItem = item => _dataAccess(useitem, useItem, item);
export const daViewCombat = id => _dataAccess(appViewCombat, viewCombat, id);
export const daViewGroups = () => _dataAccess(groupsView, viewGroups);
export const daViewProfile = () => _dataAccess(appViewProfile, viewProfile);
