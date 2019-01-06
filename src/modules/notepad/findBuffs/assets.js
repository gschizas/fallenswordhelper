import buffList from '../../support/buffObj';
import getValue from '../../system/getValue';

function makeOptions(el) {
  return '<option value="' + el.id + '">' + el.name + '</option>';
}

export var buffCustom = {
  header: 'Buff',
  what: 'buff',
  control: function() {
    return '<select style="width:140px;" id="selectedBuff">' +
      buffList.map(makeOptions).join('') + '</select>';
  },
  cutoff: '175 buff',
  searched: 'Nicknames of buff searched',
  potential: 'buff',
  processed: 'Buff',
  progress: 'buffers'
};
export var otherCustom = {
  header: 'Other',
  what: 'text',
  control: function() {
    var textToSearchFor = getValue('textToSearchFor') || '';
    return '<input style="width:140px;" class="custominput" ' +
      'id="textToSearchFor" type="text" title="Text to search for" value="' +
      textToSearchFor + '">';
  },
  cutoff: '500+ play',
  searched: 'Text searched for',
  potential: 'play',
  processed: 'Play',
  progress: 'Other'
};
