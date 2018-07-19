import bpRender from './render/bpRender';
import craftRender from './render/craftRender';
import createdRow from './render/createdRow';
import dropRender from './render/dropRender';
import durabilityRender from './render/durabilityRender';
import gsRender from './render/gsRender';
import nameRender from './render/nameRender';
import sendRender from './render/sendRender';
import wearUseRender from './render/wearUseRender';
import whereData from './render/whereData';
import whereRender from './render/whereRender';
import whereRenderDisplay from './render/whereRenderDisplay';
import whereRenderFilter from './render/whereRenderFilter';
import {craftHash, itemType} from './assets';
import {showQuickDropLinks, showQuickSendLinks, theInv} from './options';

var tblCols = [
  {title: 'Name', data: 'item_name', render: nameRender},
  {title: 'Level', data: 'stats.min_level'},
  {
    title: 'Where',
    data: whereData,
    render: {
      _: whereRender,
      display: whereRenderDisplay,
      filter: whereRenderFilter
    }
  },
  {
    title: 'Type',
    data: 'type',
    render: function(type) {return itemType[type];}
  },
  {title: 'Att', data: 'stats.attack'},
  {title: 'Def', data: 'stats.defense'},
  {title: 'Arm', data: 'stats.armor'},
  {title: 'Dam', data: 'stats.damage'},
  {title: 'HP', data: 'stats.hp'},
  {title: 'Frg', data: 'forge'},
  {
    title: 'Craft',
    data: 'craft',
    render: {
      _: function(craft) {
        if (craftHash[craft]) {
          return craftHash[craft].index;
        }
        return 0;
      },
      display: craftRender,
      filter: craftRender
    }
  },
  {title: 'Du%', data: 'durability', render: durabilityRender},
  {title: 'BP', data: whereData, render: bpRender},
  {title: 'GS', data: whereData, render: gsRender},
  {title: 'W/U', data: 'type', render: wearUseRender},
  {
    title: 'setName',
    data: 'stats.set_name',
    orderable: false,
    visible: false
  },
  {
    title: 'Tag',
    data: 'guild_tag',
    render: function(tag) {
      if (tag === -1) {return 'No';}
      return 'Yes';
    }
  },
  {title: 'Drop', data: 'type', render: dropRender},
  {title: 'Send', data: 'type', render: sendRender}
];

function isUserInv() {
  // return 'player_id' in theInv; // Rollup is spazzing
  return Boolean(theInv.player_id);
}

export default function doTable() { // jQuery
  $('#pCC').append('<table id="fshInv" class="hover" ' +
    'style="font-size: x-small;"></table>');
  var table = $('#fshInv').DataTable({
    data: theInv.items,
    autoWidth: false,
    pageLength: 50,
    lengthMenu: [[50, 100, 150, 200, -1], [50, 100, 150, 200, 'All']],
    columnDefs: [{targets: '_all', defaultContent: ''},
      {
        targets: [1, 4, 5, 6, 7, 8, 9, 10, 12, 13],
        orderSequence: ['desc', 'asc']
      }],
    columns: tblCols,
    createdRow: createdRow,
    stateSave: true,
    stateDuration: 0
  });
  table.column(12).visible('current_player_id' in theInv);
  table.column(17).visible(isUserInv() && showQuickDropLinks);
  table.column(18).visible(isUserInv() && showQuickSendLinks);
}
