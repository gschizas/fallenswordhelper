import profile from '../_dataAccess/export/profile';

export default function getProfile(username) {
  return profile(username);
}
