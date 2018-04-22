import guildGroups from './guildGroups';

export default function groupsViewStats(groupId) {
  return guildGroups({subcmd2: 'viewstats', group_id: groupId});
}
