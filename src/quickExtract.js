(function() {

	'use strict';
	var calf = require('./support/calf');
	var system = require('./support/system');
	var layout = require('./support/layout');

	var extractInv;

	function quickDoneExtracted(responseText) { // Native
		var infoMessage = layout.infoBox(responseText);
		document.getElementById('buy_result').innerHTML += '<br>' + infoMessage;
	}

	function extractAllSimilar(evt) { // Legacy
		if (!confirm('Are you sure you want to extract all similar items?')) {
			return;}
		var InventoryIDs = evt.target.getAttribute('invIDs').split(',');
		evt.target.parentNode.innerHTML = 'extracting all ' +
			InventoryIDs.length + ' resources';
		for (var i = 0; i < InventoryIDs.length; i += 1){
			system.xmlhttp(
				'index.php?cmd=profile&subcmd=useitem&inventory_id=' +
				InventoryIDs[i], quickDoneExtracted);
		}
	}

	function showQuickExtract(data) { // Legacy
		var item;
		var id;
		if (data.items) {
			extractInv = data;
		}
		var table = $('table[id="Helper:ExtTable"]');
		table.children().remove();//empty table for re-population.
		calf.resourceList={}; //reset resourceList
		var selectST= $('input[id="Helper:useItemsInSt"]').is(':checked');
		var selectMain= $('input[id="Helper:useItemsInMain"]').is(':checked');
		table.append('<tr><th width=20%>Actions</th><th>Items</th></tr><tr>' +
			'<td id="buy_result" colspan=2></td></tr>');
		for (var i=0; i < extractInv.items.length;i += 1) {
			item = extractInv.items[i];
			if (selectMain && item.folder_id !== '-1') {continue;}
			if (!selectST && item.is_in_st) {continue;}
			if (item.item_name !== 'Zombie Coffin' &&
				item.type !== '12' &&
				item.type !== '16') {continue;}
			if (calf.resourceList[item.item_id]){
				calf.resourceList[item.item_id].invIDs += ',' +
					item.inv_id;
				calf.resourceList[item.item_id].count += 1;
			} else {
				calf.resourceList[item.item_id] = {'count':1,
					'invIDs':item.inv_id,
					'first_item':item};
			}
		}

		for (id in calf.resourceList) {
			if (!calf.resourceList.hasOwnProperty(id)) {continue;}
			var res=calf.resourceList[id];
			item=res.first_item;
			table.append('<tr><td align=center><span style="cursor:pointer; ' +
				'text-decoration:underline; color:#blue; font-size:x-small;"' +
				' id="Helper:extractAllSimilar' + id + '" invIDs="' +
				res.invIDs + '">Extract all ' + res.count + '</span></td>' +
				'<td><img src="' + system.imageServer + '/items/' + 
				item.item_id + '.gif" class="tip-dynamic" data-tipped="' +
				'fetchitem.php?item_id=' + item.item_id + '&inv_id=' +
				item.inv_id + '&t=1&p=' + extractInv.player_id +
				'" border=0>' + '</td><td>'+item.item_name+'</td></tr>');
		}

		for (id in calf.resourceList) {
			if (!calf.resourceList.hasOwnProperty(id)) {continue;}
			document.getElementById('Helper:extractAllSimilar' + id)
				.addEventListener('click', extractAllSimilar, true);
		}
	}

	function insertQuickExtract(content) { // Hybrid
		if (!content) {content=layout.notebookContent();}
		content.innerHTML='<table width=100%><tr style="background-color:' +
			'#CD9E4B;"><td nobr><b>Quick Extract</b></td></tr></table>' +
			'Select which type of plants you wish to extract all of. Only ' +
			'select extractable resources.<br/><label><input type="checkbox"' +
			' id="Helper:useItemsInSt" checked /> Select items in ST</label>' +
			'<label><input type="checkbox" id="Helper:useItemsInMain" ' +
			'checked /> Only extract items in Main Folder</label><table ' +
			'width=100% id="Helper:ExtTable"></table>';
		$('[id^="Helper\\:useItemsIn"]').click(showQuickExtract);
		$.getJSON('?cmd=export&subcmd=inventory', showQuickExtract);
	}

	calf.quickExtract = {insertQuickExtract: insertQuickExtract};

	module.exports = {insertQuickExtract: insertQuickExtract};

})();