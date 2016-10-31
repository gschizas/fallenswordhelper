(function() {

	'use strict';
	var system = require('../support/system');
	var layout = require('../support/layout');

	var compPages;
	var componentList = {};

	function delAllComponent() { // Native
		var invTbl = document.getElementById('profileRightColumn')
			.getElementsByClassName('inventory-table')[1];
		var nodeList = invTbl.getElementsByClassName('compDelBtn');
		Array.prototype.forEach.call(nodeList, function(el) {
			el.dispatchEvent(new MouseEvent('click', {bubbles: true}));
		});
	}

	function retriveComponent(responseText, currentPage) { // Native
		var nextPage = currentPage + 1;
		var sumComp = document.getElementById('sumComp');
		sumComp.insertAdjacentHTML('beforeend', nextPage + ', ');
		var doc = system.createDocument(responseText);
		var invTbl = doc.getElementById('profileRightColumn')
			.getElementsByClassName('inventory-table')[1];
		var nodeList = invTbl.getElementsByTagName('IMG');
		Array.prototype.forEach.call(nodeList, function(el) {
			var mouseover = el.getAttribute('data-tipped');
			var id = mouseover.match(/fetchitem.php\?item_id=(\d+)/)[1];
			componentList[id] = componentList[id] || {
					'count': 0,
					'src': el.getAttribute('src'),
					'onmouseover': mouseover
				};
			componentList[id].count += 1;
		});
		if (currentPage < compPages - 1) {
			$.get('index.php?cmd=profile&component_page=' + nextPage)
				.done(function(data) {retriveComponent(data, nextPage);});
		} else {
			var totalCount = invTbl.querySelectorAll(
				'td[background$="inventory/1x1mini.gif"]');
			totalCount = totalCount.length + currentPage * 50;
			var output = 'Component Summary<br/><table>';
			var usedCount = 0;
			Object.keys(componentList).forEach(function(id) {
				var comp=componentList[id];
				output += '<tr><td align=center><img src="' + comp.src +
					'" class="tip-dynamic" data-tipped="' + comp.onmouseover +
					'"></td><td>' + comp.count + '</td></tr>';
				usedCount += comp.count;
			});
			output += '<tr><td align=center>Total:</td><td>' + usedCount + ' / ' +
				totalCount + '</td></tr></table>';
			sumComp.innerHTML = output;
		}
	}

	function countComponent(e) { // jQuery
		var invTbl = document.getElementById('profileRightColumn')
			.getElementsByClassName('inventory-table')[1];
		var compPage = invTbl.querySelectorAll(
			'a[href^="index.php?cmd=profile&component_page="]');
		compPages = compPage.length;
		e.target.parentNode.innerHTML = 'Retrieve page: ';
		$.get('index.php?cmd=profile&component_page=0')
			.done(function(data) {retriveComponent(data, 0);});
	}

	function delComponent(evt) { // jQuery
		var href = evt.target.previousElementSibling.getAttribute('href');
		$.get(href).done(function(data) {
			var response = layout.infoBox(data);
			if (response === 'Component destroyed.') {
				evt.target.parentNode.innerHTML = '';
			} else {
				$('#dialog_msg').html(response).dialog('open');
			}
		});
	}

	function enableDelComponent() { // Native
		document.getElementById('compDel').parentNode.classList.add('fshHide');
		document.getElementById('compDelAll').parentNode.classList
			.remove('fshHide');
		var nodeList = document.getElementById('profileRightColumn')
			.getElementsByClassName('inventory-table')[1]
			.getElementsByTagName('IMG');
		Array.prototype.forEach.call(nodeList, function(el) {
			el.parentNode.parentNode.insertAdjacentHTML('beforeend',
				'<span class="compDelBtn">Del</span>');
		});
	}

	function profileComponents() { // Native
		var invTables = document.getElementById('profileRightColumn')
			.getElementsByClassName('inventory-table');
		if (invTables.length !== 2) {return;}
		var compDiv = invTables[1].parentNode;
		if (compDiv.style.display !== 'block') {return;}
		compDiv.insertAdjacentHTML('beforeend', '<div class="fshCenter">' +
			'<div>[<span id="compDel" class="sendLink">Enable Quick Del</span>]' +
			'</div>' +
			'<div id="sumComp">[<span id="compSum" class="sendLink">Count Components</span>]' +
			'</div>' +
			'<div>[<a class="fshBlue" href="index.php?cmd=notepad&blank=1' +
			'&subcmd=quickextract">Quick Extract Components</a>]</div>' +
			'<div class="fshHide">[<span id="compDelAll" class="sendLink">' +
			'Delete All Visible</span>]</div>' +
			'</div>');
		compDiv.addEventListener('click', function(e) {
			if (e.target.id === 'compDel') {enableDelComponent(e);}
			if (e.target.id === 'compSum') {countComponent(e);}
			if (e.target.id === 'compDelAll') {delAllComponent(e);}
			if (e.target.classList.contains('compDelBtn')) {delComponent(e);}
		});
	}

	module.exports = {
		profileComponents: profileComponents
	};

})();