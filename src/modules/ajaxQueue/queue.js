import partial from '../common/partial';
import pipeRecallToQueue from './pipeRecallToQueue';
import pipeTakeToQueue from './pipeTakeToQueue';

var deferred = window.jQuery && jQuery.when();

export function queueTakeItem(invId, action) {
  // You have to chain them because they could be modifying the backpack
  deferred = deferred.pipe(partial(pipeTakeToQueue, invId, action));
  return deferred;
}

export function queueRecallItem(invId, playerId, mode, action) {
  // You have to chain them because they could be modifying the backpack
  deferred = deferred.pipe(partial(pipeRecallToQueue,
    invId, playerId, mode, action));
  return deferred;
}
