(function() {

	'use strict';
	var system = require('./support/system');
	var layout = require('./support/layout');
	var ajax = require('./support/ajax');

	function parseGuildOnline(membrList) { // Native
		var pCC = document.getElementById('pCC');
		var spinner = pCC.getElementsByClassName('fshSpinner')[0];
		spinner.classList.add('fshHide');
		var nodeList = pCC.getElementsByTagName('IMG');
		Array.prototype.forEach.call(nodeList, function(el) {
			var guildId = el.getAttribute('src').match(/guilds\/([0-9]+)_/)[1];
			var theTd = el.parentNode.parentNode;
			var player = theTd.nextElementSibling.textContent.trim();
			if (membrList[guildId] && membrList[guildId][player]) {
				theTd.parentNode.insertAdjacentHTML('beforeend',
					'<td>' + layout.onlineDot({
						last_login: membrList[guildId][player].last_login
					}) + '</td>');
				
			}
		});
	}

	function findOnlinePlayers(e) { // jQuery
		$(e.target).qtip('hide');
		e.target.outerHTML = '<span class="fshSpinner fshTopListSpinner" ' +
			'style="background-image: url(\'' + system.imageServer +
			'/world/actionLoadingSpinner.gif\');">';
		var guildArray = [];
		var nodeList = document.getElementById('pCC').getElementsByTagName('IMG');
		Array.prototype.forEach.call(nodeList, function(el) {
			var guildId = el.getAttribute('src').match(/guilds\/([0-9]+)_/)[1];
			if (guildArray.indexOf(guildId) === -1) {guildArray.push(guildId);}
		});
		ajax.getAllMembrList(true, guildArray)
			.done(parseGuildOnline);
	}

	function injectTopRated() { // Native
		var pCC = document.getElementById('pCC');
		if (!pCC ||
				!pCC.firstElementChild ||
				!pCC.firstElementChild.rows ||
				pCC.firstElementChild.rows.length < 3 ||
				pCC.firstElementChild.rows[1].textContent
					.indexOf('Last Updated') !== 0) {return;}
		var theCell = pCC.getElementsByTagName('TD')[0];
		theCell.firstElementChild.className = 'fshTopListWrap';
		var findBtn = document.createElement('INPUT');
		findBtn.className = 'fshFindOnlinePlayers custombutton tip-static';
		findBtn.setAttribute('type', 'button');
		findBtn.setAttribute('value', 'Find Online Players');
		findBtn.setAttribute('data-tipped', 'Fetch the online status of the ' +
			'top 250 players (warning ... takes a few seconds).');
		theCell.insertBefore(findBtn, theCell.firstElementChild);
		findBtn.addEventListener('click', findOnlinePlayers);
	}

	module.exports = {
		injectTopRated: injectTopRated,
	};

})();