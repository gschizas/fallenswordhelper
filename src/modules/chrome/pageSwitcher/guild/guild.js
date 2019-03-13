import advisor from './advisor';
import groups from './groups';
import guildMailbox from '../../../mailbox/guildMailbox';
import hall from './hall';
import injectBioWidgets from '../../../profile/bio/bioWidgets';
import injectGuild from '../../../guild/guild';
import injectGuildBank from '../../../bank/injectGuildBank';
import injectGuildRanks from '../../../guild/ranks/rank';
import injectRPUpgrades from '../../../guild/injectRPUpgrades';
import injectScouttower from '../../../guild/scoutTower/injectScouttower';
import inventory from './inventory';
import {guildChat, guildLog} from '../../../logs/logs';

export default {
  inventory: inventory,
  chat: {'-': guildChat},
  dochat: {'-': guildChat},
  log: {'-': guildLog},
  groups: groups,
  manage: {'-': injectGuild},
  advisor: advisor,
  history: {'-': injectBioWidgets},
  view: {'-': injectGuild},
  scouttower: {'-': injectScouttower},
  mailbox: {'-': guildMailbox},
  ranks: {'-': injectGuildRanks},
  conflicts: {rpupgrades: injectRPUpgrades},
  bank: {'-': injectGuildBank},
  hall: hall
};
