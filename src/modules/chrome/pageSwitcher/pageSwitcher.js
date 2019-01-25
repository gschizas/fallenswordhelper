import allowBack from '../../guide/allowBack';
import arena from './arena';
import auctionhouse from './auctionhouse';
import composing from './composing';
import craftForge from '../../craftForge';
import guild from './guild/guild';
import {injectBank} from '../../bank';
import injectBazaar from '../../bazaar';
import injectFindPlayer from '../../injectFindPlayer';
import injectMailbox from '../../mailbox/mailbox';
import injectQuickBuff from '../../quickbuff/quickBuff';
import injectSettings from '../../settings/injectSettings';
import injectTitan from '../../scoutTower/injectTitan';
import injectWorld from '../../world/injectWorld';
import inventing from '../../inventing/inventing';
import items from './items';
import ladder from '../../ladder';
import log from './log';
import marketplace from '../../marketplace';
import news from './news';
import noCmd from './noCmd';
import notepad from './notepad';
import {parseTemplePage} from '../notification/parseTemplePage';
import points from './points';
import profile from './profile';
import questbook from './questbook';
import quests from './quests';
import scavenging from './scavenging';
import superelite from '../../seLog/superelite';
import toprated from './toprated';
import trade from './trade';

export default {
  settings: {'-': {'-': injectSettings}},
  world: {'-': {'-': injectWorld}},
  news: news,
  arena: arena,
  questbook: questbook,
  profile: profile,
  auctionhouse: auctionhouse,
  guild: guild,
  bank: {'-': {'-': injectBank}},
  log: log,
  potionbazaar: {'-': {'-': injectBazaar}},
  marketplace: {createreq: {'-': marketplace}},
  quickbuff: {'-': {'-': injectQuickBuff}}, // No ga
  notepad: notepad,
  points: {'-': {'-': points}},
  trade: trade,
  titan: {'-': {'-': injectTitan}},
  toprated: toprated,
  inventing: {viewrecipe: {'-': inventing}},
  tempinv: {'-': {'-': injectMailbox}},
  findplayer: {'-': {'-': injectFindPlayer}},
  quests: quests, // UFSG
  items: items, // UFSG
  creatures: {'-': {'-': allowBack}}, // UFSG
  masterrealms: {'-': {'-': allowBack}}, // UFSG
  realms: {'-': {'-': allowBack}}, // UFSG
  relics: {'-': {'-': allowBack}}, // UFSG
  shops: {'-': {'-': allowBack}}, // UFSG
  scavenging: scavenging,
  temple: {'-': {'-': parseTemplePage}},
  composing: composing,
  pvpladder: {'-': {'-': ladder}},
  crafting: {'-': {'-': craftForge}},
  hellforge: {'-': {'-': craftForge}},
  superelite: {'-': {'-': superelite}},
  '-': noCmd
};
