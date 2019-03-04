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

function async(dfd, result) {dfd.resolve(result);}

function fromCache(cached) {
  var dfd = $.Deferred();
  add(3, async, [dfd, cached]);
  return dfd.promise();
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
