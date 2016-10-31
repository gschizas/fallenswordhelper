(function() {

	'use strict';
	var system = require('../support/system');
	var common = require('../support/common');

	var helperMenuBlob =
		'<div class="column"><h3>Character</h3><ul><li>' +
		'<span class="fshLink" fn="quickBuff.injectBuffLog">Buff Log</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="combatLog.injectNotepadShowLogs">Combat Log</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="recipeMgr.injectRecipeManager">Recipe Manager</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="lists.injectQuickLinkManager">Quick Links</span>' +
		'</li></ul><h3>Actions</h3><ul><li>' +
		'<span class="fshLink" fn="findBuffs.injectFindBuffs">Find Buffs</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="findBuffs.injectFindOther">Find Other</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="onlinePlayers.injectOnlinePlayers">Online Players</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="lists.injectAuctionSearch">AH Quick Search</span>' +
		'</li></ul><h3>Extra</h3><ul><li>' +
		'<span class="fshLink" fn="quickExtract.insertQuickExtract">Quick Extract</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="quickWear.insertQuickWear">Quick Wear</span>' +
		'</li><li>' +
		'<span class="fshLink" fn="misc.injectFsBoxContent">FS Box Log</span>' +
		'</li></ul>' +
		'<h3>FSH developer quick links</h3>' +
		'<ul><li>' +
		'<span class="a-reply" target_player="PointyHair">PM</span> ' +
		'<a href="index.php?cmd=profile&player_id=1963510">PointyHair</a>' +
		'</li><li>' +
		'<span class="a-reply" target_player="yuuzhan">PM</span> ' +
		'<a href="index.php?cmd=profile&player_id=1599987">yuuzhan</a>' +
		'</li></ul>' +
		'</div>';

	function callHelperFunction(evt) { // jQuery
		var content = document.getElementById('content');
		if (content) {content.innerHTML = '';} else {
			content = document.createElement('DIV');
			content.id = 'content';
			content.style.display = 'none';
			document.body.appendChild(content);
		}
		var fn = system.getFunction(evt.target.getAttribute('fn'));
		if (typeof fn === 'function') {
			// fn.call(FSH.Helper, content);
			fn(content);
		}
		$(content).dialog({ width: 'auto', modal: true });
	}

	function eventHandler(evt) { // Native
		if (evt.target.classList.contains('fshLink')) {
			callHelperFunction(evt);
			return;
		}
		if (evt.target.classList.contains('a-reply')) {
			window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
		}
	}

	function showHelperMenu() { // Native
		var helperMenu = document.getElementById('helperMenu');
		helperMenu.removeEventListener('mouseenter', showHelperMenu);

		var helperMenuDiv = document.createElement('DIV');
		helperMenuDiv.id = 'helperMenuDiv';
		helperMenuDiv.className = 'helperMenuDiv';
		helperMenuDiv.style.backgroundImage = 'url(' + system.imageServer +
			'/skin/inner_bg.jpg)';
		helperMenuDiv.insertAdjacentHTML('beforeend', helperMenuBlob);
		helperMenu.appendChild(helperMenuDiv);
		helperMenu.addEventListener('click', function(evt) {
			if (evt.target.id !== 'helperMenu') {return;}
			var menu = evt.target.firstElementChild;
			menu.classList.toggle('showMenuDiv');
		});
		helperMenuDiv.addEventListener('click', eventHandler);
	}

	function injectHelperMenu() { // Native
		// don't put all the menu code here (but call if clicked) to minimize lag
		var node = document.getElementById('statbar-container');
		if (!node) {return;}
		var helperMenu = document.createElement('DIV');
		helperMenu.id = 'helperMenu';
		helperMenu.className = 'helperMenu';
		if (system.getValue('keepHelperMenuOnScreen')) {
			helperMenu.classList.add('fshFixed');}
		helperMenu.innerHTML = 'Helper&nbsp;Menu';
		helperMenu.addEventListener('mouseenter', showHelperMenu);
		if (system.getValue('draggableHelperMenu')) {
			helperMenu.setAttribute('draggable', 'true');
			helperMenu.addEventListener('dragstart', common.drag_start);
		}
		node.parentNode.insertBefore(helperMenu, node);
	}

	module.exports = {
		injectHelperMenu: injectHelperMenu,
	};

})();