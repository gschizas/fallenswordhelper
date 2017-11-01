import add from '../../support/task';
import {initTable} from './trackerTable';
import jsonParse from '../../common/jsonParse';
import setForage from '../../ajax/setForage';
import {
  createBr,
  createButton,
  createDiv,
  createTextArea,
} from '../../common/cElement';

var ioText;
var saveBtn;
var resetBtn;
var io;

function drawRawData(trackerData) {
  ioText.value = trackerData;
  io.classList.remove('fshSpinner');
}

export function queueRawData(trackerData) {
  io.className = 'fshSpinner fshSpinner64';
  add(4, drawRawData, [trackerData]);
}

function doReset() {
  ioText.value = '{"lastUpdate": 0, "members": {}}';
}

function doSave() {
  var newData = jsonParse(ioText.value);
  setForage('fsh_guildActivity', newData)
    .done(function() {
      $('#dialog_msg').text('Update successful').dialog('open');
      initTable(newData.members);
    })
    .fail(function(err) {
      $('#dialog_msg').text(err).dialog('open');
    });
}

function customButton(text, fn) {
  var btn = createButton({
    className: 'custombutton',
    textContent: text
  });
  btn.addEventListener('click', fn);
  return btn;
}

export function makeInOut() {
  io = createDiv({id: 'io'});
  ioText = createTextArea();
  ioText.setAttribute('autocapitalize', 'off');
  ioText.setAttribute('autocomplete', 'off');
  ioText.setAttribute('autocorrect', 'off');
  ioText.setAttribute('spellcheck', 'false');
  saveBtn = customButton('Save', doSave);
  resetBtn = customButton('Reset', doReset);
  io.appendChild(ioText);
  io.appendChild(createBr());
  io.appendChild(saveBtn);
  io.appendChild(resetBtn);
  return io;
}
