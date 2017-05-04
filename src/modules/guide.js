import * as system from './support/system';

export function allowBack() { // Native
  document.querySelector('input[type="submit"]')
    .addEventListener('click', function(evt) {
      evt.preventDefault();
      var url = 'index.php?';
      Array.prototype.forEach.call(
        document.querySelectorAll('input:not([type="submit"])' +
          ':not([type="checkbox"]), select, input[type="checkbox"]:checked'),
        function(e) {url += '&' + e.name + '=' + e.value;});
      window.location = url;
    });
}

export function showAllQuestSteps() { // Native
  if (!system.getValue('showNextQuestSteps')) {return;}
  Array.prototype.forEach.call(document.querySelectorAll('div[id^="stage"]'),
    function(e) {e.style.display = 'block';});
  document.getElementById('next_stage_button').style.display = 'none';
}
