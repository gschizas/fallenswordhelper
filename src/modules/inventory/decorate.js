import {theInv} from './options';

export default function decorate() {
  if (theInv.folders) {
    theInv.folders['-1'] = 'Main';
  }
  // Hide composed potions until Zorg fixes the feed
  theInv.items =
    theInv.items.filter(function(obj) {
      return obj.type !== 15;
    });
  //
}
