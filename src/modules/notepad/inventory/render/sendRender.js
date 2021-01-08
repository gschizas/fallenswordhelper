function cantSend(row) {
  return row.equipped || (row.guild_tag === -1 && row.bound);
}

export default function sendRender(data, type, row) {
  if (cantSend(row)) { return; }
  if (type !== 'display') { return 'Send'; }
  return '<span class="sendItem tip-static sendLink" '
    + 'data-tipped="INSTANTLY SEND THE ITEM. NO REFUNDS OR DO-OVERS! '
    + `Use at own risk." data-inv="${row.inv_id}">Send</span>`;
}
