import {thisTournament} from './thisTournament';

export default function findArena(r) {
  const tourney = thisTournament();
  return r.arenas.find(e => e.id === tourney);
}
