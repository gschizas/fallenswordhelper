import {getElementById} from '../common/getElement';
import {
  fallback,
  getValue,
  getValueJSON,
  setValueJSON
} from '../support/system';

var enterForSendMessage;
var fshTemplate;
var sendMessage;

function showMsgTemplate() { // jQuery
  var targetPlayer = $('#quickMsgDialog_targetUsername').text();
  $('#msgTemplateDialog').remove();

  // template displayed
  var html = '<div id=msgTemplateDialog title="Choose Msg Template" ' +
    'style="display:none"><style>#msgTemplate .ui-selecting { ' +
    'background: #FECA40; };</style><ol id=msgTemplate valign=center>';
  for (var i = 0; i < fshTemplate.length; i += 1) {
    html += '<li class="ui-widget-content">' +
      fshTemplate[i].replace(/\{playername\}/g, targetPlayer) + '</li>';
  }
  html += '</ol></div>';
  $('body').append(html);

  // template manager
  $('#msgTemplate li').prepend('<input type=button class="del-button" ' +
    'value=Del style="display:none">');
  $('#msgTemplate').append('<li class="add-button" style="display:none">' +
    '<input type=button id=newTmplAdd value=Add><input id=newTmpl ' +
    'class=ui-widget-content></li>');
  $(':button', '#msgTemplate').button();
  $('.del-button').click(function(evt) {
    fshTemplate.splice($('#msgTemplate li')
      .index(evt.target.parentNode), 1);
    setValueJSON('quickMsg', fshTemplate);
    $('#msgTemplateDialog').dialog('close');
    showMsgTemplate();
  });
  $('#newTmplAdd').click(function() {
    if ($('#newTmpl').val() === '') {return;}
    fshTemplate.push($('#newTmpl').val());
    setValueJSON('quickMsg', fshTemplate);
    $('#msgTemplateDialog').dialog('close');
    showMsgTemplate();
  });

  // enable selectable template
  $('#msgTemplate').selectable({
    filter: 'li.ui-widget-content',
    stop: function() {
      if ($('.add-button.ui-selected').length > 0) {return;} // click on add row
      if ($('.ui-selected').length === 0) {return;} // nothing selected yet
      $('#quickMsgDialog_msg').val($('#quickMsgDialog_msg').val() +
        $('#msgTemplate .ui-selected').text() + '\n');
      $('#msgTemplateDialog').dialog('close');
    }
  });

  // show the template form
  $('#msgTemplateDialog').dialog({
    buttons: {
      Manage: function() {
        $('.del-button').toggle();
        $('.add-button').toggle();
      },
      Cancel: function() {
        $('#msgTemplateDialog').dialog('close');
        $('#msgTemplateDialog').remove();
      }
    }
  });
}

function keypress(evt) {
  if (evt.code === 'Enter' && !evt.shiftKey) {
    evt.preventDefault();
    sendMessage();
  }
}

function captureEnter() {
  if (enterForSendMessage) {
    getElementById('quickMsgDialog_msg')
      .addEventListener('keypress', keypress);
  }
}

function openQuickMsgDialog(name, msg, tip) { // jQuery
  if (!fshTemplate) {
    fshTemplate = getValueJSON('quickMsg');
    var buttons = $('#quickMessageDialog').dialog('option', 'buttons');
    sendMessage = buttons['Send Message'];
    buttons.Template = showMsgTemplate;
    $('#quickMessageDialog').dialog('option', 'buttons', buttons);
  }
  $('#quickMsgDialog_targetUsername').html(name);
  $('#quickMsgDialog_targetPlayer').val(name);
  $('#quickMsgDialog_msg').val(fallback(msg, ''));
  $('#quickMsgDialog_msg').removeAttr('disabled');
  captureEnter();
  $('.validateTips').text(fallback(tip, ''));
  $('#quickMessageDialog').dialog('open');
}

export default function injectQuickMsgDialogJQ() {
  enterForSendMessage = getValue('enterForSendMessage');
  window.openQuickMsgDialog = openQuickMsgDialog;
}
