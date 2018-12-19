import {theInv} from './buildInv';

export default function decorate() {
  if (theInv.folders) {
    theInv.folders['-1'] = 'Main';
  }
}
