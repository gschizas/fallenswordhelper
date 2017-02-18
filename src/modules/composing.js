import calf from './support/calf';
import * as common from './support/common';
import * as settingsPage from './settings/settingsPage';
import * as system from './support/system';
import * as task from './support/task';

var composeMsg =
  '<li class="notification"><a href="index.php?cmd=composing"><span' +
  ' class="notification-icon"></span><p class="notification-content">' +
  'Composing to do</p></a></li>';

function displayComposeMsg() { // Native
  document.getElementById('notifications')
    .insertAdjacentHTML('afterbegin', composeMsg);
}

function parseComposing(data) { // Native
  var doc;
  if (calf.cmd !== 'composing') {
    doc = system.createDocument(data);
  } else {
    doc = document;
  }
  var timeRE = /ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/;
  var times = [];
  var openSlots = doc.getElementsByClassName('composing-potion-time');
  Array.prototype.forEach.call(openSlots, function(el) {
    if (el.textContent === 'ETA: Ready to Collect!' ||
        el.textContent === 'ETA: n/a') {
      times.push(0);
    } else {
      var timeArr = timeRE.exec(el.textContent);
      var milli = (timeArr[1] * 3600 + timeArr[2] * 60 + timeArr[3] * 1) *
        1000 + Date.now();
      times.push(milli);
    }
  });
  var eta = Math.min.apply(null, times);
  if (eta === 0) {
    if (calf.cmd !== 'composing') {displayComposeMsg();}
    system.setValue('needToCompose', true);
  } else {
    system.setValue('needToCompose', false);
    system.setValue('lastComposeCheck', eta);
  }
}

function createPotion(temp) { // jQuery
  $.ajax({
    cache: false,
    dataType: 'json',
    url:'index.php',
    data: {
      cmd: 'composing',
      subcmd: 'createajax',
      template_id: temp.value,
      _rnd: Math.floor(Math.random() * 8999999998) + 1000000000
    }
  }).done(function potionDone(data, textStatus) {
    if (data.error !== '') {
      temp.parentNode.innerHTML = '<div style="height: 26px;">' +
        data.error + '</div>';
    } else {
      temp.parentNode.innerHTML = '<div style="height: 26px;">' +
        textStatus + '</div>';
    }
  });
}

function quickCreate(evt) { // Native
  var target = evt.target;
  if (target.tagName !== 'SPAN' ||
      target.className !== 'quickCreate') {return;}
  var temp = target.previousElementSibling.previousElementSibling;
  if (temp && temp.value !== 'none') {
    createPotion(temp);
  }
}

export function injectComposeAlert() { // jQuery
  if (calf.cmd === 'composing') {return;}
  var needToCompose = system.getValue('needToCompose');
  if (needToCompose) {
    displayComposeMsg();
    return;
  }
  var lastComposeCheck = system.getValue('lastComposeCheck');
  if (lastComposeCheck && Date.now() < lastComposeCheck) {return;}
  $.get('index.php?cmd=composing', function(data) {
    task.add(3, parseComposing, [data]);
  });
}

export function injectComposing() { // Native
  var pCC = document.getElementById('pCC');
  if (!pCC) {return;}
  if (calf.enableComposingAlert) {
    parseComposing();}

  var buttons = pCC.querySelectorAll('input[id^=create-]:not(#create-multi)');
  Array.prototype.forEach.call(buttons, function(el) {
    el.insertAdjacentHTML('afterend',
      '&nbsp;[<span class="quickCreate">Quick Create</span>]');
  });
  pCC.addEventListener('click', quickCreate);

  if (system.getValue('moveComposingButtons')) {
    var buttonDiv = document.getElementById('composing-error-dialog')
      .previousElementSibling;
    buttonDiv.setAttribute('style', 'text-align: right; padding: 0 38px 0 0');
    var top = pCC.getElementsByClassName('composing-level')[0].parentNode;
    top.insertAdjacentElement('beforebegin', buttonDiv);
  }
}

export function composingCreate() { // Native
  document.getElementById('composing-add-skill')
    .addEventListener('click', function() {
      document.getElementById('composing-skill-level-input').value =
        document.getElementById('composing-skill-level-max').textContent;
    });
  document.getElementById('composing-skill-select')
    .addEventListener('change', function() {
      document.getElementById('composing-skill-level-input').value =
        document.getElementById('composing-skill-level-max').textContent;
    });
}

var disableBreakdownPrompts;
var selectedList = [];

function showComposingMessage(message, bgcolor) { // jQuery
  $('#composingMessageContainer').remove();

  $('#composingMessage')
    .append(
      $('<div/>', {
        'id': 'composingMessageContainer',
        'width': '100%'
      })
      .append(
        $('<div/>', {
          'id': 'composingMessageText'
        })
        .css({
          'width': '90%',
          'text-align': 'center',
          'background-color': bgcolor,
          'color': 'rgb(255, 255, 255)',
          'margin': '5px auto 5px auto',
          'padding': '2px'
        })
        .html(message)
      )
    );

  setTimeout(function() {
    $('#composingMessageContainer').animate({'opacity': 0}, 500, function() {
      $(this).animate({'height': 0}, 500, function() {$(this).hide();});
    });
  }, 5000);
}

function breakItems() { // jQuery.min
  return $.ajax({
    type: 'POST',
    url: 'index.php?cmd=composing&subcmd=dobreakdown',
    data: {'item_list[]': selectedList},
    dataType: 'json'
  }).done(function(response) {
      if (response.error === 0) {
        window.location = 'index.php?cmd=composing&subcmd=breakdown&m=1';
        return;
      } else {
        showComposingMessage('Error: ' + response.msg, 'rgb(164, 28, 28)');
      }
    });
}

function breakEvt(evt) { // Native
  if (!disableBreakdownPrompts ||
      evt.target.id !== 'breakdown-selected-items') {return;}
  evt.stopPropagation();
  if (selectedList.length === 0) {
    showComposingMessage('Error: No items selected.', 'rgb(164, 28, 28)');
    return;
  }
  breakItems();
}

function itemClick(evt) { // Native
  if (!evt.target.classList.contains('selectable-item')) {return;}
  var myItem = evt.target.id.replace('composing-item-', '');
  var itemPos = selectedList.indexOf(myItem);
  if (itemPos === -1) {
    selectedList.push(myItem);
  } else {
    selectedList.splice(itemPos, 1);
  }
}

function togglePref() { // Native
  disableBreakdownPrompts = !disableBreakdownPrompts;
  system.setValue('disableBreakdownPrompts', disableBreakdownPrompts);
}

export function composingBreakdown() { // Native
  common.perfFilter('composing');
  disableBreakdownPrompts = system.getValue('disableBreakdownPrompts');
  document.getElementById('breakdown-selected-items').parentNode
    .addEventListener('click', breakEvt, true);
  document.getElementById('composing-items')
    .addEventListener('click', itemClick);
  document.getElementById('pCC').insertAdjacentHTML('beforeend',
    '<table class="fshTblCenter"><tbody>' +
    settingsPage.simpleCheckbox('disableBreakdownPrompts') +
    '</tbody></table>');
  document.getElementById('disableBreakdownPrompts')
    .addEventListener('click', togglePref);
}
