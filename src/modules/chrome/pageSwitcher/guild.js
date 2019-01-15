import guildHall from '../../guild/hall';
import guildMailbox from '../../mailbox/guildMailbox';
import injectAdvisor from '../../guild/advisor/guildAdvisor';
import injectBioWidgets from '../../profile/bio/bioWidgets';
import injectGroupStats from '../../guild/groups/injectGroupStats';
import injectGroups from '../../guild/groups/groups';
import injectGuild from '../../guild/guild';
import injectGuildAddTagsWidgets from '../../guild/injectGuildAddTagsWidgets';
import {injectGuildBank} from '../../bank';
import injectGuildRanks from '../../guild/ranks/rank';
import injectRPUpgrades from '../../guild/injectRPUpgrades';
import injectReportPaint from '../../guild/guildReport/guildReport';
import injectScouttower from '../../scoutTower/injectScouttower';
import injectStoreItems from '../../profile/dropitems/injectStoreItems';
import injectViewGuild from '../../guild/injectViewGuild';
import {guildChat, guildLog} from '../../logs/logs';

export default {
  inventory: {
    report: {'-': {'-': injectReportPaint}},
    addtags: {'-': {'-': injectGuildAddTagsWidgets}},
    removetags: {'-': {'-': injectGuildAddTagsWidgets}},
    storeitems: {'-': {'-': injectStoreItems}}
  },
  chat: {'-': {'-': {'-': guildChat}}},
  dochat: {'-': {'-': {'-': guildChat}}},
  log: {'-': {'-': {'-': guildLog}}},
  groups: {
    viewstats: {'-': {'-': injectGroupStats}},
    joinallgroupsundersize: {'-': {'-': injectGroups}},
    joinall: {'-': {'-': injectGroups}},
    '-': {'-': {'-': injectGroups}}
  },
  manage: {'-': {'-': {'-': injectGuild}}},
  advisor: {
    '-': {'-': {'-': injectAdvisor}},
    weekly: {'-': {'-': injectAdvisor}}
  },
  history: {'-': {'-': {'-': injectBioWidgets}}},
  view: {'-': {'-': {'-': injectViewGuild}}},
  scouttower: {'-': {'-': {'-': injectScouttower}}},
  mailbox: {'-': {'-': {'-': guildMailbox}}},
  ranks: {'-': {'-': {'-': injectGuildRanks}}},
  conflicts: {rpupgrades: {'-': {'-': injectRPUpgrades}}},
  bank: {'-': {'-': {'-': injectGuildBank}}},
  hall: {
    '-': {'-': {'-': guildHall}},
    post: {'-': {'-': injectBioWidgets}}
  }
};
