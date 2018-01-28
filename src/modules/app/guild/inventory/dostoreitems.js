import callApp from '../../callApp';
import errorDialog from '../../errorDialog';

export default function dostoreitems(invIdAry) {
  return callApp({
    cmd: 'guild',
    subcmd: 'inventory',
    subcmd2: 'dostoreitems',
    storeIndex: invIdAry
  }).pipe(errorDialog);
}
