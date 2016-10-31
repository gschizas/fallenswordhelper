(function() {

	'use strict';
	var calf = require('./support/calf');
	var debug = require('./support/debug');
	var task = require('./support/task');
	var dataObj = require('./support/dataObj');
	var system = require('./support/system');
	var ajax = require('./support/ajax');

	/* jshint latedef: nofunc */
	var options;
	var showQuickDropLinks;
	var showQuickSendLinks;
	var theInv;
	var invManFilter =
		'<table class="fshInvFilter">' +
		'<tr><th colspan="14">@@reportTitle@@</th>' +
		'<th><span id="fshRefresh">[Refresh]</span></th></tr>' +
		'<tr><td colspan="2" rowspan="3"><b>&nbsp;Show Items:</b></td>' +
		'<td class="fshRight">&nbsp;Helmet:</td>' +
		'<td><input id="fshHelmet" type="checkbox" item="0"/></td>' +
		'<td class="fshRight">&nbsp;Armor:</td>' +
		'<td><input id="fshArmor" type="checkbox" item="1"/></td>' +
		'<td class="fshRight">&nbsp;Gloves:</td>' +
		'<td><input id="fshGloves" type="checkbox" item="2"/></td>' +
		'<td class="fshRight">&nbsp;Boots:</td>' +
		'<td><input id="fshBoots" type="checkbox" item="3"/></td>' +
		'<td class="fshRight">&nbsp;Weapon:</td>' +
		'<td><input id="fshWeapon" type="checkbox" item="4"/></td>' +
		'<td></td>' +
		'<td class="fshRight">&nbsp;Min lvl:</td>' +
		'<td><input id="fshMinLvl" size="5" value="1"/></td>' +
		'</tr><tr>' +
		'<td class="fshRight">&nbsp;Shield:</td>' +
		'<td><input id="fshShield" type="checkbox" item="5"/></td>' +
		'<td class="fshRight">&nbsp;Ring:</td>' +
		'<td><input id="fshRing" type="checkbox" item="6"/></td>' +
		'<td class="fshRight">&nbsp;Amulet:</td>' +
		'<td><input id="fshAmulet" type="checkbox" item="7"/></td>' +
		'<td class="fshRight">&nbsp;Rune:</td>' +
		'<td><input id="fshRune" type="checkbox" item="8"/></td>' +
		'<td class="fshRight">&nbsp;Sets Only:</td>' +
		'<td><input id="fshSets" item="-1" type="checkbox"/></td>' +
		'<td></td>' +
		'<td class="fshRight">&nbsp;Max lvl:</td>' +
		'<td><input id="fshMaxLvl" size="5" value="9999"/></td>' +
		'</tr><tr>' +
		'<td colspan="2">' +
		'&nbsp;[<span id="fshAll" class="fshLink">Select All</span>]</td>' +
		'<td colspan="2">' +
		'&nbsp;[<span id="fshNone" class="fshLink">Select None</span>]</td>' +
		'<td colspan="2">' +
		'&nbsp;[<span id="fshDefault" class="fshLink">Defaults</span>]</td>' +
		'<td colspan="6"></td>' +
		'<td><input id="fshReset" type="button" value="Reset"/></td>' +
		'</tr>' +
		'<tr>' +
		'<td class="fshRight">&nbsp;Quest Item:</td>' +
		'<td><input id="fshQuest" item="9" type="checkbox"/></td>' +
		'<td class="fshRight">&nbsp;Potion:</td>' +
		'<td><input id="fshPotion" item="10" type="checkbox"/></td>' +
		'<td class="fshRight">&nbsp;Resource:</td>' +
		'<td><input id="fshResource" item="12" type="checkbox"/></td>' +
		'<td class="fshRight">&nbsp;Recipe:</td>' +
		'<td><input id="fshRecipe" item="13" type="checkbox"/></td>' +
		'<td class="fshRight">&nbsp;Container:</td>' +
		'<td><input id="fshContainer" item="14" type="checkbox"/></td>' +
		'<td class="fshRight">&nbsp;Frag Stash:</td>' +
		'<td><input id="fshStash" item="16" type="checkbox"/></td>' +
		//' Composed: <input id="fshComposed" item="15" type="checkbox"/>' +
		'<td colspan="3"></td></tr>' +
		'<tr>' +
		'<td class="fshRight">&nbsp;Common:</td>' +
		'<td><input id="fshCommon" item="100" type="checkbox" checked/></td>' +
		'<td class="fshRight">&nbsp;Rare:</td>' +
		'<td><input id="fshRare" item="101" type="checkbox" checked/></td>' +
		'<td class="fshRight">&nbsp;Unique:</td>' +
		'<td><input id="fshUnique" item="102" type="checkbox" checked/></td>' +
		'<td class="fshRight">&nbsp;Legendary:</td>' +
		'<td><input id="fshLegendary" item="103" type="checkbox" checked/></td>' +
		'<td class="fshRight">&nbsp;Super Elite:</td>' +
		'<td><input id="fshSuperElite" item="104" type="checkbox" checked/></td>' +
		'<td class="fshRight">&nbsp;Crystalline:</td>' +
		'<td><input id="fshCrystalline" item="105" type="checkbox" checked/></td>' +
		'<td class="fshRight">&nbsp;Epic:</td>' +
		'<td colspan="2"><input id="fshEpic" item="106" type="checkbox" checked/></td>' +
		'</tr>' +
		'</table>';
	var inventoryCheckAll = {
		'0': 1, '1': 1, '2': 1, '3': 1, '4': 1,
		'5': 1, '6': 1, '7': 1, '8': 1, '9': 1,
		'10': 1, '11': 1, '12': 1, '13': 1,
		'14': 1, '15': 1, '16': 1, '100': 1,
		'101': 1, '102': 1, '103': 1, '104': 1,
		'105': 1, '106': 1
	};
	var itemType = ['Helmet', 'Armor', 'Gloves', 'Boots', 'Weapon', 'Shield',
		'Ring', 'Amulet', 'Rune', 'Quest Item', 'Potion', 'Component',
		'Resource', 'Recipe', 'Container', 'Composed', 'Frag Stash'];
	var craftHash = {
		Perfect    : {abbr: 'Perf', colour: '#00b600', index: 8},
		Excellent  : {abbr:  'Exc', colour: '#f6ed00', index: 7},
		'Very Good': {abbr:   'VG', colour: '#f67a00', index: 6},
		Good       : {abbr: 'Good', colour: '#f65d00', index: 5},
		Average    : {abbr:  'Ave', colour: '#f64500', index: 4},
		Poor       : {abbr: 'Poor', colour: '#f61d00', index: 3},
		'Very Poor': {abbr:  'VPr', colour: '#b21500', index: 2},
		Uncrafted  : {abbr:  'Unc', colour: '#666666', index: 1}
	};

	function doSpinner() { // jQuery
		$('#pCC').html('<span id="fshInvMan"><img src = "' +
		system.imageServer + '/world/actionLoadingSpinner.gif">&nbsp;' +
			'Getting inventory data...</span>');
	}

	function rekeyMembrList() { // Native
		calf.membrList = Object.keys(calf.membrList)
			// Using reduce() to rekey the membrList from names to id's
			.reduce(function(prev, curr) {
				if (curr !== 'lastUpdate') {
					prev[calf.membrList[curr].id] =
						calf.membrList[curr];
				}
				return prev;
			}, {});
	}

	function decorate() { // Native
		if (theInv.folders) {
			theInv.folders['-1'] = 'Main';
		}
		// Hide composed potions until Zorg fixes the feed
		theInv.items =
			theInv.items.filter(function(obj) {
				return obj.type !== '15';
			});
		//
	}

	function lvlFilter() { // jQuery
		/* Custom filtering function which will search data in column 2 between two values */
		$.fn.dataTable.ext.search.push(
			function(_settings, data) {
				var min = options.fshMinLvl;
				var max = options.fshMaxLvl;
				var level = system.intValue(data[1]); // use data for the level column
				if (level === 0 ||
					isNaN(min) && isNaN(max) ||
					isNaN(min) && level <= max ||
					min <= level && isNaN(max) ||
					min <= level && level <= max )
				{return true;}
				return false;
			}
		);
	}

	function typeFilter() { // jQuery
		$.fn.dataTable.ext.search.push(
			function(_settings, _row, _index, data) {
				return !options.checkedElements ||
					options.checkedElements[data.type] ?
					true : false;
			}
		);
	}

	function setFilter() { // jQuery
		$.fn.dataTable.ext.search.push(
			function(_settings, _row, _index, data) {
				return !options.checkedElements ||
					!options.checkedElements['-1'] ||
					options.checkedElements['-1'] &&
					data.stats &&
					data.stats.set_id !== '-1' ?
					true : false;
			}
		);
	}

	function rarityFilter() { // jQuery
		$.fn.dataTable.ext.search.push(
			function(_settings, _row, _index, data) {
				var rarity = (parseInt(data.rarity, 10) + 100).toString();
				return !options.checkedElements ||
					options.checkedElements[rarity] ?
					true : false;
			}
		);
	}

	function headers() { // jQuery
		var reportTitle;
		if (theInv.player_id) {
			reportTitle = '<b>&nbsp;Inventory Manager</b> ' +
				theInv.items.length +
				' items (green = worn, blue = backpack)';
		} else {
			reportTitle = '<b>&nbsp;Guild Inventory Manager</b> ' +
				theInv.items.length +
				' items (maroon = in BP, blue=guild store)';
		}
		var myHtml = invManFilter.replace('@@reportTitle@@', reportTitle);
		$('#pCC').html(myHtml);
	}

	function setChecks() { // Native
		Array.prototype.forEach.call(
			document.querySelectorAll('table.fshInvFilter input[type="checkbox"]'),
			function(el) {
				el.checked =
					options.checkedElements[el.getAttribute('item')] === 1;
			});
		ajax.setForage('fsh_inventory', options);
	}

	function setLvls() { // jQuery
		$('#fshMinLvl').val(options.fshMinLvl);
		$('#fshMaxLvl').val(options.fshMaxLvl);
	}

	function nameRender(data, type, row) { // Native
		if (type !== 'display') {return data;}
		var cur = theInv.player_id ?
			theInv.player_id :
			theInv.current_player_id;
		var t = row.player_id === -1 ? 4 : 1;
		var p = theInv.player_id ?
			theInv.player_id :
			row.player_id !== -1 ? row.player_id :
			theInv.guild_id;
		var bold = row.equipped ? '<b>' + data + '</b>' : data;
		var setName = row.stats && row.stats.set_name !== '' ?
			' (<span class="fshLink setName" set="' + row.stats.set_name +
			'">set</span>)' : '';
		return '<a href="index.php?cmd=auctionhouse&search_text=' + data +
			'" class="fshInvItem tip-dynamic ' +
			dataObj.rarity[row.rarity].clas + '" ' +
			'data-tipped="fetchitem.php?item_id=' + row.item_id +
			'&inv_id=' + row.inv_id + '&t=' + t + '&p=' + p +
			'&currentPlayerId=' + cur + '"' + '>' +
			bold + '</a>' + setName;
	}

	function whereData(row) { // Native
		return row.folder_id || row.player_id;
	}

	function whereRender(data, type, row) { // Native
		if (row.folder_id) {
			return row.equipped ? -2 : parseInt(row.folder_id, 10);
		}
		return row.player_id === -1 ? '~' :
			calf.membrList[row.player_id].username;
	}

	function whereRenderDisplay(data, type, row) { // Native
		if (row.player_id) {
			return row.player_id === -1 ? 'GS' :
				'<a class="fshMaroon" href="index.php?cmd=profile&player_id=' +
				row.player_id + '">' +
				calf.membrList[row.player_id].username + '</a>';
		}
		if (row.equipped) {return 'Worn';}
		var folderSelect = '<select class="moveItem" data-inv="' + row.inv_id +
			'">';
		var keysArray = Object.keys(theInv.folders)
			.sort(function(a, b) {return a - b;});
		keysArray.forEach(function(value) {
			folderSelect += '<option value="' + value + '"' +
				(value === row.folder_id ? ' selected' : '') + '>' +
				theInv.folders[value] + '</option>';
		});
		folderSelect += '</select>';
		return folderSelect;
	}

	function whereRenderFilter(data, type, row) { // Native
		if (row.player_id) {
			return row.player_id === -1 ? 'GS' :
				calf.membrList[row.player_id].username;
		}
		if (row.equipped) {return 'Worn';}
		return theInv.folders[row.folder_id];
	}

	function craftRender(craft) { // Native
		return craftHash[craft] ? craftHash[craft].abbr : '';
	}

	function durabilityRender(data, type, row) { // Native
		if (parseInt(row.max_durability, 10) > 0) {
			return Math.ceil(row.durability / row.max_durability * 100);
		}
	}

	function bpRender(where, type, row) { // Native
		if (row.folder_id || row.player_id ===
			theInv.current_player_id) {return;}
		if (type !== 'display') {return 'BP';}
		if (row.player_id === -1) {
			return '<span class="fshLink takeItem" invid="' + row.inv_id +
				'" action="take">BP</span>';
		}
		return '<span class="fshLink recallItem" invid="' + row.inv_id +
			'" playerid="' + row.player_id +
			'" mode="0" action="recall">BP</span>';
	}

	function gsRender(_data, type, row) { // Native
		if (row.player_id && row.player_id !== -1 ||
			row.folder_id && row.guild_tag !== '-1') {
			return type === 'display' ? '<span class="fshLink recallItem" invid="' +
				row.inv_id + '" playerid="' +
				(row.player_id || theInv.player_id) +
				'" mode="1" action="recall">GS</span>' : 'GS';
		}
	}

	function wearRender(row) { // Native
		if (row.player_id && row.player_id === -1) {
			return '<span class="fshLink takeItem" invid="' + row.inv_id +
				'" action="wear">Wear</span>';
		}
		if (row.player_id &&
				row.player_id !== theInv.current_player_id) {
			return '<span class="fshLink recallItem" invid="' + row.inv_id +
				'" playerid="' + row.player_id +
				'" mode="0" action="wear">Wear</span>';
		}
		if (row.folder_id && !row.equipped ||
				row.player_id && !row.equipped &&
				row.player_id === theInv.current_player_id) {
			return '<span class="fshLink wearItem" invid="' + row.inv_id +
				'">Wear</span>';
		}
		return '';
	}

	function useRender(row) { // Native
		if (row.player_id && row.player_id === -1) {
			return '<span class="fshLink takeItem" invid="' + row.inv_id +
				'" action="use">Use</span>';
		}
		if (row.player_id &&
				row.player_id !== theInv.current_player_id) {
			return '<span class="fshLink recallItem" invid="' + row.inv_id +
				'" playerid="' + row.player_id +
				'" mode="0" action="use">Use</span>';
		}
		if (row.folder_id && !row.equipped ||
				row.player_id && !row.equipped &&
				row.player_id === theInv.current_player_id) {
			return '<span class="fshLink useItem" invid="' + row.inv_id +
				'">Use</span>';
		}
		return '';
	}

	function wuRender(data, _type, row) { // Native
		var action = {'0': 'Wear', '1': 'Wear', '2': 'Wear', '3': 'Wear',
			'4': 'Wear', '5': 'Wear', '6': 'Wear', '7': 'Wear', '8': 'Wear',
			'10': 'Use', '11': 'Use', '15': 'Use'}[data];
		if (action === 'Wear') {
			action = wearRender(row);
		} else if (action === 'Use') {
			action = useRender(row);
		}
		return action;
	}

	function dropRender(data, type, row) { // Native
		if (row.guild_tag !== '-1' || row.equipped) {return;}
		if (type !== 'display') {return 'Drop';}
		return '<span class="dropItem tip-static dropLink" data-tipped=' +
			'"INSTANTLY DESTROY THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
			' data-inv="' + row.inv_id + '">Drop</span>';
	}

	function sendRender(data, type, row) { // Native
		if (row.bound || row.equipped) {return;}
		if (type !== 'display') {return 'Send';}
		return '<span class="sendItem tip-static reportLink" data-tipped=' +
			'"INSTANTLY SEND THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk."' +
			' data-inv="' + row.inv_id + '">Send</span>';
	}

	function createdRow(row, data) { // jQuery
		var colour;
		if (data.folder_id) {
			colour = data.equipped ? 'fshGreen' : 'fshNavy';
		}
		if (data.player_id) {
			colour = data.player_id === -1 ? 'fshNavy' : 'fshMaroon';
		}
		$(row).addClass(colour);
	}

	function doTable() { // jQuery
		$('#pCC').append('<table id="fshInv" class="hover" style="font-size: x-small;"></table>');
		var table = $('#fshInv').DataTable({
			data: theInv.items,
			autoWidth: false,
			pageLength: 50,
			lengthMenu: [[50, 100, 150, 200, -1], [50, 100, 150, 200, 'All']],
			columnDefs: [{targets: '_all', defaultContent: ''},
				{targets: [1, 4, 5, 6, 7, 8, 9, 10, 12, 13],
					orderSequence: ['desc', 'asc']}],
			columns: [
				{title: 'Name', data: 'item_name',
					render: nameRender
				},
				{title: 'Level', data: 'stats.min_level'},
				{title: 'Where', data: whereData,
					render: {
						'_': whereRender,
						'display': whereRenderDisplay,
						'filter': whereRenderFilter
					}
				},
				{title: 'Type', data: 'type',
					render: function(type) {return itemType[type];}
				},
				{title: 'Att', data: 'stats.attack'},
				{title: 'Def', data: 'stats.defense'},
				{title: 'Arm', data: 'stats.armor'},
				{title: 'Dam', data: 'stats.damage'},
				{title: 'HP', data: 'stats.hp'},
				{title: 'Frg', data: 'forge'},
				{title: 'Craft', data: 'craft',
					render: {
						'_': function(craft) {
							return craftHash[craft] ? craftHash[craft].index : 0;
						},
						'display': craftRender,
						'filter': craftRender
					}
				},
				{title: 'Du%', data: 'durability',
					render: durabilityRender},
				{title: 'BP',
					data: whereData,
					render: bpRender
				},
				{title: 'GS',
					data: whereData,
					render: gsRender
				},
				{title: 'W/U',
					data: 'type',
					render: wuRender
				},
				{title: 'setName', data: 'stats.set_name',
					orderable: false, visible: false
				},
				{title: 'Tag', data: 'guild_tag',
					render: function(tag){
						return tag === '-1' ? 'No' : 'Yes';
					}
				},
				{title: 'Drop', data: 'type',
					render: dropRender
				},
				{title: 'Send', data: 'type',
					render: sendRender
				}
			],
			createdRow: createdRow,
			stateSave: true,
			stateDuration: 0
		});
		table.column(12).visible('current_player_id' in theInv);
		table.column(17).visible('player_id' in theInv &&
			showQuickDropLinks);
		table.column(18).visible('player_id' in theInv &&
			showQuickSendLinks);
	}

	function refresh() { // Native
		doSpinner();
		syncInvMan();
	}

	function changeLvls() { // jQuery
		var minLvl = parseInt($('#fshMinLvl').val(), 10);
		var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
		if (isNaN(minLvl) || isNaN(maxLvl)) {return;}
		options.fshMinLvl = minLvl;
		options.fshMaxLvl = maxLvl;
		ajax.setForage('fsh_inventory', options);
		$('#fshInv').DataTable().draw(false);
	}

	function resetLvls() { // jQuery
		options.fshMinLvl = dataObj.defaults.inventoryMinLvl;
		options.fshMaxLvl = dataObj.defaults.inventoryMaxLvl;
		ajax.setForage('fsh_inventory', options);
		$('#fshMinLvl').val(options.fshMinLvl);
		$('#fshMaxLvl').val(options.fshMaxLvl);
		$('#fshInv').DataTable().draw(false);
	}

	function getChecks() { // jQuery
		options.checkedElements = {};
		Array.prototype.forEach.call(
			document.querySelectorAll(
				'table.fshInvFilter input[type="checkbox"][item]:checked'),
			function(el) {
				options.checkedElements[el.getAttribute('item')] = 1;
			});
		ajax.setForage('fsh_inventory', options);
		$('#fshInv').DataTable().draw(false);
	}

	function allChecks() { // jQuery
		options.checkedElements = inventoryCheckAll;
		setChecks();
		$('#fshInv').DataTable().draw(false);
	}

	function clearGearOnly(checkedElements) { // Native
		var newEle = {};
		Object.keys(checkedElements).forEach(function(key) {
			if (parseInt(key, 10) >= 100) {
				newEle[key] = checkedElements[key];
			}
		});
		return newEle;
	}

	function clearChecks() { // jQuery
		options.checkedElements = clearGearOnly(options.checkedElements);
		setChecks();
		$('#fshInv').DataTable().draw();
	}

	function resetChecks() { // jQuery
		options.checkedElements = dataObj.defaults.inventoryCheckedElements;
		setChecks();
		$('#fshInv').DataTable().draw(false);
	}

	function setName(e) { // jQuery
		$('#fshInv').DataTable().search($(e.target).attr('set')).draw();
		$('#fshInv_filter input').focus();
	}

	function removeClass(self) {
		self.closest('tr')
			.find('.takeItem, .recallItem, .wearItem, .dropItem, .sendItem')
			.removeClass().qtip('hide');
	}

	function killRow(self) { // jQuery
		var tr = self.closest('tr');
		var td = $('td', tr);
		td.eq(2).empty(); // Where
		td.eq(12).empty(); // BP - GS
		td.eq(13).empty(); // GS - W/U
		td.eq(14).empty(); // W/U - Tag
		td.eq(15).empty(); // Tag - Drop
		td.eq(16).empty(); // ? - Send
		tr.css('text-decoration', 'line-through');
	}

	function anotherSpinner(self) {
		self.empty().append('<img src="' + system.imageServer +
			'/skin/loading.gif" width="11" height="11">');
	}

	function takeItem(e) { // jQuery
		var self = $(e.target);
		removeClass(self);
		ajax.queueTakeItem(self.attr('invid'), self.attr('action'))
			.done(function(data){
				if (data.r === 1) {return;}
				killRow(self);
			});
		anotherSpinner(self);
	}

	function recallItem(e) { // jQuery
		var self = $(e.target);
		removeClass(self);
		ajax.queueRecallItem({
			invId: self.attr('invid'),
			playerId: self.attr('playerid'),
			mode: self.attr('mode'),
			action: self.attr('action')})
			.done(function(data){
				if (data.r === 1) {return;}
				killRow(self);
			});
		anotherSpinner(self);
	}

	function wearItem(e) { // jQuery
		var self = $(e.target);
		removeClass(self);
		ajax.equipItem(self.attr('invid')).done(function(data){
			if (data.r === 1) {return;}
			killRow(self);
		});
		anotherSpinner(self);
	}

	function useItem(e) { // jQuery
		var self = $(e.target);
		removeClass(self);
		ajax.useItem(self.attr('invid')).done(function(data){
			if (data.r === 1) {return;}
			killRow(self);
		});
		anotherSpinner(self);
	}

	function moveItem(e) { // jQuery
		var self = $(e.target);
		ajax.moveItem([self.data('inv')], self.val());
	}

	function dropItem(e) { // jQuery
		var self = $(e.target);
		removeClass(self);
		ajax.dropItem([self.data('inv')]).done(function(data){
			if (data.r === 1) {return;}
			killRow(self);
		});
		anotherSpinner(self);
	}

	function sendItem(e) { // jQuery
		var self = $(e.target);
		removeClass(self);
		ajax.sendItem([self.data('inv')]).done(function(data){
			if (data.r === 1) {return;}
			killRow(self);
		});
		anotherSpinner(self);
	}

	function eventHandlers() { // jQuery
		$('#fshRefresh').click(refresh);
		$('#fshMinLvl, #fshMaxLvl').keyup(changeLvls);
		$('#fshReset').click(resetLvls);
		$('table.fshInvFilter').on('click', 'input[type="checkbox"]', getChecks);
		$('#fshAll').click(allChecks);
		$('#fshNone').click(clearChecks);
		$('#fshDefault').click(resetChecks);
		$('#fshInv').on('click', 'span.setName', setName);
		$('#fshInv').on('click', 'span.takeItem', takeItem);
		$('#fshInv').on('click', 'span.recallItem', recallItem);
		$('#fshInv').on('click', 'span.wearItem', wearItem);
		$('#fshInv').on('click', 'span.useItem', useItem);
		$('#fshInv').on('change', 'select.moveItem', moveItem);
		$('#fshInv').on('click', 'span.dropItem', dropItem);
		$('#fshInv').on('click', 'span.sendItem', sendItem);
	}

	function clearButton() { // jQuery
		var input = $('#fshInv_filter input');
		input.prop('type', 'text');
		var clear = $('<span>&times;</span>');
		input.wrap($('<span class="text-input-wrapper"/>'));
		input.after(clear);
		clear.click(function() {
			input.val('');
			$('#fshInv').DataTable().search('').draw();
		});
	}

	function getInvMan() { // Native

		debug.time('inventory.getInvMan');

		showQuickDropLinks = system.getValue('showQuickDropLinks');
		showQuickSendLinks = system.getValue('showQuickSendLinks');

		if (calf.membrList) {rekeyMembrList();}

		decorate();
		lvlFilter();
		typeFilter();
		setFilter();
		rarityFilter();
		headers();
		setChecks();
		setLvls();
		doTable();
		eventHandlers();
		clearButton();

		debug.timeEnd('inventory.getInvMan');

	}

	function syncInvMan() { // jQuery
		var prm = [];
		prm.push(ajax.inventory(true).done(function(data) {
			theInv = data;
		}));
		if (calf.subcmd === 'guildinvmgr') {
			prm.push(ajax.getMembrList(false));
		}
		prm.push(ajax.getForage('fsh_inventory')
			.pipe(function(data) {
				options = data || {};
				options.fshMinLvl = options.fshMinLvl ||
					dataObj.defaults.inventoryMinLvl;
				options.fshMaxLvl = options.fshMaxLvl ||
					dataObj.defaults.inventoryMaxLvl;
				options.checkedElements =
					options.checkedElements ||
					dataObj.defaults.inventoryCheckedElements;
			})
		);
		$.when.apply($, prm).done(function() {
			task.add(3, getInvMan);
		});
	}

	module.exports = {
		injectInventoryManagerNew: refresh,
	};

})();