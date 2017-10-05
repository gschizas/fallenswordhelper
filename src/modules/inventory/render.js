import calf from '../support/calf';
import * as assets from './assets';
import * as dataObj from '../support/dataObj';
import * as inventory from './inventory';
import * as system from '../support/system';

function getT(player_id) {
  if (player_id === -1) {return 4;}
  return 1;
}

function player(invPlayer, rowPlayer, guild) {
  if (invPlayer) {return invPlayer;}
  if (rowPlayer !== -1) {return rowPlayer;}
  return guild;
}

function nameRenderDisplay(data, row) {
  var cur = system.fallback(inventory.theInv.player_id,
    inventory.theInv.current_player_id);
  var t = getT(row.player_id);
  var p = player(inventory.theInv.player_id, row.player_id,
    inventory.theInv.guild_id);

  var bold = data;
  if (row.equipped) {bold = '<b>' + data + '</b>';}

  var _setName = '';
  if (row.stats && row.stats.set_name !== '') {
    _setName = ' (<span class="fshLink setName" set="' + row.stats.set_name +
      '">set</span>)';
  }

  return '<a href="index.php?cmd=auctionhouse&search_text=' + data +
    '" class="fshInvItem tip-dynamic ' +
    dataObj.rarity[row.rarity].clas + '" ' +
    'data-tipped="fetchitem.php?item_id=' + row.item_id +
    '&inv_id=' + row.inv_id + '&t=' + t + '&p=' + p +
    '&currentPlayerId=' + cur + '">' +
    bold + '</a>' + _setName;
}

export function nameRender(data, type, row) {
  if (type !== 'display') {return data;}
  return nameRenderDisplay(data, row);
}

export function whereData(row) {
  return system.fallback(row.folder_id, row.player_id);
}

function whereRenderUserFolder(row) {
  if (row.equipped) {return -2;}
  return parseInt(row.folder_id, 10);
}

function playerName(f) {
  if (!calf.membrList[f]) {return '???';}
  return calf.membrList[f].username;
}

export function whereRender(data, type, row) {
  if (row.folder_id) {
    return whereRenderUserFolder(row);
  }
  if (row.player_id === -1) {return '~';}
  return playerName(row.player_id);
}

function whereRenderGuildDisplay(row) {
  if (row.player_id === -1) {return 'GS';}
  return '<a class="fshMaroon" href="index.php?cmd=profile&player_id=' +
    row.player_id + '">' + playerName(row.player_id) + '</a>';
}

export function whereRenderDisplay(data, type, row) {
  if (row.player_id) {
    return whereRenderGuildDisplay(row);
  }
  if (row.equipped) {return 'Worn';}
  var folderSelect = '<select class="fshMoveItem" data-inv="' + row.inv_id +
    '">';
  var keysArray = Object.keys(inventory.theInv.folders)
    .sort(function(a, b) {return a - b;});
  keysArray.forEach(function(value) {
    folderSelect += '<option value="' + value + '"' +
      system.isSelected(value, row.folder_id) + '>' +
      inventory.theInv.folders[value] + '</option>';
  });
  folderSelect += '</select>';
  return folderSelect;
}

function whereRenderGuildFilter(row) {
  if (row.player_id === -1) {return 'GS';}
  return playerName(row.player_id);
}

export function whereRenderFilter(data, type, row) {
  if (row.player_id) {
    return whereRenderGuildFilter(row);
  }
  if (row.equipped) {return 'Worn';}
  return inventory.theInv.folders[row.folder_id];
}

export function craftRender(craft) {
  if (assets.craftHash[craft]) {return assets.craftHash[craft].abbr;}
  return '';
}

export function durabilityRender(data, type, row) {
  if (parseInt(row.max_durability, 10) > 0) {
    return Math.ceil(row.durability / row.max_durability * 100);
  }
}

function bpDisplayType(type, row) {
  if (type !== 'display') {return 'BP';}
  if (row.player_id === -1) {
    return '<span class="fshLink takeItem" invid="' + row.inv_id +
      '" action="take">BP</span>';
  }
  return '<span class="fshLink recallItem" invid="' + row.inv_id +
    '" playerid="' + row.player_id +
    '" mode="0" action="recall">BP</span>';
}

