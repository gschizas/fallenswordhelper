import {fallback} from '../../support/system';

export default function sendRender(data, type, row) {
  if (fallback(row.bound, row.equipped)) {return;}
  if (type !== 'display') {return 'Send';}
  return '<span class="sendItem tip-static sendLink" data-tipped=' +
    '"INSTANTLY SEND THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
    ' data-inv="' + row.inv_id + '">Send</span>';
}
