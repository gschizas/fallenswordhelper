import calf from '../support/calf';
import {fallback, getValueJSON, setValueJSON} from '../support/system';

function showMsgTemplate() { // jQuery
  var targetPlayer = $('#quickMsgDialog_targetUsername').text();
  $('#msgTemplateDialog').remove();

  // template displayed
  var html = '<div id=msgTemplateDialog title="Choose Msg Template" ' +
    'style="display:none"><style>#msgTemplate .ui-selecting { ' +
    'background: #FECA40; };</style><ol id=msgTemplate valign=center>';
  for (var i = 0; i < calf.template.length; i += 1) {
    html += '<li class="ui-widget-content">' +
      calf.template[i].replace(/\{playername\}/g, targetPlayer) + '</li>';
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
    calf.template.splice($('#msgTemplate li')
      .index(evt.target.parentNode), 1);
    setValueJSON('quickMsg', calf.template);
    $('#msgTemplateDialog').dialog('close');
    showMsgTemplate();
  });
  $('#newTmplAdd').click(function() {
    if ($('#newTmpl').val() === '') {return;}
    calf.template.push($('#newTmpl').val());
    setValueJSON('quickMsg', calf.template);
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

function openQuickMsgDialog(name, msg, tip) { // jQuery
  if (!calf.template) {
    calf.template = getValueJSON('quickMsg');
    var buttons = $('#quickMessageDialog').dialog('option', 'buttons');
    buttons.Template = showMsgTemplate;
    $('#quickMessageDialog').dialog('option', 'buttons', buttons);
  }
  $('#quickMsgDialog_targetUsername').html(name);
  $('#quickMsgDialog_targetPlayer').val(name);
  $('#quickMsgDialog_msg').val(fallback(msg, ''));
  $('#quickMsgDialog_msg').removeAttr('disabled');
  $('.validateTips').text(fallback(tip, ''));
  $('#quickMessageDialog').dialog('open');
}

export default function injectQuickMsgDialogJQ() {
  window.openQuickMsgDialog = openQuickMsgDialog;
}
