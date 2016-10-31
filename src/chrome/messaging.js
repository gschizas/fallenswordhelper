(function() {

	'use strict';
	var calf = require('../support/calf');
	var system = require('../support/system');

	function showMsgTemplate() { // jQuery
		var targetPlayer=$('#quickMsgDialog_targetUsername').text();
		$('#msgTemplateDialog').remove();

		// template displayed
		var html='<div id=msgTemplateDialog title="Choose Msg Template" ' +
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
		$(':button','#msgTemplate').button();
		$('.del-button').click(function(evt) {
			calf.template.splice($('#msgTemplate li')
				.index(evt.target.parentNode), 1);
			system.setValueJSON('quickMsg', calf.template);
			$('#msgTemplateDialog').dialog('close');
			showMsgTemplate();
		});
		$('#newTmplAdd').click(function() {
			if ($('#newTmpl').val() === '') {return;}
			calf.template.push($('#newTmpl').val());
			system.setValueJSON('quickMsg', calf.template);
			$('#msgTemplateDialog').dialog('close');
			showMsgTemplate();
		});

		// enable selectable template
		$( '#msgTemplate' ).selectable({
			filter: 'li.ui-widget-content',
			stop: function() {
				if ($('.add-button.ui-selected').length > 0) {return;} // click on add row
				if ($('.ui-selected').length === 0) {return;} // nothing selected yet
				$('#quickMsgDialog_msg').val($('#quickMsgDialog_msg').val() +
					$('#msgTemplate .ui-selected').text()+'\n');
				$('#msgTemplateDialog').dialog('close');
			}
		});

		// show the template form
		$('#msgTemplateDialog').dialog({'buttons':{
			'Manage':function() {
				$('.del-button').toggle();
				$('.add-button').toggle();
			},
			'Cancel':function() {
				$('#msgTemplateDialog').dialog('close');
				$('#msgTemplateDialog').remove();
			}
		}});
	}

	function openQuickMsgDialog(name, msg, tip) { // jQuery
		if (!calf.template) {
			calf.template = system.getValueJSON('quickMsg');
			var buttons = $('#quickMessageDialog').dialog('option','buttons');
			buttons.Template = showMsgTemplate;
			$('#quickMessageDialog').dialog('option','buttons',buttons);
		}
		$('#quickMsgDialog_targetUsername').html(name);
		$('#quickMsgDialog_targetPlayer').val(name);
		if (!msg) {msg = '';}
		$('#quickMsgDialog_msg').val(msg);
		$('#quickMsgDialog_msg').removeAttr('disabled');
		if (!tip) {tip='';}
		$('.validateTips').text(tip);
		$('#quickMessageDialog').dialog('open');
	}

	function injectQuickMsgDialogJQ() { // Native
		window.openQuickMsgDialog = openQuickMsgDialog;
	}

	module.exports = {
		injectQuickMsgDialogJQ: injectQuickMsgDialogJQ
	};

})();