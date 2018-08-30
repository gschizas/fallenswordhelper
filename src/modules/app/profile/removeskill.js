import profile from './profile';

export default function removeskill(buffId) {
  return profile({
    subcmd: 'removeskill',
    skill_id: buffId
  });
}
