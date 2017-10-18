import add from '../support/task';
import calf from '../support/calf';
import {now} from '../support/dataObj';
import retryAjax from '../ajax/retryAjax';
import * as layout from '../support/layout';
import * as system from '../support/system';

var composeMsg =
  '<li class="notification"><a href="index.php?cmd=composing"><span' +
  ' class="notification-icon"></span><p class="notification-content">' +
  'Composing to do</p></a></li>';

function displayComposeMsg() {
  document.getElementById('notifications')
    .insertAdjacentHTML('afterbegin', composeMsg);
}

function getDoc(data) {
  if (calf.cmd !== 'composing') {
    return system.createDocument(data);
  }
  return document;
}

function parseComposing(data) {
  var doc = getDoc(data);
  var timeRE = /ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/;
  var times = [];
  var openSlots = doc.getElementsByClassName('composing-potion-time');
  Array.prototype.forEach.call(openSlots, function(el) {
    if (el.textContent === 'ETA: Ready to Collect!' ||
        el.textContent === 'ETA: n/a') {
      times.push(0);
    } else {
      var timeArr = timeRE.exec(el.textContent);
      var milli = (timeArr[1] * 3600 + timeArr[2] * 60 + Number(timeArr[3])) *
        1000 + now;
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

function createSuccess(temp, textStatus) {
  var potName = temp[temp.selectedIndex].text;
  var myParent = temp.parentNode;
  var infoDiv = myParent.previousElementSibling.previousElementSibling;
  infoDiv.children[0].innerHTML = '';
  infoDiv.children[0].classList.add('fshPot');
  infoDiv.children[0].style.backgroundImage = 'url(' + system.imageServer +
    '/composing/potions/' + system.getRandomInt(1, 11) + '_' +
    system.getRandomInt(1, 51) + '.gif)';
  infoDiv.children[2].innerHTML = 'Creating \'<span class="fshBold">' +
    potName + '</span>\' Potion';
  infoDiv.children[3].innerHTML = '';
  myParent.innerHTML = '<div class="fshScs">' + textStatus + '</div>';
}

function createPotion(temp) { // jQuery
  retryAjax({
    cache: false,
    dataType: 'json',
    url: 'index.php',
    data: {
      cmd: 'composing',
      subcmd: 'createajax',
      template_id: temp.value,
      _rnd: system.rnd()
    }
  }).done(function potionDone(data, textStatus) {
    if (data.error !== '') {
      temp.parentNode.innerHTML = '<div class="fshScs">' +
        data.error + '</div>';
    } else {
      createSuccess(temp, textStatus);
    }
  });
}

function quickCreateBailOut(target) {
  return target.tagName !== 'SPAN' || target.className !== 'quickCreate';
}

function quickCreate(evt) {
  var target = evt.target;
  if (quickCreateBailOut(target)) {return;}
  var temp = target.previousElementSibling.previousElementSibling;
  if (temp && temp.value !== 'none') {
    createPotion(temp);
  }
}

function checkLastCompose() { // jQuery
  var lastComposeCheck = system.getValue('lastComposeCheck');
  if (lastComposeCheck && now < lastComposeCheck) {return;}
  retryAjax('index.php?cmd=composing').done(function(data) {
    add(3, parseComposing, [data]);
  });
}

function composeAlert() {
  var needToCompose = system.getValue('needToCompose');
  if (needToCompose) {
    displayComposeMsg();
    return;
  }
  checkLastCompose();
}

export function injectComposeAlert() {
  if (calf.cmd !== 'composing') {composeAlert();}
}

function moveButtons() {
  if (system.getValue('moveComposingButtons')) {
    var buttonDiv = document.getElementById('composing-error-dialog')
      .previousElementSibling;
    buttonDiv.setAttribute('style', 'text-align: right; padding: 0 38px 0 0');
    var top = layout.pCC.getElementsByClassName('composing-level')[0]
      .parentNode;
    top.insertAdjacentElement('beforebegin', buttonDiv);
  }
}

export function injectComposing() {
  if (!layout.pCC) {return;}
  if (calf.enableComposingAlert) {
    parseComposing();
  }

  var buttons = layout.pCC
    .querySelectorAll('input[id^=create-]:not(#create-multi)');
  Array.prototype.forEach.call(buttons, function(el) {
    el.insertAdjacentHTML('afterend',
      '&nbsp;[<span class="quickCreate">Quick Create</span>]');
  });
  layout.pCC.addEventListener('click', quickCreate);
  moveButtons();
}

export function composingCreate() {
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
