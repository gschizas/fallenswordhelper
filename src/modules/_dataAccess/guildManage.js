import currentGuildId from '../common/currentGuildId';
import guildView from './guildView';

// Incomplete
export default function guildManage() {
  const guildId = currentGuildId();
  if (guildId) {
    return guildView(currentGuildId());
  }
  return Promise.reject(new Error('no guild id'));
}
