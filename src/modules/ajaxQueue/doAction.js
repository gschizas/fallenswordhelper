import partial from '../common/partial';

function itemStatus(data) {return data;}

export default function doAction(fn, item, data) {
  return fn(item).then(partial(itemStatus, data));
}
