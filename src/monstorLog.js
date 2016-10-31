(function() {

	'use strict';
	var calf = require('./support/calf');
	var system = require('./support/system');
	var layout = require('./support/layout');

	/* jshint latedef: nofunc */
	function clearEntityLog() { // Legacy
		system.setValue('monsterLog', '');
		location.href = 'index.php?cmd=notepad&blank=1&subcmd=monsterlog';
	}

	function sortEntityLogTable(evt) { // Legacy
		var headerClicked = evt.target.getAttribute('sortKey');
		var sortType = evt.target.getAttribute('sortType');
		if (!sortType) {sortType='string';}
		if (calf.sortAsc === undefined) {calf.sortAsc = true;}
		if (calf.sortBy && calf.sortBy === headerClicked) {
			calf.sortAsc = !calf.sortAsc;
		}

		calf.sortBy = headerClicked;

		switch(sortType) {
		case 'string':
			calf.entityLogTable.entity.sort(system.stringSort);
			break;
		case 'number':
			calf.entityLogTable.entity.sort(system.numberSort);
			break;
		default:
			break;
		}
		generateEntityTable();
	}

	function generateEntityTable() { // Legacy
		var content = document.getElementById('calf.entityTableOutput');
		if (!calf.entityLogTable || !content) {return;}
		var i;
		var entityInformationValue;
		var cell;

		var result = '<table cellspacing="0" cellpadding="0" border="0" ' +
			'width="100%"><tr style="background-color:#110011; color:white;">'+
			'<td width="90%" nobr align=center><b>&nbsp;Entity Information</b></td>'+
			'<td width="10%" nobr>[<span id="calf.clearEntityLog">' +
			'Clear</span>]</td>'+
			'</tr>' +
			'</table>'+
			'<table id="Helper:EntityInfo" cellspacing="1" cellpadding="2" ' +
			'border="0" style="font-size:small;"><tr ' +
			'style="background-color:#e2b960;">' +
			'<th width="25%" align="left" sortkey="name" colspan="2">Entity</th>' +
			'<th align="center" sortkey="key2">Class</th>' +
			'<th align="center" sortkey="key3" sorttype="number">Lvl</th>' +
			'<th align="center">Attack</th>' +
			'<th align="center">Defence</th>' +
			'<th align="center">Armor</th>' +
			'<th align="center">Damage</th>' +
			'<th align="center">HP</th>' +
			'<th align="center">Enhancements</th>' +
			'</tr>';
		for (var k=0;k<calf.entityLogTable.entity.length;k += 1) {
			result += '<tr class="HelperMonsterLogRow' + (1 + k % 2) +
				'"><td align="center"><img width=40 height=40 ' +
				'data-tipped="' + calf.entityLogTable.entity[k].key1 + '" ' +
				'src="' + calf.entityLogTable.entity[k].key1 + '"/></td>' +
				'<td align="left">' + calf.entityLogTable.entity[k].name +
				'</td>';
			for (i = 2; i < 4; i += 1) {
				result += '<td align="center">' +
					system.addCommas(calf.entityLogTable.entity[k]['key' + i]) +
					'</td>';
			}
			for (i = 4; i < 9; i += 1) {// 10 is gold, we don't need to show this
				result += '<td align="center">' +
					calf.entityLogTable.entity[k]['key'+i] + '</td>';
			}
			for (i = 10; i < 11; i += 1) {
				entityInformationValue = calf.entityLogTable.entity[k]['key' + i];
				if (!entityInformationValue) {
					result += '<td align="center" style="font-size:small; ' +
						'color:gray;">**Missing**</td>';
				} else {
					result += '<td align="center" style="font-size:xx-small;">' +
						entityInformationValue + '</td>';
				}
			}
		}
		result += '</table>';
		content.innerHTML = result;
		document.getElementById('calf.clearEntityLog')
			.addEventListener('click', clearEntityLog, true);

		var theTable=document.getElementById('Helper:EntityInfo');
		for (i=0; i<theTable.rows[0].cells.length; i += 1) {
			cell=theTable.rows[0].cells[i];
			if (cell.getAttribute('sortkey')) {
				cell.style.textDecoration='underline';
				cell.style.cursor='pointer';
				cell.addEventListener('click', sortEntityLogTable, true);
			}
		}
	}

	function injectMonsterLog() { // Legacy
		var entityLog = system.getValueJSON('monsterLog');
		var i;
		if (entityLog) {
			calf.entityLogTable = {entity:[]};
			for (var name in entityLog) {
				if (!entityLog.hasOwnProperty(name)) { continue; }
				var newEntity = {};
				newEntity.name = name;
				newEntity.key1 = entityLog[name].min.key1;
				for (i = 2; i < 4; i += 1) {
					newEntity['key' + i] = entityLog[name].min['key' + i];
				}
				for (i = 4; i < 10; i += 1) {
					newEntity['key' + i] = system.addCommas(
						entityLog[name].min['key' + i]) + ' - ' +
						system.addCommas(entityLog[name].max['key' + i]);
				}
				for (i = 10; i < 11; i += 1) {
					if (entityLog[name].min['key' + i]) {
						newEntity['key' + i] = '';
						for (var j = 0; j < entityLog[name].min['key' + i].length; j += 1) {
							newEntity['key' + i] += '<nobr>' + entityLog[name]
								.min['key' + i][j].name + ' ' +
								entityLog[name].min['key' + i][j].value + ' - ' +
								entityLog[name].max['key' + i][j].value + '<nobr>' +
								(j !== entityLog[name].min['key' + i].length - 1 ? '<br/>' :
								'');
						}
					}
				}
				calf.entityLogTable.entity.push(newEntity);
			}
			calf.sortBy = 'key3';
			calf.sortAsc = true;
			calf.entityLogTable.entity.sort(system.numberSort);
		}
		var content=layout.notebookContent();
		content.innerHTML = '<span id=calf.entityTableOutput>No monster ' +
			'information! Please enable entity log and travel a bit to see the ' +
			'world</span>';
		generateEntityTable();
	}

	function pushMonsterInfo(monster) { // Legacy
		// name, img, cls, lvl, atk, def, arm, dmg, hp, gold
		var i;
		var name = monster.key0;
		var monsterLog = system.getValueJSON('monsterLog');
		if (!monsterLog) {monsterLog = {};}
		if (!monsterLog[name]) {
			monsterLog[name] = {'min':{}, 'max':{}};
			for (i = 1; i < 10; i += 1) {
				monsterLog[name].min['key' + i] = 1e+100;
				monsterLog[name].max['key' + i] = 0;
			}
			for (i = 10; i < 11; i += 1) {// enchantments
				if (monster['key' + i]) { //does this critter have enchantments, if so, then see min and max with the initial list
					monsterLog[name].min['key' + i] = monster['key' + i];
					monsterLog[name].max['key' + i] = monster['key' + i];
				}
			}
		}
		for (i = 1; i < 4; i += 1) {
			monsterLog[name].min['key' + i] = monster['key' + i];
		}
		for (i = 4; i < 10; i += 1) {
			var value = system.intValue(monster['key' + i]);
			monsterLog[name].min['key' + i] =
				monsterLog[name].min['key' + i] < value ?
				monsterLog[name].min['key' + i] : value;
			monsterLog[name].max['key' + i] =
				monsterLog[name].max['key' + i] > value ?
				monsterLog[name].max['key' + i] : value;
		}
		for (i = 10; i < 11; i += 1) {// enchantments
			if (monster['key' + i]) { //does this critter have enchantments
				if (!monsterLog[name].min['key' + i] ||
					!monsterLog[name].min['key' + i]) {
					monsterLog[name].min['key' + i] = monster['key' + i];
					monsterLog[name].max['key' + i] = monster['key' + i];
				}
				for (var j = 0; j < monster['key' + i].length; j += 1) {
					var enchantValue = monster['key' + i][j].value * 1;
					monsterLog[name].min['key' + i][j].value =
						monsterLog[name].min['key' + i][j].value * 1 < enchantValue ?
						monsterLog[name].min['key' + i][j].value : enchantValue;
					monsterLog[name].max['key' + i][j].value =
						monsterLog[name].max['key' + i][j].value * 1 > enchantValue ?
						monsterLog[name].max['key' + i][j].value : enchantValue;
				}
			}
		}
		system.setValueJSON('monsterLog', monsterLog);
	}

	module.exports = {
		injectMonsterLog: injectMonsterLog,
		pushMonsterInfo: pushMonsterInfo
	};

})();