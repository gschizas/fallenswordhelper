import add from '../../../support/task';
import badData from '../badData';
import fetchdata from '../../../ajax/fetchdata';
import partial from '../../../common/partial';

var creatureCache = [];

function cacheResult(json) {
  if (!badData(json)) {
    creatureCache.push(json);
  }
  return json;
}

function thisMob(id, el) {
  return id === Number(el.response.data.id);
}

function nextTick(resolve, cached) {resolve(cached);}

function fromCache(cached) {
  return new Promise(function(resolve) {
    add(3, nextTick, [resolve, cached]);
  });
}

export default function getCreatureStats(id, passback) {
  var cached = creatureCache.find(partial(thisMob, id));
  if (cached) {
    return fromCache(cached);
  }
  return fetchdata({
    a: 1,
    id: id,
    passback: passback
  }).then(cacheResult);
}
