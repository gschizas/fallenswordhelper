import getArrayByTagName from '../../common/getArrayByTagName';
import getTextTrim from '../../common/getTextTrim';
import includes from '../../common/includes';
import {pCC} from '../../support/layout';

const thisTournament = () => Number(getTextTrim(getArrayByTagName('b', pCC)
  .find(includes('Tournament #'))).match(/\d+/)[0]);

export default function findArena(r) {
  const tourney = thisTournament();
  return r.arenas.find(e => e.id === tourney);
}
