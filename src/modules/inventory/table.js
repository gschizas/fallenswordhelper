import * as assets from './assets';
import * as inventory from './inventory';

export function doTable() { // jQuery
  $('#pCC').append('<table id="fshInv" class="hover" ' +
    'style="font-size: x-small;"></table>');
  var table = $('#fshInv').DataTable({
    data: inventory.theInv.items,
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
        render: inventory.nameRender
      },
      {title: 'Level', data: 'stats.min_level'},
      {
        title: 'Where',
        data: inventory.whereData,
        render: {
          _: inventory.whereRender,
          display: inventory.whereRenderDisplay,
          filter: inventory.whereRenderFilter
        }
      },
      {
        title: 'Type',
        data: 'type',
        render: function(type) {return assets.itemType[type];}
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
            return assets.craftHash[craft] ? assets.craftHash[craft].index : 0;
          },
          display: inventory.craftRender,
          filter: inventory.craftRender
        }
      },
      {
        title: 'Du%',
        data: 'durability',
        render: inventory.durabilityRender
      },
      {
        title: 'BP',
        data: inventory.whereData,
        render: inventory.bpRender
      },
      {
        title: 'GS',
        data: inventory.whereData,
        render: inventory.gsRender
      },
      {
        title: 'W/U',
        data: 'type',
        render: inventory.wuRender
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
          return tag === '-1' ? 'No' : 'Yes';
        }
      },
      {
        title: 'Drop',
        data: 'type',
        render: inventory.dropRender
      },
      {
        title: 'Send',
        data: 'type',
        render: inventory.sendRender
      }
    ],
    createdRow: inventory.createdRow,
    stateSave: true,
    stateDuration: 0
  });
  table.column(12).visible('current_player_id' in inventory.theInv);
  table.column(17).visible('player_id' in inventory.theInv &&
    inventory.showQuickDropLinks);
  table.column(18).visible('player_id' in inventory.theInv &&
    inventory.showQuickSendLinks);
}
