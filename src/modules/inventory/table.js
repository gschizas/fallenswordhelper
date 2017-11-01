import wearUseRender from './wearUseRender';
import {
  bpRender,
  craftRender,
  createdRow,
  dropRender,
  durabilityRender,
  gsRender,
  nameRender,
  sendRender,
  whereData,
  whereRender,
  whereRenderDisplay,
  whereRenderFilter
} from './render';
import {craftHash, itemType} from './assets';
import {showQuickDropLinks, showQuickSendLinks, theInv} from './inventory';

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
    columns: [
      {
        title: 'Name',
        data: 'item_name',
        render: nameRender
      },
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
      {
        title: 'Du%',
        data: 'durability',
        render: durabilityRender
      },
      {
        title: 'BP',
        data: whereData,
        render: bpRender
      },
      {
        title: 'GS',
        data: whereData,
        render: gsRender
      },
      {
        title: 'W/U',
        data: 'type',
        render: wearUseRender
      },
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
          if (tag === '-1') {return 'No';}
          return 'Yes';
        }
      },
      {
        title: 'Drop',
        data: 'type',
        render: dropRender
      },
      {
        title: 'Send',
        data: 'type',
        render: sendRender
      }
    ],
    createdRow: createdRow,
    stateSave: true,
    stateDuration: 0
  });
  table.column(12).visible('current_player_id' in theInv);
  table.column(17).visible('player_id' in theInv &&
    showQuickDropLinks);
  table.column(18).visible('player_id' in theInv &&
    showQuickSendLinks);
}
