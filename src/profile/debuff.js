(function() {

	'use strict';
	var system = require('../support/system');
	var ajax = require('../support/ajax');

	function interceptDebuff(e) { // jQuery
		var aLink = e.target;
		if (aLink.tagName === 'IMG') {
			$(e.target).qtip('hide');
			aLink = aLink.parentNode;
		} else if (aLink.tagName !== 'A') {return;}
		e.stopPropagation();
		e.preventDefault();
		if (!system.getValue('disableDeactivatePrompts')) {
			var onclick = aLink.getAttribute('onclick');
			var warn =
				onclick.match(/Are you sure you wish to remove the .* skill\?/)[0];
			if (!confirm(warn)) {return;}
		}
		var buffId = aLink.getAttribute('href').match(/(\d+)$/)[1];
		ajax.debuff(buffId)
			.done(function(data) {
				if (data.response.response === 0) {
					aLink.parentNode.innerHTML = '';
				} else {
					$('#dialog_msg').html(data.response.msg).dialog('open');
				}
			});
	}

	function fastDebuff() { // jQuery
		var profileRightColumn =
			document.getElementById('profileRightColumn').lastElementChild;
		profileRightColumn.addEventListener('click', interceptDebuff, true);
	}

	module.exports = {
		fastDebuff: fastDebuff
	};

})();