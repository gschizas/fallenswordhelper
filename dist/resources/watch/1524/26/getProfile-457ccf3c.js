import { c as cmdExport } from './cmdExport-d8c344d2.js';

const cache = {};

function profile(username) {
  // return cmdExport({player_username: username, subcmd: 'profile'});
  if (!cache[username]) {
    cache[username] = cmdExport({ player_username: username, subcmd: 'profile' });
  }
  return cache[username];
}

function getProfile(username) {
  return profile(username);
}

export { getProfile as g };
//# sourceMappingURL=getProfile-457ccf3c.js.map
