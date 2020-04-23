import advisor from './advisor';
import groups from './groups';
import hall from './hall';
import inventory from './inventory';
import runDefault from '../../../common/runDefault';
import { injectBioWidgets, injectGuild } from '../loader';

const guildChat = () => { runDefault(import('../../../logs/guildChat')); };
const guildLog = () => { runDefault(import('../../../logs/guildLog')); };
const guildMailbox = () => {
  runDefault(import('../../../mailbox/guildMailbox'));
};
const injectGuildBank = () => {
  runDefault(import('../../../bank/injectGuildBank'));
};
const injectGuildRanks = () => {
  runDefault(import('../../../guild/ranks/rank'));
};
const injectRPUpgrades = () => {
  runDefault(import('../../../guild/injectRPUpgrades'));
};
const injectScouttower = () => {
  runDefault(import('../../../guild/scoutTower/injectScouttower'));
};

export default {
  inventory,
  chat: { '-': guildChat },
  dochat: { '-': guildChat },
  log: { '-': guildLog },
  groups,
  manage: { '-': injectGuild },
  advisor,
  history: { '-': injectBioWidgets },
  view: { '-': injectGuild },
  scouttower: { '-': injectScouttower },
  mailbox: { '-': guildMailbox },
  ranks: { '-': injectGuildRanks },
  conflicts: { rpupgrades: injectRPUpgrades },
  bank: { '-': injectGuildBank },
  hall,
};