export function bpRender(where, type, row) {
  if (row.folder_id || row.player_id ===
    inventory.theInv.current_player_id) {return;}
  return bpDisplayType(type, row);
}

function gsDisplayType(_data, type, row) {
  if (type === 'display') {
    return '<span class="fshLink recallItem" invid="' +
    row.inv_id + '" playerid="' +
    system.fallback(row.player_id, inventory.theInv.player_id) +
    '" mode="1" action="recall">GS</span>';
  }
  return 'GS';
}

export function gsRender(_data, type, row) {
  if (row.player_id && row.player_id !== -1 ||
      row.folder_id && row.guild_tag !== '-1') {
    return gsDisplayType(_data, type, row);
  }
}

var actionTypes = [
  {
    test: function(row) {return row.player_id && row.player_id === -1;},
    wearAction: function(row) {
      return 'takeItem" invid="' + row.inv_id + '" action="wear';
    },
    useAction: function(row) {
      return 'takeItem" invid="' + row.inv_id + '" action="use';
    }
  },
  {
    test: function(row) {
      return row.player_id &&
        row.player_id !== inventory.theInv.current_player_id;
    },
    wearAction: function(row) {
      return 'recallItem" invid="' + row.inv_id +
        '" playerid="' + row.player_id + '" mode="0" action="wear';
    },
    useAction: function(row) {
      return 'recallItem" invid="' + row.inv_id +
        '" playerid="' + row.player_id + '" mode="0" action="use';
    }
  },
  {
    test: function(row) {
      return row.folder_id && !row.equipped ||
        row.player_id && !row.equipped &&
        row.player_id === inventory.theInv.current_player_id;
    },
    wearAction: function(row) {return 'wearItem" invid="' + row.inv_id;},
    useAction: function(row) {return 'useItem" invid="' + row.inv_id;}
  }
];

function wearRender(row) {
  for (var i = 0; i < actionTypes.length; i += 1) {
    if (actionTypes[i].test(row)) {
      return '<span class="fshLink ' + actionTypes[i].wearAction(row) +
        '">Wear</span>';
    }
  }
  return '';
}

function useRender(row) {
  for (var i = 0; i < actionTypes.length; i += 1) {
    if (actionTypes[i].test(row)) {
      return '<span class="fshLink ' + actionTypes[i].useAction(row) +
        '">Use</span>';
    }
  }
  return '';
}

export function wuRender(data, _type, row) {
  var action = {
    '0': 'Wear',
    '1': 'Wear',
    '2': 'Wear',
    '3': 'Wear',
    '4': 'Wear',
    '5': 'Wear',
    '6': 'Wear',
    '7': 'Wear',
    '8': 'Wear',
    '10': 'Use',
    '11': 'Use',
    '15': 'Use'
  }[data];
  if (action === 'Wear') {
    action = wearRender(row);
  } else if (action === 'Use') {
    action = useRender(row);
  }
  return action;
}

export function dropRender(data, type, row) {
  if (system.fallback(row.guild_tag !== '-1', row.equipped)) {return;}
  if (type !== 'display') {return 'Drop';}
  return '<span class="dropItem tip-static dropLink" data-tipped=' +
    '"INSTANTLY DESTROY THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
    ' data-inv="' + row.inv_id + '">Drop</span>';
}

export function sendRender(data, type, row) {
  if (system.fallback(row.bound, row.equipped)) {return;}
  if (type !== 'display') {return 'Send';}
  return '<span class="sendItem tip-static sendLink" data-tipped=' +
    '"INSTANTLY SEND THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
    ' data-inv="' + row.inv_id + '">Send</span>';
}

function selfRowColor(data) {
  if (data.equipped) {return 'fshGreen';}
  return 'fshNavy';
}

function guildRowColor(data) {
  if (data.player_id === -1) {return 'fshNavy';}
  return 'fshMaroon';
}

function getRowColor(data) {
  if (data.folder_id) {return selfRowColor(data);}
  return guildRowColor(data);
}

export function createdRow(row, data) {
  var colour = getRowColor(data);
  row.classList.add(colour);
}
