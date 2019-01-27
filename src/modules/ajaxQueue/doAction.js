import partial from '../common/partial';

function itemStatus(data) {return data;}

export default function doAction(fn, item, data) {
  return fn(item).pipe(partial(itemStatus, data));
}
