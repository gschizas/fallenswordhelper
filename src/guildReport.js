(function() {

	'use strict';
	var calf = require('./support/calf');
	var task = require('./support/task');
	var system = require('./support/system');
	var layout = require('./support/layout');
	var ajax = require('./support/ajax');

	var wearRE = new RegExp('<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|' +
		'Gut Rot Head Splitter|Serum');
	var spinner = '<span class="guildReportSpinner" style="background-image: ' +
		'url(\'' + system.imageServer + '/skin/loading.gif\');"></span>';
	var headerCount;
	var headers;
	var counter;
	var nodeArray;
	var nodeList;
	var findUser;
	var foundUser;

	function hideOthers() { // Native
		var limit = performance.now() + 5;
		while (performance.now() < limit && counter < nodeList.length) {
			var el = nodeList[counter];

			if (el.firstChild.hasAttribute('bgcolor')) {
				if (el.firstChild.firstElementChild.textContent === findUser) {
					foundUser = true;
				} else {foundUser = false;}
			}
			if (!foundUser) {
				el.className = 'fshHide';
			}

			counter += 1;
		}
		if (counter < nodeList.length) {
			task.add(2, hideOthers);
		}
	}

	function searchUser() { // Native
		findUser = system.getUrlParameter('user');
		if (!findUser) {return;}
		var userNodes = document.querySelectorAll(
			'#pCC table table td[bgcolor="#DAA534"] b');
		var userNode = Array.prototype.some.call(userNodes, function(el) {
			return el.textContent === findUser;
		});
		if (!userNode) {return;}
		nodeList = document.querySelectorAll('#pCC table table tr');
		counter = 0;
			task.add(2, hideOthers);
	}

	function recallItem(evt) { // jQuery
		$(evt.target).qtip('hide');
		var mode = evt.target.getAttribute('mode');
		var theTd = evt.target.parentNode.parentNode;
		if (mode === '0') {theTd = theTd.parentNode;}
		var href = theTd.firstElementChild.getAttribute('href');
		ajax.queueRecallItem({
			invId: href.match(/&id=(\d+)/)[1],
			playerId: href.match(/&player_id=(\d+)/)[1],
			mode: mode,
			action: evt.target.getAttribute('action')})
			.done(function(data){
				if (data.r === 1) {return;}
				theTd.innerHTML = '<span class="fastWorn">' +
					'You successfully recalled the item</span>';
			});
		theTd.innerHTML = spinner;
	}

	function wearItem(evt) { // jQuery
		$(evt.target).qtip('hide');
		var theTd = evt.target.parentNode.parentNode.parentNode;
		var href = theTd.firstElementChild.getAttribute('href');
		ajax.equipItem(href.match(/&id=(\d+)/)[1]).done(function(data){
			if (data.r === 1) {return;}
			theTd.innerHTML = '<span class="fastWorn">Worn</span>';
		});
		theTd.innerHTML = spinner;
	}

	function eventHandlers(evt) { // Native
		if (evt.target.classList.contains('recall')) {
			recallItem(evt);
			return;
		}
		if (evt.target.classList.contains('equip')) {
			wearItem(evt);
			return;
		}
		if (evt.target.classList.contains('a-reply')) {
			window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
		}
	}

	function paintHeader() { // Native
		var limit = performance.now() + 10;
		while (performance.now() < limit && headerCount < headers.length) {
			var el = headers[headerCount];
			var oldhtml = el.textContent;
			el.innerHTML = layout.onlineDot({
				last_login: calf.membrList[oldhtml].last_login}) +
				'<a href="index.php?cmd=profile&player_id=' +
				calf.membrList[oldhtml].id + '">' + oldhtml +
				'</a> [ <span class="a-reply fshLink" target_player=' +
				oldhtml + '>m</span> ]';
			headerCount += 1;
		}
		if (headerCount < headers.length) {
			task.add(3, paintHeader);
		}
	}

	function reportHeader() { // Native
		headers = document.querySelectorAll('#pCC table table ' +
			'tr:not(.fshHide) td[bgcolor="#DAA534"][colspan="2"] b');
		headerCount = 0;
		task.add(3, paintHeader);
	}

	function paintChild() { // Native
		var limit = performance.now() + 1;
		while (performance.now() < limit && counter < nodeArray.length) {
			var el = nodeList[counter];
			var inject = nodeArray[counter];
			el.appendChild(inject);
			counter += 1;
		}
		if (counter < nodeArray.length) {
			task.add(3, paintChild);
		}
	}

	function mySpan(el) { // Native
		var inject = document.createElement('span');
		var secondHref = el.children.length === 2;
		var firstHref = secondHref ? '': ' class="fshHide"';
		var itemName = el.previousElementSibling.innerHTML;
		var wearable = wearRE.test(itemName) ?
			' class="fshHide"' : '';
		var equipable = secondHref ? 'recall': 'equip';
		inject.innerHTML = '<span' + firstHref +
			'> | <span class="reportLink recall tip-static" data-tipped="' +
			'Click to recall to backpack" mode="0" action="recall">Fast BP' +
			'</span></span>' +
			' | <span class="reportLink recall tip-static" ' +
			'data-tipped="Click to recall to guild store" mode="1" ' +
			'action="recall">Fast GS</span>' +
			'<span' + wearable +
			'> | <span class="reportLink ' +
			equipable +
			'" mode="0" action="wear">Fast Wear</span></span>';
		return inject;
	}

	function makeSpan() { // Native
		var limit = performance.now() + 10;
		while (performance.now() < limit && counter < nodeList.length) {
			var el = nodeList[counter];
			if (counter === 0) {
				el.previousSibling.setAttribute('width', '200px');
				el.setAttribute('width', '370px');
			} else {
				el.previousSibling.removeAttribute('width');
				el.removeAttribute('width');
			}
			nodeArray.push(mySpan(el));
			counter += 1;
		}
		if (counter < nodeList.length) {
			task.add(3, makeSpan);
		} else {
			counter = 0;
			task.add(3, paintChild);
		}
	}

	function prepareChildRows() { // Native
		nodeList = document.querySelectorAll('#pCC table table ' +
			'tr:not(.fshHide) td:nth-of-type(3n+0)');
		nodeArray = [];
		counter = 0;
		task.add(3, makeSpan);
	}

	function injectReportPaint() { // jQuery
		ajax.getMembrList(false).done(function() {
			task.add(3, reportHeader);
		});
		task.add(2, searchUser);
		task.add(3, prepareChildRows);
		document.getElementById('pCC').getElementsByTagName('TABLE')[1]
			.addEventListener('click', eventHandlers);
	}

	module.exports = {
		injectReportPaint: injectReportPaint,
	};

})();