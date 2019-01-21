import classPair from './classPair';
import handleEvent from './handleEvent';
import partial from './partial';

export default function classHandler(evtAry) {
  return partial(handleEvent, classPair, evtAry);
}
