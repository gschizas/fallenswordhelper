import * as ajax from '../support/ajax';

function guildTake(e) { // jQuery
  var self = $(e.target);
  ajax.guildMailboxTake(self.attr('href')).done(function(data) {
    if (data.r === 1) {return;}
    self.removeClass();
    self.closest('table').next().find('td')
      .html('<span class="fshGreen">Taken</span>');
  });
}

export default function guildMailbox() { // Bad jQuery
  var items = $('#pCC a');
  if (items.length === 0) {return;}
  items.wrap(function(i) {
    return '<span class="helperQC" href="' + $(items[i]).attr('href') +
      '"></span>';
  }).children().unwrap();
  $('#pCC').on('click', '.helperQC', guildTake);

  var takeItems = $('<div class="fshCenter"><span class="reportLink">' +
    'Take All</span></div>');
  $('#pCC td[height="25"]').append(takeItems);
  takeItems.click(function() {
    $('#pCC span.helperQC').click();
  });
}
