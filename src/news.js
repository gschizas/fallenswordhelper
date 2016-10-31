(function() {

	'use strict';
	var system = require('./support/system');

	function updateShoutboxPreview() { // Legacy
		var textArea =
			system.findNode('//textarea[@findme="Helper:InputText"]');
		var textContent = textArea.value;
		var chars = textContent.length;
		var maxchars = parseInt(textArea.getAttribute('maxcharacters'),10);
		if (chars>maxchars) {
			textContent=textContent.substring(0,maxchars);
			textArea.value=textContent;
			chars=maxchars;
		}

		document.getElementById('Helper:ShoutboxPreview').innerHTML =
			'<table align="center" width="325" border="0"><tbody>' +
			'<tr><td style="text-align:center;color:#7D2252;' +
			'background-color:#CD9E4B">Preview (' + chars + '/' + maxchars +
			' characters)</td></tr>' +
			'<tr><td width="325"><span style="font-size:x-small;" ' +
			'findme="biopreview">' + textContent +
			'</span></td></tr></tbody></table>';

	}

	function injectShoutboxWidgets(textboxname, maxcharacters) { // Legacy
		var textArea =
			system.findNode('//textarea[@name="' + textboxname + '"]');
		textArea.setAttribute('findme', 'Helper:InputText');
		textArea.setAttribute('maxcharacters', maxcharacters);
		var textAreaTable = system.findNode('../../../..', textArea);
		textAreaTable.insertRow(-1).insertCell(0)
			.setAttribute('id', 'Helper:ShoutboxPreview');
		textArea.addEventListener('keyup', updateShoutboxPreview, true);
	}

	function newsFsbox() { // Native
		injectShoutboxWidgets('fsbox_input', 100);
	}

	function newsShoutbox() { // Native
		injectShoutboxWidgets('shoutbox_input', 150);
	}

	function injectHomePageTwoLink() { // jQuery
		var archiveLink =
			$('#pCC a[href="index.php?cmd=&subcmd=viewupdatearchive"]');
		if (archiveLink.length !== 1) {return;}
		archiveLink.after('&nbsp;<a href="index.php?cmd=&subcmd=viewupdatear' +
			'chive&subcmd2=&page=2&search_text=">View Updates Page 2</a>');
		archiveLink = $('#pCC a[href="index.php?cmd=&subcmd=viewarchive"]');
		archiveLink.after('&nbsp;<a href="index.php?cmd=&subcmd=viewarchive&' +
			'subcmd2=&page=2&search_text=">View News Page 2</a>');
	}

	module.exports = {
		newsFsbox: newsFsbox,
		newsShoutbox: newsShoutbox,
		injectHomePageTwoLink: injectHomePageTwoLink
	};

})();