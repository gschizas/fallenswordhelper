import partial from '../../../common/partial';
import {theInv} from '../buildInv';

function userInvNotEquipped(row) {
  return row.folder_id && !row.equipped;
}

function guidInvNotEquipped(row) {
  return row.player_id && !row.equipped &&
    row.player_id === theInv.current_player_id;
}

var locations = [
  [
    function(row) {return row.player_id && row.player_id === -1;},
    function(row, act) {return 'takeItem" action="' + act.a;}
  ],
  [
    function(row) {
      return row.player_id && row.player_id !== theInv.current_player_id;
    },
    function(row, act) {
      return 'recallItem" playerid="' + row.player_id +
        '" mode="0" action="' + act.a;
    }
  ],
  [
    function(row) {return userInvNotEquipped(row) || guidInvNotEquipped(row);},
    function(row, act) {return act.c;}
  ]
];

function thisType(row, el) {return el[0](row);}

function wuRender(row, act) {
  var location = locations.find(partial(thisType, row));
  if (location) {
    return '<span class="fshLink ' + location[1](row, act) +
      '" invid="' + row.inv_id + '">' + act.b + '</span>';
  }
  return '';
}

export default function wearUseRender(data, _type, row) {
  //            0  1  2  3  4  5  6  7  8 9 10 11121314 15
  // eslint-disable-next-line no-sparse-arrays
  var action = [1, 1, 1, 1, 1, 1, 1, 1, 1, , 2, 2, , , , 2][data];
  if (action === 1) {
    return wuRender(row, {
      a: 'wear',
      b: 'Wear',
      c: 'wearItem'
    });
  } else if (action === 2) {
    return wuRender(row, {
      a: 'use',
      b: 'Use',
      c: 'useItem'
    });
  }
}
