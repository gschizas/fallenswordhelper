import buffList from '../../support/buffObj';
import getValue from '../../system/getValue';

export var buffCustom = {
  header: 'Buff',
  what: 'buff',
  control: function() {
    var ret = '<select style="width:140px;" id="selectedBuff">';
    for (var j = 0; j < buffList.length; j += 1) {
      ret += '<option value="' + buffList[j].id + '">' +
        buffList[j].name + '</option>';
    }
    ret += '</select>';
    return ret;
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
