import {theInv} from '../options';

function userInvNotEquipped(row) {
  return row.folder_id && !row.equipped;
}

function guidInvNotEquipped(row) {
  return row.player_id && !row.equipped &&
    row.player_id === theInv.current_player_id;
}

var locations = [
  {
    test: function(row) {return row.player_id && row.player_id === -1;},
    res: function(row, act) {
      return 'takeItem" action="' + act.a;
    }
  },
  {
    test: function(row) {
      return row.player_id &&
        row.player_id !== theInv.current_player_id;
    },
    res: function(row, act) {
      return 'recallItem" playerid="' + row.player_id +
        '" mode="0" action="' + act.a;
    }
  },
  {
    test: function(row) {
      return userInvNotEquipped(row) || guidInvNotEquipped(row);
    },
    res: function(row, act) {return act.c;}
  }
];

function wuRender(row, act) {
  for (var i = 0; i < locations.length; i += 1) {
    if (locations[i].test(row)) {
      return '<span class="fshLink ' + locations[i].res(row, act) +
        '" invid="' + row.inv_id + '">' + act.b + '</span>';
    }
  }
  return '';
}

export default function wearUseRender(data, _type, row) {
  //            0  1  2  3  4  5  6  7  8 9 10 11121314 15
  // eslint-disable-next-line no-sparse-arrays
  var action = [1, 1, 1, 1, 1, 1, 1, 1, 1, , 2, 2, , , , 2][data]; // jshint ignore:line
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
