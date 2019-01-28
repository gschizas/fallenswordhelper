import populateBuffs from './populateBuffs';
import populateEnhancements from './populateEnhancements';

export default function getSustain(responseText) {
  populateEnhancements(responseText);
  populateBuffs(responseText);
}
