import advisor from './advisor';
import groups from './groups';
import guildMailbox from '../../../mailbox/guildMailbox';
import hall from './hall';
import injectBioWidgets from '../../../profile/bio/bioWidgets';
import injectGuild from '../../../guild/guild';
import {injectGuildBank} from '../../../bank';
import injectGuildRanks from '../../../guild/ranks/rank';
import injectRPUpgrades from '../../../guild/injectRPUpgrades';
import injectScouttower from '../../../scoutTower/injectScouttower';
import injectViewGuild from '../../../guild/injectViewGuild';
import inventory from './inventory';
import {guildChat, guildLog} from '../../../logs/logs';

export default {
  inventory: inventory,
  chat: {'-': {'-': guildChat}},
  dochat: {'-': {'-': guildChat}},
  log: {'-': {'-': guildLog}},
  groups: groups,
  manage: {'-': {'-': injectGuild}},
  advisor: advisor,
  history: {'-': {'-': injectBioWidgets}},
  view: {'-': {'-': injectViewGuild}},
  scouttower: {'-': {'-': injectScouttower}},
  mailbox: {'-': {'-': guildMailbox}},
  ranks: {'-': {'-': injectGuildRanks}},
  conflicts: {rpupgrades: {'-': injectRPUpgrades}},
  bank: {'-': {'-': injectGuildBank}},
  hall: hall
};
