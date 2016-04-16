// ==UserScript==
// @name           FallenSwordHelper
// @namespace      terrasoft.gr
// @description    Fallen Sword Helper
// @include        http://www.fallensword.com/*
// @include        http://guide.fallensword.com/*
// @include        http://fallensword.com/*
// @include        http://*.fallensword.com/*
// @include        http://local.huntedcow.com/fallensword/*
// @exclude        http://forum.fallensword.com/*
// @exclude        http://wiki.fallensword.com/*
// @version        1512
// @downloadURL    https://fallenswordhelper.github.io/fallenswordhelper/Releases/Current/fallenswordhelper.user.js
// @grant          none
// ==/UserScript==

// No warranty expressed or implied. Use at your own risk.

// EVERYTHING MUST BE IN main()
var fshMain = function() {

'use strict';

window.FSH = window.FSH || {};
FSH.dataTablesLoc = 'https://cdn.datatables.net/1.10.10/js/jquery.dataTables.min.js';

FSH.Helper = {

	injectViewGuild: function() {
		FSH.Helper.removeGuildAvyImgBorder();
		FSH.Helper.guildXPLock();

		var highlightPlayersNearMyLvl = FSH.System.getValue('highlightPlayersNearMyLvl');
		var highlightGvGPlayersNearMyLvl = FSH.System.getValue('highlightGvGPlayersNearMyLvl');
		if (highlightPlayersNearMyLvl || highlightGvGPlayersNearMyLvl) {
			var memList = FSH.System.findNode('//tr[td/b[.="Members"]]/following-sibling::tr/td/table');
			var levelToTest = FSH.System.intValue($('dt.stat-level:first').next().text());
			var characterVirtualLevel = FSH.System.getValue('characterVirtualLevel');
			if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
			for (var i=2;i<memList.rows.length;i += 1) {
				// var iplus1 = i+1;
				if (memList.rows[i].cells[1]) {
					// Firefox reads it as </td> and chrome reads it as \&lt;\/td\&gt;
					var vlevel = /VL:.+?(\d+)/.exec(memList.rows[i].cells[1].innerHTML)[1];
					// var level = memList.rows[i].cells[2].innerHTML;
					var aRow = memList.rows[i];
					if (highlightPlayersNearMyLvl && Math.abs(vlevel - levelToTest) <= (levelToTest <= 205 ? 5 : 10)) {
						aRow.style.backgroundColor = '#4671C8'; //blue
					} else if (highlightGvGPlayersNearMyLvl && Math.abs(vlevel - levelToTest) <= (levelToTest <= 300 ? 25 : levelToTest <= 700 ? 50 : 100)) {
						aRow.style.backgroundColor = '#FF9900'; //red
					}
				}
			}
		}
		FSH.Helper.changeGuildListOfflineBallColor();
	},

	updateBuffLog: function() {
		if (FSH.System.getValue('keepBuffLog')) {
			var now = new Date();
			var timeStamp = FSH.System.formatDateTime(now);//now.toLocaleFormat('%Y-%m-%d %H:%M:%S') + ' - ';
			var buffLog=FSH.System.getValue('buffLog');
			var buffsAttempted = document.body.innerHTML.split('<li>');
			document.body.innerHTML+= '<span id="buff_Log" style="color:yellow"></span>';
			var buffsNotCastRE = new RegExp('The skill ([\w ]*) of current or' +
				' higher level is currently active on "(\w*)"');
			var buffsCastRE = new RegExp('Skill ([\w ]*) level (\d*) was ' +
				'activated on "(\w*)"');
			var buffList = FSH.Data.buffList;
			for (var i=0;i<buffsAttempted.length ;i+= 1 )
			{
				var buffsCast = buffsCastRE.exec(buffsAttempted[i]);
				var buffsNotCast = buffsNotCastRE.exec(buffsAttempted[i]);
				var stamina = 0;
				if (buffsCast) {
					//document.getElementById('buff_Log').innerHTML+='<br>'+buffsCast[0];

				for (var j = 0; j < buffList.length; j += 1) {
					if (buffList[j].name === buffsCast[1]) {
						stamina = buffList[j].stamina;
						break;
					}
				}
					buffLog=timeStamp+buffsCast[0] + ' (' + stamina + ' stamina) <br>'+buffLog;
				}
				if (buffsNotCast) {

					buffLog=timeStamp+'<span style="color: red;">' + buffsNotCast[0] + '</span><br>' + buffLog;
				}
			}
			FSH.System.setValue('buffLog',buffLog);
		}
	},

	injectBuffLog: function(content) {
		if (!content) {content = FSH.Layout.notebookContent();}
		content.innerHTML=FSH.Layout.makePageTemplate('Buff Log','','clearBuffs','Clear','bufflog');
		document.getElementById('clearBuffs').addEventListener('click',
			function() {
				FSH.System.setValue('buffLog','');
				location.reload();
			}, true
		);
		document.getElementById('bufflog').innerHTML=FSH.System.getValue('buffLog');
	},

	injectFsBoxContent: function(content) { //native
		if (!content) {content = FSH.Layout.notebookContent();}
		content.innerHTML = FSH.Layout.makePageTemplate('FS Box Log', '',
			'fsboxclear', 'Clear', 'fsboxdetail');
		document.getElementById('fsboxclear')
			.addEventListener('click', function() {
				FSH.System.setValue('fsboxcontent','');
				location.reload();}, true);
		document.getElementById('fsboxdetail').innerHTML =
			FSH.System.getValue('fsboxcontent');
	},

	removeGuildAvyImgBorder: function() { //jquery
		$('img[oldtitle$="\'s Logo"]').css('border-style', 'none');
	},

	guildXPLock: function() {
		var xpLock = FSH.System.findNode('//a[contains(.,"Guild") and contains(.,"XP")]');
		if (!xpLock) {return;}
		var xpLockmouseover = $(xpLock).data('tipped');
		var xpLockXP = FSH.System.getIntFromRegExp(xpLockmouseover, /XP Lock: <b>(\d*)/);
		var actualXP = FSH.System.getIntFromRegExp(xpLockmouseover, /XP: <b>(\d*)/);
		if (actualXP < xpLockXP) {
			try {
			var xpNode = xpLock.parentNode.parentNode;
				xpNode.cells[1].innerHTML += ' (<b>' + FSH.System.addCommas(xpLockXP - actualXP) + '</b>)';
			} catch (err) {
				console.log(err);
			}
		}
	},

	injectGuild: function() {
		FSH.Helper.removeGuildAvyImgBorder();
		FSH.Helper.guildXPLock();

		var leftHandSideColumnTable = FSH.System.findNode('//table[tbody/tr/td/font/a[contains(.,"Change Logo")]]');
		var changeLogoCell = leftHandSideColumnTable.rows[0].cells[1].firstChild;
		changeLogoCell.innerHTML += '[ <span style="cursor:pointer; text-decoration:underline;" ' +
			'id="toggleGuildLogoControl" linkto="guildLogoControl" title="Toggle Section">X</span> ]';
		var guildLogoElement = leftHandSideColumnTable.rows[2].cells[0].firstChild.nextSibling;
		guildLogoElement.id = 'guildLogoControl';
		if (FSH.System.getValue('guildLogoControl')) {
			guildLogoElement.style.display = 'none';
			guildLogoElement.style.visibility = 'hidden';
		}
		var leaveGuildCell = leftHandSideColumnTable.rows[4].cells[1].firstChild;
		leaveGuildCell.innerHTML += '<span class="fshNoWrap">[ <span style="cursor:pointer; text-decoration:underline;" ' +
			'id="toggleStatisticsControl" linkto="statisticsControl" title="Toggle Section">X</span> ]</span>';
		var statisticsControlElement = leftHandSideColumnTable.rows[6].cells[0].firstChild.nextSibling;
		statisticsControlElement.id = 'statisticsControl';
		if (FSH.System.getValue('statisticsControl')) {
			statisticsControlElement.style.display = 'none';
			statisticsControlElement.style.visibility = 'hidden';
		}
		var buildCell = leftHandSideColumnTable.rows[15].cells[1].firstChild;
		buildCell.innerHTML += '[ <span style="cursor:pointer; text-decoration:underline;" ' +
			'id="toggleGuildStructureControl" linkto="guildStructureControl" title="Toggle Section">X</span> ]';
		var guildStructureControlElement = leftHandSideColumnTable.rows[17].cells[0].firstChild.nextSibling;
		guildStructureControlElement.id = 'guildStructureControl';
		if (FSH.System.getValue('guildStructureControl')) {
			guildStructureControlElement.style.display = 'none';
			guildStructureControlElement.style.visibility = 'hidden';
		}

		document.getElementById('toggleGuildLogoControl')
			.addEventListener('click', FSH.System.toggleVisibilty, true);
		document.getElementById('toggleStatisticsControl')
			.addEventListener('click', FSH.System.toggleVisibilty, true);
		document.getElementById('toggleGuildStructureControl')
			.addEventListener('click', FSH.System.toggleVisibilty, true);

		$('td:contains("Username"):last').parents('table:first')
			.find('a[href]').each(function(){
			$(this).after(' <a style="color:blue;font-size:10px;" ' +
			'href=\'javascript:window.openWindow("index.php?cmd=quickbuff&t=' +
			$(this).text() + '", "fsQuickBuff", 618, 1000, ",scrollbars")\'' +
			'>[b]</a>'); // FIXME
		});

		// self recall
		var selfRecall = leftHandSideColumnTable.rows[22].cells[0];
		selfRecall.innerHTML+=' [<a href="index.php?cmd=guild&subcmd=' +
			'inventory&subcmd2=report&user=' +
			$('dt.stat-name:first').next().text().replace(/,/g,'') +
			'" title="Self Recall">SR</a>]';

		//Detailed conflict information
		if (FSH.System.getValue('detailedConflictInfo') === true) {
			var confNode = FSH.System.findNode('//table[contains(@id,"statisticsControl")]');
			FSH.System.xmlhttp('index.php?cmd=guild&subcmd=conflicts',
				FSH.Helper.getConflictInfo, {'node': confNode});
		}
		FSH.Helper.changeGuildListOfflineBallColor();

	},

	changeGuildListOfflineBallColor: function() {
		//Code to change the colored balls based on last activity
		if (!FSH.System.getValue('enhanceOnlineDots')) {return;}
		var memberTable = FSH.System.findNode('//table[tbody/tr/td[.="Rank"]]');
		for (var i=2;i<memberTable.rows.length ;i+= 1 ) {
			var aRow = memberTable.rows[i];
			if (aRow.cells[1]) {
				var contactLink   = aRow.cells[1].firstChild.nextSibling;
				var lastActivity = /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/.exec($(contactLink).data('tipped'));
				var lastActivityIMG = FSH.Layout.onlineDot({
						min: lastActivity[3],
						hour: lastActivity[2],
						day: lastActivity[1]
					});
				aRow.cells[0].innerHTML = lastActivityIMG;
			}
		}
	},

	getConflictInfo: function(responseText, callback) {
		try {
			var insertHere = callback.node;
			var doc = FSH.System.createDocument(responseText);

			var page = FSH.System.findNode('//td[contains(.,"Page:")]', doc);
			var curPage = parseInt(FSH.System.findNode('//input[@name="page"]', doc).value,10);
			var maxPage = page.innerHTML.match(/of&nbsp;(\d*)/);

			var conflictTable = FSH.System.findNode('//font[contains(.,"Participants")]/ancestor::table[1]', doc);
			if (conflictTable && conflictTable.rows.length > 3) {
				if (curPage === 1) {
					var newNode = insertHere.insertRow(insertHere.rows.length-2);
					newNode.insertCell(0);
					newNode.insertCell(0);
					newNode.cells[0].innerHTML = '<a href="index.php?cmd=guild&subcmd=conflicts">Active Conflicts</a>';
					newNode.cells[1].innerHTML = 'Score';
				}
				for (var i = 1; i <= conflictTable.rows.length - 4; i+=2) {
					var newRow = insertHere.insertRow(insertHere.rows.length-2);
					newRow.insertCell(0);
					newRow.insertCell(0);
					newRow.cells[0].innerHTML = conflictTable.rows[i].cells[0].innerHTML;
					newRow.cells[1].innerHTML = '<b>' + conflictTable.rows[i].cells[6].innerHTML + '</b>';
				}
			}
			if (maxPage && parseInt(maxPage[1],10) > curPage) {
				FSH.System.xmlhttp('index.php?cmd=guild&subcmd=conflicts&subcmd2=&page=' + (curPage + 1) + '&search_text=',
					FSH.Helper.getConflictInfo,
					{'node': callback.node});
			}
		} catch (err) {
			console.log(err);
		}
	},

	recallGuildStoreItem: function(evt) {
		var guildStoreID=evt.target.getAttribute('itemID');
		var recallHref = 'index.php?cmd=guild&subcmd=inventory&subcmd2=takeitem&guildstore_id=' + guildStoreID + '&ajax=1';
		FSH.System.xmlhttp(recallHref,
			FSH.Helper.recallGuildStoreItemReturnMessage,
			{'item': guildStoreID, 'target': evt.target, 'url': recallHref});
	},

	recallGuildStoreItemReturnMessage: function(responseText, callback) {
		var target = callback.target;
		var info = FSH.Layout.infoBox(responseText);
		var itemCellElement = target.parentNode;
		if (info.search('You successfully took the item into your backpack') !== -1) {
			itemCellElement.innerHTML = '<span style="color:green; font-weight:bold;">Taken</span>';
		} else if (info!=='') {
			itemCellElement.innerHTML = '<span style="color:red; font-weight:bold;">Error:' + info + '</span>';
		} else {
			itemCellElement.innerHTML = 'Weird Error: check the Tools>Error Console';
			console.log('Post the previous HTML and the following message to the GitHub or to the forum to help us debug this error');
			console.log(callback.url);
		}
	},

	injectShop: function() {
		var injectHere = $('#shop-info');
		var itemNodes = $('td center a img[src*="/items/"]');

		var selector = '<span style="font-size:xx-small">Select an item to ' +
			'quick-buy:<br>Select how many to quick-buy <input style="font-' +
			'size:xx-small" value=1 id="buy_amount" name="buy_amount" size=3 ' +
			'class="custominput"><table cellpadding=2><tr>';
		var itemId;
		for (var i=0;i<itemNodes.length;i += 1) {
			var item=itemNodes[i];
			var src=item.getAttribute('src');
			var text=item.parentNode.parentNode.textContent;
			var onmouseover=$(item).data('tipped').replace('Click to Buy','Click to Select');
			itemId=item.parentNode.getAttribute('href').match(/&item_id=(\d+)&/)[1];
			selector+='<td width=20 height=20 ><img width=20 height=20 id=select'+itemId+' itemId='+itemId+' src="'+src+
				'" class="tipped" data-tipped-options="skin: \'fsItem\', ajax: true" data-tipped=\''+onmouseover+'\'>'+text+'</td>';
			if (i%25===24 && i!==itemNodes.length-1) {selector+='</tr><tr>';}
		}
		selector+='</table><table width="600px"></tr><tr><td align="right" ' +
			'width="50%">Selected item:</td><td height=45 width="50%" id=' +
			'selectedItem align="left">&nbsp;</td></tr><tr><td id=warningMsg' +
			' colspan="2" align="center"></td></tr><tr><td id=buy_result ' +
			'colspan="2" align="center"></td></tr>';
		injectHere.after('<table><tr><td>'+selector+'</td></tr></table>');
		for (i=0;i<itemNodes.length;i += 1) {
			itemId=itemNodes[i].parentNode.getAttribute('href').match(/&item_id=(\d+)&/)[1];
			document.getElementById('select'+itemId).addEventListener('click',FSH.Helper.selectShopItem,true);
		}
		FSH.Helper.shopId=itemNodes[0].parentNode.getAttribute('href').match(/&shop_id=(\d+)/)[1];
	},

	selectShopItem: function(evt) {
		FSH.Helper.shopItemId=evt.target.getAttribute('itemId');
		document.getElementById('warningMsg').innerHTML='<span style="color:red;font-size:small">Warning:<br> pressing "t" now will buy the '+document.getElementById('buy_amount').value+' item(s) WITHOUT confirmation!</span>';
		document.getElementById('selectedItem').innerHTML=
			document.getElementById('select'+FSH.Helper.shopItemId).parentNode.innerHTML.replace(/='20'/g,'=45');
	},

	quickBuyItem: function() {
		if (!FSH.Helper.shopId || !FSH.Helper.shopItemId) {return;}
		document.getElementById('buy_result').innerHTML='Buying '+document.getElementById('buy_amount').value+' Items';
		for (var i=0;i<document.getElementById('buy_amount').value;i += 1) {
			FSH.System.xmlhttp('index.php?cmd=shop&subcmd=buyitem&item_id='+FSH.Helper.shopItemId+'&shop_id='+FSH.Helper.shopId,
				FSH.Helper.quickDone);
		}
	},

	quickDone: function(responseText) {
		var infoMessage = FSH.Layout.infoBox(responseText);
		document.getElementById('buy_result').innerHTML+='<br />'+infoMessage;
	},

	injectRelic: function() {
		var relicNameElement = $('td:contains("Below is the current status ' +
			'for the relic"):last');
		relicNameElement.css('font-size', 'x-small');

		var injectHere = $('td:contains("Defended"):last');
		if (injectHere.length === 0) {return;}
		var defendingGuildMiniSRC = $('img[src*="_mini.jpg"]').attr('src');
		var defendingGuildID = /guilds\/(\d+)_mini.jpg/
			.exec(defendingGuildMiniSRC)[1];
		if (defendingGuildID === FSH.Layout.guildId().toString()) {
			var listOfDefenders = injectHere.next().text().split(',');
			// quick buff only supports 16
			var shortList = [];
			if (listOfDefenders) {
				var modifierWord;
				for (var i = 0; i < listOfDefenders.length; i += 1) {
					shortList.push(listOfDefenders[i]);
					if ((i + 1) % 16 === 0 && i !== 0 ||
						i === listOfDefenders.length - 1) {
						modifierWord = FSH.Layout.places[Math.floor(i / 16)];
						var htmlToAppend = '<br><nobr><a href="#" id="buffAll' +
							modifierWord + '"><span style="color:blue; font-' +
							'size:x-small;" title="Quick buff functionality ' +
							'from HCS only does 16">Buff ' + modifierWord +
							' 16</span></a></nobr>';
						injectHere.append(htmlToAppend);
						var buffAllLink = $('#buffAll' + modifierWord);
						buffAllLink.attr('href', FSH.Layout.buffAllHref(shortList));
						shortList = [];
					}
				}
			}
		}
		injectHere.append('<input id="calculatedefenderstats" type="button" ' +
			'value="Fetch Stats" title="Calculate the stats of the players ' +
			'defending the relic." class="custombutton">');
		document.getElementById('calculatedefenderstats')
			.addEventListener('click',
				function() {
					FSH.ajax.getMembrList(false)
						.done(FSH.Helper.calculateRelicDefenderStats);
				},
				true);
	},

	calculateRelicDefenderStats: function() {
		var validMemberString;
		var membrList = FSH.Helper.membrList;
		//hide the calc button
		$('input[id="calculatedefenderstats"]').css('visibility','hidden');
		//make the text smaller
		$('td:contains("Below is the current status for the relic"):last')
			.css('fontSize','x-small');
		//set the colspan of all other rows to 3
		$('table[width="600"]>tbody>tr:not(:eq(9))>td').attr('colspan',3);

		var tableWithBorderElement = $('table[cellpadding="5"]');
		tableWithBorderElement
			.attr('align','left')
			.attr('colSpan',2);
		var tableInsertPoint = tableWithBorderElement.parents('tr:first');
		tableInsertPoint.append('<td colspan="1"><table width="200" style="' +
			'border:1px solid #A07720;"><tbody><tr><td id="InsertSpot"></td>' +
			'</tr></tbody></table></td>');
		var extraTextInsertPoint = FSH.System.findNode('//td[@id="InsertSpot"]');
		var defendingGuildHref = $('a[href*="index.php?cmd=guild&subcmd=view' +
			'&guild_id="]:first').attr('href');
		FSH.Helper.getRelicGuildData(extraTextInsertPoint,defendingGuildHref);

		var defendingGuildMiniSRC = $('img[src*="_mini.jpg"]').attr('src');
		var defendingGuildID = /guilds\/(\d+)_mini.jpg/
			.exec(defendingGuildMiniSRC)[1];
		var myGuildID = FSH.Layout.guildId().toString();

		var hideRelicOffline = FSH.System.getValue('hideRelicOffline');
		if (defendingGuildID === myGuildID && !hideRelicOffline) {
			validMemberString = '';
			Object.keys(membrList).forEach(function(val) {
				var member = membrList[val];
				var lastLogin = 0;
				if (member.last_login) {
					lastLogin = Math.floor(Date.now() / 1000 -
						member.last_login);
				}
				if (lastLogin >= 120 && // two minutes is offline
					lastLogin <= 604800 && // 7 days max
					(member.level < 400 || member.level > 421 &&
					member.level < 441 || member.level > 450)) {
					validMemberString += member.username + ' ';
				}
			});
		}

		var defenders = $('a[href*="cmd=profile&player_id="]',
			'div#pCC table table');
		defenders.each(function(ind) {
			var $this = $(this);
			FSH.Helper.getRelicPlayerData(ind, $this.attr('href'), $this.text());
			if (defendingGuildID === myGuildID && !hideRelicOffline) {
				validMemberString = validMemberString.replace(
					$this.text() + ' ','');
			}
		});
		FSH.Helper.relicDefenderCount = defenders.length;

		var textToInsert = '<tr><td><table class="relicT">' +
			'<tr><td colspan="2" class="headr">Defending Guild Stats</td></tr>' +
			'<tr><td class="brn">Number of Defenders:</td>' +
				'<td>' + FSH.Helper.relicDefenderCount + '</td></tr>' +
			'<tr><td class="brn">Relic Count:</td>' +
				'<td title="relicCount">0</td></tr>' +
			'<tr><td class="brn">Lead Defender Bonus:</td>' +
				'<td title="LDPercentage">0</td></tr>' +
			'<tr class="hidden"><td>Relic Count Processed:</td>' +
				'<td title="relicProcessed">0</td></tr>' +
			'<tr class="hidden"><td colspan="2" class="headr">Lead Defender Full Stats</td></tr>' +
			'<tr class="hidden"><td>Attack:</td>' +
				'<td title="LDattackValue">0</td></tr>' +
			'<tr class="hidden"><td>Defense:</td>' +
				'<td title="LDdefenseValue">0</td></tr>' +
			'<tr class="hidden"><td>Armor:</td>' +
				'<td title="LDarmorValue">0</td></tr>' +
			'<tr class="hidden"><td>Damage:</td>' +
				'<td title="LDdamageValue">0</td></tr>' +
			'<tr class="hidden"><td>HP:</td>' +
				'<td title="LDhpValue">0</td></tr>' +
			'<tr class="hidden"><td>LDProcessed:</td>' +
				'<td title="LDProcessed">0</td></tr>' +
			'<tr class="hidden"><td>LDFlinchLevel:</td>' +
				'<td title="LDFlinchLevel">0</td></tr>' +
			'<tr class="hidden"><td>LDConstitutionLevel:</td>' +
				'<td title="LDConstitutionLevel">0</td></tr>' +
			'<tr class="hidden"><td>LDNightmareVisageLevel:</td>' +
				'<td title="LDNightmareVisageLevel">0</td></tr>' +
			'<tr class="hidden"><td>LDFortitudeLevel:</td>' +
				'<td title="LDFortitudeLevel">0</td></tr>' +
			'<tr class="hidden"><td>LDChiStrikeLevel:</td>' +
				'<td title="LDChiStrikeLevel">0</td></tr>' +
			'<tr class="hidden"><td>LDTerrorizeLevel:</td>' +
				'<td title="LDTerrorizeLevel">0</td></tr>' +
			'<tr class="hidden"><td>LDSanctuaryLevel:</td>' +
				'<td title="LDSanctuaryLevel">0</td></tr>' +
			'<tr><td colspan="2" class="headr">Other Defender Stats</td></tr>' +
			'<tr><td class="brn">Raw Attack:</td>' +
				'<td class="grey" title="attackValue">0</td></tr>' +
			'<tr><td class="brn">Attack w/ buffs:</td>' +
				'<td title="attackValueBuffed">0</td></tr>' +
			'<tr><td class="brn">Raw Defense:</td>' +
				'<td class="grey" title="defenseValue">0</td></tr>' +
			'<tr><td class="brn">Defense w/buffs:</td>' +
				'<td title="defenseValueBuffed">0</td></tr>' +
			'<tr><td class="brn">Raw Armor:</td>' +
				'<td title="armorValue">0</td></tr>' +
			'<tr><td class="brn">Armor w/ buffs:</td>' +
				'<td title="armorValueBuffed">0</td></tr>' +
			'<tr><td class="brn">Raw Damage:</td>' +
				'<td class="grey" title="damageValue">0</td></tr>' +
			'<tr><td class="brn">Damage w/ buffs:</td>' +
				'<td title="damageValueBuffed">0</td></tr>' +
			'<tr><td class="brn">Raw HP:</td>' +
				'<td class="grey" title="hpValue">0</td></tr>' +
			'<tr><td class="brn">HP w/ buffs:</td>' +
				'<td title="hpValueBuffed">0</td></tr>' +
			'<tr><td class="brn">Processed:</td>' +
				'<td title="defendersProcessed">0</td></tr>' +
			'<tr><td class="headr" colspan=2>Adjusted defense values:</td></tr>' +
			'<tr><td class="brn">DC225:</td>' +
				'<td title="DC225">0</td></tr>' +
			'<tr><td class="brn">DC175:</td>' +
				'<td title="DC175">0</td></tr>' +
			'<tr><td class="headr" colspan=2>Attacking Group Stats:</td></tr>' +
			'<tr><td class="brn">Raw Group Attack:</td>' +
				'<td class="grey" title="GroupAttack"></td></tr>' +
			'<tr><td class="brn">Group Attack w/ buffs:</td>' +
				'<td title="GroupAttackBuffed"></td></tr>' +
			'<tr><td class="brn">Raw Group Defense:</td>' +
				'<td class="grey" title="GroupDefense"></td></tr>' +
			'<tr><td class="brn">Group Defense w/ buffs:</td>' +
				'<td title="GroupDefenseBuffed"></td></tr>' +
			'<tr><td class="brn">Raw Group Armor:</td>' +
				'<td title="GroupArmor"></td></tr>' +
			'<tr><td class="brn">Group Armor w/ buffs:</td>' +
				'<td title="GroupArmorBuffed"></td></tr>' +
			'<tr><td class="brn">Raw Group Damage:</td>' +
				'<td class="grey" title="GroupDamage"></td></tr>' +
			'<tr><td class="brn">Group Damage w/ buffs:</td>' +
				'<td title="GroupDamageBuffed"></td></tr>' +
			'<tr><td class="brn">Raw Group HP:</td>' +
				'<td class="grey" title="GroupHP"></td></tr>' +
			'<tr><td class="brn">Group HP w/ buffs:</td>' +
				'<td title="GroupHPBuffed"></td></tr>' +
			'<tr><td class="headr" colspan=2>Processing:</td></tr>' +
			'<tr><td style="color:green;" colspan="2" title="ProcessingStatus">Parsing defending guild stats ...</td></tr>' +
			'<tr><td class="headr" colspan=2>Assumptions:</td></tr>' +
			'<tr><td colspan="2" class="grey">Above calculations include Constitution, Fortitude, Nightmare Visage, Chi Strike, Terrorize and Flinch bonus calculations (in that order) on both the defending group and attacking group.</td></tr>';

		if (defendingGuildID === myGuildID && !hideRelicOffline) {
			validMemberString = validMemberString.slice(0, -1);
			var validMemberArray = validMemberString.split(' ');
			validMemberArray.forEach(function(val, ind, arr) {
				if (membrList[val]) {
					arr[ind] = '<a style="color:red;" href="index.php?cmd=' +
						'profile&player_id=' + membrList[val].id + '">' +
						val + '</a>';
				}
			});
			validMemberString = validMemberArray.join(' ');

			textToInsert += '<tr><td class="headr" colspan=2>Offline guild members not at relic:</td></tr>' +
				'<tr title="offlinePlayerListControl"><td colspan=2 style="color:red;" title="offlinePlayerList">' + validMemberString + '</td></tr>' +
				'<tr class="hidden"><td class="brn">OfflinePlayerCount:</td><td title="offlinePlayerCount">' + validMemberArray.length + '</td></tr>' +
				'<tr class="hidden"><td class="brn">OfflinePlayersProcessed:</td><td title="offlinePlayersProcessed">0</td></tr>' +
				'<tr class="hidden" title="offlinePlayerListControlTemp" style="display:block;"><td style="color:green;" colspan=2>Checking offline status ...</td></tr>';
		}
		textToInsert += '</table><td><tr>';
		extraTextInsertPoint.innerHTML += textToInsert;
	},

	getRelicGuildData: function(extraTextInsertPoint, hrefpointer) {
		FSH.System.xmlhttp(hrefpointer, FSH.Helper.parseRelicGuildData);
	},

	parseRelicGuildData: function(responseText) {
		var doc = FSH.System.createDocument(responseText);
		var relicCount = $('div#pCC table table table img[data-tipped*="' +
			'Relic Bonuses"]', doc).length;
		var relicCountElement = $('td[title="relicCount"]');
		relicCountElement.html(relicCount);
		var relicProcessedElement = $('td[title="relicProcessed"]');
		relicProcessedElement.html(1);
		FSH.Helper.syncRelicData();
	},

	getRelicPlayerData: function(defenderCount, hrefpointer, pl) {
		if (defenderCount === 0) {
			FSH.System.xmlhttp(
				hrefpointer,
				FSH.Helper.parseRelicPlayerData,
				{'defenderCount': defenderCount}
			);
		} else {
			$.ajax({
				cache: false,
				dataType: 'json',
				url:'index.php',
				data: {
					'cmd': 'export',
					'subcmd': 'profile',
					'player_username': pl
				},
				success: function(data) {
					FSH.Helper.parseRelicPlayerData(data, {'defenderCount': defenderCount});
				}
			});
		}
	},

	parseRelicPlayerData: function(responseText, callback) {
		var defenderMultiplier;
		var attackValue;
		var defenseValue;
		var overallDefense;
		var armorValue;
		var damageValue;
		var hpValue;
		var defendersProcessed;
		var defendersProcessedNumber;
		var attackNumber;
		var defenseNumber;
		var armorNumber;
		var damageNumber;
		var hpNumber;

		var defenderCount = callback.defenderCount;

		var player = FSH.Helper.playerData(responseText);

		if (defenderCount !== 0) {
			defenderMultiplier = 0.2;
			attackValue = $('td[title="attackValue"]');
			attackNumber = FSH.System.intValue(attackValue.html());
			attackValue.html(FSH.System.addCommas(attackNumber + Math.round(player.attackValue*defenderMultiplier)));
			defenseValue = $('td[title="defenseValue"]');
			defenseNumber = FSH.System.intValue(defenseValue.html());
			overallDefense = defenseNumber + Math.round(player.defenseValue*defenderMultiplier);
			defenseValue.html(FSH.System.addCommas(overallDefense));
			armorValue = $('td[title="armorValue"]');
			armorNumber = FSH.System.intValue(armorValue.html());
			armorValue.html(FSH.System.addCommas(armorNumber + Math.round(player.armorValue*defenderMultiplier)));
			damageValue = $('td[title="damageValue"]');
			damageNumber = FSH.System.intValue(damageValue.html());
			damageValue.html(FSH.System.addCommas(damageNumber + Math.round(player.damageValue*defenderMultiplier)));
			hpValue = $('td[title="hpValue"]');
			hpNumber = FSH.System.intValue(hpValue.html());
			hpValue.html(FSH.System.addCommas(hpNumber + Math.round(player.hpValue*defenderMultiplier)));
			defendersProcessed = $('td[title="defendersProcessed"]');
			defendersProcessedNumber = FSH.System.intValue(defendersProcessed.html());
			defendersProcessed.html(FSH.System.addCommas(defendersProcessedNumber + 1));
		}
		else {
			FSH.Helper.leadDefender(player);
		}
		FSH.Helper.syncRelicData();
	},

	syncRelicData: function() {
		var defendersProcessed = $('td[title="defendersProcessed"]');
		var defendersProcessedNumber = FSH.System.intValue(defendersProcessed
			.html());
		var relicProcessedValue = $('td[title="relicProcessed"]');
		if (FSH.Helper.relicDefenderCount === defendersProcessedNumber &&
			relicProcessedValue.html() === '1') {
			FSH.Helper.processRelicStats();
		}
	},

	leadDefender: function(player) {
		//get lead defender (LD) buffs here for use later ... 
		var attackValue = $('td[title="LDattackValue"]');
		var attackNumber = FSH.System.intValue(attackValue.html());
		attackValue.html(FSH.System.addCommas(attackNumber + Math.round(player.attackValue)));
		var defenseValue = $('td[title="LDdefenseValue"]');
		var defenseNumber = FSH.System.intValue(defenseValue.html());
		defenseValue.html(FSH.System.addCommas(defenseNumber + Math.round(player.defenseValue)));
		var armorValue = $('td[title="LDarmorValue"]');
		var armorNumber=FSH.System.intValue(armorValue.html());
		armorValue.html(FSH.System.addCommas(armorNumber + Math.round(player.armorValue)));
		var damageValue = $('td[title="LDdamageValue"]');
		var damageNumber=FSH.System.intValue(damageValue.html());
		damageValue.html(FSH.System.addCommas(damageNumber + Math.round(player.damageValue)));
		var hpValue = $('td[title="LDhpValue"]');
		var hpNumber=FSH.System.intValue(hpValue.html());
		hpValue.html(FSH.System.addCommas(hpNumber + Math.round(player.hpValue)));
		var defendersProcessed = $('td[title="defendersProcessed"]');
		var defendersProcessedNumber = FSH.System.intValue(defendersProcessed.html());
		defendersProcessed.html(FSH.System.addCommas(defendersProcessedNumber + 1));
		var LDProcessed = $('td[title="LDProcessed"]');
		LDProcessed.html(1);
		var storedConstitutionLevel = $('td[title="LDConstitutionLevel"]');
		storedConstitutionLevel.html(player.constitutionLevel);
		var storedFlinchLevel = $('td[title="LDFlinchLevel"]');
		storedFlinchLevel.html(player.flinchLevel);
		var storedNightmareVisageLevel = $('td[title="LDNightmareVisageLevel"]');
		storedNightmareVisageLevel.html(player.nightmareVisageLevel);
		var storedFortitudeLevel = $('td[title="LDFortitudeLevel"]');
		storedFortitudeLevel.html(player.fortitudeLevel);
		var storedChiStrikeLevel = $('td[title="LDChiStrikeLevel"]');
		storedChiStrikeLevel.html(player.chiStrikeLevel);
		var storedTerrorizeLevel = $('td[title="LDTerrorizeLevel"]');
		storedTerrorizeLevel.html(player.terrorizeLevel);
		var storedSanctuaryLevel = $('td[title="LDSanctuaryLevel"]');
		storedSanctuaryLevel.html(player.sanctuaryLevel);
	},

	processRelicStats: function() {
		var processingStatus = $('td[title="ProcessingStatus"]');
		processingStatus.html('Processing defending guild stats ... ');
		var relicCountValue = $('td[title="relicCount"]');
		var relicCount = FSH.System.intValue(relicCountValue.html());
		var relicMultiplier = 1;
		if (relicCount === 1) {
			relicMultiplier = 1.5;
		}
		else if (relicCount >= 2) {
			relicMultiplier = Math.round((1 - relicCount/10)*100)/100;
		}

		var LDConstitutionLevel = FSH.System.intValue($('td[title="LDConstitutionLevel"]').text());
		var LDNightmareVisageLevel = FSH.System.intValue($('td[title="LDNightmareVisageLevel"]').text());
		var LDFortitudeLevel = FSH.System.intValue($('td[title="LDFortitudeLevel"]').text());
		var LDChiStrikeLevel = FSH.System.intValue($('td[title="LDChiStrikeLevel"]').text());
		var LDSanctuaryLevel = FSH.System.intValue($('td[title="LDSanctuaryLevel"]').text());
		var attackValue = $('td[title="attackValue"]');
		var attackValueBuffed = $('td[title="attackValueBuffed"]');
		var LDattackValue = $('td[title="LDattackValue"]');
		var attackNumber = FSH.System.intValue(attackValue.html());
		var LDattackNumber = FSH.System.intValue(LDattackValue.html());
		var overallAttack = attackNumber + Math.round(LDattackNumber*relicMultiplier);
		attackValue.html(FSH.System.addCommas(overallAttack));
		var nightmareVisageEffect = Math.ceil(overallAttack*(LDNightmareVisageLevel * 0.0025));
		attackValueBuffed.html(FSH.System.addCommas(overallAttack - nightmareVisageEffect));
		var defenseValue = $('td[title="defenseValue"]');
		var defenseValueBuffed = $('td[title="defenseValueBuffed"]');
		var LDdefenseValue = $('td[title="LDdefenseValue"]');
		var defenseNumber = FSH.System.intValue(defenseValue.html());
		var LDdefenseNumber = FSH.System.intValue(LDdefenseValue.html());
		var overallDefense = defenseNumber + Math.round(LDdefenseNumber*relicMultiplier);
		defenseValue.html(FSH.System.addCommas(overallDefense));
		var defenseWithConstitution = Math.ceil(overallDefense * (1 + LDConstitutionLevel * 0.001));
		var totalDefense = defenseWithConstitution + nightmareVisageEffect;
		defenseValueBuffed.html(FSH.System.addCommas(totalDefense));
		var dc225 = $('td[title="DC225"]');
		var dc175 = $('td[title="DC175"]');
		dc225.html(FSH.System.addCommas(Math.ceil(totalDefense * (1 - 225 * 0.002))));
		dc175.html(FSH.System.addCommas(Math.ceil(totalDefense * (1 - 175 * 0.002))));
		var armorValue = $('td[title="armorValue"]');
		var armorValueBuffed = $('td[title="armorValueBuffed"]');
		var LDarmorValue = $('td[title="LDarmorValue"]');
		var armorNumber = FSH.System.intValue(armorValue.html());
		var LDarmorNumber = FSH.System.intValue(LDarmorValue.html());
		var totalArmor = armorNumber + Math.round(LDarmorNumber*relicMultiplier);
		armorValue.html(FSH.System.addCommas(totalArmor));
		armorValueBuffed.html(FSH.System.addCommas(totalArmor + Math.floor(totalArmor * LDSanctuaryLevel * 0.001)));
		var damageValue = $('td[title="damageValue"]');
		var damageValueBuffed = $('td[title="damageValueBuffed"]');
		var LDdamageValue = $('td[title="LDdamageValue"]');
		var damageNumber = FSH.System.intValue(damageValue.html());
		var LDdamageNumber = FSH.System.intValue(LDdamageValue.html());
		var hpValue = $('td[title="hpValue"]');
		var hpValueBuffed = $('td[title="hpValueBuffed"]');
		var LDhpValue = $('td[title="LDhpValue"]');
		var hpNumber = FSH.System.intValue(hpValue.html());
		var LDhpNumber = FSH.System.intValue(LDhpValue.html());
		var fortitudeBonusHP = Math.ceil(defenseWithConstitution * LDFortitudeLevel * 0.001);
		var chiStrikeBonusDamage = Math.ceil((hpNumber + Math.round(LDhpNumber*relicMultiplier) + fortitudeBonusHP) * LDChiStrikeLevel * 0.001);
		damageValue.html(FSH.System.addCommas(damageNumber + Math.round(LDdamageNumber*relicMultiplier)));
		damageValueBuffed.html(FSH.System.addCommas(damageNumber + Math.round(LDdamageNumber*relicMultiplier) + chiStrikeBonusDamage));
		hpValue.html(FSH.System.addCommas(hpNumber + Math.round(LDhpNumber*relicMultiplier)));
		hpValueBuffed.html(FSH.System.addCommas(hpNumber + Math.round(LDhpNumber*relicMultiplier) + fortitudeBonusHP));
		var LDpercentageValue = $('td[title="LDPercentage"]');
		LDpercentageValue.html(relicMultiplier*100 + '%');

		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=groups', FSH.Helper.relicCheckIfGroupExists);
	},

	relicCheckIfGroupExists: function(responseText) {
		var processingStatus = $('td[title="ProcessingStatus"]');
		processingStatus.html('Checking attacking group ... ');
		var doc=FSH.System.createDocument(responseText);
		var groupExistsIMG = $(doc).find('img[title="Disband Group (Cancel Attack)"]');
		if (groupExistsIMG.length > 0) {
			var groupHref = groupExistsIMG.parents('td:first').find('a:first').attr('href');
			FSH.System.xmlhttp(groupHref, FSH.Helper.getRelicGroupData);
		} else {
			processingStatus.html('Done.');
		}
	},

	getRelicGroupData: function(responseText) {
		var processingStatus = $('td[title="ProcessingStatus"]');
		processingStatus.html('Parsing attacking group stats ... ');
		var doc = FSH.System.createDocument(responseText);
		var theTable = $('div#pCC table table table', doc);
		FSH.Helper.relicGroupAttackValue = FSH.System.intValue($('td#stat-attack',
			theTable).text());
		FSH.Helper.relicGroupDefenseValue = FSH.System.intValue($('td#stat-defense',
			theTable).text());
		FSH.Helper.relicGroupArmorValue = FSH.System.intValue($('td#stat-armor',
			theTable).text());
		FSH.Helper.relicGroupDamageValue = FSH.System.intValue($('td#stat-damage',
			theTable).text());
		FSH.Helper.relicGroupHPValue = FSH.System.intValue($('td#stat-hp',
			theTable).text());
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=mercs', FSH.Helper.parseRelicMercStats);
	},

	parseRelicMercStats: function(responseText) {
		//merc stats do not count for group stats so subtract them here ...
		var processingStatus = $('td[title="ProcessingStatus"]');
		processingStatus.html('Subtracting group merc stats ... ');

		var mercPage = FSH.System.createDocument(responseText);
		var mercElements = mercPage.getElementsByTagName('IMG');
		var totalMercAttack = 0;
		var totalMercDefense = 0;
		var totalMercArmor = 0;
		var totalMercDamage = 0;
		var totalMercHP = 0;
		var merc;
		for (var i=0; i<mercElements.length; i += 1) {
			merc = mercElements[i];
			var mouseoverText = $(merc).data('tipped');
			var src = merc.getAttribute('src');
			if (mouseoverText && src.search('/merc/') !== -1){
				var attackRE=/<td>Attack:<\/td><td>(\d+)<\/td>/;
				var mercAttackValue = attackRE.exec(mouseoverText)[1]*1;
				totalMercAttack += mercAttackValue;
				var defenseRE=/<td>Defense:<\/td><td>(\d+)<\/td>/;
				var mercDefenseValue = defenseRE.exec(mouseoverText)[1]*1;
				totalMercDefense += mercDefenseValue;
				var armorRE=/<td>Armor:<\/td><td>(\d+)<\/td>/;
				var mercArmorValue = armorRE.exec(mouseoverText)[1]*1;
				totalMercArmor += mercArmorValue;
				var damageRE=/<td>Damage:<\/td><td>(\d+)<\/td>/;
				var mercDamageValue = damageRE.exec(mouseoverText)[1]*1;
				totalMercDamage += mercDamageValue;
				var hpRE=/<td>HP:<\/td><td>(\d+)<\/td>/;
				var mercHPValue = hpRE.exec(mouseoverText)[1]*1;
				totalMercHP += mercHPValue;
			}
		}
		FSH.Helper.relicGroupAttackValue = FSH.Helper.relicGroupAttackValue - Math.round(totalMercAttack*0.2);
		FSH.Helper.relicGroupDefenseValue = FSH.Helper.relicGroupDefenseValue - Math.round(totalMercDefense*0.2);
		FSH.Helper.relicGroupArmorValue = FSH.Helper.relicGroupArmorValue - Math.round(totalMercArmor*0.2);
		FSH.Helper.relicGroupDamageValue = FSH.Helper.relicGroupDamageValue - Math.round(totalMercDamage*0.2);
		FSH.Helper.relicGroupHPValue = FSH.Helper.relicGroupHPValue - Math.round(totalMercHP*0.2);

		FSH.System.xmlhttp('index.php?cmd=profile', FSH.Helper.getRelicPlayerBuffs);
	},

	getRelicPlayerBuffs: function(responseText) {
		var processingStatus = $('td[title="ProcessingStatus"]');
		processingStatus.html('Processing attacking group stats ... ');

		var player = FSH.Helper.playerData(responseText);
		var groupAttackElement = $('td[title="GroupAttack"]');
		var groupAttackBuffedElement = $('td[title="GroupAttackBuffed"]');
		groupAttackElement.html(FSH.System.addCommas(FSH.Helper.relicGroupAttackValue));
		var nightmareVisageEffect = Math.ceil(FSH.Helper.relicGroupAttackValue *
			(player.nightmareVisageLevel * 0.0025));
		FSH.Helper.relicGroupAttackValue = FSH.Helper.relicGroupAttackValue -
			nightmareVisageEffect;
		var storedFlinchLevel = FSH.System.intValue($('td[title="LDFlinchLevel"]')
			.text());
		var storedFlinchEffectValue = Math.ceil(FSH.Helper.relicGroupAttackValue *
			storedFlinchLevel * 0.001);
		groupAttackBuffedElement.html(FSH.System.addCommas(
			FSH.Helper.relicGroupAttackValue - storedFlinchEffectValue));
		var defenseWithConstitution = Math.ceil(FSH.Helper.relicGroupDefenseValue *
			(1 + player.constitutionLevel * 0.001));
		var totalDefense = defenseWithConstitution + nightmareVisageEffect;
		var groupDefenseElement = $('td[title="GroupDefense"]');
		var groupDefenseBuffedElement = $('td[title="GroupDefenseBuffed"]');
		groupDefenseElement.html(FSH.System.addCommas(
			FSH.Helper.relicGroupDefenseValue));
		groupDefenseBuffedElement.html(FSH.System.addCommas(totalDefense));
		var groupArmorElement = $('td[title="GroupArmor"]');
		var groupArmorBuffedElement = $('td[title="GroupArmorBuffed"]');
		groupArmorElement.html(FSH.System.addCommas(FSH.Helper.relicGroupArmorValue));
		groupArmorBuffedElement.html(FSH.System.addCommas(
			FSH.Helper.relicGroupArmorValue +
			Math.floor(FSH.Helper.relicGroupArmorValue * player.sanctuaryLevel *
			0.001)));
		var groupDamageElement = $('td[title="GroupDamage"]');
		var groupDamageBuffedElement = $('td[title="GroupDamageBuffed"]');
		var groupHPElement = $('td[title="GroupHP"]');
		var groupHPBuffedElement = $('td[title="GroupHPBuffed"]');
		var fortitudeBonusHP = Math.ceil(defenseWithConstitution *
			player.fortitudeLevel * 0.001);
		var chiStrikeBonusDamage = Math.ceil((FSH.Helper.relicGroupHPValue +
			fortitudeBonusHP) * player.chiStrikeLevel * 0.001);
		var storedTerrorizeLevel = FSH.System.intValue(
			$('td[title="LDTerrorizeLevel"]').text());
		var storedTerrorizeEffectValue = Math.ceil(
			FSH.Helper.relicGroupDamageValue * storedTerrorizeLevel * 0.001);
		groupDamageElement.html(FSH.System.addCommas(FSH.Helper.relicGroupDamageValue));
		groupDamageBuffedElement.html(FSH.System.addCommas(
			FSH.Helper.relicGroupDamageValue + chiStrikeBonusDamage -
			storedTerrorizeEffectValue));
		groupHPElement.html(FSH.System.addCommas(FSH.Helper.relicGroupHPValue));
		groupHPBuffedElement.html(FSH.System.addCommas(FSH.Helper.relicGroupHPValue +
			fortitudeBonusHP));

		//Effect on defending group from Flinch on attacking group.
		var defGuildBuffedAttackElement = $('td[title="attackValueBuffed"]');
		var defGuildBuffedAttackValue = FSH.System.intValue(
			defGuildBuffedAttackElement.text());
		var flinchEffectValue = Math.ceil(defGuildBuffedAttackValue *
			player.flinchLevel * 0.001);
		defGuildBuffedAttackElement.html(FSH.System.addCommas(
			defGuildBuffedAttackValue - flinchEffectValue));
		var defGuildBuffedDamageElement = $('td[title="damageValueBuffed"]');
		var defGuildBuffedDamageValue = FSH.System.intValue(
			defGuildBuffedDamageElement.text());
		var terrorizeEffectValue = Math.ceil(defGuildBuffedDamageValue *
			player.terrorizeLevel * 0.001);
		defGuildBuffedDamageElement.html(FSH.System.addCommas(
			defGuildBuffedDamageValue - terrorizeEffectValue));

		processingStatus.html('Done.');
	},

	position: function() {
		var result = {};
		if (FSH.Helper.page==='world/map/-(-)') {
			var playerTile=FSH.System.findNode('//img/ancestor::td[@background]');
			result.X=playerTile.cellIndex;
			result.Y=playerTile.parentNode.rowIndex;
			result.type='worldmap';
		}
		else {
			var posit = FSH.System.findNode('//h3[@id="world-realm-name"]');
			if (!posit) {return;}
			var thePosition=posit.innerHTML;
			var positionRE=/\((\d+),\s*(\d+)\)/;
			var positionX = parseInt(thePosition.match(positionRE)[1],10);
			var positionY = parseInt(thePosition.match(positionRE)[2],10);
			result.X=positionX;
			result.Y=positionY;
			result.type='normal';
		}
		return result;
	},

	mapThis: function() {
		if (!FSH.System.getValue('footprints')) {return;}
		var realmId;
		var levelName;
		var realm = FSH.System.findNode('//h3[@id="world-realm-name"]');
		if ($('h3#world-realm-name').data('realm')) {
			realmId = $('h3#world-realm-name').data('realm').id.trim();
			levelName = $('h3#world-realm-name').data('realm').name.trim();
		}
		var posit = FSH.Helper.position();
		if (realm && posit) {
			if (!levelName) {levelName=realm.innerHTML;}
			FSH.Helper.levelName = levelName;
			var theMap = FSH.System.getValueJSON('map');
			if (!theMap) {
				theMap = {};
				theMap.levels = {};
			}
			if (!theMap.levels[levelName]) {theMap.levels[levelName] = {};}
			if (!theMap.levels[levelName][posit.X]) {
				theMap.levels[levelName][posit.X]={};
			}
			theMap.levels[levelName][posit.X][posit.Y]='!';
			FSH.System.setValueJSON('map', theMap);
		}
	},

	showMap: function(isLarge) {
		if (!FSH.System.getValue('footprints')) {return;}
		if (isLarge) {
			var realm = FSH.System.findNode('//b');
			FSH.Helper.levelName = realm.textContent.replace(' Map Overview', '');
		}
		var theMap = FSH.System.getValueJSON('map');
		var displayedMap = FSH.System.findNode(isLarge ? '//table[@width]' : '//table[@width="200"]');
		if (!displayedMap) {return;}
		var footprintsColor = FSH.System.getValue('footprintsColor');
		var posit = FSH.Helper.position();

		for (var y = 0; y < displayedMap.rows.length; y += 1) {
			var aRow = displayedMap.rows[y];
			for (var x = 0; x < aRow.cells.length; x += 1) {
				var aCell = aRow.cells[x];
				var dx = isLarge ? x : posit.X + (x - 2);
				var dy = isLarge ? y : posit.Y + (y - 2);
				if (theMap.levels[FSH.Helper.levelName] &&
					theMap.levels[FSH.Helper.levelName][dx] &&
					theMap.levels[FSH.Helper.levelName][dx][dy] &&
					theMap.levels[FSH.Helper.levelName][dx][dy] === '!') {

					if (x !== (isLarge ? posit.X : 2) || y !== (isLarge ? posit.Y : 2)) {
						aCell.style.color = footprintsColor;
						if (aCell.innerHTML.indexOf('table') > 0) {
							aCell
								.firstChild
								.firstChild
								.firstChild
								.firstChild
								.firstChild
								.innerHTML +='**';
						} else {
							aCell.innerHTML+='**';
						}
					}
				}
			}
		}
	},

	stringSort: function(a,b) {
		var result=0;
		a = FSH.Helper.path(a, FSH.Helper.sortBy, 'a');
		b = FSH.Helper.path(b, FSH.Helper.sortBy, 'a');
		if (a.toLowerCase()<b.toLowerCase()) {result=-1;}
		if (a.toLowerCase()>b.toLowerCase()) {result=+1;}
		if (!FSH.Helper.sortAsc) {result=-result;}
		return result;
	},

	numberSort: function(a,b) {
		var result=0;
		if(typeof a.type !== undefined){
			if(a.type > 8) {return 1;} //non equipment items
			if(b.type > 8) {return -1;}
		}
		var valueA = FSH.Helper.path(a, FSH.Helper.sortBy, 1);
		var valueB = FSH.Helper.path(b, FSH.Helper.sortBy, 1);
		if (typeof valueA==='string') {
			valueA=parseInt(valueA.replace(/,/g,'').replace(/#/g,''),10);
		}
		if (typeof valueB==='string') {
			valueB=parseInt(valueB.replace(/,/g,'').replace(/#/g,''),10);
		}
		result = valueA-valueB;
		if (!FSH.Helper.sortAsc) {result=-result;}
		return result;
	},

	path: function(obj, path, def){
		path = path.split('.');
		var len = path.length;
		for (var i = 0; i < len; i+=1) {
			if (!obj || typeof obj !== 'object') {return def;}
			obj = obj[path[i]];
		}
		if (obj === undefined) {return def;}
		return obj;
	},

	oldRemoveBuffs: function() {
		var buffName;
		//code to remove buffs but stay on the same screen
		var currentBuffs = FSH.System.findNodes('//a[contains(@href,"index.php?' +
			'cmd=profile&subcmd=removeskill&skill_id=")]');
		var buffHash={};
		if (!currentBuffs) {return buffHash;}
		for (var i=0;i<currentBuffs.length;i += 1) {
			var currentBuff = currentBuffs[i];
			var buffHref = currentBuff.getAttribute('href');
			var buffTest = /remove\sthe\s([ a-zA-Z]+)\sskill/
				.exec(currentBuff.getAttribute('onclick'));
			if (buffTest) {
				buffName = buffTest[1];
			} else {
				buffTest = /remove\sthe\s([ a-zA-Z]+)<br>/
					.exec(currentBuff.getAttribute('onclick'));
				if (buffTest) { buffName = buffTest[1];
				} else {console.log('Error getting buff');}
			}
			buffHash[buffName]=true;
			var imageHTML = currentBuff.innerHTML;
			var buffCell = currentBuff.parentNode;
			var buffHTML = buffCell.innerHTML;
			var lastPart = buffHTML
				.substring(buffHTML.indexOf('</a>')+4, buffHTML.length);
			var newCellContents = '<span id="Helper:removeSkill' + i + 
				'" style="cursor:pointer;" buffName="' + buffName + 
				'" buffHref="' + buffHref + '">' + imageHTML +
				'</span>' + lastPart;
			buffCell.innerHTML = newCellContents;
			buffCell.firstChild
				.addEventListener('click', FSH.Helper.removeSkill, true);
		}
		return buffHash;
	},

	checkBuffs: function() {
		var onmouseover;
		var impsRemaining;
		var textToTest;
		var impsRemainingRE;
		var counterAttackLevel;
		var doublerLevel;

		var buffHash = FSH.Helper.oldRemoveBuffs();

		//extra world screen text
		var replacementText = '<td background="' + FSH.System.imageServer +
			'/skin/realm_right_bg.jpg"><table align="right" cellpadding="1" ' +
			'style="width:270px;margin-left:38px;margin-right:38px;font-size' +
			':medium; border-spacing: 1px; border-collapse: collapse;"><tr><' +
			'td colspan="2" height="10"></td></tr><tr>';
		var hasShieldImp = FSH.System
			.findNode('//img[contains(@src,"/55_sm.gif")]');
		var hasDeathDealer = FSH.System
			.findNode('//img[contains(@src,"/50_sm.gif")]');
		if (hasDeathDealer || hasShieldImp) {
			var re=/(\d+) HP remaining/;
			impsRemaining = 0;
			if (hasShieldImp) {
				textToTest = $(hasShieldImp).data('tipped');
				impsRemainingRE = re.exec(textToTest);
				impsRemaining = impsRemainingRE[1];
			}
			var applyImpWarningColor = ' style="color:green; ' +
				'font-size:medium;"';
			if (impsRemaining===2){
				applyImpWarningColor = ' style="color:Orangered; font-size:' +
					'medium; font-weight:bold;"';
			}
			if (impsRemaining===1){
				applyImpWarningColor = ' style="color:Orangered; font-size:' +
					'large; font-weight:bold"';
			}
			if (impsRemaining===0){
				applyImpWarningColor = ' style="color:red; font-size:large;' +
					' font-weight:bold"';
			}
			replacementText += '<tr><td' + applyImpWarningColor +
				'>Shield Imps Remaining: ' +  impsRemaining +
				(impsRemaining === 0 ?
				'&nbsp;<span id="Helper:recastImpAndRefresh" style="color:' +
				'blue;cursor:pointer;text-decoration:underline;font-size:' +
				'xx-small;">Recast</span>':'') + '</td></tr>';
			if (hasDeathDealer) {
				replacementText += FSH.Helper.doDeathDealer(impsRemaining);
			}
		}
		var hasCounterAttack = FSH.System
			.findNode('//img[contains(@src,"/54_sm.gif")]');
		if (hasCounterAttack) {
			if (hasCounterAttack.getAttribute('src')
				.search('/skills/') !== -1) {
				onmouseover = $(hasCounterAttack).data('tipped');
				var counterAttackRE = /<b>Counter Attack<\/b> \(Level: (\d+)\)/;
				var counterAttack = counterAttackRE.exec(onmouseover);
				if (counterAttack) {
					counterAttackLevel = counterAttack[1];
				}
			}
			replacementText += '<tr><td style="font-size:small; color:' +
				'blue">CA' + counterAttackLevel + ' active</td></tr>';
		}
		var hasDoubler = FSH.System.findNode('//img[contains(@src,"/26_sm.gif")]');
		if (hasDoubler) {
			if (hasDoubler.getAttribute('src').search('/skills/') !== -1) {
				onmouseover = $(hasDoubler).data('tipped');
				var doublerRE = /<b>Doubler<\/b> \(Level: (\d+)\)/;
				var doubler = doublerRE.exec(onmouseover);
				if (doubler) {
					doublerLevel = doubler[1];
				}
			}
			if (doublerLevel === 200) {
				replacementText += '<tr><td style="font-size:small; color:' +
					'red">Doubler ' + doublerLevel + ' active</td></tr>';
			}
		}
		var huntingMode = FSH.Helper.huntingMode;
		replacementText += huntingMode === true ? '<tr><td style="font-size:' +
			'small; color:red">Hunting mode enabled</td></tr>':'';
		replacementText += '<tr><td colspan="2" height="10"></td></tr>';
		if (FSH.System.getValue('showHuntingBuffs')) {
			var enabledHuntingMode=FSH.System.getValue('enabledHuntingMode');
			var buffs=FSH.System.getValue('huntingBuffs');
			var buffsName=FSH.System.getValue('huntingBuffsName');
			if (enabledHuntingMode === 2) {
				buffs=FSH.System.getValue('huntingBuffs2');
				buffsName=FSH.System.getValue('huntingBuffs2Name');
			}
			if (enabledHuntingMode === 3) {
				buffs=FSH.System.getValue('huntingBuffs3');
				buffsName=FSH.System.getValue('huntingBuffs3Name');
			}
			var buffAry=buffs.split(',');
			var missingBuffs = [];
			for (var i=0;i<buffAry.length;i += 1) {
				if (!buffHash[buffAry[i].trim()]) {
					missingBuffs.push(buffAry[i]);
				}
			}
			if (missingBuffs.length>0) {
				replacementText += '<tr><td colspan="2" align="center"><' +
					'span style="font-size:x-small; color:navy;">You are ' +
					'missing some ' + buffsName + ' hunting buffs<br/>(';
				replacementText += missingBuffs.join(', ');
				replacementText += ')</span></td></tr>';
			}
			replacementText += '<tr><td colspan="2" height="10"></td></tr>';
			replacementText += '</table>';
		}
		replacementText += '</td>' ;

		var injectHere = FSH.System.findNode('//div[table[@class="centered" ' +
			'and @style="width: 270px;"]]');
		if (!injectHere) {return;}
		//insert after kill all monsters image and text
		var newSpan = document.createElement('DIV');
		newSpan.innerHTML=replacementText;
		injectHere.appendChild(newSpan);

		if ((hasDeathDealer || hasShieldImp) && impsRemaining ===0) {
			var recastImpAndRefresh = document
				.getElementById('Helper:recastImpAndRefresh');
			var impHref = 'index.php?cmd=quickbuff&subcmd=activate&target' +
				'Players=' +
				$('dt.stat-name:first').next().text().replace(/,/g,'') +
				'&skills%5B%5D=55';
			recastImpAndRefresh.addEventListener('click', function() {
				FSH.System.xmlhttp(impHref, FSH.Helper.recastImpAndRefresh, true);
			},true);
		}

		FSH.Helper.toggleKsTracker();
	},

	doDeathDealer: function(impsRemaining) {
		var replacementText = '';

		var lastDeathDealerPercentage =
			FSH.System.getValue('lastDeathDealerPercentage');
		if (lastDeathDealerPercentage === undefined) {
			FSH.System.setValue('lastDeathDealerPercentage', 0);
			lastDeathDealerPercentage = 0;
		}

		var lastKillStreak = FSH.System.getValue('lastKillStreak');
		if (lastKillStreak === undefined) {
			FSH.System.setValue('lastKillStreak', 0);
			lastKillStreak = 0;
		}

		var trackKillStreak = FSH.System.getValue('trackKillStreak');

		if (impsRemaining > 0 && lastDeathDealerPercentage === 20) {
			replacementText += '<tr><td style="font-size:small; color:black"' +
				'>Kill Streak: <span findme="killstreak">&gt;' +
				FSH.System.addCommas(lastKillStreak) + '</span> Damage bonus: <' +
				'span findme="damagebonus">20</span>%</td></tr>';
		} else {
			if (!trackKillStreak) {
				replacementText += '<tr><td style="font-size:small; color:' +
					'navy" nowrap>KillStreak tracker disabled. <span style="' +
					'font-size:xx-small">Track: <span id=Helper:toggleKS' +
					'tracker style="color:navy;cursor:pointer;text-' +
					'decoration:underline;" title="Click to toggle">' +
					(trackKillStreak ? 'ON' : 'off') +
					'</span></span></td></tr>';
			} else {
				replacementText += '<tr><td style="font-size:small; color:' +
					'navy" nowrap>KillStreak: <span findme="killstreak">' +
					FSH.System.addCommas(lastKillStreak) + '</span> Damage bonus' +
					': <span findme="damagebonus">' +
					Math.round(lastDeathDealerPercentage * 100) / 100 +
					'</span>%&nbsp;<span style="font-size:xx-small">Track: ' +
					'<span id=Helper:toggleKStracker style="color:navy;' +
					'cursor:pointer;text-decoration:underline;" title="Click' +
					' to toggle">' + (trackKillStreak ? 'ON' : 'off') +
					'</span></span></td></tr>';
				FSH.System.xmlhttp('index.php?cmd=profile', FSH.Helper.getKillStreak);
			}
		}
		return replacementText;
	},

	toggleKsTracker: function() {
		var trackKS = document.getElementById('Helper:toggleKStracker');
		if (trackKS) {
			trackKS.addEventListener('click', function() {
				FSH.System.setValue('trackKillStreak',
				FSH.System.getValue('trackKillStreak') ? false : true);
				location.reload();
			},true);
		}
	},

	recastImpAndRefresh: function(responseText) {
		var doc = FSH.System.createDocument(responseText);
		if (doc) {
			location.reload();
		}
	},

	removeSkill: function(evt) {
		var buffName = evt.target.parentNode.getAttribute('buffName');
		var buffHref = evt.target.parentNode.getAttribute('buffHref');
		if (confirm('Are you sure you wish to remove the ' + buffName +
			' skill?')) {
			FSH.System.xmlhttp(buffHref,
				function() {location.href = 'index.php?cmd=world';});
		}
	},

	toggleSound: function() {
		if (FSH.System.getValue('playNewMessageSound'))
		{
			FSH.System.setValue('playNewMessageSound', false);
		} else {
			FSH.System.setValue('playNewMessageSound', true);
		}
		location.reload();
	},

	isQuestBeingTracked: function(questHREF) {
		//quests are stored as their address after index.php: ?cmd=questbook....
		var questsBeingTracked = FSH.System.getValue('questBeingTracked').split(';');
		for (var i = 0; i < questsBeingTracked.length; i += 1) {
			if (questsBeingTracked[i] === questHREF) {
				return true;
			}
		}
		return false;
	},

	checkForNotCompletedQuests: function(responseText, callback) {
		//gets the maximum page number and goes through the pages.
		var doc=FSH.System.createDocument(responseText);
		var page = FSH.System.findNode('//td[contains(.,"Page:")]', doc);
		var maxPage = page.innerHTML.match(/of&nbsp;(\d*)/);


		if (maxPage && maxPage.length >= 2) {
			FSH.System.setValue('questsNotComplete', false);
			for (var i = 0; i < maxPage[1].replace(/of&nbsp;/g, ''); i += 1) {
				FSH.System.xmlhttp('index.php?cmd=questbook&subcmd=&subcmd2=&page=' + i + '&search_text=&mode=0&letter=*&sortby=min_level&sortbydir=0',
				FSH.Helper.checkForNotCompletedQuestRecurse,
				{'insertHere' : callback.insertHere});
			}
		}
	},

	checkForNotCompletedQuestRecurse: function(responseText, callback) {
		var doc=FSH.System.createDocument(responseText);
		var insertHere = callback.insertHere;

		var table = FSH.System.findNode('//table[@width="100%" and @cellspacing=0 and @cellpadding=0 and @border=0]', doc);
		if (table) {
			table = table.lastChild.getElementsByTagName('TABLE')[2];

			for (var i = 2; i < table.rows.length; i+=2) {
				if (table.rows[i].cells.length > 1) {
					var questHREF = table.rows[i].cells[0].getElementsByTagName('a')[0].getAttribute('href').match(/(\?.*)/)[1];
					if (table.rows[i].cells[2].innerHTML === FSH.System.getValue('lastWorld') && !FSH.Helper.isQuestBeingTracked(questHREF)) {
						if (FSH.System.getValue('questsNotComplete') === false) {
							insertHere.innerHTML += '<br><span style="color:red;font-size:12px;">Quest(s) in zone not completed:</span><br>';
							FSH.System.setValue('questsNotComplete', true);
						}
						insertHere.innerHTML += '<span style="font-size:12px;">' +table.rows[i].cells[0].innerHTML + '</span><br>';
					}
				}
			}
		}
	},

	checkForNotStartedQuests: function(responseText, callback) {

		var doc=FSH.System.createDocument(responseText);
		var page = FSH.System.findNode('//td[contains(.,"Page:")]', doc);
		var maxPage = page.innerHTML.match(/of&nbsp;(\d*)/g);

		if (maxPage && maxPage.length >= 2) {
			FSH.System.setValue('questsNotStarted', false);
			for (var i = 0; i < maxPage[1].replace(/of&nbsp;/g, ''); i += 1) {
				FSH.System.xmlhttp('index.php?cmd=questbook&subcmd=&subcmd2=&page=' + i + '&search_text=&mode=2&letter=*&sortby=min_level&sortbydir=0',
				FSH.Helper.checkForQuestRecurse,
				{'insertHere' : callback.insertHere});
			}
		}
	},

	checkForQuestRecurse: function(responseText, callback) {
		var doc=FSH.System.createDocument(responseText);
		var insertHere = callback.insertHere;

		var table = FSH.System.findNode('//table[@width="100%" and @cellspacing=0 and @cellpadding=0 and @border=0]', doc);
		if (table) {
			table = table.lastChild.getElementsByTagName('TABLE')[2];

			for (var i = 2; i < table.rows.length; i+=2) {
				if (table.rows[i].cells.length > 1) {
					if (table.rows[i].cells[2].innerHTML === FSH.System.getValue('lastWorld')) {
						if (FSH.System.getValue('questsNotStarted') === false) {
							insertHere.innerHTML += '<br><span style="color:red;font-size:12px;">Quest(s) in zone not started:</span><br>';
							FSH.System.setValue('questsNotStarted', true);
						}
						insertHere.innerHTML += '<span style="font-size:12px;">' + FSH.System.removeHTML(table.rows[i].cells[0].innerHTML) + '</span><br>';
					}
				}
			}
		}
	},

	injectWorldNewMap: function(data){
		var img;
		if(data.player){
			FSH.Helper.xLocation = data.player.location.x;
			FSH.Helper.yLocation = data.player.location.y;
			//<dd id='HelperSendTotal'>' + FSH.System.getValue("currentGoldSentTotal").toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</dd>
			if(FSH.System.getValue('sendGoldonWorld')){
				$('#HelperSendTotal').html(FSH.System.getValue('currentGoldSentTotal').toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
				if(parseInt(data.player.gold, 10) > FSH.System.getValue('goldAmount')){
					$('#statbar-gold').css('background-color','red');
				}else{
					$('#statbar-gold').css('background-color','inherit');
				}
			}
			/*if (buttonRow && FSH.System.getValue('sendGoldonWorld')){
				currentGoldSentTotal = FSH.System.addCommas(FSH.System.getValue('currentGoldSentTotal'));
				var recipient_text = 'Send ' + FSH.System.getValue('goldAmount') + ' gold to ' + FSH.System.getValue('goldRecipient') +
					'. Current gold sent total is ' + currentGoldSentTotal;
				buttonRow.innerHTML += '<td valign="top" width="5"></td>' +
					'<td valign="top"><img style="cursor:pointer" id="Helper:SendGold" src="' + FSH.System.imageServer +
					'/skin/gold_button.gif" title= "' + recipient_text + '" border="1" />';
			}
			if (buttonRow && FSH.System.getValue('sendGoldonWorld')){
				//document.getElementById('Helper:PortalToStart').addEventListener('click', FSH.Helper.portalToStartArea, true);
				document.getElementById('Helper:SendGold').addEventListener('click', FSH.Helper.sendGoldToPlayer, true);
			}*/
		}
		if (data.realm && data.realm.name) {
			var worldName = $('h1#worldName');
			worldName.html(data.realm.name); //HACK - incase of switchign between master realm and realm they dont replace teh realm name
			worldName.append(' <a href="http://guide.fallensword.com/index.php?cmd=realms&subcmd=view&realm_id=' + data.realm.id + '" target="_blank">' +
				'<img border=0 title="Search map in Ultimate FSG" width=10 height=10 src="'+ FSH.System.imageServer + '/temple/1.gif"/></a>');
			worldName.append(' <a href="http://wiki.fallensword.com/index.php/Special:Search?search=' + data.realm.name + '&go=Go" target="_blank">' +
				'<img border=0 title="Search map in Wiki" width=10 height=10 src="/favicon.ico"/></a>');
			if (FSH.System.getValue('showSpeakerOnWorld')) {
				img = FSH.System.getValue('playNewMessageSound') === true ?
					FSH.Data.soundMuteImage :
					FSH.Data.soundImage;
				worldName.append('<a href="#" id="toggleSoundLink">'+img+'</a>');
				document.getElementById('toggleSoundLink').addEventListener('click',
				function() {
				//alert($('a#HelperToggleHuntingMode').html());
					if(FSH.System.getValue('playNewMessageSound') === false){
						$('a#toggleSoundLink').html(FSH.Data.soundMuteImage);
					}else{
						$('a#toggleSoundLink').html(FSH.Data.soundImage);
					}
					FSH.System.setValue('playNewMessageSound',!FSH.System.getValue('playNewMessageSound'));
				},true);
			}
			var huntingMode = FSH.Helper.huntingMode;
			img = huntingMode === true ? FSH.Data.huntingOnImage : FSH.Data.huntingOffImage;
			worldName.append(' <a href=# id="HelperToggleHuntingMode">' + img + '</a>');
			
			document.getElementById('HelperToggleHuntingMode').addEventListener('click',
				function() {
				//alert($('a#HelperToggleHuntingMode').html());
					if (!FSH.Helper.huntingMode) {
						$('a#HelperToggleHuntingMode').html(FSH.Data.huntingOnImage);
					} else {
						$('a#HelperToggleHuntingMode').html(FSH.Data.huntingOffImage);
					}
					FSH.Helper.huntingMode = !FSH.Helper.huntingMode;
					FSH.System.setValue('huntingMode', FSH.Helper.huntingMode);
				},true);
		}
	},

	injectWorld: function() {
		//-1 = world page
		//0 = quest responce
		//1 = view creature
		//2 = attack creature
		//3 = attack player
		//4 = move
		//5 = use stair
		//6 = use chest
		//7 = take portal
		//10 = problaby view relic
		//11 = take relic
		//12 = create group
		//13 = view shop
		//14 = purchase item
		//15 = repair
		//17 = login
		//18 = username not found
		if ($('#worldPage').length > 0) { // new map
			FSH.Helper.newMapSubscribes();
		} else {
			//not new map.
			FSH.Helper.injectOldMap();
		}
	},

	injectSendGoldOnWorld: function() {
		$('#statbar-gold-tooltip-general').append(
			'<dt class="stat-gold-sendTo">Send To:</dt><dd id="' +
			'HelperSendTo">' + FSH.System.getValue('goldRecipient') +
			'</dd>' + 
			'<dt class="stat-gold-sendAmt">Amount:</dt><dd id="' +
			'HelperSendAmt">' + FSH.System.getValue('goldAmount')
				.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + '</dd>' +
			'<dt class="stat-gold-sendTo">Send?</dt><dd><input id="' +
			'HelperSendGold" value="Send!" class="custombutton" ' +
			'type="submit"><input type="hidden" id="xc" value="' +
			FSH.System.getValue('goldConfirm') + '"</dd>' + 
			'<dt class="stat-gold-sendTotal">Total Sent:</dt><dd ' +
			'id="HelperSendTotal">' +
			FSH.System.getValue('currentGoldSentTotal').toString()
				.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + '</dd>');
		$('input#HelperSendGold').click(FSH.Helper.doSendGold);
	},

	doSendGold: function() {
		var sendTo = $('#HelperSendTo').html();
		var sendAmt = $('#HelperSendAmt').html()
			.replace(/[^\d]/g,'');
		var xcNum = $('#xc').val();
		var sendHref = FSH.System.server + 'index.php?cmd=trade&' +
			'subcmd=sendgold&xc=' + xcNum + '&target_username=' +
			sendTo +'&gold_amount='+ sendAmt;
		$.ajax({
			url: sendHref,
			success: function( data ) {
				//alert($(data).find();
				var info = FSH.Layout.infoBox(data);
				if (info === 'You successfully sent gold!' ||
					info === '') {
					//currentGoldSentTotal += FSH.System.intValue(callback.amount);
					//info = 'You successfully sent ' + callback.amount + ' gold to ' + callback.recipient + '! Current total sent is '+currentGoldSentTotal+' gold.';
					FSH.System.setValue('currentGoldSentTotal',
						parseInt(
							FSH.System.getValue('currentGoldSentTotal'), 10) +
						parseInt(FSH.System.getValue('goldAmount'), 10));
					window.GameData.fetch(387);
				}
			}
		});
	},

	readyViewCreature: function() {
		$('div#creatureEvaluator').html('');
		$('div#creatureEvaluatorGroup').html('');

		FSH.System.xmlhttp('index.php?cmd=profile',
			FSH.Helper.getCreaturePlayerData,
			{	'groupExists': false,
				'groupAttackValue': 0,
				'groupDefenseValue': 0,
				'groupArmorValue': 0,
				'groupDamageValue': 0,
				'groupHPValue': 0,
				'groupEvaluation': false
			}
		);
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=groups',
			FSH.Helper.checkIfGroupExists);

		$('div#addRemoveCreatureToDoNotKillList').html('');
//console.log($('#dialog-viewcreature').find('h2.name').text());
		if ($('div#addRemoveCreatureToDoNotKillList').length === 0) {
			var doNotKillElement = '<div id="addRemoveCreatureToDo' +
				'NotKillList"" class="description" style="cursor:' +
				'pointer;text-decoration:underline;color:blue;"></div>';
			$(doNotKillElement).insertAfter($('#dialog-viewcreature')
				.find('p.description'));
		}
		var creatureName = $('#dialog-viewcreature').find('h2.name')
			.text();
		$('div#addRemoveCreatureToDoNotKillList')
			.attr('creatureName',creatureName);
		var extraText = 'Add to the do not kill list';
		if (FSH.Helper.doNotKillList.indexOf(creatureName) !== -1) {
			extraText = 'Remove from do not kill list';}
		$('div#addRemoveCreatureToDoNotKillList').html(extraText);
		document.getElementById('addRemoveCreatureToDoNotKillList')
			.addEventListener('click',
				FSH.Helper.addRemoveCreatureToDoNotKillList, true);
	},

	afterUpdateActionList: function() {
		// color the critters in the do no kill list blue
		$('ul#actionList div.header').each(function() {
			if (FSH.Helper.doNotKillList.indexOf($(this).find('a.icon')
				.data('name')) !== -1) {
				$(this).css('color','blue');
			}
		});
		// then intercept the action call 
		var gameData = window.GameData;
		var hcs = window.HCS;
		var oldDoAction = gameData.doAction;
		gameData.doAction = function(actionCode, fetchFlags, data) {
			if (actionCode === hcs.DEFINES.ACTION.CREATURE_COMBAT) {
				// Do custom stuff e.g. do not kill list
				var creatureIcon = $('ul#actionList div.header')
					.eq(data.passback).find('a.icon');
				if (FSH.Helper.doNotKillList.indexOf(
						creatureIcon.data('name')) !== -1) {
					creatureIcon.removeClass('loading');
					return;
				}
			}
			// Call standard action
			oldDoAction(actionCode, fetchFlags, data);
		}; 
	},

	dataEventsPlayerBuffs: function(e, data) {
		// check shield imp is still active
		var shieldImpVal = 0;
		var ddVal=0;
		var l = data.b.length;
		for(var i = 0; i < l; i += 1) {
			var buff = data.b[i];
			if (buff.id === 55) {
				shieldImpVal = buff.stack;
			} else if (buff.id === 50) {
				ddVal = buff.level;
			}
			if (ddVal > 0 && shieldImpVal > 0) {break;}
		}

		//~ if(ddVal>0){
			var imp = $('#actionlist-shield-imp');
			if(shieldImpVal === 0){
				imp.css('background-color','red');
			}else if(shieldImpVal===2){
				imp.css('background-color','yellow');
			}else if(shieldImpVal===1){
				imp.css('background-color','orange');
			}else{
				imp.css('background-color','inherit');
			}
		//~ }
	},

	combatResponse: function(e, data) {
		var l;
		var i;
		// If bad response do nothing.
		if (!FSH.Helper.keepLogs || data.response.response !== 0) {return;}
		var combatData = {};
		combatData.combat = $.extend(true, {}, data.response.data); //make a deep copy
		//delete some values that are not needed to trim down size of log.
		delete combatData.combat.attacker.img_url;
		delete combatData.combat.defender.img_url;
		delete combatData.combat.is_conflict;
		delete combatData.combat.is_bounty;
		delete combatData.combat.pvp_rating_change;
		delete combatData.combat.pvp_prestige_gain;
		if (combatData.combat.inventory_id) {
			combatData.combat.drop = combatData.combat.item.id;
		}
		delete combatData.combat.inventory_id;
		delete combatData.combat.item;

		combatData.player={};
		combatData.player.buffs={};
		combatData.player.enhancements={};
		l = data.player.buffs.length;
		for(i=0; i<l; i += 1) //loop through buffs, only need to keep CA and Doubler
		{//54 = ca, 26 = doubler
			var buff = data.player.buffs[i];
			if(buff.id === 54 || buff.id === 26)
			{
				combatData.player.buffs[buff.id] = parseInt(buff.level, 10);
			}
		}
		var notSave = '|Breaker|Protection|Master Thief|Protect Gold|Disarm|Duelist|Thievery|Master Blacksmith|Master Crafter|Fury Caster|Master Inventor|Sustain|';//Taking the Not Save in case they add new enhancements.
		if (data.player.enhancements)
		{
			l = data.player.enhancements.length;
			for(i=0; i<l; i += 1) //loop through enhancements
			{//54 = ca, 26 = doubler
				var enh = data.player.enhancements[i];
				if (notSave.indexOf('|'+enh.name+'|')===-1){
					combatData.player.enhancements[enh.name]=enh.value;
				}
			}
		}
		//combatData.player.enhancements = data.player.enhancements;
		//combatData.player.buffs = data.player.buffs;
		var now = new Date();
		combatData.time = FSH.System.formatDateTime(now);
		FSH.Helper.appendSavedLog(',' + JSON.stringify(combatData));
	},

	newMapSubscribes: function() {
		// subscribe to view creature events on the new map.
		//current send total
		//send to
		//send amount
		//deposit?
		if (FSH.System.getValue('sendGoldonWorld')) {
			FSH.Helper.injectSendGoldOnWorld();
		}
		//Subscribes:
		FSH.Helper.doNotKillList = FSH.System.getValue('doNotKillList');
		$.subscribe('ready.view-creature', FSH.Helper.readyViewCreature);

		// add do-not-kill list functionality
		$.subscribe('after-update.actionlist',
			FSH.Helper.afterUpdateActionList);

		$.subscribe(window.DATA_EVENTS.PLAYER_BUFFS.ANY,
			FSH.Helper.dataEventsPlayerBuffs);

		$.subscribe('keydown.controls', function(e, key){
			switch(key)
			{
				case 'ACT_REPAIR': window.GameData.fetch(387);
				break;
			}
		});

		FSH.Helper.keepLogs = FSH.System.getValue('keepLogs');
		$.subscribe('2-success.action-response', FSH.Helper.combatResponse);
		//on world

		if (window.initialGameData) {//HCS initial data
			setTimeout(function(){
				FSH.Helper.injectWorldNewMap(window.initialGameData);
			}, 400);
		}
		$.subscribe('-1-success.action-response 5-success.action-response',
			function(e, data) { //change of information
				setTimeout(function() {
					FSH.Helper.injectWorldNewMap(data);
				}, 400);
			}
		);

		//somewhere near here will be multi buy on shop
		//$.subscribe('prompt.worldDialogShop', function(e, data){
			//self._createShop(self.shop.items);
		//	$('span[class="price"]').after('<span class="numTake">test</span>');
		//});

		//document.getElementById('Helper:SendGold').addEventListener('click', FSH.Helper.sendGoldToPlayer, true);
	},

	injectOldMap: function() {
		try {
			var curTile = FSH.System.findNode('//img[contains(@title, "You are here")]/ancestor::td[@width="40" and @height="40"]').getAttribute('background');
			if (FSH.System.getValue('currentTile') !== curTile) {
				FSH.System.setValue('currentTile', curTile);
			}
		} catch (err) {
			//just eat it and move on
		}
		var currentLocation = $('h3#world-realm-name');
		if (currentLocation.length > 0) {
			var locationRE = /\((\d+), (\d+)\)/.exec(currentLocation.text());
			FSH.Helper.xLocation = parseInt(locationRE[1],10);
			FSH.Helper.yLocation = parseInt(locationRE[2],10);
		}

		FSH.Helper.mapThis();
		FSH.Helper.showMap(false);

		var buttonRow = FSH.System.findNode('//tr[td/a/img[@title="Open Realm Map"]]');

		if (buttonRow && FSH.System.getValue('sendGoldonWorld')){
			var currentGoldSentTotal = FSH.System.addCommas(FSH.System.getValue('currentGoldSentTotal'));
			var recipient_text = 'Send ' + FSH.System.getValue('goldAmount') + ' gold to ' + FSH.System.getValue('goldRecipient') +
				'. Current gold sent total is ' + currentGoldSentTotal;
			buttonRow.innerHTML += '<td valign="top" width="5"></td>' +
				'<td valign="top"><img style="cursor:pointer" id="Helper:SendGold" src="' + FSH.System.imageServer +
				'/skin/gold_button.gif" title= "' + recipient_text + '" border="1" />';
		}

		if (buttonRow && !FSH.System.getValue('hideKrulPortal')) {
			buttonRow.innerHTML += '<td valign="top" width="5"></td>' +
				'<td valign="top"><img style="cursor:pointer" id="Helper:PortalToStart" src="' + FSH.System.imageServer +
				'/temple/3.gif" title="Instant port to Krul Island" border="1" /></span></td>';
		}

		var footprints = FSH.System.getValue('footprints');

		if (buttonRow) {
			buttonRow.innerHTML += '<td valign="top" width="5"></td>' +
				'<td valign="top"><img style="cursor:pointer" id="Helper:ToggleFootprints" src="' + FSH.System.imageServer +
				'/skin/' + (footprints?'quest_complete':'quest_incomplete') + '.gif" title="Toggle Footprints" border="0"></td>';
			document.getElementById('Helper:ToggleFootprints').addEventListener('click', FSH.Helper.toggleFootprints, true);
		}

		if (buttonRow && FSH.System.getValue('sendGoldonWorld')){
			//document.getElementById('Helper:PortalToStart').addEventListener('click', FSH.Helper.portalToStartArea, true);
			document.getElementById('Helper:SendGold').addEventListener('click', FSH.Helper.sendGoldToPlayer, true);
		}
		if (buttonRow && !FSH.System.getValue('hideKrulPortal')) {
			document.getElementById('Helper:PortalToStart').addEventListener('click', FSH.Helper.portalToStartArea, true);
		}

		// One may ask why the separation of creating the button and the event handling code.
		// Well, obviously (so obvious it took me 3 hours to figure out), when you change the HTML of
		// a region, all attached events are destroyed (because the original elements are also destroyed)
		
		// PH 20150110 Only in Chrome. FF is apparently different!
		// It's important because we lose the mouseover events of the built-in buttons.
		// It's because you used innerHTML instead of append

		FSH.Helper.checkBuffs();
		FSH.Helper.prepareCheckMonster();
		FSH.Helper.prepareCombatLog();
		var realmId;
		var mapNameText;
		var i;
		var mapName = FSH.System.findNode('//h3[@id="world-realm-name"]');
		if ($('h3#world-realm-name').data('realm')) {
			realmId = $('h3#world-realm-name').data('realm').id.trim();
			mapNameText = $('h3#world-realm-name').data('realm').name.trim();
		}
		//Checking if there are quests on current map - Already done by HCS in new map
		if (FSH.System.getValue('checkForQuestsInWorld') === true) {
			if (mapName && mapName.textContent !== null) {
				if (!mapNameText) {
					mapNameText = mapName.textContent.trim();}
				if (FSH.System.getValue('lastWorld') !== mapNameText ||
					FSH.System.getValue('questsNotStarted') === true ||
					FSH.System.getValue('questsNotComplete') === true) {
					FSH.System.setValue('lastWorld', mapNameText);
					var insertToHere = FSH.System.findNode('//html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[5]/td[2]/table/tbody/tr[3]/td/table/tbody/tr[4]/td');
					FSH.System.xmlhttp('index.php?cmd=questbook&mode=2&letter=*', FSH.Helper.checkForNotStartedQuests, {'insertHere' : insertToHere});
					FSH.System.xmlhttp('index.php?cmd=questbook&mode=0&letter=*', FSH.Helper.checkForNotCompletedQuests,{'insertHere' : insertToHere});
				}
			}
		}
		//quest tracker - will be added by HCS in new Map
		var questBeingTracked = FSH.System.getValue('questBeingTracked').split(';');
		if (questBeingTracked.length > 0 &&
			questBeingTracked[0].trim().length > 0) {
			var injectHere = FSH.System.findNode('//div[table[@class="centered" and @style="width: 270px;"]]');
			if (!injectHere) {return;}
			var replacementText = '<td background="' + FSH.System.imageServer + '/skin/realm_right_bg.jpg">';
			replacementText += '<table width="280" cellpadding="1" style="margin-left:28px; margin-right:28px; ' +
				'font-size:medium; border-spacing: 1px; border-collapse: collapse;">';
			replacementText += '<tr><td colspan="2" height="10"></td>';
			for (i = 0; i < questBeingTracked.length; i += 1) {

				replacementText += '<tr><td style="font-size:small; color:black"><a id="qiLink' + i + '" href=' + questBeingTracked[i] + '></a>&nbsp;';
				replacementText += '<input id="dontTrackThisQuest' + i + '" data="' + questBeingTracked[i] + '" type="button" value="Stop Tracking" title="Stops tracking quest progress." class="custombutton"><br>';
				replacementText += '<span findme="questinfo' + i + '"></span></td></tr>';
				if (i !== questBeingTracked.length - 1) {
					replacementText += '<tr><td height="10" colspan="2"/></tr>' +
					'<tr><td height="10" colspan="2"/></tr>';
				}
			}

			replacementText += '</table>';
			replacementText += '</td>';

			var newSpan = document.createElement('SPAN');
			newSpan.innerHTML=replacementText;
			injectHere.appendChild(newSpan);

			for (i = 0; i < questBeingTracked.length; i += 1) {
				FSH.System.xmlhttp(questBeingTracked[i], FSH.Helper.getQuestInfo, {'data' : i});
			}
		}

		var imgSource;
		var altText;
		if (mapName && mapNameText) {
			mapName.innerHTML += ' <a href="http://guide.fallensword.com/index.php?cmd=realms&subcmd=view&realm_id=' + realmId + '" target="_blank">' +
				'<img border=0 title="Search map in Ultimate FSG" width=10 height=10 src="'+ FSH.System.imageServer + '/temple/1.gif"/></a>';
			mapName.innerHTML += ' <a href="http://wiki.fallensword.com/index.php/Special:Search?search=' + mapNameText + '&go=Go" target="_blank">' +
				'<img border=0 title="Search map in Wiki" width=10 height=10 src="/favicon.ico"/></a>';

			var huntingMode = FSH.Helper.huntingMode;
			imgSource = huntingMode === true ? FSH.Data.huntingOnImage : FSH.Data.huntingOffImage;
			mapName.innerHTML += ' <a href=# id="Helper:ToggleHuntingMode">' + imgSource + '</a>';

			if (FSH.System.getValue('showSpeakerOnWorld')) {
				if (FSH.System.getValue('playNewMessageSound'))
				{
					mapName.innerHTML += '<a href="#" id="toggleSoundLink">' + FSH.Data.soundMuteImage + '</a>';
				} else {
					mapName.innerHTML += '<a href="#" id="toggleSoundLink">' + FSH.Data.soundImage + '</a>';
				}
				document.getElementById('toggleSoundLink').addEventListener('click', FSH.Helper.toggleSound, true);

			}
			if (FSH.System.getValue('showFastWalkIconOnWorld')) {
				var enableFastWalk = FSH.System.getValue('enableFastWalk');
				imgSource = enableFastWalk === true ? FSH.Data.runIcon : FSH.Data.stopIcon;
				altText = enableFastWalk === true ? 'FastWalk mode is ON' : 'FastWalk mode is OFF';
				mapName.innerHTML += ' <a href=# id="Helper:ToggleFastWalkMode"><img title="' + altText + '" src="' + imgSource + '" border=0 width=10 height=10/></a>';
				document.getElementById('Helper:ToggleFastWalkMode').addEventListener('click',
					function() {
						FSH.System.setValue('enableFastWalk',
							!FSH.System.getValue('enableFastWalk'));
						location.reload();
					},true);
			}
			document.getElementById('Helper:ToggleHuntingMode').addEventListener('click',
				function() {
					FSH.System.setValue('huntingMode',
						!FSH.Helper.huntingMode);
					location.reload();
				},true);

		}
		if (FSH.System.getValue('quickKill')) {
			FSH.Helper.oldMapDoNotKill();
		}
	},

	oldMapDoNotKill: function() {
		var doNotKillList = FSH.System.getValue('doNotKillList');
		var doNotKillListAry = doNotKillList.split(',');
		if (doNotKillListAry.length > 0) {
			for (var i=1; i<9; i += 1) {
				var monster = FSH.System.findNode('//a[@id="aLink' + i + '"]');
				if (monster) {
					var monsterName = monster.parentNode.parentNode.firstChild.textContent.trim();
					for (var j=0; j<doNotKillListAry.length; j += 1) {
						var doNotKillName = doNotKillListAry[j].trim();
						if (monsterName === doNotKillName){
							var monsterNameCell = monster.parentNode.parentNode;
							monsterNameCell.innerHTML = '<span style="color:blue;">' + monsterNameCell.innerHTML + '</span>';
							break;
						}
					}
				} else { break; }
			}
		}
	},

	injectWorldMap: function() {
		var playerTile=FSH.System.findNode('//img/ancestor::td[@background]');
		if (playerTile) {
			FSH.Helper.xLocation = playerTile.cellIndex;
			FSH.Helper.yLocation = playerTile.parentNode.rowIndex;
		}
		FSH.Helper.showMap(true);
	},

	sendGoldToPlayer: function(){
//		var injectHere = FSH.System.findNode('//div[table[@class="centered" and @style="width: 270px;"]]');
//		if (!injectHere) {return;}
		var recipient = FSH.System.getValue('goldRecipient');
		var amount = FSH.System.getValue('goldAmount');
		//FSH.System.xmlhttp('index.php?cmd=trade');
		var xcNum = FSH.System.getValue('goldConfirm');
		if (xcNum === '') {
			alert('You have to visit the trade page once to use the send gold functionality');
			return;
		}
		var url = 'index.php?cmd=trade&subcmd=sendgold&xc=' + xcNum +
			'&target_username=' + recipient +'&gold_amount='+ amount;
		FSH.System.xmlhttp(url, FSH.Helper.goldToPlayerSent,
			{'amount': amount, 'recipient': recipient} );
	},

	goldToPlayerSent: function(responseText, callback) {
		var info = FSH.Layout.infoBox(responseText);
		if (info==='' || info==='You successfully sent gold!') {
			var currentGoldSentTotal = FSH.System.getValue('currentGoldSentTotal')*1;
			currentGoldSentTotal += FSH.System.intValue(callback.amount);
			info = 'You successfully sent ' + callback.amount + ' gold to ' + callback.recipient + '! Current total sent is '+currentGoldSentTotal+' gold.';
			FSH.System.setValue('currentGoldSentTotal', currentGoldSentTotal);
		}
		var injectHere = FSH.System.findNode('//div[table[@class="centered" and @style="width: 270px;"]]');
		if (!injectHere) {return;}
		var newSpan = document.createElement('SPAN');
		injectHere.appendChild(newSpan);
		newSpan.setAttribute('background', FSH.System.imageServer + '/skin/realm_right_bg.jpg');
		newSpan.innerHTML='<div style="margin-left:28px; margin-right:28px; color:navy; font-size:xx-small;">' + info + '</div>';
	},

	insertQuickExtract: function(content) {
		if (!content) {content=FSH.Layout.notebookContent();}
		content.innerHTML='<table width=100%><tr style="background-color:' +
			'#CD9E4B;"><td nobr><b>Quick Extract</b></td></tr></table>' +
			'Select which type of plants you wish to extract all of. Only ' +
			'select extractable resources.<br/><label><input type="checkbox"' +
			' id="Helper:useItemsInSt" checked /> Select items in ST</label>' +
			'<label><input type="checkbox" id="Helper:useItemsInMain" ' +
			'checked /> Only extract items in Main Folder</label><table ' +
			'width=100% id="Helper:ExtTable"></table>';
		$('[id^="Helper\\:useItemsIn"]').click(FSH.Helper.showQuickExtract);
		$.getJSON('?cmd=export&subcmd=inventory', FSH.Helper.showQuickExtract);
	},

	showQuickExtract: function(data) {
		var item;
		if (data.items) {
			FSH.Helper.inventory = data;
		}
		//FSH.Helper.itemList = {};
		var table = $('table[id="Helper:ExtTable"]');
		table.children().remove();//empty table for re-population.
		FSH.Helper.resourceList={}; //reset resourceList
		var selectST= $('input[id="Helper:useItemsInSt"]').is(':checked');
		var selectMain= $('input[id="Helper:useItemsInMain"]').is(':checked');
		table.append('<tr><th width=20%>Actions</th><th>Items</th></tr><tr><td id="buy_result" colspan=2></td></tr>');
		//for (var key in FSH.Helper.inventory.items) {
		for (var i=0; i<FSH.Helper.inventory.items.length;i += 1) {
			item = FSH.Helper.inventory.items[i];
			if (selectMain && item.folder_id !== '-1') {continue;}
			if (!selectST && item.is_in_st) {continue;}
			if (item.item_name !== 'Zombie Coffin' &&
				item.type !== '12' &&
				item.type !== '16') {continue;}
			if (FSH.Helper.resourceList[item.item_id]){
				FSH.Helper.resourceList[item.item_id].invIDs += ',' +
					item.inv_id;
				FSH.Helper.resourceList[item.item_id].count += 1;
			} else {
				FSH.Helper.resourceList[item.item_id] = {'count':1,
					'invIDs':item.inv_id,
					'first_item':item};
			}
		}

		for (var id in FSH.Helper.resourceList) {
			if (!FSH.Helper.resourceList.hasOwnProperty(id)) {continue;}
			var res=FSH.Helper.resourceList[id];
			item=res.first_item;
			table.append('<tr><td align=center><span style="cursor:pointer; ' +
				'text-decoration:underline; color:#blue; font-size:x-small;"' +
				' id="Helper:extractAllSimilar' + id + '" invIDs="' +
				res.invIDs + '">Extract all ' + res.count + '</span></td>' +
				'<td><img src="' + FSH.System.imageServer + '/items/' + 
				item.item_id + '.gif" class="tip-dynamic" data-tipped="' +
				'fetchitem.php?item_id=' + item.item_id + '&inv_id=' +
				item.inv_id + '&t=1&p=' + FSH.Helper.inventory.player_id +
				'" border=0>' + '</td><td>'+item.item_name+'</td></tr>');
		}

		for (id in FSH.Helper.resourceList) {
			if (!FSH.Helper.resourceList.hasOwnProperty(id)) {continue;}
			document.getElementById('Helper:extractAllSimilar' + id).
				addEventListener('click', FSH.Helper.extractAllSimilar, true);
			}
	},

	extractAllSimilar: function(evt) {
		if (!confirm('Are you sure you want to extract all similar items?')) {return;}
		var InventoryIDs=evt.target.getAttribute('invIDs').split(',');
		//evt.target.parentNode.innerHTML = InventoryIDs;
		// var output= '';
		evt.target.parentNode.innerHTML = 'extracting all ' + InventoryIDs.length + ' resources';
		for (var i=0; i<InventoryIDs.length; i += 1){
			//output+='index.php?cmd=profile&subcmd=useitem&inventory_id='+InventoryIDs[i]+'<br>';
			FSH.System.xmlhttp('index.php?cmd=profile&subcmd=useitem&inventory_id='+InventoryIDs[i], FSH.Helper.quickDoneExtracted);
		}
		//evt.target.parentNode.innerHTML = output;
	},

	quickDoneExtracted: function(responseText) {
		var infoMessage = FSH.Layout.infoBox(responseText);
		document.getElementById('buy_result').innerHTML+='<br />'+infoMessage;
	},

	toggleFootprints: function() {
		var levelName;
		var footprints = FSH.System.getValue('footprints');
		if (footprints === undefined) {footprints=false;}
		footprints = !footprints;
		FSH.System.setValue('footprints', footprints);

		if (!footprints) { // clear footprints
			var theMap = FSH.System.getValueJSON('map');
			var realm = FSH.System.findNode('//h3[@id="world-realm-name"]');
			if ($('h3#world-realm-name').data('realm')) {
				// var realmId = $('h3#world-realm-name').data('realm').id.trim();
				levelName = $('h3#world-realm-name').data('realm').name.trim();
			}
			if (!levelName) {levelName=realm.innerHTML;}
			FSH.Helper.levelName = levelName;
			theMap.levels[FSH.Helper.levelName] = {};
			FSH.System.setValueJSON('map', theMap);
		}

		document.getElementById('Helper:ToggleFootprints').src =
			FSH.System.imageServer +
			'/skin/' + (footprints?'quest_complete':'quest_incomplete') + '.gif';
	},

	prepareCombatLog: function() {
		var reportsTable=FSH.System.findNode('//div[table[@class="centered" and @style="width: 270px;"]]');
		if (!reportsTable) {return;}
		var tempLog=document.createElement('div');
		tempLog.id='reportsLog';
		var injLog=reportsTable.appendChild(tempLog);
		var is=injLog.style;
		is.color = 'black';
		is.backgroundImage='url(' + FSH.System.imageServer + '/skin/realm_right_bg.jpg)';
		is.maxHeight = '240px';
		is.width = '277px';
		is.maxWidth = is.width;
		is.marginLeft = '0px';
		is.marginRight = '0px';
		is.paddingLeft = '26px';
		is.paddingRight = '24px';
		is.overflow = 'hidden';
		is.fontSize = 'xx-small';
		is.textAlign = 'justify';
	},

	getMonster: function(index) {
		return FSH.System.findNode('//a[@id="aLink' + index + '"]');
	},

	killSingleMonster: function(monsterNumber) {
		if (!FSH.System.getValue('quickKill')) {return;}
		var kills=0;
		var monster = FSH.Helper.getMonster(monsterNumber);

		var doNotKillList = FSH.System.getValue('doNotKillList');
		var doNotKillListAry = doNotKillList.split(',');

		if (monster) {
			var monsterName = monster.parentNode.parentNode.textContent.trim();
			var injectHere = monster.parentNode.parentNode;
			var monsterFound = false;
			for (var j=0; j<doNotKillListAry.length; j += 1) {
				var doNotKillName = doNotKillListAry[j].trim();
				if (monsterName === doNotKillName){
					injectHere.innerHTML = '<nobr><span style="color:blue; font-size:x-small;">On do not kill list&nbsp;</span></nobr>';
					monsterFound = true;
					break;
				}
			}
			if (!monsterFound) {
				kills+=1;
				FSH.System.xmlhttp(monster.getAttribute('href'), FSH.Helper.killedMonster, {'node': monster, 'index': monsterNumber});
			}
		}
	},

	prepareCheckMonster: function() {
		FSH.Helper.colorMonsters();
		FSH.Helper.getMonsterInfo();
	},

	colorMonsters: function() {
		if (!FSH.System.getValue('enableCreatureColoring')) {return;}
		var monsters = FSH.System.findNodes('//a[contains(@href,"cmd=combat") and not(contains(@href,"max_turns="))]');
		if (!monsters) {return;}
		for (var i=0; i<monsters.length; i += 1) {
			var monster = monsters[i];
			if (monster) {
				// add monster color based on elite types
				var monsterText = monster.parentNode.parentNode.parentNode.cells[1];
				if (monsterText.textContent.match(/\(Champion\)/i)) {
					monsterText.style.color = 'green';
				}
				if (monsterText.textContent.match(/\(Elite\)/i)) {
					monsterText.style.color = 'yellow';
				}
				if (monsterText.textContent.match(/\(Super Elite\)/i)) {
					monsterText.style.color = 'red';
				}
			}
		}
	},

	getMonsterInfo: function() {
		if (!FSH.System.getValue('showCreatureInfo')) {return;}
		var monsters = FSH.System.findNodes('//a[contains(@href,"cmd=world&' +
			'subcmd=viewcreature&creature_id=")]');
		if (!monsters) {return;}
		for (var i=0; i<monsters.length; i += 1) {
			var monster = monsters[i];
			if (monster) {
				if (FSH.System.getValue('showMonsterLog')) {
					FSH.System.xmlhttp(monster.getAttribute('href'), 
						FSH.Helper.checkedMonster, 
						{'monster':monster,'showTip':false});
				} else {
					monster.addEventListener('mouseover', 
					FSH.Helper.showTipCreatureInfo, true);
				}
			}
		}
	},

	showTipCreatureInfo: function(evt) {
		var monster=evt.target.parentNode;
		if (monster.getAttribute('mouseovertext') !== undefined) {
			evt.target.removeEventListener('mouseover', FSH.Helper.showTipCreatureInfo, true);
			return;
		}
		FSH.System.xmlhttp(monster.getAttribute('href'), FSH.Helper.checkedMonster, {'monster':monster,'showTip':true});
	},

	checkedMonster: function(responseText, callback) {
		var creatureInfo=FSH.System.createDocument(responseText);
		var statsNode = FSH.System.findNode('//table[@width="400"]', creatureInfo);
		if (!statsNode) {return;} // FF2 error fix
		var showMonsterLog = FSH.System.getValue('showMonsterLog');
		//store the stats
		var classNode = statsNode.rows[1].cells[1];
		var levelNode = statsNode.rows[1].cells[3];
		var attackNode = statsNode.rows[2].cells[1];
		var defenseNode = statsNode.rows[2].cells[3];
		var armorNode = statsNode.rows[3].cells[1];
		var damageNode = statsNode.rows[3].cells[3];
		var hitpointsNode = statsNode.rows[4].cells[1];
		var goldNode = statsNode.rows[4].cells[3];
		var hitpoints = parseInt(hitpointsNode.textContent.replace(/,/g,''),10);
		var armorNumber = parseInt(armorNode.textContent.replace(/,/g,''),10);
		var combatEvaluatorBias = FSH.System.getValue('combatEvaluatorBias');
		// var attackVariable = 1.1053
		var generalVariable = 1.1053;
		var hpVariable = 1.1;
		if (combatEvaluatorBias === 1) {
			generalVariable = 1.1;
			hpVariable = 1.053;
		} else if (combatEvaluatorBias === 2) {
			generalVariable = 1.053;
			hpVariable = 1;
		} else if (combatEvaluatorBias === 3) {
			generalVariable = 1.1053;
			hpVariable = 1;
		}
		var oneHitNumber = Math.ceil(hitpoints*hpVariable+armorNumber*generalVariable);

		var hideRestOfRows = false;
		var collectEnchantments = true;
		var enchantmentsList = [];
		for (var i=0; i<statsNode.rows.length; i += 1) {
			var enchantment = {};
			var firstCell = statsNode.rows[i].cells[0];
			var thirdCell = statsNode.rows[i].cells[2];
			//color titles black
			if (firstCell.getAttribute('bgcolor') === '#cd9e4b') {
				firstCell.style.color='black';
			}
			//color text white so it can be read
			if (firstCell.firstChild && firstCell.firstChild.tagName) {
				firstCell.firstChild.style.color='#cccccc';
			}
			if (thirdCell && thirdCell.firstChild &&
				thirdCell.firstChild.tagName) {
				thirdCell.firstChild.style.color='#cccccc';
			}
			//
			if (firstCell.textContent === 'Actions') {
				hideRestOfRows = true;
			}
			if (hideRestOfRows) {
				firstCell.style.display = 'none';
				firstCell.style.visibility = 'hidden';
			}

			//store the enchantment min and max values in the monster log (if enabled)
			if (showMonsterLog && i >= 7 && collectEnchantments) { //first enchantment row
				var ThisRowFirstCell = statsNode.rows[i].cells[0];
				if (ThisRowFirstCell.textContent !== '[no enhancements]') {
					var SecondNextRowFirstCell = statsNode.rows[i+2].cells[0];
					if (SecondNextRowFirstCell.textContent === 'Description') {
						collectEnchantments = false;
					}
					enchantment.name = statsNode.rows[i].cells[0].textContent;
					enchantment.value = statsNode.rows[i].cells[1].textContent*1;
					enchantmentsList.push(enchantment);
				} else {
					collectEnchantments = false;
				}
			}
		}

		var imageTable = FSH.System.findNode('//table[tbody/tr/td/img[contains(@src, "/creatures/")]]', creatureInfo);
		var imageNode = imageTable.rows[0].cells[0].firstChild;
		var nameNode = imageTable.rows[1].cells[0].firstChild;
		var imageNodeSRC = imageNode.src.replace(/.jpg(.*)/,'.jpg');

		if (showMonsterLog) {
			FSH.Helper.pushMonsterInfo({'key0':nameNode.textContent, 'key1':imageNodeSRC, 'key2':classNode.textContent, 'key3':levelNode.textContent,
				'key4':attackNode.textContent, 'key5':defenseNode.textContent, 'key6':armorNode.textContent, 'key7':damageNode.textContent,
				'key8':hitpointsNode.textContent, 'key9':goldNode.textContent, 'key10':enchantmentsList});
		}

		levelNode.innerHTML += ' (your level:<span style="color:yellow">' +
			FSH.System.intValue($('dt.stat-level:first').next().text()) +
			'</span>)';
		attackNode.innerHTML += ' (your defense:<span style="color:yellow">' +
			FSH.System.intValue($('dt.stat-defense:first').next().text()) +
			'</span>) ';
		defenseNode.innerHTML += ' (your attack:<span style="color:yellow">' +
			FSH.System.intValue($('dt.stat-attack:first').next().text()) +
			'</span>)';
		armorNode.innerHTML += ' (your damage:<span style="color:yellow">' +
			FSH.System.intValue($('dt.stat-damage:first').next().text()) +
			'</span>)';
		damageNode.innerHTML += ' (your armor:<span style="color:yellow">' +
			FSH.System.intValue($('dt.stat-armor:first').next().text()) +
			'</span>)';
		hitpointsNode.innerHTML += ' (your HP:<span style="color:yellow">' +
			FSH.System.intValue($('dt.stat-hp:first').next().text()) +
			'</span>)' +
			'(1H: <span style="color:red">' + oneHitNumber + '</span>)';

		callback.monster.setAttribute('mouseOverText', '<table>' +
			'<tr><td valign=top>' + imageNode.parentNode.innerHTML + '</td>' +
			'<td rowspan=2>' + statsNode.parentNode.innerHTML + '</td></tr>' +
			'<tr><td align=center valign=top>' + nameNode.innerHTML + '</td></tr></table>');
		//fix me
		callback.monster.setAttribute('mouseOverWidth', '600');
		callback.monster.addEventListener('mouseover', FSH.Helper.clientTip, true);
		if (callback.showTip) {FSH.Helper.clientTip({'target':callback.monster});}
	},

	pushMonsterInfo: function(monster) {
		var i;
		var name = monster.key0;
		var monsterLog = FSH.System.getValueJSON('monsterLog');
		if (!monsterLog) {monsterLog = {};}
		if (!monsterLog[name]) {
			monsterLog[name] = {'min':{}, 'max':{}};
			for (i = 1; i < 10; i += 1) {
				monsterLog[name].min['key' + i] = 1e+100;
				monsterLog[name].max['key' + i] = 0;
			}
			//monsterLog[name]['min'] = {'cls':1e+100, 'lvl':1e+100, 'atk':1e+100, 'def':1e+100, 'arm':1e+100, 'dmg':1e+100, 'hp':1e+100, 'gold':1e+100};
			//monsterLog[name]['max'] = {'cls':0, 'lvl':0, 'atk':0, 'def':0, 'arm':0, 'dmg':0, 'hp':0, 'gold':0};
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
			var value = FSH.System.intValue(monster['key' + i]);
			monsterLog[name].min['key' + i] = monsterLog[name].min['key' + i] < value?
				monsterLog[name].min['key' + i] : value;
			monsterLog[name].max['key' + i] = monsterLog[name].max['key' + i] > value?
				monsterLog[name].max['key' + i] : value;
		}
		for (i = 10; i < 11; i += 1) {// enchantments
			if (monster['key' + i]) { //does this critter have enchantments
				if (!monsterLog[name].min['key' + i] || !monsterLog[name].min['key' + i]) {
					monsterLog[name].min['key' + i] = monster['key' + i];
					monsterLog[name].max['key' + i] = monster['key' + i];
				}
				for (var j = 0; j < monster['key' + i].length; j += 1) {
					//~ var enchantName = monster['key' + i][j].name;
					var enchantValue = monster['key' + i][j].value*1;
					monsterLog[name].min['key' + i][j].value = monsterLog[name].min['key' + i][j].value*1 < enchantValue?
						monsterLog[name].min['key' + i][j].value : enchantValue;
					monsterLog[name].max['key' + i][j].value = monsterLog[name].max['key' + i][j].value*1 > enchantValue?
						monsterLog[name].max['key' + i][j].value : enchantValue;
				}
			}
		}
		FSH.System.setValueJSON('monsterLog', monsterLog);
	},

	injectMonsterLog: function() {
		var entityLog = FSH.System.getValueJSON('monsterLog');
		var i;
		if (entityLog) {
			FSH.Helper.entityLogTable = {entity:[]};
			for (var name in entityLog) {
				if (!entityLog.hasOwnProperty(name)) { continue; }
				var newEntity = {};
				newEntity.name = name;
				newEntity.key1 = entityLog[name].min.key1;
				for (i = 2; i < 4; i += 1) {
					newEntity['key' + i] = entityLog[name].min['key' + i];
				}
				for (i = 4; i < 10; i += 1) {
					newEntity['key' + i] = FSH.System.addCommas(entityLog[name].min['key'+i]) + ' - ' +
						FSH.System.addCommas(entityLog[name].max['key'+i]);
				}
				for (i = 10; i < 11; i += 1) {
					if (entityLog[name].min['key' + i]) {
						newEntity['key' + i] = '';
						for (var j = 0; j < entityLog[name].min['key' + i].length; j += 1) {
							newEntity['key' + i] += '<nobr>' + entityLog[name].min['key'+i][j].name + ' ' +
								entityLog[name].min['key'+i][j].value + ' - ' + entityLog[name].max['key'+i][j].value + '<nobr>' +
								(j !== entityLog[name].min['key' + i].length - 1? '<br/>':'');
						}
					}
				}
				FSH.Helper.entityLogTable.entity.push(newEntity);
			}
			FSH.Helper.sortBy = 'key3';
			FSH.Helper.sortAsc = true;
			FSH.Helper.entityLogTable.entity.sort(FSH.Helper.numberSort);
		}
		var content=FSH.Layout.notebookContent();
		content.innerHTML = '<span id=FSH.Helper.entityTableOutput>No monster information! Please enable entity log and travel a bit to see the world</span>';
		FSH.Helper.generateEntityTable();
	},

	generateEntityTable: function() {
		var content = document.getElementById('FSH.Helper.entityTableOutput');
		var i;
		if (!FSH.Helper.entityLogTable || !content) {return;}

		var result = '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr style="background-color:#110011; color:white;">'+
			'<td width="90%" nobr align=center><b>&nbsp;Entity Information</b></td>'+
			'<td width="10%" nobr>[<span id="FSH.Helper.clearEntityLog">Clear</span>]</td>'+
			'</tr>' +
			'</table>'+
			'<table id="Helper:EntityInfo" cellspacing="1" cellpadding="2" border="0" style="font-size:small;"><tr style="background-color:#e2b960;">' +
			'<th width="25%" align="left" sortkey="name" colspan="2">Entity</th>' +
			'<th align="center" sortkey="key2">Class</th>' +
			'<th align="center" sortkey="key3" sorttype="number">Lvl</th>' +
			'<th align="center">Attack</th>' +
			'<th align="center">Defence</th>' +
			'<th align="center">Armor</th>' +
			'<th align="center">Damage</th>' +
			'<th align="center">HP</th>' +
			//'<th align="center">Gold</th>' +
			'<th align="center">Enhancements</th>' +
			'</tr>';
		for (var k=0;k<FSH.Helper.entityLogTable.entity.length;k += 1) {
			result += '<tr class="HelperMonsterLogRow'+(1+k % 2)+'"><td align="center"><img width=40 height=40 ' +
					'data-tipped="' + FSH.Helper.entityLogTable.entity[k].key1 + '" ' +
					'src="' + FSH.Helper.entityLogTable.entity[k].key1 + '"/></td>';
			result += '<td align="left">' + FSH.Helper.entityLogTable.entity[k].name + '</td>';
			for (i = 2; i < 4; i += 1) {
				result += '<td align="center">' +
					FSH.System.addCommas(FSH.Helper.entityLogTable.entity[k]['key'+i]) +
					'</td>';
			}
			for (i = 4; i < 9; i += 1) {// 10 is gold, we don't need to show this
				result += '<td align="center">' +
					FSH.Helper.entityLogTable.entity[k]['key'+i] + '</td>';
			}
			for (i = 10; i < 11; i += 1) {
				var entityInformationValue = FSH.Helper.entityLogTable.entity[k]['key'+i];
				if (!entityInformationValue) {
					result += '<td align="center" style="font-size:small; color:gray;">**Missing**</td>';
				} else {
					result += '<td align="center" style="font-size:xx-small;">' + entityInformationValue + '</td>';
				}
			}
		}
		result += '</table>';
		content.innerHTML = result;
		document.getElementById('FSH.Helper.clearEntityLog').addEventListener('click', FSH.Helper.clearEntityLog, true);

		var theTable=document.getElementById('Helper:EntityInfo');
		for (i=0; i<theTable.rows[0].cells.length; i += 1) {
			var cell=theTable.rows[0].cells[i];
			if (cell.getAttribute('sortkey')) {
				cell.style.textDecoration='underline';
				cell.style.cursor='pointer';
				cell.addEventListener('click', FSH.Helper.sortEntityLogTable, true);
			}
		}
	},

	clearEntityLog: function() {
		FSH.System.setValue('monsterLog', '');
		location.href = 'index.php?cmd=notepad&blank=1&subcmd=monsterlog';
	},

	sortEntityLogTable: function(evt) {
		var headerClicked = evt.target.getAttribute('sortKey');
		var sortType = evt.target.getAttribute('sortType');
		if (!sortType) {sortType='string';}
		if (FSH.Helper.sortAsc === undefined) {FSH.Helper.sortAsc=true;}
		if (FSH.Helper.sortBy && FSH.Helper.sortBy===headerClicked) {
			FSH.Helper.sortAsc=!FSH.Helper.sortAsc;
		}

		FSH.Helper.sortBy=headerClicked;
//console.log(FSH.Helper.sortAsc + ' ' + FSH.Helper.sortBy + ' ' + sortType);

		switch(sortType) {
			case 'string':
				FSH.Helper.entityLogTable.entity.sort(FSH.Helper.stringSort);
				break;
			case 'number':
				FSH.Helper.entityLogTable.entity.sort(FSH.Helper.numberSort);
				break;
			default:
				break;
		}
		FSH.Helper.generateEntityTable();
	},

	backpackUpdater: function(count){
		var slots = FSH.System.findNode('.//font[contains(.,"/") and @size="1"]');
		if (slots !== null){
			var bpslots = slots.childNodes[0].nodeValue.split('/');
			//note the - 0 is to insure that math is used
			slots.childNodes[0].nodeValue = bpslots[0] - 0 + count + ' /' + bpslots[1];
		}
	},

	killedMonster: function(responseText, callback) {
		var i;
		var doc=FSH.System.createDocument(responseText);

		var reportRE=/var\s+report=new\s+Array;\n(report\[[0-9]+\]="[^"]+";\n)*/;
		var report=responseText.match(reportRE);
		if (report) {report=report[0];}

		// var specialsRE=/<div id='specialsDiv' style='position:relative; display:block;'><font color='#FF0000'><b>Azlorie Witch Doctor was withered.</b></font>/
		var specials=FSH.System.findNodes('//div[@id="specialsDiv"]', doc);

		var xpGain       = FSH.System.getIntFromRegExp(responseText, /var\s+xpGain=(-?[0-9]+);/i);
		var goldGain     = FSH.System.getIntFromRegExp(responseText, /var\s+goldGain=(-?[0-9]+);/i);
		var guildTaxGain = FSH.System.getIntFromRegExp(responseText, /var\s+guildTaxGain=(-?[0-9]+);/i);
		var levelUp      = FSH.System.getIntFromRegExp(responseText, /var\s+levelUp=(-?[0-9]+);/i);
		//You looted the item '<font color='#009900'>Amulet of Gazrif</font>'</b><br><br><img src='http://fileserver.huntedcow.com/items/4613.gif' class='tipped' data-tipped-options='skin: "fsItem", ajax: true' data-tipped='fetchitem.php?item_id=4613&t=2&p=1478403&vcode=249a530a4a8790e924af351c49bcccda'>
		var lootRE=/You looted the item \'<font color=\'\#[0-9A-F]+\'>([^<]+)<\/font>\'.+?(fetchitem\.php\?item_id=[0-9]*\&t=[0-9]*\&p=[0-9]*\&vcode=[0-9a-zA-Z]*)/;//(fetchitem\.php\?item_id=[0-9]*\&t=[0-9]*\&p=[0-9]*\&vcode=[0-9a-zA-Z]*)
		var info         = FSH.Layout.infoBox(responseText);
		var lootMatch=responseText.match(lootRE);
		var lootedItem = '';
		var lootedItemURL = '';
		if (lootMatch && lootMatch.length>0) {
			lootedItem=lootMatch[1];
			lootedItemURL=lootMatch[2];
		}
		var shieldImpDeathRE = /Shield Imp absorbed all damage/;
		var shieldImpDeath = responseText.match(shieldImpDeathRE);

		var monster = callback.node;
		var showCombatLog = false;
		if (monster) {
			var result=document.createElement('DIV');
			var resultHtml = '<small style="color:green;">'+callback.index+'. XP:' + xpGain + ' Gold:' + goldGain + ' (' + guildTaxGain + ')</small>';
			var resultText = 'XP:' + xpGain + ' Gold:' + goldGain + ' (' + guildTaxGain + ')\n';
			if (info!=='') {
				resultHtml += '<br/><span style="font-size:x-small;width:120px;overflow:hidden;" title="' + info + '">' + info + '</span>';
				resultText += info + '\n';
			}
			if (lootedItem!=='') {
				FSH.Helper.backpackUpdater(1);
				// I've temporarily disabled the ajax thingie, as it doesn't seem to work anyway.
				resultHtml += '<br/><small style="color:green;">Looted item:<span class=\'tipped\' data-tipped-options=\'skin: "fsItem", ajax: true\' data-tipped=\''+lootedItemURL+'\'>' +
					lootedItem + '</span></small>';
				resultText += 'Looted item:' + lootedItem + '\n';
			}
			if (shieldImpDeath) {
				resultHtml += '<br/><small><span style="color:red;">Shield Imp Death</span></small>';
				resultText += 'Shield Imp Death\n';
				showCombatLog = true;
			}
			if (levelUp==='1') {
				resultHtml += '<br/><br/><span style="color:#999900;font-weight:bold;>Your level has increased!</span>';
				resultText += 'Your level has increased!\n';
				showCombatLog = true;
			}
			if (levelUp==='-1') {
				resultHtml += '<br/><br/><span style="color:#991100;font-weight:bold;">Your level has decreased!</span>';
				resultText += 'Your level has decreased!\n';
				showCombatLog = true;
			}
			if (xpGain<0) {result.style.color='red'; showCombatLog = true;}
			result.innerHTML=resultHtml;
			var monsterParent = monster.parentNode;
			result.id = 'result' + callback.index;
			if (report) {
				var reportLines=report.split('\n');
				var reportHtml='';
				var reportText='';
				if (specials) {
					reportHtml += '<span style="color:red">';
					for (i=0; i<specials.length; i += 1) {
						reportHtml += specials[i].textContent + '<br/>';
						reportText += specials[i].textContent + '\n';
					}
					reportHtml += '</span>';
				}
				for (i=0; i<reportLines.length; i += 1) {
					var reportMatch = reportLines[i].match(/\"(.*)\"/);
					if (reportMatch) {
						reportHtml += '<br/>' + reportMatch[1];
						reportText += reportMatch[1].replace(/<br>/g, '\n') + '\n';
					}
				}
				var mouseOverText = '<span><span style="color:#FFF380;text-align:center;">Combat Results</span>' + reportHtml + '</span>';
				FSH.Helper.appendCombatLog(reportHtml, showCombatLog);
				result.setAttribute('mouseOverText', mouseOverText);
				if (FSH.System.getValue('keepLogs')) {
					var now = new Date();
					FSH.Helper.appendSavedLog('\n================================\n' + FSH.System.formatDateTime(now) + '\n' + resultText + '\n' + reportText);
				}
			}

			monsterParent.innerHTML = '';
			monsterParent.parentNode.appendChild(result);
			result.setAttribute('style', 'float:right; text-align:right;');
			monsterParent.parentNode.setAttribute('style', ''); // removes the line height on the td
			if (report) {
				document.getElementById('result' + callback.index).addEventListener('mouseover', FSH.Helper.clientTip, true);
			}
		}
	},

	appendSavedLog: function(text) {
		setTimeout(function(){
			var theLog=FSH.System.getValue('CombatLog');
			if (!theLog) {theLog='';}
			theLog+=text;
			FSH.System.setValue('CombatLog', theLog);
		}, 0);
	},

	appendCombatLog: function(text, showCombatLog) {
		var reportLog = FSH.System.findNode('//div[@id="reportsLog"]');
		if (!reportLog) {return;}
		if (FSH.System.getValue('showCombatLog') || showCombatLog) {
			reportLog.innerHTML += text + '<br/>';
		}
	},

	scrollUpCombatLog: function() {
		var reportLog = FSH.System.findNode('//div[@id="reportsLog"]');
		reportLog.scrollTop-=10;
	},

	scrollDownCombatLog: function() {
		var reportLog = FSH.System.findNode('//div[@id="reportsLog"]');
		reportLog.scrollTop+=10;
	},

	clientTip: function(evt) {
		var target=evt.target;
		var value, width;
		do {
			if (target.getAttribute) {
				value=target.getAttribute('mouseovertext');
				width=target.getAttribute('mouseoverwidth');
			}
			target=target.parentNode;
		} while (!value && target);
		if (value) {
			target.setAttribute('data-tipped', value);
			target.setAttribute('data-tipped-options', 'maxWidth:800');
			target.className += ' tipped';
			// TODO creature mouseovers - when did these last work?
			//~ $T.show($(target));
		}
	},

	moveMe: function(dx, dy) {
		var xCoord;
		var yCoord;
		var pos=FSH.Helper.position();
		var enableFastWalk = FSH.System.getValue('enableFastWalk');
		if (pos) {
			if (pos.type === 'normal') {
				//if fast walk is enabled then use the stored location, otherwise look it up
				xCoord = enableFastWalk?FSH.Helper.xLocation:pos.X;
				yCoord = enableFastWalk?FSH.Helper.yLocation:pos.Y;
				location.href = 'index.php?cmd=world&subcmd=move&x=' + (xCoord+dx) + '&y=' + (yCoord+dy);
				FSH.Helper.xLocation+=dx;
				FSH.Helper.yLocation+=dy;
			}
			if (pos.type === 'worldmap') {
				//if fast walk is enabled then use the stored location, otherwise look it up
				xCoord = enableFastWalk?FSH.Helper.xLocation:pos.X;
				yCoord = enableFastWalk?FSH.Helper.yLocation:pos.Y;
				FSH.System.xmlhttp('index.php?cmd=world&subcmd=move&x=' +
					(xCoord+dx) + '&y=' + (yCoord+dy), function() {
						location.href = FSH.System.server +
							'index.php?cmd=world&subcmd=map';});
				FSH.Helper.xLocation+=dx;
				FSH.Helper.yLocation+=dy;

			}
		}
	},

	killMonsterAt: function(index) {
		var linkObj = FSH.Helper.getMonster(index);
		if (linkObj!==null) {
			if (FSH.System.getValue('quickKill')) {
				FSH.Helper.killSingleMonster(index);
			}
			else {
				location.href = linkObj.getAttribute('href');
			}
		}
	},

	keyPress: function(evt) {
		var r, s;
		if (evt.target.tagName!=='HTML' && evt.target.tagName!=='BODY') {return;}

		// ignore control, alt and meta keys (I think meta is the command key in Macintoshes)
		if (evt.ctrlKey) {return;}
		if (evt.metaKey) {return;}
		if (evt.altKey) {return;}

		r = evt.charCode;
		s = evt.keyCode;

		switch (r) {
		case 113: // nw [q]
			FSH.Helper.moveMe(-1,-1);
			break;
		case 119: // n [w]
			FSH.Helper.moveMe(0,-1);
			break;
		case 101: // ne [e]
			FSH.Helper.moveMe(1,-1);
			break;
		case 97: // w [a]
			FSH.Helper.moveMe(-1,0);
			break;
		case 100: // e [d]
			FSH.Helper.moveMe(1,0);
			break;
		case 122: // sw [z]
			FSH.Helper.moveMe(-1,1);
			break;
		case 120: // s [x]
			FSH.Helper.moveMe(0,1);
			break;
		case 99: // se [c]
			FSH.Helper.moveMe(1,1);
			break;
		case 114: // repair [r]
			//do not use repair link for new map
			if ($('#worldPage').length === 0) {
				location.href = 'index.php?cmd=blacksmith&subcmd=repairall&fromworld=1';
			}
			break;
		case 71: // create group [G]
			location.href = 'index.php?cmd=guild&subcmd=groups&subcmd2=create&fromworld=1';
			break;
		case 76: // Log Page [L]
			location.href = 'index.php?cmd=log';
			break;
		case 103: // go to guild [g]
			location.href = 'index.php?cmd=guild&subcmd=manage';
			break;
		case 106: // join all group [j]
			if (!FSH.System.getValue('enableMaxGroupSizeToJoin')) {
				location.href = 'index.php?cmd=guild&subcmd=groups&subcmd2=joinall';
			} else {
				location.href = 'index.php?cmd=guild&subcmd=groups&subcmd2=joinallgroupsundersize';
			}
			break;
		case 49: // [1]
		case 50: // [2]
		case 51: // [3]
		case 52: // [4]
		case 53: // [5]
		case 54: // [6]
		case 55: // [7]
		case 56: // keyed combat [8]
			FSH.Helper.killMonsterAt(r-48);
			break;
		case 98: // backpack [b]
			//~ location.href = 'index.php?cmd=profile&subcmd=dropitems&fromworld=1';
			location.href = 'index.php?cmd=profile&subcmd=dropitems';
			break;
		case 115: // use stairs [s]
			FSH.Helper.useStairs(); // this is suspect, is it old map only?
			break;
		case 116: // quick buy [t]
			FSH.Helper.quickBuyItem();
			break;
		case 118: // fast wear manager [v]
			location.href = 'index.php?cmd=notepad&blank=1&subcmd=quickwear';
			break;
		case 121: // fast send gold [y]
			FSH.Helper.sendGoldToPlayer();
			break;
		case 19: // quick buffs []
			// openWindow('', 'fsQuickBuff', 618, 800, ',scrollbars');
			FSH.System.openInTab(FSH.System.server + 'index.php?cmd=quickbuff');
			break;
		case 48: // return to world [0]
			//do not use if using new map
			if ($('#worldPage').length === 0) {
				location.href = 'index.php?cmd=world';
			}
			break;
		case 109: // map [m]
			// window.open('index.php?cmd=world&subcmd=map', 'fsMap');
			// openWindow('index.php?cmd=world&subcmd=map', 'fsMap', 650, 650, ',scrollbars,resizable');
			FSH.System.openInTab(FSH.System.server + 'index.php?cmd=world&subcmd=map');
			break;
		case 112: // profile [p]
			location.href = 'index.php?cmd=profile';
			break;
		case 110: // mini map [n]
			FSH.Helper.displayMiniMap();
			break;
		case 78: // auto move in mini map [N]
			FSH.Helper.autoMoveMiniMap();
			break;
		case 62: // move to next page [>]
		case 60: // move to prev page [<]
			FSH.Helper.movePage({62:'>', 60:'<'}[r]);
			break;
		case 33: // Shift+1
		case 64: // Shift+2
		case 34: // Shift+2 -- for UK keyboards, I think
		case 35: // Shift+3
		case 36: // Shift+4
		case 37: // Shift+5
		case 94: // Shift+6
		case 38: // Shift+7
		case 42: // Shift+8
		case 40: // Shift+9
			var keyMap = {'key33':1, 'key64':2, 'key34':2, 'key35':3, 'key36':4, 'key37':5,
				'key94':6, 'key38':7, 'key42':8, 'key40':9};
			// I'm using "key??" because I don't feel comfortable of naming properties with integers
			var itemIndex = keyMap['key' + r];
			FSH.System.xmlhttp('index.php?cmd=profile', FSH.Helper.changeCombatSet, itemIndex);
			break;
		case 41: // Shift+0
			// TODO: ask for a number, check isnumeric, then call changeCombatSet with that index.
			break;
		case 0: // special key
			switch (s) {
			case 37: // w
				FSH.Helper.moveMe(-1,0);
				evt.preventDefault();
				evt.stopPropagation();
				break;
			case 38: // n
				FSH.Helper.moveMe(0,-1);
				evt.preventDefault();
				evt.stopPropagation();
				break;
			case 39: // e
				FSH.Helper.moveMe(1,0);
				evt.preventDefault();
				evt.stopPropagation();
				break;
			case 40: // s
				FSH.Helper.moveMe(0,1);
				evt.preventDefault();
				evt.stopPropagation();
				break;
			case 33:
				if (FSH.System.findNode('//div[@id="reportsLog"]')) {
					FSH.Helper.scrollUpCombatLog();
					evt.preventDefault();
					evt.stopPropagation();
				}
				break;
			case 34:
				if (FSH.System.findNode('//div[@id="reportsLog"]')) {
					FSH.Helper.scrollDownCombatLog();
					evt.preventDefault();
					evt.stopPropagation();
				}
				break;
			default:
				// console.log('special key: ' +s);
				break;
			}
			break;
		default:
			// console.log('standard key: ' +r);
			break;
		}
		//return true;
	},

	injectBank: function() {
		var bank = FSH.System.findNode('//b[contains(.,"Bank")]');
		if (bank) {
			bank.innerHTML+='<br><a href="/index.php?cmd=guild&subcmd=bank">Guild Bank</a>';
		}
	},

	injectAuctionHouse: function() {
		if (FSH.System.getValue('autoFillMinBidPrice')) {
			$('input#auto-fill').not(':checked').click();
		}
		$('input[value="My Auctions"]').before('<input id="helperAHCancelAll" type="button" value="Cancel All" ' +
			'class="custombutton auctionbutton" style="float: right;">');
		$('input#helperAHCancelAll').click(function() {
			$('a.auctionCancel').each(function() {$(this).click();});
		});
		$('div#sort0').click();
	},

	injectGuildAddTagsWidgets: function() {
		//<td><input type='checkbox' name='tagIndex[]' value='22302759' onclick='updateTagPrice(this, 100);'></td><td><center><img src='http://huntedcow.cachefly.net/fs/items/6317.gif' class='tipped' data-tipped-options='skin: "fsItem"' data-tipped='fetchitem.php?item_id=6317&inv_id=22302759&t=4&p=46796&currentPlayerId=1599987' border=0 height=30></center>
		var itemTable = FSH.System.findNode('//img[contains(@src,"/items/")]/ancestor::table[1]');
		if (itemTable) {
			for (var i=1;i<itemTable.rows.length;i += 1) {
				var aRow = itemTable.rows[i];
				if (aRow.cells[2]) { // itemRow
					var itemId = aRow.cells[0].firstChild.getAttribute('value');
					aRow.cells[2].innerHTML += '&nbsp;<span style="cursor:pointer; text-decoration:underline; color:blue;" itemID="' + itemId + '">Fast BP</span>';
					var itemRecall = aRow.cells[2].firstChild.nextSibling;
					itemRecall.addEventListener('click', FSH.Helper.recallGuildStoreItem, true);
				}
			}
		}
		$('b:contains("100 x Item Level")').closest('tr').next().children('td:first').append('<input type="button" id="fshCheckAlTag" value="Check All">');
		$('#fshCheckAlTag').click(function()
		{
			$('input[name*=tagIndex]').each(function()
			{
				//this.checked = !this.checked;
				this.click();
			});
		});
	},

	changeCombatSet: function(responseText, itemIndex) {
		var doc = FSH.System.createDocument(responseText);

		var cbsSelect = FSH.System.findNode('//select[@name="combatSetId"]', doc);

		// find the combat set id value
		var allItems = cbsSelect.getElementsByTagName('option');
		if (itemIndex >= allItems.length) {return;}
		var cbsIndex = allItems[itemIndex].value;

		$.ajax({
			type: 'POST',
			url: FSH.System.server + 'index.php',
			data: {
				cmd: 'profile',
				subcmd: 'managecombatset',
				combatSetId: cbsIndex,
				submit: 'Use'
			},
			success: function() {
				location.href = 'index.php?cmd=profile';
			}
		});
	},

	injectInventoryManager: function() {
		var content = FSH.Layout.notebookContent();
		content.innerHTML = '<img src = "' + FSH.System.imageServer +
			'/world/actionLoadingSpinner.gif">&nbsp;Getting inventory data...';
		if (FSH.subcmd === 'invmanager') {
			$.getJSON('?cmd=export&subcmd=inventory', FSH.Helper.gotInvMan);
		} else if (FSH.subcmd === 'guildinvmanager') {
			$.getJSON('?cmd=export&subcmd=guild_store&inc_tagged=1',
				FSH.Helper.gotGuildInvMan);
		}
	},

	gotInvMan: function(data) {
		FSH.Helper.inventory = data;
		FSH.Helper.inventory.folders['-1']='Main';
		FSH.Helper.inventoryManagerHeaders('self', FSH.Helper.inventory,
			'Helper:InventoryManagerOutput');
	},

	gotGuildInvMan: function(data) {
		FSH.Helper.guildinventory = data;
		$.getJSON('?cmd=export&subcmd=guild_members&guild_id=' +
			FSH.Helper.guildinventory.guild_id, FSH.Helper.gotGuildMembers);
	},

	gotGuildMembers: function(data) {
		var buildJSON='{';
		for (var x in data) {
			if (!data.hasOwnProperty(x)) { continue; }
			buildJSON += '"' + data[x].id + '":"' + data[x].username + '",';
		}
		buildJSON = buildJSON.substring(0, buildJSON.length - 1) + '}';
		FSH.Helper.guildinventory.members = JSON.parse(buildJSON);
		FSH.Helper.inventoryManagerHeaders('guild', FSH.Helper.guildinventory,
			'Helper:GuildInventoryManagerOutput');
	},

	setItemFilterDefault: function() {
		FSH.Helper.itemFilters = [
			{'id':'showHelmetTypeItems', 'type':'Helmet'},
			{'id':'showAmorTypeItems', 'type':'Armor'},
			{'id':'showGloveTypeItems', 'type':'Gloves'},
			{'id':'showBootTypeItems', 'type':'Boots'},
			{'id':'showWeaponTypeItems', 'type':'Weapon'},
			{'id':'showShieldTypeItems', 'type':'Shield'},
			{'id':'showRingTypeItems', 'type':'Ring'},
			{'id':'showAmuletTypeItems', 'type':'Amulet'},
			{'id':'showRuneTypeItems', 'type':'Rune'}
		];
	},

	inventoryManagerHeaders: function(reportType, targetInventory, targetID) {
		var content=FSH.Layout.notebookContent();
		FSH.Helper.setItemFilterDefault();
		var minLvl = FSH.System.getValue('inventoryMinLvl');
		var maxLvl = FSH.System.getValue('inventoryMaxLvl');
		var reportTitle;
		if(reportType==='self'){
			reportTitle='<td width="90%" nobr><b>&nbsp;Inventory Manager</b> ' + targetInventory.items.length +
						' items (green = worn, blue = backpack)</td>';
		}else{
			reportTitle='<td width="90%" nobr><b>&nbsp;Guild Inventory Manager</b> ' + targetInventory.items.length +
						' items (maroon = in BP, blue=guild store)</td>';
		}
		var newhtml='<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr style="background-color:#cd9e4b">'+
			reportTitle + '<tr><td colspan=2>' +
			'<table><tr><td><b>Show Items:</b></td>' +
				'<td><table><tr><td>' +
				'<div align=right><form id=Helper:inventoryFilterForm subject="inventory" href="index.php?cmd=notepad&blank=1&subcmd=invmanager' +
				'" onSubmit="javascript:return false;">' +
				'Min lvl:<input value="' + minLvl + '" size=5 name="FSH.Helper.inventoryMinLvl" id="FSH.Helper.inventoryMinLvl" style=custominput/> ' +
				'Max lvl:<input value="' + maxLvl + '" size=5 name="FSH.Helper.inventoryMaxLvl" id="FSH.Helper.inventoryMaxLvl" style=custominput/> ' +
				'<input id="Helper:inventoryFilter" subject="inventory" href="index.php?cmd=notepad&blank=1&subcmd=invmanager" ' +
				'class="custombutton" type="submit" value="Filter"/><input id="reportType" type="hidden" value="'+reportType+'" />' +
				'<input id="Helper:inventoryFilterReset" subject="inventory" href="index.php?cmd=notepad&blank=1&subcmd=invmanager" ' +
				'class="custombutton" type="button" value="Reset"/></form></div>';
		for (var i=0; i<FSH.Helper.itemFilters.length; i += 1) {
			newhtml += i % 5 === 0 ? '</td></tr><tr><td>' : '';
			newhtml+='&nbsp;' +FSH.Helper.itemFilters[i].type+ ':<input id="'+FSH.Helper.itemFilters[i].id+'" type="checkbox" linkto="'+FSH.Helper.itemFilters[i].id+'"' +
					(FSH.System.getValue(FSH.Helper.itemFilters[i].id)?' checked':'') + '/>';
		}
		newhtml+=' Sets Only: <input id="Helper:SetFilter" type="checkbox" />';
		newhtml+='</td></tr><tr><td>&nbsp;<span id=SelectAllFilters>[Select All]</span>&nbsp;<span id=SelectNoFilters>[Select None]</span>' +
				'</td></tr></table></td></tr></table>' +
				'<div style="font-size:small;" id="'+targetID+'">' +
				'</div>';
		content.innerHTML=newhtml;

		document.getElementById('Helper:SetFilter').addEventListener('click', FSH.Helper.generateInventoryTable, true);

		FSH.Helper.generateInventoryTable();

		document.getElementById('Helper:inventoryFilterReset').addEventListener('click', function(){
				FSH.System.setValue('inventoryMinLvl', FSH.Data.defaults.inventoryMinLvl);
				FSH.System.setValue('inventoryMaxLvl', FSH.Data.defaults.inventoryMaxLvl);
				$('input[id="FSH.Helper.inventoryMinLvl"]').attr('value', FSH.Data.defaults.inventoryMinLvl);
				$('input[id="FSH.Helper.inventoryMaxLvl"]').attr('value', FSH.Data.defaults.inventoryMaxLvl);
				FSH.Helper.generateInventoryTable();
			}, true);
		document.getElementById('Helper:inventoryFilterForm').addEventListener('submit', function(){
				FSH.System.setValue('inventoryMinLvl', $('input[id="FSH.Helper.inventoryMinLvl"]').attr('value'));
				FSH.System.setValue('inventoryMaxLvl', $('input[id="FSH.Helper.inventoryMaxLvl"]').attr('value'));

				FSH.Helper.generateInventoryTable();

			}, true);

		for (i=0; i<FSH.Helper.itemFilters.length; i += 1) {
			document.getElementById(FSH.Helper.itemFilters[i].id).addEventListener('click', FSH.Helper.toggleCheckboxAndRefresh, true);
		}
		document.getElementById('SelectAllFilters').addEventListener('click', FSH.Helper.InventorySelectFilters, true);
		document.getElementById('SelectNoFilters').addEventListener('click', FSH.Helper.InventorySelectFilters, true);
	},

	inventoryTableHeader: function(reportType) {
		return '<table id="Helper:InventoryTable"><tr>' +
			'<th width="180" align="left" sortkey="item_name" sortType=' +
				'"string" colspan="2">Name</th>' +
			'<th sortkey="stats.min_level" sortType="number">Level</th>' +
			'<th align="left" sortkey="' +
			(reportType === 'guild' ?
			'player_name" sortType="string' :
			'folder_id" sortType="number') +
			'">Where</th>' +
			'<th align="left" sortkey="type" sortType="number">Type</th>' +
			'<th sortkey="stats.attack" sortType="number">Att</th>' +
			'<th sortkey="stats.defense" sortType="number">Def</th>' +
			'<th sortkey="stats.armor" sortType="number">Arm</th>' +
			'<th sortkey="stats.damage" sortType="number">Dam</th>' +
			'<th sortkey="stats.hp" sortType="number">HP</th>' +
			'<th colspan="2" sortkey="forge" sortType="number">Forge</th>' +
			'<th align="left" sortkey="craft" sortType="string">Craft</th>' +
			'<th align="right" sortkey="durabilityPer" sortType="number">' +
				'Dur%</th>' +
			//dropLink +
			'<th width="10"></th>';
	},

	generateInventoryTable: function() {
		var targetId;
		var targetInventory;
		var inventoryShell;

		var reportType = $('input[id="reportType"]').attr('value');
		if (reportType === 'guild') {
			targetId = 'Helper:GuildInventoryManagerOutput';
			targetInventory = FSH.Helper.guildinventory;
			inventoryShell = 'guildinventory';
		} else {
			targetId = 'Helper:InventoryManagerOutput';
			targetInventory = FSH.Helper.inventory;
			inventoryShell = 'inventory';
		}
		if (!targetInventory) {return;}

		var result = FSH.Helper.inventoryTableHeader(reportType);

		FSH.Helper.disableItemColoring = FSH.System.getValue('disableItemColoring');

		var allItems = targetInventory.items;
		var minLvl = parseInt($('input[id="FSH.Helper.inventoryMinLvl"]')
			.attr('value'), 10);
		var maxLvl = parseInt($('input[id="FSH.Helper.inventoryMaxLvl"]')
			.attr('value'), 10);
		var setsOnly = $('input[id="Helper:SetFilter"]').is(':checked');
		for (var i = 0; i < allItems.length;i += 1) {
			var item = allItems[i];

			//continue; if item is filtered.
			if (item.type > 8 ||
				!$('input[id="' + FSH.Helper.itemFilters[item.type].id + '"]')
					.is(':checked') ||
				minLvl > item.stats.min_level ||
				maxLvl < item.stats.min_level || 
				setsOnly && !item.stats.set_name) {continue;}

			if (item.equipped) {item.folder_id = 99999999; } //for sorting purposes.
			item.player_name = '';
			var color;
			var whereTitle = '';
			var whereText = '';
			var p = 0;
			var t = 0;
			if (reportType === 'guild') {
				if (item.player_id === -1) { //guild store
					item.player_name = 'GS';
					color = 'navy';
					whereText = 'GS';
					whereTitle = 'Guild Store';
					p = targetInventory.guild_id;
					t = 4;
				} else {
					item.player_name = targetInventory.members[item.player_id];
					color = 'maroon';
					whereText = item.player_name;
					whereTitle='Guild Report';
					p = item.player_id;
					t = 1;
				}
				p = p + '&currentPlayerId=' + targetInventory.current_player_id;
			} else {
				if (item.equipped) {
					color = 'green';
					whereText = 'Worn';
					whereTitle = 'Wearing it';
				} else {
					color = 'blue';
					whereText = FSH.Helper.inventory.folders[item.folder_id];
					whereTitle = 'In Backpack';
				}
				p = targetInventory.player_id;
				t = 1;
			}

			item.rarityColor = FSH.Helper.disableItemColoring ? '' : ' color:' +
				FSH.Data.rarity[item.rarity].colour;

			item.displayName = item.item_name;
			if (item.equipped) {
				item.displayName = '<b>' + item.displayName + '</b>';
			}
			result += '<tr style="color:' + color + '"><td></td><td><a ' +
				'style="cursor:help;' + item.rarityColor + '" id="Helper:item' +
				i + '" arrayID="' + i + '" class="tip-dynamic" data-tipped="' +
				'fetchitem.php?item_id=' + item.item_id + '&inv_id=' +
				item.inv_id + '&t=' + t + '&p=' + p + '">' + item.displayName +
				'</a>';

			var itemRE = new RegExp('amulet|armor|armored|axe|boots|fist|' +
				'gauntlets|gloves|hammer|helm|helmet|mace|necklace|of|plate|' +
				'ring|rune|shield|sword|the|weapon', 'gi');

			if (item.stats.set_name && reportType === 'guild') {
				result += ' (<a href="/index.php?cmd=guild&subcmd=inventory&' +
					'subcmd2=report&set=' +
					item.item_name.replace(itemRE,'').trim().replace(/  /g,' ')
						.replace(/  /g,' ').replace(/ /g,'|') + '">set</a>)';
			}

			item.craftColor = FSH.Data.craft[item.craft] ?
				FSH.Data.craft[item.craft].colour : '';

			if (item.durability) {
				item.durabilityPer = Math.floor(100 * item.durability /
					item.max_durability);
				item.durabilityColor = item.durabilityPer < 20 ? 'red' : 'gray';
			}

			result += '</td>' +
				'<td align="right">' + item.stats.min_level + '</td>' +
				'<td align="left" title="' + whereTitle + '">' + whereText +
					'</td>' +
				'<td align="left">' + FSH.Data.itemType[item.type] + '</td>' +
				'<td align="right">' + item.stats.attack + '</td>' +
				'<td align="right">' + item.stats.defense + '</td>' +
				'<td align="right">' + item.stats.armor + '</td>' +
				'<td align="right">' + item.stats.damage + '</td>' +
				'<td align="right">' + item.stats.hp + '</td>' +
				'<td align="right">' + item.forge + '</td>' +
				'<td>' + (item.forge > 0 ? '<img src="' + FSH.System.imageServer +
					'/hellforge/forgelevel.gif">':'') + '</td>' +
				'<td align="left">' + '<span style="color:' + item.craftColor +
					';">' + item.craft + '</span>' + '</td>' +
				'<td align="right">' + '<span style="color:' +
					item.durabilityColor + ';">' + item.durabilityPer +
					'</span></td>' +
				'<td></td></tr>';
		}

		result += '</table><input type="hidden" id="xcnum" value="' +
			window.ajaxXC + '" />';

		var output = document.getElementById(targetId);
		output.innerHTML = result;

		var inventoryTable=document.getElementById('Helper:InventoryTable');
		for (i = 0; i < inventoryTable.rows[0].cells.length; i += 1) {
			var cell = inventoryTable.rows[0].cells[i];
			cell.style.textDecoration = 'underline';
			cell.style.cursor = 'pointer';
			cell.addEventListener('click', FSH.Helper.sortInventoryTable, true);
		}

		$('a[id*="Helper:item"]').click(FSH.Helper.inspectInventoryItem);
	},

	inspectInventoryItem: function() {
		var reportType=$('input[id="reportType"]').attr('value');
		var i=$(this).attr('arrayID');
		var html = '';
		var t=1;
		var p=0;
		var targetInventory;
		//http://www.fallensword.com/index.php?cmd=guild&subcmd=inventory&subcmd2=takeitem&guildstore_id=24096093&ajax=1
		if (reportType === 'guild') {
			targetInventory = FSH.Helper.guildinventory;
			html+='<span id="Helper:Recall">';
			if(targetInventory.items[i].player_id===-1){
				p=targetInventory.guild_id;
				t=4;
				html+='&nbsp;<span id="Helper:RecallToBP" style="cursor:pointer; text-decoration:underline; color:blue;" href="' +
						FSH.System.server + 'index.php?cmd=guild&subcmd=inventory&subcmd2=takeitem&guildstore_id=' +
						targetInventory.items[i].inv_id + '">Fast BP</span><br />';
			}else{
				p=targetInventory.items[i].player_id;
				t=1;
				html+='&nbsp;<span id="Helper:RecallToBP" style="cursor:pointer; text-decoration:underline; color:blue;" href="' +
						FSH.System.server + 'index.php?cmd=guild&subcmd=inventory&subcmd2=recall&id=' + targetInventory.items[i].inv_id +
						'&player_id='+ p +'&mode=0">Fast BP</span> |' + '&nbsp;<span id="Helper:RecallToStore" style="cursor:pointer; ' +
						'text-decoration:underline; color:blue;" href="' + FSH.System.server + 'index.php?cmd=guild&subcmd=inventory&' +
						'subcmd2=recall&id=' + targetInventory.items[i].inv_id + '&player_id=' + p + '&mode=1">Fast GS</span><br />';
				if(targetInventory.items[i].equipped){
					html+='<span id="Helper:isEquiped">This item is being worn!</span><br />';
				}
				html+='<span id="Helper:IsWornBy">Is being held by: '+targetInventory.items[i].player_name+'</span><br />';
			}
			html+='</span><br />';
			p=p+'&currentPlayerId='+targetInventory.current_player_id;
		}else{
			targetInventory = FSH.Helper.inventory;
			//'INSTANTLY DROP '+targetInventory.items[i].item_name+'. NO REFUNDS OR DO-OVERS! Use at own risk.'
			html+='<span id="Helper:FolderMove"><select id="Helper:ToFolder"><option value="0">Move to folder</option>';
			for(var key in targetInventory.folders){
				if (!targetInventory.folders.hasOwnProperty(key)) { continue; }
				html+= '<option value="'+key+'">'+targetInventory.folders[key]+'</option>';
			}
			html+='</select><input id="Helper:InitiateMove" type="submit" class="custombutton" value="Move!" invid="'+
					targetInventory.items[i].inv_id+'" ></span><br />';
			html+='<span id="Helper:Drop"><input id="Helper:DropItem" class="custombutton" type="submit" invid="'+
					targetInventory.items[i].inv_id+'"  itemName="'+targetInventory.items[i].item_name+'" value="Drop Item!" /></span><br />' + 
					'<span id="Helper:Send" >send to <input type="text" id="Helper:sendTo" size=5 /><input id="Helper:SendSubmit" ' +
					'class="custombutton" type="submit" invid="'+targetInventory.items[i].inv_id+'" value="Send!"/></span><br />' +
					'<span id="Helper:Wear"><input class="custombutton" type="submit" id="Helper:equipProfileInventoryItem" ' +
					'itemID="' + targetInventory.items[i].inv_id + '" value="Put it on!"></span> <br />' +
					'<span id="Helper:Sell"><a href="http://www.fallensword.com/index.php?cmd=auctionhouse&subcmd=create2&inv_id='+
					targetInventory.items[i].inv_id+'">Post to AH</a></span><br />';
			t=1;
			p=targetInventory.player_id;
		}
		//http://www.fallensword.com/index.php?cmd=auctionhouse&type=-1&search_text=Bahmou%20Mask
		html+='<span id="Helper:SearchAH"><a href="http://www.fallensword.com/index.php?cmd=auctionhouse&type=-1&search_text='+
				encodeURI(targetInventory.items[i].item_name)+'">Search AH</a></span><br /><br />';
		if(targetInventory.items[i].stats.set_name) {
			html += 'Set Name: ' + targetInventory.items[i].stats.set_name +
				'<br />';
		}
		html+='<img src="'+FSH.System.imageServer+'/items/'+targetInventory.items[i].item_id+'.gif" class="tip-dynamic" ' +
				'data-tipped="fetchitem.php?item_id='+targetInventory.items[i].item_id+'&inv_id='+
				targetInventory.items[i].inv_id+'&t='+t+'&p='+p+'" border=0>';
		var $dialog = $('<div></div>')
			.html(html)
			.dialog({
				title: targetInventory.items[i].item_name,
				resizable: false,
				height:350,
				width:300,
				modal: true,
				buttons: {
					'Close' : function() {
						$dialog.dialog( 'close' );
					}
				}
			});
		if (reportType === 'self') {
			document.getElementById('Helper:equipProfileInventoryItem').addEventListener('click', FSH.common.equipProfileInventoryItem, true);
		}
		$('input[id="Helper:DropItem"]').click(function() {
			var answer = confirm('Are you sure you want to drop '+$(this).attr('itemName')+'?');
			if(answer){
				var itemInvId = $(this).attr('invid');
				var dropHref = FSH.System.server + 'index.php?cmd=profile&subcmd=dodropitems&removeIndex[]=' + itemInvId;
				$.ajax({
					url: dropHref,
					success: function( data ) {
						var info = FSH.Layout.infoBox(data);
						var drop=$('span[id="Helper:Drop"]');
						if (info==='Items dropped and destroyed.') {
							drop.html('Item Dropped!');
							drop.css('color','green');
							drop.css('fontWeight','bold');
							drop.css('fontSize','small');
						} else if (info!=='') {
							drop.css('color','red');
							drop.css('fontWeight','bold');
							drop.css('fontSize','small');
							drop.html('Error: ' + info);
						} else {
							drop.css('color','red');
							drop.css('fontSize','small');
							drop.html('Weird Error: check the Tools>Error Console');
							console.log('Post the previous HTML and the following message to the GitHub or to the forum to help us debug this error');
							console.log(data);
						}
					}
				});
			}
		});
		$('input[id="Helper:SendSubmit"]').click(function() {
			var itemInvId = $(this).attr('invid');
			var xcNum = $('input[id="xcnum"]').attr('value');
			var itemRecipient = $('input[id="Helper:sendTo"]').val();
			var sendItemHref = FSH.System.server + 'index.php?cmd=trade&subcmd=senditems&xc=' + xcNum + '&target_username=' + itemRecipient + '&sendItemList[]=' + itemInvId;
			$.ajax({
				url: sendItemHref,
				success: function( data ) {
					var info = FSH.Layout.infoBox(data);
					var send=$('span[id="Helper:Send"]');
					if (info==='Items sent successfully!') {
						send.html('Item sent to ' + itemRecipient + '!');
						send.css('color','green');
						send.css('fontWeight','bold');
						send.css('fontSize','small');
					} else if (info!=='') {
						send.css('color','red');
						send.css('fontWeight','bold');
						send.css('fontSize','small');
						send.html('Error: ' + info);
					} else {
						send.css('color','red');
						send.css('fontSize','small');
						send.html('Weird Error: check the Tools>Error Console');
						console.log('Post the previous HTML and the following message to the GitHub or to the forum to help us debug this error');
						console.log(data);
					}
				}
			});

		});
		$('span[id*="Helper:RecallTo"]').click(function() {
			var href = $(this).attr('href');
			var id = $(this).attr('id');
			$.ajax({
				url: href,
				success: function( data ) {
					var info = FSH.Layout.infoBox(data);
					var recall=$('span[id="'+id+'"]');
					if (info === 'You successfully recalled the item.' ||
						info === 'You successfully took the item into your backpack.') {
						recall.html('Recalled!');
						recall.css('color','green');
						recall.css('fontWeight','bold');
						recall.css('fontSize','small');
					} else if (info!=='') {
						recall.css('color','red');
						recall.css('fontWeight','bold');
						recall.css('fontSize','small');
						recall.html('Error: ' + info);
					} else {
						recall.css('color','red');
						recall.css('fontSize','small');
						recall.html('Weird Error: check the Tools>Error Console');
						console.log('Post the previous HTML and the following message to the GitHub or to the forum to help us debug this error');
						console.log(data);
					}
				}
			});
		});
		$('input[id="Helper:InitiateMove"]').click(function() {
			var itemInvId = $(this).attr('invid');
			var folderID = $('select[id="Helper:ToFolder"]').val();
			var moveHref = FSH.System.server + 'index.php?cmd=profile&subcmd=sendtofolder&folderItem[]='+itemInvId+'&folder_id=' + folderID;
			$.ajax({
				url: moveHref,
				success: function( data ) {
					var info = FSH.Layout.infoBox(data);
					var move=$('span[id="Helper:FolderMove"]');
					if (info==='Items moved to folder successfully!') {
						move.html('Item Moved!');
						move.css('color','green');
						move.css('fontWeight','bold');
						move.css('fontSize','small');
					} else if (info!=='') {
						move.css('color','red');
						move.css('fontWeight','bold');
						move.css('fontSize','small');
						move.html('Error: ' + info);
					} else {
						move.css('color','red');
						move.css('fontSize','small');
						move.html('Weird Error: check the Tools>Error Console');
						console.log('Post the previous HTML and the following message to the GitHub or to the forum to help us debug this error');
						console.log(data);
					}
				}
			});
		});
	},

	sortInventoryTable: function(evt) {
		var targetInventory;
		var reportType=$('input[id="reportType"]').attr('value');
		if (reportType === 'guild') {
			targetInventory = FSH.Helper.guildinventory;
		} else {
			targetInventory = FSH.Helper.inventory;
		}
		var headerClicked=evt.target.getAttribute('sortKey');
		var sortType=evt.target.getAttribute('sortType');
		if (FSH.Helper.sortAsc===undefined) {FSH.Helper.sortAsc=true;}
		if (FSH.Helper.sortBy && FSH.Helper.sortBy===headerClicked) {
			FSH.Helper.sortAsc=!FSH.Helper.sortAsc;
		}
		FSH.Helper.sortBy='item_name';
		targetInventory.items.sort(FSH.Helper.stringSort);

		FSH.Helper.sortBy=headerClicked;
		if (sortType === 'number') {
			targetInventory.items.sort(FSH.Helper.numberSort);
		}
		else {
			targetInventory.items.sort(FSH.Helper.stringSort);
		}
		FSH.Helper.generateInventoryTable();
	},

	InventorySelectFilters: function(evt) {
		FSH.Helper.setItemFilterDefault();
		var checkedValue = evt.target.id==='SelectAllFilters';
		for (var i=0; i<FSH.Helper.itemFilters.length; i += 1) {
			FSH.System.setValue(FSH.Helper.itemFilters[i].id, checkedValue);
		}
		for (i=0; i<FSH.Helper.itemFilters.length; i += 1) {
			document.getElementById(FSH.Helper.itemFilters[i].id).checked = checkedValue;
		}
		setTimeout(function() {
			FSH.Helper.generateInventoryTable();
		});
	},

	toggleCheckboxAndRefresh: function(evt) {
		FSH.System.setValue(evt.target.id, evt.target.checked);
		setTimeout(function() {
			FSH.Helper.generateInventoryTable();
		});
	},

	injectRecipeManager: function(content) {
		if (!content) {content = FSH.Layout.notebookContent();}
		FSH.Helper.recipebook = FSH.System.getValueJSON('recipebook');
		content.innerHTML='<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr style="background-color:#cd9e4b">'+
			'<td width="90%" nobr><b>&nbsp;Recipe Manager</b></td>'+
			'<td width="10%" nobr style="font-size:x-small;text-align:right">[<span id="Helper:RecipeManagerRefresh" style="text-decoration:underline;cursor:pointer">Refresh</span>]</td>'+
			'</tr>' +
			'</table>' +
			'<div style="font-size:small;" id="Helper:RecipeManagerOutput">' +
			'' +
			'</div>';
		if (!FSH.Helper.recipebook) {FSH.Helper.parseInventingStart();}
		document.getElementById('Helper:RecipeManagerRefresh').addEventListener('click', FSH.Helper.parseInventingStart, true);
		FSH.Helper.generateRecipeTable();
	},

	parseInventingStart: function(){
		FSH.Helper.recipebook = {};
		FSH.Helper.recipebook.recipe = [];
		var output=document.getElementById('Helper:RecipeManagerOutput');
		output.innerHTML='<br/>Parsing inventing screen ...<br/>';
		var currentFolder = 1;
		FSH.System.setValue('currentFolder', currentFolder);

		FSH.System.xmlhttp('index.php?cmd=inventing&page=0', FSH.Helper.parseInventingPage, {'page': 0});

	},

	parseInventingPage: function(responseText, callback) {
		var doc=FSH.System.createDocument(responseText);

		var folderIDs = [];
		FSH.Helper.folderIDs = folderIDs; //clear out the array before starting.
		var currentFolder = FSH.System.getValue('currentFolder');
		$(doc).find('a[href*="index.php?cmd=inventing&folder_id="]').each(function(){
			var folderID = /folder_id=([-0-9]+)/.exec($(this).attr('href'))[1]*1;
			folderIDs.push(folderID);
			FSH.Helper.folderIDs = folderIDs;
		});
		
		var folderCount = FSH.Helper.folderIDs.length;
		var folderID = FSH.Helper.folderIDs[currentFolder-1];
		var folderTextElement = $(doc).find('a[href*="index.php?cmd=inventing&folder_id=' + folderID + '"]').closest('td').text();
		
		var folderText = '';
		if (folderTextElement.length > 0) {
			folderText = folderTextElement;
		}
		var output=document.getElementById('Helper:RecipeManagerOutput');
		var currentPage = callback.page;
		var pages = $(doc).find('select[name="page"]:first');
		var nextPage;
		if (folderText.search(/quest/i) === -1) {
			if (pages.length === 0) {return;}
			$(doc).find('a[href*="index.php?cmd=inventing&subcmd=viewrecipe&recipe_id="]').each(function(){
				var recipeLink = $(this).attr('href');
				var recipeId = parseInt(recipeLink.match(/recipe_id=(\d+)/i)[1],10);
				var recipe={
					'img': $(this).closest('tr').find('img').attr('src'),
					'link': recipeLink,
					'name': $(this).text(),
					'id': recipeId};
				output.innerHTML+='Found blueprint: '+ recipe.name + '<br/>';
				FSH.Helper.recipebook.recipe.push(recipe);
			});
			
			nextPage=currentPage+1;
			output.innerHTML += 'Parsing folder '+ currentFolder + ' ... Page ' + nextPage + '... <br/>';

		} else {
			output.innerHTML += 'Skipping folder '+ currentFolder + ' as it has the word "quest" in folder name.<br/>';
			nextPage = pages.find('option:last').text()*1;
		}
		if (nextPage<=pages.find('option:last').text()*1 && currentFolder!==folderCount || currentFolder<folderCount) {
			if (nextPage===pages.find('option:last').text()*1 && currentFolder<folderCount) {
				nextPage = 0;
				folderID = FSH.Helper.folderIDs[currentFolder];
				FSH.System.setValue('currentFolder', currentFolder+1);
			}
			FSH.System.xmlhttp(
				'index.php?cmd=inventing&page=' + nextPage + '&folder_id=' +
				folderID,
				FSH.Helper.parseInventingPage,
				{'page': nextPage}
			);
		}
		else {
			output.innerHTML+='Finished parsing ... Retrieving individual blueprints...<br/>';
			// FSH.Helper.generateRecipeTable();
			FSH.System.xmlhttp('index.php?cmd=inventing&subcmd=viewrecipe&recipe_id=' + FSH.Helper.recipebook.recipe[0].id, FSH.Helper.parseRecipePage, {'recipeIndex': 0});
		}
	},

	parseRecipePage: function(responseText, callback) {
		var doc=FSH.System.createDocument(responseText);
		var output=document.getElementById('Helper:RecipeManagerOutput');
		var currentRecipeIndex = callback.recipeIndex;
		var recipe = FSH.Helper.recipebook.recipe[currentRecipeIndex];

		output.innerHTML+='Parsing blueprint ' + recipe.name +'...<br/>';

		//recipe.credits = FSH.System.findNodeInt('//tr[td/img/@title="Credits"]/td[1]', doc);
		recipe.items = FSH.Helper.parseRecipeItemOrComponent('td[background*="/inventory/2x3.gif"]', doc);
		recipe.components  = FSH.Helper.parseRecipeItemOrComponent('td[background*="/inventory/1x1mini.gif"]', doc);
		recipe.target = FSH.Helper.parseRecipeItemOrComponent('td[background*="/hellforge/2x3.gif"]', doc)[0];

		var nextRecipeIndex = currentRecipeIndex+1;
		if (nextRecipeIndex<FSH.Helper.recipebook.recipe.length) {
			var nextRecipe = FSH.Helper.recipebook.recipe[nextRecipeIndex];
			FSH.System.xmlhttp('index.php?cmd=inventing&subcmd=viewrecipe&recipe_id=' + nextRecipe.id, FSH.Helper.parseRecipePage, {'recipeIndex': nextRecipeIndex});
		}
		else {
			output.innerHTML+='Finished parsing ... formatting ...';
			FSH.Helper.recipebook.lastUpdate = new Date();
			FSH.System.setValueJSON('recipebook', FSH.Helper.recipebook);
			FSH.Helper.generateRecipeTable();
		}
	},

	parseRecipeItemOrComponent: function(jqueryxpath, doc) {
		var results = [];
		$(doc).find(jqueryxpath).each(function(){
			var mouseOver = $(this).find('img').data('tipped');
			var resultAmounts = $(this).parent().next().text();
			//fetchitem.php?item_id=10113&inv_id=-1&t=2&p=1346893&vcode=9d5dd9b780dbca8f4940642a11ee8d1a
			var mouseOverRX = mouseOver.match(/fetchitem.php\?item_id=(\d+)\&inv_id=-1\&t=2\&p=(\d+)\&vcode=([a-z0-9]+)/i);
			var result = {
				img: $(this).find('img').attr('src'),
				id: mouseOverRX[1],
				verify: mouseOverRX[3],
				amountPresent: parseInt(resultAmounts.split('/')[0],10),
				amountNeeded: parseInt(resultAmounts.split('/')[1],10)
			};
			results.push(result);
		});

		return results;
	},

	generateRecipeTable: function() {
		var j;
		var output=document.getElementById('Helper:RecipeManagerOutput');
		var result='<table id="Helper:RecipeTable" width="100%"><tr>' +
			'<th align="left" colspan="2" sortkey="name">Name</th>' +
			'<th align="left">Items</th>' +
			'<th align="left">Components</th>' +
			'<th align="left">Target</th>' +
			'</tr>';
		if (!FSH.Helper.recipebook) {return;}

		var hideRecipes=[];
		if (FSH.System.getValue('hideRecipes')) {
			hideRecipes=FSH.System.getValue('hideRecipeNames').split(',');
		}

		var recipe;
		var c=0;
		for (var i=0; i<FSH.Helper.recipebook.recipe.length;i += 1) {
			recipe=FSH.Helper.recipebook.recipe[i];
			c+= 1;

			if (hideRecipes.indexOf(recipe.name) === -1) {
				result+='<tr class="HelperTableRow'+(1+c % 2)+'" valign="middle">' +
					'<td style="border-bottom:1px solid #CD9E4B;"><a href="' + recipe.link + '"><img border="0" align="middle" src="' +
					recipe.img + '"/></a></td>' +
					'<td style="border-bottom:1px solid #CD9E4B;"><a href="' + recipe.link + '">' + recipe.name + '</a></td>';
				result += '<td style="border-bottom:1px solid #CD9E4B;">';
				if (recipe.items) {
					for (j=0; j<recipe.items.length; j += 1) {
						result += recipe.items[j].amountPresent  + '/' + recipe.items[j].amountNeeded +
							' <img border="0" align="middle" class="tip-dynamic" ' +
							'data-tipped="fetchitem.php?item_id=' +
							recipe.items[j].id + '&inv_id=-1&t=2&p=' + FSH.Layout.playerId() + '&vcode=' + recipe.items[j].verify + '" ' +
							'src="' + recipe.items[j].img + '"/><br/>';
					}
				}
				result += '</td>';
				result += '<td style="border-bottom:1px solid #CD9E4B;">';
				if (recipe.components) {
					for (j=0; j<recipe.components.length; j += 1) {
						result += recipe.components[j].amountPresent + '/' + recipe.components[j].amountNeeded +
							' <img border="0" align="middle" class="tip-dynamic" ' +
							'data-tipped="fetchitem.php?item_id=' +
							recipe.components[j].id + '&inv_id=-1&t=2&p=' + FSH.Layout.playerId() + '&vcode=' + recipe.components[j].verify + '" ' +
							'src="' + recipe.components[j].img + '"/><br/>';
					}
				}
				result += '</td>';
				result += '<td style="border-bottom:1px solid #CD9E4B;">';
				if (recipe.target) {
					result +=' <img border="0" align="middle" class="tip-dynamic" ' +
							'data-tipped="fetchitem.php?item_id=' +
							recipe.target.id + '&inv_id=-1&t=2&p=' + FSH.Layout.playerId() + '&vcode=' + recipe.target.verify + '" ' +
							'src="' + recipe.target.img + '"/><br/>';
				}
				result += '</td>';
				result += '</tr>';
			}
		}
		result+='</table>';
		output.innerHTML=result;

		FSH.Helper.recipebook.lastUpdate = new Date();
		FSH.System.setValueJSON('recipebook', FSH.Helper.recipebook);

		var recipeTable=document.getElementById('Helper:RecipeTable');
		for (i=0; i<recipeTable.rows[0].cells.length; i += 1) {
			var cell=recipeTable.rows[0].cells[i];
			if (cell.getAttribute('sortkey')) {
				cell.style.textDecoration='underline';
				cell.style.cursor='pointer';
				cell.addEventListener('click', FSH.Helper.sortRecipeTable, true);
			}
		}
	},

	sortRecipeTable: function(evt) {
		FSH.Helper.recipebook=FSH.System.getValueJSON('recipebook');
		var headerClicked = evt.target.getAttribute('sortKey');
		var sortType = evt.target.getAttribute('sorttype');
		if (!sortType) {sortType='string';}
		sortType = sortType.toLowerCase();
		if (FSH.Helper.sortAsc === undefined) {FSH.Helper.sortAsc = true;}
		if (FSH.Helper.sortBy && FSH.Helper.sortBy===headerClicked) {
			FSH.Helper.sortAsc=!FSH.Helper.sortAsc;
		}
		FSH.Helper.sortBy=headerClicked;
		switch (sortType) {
			case 'number':
				FSH.Helper.recipebook.recipe.sort(FSH.Helper.numberSort);
				break;
			default:
				FSH.Helper.recipebook.recipe.sort(FSH.Helper.stringSort);
				break;
		}
		FSH.Helper.generateRecipeTable();
	},

	addMarketplaceWidgets: function() {
		var requestTable = FSH.System.findNode('//table[tbody/tr/td/input[@value="Confirm Request"]]');
		var newRow = requestTable.insertRow(2);
		var newCell = newRow.insertCell(0);
		newCell.id = 'warningfield';
		newCell.colSpan = '2';
		newCell.align = 'center';

		document.getElementById('price').addEventListener('keyup', FSH.Helper.addMarketplaceWarning, true);
		document.getElementById('amount').addEventListener('keyup', FSH.Helper.addMarketplaceWarning, true);
	},

	addMarketplaceWarning: function() {
		 var amount = FSH.System.findNode('//input[@id="amount"]').value;
		 var goldPerPoint = FSH.System.findNode('//input[@id="price"]');
		 var warningField = FSH.System.findNode('//td[@id="warningfield"]');
		 var sellPrice = goldPerPoint.value;
		 if (sellPrice.search(/^[0-9]*$/) !== -1) {
			var warningColor = 'green';
			var warningText = '</b><br>This is probably an offer that will please someone.';
			if (sellPrice < 100000) {
				warningColor = 'brown';
				warningText = '</b><br>This is too low ... it just ain"t gonna sell.';
			} else if (sellPrice > 250000) {
				warningColor = 'red';
				warningText = '</b><br>Hold up there ... this is way to high a price ... you should reconsider.';
			}

			warningField.innerHTML = '<span style="color:' + warningColor +
				';">You are offering to buy <b>' + amount +
				'</b> FSP for >> <b>' + FSH.System.addCommas(sellPrice) +
				warningText + ' (Total: ' +
				FSH.System.addCommas(amount * sellPrice +
				Math.ceil(amount * sellPrice * 0.005)) + ')</span>';
		}
	},

	getKillStreak: function(responseText) {
		var doc=FSH.System.createDocument(responseText);
		//Kill&nbsp;Streak:&nbsp;
		var killStreakLocation = $(doc).find('td:contains("Streak:"):last').next();
		var playerKillStreakValue;
		if (killStreakLocation.length > 0) {
			playerKillStreakValue = FSH.System.intValue(killStreakLocation.text());
		}
		var killStreakElement = FSH.System.findNode('//span[@findme="killstreak"]');
		killStreakElement.innerHTML = FSH.System.addCommas(playerKillStreakValue);
		FSH.System.setValue('lastKillStreak', playerKillStreakValue);
		var deathDealerBuff = FSH.System.findNode('//img[contains(@data-tipped,"Death Dealer")]');
		var deathDealerRE = /<b>Death Dealer<\/b> \(Level: (\d+)\)/;
		var deathDealer = deathDealerRE.exec($(deathDealerBuff).data('tipped'));
		var deathDealerPercentage;
		if (deathDealer) {
			var deathDealerLevel = deathDealer[1];
			deathDealerPercentage = Math.min(Math.round(Math.floor(playerKillStreakValue/5) * deathDealerLevel) * 0.01, 20);
		}
		var deathDealerPercentageElement = FSH.System.findNode('//span[@findme="damagebonus"]');
		deathDealerPercentageElement.innerHTML = deathDealerPercentage;
		FSH.System.setValue('lastDeathDealerPercentage', deathDealerPercentage);
	},

	injectCreature: function() {
		FSH.System.xmlhttp('index.php?cmd=profile',
			FSH.Helper.getCreaturePlayerData,
			{	'groupExists': false,
				'groupAttackValue': 0,
				'groupDefenseValue': 0,
				'groupArmorValue': 0,
				'groupDamageValue': 0,
				'groupHPValue': 0,
				'groupEvaluation': false
			}
		);
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=groups', FSH.Helper.checkIfGroupExists);

		var creatureName = FSH.System.findNode('//td[@align="center"]/font[@size=3]/b');
		var doNotKillList=FSH.System.getValue('doNotKillList');
		if (creatureName) {
			creatureName.innerHTML += ' <a href="http://guide.fallensword.com/index.php?cmd=creatures&search_name=' + creatureName.textContent + '&search_level_min=&search_level_max=&search_class=-1" target="_blank">' +
				'<img border=0 title="Search creature in Ultimate FSG" width=10 height=10 src="'+ FSH.System.imageServer + '/temple/1.gif"/></a>' +
				' <a href="http://wiki.fallensword.com/index.php/Special:Search?search=' + creatureName.textContent + '&go=Go" target="_blank">' +
				'<img border=0 title="Search creature in Wiki" width=10 height=10 src="/favicon.ico"/></a>';
			var extraText = 'Add to the do not kill list';
			if (doNotKillList.indexOf(creatureName.textContent.trim()) !== -1) {
				extraText = 'Remove from do not kill list';
			}
			creatureName.innerHTML += '&nbsp;<span style="cursor:pointer;text-decoration:underline;color:blue;font-size:x-small;" ' +
				'id="addRemoveCreatureToDoNotKillList" creatureName="' + creatureName.textContent.trim() + '">' + extraText + '</span>';
			document.getElementById('addRemoveCreatureToDoNotKillList').addEventListener('click', FSH.Helper.addRemoveCreatureToDoNotKillList, true);
		}
	},

	addRemoveCreatureToDoNotKillList: function(evt) {
		var creatureName = evt.target.getAttribute('creatureName');
		var doNotKillList = FSH.System.getValue('doNotKillList');
		var newDoNotKillList = '';
		if (doNotKillList.indexOf(creatureName) !== -1) {
			newDoNotKillList = doNotKillList.replace(creatureName, '');
			newDoNotKillList = newDoNotKillList.replace(',,', ',');
			if (newDoNotKillList.charAt(0) === ',') {
				newDoNotKillList = newDoNotKillList.substring(1,newDoNotKillList.length);
			}
			evt.target.innerHTML = 'Add to the do not kill list';
		} else {
			newDoNotKillList = doNotKillList + (doNotKillList.length !== 0?',':'') + creatureName;
			newDoNotKillList = newDoNotKillList.replace(',,', ',');
			evt.target.innerHTML = 'Remove from do not kill list';
		}
		FSH.System.setValue('doNotKillList',newDoNotKillList);
		FSH.Helper.doNotKillList = newDoNotKillList;
		//refresh the action list
		window.GameData.doAction(-1);
	},

	checkIfGroupExists: function(responseText) {
		var doc=FSH.System.createDocument(responseText);
		var groupExistsIMG = $(doc).find('img[title="Disband Group (Cancel Attack)"]');
		if (groupExistsIMG.length > 0) {
			var groupHref = groupExistsIMG.parents('td:first').find('a:first').attr('href');
			FSH.System.xmlhttp(groupHref, FSH.Helper.getCreatureGroupData);
		}
	},

	getCreatureGroupData: function(responseText) {
		var doc=FSH.System.createDocument(responseText);
		var groupAttackValue = FSH.System.findNode('//table[@width="400"]/tbody/tr/td[contains(.,"Attack:")]',doc).nextSibling.textContent.replace(/,/,'')*1;
		var groupDefenseValue = FSH.System.findNode('//table[@width="400"]/tbody/tr/td[contains(.,"Defense:")]',doc).nextSibling.textContent.replace(/,/,'')*1;
		var groupArmorValue = FSH.System.findNode('//table[@width="400"]/tbody/tr/td[contains(.,"Armor:")]',doc).nextSibling.textContent.replace(/,/,'')*1;
		var groupDamageValue = FSH.System.findNode('//table[@width="400"]/tbody/tr/td[contains(.,"Damage:")]',doc).nextSibling.textContent.replace(/,/,'')*1;
		var groupHPValue = FSH.System.findNode('//table[@width="400"]/tbody/tr/td[contains(.,"HP:")]',doc).nextSibling.textContent.replace(/,/,'')*1;
		FSH.System.xmlhttp('index.php?cmd=profile',
			FSH.Helper.getCreaturePlayerData,
			{	'groupExists': true,
				'groupAttackValue': groupAttackValue,
				'groupDefenseValue': groupDefenseValue,
				'groupArmorValue': groupArmorValue,
				'groupDamageValue': groupDamageValue,
				'groupHPValue': groupHPValue,
				'groupEvaluation': true
			}
		);
	},

	getStat: function(stat, doc) {
		// 'Hidden' returns NaN
		return FSH.System.intValue($(stat, doc)
			.contents()
			.filter(function(){
				return this.nodeType === 3;
			})[0].nodeValue);
	},

	getBonus: function(stat, doc) {
		var target = $(stat, doc);
		var children = target.children();
		if (children.length === 0) {
			children = target.next();
		}
		return FSH.System.intValue(children.text().slice(2, -1));
	},

	getBuffLevel: function(doc, buff) {
		var hasBuff = $('img.tip-static[data-tipped*="b>' + buff + '</b"]',
			doc);
		hasBuff = hasBuff.data('tipped');
		var re = new RegExp('</b> \\(Level: (\\d+)\\)');
		var test = re.exec(hasBuff);
		return test === null ? 0 : FSH.System.intValue(test[1]);
	},

	playerData: function(responseText) {
		var obj = {};
		if (typeof responseText === 'string') {
			obj = FSH.Helper.playerDataString(responseText);
		}
		if (typeof responseText === 'object') {
			obj = FSH.Helper.playerDataObject(responseText);
		}
		return obj;
	},

	playerDataObject: function(responseText) {
		var obj = {
			levelValue: responseText.level,
			attackValue: responseText.attack,
			defenseValue: responseText.defense,
			armorValue: responseText.armor,
			damageValue: responseText.damage,
			hpValue: responseText.hp,
			killStreakValue: FSH.System.intValue(responseText.killstreak)
		};
		return obj;
	},

	playerDataString: function(responseText) {
		var doc = FSH.System.createDocument(responseText);
		var obj = {
			levelValue: FSH.Helper.getStat('#stat-vl', doc),
			attackValue: FSH.Helper.getStat('#stat-attack', doc),
			defenseValue: FSH.Helper.getStat('#stat-defense', doc),
			armorValue: FSH.Helper.getStat('#stat-armor', doc),
			damageValue: FSH.Helper.getStat('#stat-damage', doc),
			hpValue: FSH.Helper.getStat('#stat-hp', doc),
			killStreakValue: FSH.Helper.getStat('#stat-kill-streak', doc),
			//get buffs here later ... DD, CA, DC, Constitution, etc
			counterAttackLevel: FSH.Helper.getBuffLevel(doc, 'Counter Attack'),
			doublerLevel:		FSH.Helper.getBuffLevel(doc, 'Doubler'),
			deathDealerLevel:	FSH.Helper.getBuffLevel(doc, 'Death Dealer'),
			darkCurseLevel: 	FSH.Helper.getBuffLevel(doc, 'Dark Curse'),
			holyFlameLevel: 	FSH.Helper.getBuffLevel(doc, 'Holy Flame'),
			constitutionLevel:	FSH.Helper.getBuffLevel(doc, 'Constitution'),
			sanctuaryLevel: 	FSH.Helper.getBuffLevel(doc, 'Sanctuary'),
			flinchLevel:		FSH.Helper.getBuffLevel(doc, 'Flinch'),
			nightmareVisageLevel:
								FSH.Helper.getBuffLevel(doc, 'Nightmare Visage'),
			superEliteSlayerLevel:
								FSH.Helper.getBuffLevel(doc, 'Super Elite Slayer'),
			fortitudeLevel: 	FSH.Helper.getBuffLevel(doc, 'Fortitude'),
			chiStrikeLevel: 	FSH.Helper.getBuffLevel(doc, 'Chi Strike'),
			terrorizeLevel: 	FSH.Helper.getBuffLevel(doc, 'Terrorize'),
			barricadeLevel: 	FSH.Helper.getBuffLevel(doc, 'Barricade'),
			reignOfTerrorLevel: FSH.Helper.getBuffLevel(doc, 'Reign Of Terror'),
			anchoredLevel:		FSH.Helper.getBuffLevel(doc, 'Anchored'),
			severeConditionLevel:
								FSH.Helper.getBuffLevel(doc, 'Severe Condition'),
			entrenchLevel:		FSH.Helper.getBuffLevel(doc, 'Entrench'),
			cloakLevel: 		FSH.Helper.getBuffLevel(doc, 'Cloak')
		};
		obj.superEliteSlayerMultiplier = Math.round(0.002 *
			obj.superEliteSlayerLevel * 100) / 100;

		if (obj.cloakLevel === 0 || typeof obj.attackValue === 'number' &&
			!isNaN(obj.attackValue)) {return obj;}

		obj.attackBonus = FSH.Helper.getBonus('#stat-attack', doc);
		obj.defenseBonus = FSH.Helper.getBonus('#stat-defense', doc);
		obj.armorBonus = FSH.Helper.getBonus('#stat-armor', doc);
		obj.damageBonus = FSH.Helper.getBonus('#stat-damage', doc);
		obj.hpBonus = FSH.Helper.getBonus('#stat-hp', doc);

		obj.attackValue = obj.attackBonus > obj.levelValue * 10 ||
			obj.attackBonus < obj.levelValue ?
			obj.attackBonus : obj.levelValue * 10;
		obj.defenseValue = obj.defenseBonus > obj.levelValue * 10 ||
			obj.defenseBonus < obj.levelValue ?
			obj.defenseBonus : obj.levelValue * 10;
		obj.armorValue = obj.armorBonus > obj.levelValue * 10 ||
			obj.armorBonus < obj.levelValue ?
			obj.armorBonus : obj.levelValue * 10;
		obj.damageValue = obj.damageBonus > obj.levelValue * 10 ||
			obj.damageBonus < obj.levelValue ?
			obj.damageBonus : obj.levelValue * 10;
		obj.hpValue = obj.hpBonus;
		return obj;
	},

	creatureData: function(ses) {
		var obj = {};
		if ($('#worldPage').length > 0) { // new map
			obj.name    = $('#dialog-viewcreature').find('h2.name').text();
			obj.class   = $('#dialog-viewcreature')
				.find('span.classification')
				.text();
			// obj.level   = FSH.System.intValue($('#dialog-viewcreature')
				// .find('span.level').text());
			obj.attack  = FSH.System.intValue($('#dialog-viewcreature')
				.find('dd.attribute-atk').text());
			obj.defense = FSH.System.intValue($('#dialog-viewcreature')
				.find('dd.attribute-def').text());
			obj.armor   = FSH.System.intValue($('#dialog-viewcreature')
				.find('dd.attribute-arm').text());
			obj.damage  = FSH.System.intValue($('#dialog-viewcreature')
				.find('dd.attribute-dmg').text());
			obj.hp      = FSH.System.intValue($('#dialog-viewcreature')
				.find('p.health-max').text());
		} else { //old UI
			var creatureStatTable = FSH.System
				.findNode('//table[tbody/tr/td[.="Statistics"]]');
			if (!creatureStatTable) {return false;}
			obj.name    = FSH.System.findNode('//td/font[@size="3"][b]')
				.textContent.trim();
			obj.class   = creatureStatTable.rows[1].cells[1].textContent;
			// obj.level   = FSH.System.intValue(creatureStatTable.rows[1].cells[3]
				// .textContent);
			obj.attack  = FSH.System.intValue(creatureStatTable.rows[2].cells[1]
				.textContent);
			obj.defense = FSH.System.intValue(creatureStatTable.rows[2].cells[3]
				.textContent);
			obj.armor   = FSH.System.intValue(creatureStatTable.rows[3].cells[1]
				.textContent);
			obj.damage  = FSH.System.intValue(creatureStatTable.rows[3].cells[3]
				.textContent);
			obj.hp      = FSH.System.intValue(creatureStatTable.rows[4].cells[1]
				.textContent);
		}
		//reduce stats if critter is a SE and player has SES cast on them.
		if (obj.name.search('Super Elite') !== -1) {
			obj.attack -= Math.ceil(obj.attack * ses);
			obj.defense -= Math.ceil(obj.defense * ses);
			obj.armor -= Math.ceil(obj.armor * ses);
			obj.damage -= Math.ceil(obj.damage * ses);
			obj.hp -= Math.ceil(obj.hp * ses);
		}
		return obj;
	},

	evalExtraBuffs: function(combat) {
		combat.extraNotes = '';
		combat.extraNotes += combat.player.superEliteSlayerLevel > 0 ?
			'SES Stat Reduction Multiplier = ' +
			combat.player.superEliteSlayerMultiplier + '<br>':'';

		//math section ... analysis
		//Holy Flame adds its bonus after the armor of the creature has been taken off.
		combat.holyFlameBonusDamage = 0;
		if (combat.creature.class === 'Undead') {
			combat.holyFlameBonusDamage = Math.max(Math.floor(
				(combat.player.damageValue - combat.creature.armor) *
				combat.player.holyFlameLevel * 0.002),0);
			combat.extraNotes += combat.player.holyFlameLevel > 0 ?
				'HF Bonus Damage = ' + combat.holyFlameBonusDamage +
				'<br>':'';
		}

		//Death Dealer and Counter Attack both applied at the same time
		combat.deathDealerBonusDamage =
			Math.floor(combat.player.damageValue * (Math.min(Math.floor(
				combat.player.killStreakValue / 5) * 0.01 *
				combat.player.deathDealerLevel, 20) / 100));

		combat.counterAttackBonusAttack =
			Math.floor(combat.player.attackValue * 0.0025 *
			combat.player.counterAttackLevel);

		combat.counterAttackBonusDamage =
			Math.floor(combat.player.damageValue * 0.0025 *
			combat.player.counterAttackLevel);

		combat.extraStaminaPerHit =
			combat.player.counterAttackLevel > 0 ?
			Math.ceil((1 + combat.player.doublerLevel / 50) * 0.0025 *
			combat.player.counterAttackLevel) : 0;

		//playerAttackValue += counterAttackBonusAttack;
		//playerDamageValue += deathDealerBonusDamage + counterAttackBonusDamage;

		combat.extraNotes += combat.player.deathDealerLevel > 0 ?
			'DD Bonus Damage = ' + combat.deathDealerBonusDamage + '<br>':'';

		if (combat.player.counterAttackLevel > 0) {
			combat.extraNotes += 'CA Bonus Attack/Damage = ' +
				combat.counterAttackBonusAttack + ' / ' +
				combat.counterAttackBonusDamage + '<br>' +
				'CA Extra Stam Used = ' + combat.extraStaminaPerHit + '<br>';
		}

		return combat;

	},

	evalAttack: function(combat) {
		//Attack:
		combat.extraNotes += combat.player.darkCurseLevel > 0 ?
			'DC Bonus Attack = ' + Math.floor(combat.creature.defense *
			combat.player.darkCurseLevel * 0.002) + '<br>':'';

		combat.nightmareVisageAttackMovedToDefense =
			Math.floor(((combat.callback.groupExists ?
			combat.callback.groupAttackValue : combat.player.attackValue) +
			combat.counterAttackBonusAttack) *
			combat.player.nightmareVisageLevel * 0.0025);

		combat.extraNotes += combat.player.nightmareVisageLevel > 0 ?
			'NMV Attack moved to Defense = ' +
			combat.nightmareVisageAttackMovedToDefense + '<br>':'';

		combat.overallAttackValue = (combat.callback.groupExists ?
			combat.callback.groupAttackValue : combat.player.attackValue) +
			combat.counterAttackBonusAttack -
			combat.nightmareVisageAttackMovedToDefense;

		combat.hitByHowMuch = combat.overallAttackValue -
			Math.ceil(combat.attackVariable * (combat.creature.defense -
			combat.creature.defense * combat.player.darkCurseLevel * 0.002));

		if (combat.combatEvaluatorBias === 3) {
			combat.hitByHowMuch = combat.overallAttackValue - Math.ceil(
				combat.creature.defense - combat.creature.defense *
				combat.player.darkCurseLevel * 0.002
			) - 50;
		}

		return combat;

	},

	evalDamage: function(combat) {
		//Damage:
		combat.fortitudeExtraHPs = Math.floor((combat.callback.groupExists ?
			combat.callback.groupHPValue : combat.player.hpValue) *
			combat.player.fortitudeLevel * 0.001);

		combat.extraNotes += combat.player.fortitudeLevel > 0 ?
			'Fortitude Bonus HP = ' + combat.fortitudeExtraHPs + '<br>' : '';

		combat.overallHPValue = (combat.callback.groupExists ?
			combat.callback.groupHPValue : combat.player.hpValue) +
			combat.fortitudeExtraHPs;

		combat.chiStrikeExtraDamage = Math.floor(combat.overallHPValue *
			combat.player.chiStrikeLevel * 0.001);

		combat.extraNotes += combat.player.chiStrikeLevel > 0 ?
			'Chi Strike Bonus Damage = ' + combat.chiStrikeExtraDamage +
			'<br>':'';

		combat.overallDamageValue = (combat.callback.groupExists ?
			combat.callback.groupDamageValue : combat.player.damageValue) +
			combat.deathDealerBonusDamage + combat.counterAttackBonusDamage +
			combat.holyFlameBonusDamage + combat.chiStrikeExtraDamage;

		combat.damageDone = Math.floor(combat.overallDamageValue - (
			combat.generalVariable * combat.creature.armor +
			combat.hpVariable * combat.creature.hp));

		combat.numberOfHitsRequired = combat.hitByHowMuch > 0 ?
			Math.ceil(combat.hpVariable * combat.creature.hp / (
			combat.overallDamageValue < combat.generalVariable *
			combat.creature.armor ? 1 : combat.overallDamageValue -
			combat.generalVariable * combat.creature.armor)) :'-';

		return combat;

	},

	evalDefence: function(combat) {

		combat.overallDefenseValue = (combat.callback.groupExists ?
			combat.callback.groupDefenseValue : combat.player.defenseValue) +
			Math.floor((combat.callback.groupExists ?
			combat.callback.groupDefenseValue : combat.player.defenseValue) *
			combat.player.constitutionLevel * 0.001 ) +
			combat.nightmareVisageAttackMovedToDefense;

		combat.extraNotes += combat.player.constitutionLevel > 0 ?
			'Constitution Bonus Defense = ' +
			Math.floor((combat.callback.groupExists ?
			combat.callback.groupDefenseValue : combat.player.defenseValue) *
			combat.player.constitutionLevel * 0.001) + '<br>':'';

		combat.extraNotes += combat.player.flinchLevel > 0 ?
			'Flinch Bonus Attack Reduction = ' +
			Math.floor(combat.creature.attack * combat.player.flinchLevel *
			0.001) + '<br>':'';

		combat.creatureHitByHowMuch = Math.floor(combat.attackVariable *
			combat.creature.attack - combat.creature.attack *
			combat.player.flinchLevel * 0.001 - combat.overallDefenseValue);

		if (combat.combatEvaluatorBias === 3) {
			combat.creatureHitByHowMuch = Math.floor(combat.creature.attack -
				combat.creature.attack * combat.player.flinchLevel * 0.001 -
				combat.overallDefenseValue - 50);
		}

		return combat;

	},

	evalArmour: function(combat) {
		combat.overallArmorValue = (combat.callback.groupExists ?
			combat.callback.groupArmorValue : combat.player.armorValue) +
			Math.floor(combat.player.armorValue *
			combat.player.sanctuaryLevel * 0.001);

		combat.extraNotes += combat.player.sanctuaryLevel > 0 ?
			'Sanc Bonus Armor = ' + Math.floor(combat.player.armorValue *
			combat.player.sanctuaryLevel * 0.001) + '<br>':'';

		combat.terrorizeEffect = Math.floor(combat.creature.damage *
			combat.player.terrorizeLevel * 0.001);

		combat.extraNotes += combat.player.terrorizeLevel > 0 ?
			'Terrorize Creature Damage Effect = ' +
			combat.terrorizeEffect * -1 + '<br>':'';

		combat.creature.damage -= combat.terrorizeEffect;

		combat.creatureDamageDone = Math.ceil(combat.generalVariable *
			combat.creature.damage - combat.overallArmorValue +
			combat.overallHPValue);

		combat.numberOfCreatureHitsTillDead =
			combat.creatureHitByHowMuch >= 0 ?
			Math.ceil(combat.overallHPValue / (combat.generalVariable *
			combat.creature.damage < combat.overallArmorValue ? 1 :
			combat.generalVariable * combat.creature.damage -
			combat.overallArmorValue)):'-';

		return combat;

	},

	evalAnalysis: function(combat) {
		//Analysis:
		combat.playerHits = combat.numberOfCreatureHitsTillDead === '-' ?
			combat.numberOfHitsRequired : combat.numberOfHitsRequired === '-' ?
			'-' : combat.numberOfHitsRequired >
			combat.numberOfCreatureHitsTillDead ? '-' :
			combat.numberOfHitsRequired;

		combat.creatureHits = combat.numberOfHitsRequired === '-' ?
			combat.numberOfCreatureHitsTillDead :
			combat.numberOfCreatureHitsTillDead === '-' ? '-' :
			combat.numberOfCreatureHitsTillDead > combat.numberOfHitsRequired ?
			'-' : combat.numberOfCreatureHitsTillDead;

		combat.fightStatus = 'Unknown';
		if (combat.playerHits === '-' && combat.creatureHits === '-') {
			combat.fightStatus = 'Unresolved';
		} else if (combat.playerHits === '-') {
			combat.fightStatus = 'Player dies';
		} else if (combat.playerHits === 1) {
			combat.fightStatus = 'Player 1 hits' + (
				combat.numberOfCreatureHitsTillDead -
				combat.numberOfHitsRequired <= 1 ? ', dies on miss' :
				', survives a miss');
		} else if (combat.playerHits > 1) {
			combat.fightStatus = 'Player > 1 hits' + (
				combat.numberOfCreatureHitsTillDead -
				combat.numberOfHitsRequired <= 1 ? ', dies on miss' :
				', survives a miss');
		}

		return combat;

	},

	evalCA: function(combat) {
		if (combat.player.counterAttackLevel > 0 &&
			combat.numberOfHitsRequired === 1) {
			combat.lowestCALevelToStillHit = Math.max(Math.ceil((
				combat.counterAttackBonusAttack - combat.hitByHowMuch + 1) /
				combat.player.attackValue / 0.0025), 0);
			combat.lowestCALevelToStillKill = Math.max(Math.ceil((
				combat.counterAttackBonusDamage - combat.damageDone + 1) /
				combat.player.damageValue / 0.0025), 0);
			combat.lowestFeasibleCALevel =
				Math.max(combat.lowestCALevelToStillHit,
				combat.lowestCALevelToStillKill);
			combat.extraNotes += 'Lowest CA to still 1-hit this creature = ' +
				combat.lowestFeasibleCALevel + '<br>';
			if (combat.lowestFeasibleCALevel !== 0) {
				combat.extraAttackAtLowestFeasibleCALevel =
					Math.floor(combat.player.attackValue * 0.0025 *
					combat.lowestFeasibleCALevel);
				combat.extraDamageAtLowestFeasibleCALevel =
					Math.floor(combat.player.damageValue * 0.0025 *
					combat.lowestFeasibleCALevel);
				combat.extraNotes +=
					'Extra CA Att/Dam at this lowered CA level = ' +
					combat.extraAttackAtLowestFeasibleCALevel + ' / ' +
					combat.extraDamageAtLowestFeasibleCALevel + '<br>';
			}
			combat.extraStaminaPerHitAtLowestFeasibleCALevel =
				combat.player.counterAttackLevel > 0 ? Math.ceil((1 +
				combat.player.doublerLevel / 50) * 0.0025 *
				combat.lowestFeasibleCALevel) :0;
			if (combat.extraStaminaPerHitAtLowestFeasibleCALevel <
				combat.extraStaminaPerHit) {
				combat.extraNotes +=
					'Extra Stam Used at this lowered CA level = ' +
					combat.extraStaminaPerHitAtLowestFeasibleCALevel + '<br>';
			}
			else {
				combat.extraNotes += 'No reduction of stam used at the lower CA level<br>';
			}
		}

		if (combat.numberOfHitsRequired === '-' ||
			combat.numberOfHitsRequired !== 1) {
			combat.lowestCALevelToStillHit = Math.max(Math.ceil((
				combat.counterAttackBonusAttack - combat.hitByHowMuch + 1) /
				combat.player.attackValue / 0.0025), 0);
			combat.lowestCALevelToStillKill = Math.max(Math.ceil((
				combat.counterAttackBonusDamage - combat.damageDone + 1) /
				combat.player.damageValue / 0.0025), 0);
			if (combat.lowestCALevelToStillHit > 175) {
				combat.extraNotes +=
					'Even with CA175 you cannot hit this creature<br>';
			} else if (combat.lowestCALevelToStillHit !== 0) {
				combat.extraNotes += 'You need a minimum of CA' +
					combat.lowestCALevelToStillHit +
					' to hit this creature<br>';
			}
			if (combat.lowestCALevelToStillKill > 175) {
				combat.extraNotes +=
					'Even with CA175 you cannot 1-hit kill this creature<br>';
			} else if (combat.lowestCALevelToStillKill !== 0) {
				combat.extraNotes += 'You need a minimum of CA' +
					combat.lowestCALevelToStillKill +
					' to 1-hit kill this creature<br>';
			}
		}

		return combat;

	},

	evalHTML: function(combat) {

		return '<table width="100%"><tbody>' +
			'<tr><td bgcolor="#CD9E4B" colspan="4" align="center">' +
			(combat.callback.groupExists ? 'Group ':'') +
			'Combat Evaluation</td></tr>' +
			'<tr><td align="right"><span style="color:#333333">' +
			'Will I hit it? </td><td align="left">' +
			(combat.hitByHowMuch > 0 ? 'Yes':'No') +
			'</td><td align="right"><span style="color:#333333">' +
			'Extra Attack: </td><td align="left">( ' +
			combat.hitByHowMuch + ' )</td></tr>' +
			'<tr><td align="right"><span style="color:#333333">' +
			'# Hits to kill it? </td><td align="left">' +
			combat.numberOfHitsRequired +
			'</td><td align="right"><span style="color:#333333">' +
			'Extra Damage: </td><td align="left">( ' + combat.damageDone +
			' )</td></tr>' +
			'<tr><td align="right"><span style="color:#333333">' +
			'Will I be hit? </td><td align="left">' +
			(combat.creatureHitByHowMuch >= 0 ? 'Yes':'No') +
			'</td><td align="right"><span style="color:#333333">' +
			'Extra Defense: </td><td align="left">( ' + -1 *
			combat.creatureHitByHowMuch + ' )</td></tr>' +
			'<tr><td align="right"><span style="color:#333333">' +
			'# Hits to kill me? </td><td align="left">' +
			combat.numberOfCreatureHitsTillDead +
			'</td><td align="right"><span style="color:#333333">' +
			'Extra Armor + HP: </td><td align="left">( ' + -1 *
			combat.creatureDamageDone + ' )</td></tr>' +
			'<tr><td align="right"><span style="color:#333333">' +
			'# Player Hits? </td><td align="left">' + combat.playerHits +
			'</td><td align="right"><span style="color:#333333">' +
			'# Creature Hits? </td><td align="left">' + combat.creatureHits +
			'</td></tr>' +
			'<tr><td align="right"><span style="color:#333333">' +
			'Fight Status: </span></td><td align="left" colspan="3"><span>' +
			combat.fightStatus + '</span></td></tr>' +
			'<tr><td align="right"><span style="color:#333333">' +
			'Notes: </span></td><td align="left" colspan="3">' +
			'<span style="font-size:x-small;">' + combat.extraNotes +
			'</span></td></tr>' +
			'<tr><td colspan="4"><span style="font-size:x-small; ' +
			'color:gray">*Does include CA, DD, HF, DC, Flinch, Super Elite ' +
			'Slayer, NMV, Sanctuary, Constitution, Fortitude, Chi Strike ' +
			'and Terrorize (if active) and allow for randomness (1.1053). ' +
			'Constitution, NMV, Fortitude and Chi Strike apply to group ' +
			'stats.</span></td></tr>' +
			'</tbody></table>';

	},

	getCreaturePlayerData: function(responseText, callback) {

		var combat = {};
		combat.callback = callback;
		//playerdata
		combat.player = FSH.Helper.playerData(responseText);

		combat.combatEvaluatorBias = FSH.System.getValue('combatEvaluatorBias');
		combat.attackVariable = 1.1053;
		combat.generalVariable =
			FSH.Data.bias[combat.combatEvaluatorBias] ?
			FSH.Data.bias[combat.combatEvaluatorBias].generalVariable :
			1.1053;
		combat.hpVariable =
			FSH.Data.bias[combat.combatEvaluatorBias] ?
			FSH.Data.bias[combat.combatEvaluatorBias].hpVariable : 1.1;

		//creaturedata
		var creatureStatTable;
		if ($('#worldPage').length === 0) { // old map
			creatureStatTable = FSH.System
				.findNode('//table[tbody/tr/td[.="Statistics"]]');
			if (!creatureStatTable) {return;}
		}

		combat.creature =
			FSH.Helper.creatureData(combat.player.superEliteSlayerMultiplier);
		combat = FSH.Helper.evalExtraBuffs(combat);
		combat = FSH.Helper.evalAttack(combat);
		combat = FSH.Helper.evalDamage(combat);
		combat = FSH.Helper.evalDefence(combat);
		combat = FSH.Helper.evalArmour(combat);
		combat = FSH.Helper.evalAnalysis(combat);
		combat = FSH.Helper.evalCA(combat);
		combat.evaluatorHTML = FSH.Helper.evalHTML(combat);

		var tempdata;

		if ($('#worldPage').length > 0) { // new map
			if (callback.groupEvaluation) {
				if ($('div#creatureEvaluatorGroup').length === 0) {
					$('#dialog-viewcreature')
						.append('<div id="creatureEvaluatorGroup" ' +
							'style="clear:both;"></div>');
				}
				tempdata = combat.evaluatorHTML.replace(/'/g,'\\\'');
				$('div#creatureEvaluatorGroup').html(tempdata);
			} else {
				if ($('div#creatureEvaluator').length === 0) {
					$('#dialog-viewcreature')
						.append('<div id="creatureEvaluator" ' +
							'style="clear:both;"></div>');
				}
				tempdata = combat.evaluatorHTML.replace(/'/g,'\\\'');
				$('div#creatureEvaluator').html(tempdata);
			}
		} else {
			var newRow = creatureStatTable.insertRow(creatureStatTable.rows.length);
			var newCell = newRow.insertCell(0);
			newCell.colSpan = '4';
			newCell.innerHTML = combat.evaluatorHTML;
		}

	},

	addHistoryWidgets: function() {
		var textArea = FSH.System.findNode('//textarea[@name="history"]');
		if (!textArea) {return;}
		textArea.value = textArea.value.replace(/<br \/>/ig,'');
		var textAreaDiv = textArea.parentNode;
		var bioPreviewHTML = FSH.System.convertTextToHtml(textArea.value);
		var newDiv = document.createElement('div');
		textAreaDiv.appendChild(newDiv);
		newDiv.innerHTML = '<table align="center" width="325" border="1"><tbody>' +
			'<tr><td style="text-align:center;color:#7D2252;background-color:#CD9E4B">Preview</td></tr>' +
			'<tr><td align="left" width="325"><span style="font-size:small;" findme="biopreview">' + bioPreviewHTML +
			'</span></td></tr></tbody></table>';

		document.getElementById('textInputBox').addEventListener('keyup', FSH.Helper.updateHistoryCharacters, true);
	},

	updateHistoryCharacters: function() {
		var textArea = FSH.System.findNode('//textarea[@id="textInputBox"]');
		var previewArea = FSH.System.findNode('//span[@findme="biopreview"]');
		var bioPreviewHTML = FSH.System.convertTextToHtml(textArea.value);
		previewArea.innerHTML = bioPreviewHTML;
	},

	getTotalHistoryCharacters: function(responseText) {
		var doc=FSH.System.createDocument(responseText);
		var historyCharactersText = FSH.System.findNode('//td[.="+20 History Characters"]',doc);
		var historyCharactersRatio = historyCharactersText.nextSibling.nextSibling.nextSibling.nextSibling;
		var historyCharactersValueRE = /(\d+) \/ 250/;
		var historyCharactersValue = historyCharactersValueRE.exec(historyCharactersRatio.innerHTML)[1]*1;
		var historyTotal = FSH.System.findNode('//span[@findme="historytotal"]');
		historyTotal.innerHTML = historyCharactersValue * 20 + 255;
	},

	portalToStartArea: function() {
		if (window.confirm('Are you sure you with to use a special portal back to Krul Island?')) {
			var krulXCV = FSH.System.getValue('krulXCV');
			if (krulXCV) {
				FSH.System.xmlhttp('index.php?cmd=settings&subcmd=fix&xcv=' +
					krulXCV, function() {location.href = 
						'index.php?cmd=world';});
			} else {
				window.alert('Please visit the preferences page to cache your Krul Portal link');
			}
		}
	},

	storePlayerUpgrades: function() {
		var alliesText = FSH.System.findNode('//td[.="+1 Max Allies"]');
		var alliesRatio = alliesText.nextSibling.nextSibling.nextSibling.nextSibling;
		if (alliesRatio) {
			var alliesValueRE = /(\d+) \/ 115/;
			var alliesValue = alliesValueRE.exec(alliesRatio.innerHTML)[1]*1;
			FSH.System.setValue('alliestotal',alliesValue+5);
		}
		var enemiesText = FSH.System.findNode('//td[.="+1 Max Enemies"]');
		var enemiesRatio = enemiesText.nextSibling.nextSibling.nextSibling.nextSibling;
		if (enemiesRatio) {
			var enemiesValueRE = /(\d+) \/ 115/;
			var enemiesValue = enemiesValueRE.exec(enemiesRatio.innerHTML)[1]*1;
			FSH.System.setValue('enemiestotal',enemiesValue+5);
		}
		//~ var maxAuctionsText = FSH.System.findNode('//td[.="+1 Max Auctions"]');
		//~ var maxAuctionsRatio = maxAuctionsText.nextSibling.nextSibling.nextSibling.nextSibling;
		//~ if (maxAuctionsRatio) {
			//~ var maxAuctionsValueRE = /(\d+) \/ 100/;
			//~ var maxAuctionsValue = maxAuctionsValueRE.exec(maxAuctionsRatio.innerHTML)[1]*1;
			//~ FSH.System.setValue('maxAuctions',maxAuctionsValue+2);
		//~ }
		FSH.Helper.injectPoints();
	},

	injectArena: function() {
		var arenaTables = FSH.System.findNodes('//table[@width=620]/tbody/tr/td[contains(.,"Reward")]/../../..');
		var injectHere = FSH.System.findNode('//tr[td/input[@value="Setup Combat Moves..."]]').previousSibling.previousSibling.firstChild;
		var hideMatchesForCompletedMoves = FSH.System.getValue('hideMatchesForCompletedMoves');
		injectHere.innerHTML = '<input id="Helper:hideMatchesForCompletedMoves" type="checkbox"' +
				(hideMatchesForCompletedMoves?' checked':'') + '/>'+
				'<span style="color:blue;">&nbsp;Hide Matches for Completed Moves ' +
				'<div align=center><form id=Helper:arenaFilterForm subject="arena" onSubmit="javascript:return false;">' +
				'Min lvl:<input value="' + FSH.System.getValue('arenaMinLvl') + '" size=5 name="FSH.Helper.arenaMinLvl" id="FSH.Helper.arenaMinLvl" style=custominput/> ' +
				'Max lvl:<input value="' + FSH.System.getValue('arenaMaxLvl') + '" size=5 name="FSH.Helper.arenaMaxLvl" id="FSH.Helper.arenaMaxLvl" style=custominput/> ' +
				'<input id="Helper:arenaFilter" subject="arena" class="custombutton" type="submit" value="Filter"/>' +
				'<input id="Helper:arenaFilterReset" subject="arena" class="custombutton" type="button" value="Reset"/></form></div>'+
				'</span>';
		document.getElementById('Helper:hideMatchesForCompletedMoves').addEventListener('click', FSH.Helper.hideMatchesForCompletedMoves, true);
		document.getElementById('Helper:arenaFilterReset').addEventListener('click', FSH.Helper.resetLevelFilter, true);
		document.getElementById('Helper:arenaFilterForm').addEventListener('submit', FSH.Helper.setLevelFilter, true);

		var arenaMoves = FSH.System.getValueJSON('arenaMoves');
		var hideArenaPrizes = FSH.System.getValue('hideArenaPrizes');
		var hideArenaPrizesArray;
		if (hideArenaPrizes) {
			hideArenaPrizesArray = hideArenaPrizes.split(',');
		}
		var oldArenaMatches = FSH.System.getValueJSON('arenaMatches');
		var arenaMatches;
		if (!oldArenaMatches) {
			arenaMatches = [];
		} else {
			while (oldArenaMatches.length>1000)
			{
				oldArenaMatches.shift();
			}
			arenaMatches = oldArenaMatches;
		}
		var matchFound = false;
		var minLvl=FSH.System.getValue('arenaMinLvl');
		var maxLvl=FSH.System.getValue('arenaMaxLvl');
		var k;
		var prizeSRCShort;
		var aMatch;
		for( var ar = 0; ar < arenaTables.length;ar += 1)
		{
			var arenaTable = arenaTables[ar];
			for (var i=1; i<arenaTable.rows.length; i += 1){
				var row = arenaTable.rows[i];

				matchFound = false;
				aMatch = {};
				var arenaIDRE = /#\s(\d+)/;
				var arenaID = arenaIDRE.exec(row.cells[0].textContent)[1]*1;
				if (oldArenaMatches){
					for (k=0; k<oldArenaMatches.length; k += 1){
						if (oldArenaMatches[k].arenaID === arenaID) {
							matchFound = true;
							break;
						}
					}
				}
				if (!matchFound) {
					aMatch.arenaID = arenaID;
					aMatch.arenaJoinCostHTML = row.cells[2].innerHTML;
					aMatch.arenaSpecialsHTML = row.cells[4].innerHTML;
					if (row.cells[4].innerHTML.search('/pvp/specials_1.gif') !== -1) {
						aMatch.arenaSpecials = true;
					} else {
						aMatch.arenaSpecials = false;
					}
					aMatch.arenaHellForgeHTML = row.cells[5].innerHTML;
					aMatch.arenaEpicHTML = row.cells[6].innerHTML;
					aMatch.arenaMaxEquipHTML = row.cells[7].innerHTML;
					aMatch.arenaRewardHTML = row.cells[8].innerHTML;
					arenaMatches.push(aMatch);
				}

				var prizeSRC = row.cells[8].firstChild.getAttribute('src');
				var maxEquipLvL = row.cells[7].textContent.replace(',','');
				if (hideMatchesForCompletedMoves && arenaMoves && prizeSRC && prizeSRC.search('/pvp/') !== -1) {
					for (var j=0; j<arenaMoves.length; j += 1){
						prizeSRCShort = prizeSRC.substr(prizeSRC.indexOf('/pvp/'),prizeSRC.length);
						var searchText = '/pvp/' + arenaMoves[j].moveID+ '.gif';
						if (prizeSRCShort === searchText && arenaMoves[j].moveCount === 3){
							row.style.visibility = 'hidden';
							row.style.display = 'none';
							break;
						}
					}
				}
				if (prizeSRC && prizeSRC.search('/items/') !== -1) {
					var prizeImgElement = row.cells[8].firstChild;
					var prizeOnmouseover = $(prizeImgElement).data('tipped');
					//var itemIdRE = /ajaxLoadCustom\((\d+)/;
					var itemIdRE = /fetchitem.php\?item_id=(\d+)/;
					var itemId = itemIdRE.exec(prizeOnmouseover)[1];
					prizeOnmouseover = prizeOnmouseover.replace(/""/,'"ItemId = '+itemId+'"');
					prizeImgElement.setAttribute('data-tipped', prizeOnmouseover);
					if (hideArenaPrizes) {
						for (k=0; k<hideArenaPrizesArray.length; k += 1){
							prizeSRCShort = prizeSRC.substr(prizeSRC.indexOf('/items/'),prizeSRC.length);
							var compareStr = '/items/' + hideArenaPrizesArray[k] + '.gif';
							if (prizeSRCShort === compareStr) {
								row.style.visibility = 'hidden';
								row.style.display = 'none';
								break;
							}
						}
					}
				}
				if (!(maxEquipLvL >= minLvl && maxEquipLvL <= maxLvl)) {
					row.style.visibility = 'hidden';
					row.style.display = 'none';
				}

				if (!matchFound) {
					//color new matches since last visit
					row.style.backgroundColor = '#F5F298';
				}
			}
		}
		FSH.System.setValueJSON('arenaMatches', arenaMatches);

		FSH.Helper.getArenaTable();
		FSH.Helper.addEventSortArena();
		if (FSH.System.getValue('autoSortArenaList')) {
			FSH.Helper.sortArenaByHeader('');
		}
	},

	setLevelFilter: function(evt) {
		var filterSubject = evt.target.getAttribute('subject');
		var href = evt.target.getAttribute('href');
		var minLvlSearchText = filterSubject + 'MinLvl';
		var maxLvlSearchText = filterSubject + 'MaxLvl';
		var playerMinLvl = document.getElementById('FSH.Helper.' +
			minLvlSearchText);
		var playerMaxLvl = document.getElementById('FSH.Helper.' +
			maxLvlSearchText);
		if (playerMinLvl.value === '') {
				playerMinLvl.value = FSH.Data.defaults[minLvlSearchText];}
		if (playerMaxLvl.value === '') {
				playerMaxLvl.value = FSH.Data.defaults[maxLvlSearchText];}
		if (!isNaN(playerMinLvl.value)) {
			FSH.System.setValue(minLvlSearchText, parseInt(playerMinLvl.value, 10));
		}
		if (!isNaN(playerMaxLvl.value)) {
			FSH.System.setValue(maxLvlSearchText, parseInt(playerMaxLvl.value, 10));
		}
		if (href) {location.href = FSH.System.server + href;
		} else {location.reload();}
	},

	resetLevelFilter: function(evt) {
		var filterSubject = evt.target.getAttribute('subject');
		var href = evt.target.getAttribute('href');
		var minLvlSearchText = filterSubject + 'MinLvl';
		var maxLvlSearchText = filterSubject + 'MaxLvl';
		FSH.System.setValue(minLvlSearchText, FSH.Data.defaults[minLvlSearchText]);
		document.getElementById('FSH.Helper.' + minLvlSearchText).value =
			FSH.Data.defaults[minLvlSearchText];
		FSH.System.setValue(maxLvlSearchText, FSH.Data.defaults[maxLvlSearchText]);
		document.getElementById('FSH.Helper.' + maxLvlSearchText).value =
			FSH.Data.defaults[maxLvlSearchText];
		if (href) {location.href = FSH.System.server + href;
		} else {location.reload();}
	},

	addEventSortArena: function() {
		var titleCells=FSH.System.findNodes('//td[.="Id"]/../td');
		for (var i=0; i<titleCells.length; i += 1) {
			var cell=titleCells[i];
			cell.innerHTML = cell.innerHTML.replace(/ \[/,'<br>[');
			cell.innerHTML = cell.innerHTML.replace(/&nbsp;/,' ');
			if (cell.innerHTML.search('LvL') !== -1 ||
				cell.innerHTML.search('Join Cost') !== -1 ||
				cell.innerHTML.search('State') !== -1 ||
				cell.innerHTML.search('Specials') !== -1 ||
				cell.innerHTML.search('Hell Forge') !== -1 ||
				cell.innerHTML.search('Epic') !== -1 ||
				cell.innerHTML.search('Id') !== -1){
				cell.style.textDecoration='underline';
				cell.style.cursor='pointer';
				cell.innerHTML=cell.innerHTML.replace(/^&nbsp;/,'');
				cell.addEventListener('click', FSH.Helper.sortArena, true);
			}
		}
	},

	hideMatchesForCompletedMoves: function(evt) {
		FSH.System.setValue('hideMatchesForCompletedMoves', evt.target.checked);
		location.reload();
	},

	sortArena: function(evt) {
		FSH.Helper.sortArenaByHeader(evt.target.textContent.replace(/[ \s]/g,''));
	},

	getArenaTable: function() {
		var list=FSH.System.findNode('//td[.="Id"]/../..');

		FSH.Helper.arenaRows = [];
		for (var i=1; i<list.rows.length; i += 1){
			var theRow=list.rows[i];
			FSH.Helper.arenaRows[i-1] = {
				'ArenaID': theRow.cells[0].textContent,
				'Players': theRow.cells[1].textContent,
				'JoinCost': theRow.cells[2].textContent.replace(/,/g,'')*1,
				'JoinCostHTML': theRow.cells[2].innerHTML,
				'State': theRow.cells[3].textContent,
				'Specials': theRow.cells[4].firstChild.getAttribute('src').search('/specials_1.gif') === -1? 1:0,
				'SpecialsHTML': theRow.cells[4].innerHTML,
				'HellForge': theRow.cells[5].firstChild.getAttribute('src').search('/specials_1.gif') === -1? 1:0,
				'HellForgeHTML': theRow.cells[5].innerHTML,
				'Epic': theRow.cells[6].firstChild.getAttribute('src').search('/specials_1.gif') === -1? 1:0,
				'EpicHTML': theRow.cells[6].innerHTML,
				'MaxEquipLvL': theRow.cells[7].textContent.replace(/,/g,'')*1,
				'MaxEquipLvLHTML': theRow.cells[7].innerHTML,
				'Reward': theRow.cells[8].innerHTML,
				'Action': theRow.cells[9].innerHTML,
				'Visibility': theRow.style.visibility,
				'BackgroundColor': theRow.style.backgroundColor
			};
		}
	},

	sortArenaByHeader: function(headerClicked) {
		if (headerClicked==='') {
			headerClicked = FSH.System.getValue('arenaSortBy');
			if (headerClicked === undefined) {headerClicked='State';}
		} else {
			FSH.System.setValue('arenaSortBy', headerClicked);
		}
		if (headerClicked==='Id') {headerClicked='ArenaID';}

		if (FSH.Helper.sortAsc === undefined) {
			FSH.Helper.sortAsc=FSH.System.getValue('arenaSortAsc');
			if (FSH.Helper.sortAsc === undefined) {FSH.Helper.sortAsc=false;}
		} else {
			if (FSH.Helper.sortBy && FSH.Helper.sortBy===headerClicked) {
				FSH.Helper.sortAsc=!FSH.Helper.sortAsc;
			}
		}
		FSH.System.setValue('arenaSortAsc',FSH.Helper.sortAsc);
		FSH.Helper.sortBy=headerClicked;

		if (headerClicked==='Member' || headerClicked==='State') {
			FSH.Helper.arenaRows.sort(FSH.Helper.stringSort);
		}
		else {
			FSH.Helper.arenaRows.sort(FSH.Helper.numberSort);
		}

		var list=FSH.System.findNode('//td[.="Id"]/../..');
		var result='<tr>' + list.rows[0].innerHTML + '</tr>';

		var minLvl=FSH.System.getValue('arenaMinLvl');
		var maxLvl=FSH.System.getValue('arenaMaxLvl');
		for (var i=0; i<FSH.Helper.arenaRows.length; i += 1){
			var r = FSH.Helper.arenaRows[i];
			//var bgColor=((i % 2)===0)?'bgcolor="#e7c473"':'bgcolor="#e2b960"'
			var bgColor='bgcolor="'+r.BackgroundColor+'"';
			if (r.Action.search('View') !== -1) {
				bgColor = 'bgcolor="#f5e2b3"';
			}
			if (r.Visibility!=='hidden' && r.MaxEquipLvL >= minLvl && r.MaxEquipLvL <= maxLvl) {
				result += '<TR>'+
				'<TD '+bgColor+' style="border-bottom:1px solid #CD9E4B;">'+r.ArenaID+'</TD>'+
				'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.Players+'</TD>'+
				'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.JoinCostHTML+'</TD>'+
				'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.State+'</TD>'+
				'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.SpecialsHTML+'</TD>'+
				'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.HellForgeHTML+'</TD>'+
				'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.EpicHTML+'</TD>'+
				'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.MaxEquipLvLHTML+'</TD>'+
				'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;">'+r.Reward+'</TD>'+
				'<TD '+bgColor+' align="center" style="border-bottom:1px solid #CD9E4B;"><form method="post" action="index.php">'+r.Action+'</form></TD></TR>';
			}
		}
		//result+='<tr>' + list.rows[list.rows.length-1].innerHTML + '</tr>'

		list.innerHTML=result;

		FSH.Helper.addEventSortArena();
	},

	storeArenaMoves: function(){
		var arenaMoves = FSH.System.findNodes('//img[@vspace="4"]');
		var moves = [];
		var arenaMove;
		var aMove;
		for (var i=1; i<arenaMoves.length; i += 1) {
			arenaMove = arenaMoves[i];
			aMove = {};
			var moveGifNumberRE = /(\d+).gif/;
			var moveGifNumber = moveGifNumberRE.exec(arenaMove.getAttribute('src'))[1];
			var moveCountRE = /<\/a><br>(\d)\&nbsp;\/\&nbsp;(\d)/;
			var moveCount = moveCountRE.exec(arenaMove.parentNode.parentNode.innerHTML);
			aMove.moveID = moveGifNumber;
			aMove.moveCount = moveCount[2];
			aMove.moveHREF = arenaMove.getAttribute('src');
			moves.push(aMove);
		}
		FSH.System.setValueJSON('arenaMoves', moves);
	},

	getCombatMoves: function(responseText) {
		var doc=FSH.System.createDocument(responseText);
		var combatMovesTable = FSH.System.findNode('//td[table/tbody/tr/td/table/tbody/tr/td/a[@href="index.php?cmd=arena&subcmd=pickmove&slot_id=1"]]', doc);
		var injectHere = FSH.System.findNode('//span[@id="Helper:combatMoves"]');
		injectHere.innerHTML = combatMovesTable.innerHTML;
	},

	storeCompletedArenas: function() {
		//fix button class and add go to first and last
		var prevButton = FSH.System.findNode('//input[@value="<"]');
		var nextButton = FSH.System.findNode('//input[@value=">"]');
		if (prevButton) {
			prevButton.setAttribute('class', 'custombutton');
			var startButton = document.createElement('input');
			startButton.setAttribute('type', 'button');
			startButton.setAttribute('onclick', prevButton.getAttribute('onclick').replace(/\&page=[0-9]*/, '&page=1'));
			startButton.setAttribute('class', 'custombutton');
			startButton.setAttribute('value', '<<');
			prevButton.parentNode.insertBefore(startButton,prevButton);
		}
		if (nextButton) {
			nextButton.setAttribute('class', 'custombutton');
			var lastPageNode=FSH.System.findNode('//input[@value="Go"]/../preceding-sibling::td');
			var lastPage = lastPageNode.textContent.replace(/\D/g,'');
			var finishButton = document.createElement('input');
			finishButton.setAttribute('type', 'button');
			finishButton.setAttribute('onclick', nextButton.getAttribute('onclick').replace(/\&page=[0-9]*/, '&page=' + lastPage));
			finishButton.setAttribute('class', 'custombutton');
			finishButton.setAttribute('value', '>>');
			nextButton.parentNode.insertBefore(finishButton, nextButton.nextSibling);
		}

		var arenaTable = FSH.System.findNode('//table[@width=620]/tbody/tr/td[contains(.,"Reward")]/table');

		// var arenaMoves = FSH.System.getValueJSON('arenaMoves');
		var oldArenaMatches = FSH.System.getValueJSON('arenaMatches');
		var arenaMatches;
		var aMatch;
		if (!oldArenaMatches) {
			arenaMatches = [];
		} else {
			while (oldArenaMatches.length>1000)
			{
				oldArenaMatches.shift();
			}
			arenaMatches = oldArenaMatches;
		}
		var matchFound = false;

		for (var i=1; i<arenaTable.rows.length-1; i += 1){
			var row = arenaTable.rows[i];
			matchFound = false;
			aMatch = {};
			var arenaIDRE = /#\s(\d+)/;
			var arenaID = arenaIDRE.exec(row.cells[0].textContent)[1]*1;
			if (oldArenaMatches){
				for (var k=0; k<oldArenaMatches.length; k += 1){
					if (oldArenaMatches[k].arenaID === arenaID) {
						matchFound = true;
						break;
					}
				}
			}
			if (!matchFound) {
				aMatch.arenaID = arenaID;
				aMatch.arenaJoinCostHTML = row.cells[2].innerHTML;
				aMatch.arenaSpecialsHTML = row.cells[4].innerHTML;
				if (row.cells[4].innerHTML.search('/pvp/specials_1.gif') !== -1) {
					aMatch.arenaSpecials = true;
				} else {
					aMatch.arenaSpecials = false;
				}
				aMatch.arenaHellForgeHTML = row.cells[5].innerHTML;
				aMatch.arenaMaxEquipHTML = row.cells[6].innerHTML;
				aMatch.arenaRewardHTML = row.cells[7].innerHTML;
				arenaMatches.push(aMatch);
			}
		}
		FSH.System.setValueJSON('arenaMatches', arenaMatches);
	},

	injectArenaSetupMove: function() {
		var node=FSH.System.findNode('//b[.="Setup Combat Moves"]');
		if (!node) {return;}
		node.style.textDecoration = 'underline';
		node.style.color = 'green';
		node.style.cursor= 'pointer';
		node.addEventListener('click', FSH.Helper.changeArenaMove, true);
	},

	changeArenaMove: function() {
		if (document.getElementById('updateMv')) {return;}
		var nodes = FSH.System.findNodes('//a[contains(@href,"index.php?cmd=arena&subcmd=pickmove&slot_id=")]');
		var table = nodes[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		var imgs = FSH.System.findNodes('//img[contains(@src,"pvp/bar_spacer.jpg")]');

		// selection row
		var row=table.insertRow(-1);
		var html='<td></td>';
		var arr=['BL', 'CA','CH','DD','DF','DG', 'LG','PA','SA','PS','CR', 'WK'];
		//		   0	1	 2	  3		4	5	  6		7	8	 9	  10	11
		var i;
		var select = '<option value=x>BA</option>';
		for (i=0; i<arr.length; i += 1) {
			select += '<option value='+i+'>'+arr[i]+'</option>';
		}
		for (i=0; i<nodes.length; i += 1) {
			var s=select;
			var m=nodes[i].firstChild.getAttribute('src');
			if (m.indexOf('bar_icon_holder.jpg')>0) {
				m='x';
			} else {
				m=m.match(/pvp\/(\d+).gif$/)[1];
			}
			html += '<td colspan=3><select id=mv'+i+'>'+s.replace('value='+m+'>','value='+m+' selected>')+'</select></td>';
		}
		row.innerHTML = html;

		// img row
		for (i=0; i<imgs.length; i += 1) {
			imgs[i].width=15;
			imgs[i].height=50;
		}

		// action row
		row=table.insertRow(-1);
		row.innerHTML='<td colspan=31 align=center><input id=updateMv type=button class=custombutton value=Update name=updateMoves></td>';
		document.getElementById('updateMv').addEventListener('click', FSH.Helper.updateMove, true);
	},

	updateMove: function(evt, moves) {
		var mv=[], oldmv=[];
		for (var i=0; i<10; i += 1) {
			mv.push(document.getElementById('mv'+i).value);
		}
		if (moves) {mv = moves;}
		var nodes = FSH.System.findNodes('//a[contains(@href,"index.php?cmd=arena&subcmd=pickmove&slot_id=")]');
		for (i=0; i<nodes.length; i += 1) {
			var m=nodes[i].firstChild.getAttribute('src');
			if (m.indexOf('bar_icon_holder.jpg')>0) {
				m='x';
			} else {
				m=m.match(/pvp\/(\d+).gif$/)[1];
			}
			oldmv.push(m);
		}
		for (i=0; i<10; i += 1) {
			if (mv[i] !== oldmv[i]) {
				FSH.System.xmlhttp('index.php?cmd=arena&subcmd=dopickmove&move_id=x&slot_id='+i);
			}
		}
		setTimeout(function() {
			for (i=0; i<10; i += 1) {
				if (mv[i] !== oldmv[i] && mv[i] !== 'x') {
					FSH.System.xmlhttp('index.php?cmd=arena&subcmd=dopickmove&move_id='+mv[i]+'&slot_id='+i);
				}
			}
			setTimeout(function() {location.reload();}, 500);
		}, 500);
	},

	injectNotepadShowLogs: function(content) {
		if (!content) {content = FSH.Layout.notebookContent();}
		var combatLog = FSH.System.getValue('CombatLog');
		//combatLog = JSON.stringify(combatLog);
		if (combatLog.indexOf(',') === 0)
		{
			//combat logs start with a ,
			combatLog=combatLog.substr(1);
			FSH.System.setValue('CombatLog', combatLog);
		}

		// var playerName = $('dt[id="statbar-character"]').html();
		var yuuzParser = '<tr><td align="center" colspan="4"><b>Log Parser</b></td></tr>'+
			'<tr><td colspan="4" align="center">WARNING: this links to an external site not related to HCS.<br />' +
			'If you wish to visit site directly URL is: http://evolutions.yvong.com/fshlogparser.php<br />'+
			//'NOTE: Combat Log Parser will be updated soon to work with the new combat logs, if your combat loogs look different, the parser may not work.</td></tr>'+
			//'<tr><td colspan=1>Nick (This is used for parsing, it is not case sensitive):</td><td colspan=3><input type="text" name="nick" value="'+playerName+'"></td></tr>'+
			//'<tr><td colspan=1>Doubler Level: </td><td colspan=3><input type="text" name="dob" value=''></td></tr>'+
			//'<tr><td colspan=1>Counter Attack Level: </td><td colspan=3 align="left"><input type="text" name="ca" value=''></td></tr>'+
			'<tr><td colspan=4 align="center"><input type="hidden" value="true" name="submit"><input type="submit" value="Analyze!"></td></tr>';
		content.innerHTML = '<h1>Combat Logs</h1><br /><form action="http://evolutions.yvong.com/fshlogparser.php" method="post" target="_blank">' +
			'<div align="center"><textarea align="center" cols="80" rows="25" ' +
			'readonly style="background-color:white;font-family:Consolas,\'Lucida Console\',\'Courier New\',monospace;" id="Helper:CombatLog" name="logs">[' + combatLog + ']</textarea></div>' +
			'<br /><br /><table width="100%"><tr>'+
			'<td colspan="2" align=center>' +
			'<input type="button" class="custombutton" value="Select All" id="Helper:CopyLog"></td>' +
			'<td colspan="2" align=center>' +
			'<input type="button" class="custombutton" value="Clear" id="Helper:ClearLog"></td>' +
			'</tr>'+yuuzParser+'</table></div>'+
			'</form>';

		document.getElementById('Helper:CopyLog').addEventListener('click', FSH.Helper.notepadCopyLog, true);
		document.getElementById('Helper:ClearLog').addEventListener('click', FSH.Helper.notepadClearLog, true);
	},

	injectSaveSettings: function(){
		var content = FSH.Layout.notebookContent();
		var fshSettings = {};
		var list = GM_listValues();
		//alert(JSON.stringify(list));
		for(var i=0;i<list.length;i += 1) {
		  fshSettings[list[i]]=FSH.System.getValue(list[i]);
		}
		content.innerHTML = '<h1>FSH Settings</h1><br /><center>The box below is your current settings. Copy it to save your current settings<br />' +
			'To load saved settings, simply replace the contents of the box with your saved copy and press the button below.'+
			'<textarea align="center" cols="80" rows="25" style="background-color:white;font-family:Consolas,\'Lucida Console\',\'Courier New\',monospace;" id="HelperfshSettings" name="fshSettings">' + JSON.stringify(fshSettings) + '</textarea>' +
			'<br /><input id="HelperLoadSettings" class="custombutton" type="submit" value="Load Settings!" /></center>';
		$('input#HelperLoadSettings').click(function(){
			var settings = JSON.parse($('textarea#HelperfshSettings').val());
			//alert(JSON.stringify(settings));
			for(var id in settings){
				if (!settings.hasOwnProperty(id)) { continue; }
				FSH.System.setValue(id,settings[id]);
			}
			alert('Settings loaded successfully!');
		});
	},

	notepadCopyLog: function() {
		var combatLog=document.getElementById('Helper:CombatLog');
		combatLog.focus();
		combatLog.select();
	},

	notepadClearLog: function() {
		if (window.confirm('Are you sure you want to clear your log?')) {
			// var combatLog=document.getElementById('Helper:CombatLog');
			FSH.System.setValue('CombatLog', '');
			location.reload();
		}
	},

	guildRelationship: function(txt) {
		var guildSelf = FSH.System.getValue('guildSelf');
		var guildFrnd = FSH.System.getValue('guildFrnd');
		var guildPast = FSH.System.getValue('guildPast');
		var guildEnmy = FSH.System.getValue('guildEnmy');
		if (!guildSelf) {
			guildSelf = '';
			FSH.System.setValue('guildSelf', guildSelf);
		}
		if (!guildFrnd) {
			guildFrnd = '';
			FSH.System.setValue('guildFrnd', guildFrnd);
		}
		if (!guildPast) {
			guildPast = '';
			FSH.System.setValue('guildPast', guildPast);
		}
		if (!guildEnmy) {
			guildEnmy = '';
			FSH.System.setValue('guildEnmy', guildEnmy);
		}
		guildSelf = guildSelf.toLowerCase().replace(/\s*,\s*/, ',').replace(/\s\s*/g, ' ').split(',');
		guildFrnd = guildFrnd.toLowerCase().replace(/\s*,\s*/, ',').replace(/\s\s*/g, ' ').split(',');
		guildPast = guildPast.toLowerCase().replace(/\s*,\s*/, ',').replace(/\s\s*/g, ' ').split(',');
		guildEnmy = guildEnmy.toLowerCase().replace(/\s*,\s*/, ',').replace(/\s\s*/g, ' ').split(',');
		txt = txt.toLowerCase().replace(/\s\s*/g, ' ');
		if (guildSelf.indexOf(txt) !== -1) {return 'self';}
		if (guildFrnd.indexOf(txt) !== -1) {return 'friendly';}
		if (guildPast.indexOf(txt) !== -1) {return 'old';}
		if (guildEnmy.indexOf(txt) !== -1) {return 'enemy';}
		return '';
	},

	displayMiniMap: function() {
		var miniMap = document.getElementById('miniMap');
		if (!miniMap) {
			miniMap = document.createElement('div');
			miniMap.style.position = 'absolute';
			miniMap.style.left = 0;
			miniMap.style.top = 0;
			miniMap.style.display = 'none';
			miniMap.id = 'miniMap';
			miniMap.style.zIndex = '90';
			miniMap.style.filter = 'alpha';
			miniMap.style.opacity = '0.9';

			var objBody = document.getElementsByTagName('body').item(0);
			objBody.insertBefore(miniMap, objBody.firstChild);
		}
		var miniMapName = FSH.System.getValue('miniMapName');
		var miniMapSource = FSH.System.getValue('miniMapSource');
		if (miniMap.style.display !== '') {
			if (miniMapName && FSH.Helper.levelName === miniMapName) {
				miniMap.innerHTML = miniMapSource;
				FSH.Helper.addMiniMapExtras(miniMap);
			}
			else {
				FSH.System.xmlhttp('index.php?cmd=world&subcmd=map', FSH.Helper.loadMiniMap, true);
			}
		}
		else {miniMap.style.display = 'none';}
	},

	loadMiniMap: function(responseText) {
		var size = 20;
		var miniMap = document.getElementById('miniMap');
		var docu = FSH.System.createDocument(responseText);
		//shrink the background down from 40 to 20 and prep it for the mini map POI logic.
		$(docu).find('td[background]').each(function(){
			var background = $(this).attr('background');
			$(this).append('<img width=' + size + ' height=' + size + ' src="' + background + '">')
				.attr('background', '');
		});
		var doc = '<table cellspacing="0" cellpadding="0" align="center" id=miniMapTable>' + $(docu).find('table:first').html() + '</table>';
		doc = doc.replace(/<[^>]*title="You are here"[^>]*>/g, '');
		doc = doc.replace(/<center><table [^>]*><tbody><tr><td[^>]*><\/td><\/tr><\/tbody><\/table><\/center>/g,'');
		doc = doc.replace(/width="40"/g, 'width="' + size + '"').replace(/height="40"/g, 'height="' + size + '"');
		miniMap.innerHTML = doc;
		FSH.Helper.addMiniMapExtras(miniMap);

		if (FSH.Helper.levelName) {FSH.System.setValue('miniMapName', FSH.Helper.levelName);}
		FSH.System.setValue('miniMapSource', doc);
	},

	addMiniMapExtras: function(miniMap) {
		FSH.Helper.markPlayerOnMiniMap();
		FSH.Helper.toogleMiniMapPOI();
		var last=document.getElementById('miniMapTable').insertRow(-1).insertCell(0);
		last.colSpan=document.getElementById('miniMapTable').rows[0].cells.length;
		last.innerHTML = '<span style="color:green;font-size:x-small;font-weight:bolder">'+
			'<br/><h1 class=tipped data-tipped="Click on the player icon and left click drag the path you want to walk. If you walk into a wall or make an error, ' +
				'close and reopen the mini map and start again. Push N (capital n) to activate the auto-walk and watch the mini map as you walk to your ' +
				'new location. The screen will refresh when you get there.">Auto-Walk</h1></span>';
		FSH.Helper.miniMapTableEvents();
		miniMap.style.display = '';
	},

	miniMapTableEvents: function(){
		FSH.Helper.mouse = 0;
		FSH.Helper.moveList=[FSH.Helper.position()];
		document.getElementById('miniMap').addEventListener('mouseup', function(){FSH.Helper.mouse = 0;}, false);
		// collect table cells from the drawing_table div element
		var td = document.getElementById('miniMap').getElementsByTagName('td');
		// attach onMouseDown and onMouseOver event for collected table cells
		for (var i=0; i<td.length; i += 1){
			td[i].addEventListener('mousedown', FSH.Helper.mousedown, true);
			// colorize table cell if left mouse button is pressed
			//fix me?
			td[i].addEventListener('mouseover', FSH.Helper.miniMapMouseOver, true);
		}
	},

	miniMapMouseOver: function(){
		if (FSH.Helper.mouse === 1) {FSH.Helper.markPos(this);}
	},

	mousedown: function(evt){
		// needed for FF to disable dragging
		evt.preventDefault();
		// set pressed mouse button
		FSH.Helper.mouse = evt.which;
		// colorize pixel on mousedown event for TD element
		if (this.tagName === 'TD' && FSH.Helper.mouse === 1) {FSH.Helper.markPos(this);}
	},

	markPos: function(td) {
		var pos={'X':td.cellIndex,'Y':td.parentNode.rowIndex};
		if (!FSH.Helper.moveList[0]) {return;}
		var lastPos=FSH.Helper.moveList[FSH.Helper.moveList.length - 1];
		var dx=pos.X-lastPos.X, dy=pos.Y-lastPos.Y;
		if (dx>=-1 && dx <=1 && dy>=-1 && dy<=1 && (dx!==0 || dy!==0)) {
			FSH.Helper.moveList.push(pos);
			td.innerHTML='';
			td.style.backgroundColor = 'red';
		}
	},

	autoMoveMiniMap: function() {
		if (FSH.Helper.moveList && FSH.Helper.moveList.length > 1) {
			FSH.System.xmlhttp(
				'index.php?cmd=world&subcmd=move&x=' + FSH.Helper.moveList[1].X + 
					'&y=' + FSH.Helper.moveList[1].Y,
				FSH.Helper.autoMoveNext,
				1
			);
		}
	},

	autoMoveNext: function(responseText, id) {
		var currentPos = '('+FSH.Helper.moveList[id].X+', '+FSH.Helper.moveList[id].Y+')';
		if (responseText.indexOf(currentPos)<0) {
			alert('Cannot move via ' + currentPos);
			location.reload();
		} else {
			// update current pos
			FSH.Helper.markPosOnMiniMap(FSH.Helper.moveList[id]);
			// move next
			var nextId = id+1;
			if (nextId < FSH.Helper.moveList.length) {
				FSH.System.xmlhttp(
					'index.php?cmd=world&subcmd=move&x=' +
						FSH.Helper.moveList[nextId].X + '&y=' + 
						FSH.Helper.moveList[nextId].Y,
					FSH.Helper.autoMoveNext,
					nextId);
			} else {location.reload();}
		}
	},

	toogleMiniMapPOI: function() {
		var miniMap = document.getElementById('miniMap');
		var miniMapTable = document.getElementById('miniMapTable');
		var miniMapCover = document.getElementById('miniMapCover');
		if (!miniMapCover) {
			miniMapCover = document.createElement('div');
			miniMapCover.style.position = 'absolute';
			miniMapCover.style.left = 0;
			miniMapCover.style.top = 0;
			miniMapCover.id = 'miniMapCover';
			miniMapCover.style.zIndex = '100';
			miniMapCover.style.filter = 'alpha';
			miniMapCover.style.opacity = '0.4';
			miniMapCover.innerHTML = '<table cellspacing="0" cellpadding="0" align="center">'+
				miniMapTable.innerHTML+'</table>';
			miniMap.insertBefore(miniMapCover, miniMap.firstChild);
		} else {
			miniMap.removeChild(miniMapCover);
			return;
		}

		var nodes = FSH.System.findNodes('//div[@id="miniMapCover"]//td[contains(@class,"tipped")]');
		if (!nodes) {return;}
		for (var i=0; i<nodes.length; i += 1) {
			var tip=$(nodes[i]).data('tipped');
			var color=tip.indexOf(': ') >= 0 ? 'red' :
				tip.indexOf('Stairway to ') >= 0 ? 'green' : 'blue';
			nodes[i].innerHTML = '';
			nodes[i].style.backgroundColor = color;
		}
	},

	markPlayerOnMiniMap: function() {
		var posit = FSH.Helper.position();
		if (!posit) {return;}
		FSH.Helper.markPosOnMiniMap(posit);
	},

	markPosOnMiniMap: function(posit) {
		var miniMapTable = document.getElementById('miniMapTable');
		if (!miniMapTable) {return;}
		var position = miniMapTable.rows[posit.Y].cells[posit.X];
		var background = position.firstChild.src;
		position.innerHTML = '<center><img width=16 height=16 src="' + FSH.System.imageServer + '/skin/player_tile.gif" title="You are here"></center>';
		position.style.backgroundImage = 'url("' + background + '")';
		position.style.backgroundPosition = 'center';
		position.style.backgroundSize = '20px';
	},

	movePage: function(dir) {
		var dirButton = FSH.System.findNode('//input[@value="'+dir+'"]');
		if (!dirButton) {return;}
		var url = dirButton.getAttribute('onClick');
		url = url.replace(/^[^']*'/m, '').replace(/\';$/m, '');
		location.href = url;
	},

	injectPoints: function() { // jquery
		FSH.Helper.currentFSP = FSH.System.intValue($('dt#statbar-fsp').text());
		FSH.Helper.injectUpgradeHelper(0, 'Current');
		FSH.Helper.injectUpgradeHelper(1, 'Maximum');
		$('#pCC td')
			.has('input[name="upgrade_id"][value="3"]')
			.html('<a href="' + FSH.System.server +
				'?cmd=marketplace">Sell at Marketplace</a>');
	},

	injectUpgradeHelper: function(value, type) {
		var theCells = $('#pCC tr')
			.has('input[name="upgrade_id"][value="' + value + '"]')
			.find('td');
		var cell = theCells.first();
		cell.append(' <span style="color:blue" ' +
			'id="totalStam" type="' + type + '"></span>');
		var amountRE = new RegExp('\\+(\\d+) ' + type + ' Stamina');
		var amount = cell.text().match(amountRE)[1];
		$('input[name="quantity"]', theCells)
			.attr('stamtype', type)
			.attr('amount', amount)
			.attr('cost', theCells.eq(1).text())
			.keyup(FSH.Helper.updateStamCount);
	},

	updateStamCount: function(evt) { // jquery
		var target = $(evt.target);
		var amount = target.attr('amount');
		var cost = target.attr('cost');
		var quantity = target.val();
		//cap the value if the user goes over his current FSP
		var color = 'red';
		var extraStam = Math.floor(FSH.Helper.currentFSP / cost) * amount;
		if (quantity * cost <= FSH.Helper.currentFSP) {
			extraStam = quantity * amount;
			color = 'blue';
		}
		$('#pCC span[id="totalStam"][type="' + target.attr('stamtype') + '"]')
			.css('color', color)
			.html('(+' + extraStam + ' stamina)');
	},

	injectTitan: function() {
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=scouttower',
			FSH.Helper.getScoutTowerDetails);
	},

	getScoutTowerDetails: function(responseText) {
		var doc=FSH.System.createDocument(responseText);
		var scoutTowerTable = FSH.System.findNode('//table[tbody/tr/td/img[contains(@src,"/banners/scouttower.png")]]', doc);
		if (scoutTowerTable) {
			var titanTable = FSH.System.findNode('//table[tbody/tr/td/img[contains(@src,"/banners/titankilllog.png")]]');
			var newRow = titanTable.insertRow(0);
			var newCell = newRow.insertCell(0);
			newCell.align = 'center';
			newCell.innerHTML = scoutTowerTable.rows[1].cells[0].innerHTML + '<br><br>' ;
			newRow = titanTable.insertRow(1);
			newCell = newRow.insertCell(0);
			newCell.innerHTML = scoutTowerTable.rows[8].cells[0].innerHTML;
		}
		FSH.Helper.injectScouttowerBuffLinks();
	},

	injectScouttower: function() {
		FSH.Helper.injectScouttowerBuffLinks();
		var titanTable = FSH.System.findNode('//table[@width="500"]');
		for (var i = 1; i < titanTable.rows.length; i += 1) {
			var aRow = titanTable.rows[i];
			if (aRow.cells[2]) {
				var titanHP = aRow.cells[2].textContent;
				if (titanHP.search('-') !== -1) {break;}
				var guildKills = aRow.cells[3].textContent;
				if (guildKills) {
					var titanHPArray = titanHP.split('/');
					var currentHP = parseInt(titanHPArray[0], 10);
					var totalHP = parseInt(titanHPArray[1], 10);
					var currentNumberOfKills = totalHP - currentHP;
					var numberOfKillsToSecure = Math.ceil(totalHP/2 + 1);

					var titanString = '<span style="color:red;">' + (numberOfKillsToSecure - guildKills) + '</span> to secure';
					if (guildKills >= numberOfKillsToSecure) {
						titanString = 'Secured';
					} else if (numberOfKillsToSecure - guildKills > currentHP) {
						titanString = '<span style="color:red;">Cannot Secure</span>';
					}
					var killsPercent = (currentNumberOfKills === 0 ? 0 : guildKills * 100/currentNumberOfKills).toFixed(2);
					var killsTotPct = (guildKills * 100/totalHP).toFixed(2);
					aRow.cells[3].innerHTML += '<br><span style="color:blue;"> (' + killsPercent + '% Current <br>' +
					killsTotPct + '% Total<br>' + titanString + ')';
				}
			}
		}
	},

	injectScouttowerBuffLinks: function() {
		var titanTables = FSH.System.findNodes('//table[tbody/tr/td/font[.="Guild Member"]]');
		var titanTable;
		if (titanTables) {
			for (var i = 0; i < titanTables.length; i += 1) {
				titanTable = titanTables[i];
				var shortList = [];
				if (titanTable.rows.length <= 1) {continue;}
				for (var j = 1; j < titanTable.rows.length; j += 1) {
					if (titanTable.rows[j].cells[1]) {
						var firstCell = titanTable.rows[j].cells[0];
						var playerID = /player_id=(\d+)/.exec(firstCell.innerHTML)[1];
						shortList.push(firstCell.textContent);
						firstCell.innerHTML += ' <a style="color:blue;font-size:10px;" ' +
							FSH.Layout.quickBuffHref(playerID) + '>[b]</a>';
					}
				}
				titanTable.rows[0].cells[0].innerHTML += ' <a style="color:blue;font-size:10px;">all</a>';
				var buffAllLink = titanTable.rows[0].cells[0].firstChild.nextSibling.nextSibling;
				buffAllLink.setAttribute('href',FSH.Layout.buffAllHref(shortList));
			}
		}
	},

	getQuestInfo: function(responseText, callback) {
		var idx = callback.data;
		var doc=FSH.System.createDocument(responseText);
		var questInfoLink = FSH.System.findNode('//a[@id="qiLink' + idx + '"]');
		var questNameNode = FSH.System.findNode('//font[b[.="Quest Details"]]/following-sibling::font[1]', doc);
		if (questNameNode) {
			questInfoLink.innerHTML = questNameNode.innerHTML.replace (/"/g, '');
		} else {
			questInfoLink.innerHTML = 'Unnamed Quest';
		}
		var questInfoElement = FSH.System.findNode('//span[@findme="questinfo' + idx + '"]');
		var trackingHTMLElement = FSH.System.findNode('//font[@color="#003300"]', doc);
		if (trackingHTMLElement) {
			questInfoElement.innerHTML = trackingHTMLElement.innerHTML;
		} else {
			questInfoElement.innerHTML = 'None';
		}
		document.getElementById('dontTrackThisQuest' + idx).addEventListener('click', FSH.questBook.dontTrackThisQuest, true);
	},

	prepareBountyData: function() {
		if (FSH.Helper.enableWantedList) {
			$('div#pCR').prepend('<div class="minibox"><span id="Helper:' +
				'WantedListPlaceholder"></span></div>');
		}
		if (FSH.Helper.enableActiveBountyList) {
			$('div#pCR').prepend('<div class="minibox"><span id="Helper:' +
				'BountyListPlaceholder"></span></div>');
		}
		FSH.Helper.retrieveBountyInfo(FSH.Helper.enableActiveBountyList,
			FSH.Helper.enableWantedList);
	},

	retrieveBountyInfo: function(enableActiveBountyList, enableWantedList) {
		var bountyList = FSH.System.getValueJSON('bountyList');
		var wantedList = FSH.System.getValueJSON('wantedList');
		var bountyListRefreshTime = FSH.System.getValue('bountyListRefreshTime');
		var bwNeedsRefresh = FSH.System.getValue('bwNeedsRefresh');

		bountyListRefreshTime *= 1000;
		if (!bwNeedsRefresh) {
			if (bountyList) {
				if (Date.now() -
					bountyList.lastUpdate.getTime() >
					bountyListRefreshTime) {
					bwNeedsRefresh = true; // invalidate cache
				}
			}
			if (wantedList && !bwNeedsRefresh) {
				if (Date.now() -
					wantedList.lastUpdate.getTime() >
					bountyListRefreshTime) {
					bwNeedsRefresh = true; // invalidate cache
				}
			}
		}

		if (!bountyList || !wantedList || bwNeedsRefresh &&
			(enableActiveBountyList || enableWantedList)) {
			wantedList = {};
			wantedList.bounty = [];
			wantedList.isRefreshed = true;
			wantedList.lastUpdate = new Date();
			wantedList.wantedBounties = false;
			FSH.Helper.activeBountyListPosted = false;

			FSH.System.xmlhttp(
				'index.php?cmd=bounty&page=1',
				FSH.Helper.parseBountyPageForWorld,
				{wantedList:wantedList}
			);
		} else {
			if (enableWantedList) {
				wantedList.isRefreshed = false;
				FSH.Helper.injectWantedList(wantedList);
//alert('wantedList.isRefreshed = '+ wantedList.isRefreshed);
			}
			if (enableActiveBountyList) {
				bountyList.isRefreshed = false;
//alert('bountyList.isRefreshed = ' + bountyList.isRefreshed);
				FSH.Helper.injectBountyList(bountyList);
			}
		}
	},

	parseBountyPageForWorld: function(details, callback) {
		var doc = FSH.System.createDocument(details);
		var enableActiveBountyList = FSH.Helper.enableActiveBountyList;
		var enableWantedList = FSH.Helper.enableWantedList;
		FSH.System.setValue('bwNeedsRefresh', false);
		if (enableWantedList) {
			FSH.Helper.getWantedBountyList(doc, callback);
		}
		if (enableActiveBountyList && !FSH.Helper.activeBountyListPosted) {
			FSH.Helper.getActiveBountyList(doc);
		}
	},

	getWantedBountyList: function(doc, callback) {
		var page = FSH.System.findNode('//input[@name="page"]', doc, $('body'));
		var curPage = parseInt(page.value,10);
		var maxPage = page.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1];
		var activeTable = FSH.System.findNode('//table[@width = "630" and ' +
			'contains(.,"Target")]', doc);
		var wantedNames = FSH.System.getValue('wantedNames');
		var wantedArray = wantedNames.split(',');
		var wantedList = callback.wantedList;
		if (activeTable) {
			for (var i = 1; i < activeTable.rows.length - 2; i+=2) {
				var target = activeTable.rows[i].cells[0].firstChild
					.firstChild.firstChild.textContent;
				if (target === '[ No bounties available. ]') {break;}
				for (var j = 0; j < wantedArray.length; j += 1) {
					if (target === wantedArray[j].trim() || wantedArray.indexOf('*') !== -1) {
						wantedList.wantedBounties = true;
						var bounty = {};
						bounty.target = target;
						bounty.link = activeTable.rows[i].cells[0]
							.firstChild.firstChild.getAttribute('href');
						bounty.lvl = activeTable.rows[i].cells[0]
							.firstChild.firstChild.nextSibling.textContent
								.replace(/\[/, '').replace(/\]/, '');
						bounty.offerer = activeTable.rows[i].cells[1]
							.firstChild.firstChild.firstChild.textContent;
						bounty.reward = activeTable.rows[i].cells[2]
							.textContent;
						bounty.rewardType = activeTable.rows[i].cells[2]
							.firstChild.firstChild.firstChild.firstChild
							.nextSibling.firstChild.title;
						//bounty.rKills = activeTable.rows[i].cells[3].textContent;
						bounty.xpLoss = activeTable.rows[i].cells[3]
							.textContent;
						bounty.posted = activeTable.rows[i].cells[4]
							.textContent;
						bounty.tickets = activeTable.rows[i].cells[5]
							.textContent;
						if (activeTable.rows[i].cells[6].textContent
							.trim() === '[active]') {
							bounty.active = true;
							bounty.accept = '';
						}
						else if (activeTable.rows[i].cells[6].textContent
							.trim() !== '[n/a]') { // TODO
							bounty.active = false;
							bounty.accept = activeTable.rows[i].cells[6]
								.firstChild.firstChild
								.getAttribute('onclick');
						}
						wantedList.bounty.push(bounty);
					}
				}
			}
		}
		if (curPage < maxPage) {
			FSH.System.xmlhttp('index.php?cmd=bounty&page=' + (curPage + 1),
				FSH.Helper.parseBountyPageForWorld, {wantedList:wantedList});
		} else {
			FSH.Helper.injectWantedList(wantedList);
		}
	},

	getActiveBountyList: function(doc) {
		var activeTable = FSH.System.findNode('//table[@width = 620]', doc);
		var bountyList = {};
		bountyList.bounty = [];
		bountyList.isRefreshed = true;
		bountyList.lastUpdate = new Date();

		if (activeTable) {
			if (!/No bounties active/.test(activeTable.rows[1].cells[0]
				.innerHTML)) {
				bountyList.activeBounties = true;
				for (var i = 1; i < activeTable.rows.length - 2; i+=2) {
					var bounty = {};
					bounty.target = activeTable.rows[i].cells[0].firstChild
						.firstChild.firstChild.textContent;
					bounty.link = activeTable.rows[i].cells[0].firstChild
						.firstChild.getAttribute('href');
					bounty.lvl = activeTable.rows[i].cells[0].firstChild
						.firstChild.nextSibling.textContent
						.replace(/\[/, '').replace(/\]/, '');
					bounty.reward = activeTable.rows[i].cells[2]
						.textContent;
					bounty.rewardType = activeTable.rows[i].cells[2]
						.firstChild.firstChild.firstChild.firstChild
						.nextSibling.firstChild.title;
					bounty.posted = activeTable.rows[i].cells[3]
						.textContent;
					bounty.xpLoss = activeTable.rows[i].cells[4]
						.textContent;
					bounty.progress = activeTable.rows[i].cells[5]
						.textContent;

					bountyList.bounty.push(bounty);
				}
			}
			else {
				bountyList.activeBounties = false;
			}
		}
		FSH.Helper.injectBountyList(bountyList);
		FSH.Helper.activeBountyListPosted = true;
	},

	injectBountyList: function(bountyList) {
		FSH.System.setValueJSON('bountyList', bountyList);
		var injectHere = document
			.getElementById('Helper:BountyListPlaceholder');
		var displayList = document.createElement('TABLE');
		//displayList.style.border = '1px solid #c5ad73';
		//displayList.style.backgroundColor = (bountyList.isRefreshed)?'#6a5938':'#4a3918';
		displayList.cellPadding = 1;
		displayList.width = 125;

		var aRow = displayList.insertRow(0); //bountyList.rows.length
		var aCell = aRow.insertCell(0);
		var output = '<h3>Active Bounties</h3><ol style="color:#FFF380;font-' +
			'size:10px;list-style-type:decimal;margin-left:1px;margin-top:' +
			'1px;margin-bottom:1px;padding-left:20px;"><nobr><span id="' +
			'Helper:resetBountyList" style=" font-size:8px; cursor:pointer; ' +
			'text-decoration:underline;">Reset</span><nobr><br>';

		if (bountyList.activeBounties === false) {
			output += '</ol> \f <ol style="color:orange;font-size:10px;list-' +
				'style-type:decimal;margin-left:1px;margin-top:1px;margin-' +
				'bottom:1px;padding-left:10px;">[No Active bounties]</ol>';
		}
		else {
			for (var i = 0; i < bountyList.bounty.length; i += 1) {
				var mouseOverText = '<div>Level:  ' + bountyList.bounty[i].lvl +
					'<br/>Reward: ' + bountyList.bounty[i].reward + ' ' +
					bountyList.bounty[i].rewardType +
					'<br/>XP Loss Remaining: ' + bountyList.bounty[i].xpLoss +
					'<br/>Progress:  ' + bountyList.bounty[i].progress +
					'</div>';

//				output += ' href="' + bountyList.bounty[i].link + '">' + bountyList.bounty[i].target +'</a></li>';
				output += '<li style="padding-bottom:0px;"><a style="color:' +
					'red;font-size:10px;"href="' + FSH.System.server +
					'index.php?cmd=attackplayer&mode=bounty&target_username=' +
					bountyList.bounty[i].target + '">[a]</a>&nbsp;<a style="' +
					'color:#A0CFEC;font-size:10px;"href="' + FSH.System.server +
					'index.php?cmd=message&target_player=' +
					bountyList.bounty[i].target + '">[m]</a> &nbsp;<a href="' +
					bountyList.bounty[i].link + '" class="tip-static" ' +
					'data-tipped="' + mouseOverText + '" style="color:' +
					'#FFF380;font-size:10px;">' + bountyList.bounty[i].target +
					'</a></li>';
			}
		}

		aCell.innerHTML = output;
		var breaker=document.createElement('BR');
		injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
		injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
		document.getElementById('Helper:resetBountyList')
			.addEventListener('click', FSH.Helper.resetBountyList, true);
	},

	resetBountyList: function() {
		FSH.System.setValueJSON('bountyList', null);
		location.reload();
	},

	injectWantedList: function(wantedList) {
		FSH.System.setValueJSON('wantedList', wantedList);
		var injectHere = document
			.getElementById('Helper:WantedListPlaceholder');
		var displayList = document.createElement('TABLE');
		//displayList.style.border = '1px solid #c5ad73';
		//displayList.style.backgroundColor = (wantedList.isRefreshed)?'#6a5938':'#4a3918';
		displayList.cellPadding = 3;
		displayList.width = 125;

		var aRow = displayList.insertRow(0);
		var aCell = aRow.insertCell(0);
		var output = '<h3>Wanted Bounties</h3><ol style="color:#FFF380;font-' +
			'size:10px;list-style-type:decimal;margin-left:1px;margin-top:' +
			'1px;margin-bottom:1px;padding-left:12px;"><nobr> <span id="' +
			'Helper:resetWantedList" font-size:8px; cursor:pointer; text-' +
			'decoration:underline;">Reset</span></nobr><br>';

		if (wantedList.wantedBounties === false) {
			output += '</ol> \f <ol style="color:orange;font-size:10px;list-' +
				'style-type:decimal;margin-left:1px;margin-top:1px;margin-' +
				'bottom:1px;padding-left:7px;">[No wanted bounties]</ol>';
		}
		else {
			for (var i = 0; i < wantedList.bounty.length; i += 1) {
				var mouseOverText = '"<div style=\'text-align:center;width:' +
					'205px;\'>Target Level:  ' + wantedList.bounty[i].lvl +
					'<br/>Offerer: ' + wantedList.bounty[i].offerer +
					'<br/>Reward: ' + wantedList.bounty[i].reward + ' ' +
					wantedList.bounty[i].rewardType +
					//'<br/>Req. Kills: ' + wantedList.bounty[i].rKills +
					'<br/>XP Loss Remaining: ' + wantedList.bounty[i].xpLoss +
					'<br/>Posted: ' + wantedList.bounty[i].posted +
					'<br/>Tickets Req.:  ' + wantedList.bounty[i].tickets;
				mouseOverText += '</div>" ';

				output += '<li style="padding-bottom:0px;margin-left:5px;">';
				output += '<a style= "font-size:10px;';
				if (wantedList.bounty[i].accept) {
					output += 'color:rgb(0,255,0); cursor:pointer; ' +
						'text-decoration:underline blink;" title = "Accept ' +
						'Bounty" onclick="' + wantedList.bounty[i].accept +
						'">[a]</a>&nbsp;';
				} else {
					output += 'color:red;" href="' + FSH.System.server +
						'index.php?cmd=attackplayer&target_username=' +
						wantedList.bounty[i].target + '">[a]</a>&nbsp;';
				}
				output += '<a style="color:#A0CFEC;font-size:10px;"href="j' +

'avascript:openQuickMsgDialog(\'' + wantedList.bounty[i].target + '\');' +

					//FSH.System.server + 'index.php?cmd=message&target_player=' +
					//wantedList.bounty[i].target +
					'">[m]</a> &nbsp;<a class="tip-static" data-tipped=' +
					mouseOverText +
					'style="color:#FFF380;font-size:10px;" href="' +
					wantedList.bounty[i].link + '">' +
					wantedList.bounty[i].target +'</a></li>';
			}
		}

		aCell.innerHTML = output;
		var breaker=document.createElement('BR');
		injectHere.parentNode.insertBefore(breaker, injectHere.nextSibling);
		injectHere.parentNode.insertBefore(displayList, injectHere.nextSibling);
		document.getElementById('Helper:resetWantedList')
			.addEventListener('click', FSH.Helper.resetWantedList, true);
	},

	resetWantedList: function() {
		FSH.System.setValueJSON('wantedList', null);
		location.reload();
	},

	addContact: function(contactList, type) {
		var now = Math.floor(Date.now() / 1000);
		var contactColor;
		var output = '';
		contactList.forEach(function(val) {
			if (now - val.last_login > 1800) {return;} // 30 mins
			contactColor = FSH.System.contactColor(val.last_login, type);

			output += FSH.Layout.allyEnemyContact;
			output = output.replace(/@@username@@/g, val.username);
			output = output.replace(/@@contactColor@@/g, contactColor);
			output = output.replace(/@@level@@/g, val.level);
			output = output.replace(/@@last_login@@/g,
				FSH.System.formatLastActivity(val.last_login));
			output = output.replace(/@@id@@/g, val.id);
		});
		return output;
	},

	toggleCheckAllPlants: function(evt) {
		var plantRE = new RegExp(evt.target.getAttribute('plantRE'));
		var tradeType = evt.target.getAttribute('tradetype');
		var allItems = FSH.System.findNodes('//input[@type="checkbox" and @name="sendItemList[]"]');
		//var ignoreST = document.getElementById('Helper:ignoreSTitems').checked;
		var selectST= $('input[id="Helper:useItemsInSt"]').is(':checked');
		var limit = parseInt($('input[id="Helper:SendHowMany"]').attr('value').replace(/[^0-9]/g,''), 10);
		
		if (allItems) {
			var itemsLen = allItems.length;
			if(tradeType==='secure') {itemsLen=Math.min(100,itemsLen);}
			if(limit>0){itemsLen=Math.min(limit,itemsLen);}
			for (var i = 0; i < allItems.length; i += 1){
				var theImgNode = allItems[i].parentNode.parentNode.previousSibling.firstChild.firstChild.firstChild;
				if(plantRE.exec(theImgNode.getAttribute('src'))) {
					if(/3px solid red/.exec(theImgNode.parentNode.parentNode.style.border) && !selectST) //item in an ST, skip it
						{continue;}//alert('asdf');
					if (allItems[i].checked) {
						allItems[i].checked = false;
					} else {allItems[i].checked = true;}
					if((itemsLen -=1) === 0) {i=allItems.length+1;}
				}
			}
		}
	},

	insertItemsToTrade: function(){
		var insertAt;
		//remove the HCS table... building it myself
		var itemTable=$('<table></table>');
		var items=0;
		var fromFolder=$('input[id="Helper:CurrentFolder"]').val();
		var shouldDisplay;
		var style;
		for(var i=0;i<FSH.Helper.inventory.items.length;i += 1){
			shouldDisplay=true;
			if (fromFolder !== 0 &&
				FSH.Helper.inventory.items[i].folder_id !== fromFolder) {
				shouldDisplay=false;
			}
			if(FSH.Helper.inventory.items[i].equipped) { shouldDisplay=false;}
			//if(!selectST && FSH.Helper.inventory.items[i].is_in_st){ shouldDisplay=false;}
			if(shouldDisplay){
				if (items % 6 === 0) {
					insertAt = $('<tr></tr>');
					itemTable.append(insertAt);
					for(var x=0;x<6;x += 1){
						insertAt.append('<td align="center" id="Helper:itemTD'+(items+x)+'"></td>');
					}
				}
				style='';
				if(FSH.Helper.inventory.items[i].is_in_st){
					style=' style="border: 3px solid red"';
				}

				itemTable
					.find('td[id="Helper:itemTD' + items + '"]')
					.append('<table border=0 cellpadding="0" cellspacing="0"' +
					'><tr><td background="' + FSH.System.imageServer +
					'/inventory/2x3.gif" width="60" height="90" ' + style +
					'><center><img src="' + FSH.System.imageServer + '/items/' +
					FSH.Helper.inventory.items[i].item_id + '.gif" class="tip-' +
					'dynamic" data-tipped="fetchitem.php?item_id=' +
					FSH.Helper.inventory.items[i].item_id + '&inv_id=' +
					FSH.Helper.inventory.items[i].inv_id + '&t=1&p=' +
					FSH.Helper.inventory.player_id + '&currentPlayerId=' +
					FSH.Helper.inventory.player_id + '" border=0></center></td>' +
					'</tr><tr><td align="center"><input type="checkbox" ' +
					'value="' + FSH.Helper.inventory.items[i].inv_id +
					'" name="sendItemList[]" ></td></tr></table>');
				items+= 1;
			}
		}
		$('table[id="item-list"]').children().remove();
		$('table[id="item-list"]').append(itemTable.html());
	},

	injectTrade: function() {
		$('table[id="item-list"]')
			.closest('tr')
			.before('<tr id="Helper:selectMultiple"></tr>')
			.before('<tr id="Helper:folderSelect"></tr>')
			.before('<tr id="Helper:showSTs"></tr>');
		//$('tr[id="Helper:selectMultiple"]').append('<td colspan=6>Multiple Select</td>');
		var sendClasses = FSH.System.getValue('sendClasses');
		var itemList = JSON.parse('[' + sendClasses.replace(/'/g, '"') + ']');
		var output = '';
		var allResRE='';
		var i;
		for (i=0;i<itemList.length;i += 1) {
			output += '<span plantRE="' + itemList[i][1] +'" style="cursor:' +
				'pointer; text-decoration:underline;"' + 'id="Helper:checkAll' +
				i + '">' + itemList[i][0] + '</span> &ensp;';
			allResRE+=itemList[i][1]+'|';
		}
		output='Select: &ensp;<span style="cursor:pointer; text-decoration:' +
			'underline;" plantRE=".*" id="Helper:checkAll' + i +
			'">All Items</span> &ensp; <span plantRE="' +
			allResRE.substr(0,allResRE.length-1) + '" style="cursor:pointer; ' +
			'text-decoration:underline;"id="Helper:checkAll' + (i + 1) +
			'">All Resources</span> &ensp;' + output;
		output += 'Select <input id="Helper:SendHowMany" type="text" ' +
			'class="custominput" value="all" size=3 />';
		$('tr[id="Helper:selectMultiple"]')
			.append('<td colspan=6>' + output + '</td>');
		for (i=0;i<itemList.length+1;i += 1) {
			document
				.getElementById('Helper:checkAll'+i)
				.addEventListener(
					'click',
					FSH.Helper.toggleCheckAllPlants,
					true
				);
		}
		$.getJSON('?cmd=export&subcmd=inventory', FSH.Helper.processTrade);
	},

	processTrade: function(data) {
		FSH.Helper.inventory = data;
		for(var i=0;i<FSH.Helper.inventory.items.length;i += 1){
			if(FSH.Helper.inventory.items[i].is_in_st){
				$('input[value="'+FSH.Helper.inventory.items[i].inv_id+'"]').closest('tr').prev().find('td[background="' +
						FSH.System.imageServer + '/inventory/2x3.gif"]').css('border','3px solid red');
			}
		}
		//append main folder
		var folders='<input type="hidden" id="Helper:CurrentFolder" value=0 /><span id="FolderID0" fid=0 style="cursor:pointer; ' +
					'text-decoration:underline;">All</span> <span id="FolderID-1" fid="-1" style="cursor:pointer; ' +
					'text-decoration:underline;">Main</span> ';
		for (var key in FSH.Helper.inventory.folders){//FSH.Helper.inventory.folders[key]
			if (!FSH.Helper.inventory.folders.hasOwnProperty(key)) { continue; }
			folders+='<span id="FolderID'+key+'" fid='+key+' style="cursor:pointer; text-decoration:underline;">'+
						FSH.Helper.inventory.folders[key]+'</span> ';
			//folders+='<label><input type="radio" name="all" value='+key+' /> '+FSH.Helper.inventory.folders[key]+'</label>, ';
		}
		$('tr[id="Helper:folderSelect"]').append('<td colspan=6>'+folders+'</td>');//retrieving folder names...
		$('span[id*="FolderID"]').click(function(){
			//alert($(this).attr('fid'));
			$('input[id="Helper:CurrentFolder"]').attr('value',$(this).attr('fid'));
			//alert($('input[id="Helper:CurrentFolder"]').val());
			FSH.Helper.insertItemsToTrade();
		});
		$('tr[id="Helper:showSTs"]').append('<td align="center" colspan=6><label id="Helper:useItemsInStCont"><input type="checkbox" id="Helper:useItemsInSt" checked /> Select items in ST</label></td>');
		//FSH.Helper.insertItemsToTrade(); //rebuilds item list - not required - takes a second to load and mostly not needed.
	},

	injectAttackPlayer: function() {
		var b = FSH.System.findNode('//input[contains(@value, "Activate!")]');
		if (b !== null) {
			var oldOnclick = b.getAttribute('onClick');
			b.setAttribute('onClick', 'if (confirm("Are you sure you want to activate PvP Prestige?")) { ' + oldOnclick + '}');
		}
		if (!FSH.System.getValue('enableAttackHelper')) {return;}
		//inject current stats, buffs and equipment
		var attackPlayerTable = FSH.System.findNode('//table[tbody/tr/td/font/b[.="Attack Player (PvP)"]]');
		if (!attackPlayerTable) {return;}
		var targetPlayer = /target_username=([a-zA-Z0-9]+)/.exec(location.search);
		if (targetPlayer) {
			var output = '<center><table width="625" cellspacing="0" cellpadding="0" bordercolor="#000000" border="0" style="border-style: solid; border-width: 1px;"><tbody>';
			output += '<tr style="text-align:center;" bgcolor="#cd9e4b"><td width="350" style="border-style: solid; border-width: 1px;">Attacker</td><td width="275" style="border-style: solid; border-width: 1px;">Defender</td></tr>';
			output += '<tr style="text-align:center;"><td style="border-style: solid; border-width: 1px;"><span id="Helper:attackPlayerSelfStatData"><font color="green">Gathering your stats ...</font></span></td>'+
				'<td style="border-style: solid; border-width: 1px;"><span id="Helper:attackPlayerDefenderStatData"><font color="green">Gathering defender stats ...</font></span></td></tr>';
			output += '<tr style="text-align:center;"><td style="border-style: solid; border-width: 1px;"><span id="Helper:attackPlayerSelfBuffData"><font color="green">Gathering your buffs ...</font></span></td>' +
				'<td style="border-style: solid; border-width: 1px;"><span id="Helper:attackPlayerDefenderBuffData"><font color="green">Gathering defender buffs ...</font></span></td></tr>';
			output += '</tbody></table><center>';

			attackPlayerTable.rows[4].cells[0].innerHTML = output;
			
			//FSH.System.xmlhttp('index.php?cmd=profile', FSH.Helper.getSelfProfileStatsAndBuffs);
			FSH.System.xmlhttp('index.php?cmd=profile', FSH.Helper.getProfileStatsAndBuffs, {'anchor1':'attackPlayerSelfStatData','anchor2':'attackPlayerSelfBuffData'});
			FSH.System.xmlhttp('index.php?cmd=findplayer&search_active=1&search_level_max=&search_level_min=&search_username='+targetPlayer[1]+'&search_show_first=1', FSH.Helper.getProfileStatsAndBuffs, {'anchor1':'attackPlayerDefenderStatData','anchor2':'attackPlayerDefenderBuffData'});
			//insert blank row
			var newRow = attackPlayerTable.insertRow(5);
			var newCell = newRow.insertCell(0);
			newCell.innerHTML = '&nbsp;';
		}
	},

	getProfileStatsAndBuffs: function(responseText, callback) {
		var doc = FSH.System.createDocument(responseText);
		//stats
		var vlTextElement = FSH.System.findNode('//td[a/b[.="VL"] or b/a[.="VL"]]', doc);
		var vlValueElement = vlTextElement.nextSibling;
		var pvpTextElement = FSH.System.findNode('//td[b[contains(.,"PvP")]]', doc);
		var pvpValueElement = pvpTextElement.nextSibling;
		var attackTextElement = FSH.System.findNode('//td[b[contains(.,"Attack:")]]', doc);
		var attackValueElement = attackTextElement.nextSibling;
		var defenseTextElement = FSH.System.findNode('//td[b[contains(.,"Defense:")]]', doc);
		var defenseValueElement = defenseTextElement.nextSibling;
		var armorTextElement = FSH.System.findNode('//td[b[contains(.,"Armor:")]]', doc);
		var armorValueElement = armorTextElement.nextSibling;
		var damageTextElement = FSH.System.findNode('//td[b[contains(.,"Damage:")]]', doc);
		var damageValueElement = damageTextElement.nextSibling;
		var hpTextElement = FSH.System.findNode('//td[b[contains(.,"Health:")]]', doc);
		var hpValueElement = hpTextElement.nextSibling;
		var goldTextElement = FSH.System.findNode('//td[b[contains(.,"Gold:")]]', doc);
		var goldValueElement = goldTextElement.nextSibling;
		var pvpProtElement = FSH.System.findNode('//td[contains(.,"PvP") and contains(.,"Protection")]', doc);
		var lastActivityElement = FSH.System.findNode('//p[contains(.,"Last Activity:")]', doc);
		var output = '<table width="100%"><tbody>';
		if (lastActivityElement) {
			output += '<tr><td colspan=4 style="text-align:center;">' +
				lastActivityElement.innerHTML + '</td></tr>';}
		output += '<tr><td width="15%" style="text-align:right;">' + vlTextElement.innerHTML + '</td><td width="30%" style="text-align:left;">' + vlValueElement.innerHTML + '</td>' +
			'<td width="25%" style="text-align:right;">' + pvpTextElement.innerHTML + '</td><td width="30%" style="text-align:left;">' + pvpValueElement.innerHTML + '</td></tr>';
		output += '<tr><td width="15%" style="text-align:right;">' + attackTextElement.innerHTML + '</td><td width="30%" style="text-align:left;">' + attackValueElement.innerHTML + '</td>' +
			'<td width="25%" style="text-align:right;">' + defenseTextElement.innerHTML + '</td><td width="30%" style="text-align:left;">' + defenseValueElement.innerHTML + '</td></tr>';
		output += '<tr><td width="15%" style="text-align:right;">' + armorTextElement.innerHTML + '</td><td width="30%" style="text-align:left;">' + armorValueElement.innerHTML + '</td>' +
			'<td width="25%" style="text-align:right;">' + damageTextElement.innerHTML + '</td><td width="30%" style="text-align:left;">' + damageValueElement.innerHTML + '</td></tr>';
		output += '<tr><td width="15%" style="text-align:right;">' + hpTextElement.innerHTML + '</td><td width="30%" style="text-align:left;">' + hpValueElement.innerHTML + '</td>' +
			'<td width="25%" style="text-align:right;">' + goldTextElement.innerHTML + '</td><td width="30%" style="text-align:left;">' + goldValueElement.innerHTML + '</td></tr>';
		output += '<tr><td colspan=4 style="text-align:center;">' + pvpProtElement.innerHTML + '</td></tr>';
		output += '</tbody></table>';
		var anchor1 = callback.anchor1;
		var injectHere = FSH.System.findNode('//span[@id="Helper:'+anchor1+'"]');
		injectHere.innerHTML = output;
		//buffs
		var activeBuffsTitleRow = FSH.System.findNode('//strong[.="Active Buffs"]/ancestor::div[1]', doc);
		var activeBuffsElement = activeBuffsTitleRow.nextSibling.nextSibling;
		var anchor2 = callback.anchor2;
		injectHere = FSH.System.findNode('//span[@id="Helper:'+anchor2+'"]');
		injectHere.innerHTML = activeBuffsElement.innerHTML;
	},

	injectScavenging: function() {
		var injectHere=FSH.System.findNode('//b[contains(.,"Multiple Scavenging Results")]/..');
		if (injectHere) { // multi scavenging
			var victories=FSH.System.findNodes('//td[contains(.,"victorious")]');
			if (victories) {
				injectHere.innerHTML+='<br/>Victories: '+victories.length;
			}
			var defeats=FSH.System.findNodes('//td[contains(.,"defeated")]');
			if (defeats) {
				injectHere.innerHTML+=', Defeated: '+defeats.length;
			}
			var gains=FSH.System.findNodes('//td[contains(.,"Item Gained")]/b');
			if (gains) {
				injectHere.innerHTML+='<br/>'+gains.length+' item(s): ';
				var gainHash={};
				for (var i=0;i<gains.length;i += 1) {
					if (gainHash[gains[i].textContent]) {
						gainHash[gains[i].textContent]+= 1;
					} else {
						gainHash[gains[i].textContent]=1;
					}
				}
				for (var item in gainHash) {
					if (!gainHash.hasOwnProperty(item)) { continue; }
					injectHere.innerHTML+=gainHash[item]+' '+item+'(s), ';
				}
			}
		}
		FSH.System.xmlhttp('index.php?cmd=world', FSH.Helper.getBpCountFromWorld);
	},

	getBpCountFromWorld: function(responseText) {
		// backpack counter
		var doc=FSH.System.createDocument(responseText);
		var bp=FSH.System.findNode('//td[a/img[contains(@src,"_manageitems.gif")]]',doc);
		var injectHere=document.getElementById('reportDiv');
		if (!injectHere) {
			injectHere=FSH.System.findNode('//b[contains(.,"Multiple Scavenging Results")]/..');
		}
		injectHere.appendChild(bp);
	},

	setupGuildLogFilters: function() {
		FSH.Helper.guildLogFilters = [
			{'id':'showRecallMessages', 'type':'Store/Recall'},
			{'id':'showRelicMessages', 'type':'Relic'},
			{'id':'showMercenaryMessages', 'type':'Mercenary'},
			{'id':'showGroupCombatMessages', 'type':'Group Combat'},
			{'id':'showDonationMessages', 'type':'Donation'},
			{'id':'showRankingMessages', 'type':'Ranking'},
			{'id':'showGvGMessages', 'type':'GvG'},
			{'id':'showTaggingMessages', 'type':'Tag/UnTag'}
		];
	},

	injectNewGuildLog: function(content){
		if (!content) {content=FSH.Layout.notebookContent();}

		FSH.Helper.setupGuildLogFilters();

		//store the time zone for use in processing date/times
		var gmtOffsetMinutes = (new Date()).getTimezoneOffset();
		FSH.Helper.gmtOffsetMilli = gmtOffsetMinutes * 60 * 1000;

		//find the time the guild log was stored last
		FSH.Helper.storedGuildLog = FSH.System.getValueJSON('storedGuildLog');
		if (FSH.Helper.storedGuildLog) {
			// var lastMessageIndex = FSH.Helper.storedGuildLog.logMessage.length;
			FSH.Helper.lastStoredGuildLogMessage = FSH.Helper.storedGuildLog.logMessage[0].logMessage;
			FSH.Helper.lastStoredGuildLogMessagePostTime = FSH.Helper.storedGuildLog.logMessage[0].postDateAsLocalMilli;
		}

		FSH.Helper.newStoredGuildLog = {logMessage:[]};

		var newhtml='<table cellspacing="0" cellpadding="0" border="0" width="100%">' +
			'<tr style="background-color:#cd9e4b"><td width="80%" nobr><b>&nbsp;Guild Log Version 3</b></td>' +
				'<td><span id="Helper:ResetNewGuildLog" style="text-decoration:underline;cursor:pointer;color:blue;">Reset</span>' +
				'&nbsp;<a href="index.php?cmd=guild&subcmd=log"><span style="color:blue;">Old Guild Log</span></a></td></tr>' +
			'<tr><td colspan=2>' +
				'<table><tbody><tr><td><b>Filters:</b></td>' +
				'<td><table><tbody><tr><td>';
		for (var i=0; i<FSH.Helper.guildLogFilters.length; i += 1) {
			var guildLogFilterID = FSH.Helper.guildLogFilters[i].id;
			FSH.Helper[guildLogFilterID] = FSH.System.getValue(guildLogFilterID);
			newhtml += i % 5 === 0 ? '</td></tr><tr><td>' : '';
			newhtml+='&nbsp;' +FSH.Helper.guildLogFilters[i].type+ 's:<input id="'+guildLogFilterID+'" type="checkbox" linkto="'+guildLogFilterID+'"' +
					(FSH.Helper[guildLogFilterID]?' checked':'') + '/>';
		}
		newhtml += '</td></tr><tr><td>&nbsp;<span id=GuildLogSelectAll>[Select All]</span>&nbsp;<span id=GuildLogSelectNone>[Select None]</span>' +
				'</td></tr></tbody></table></td></tr>'+
			'<tr><td colspan=2><span style="color:blue;" id="Helper:NewGuildLogLoadingMessage">Loading Page 1 ...</span></td></tr>' +
			'</tbody></table>';
		newhtml += '<table width="100%" cellspacing="0" cellpadding="2" border="0" id="Helper:GuildLogInjectTable"><tbody>' +
			'<tr><td width="16" bgcolor="#cd9e4b"></td><td width="20%" bgcolor="#cd9e4b">Date</td><td width="80%" bgcolor="#cd9e4b">Message</td></tr>' +
			'<tr><td class="divider" colspan="3"></td></tr>' +
			'</tbody></table>';
		content.innerHTML=newhtml;

		document.getElementById('Helper:ResetNewGuildLog').addEventListener('click', FSH.Helper.resetNewGuildLog, true);

		var guildLogInjectTable = document.getElementById('Helper:GuildLogInjectTable');
		var loadingMessageInjectHere = document.getElementById('Helper:NewGuildLogLoadingMessage');

		for (i=0; i<FSH.Helper.guildLogFilters.length; i += 1) {
			document.getElementById(FSH.Helper.guildLogFilters[i].id).addEventListener('click', FSH.Helper.toggleGuildLogFilterVisibility, true);
		}
		document.getElementById('GuildLogSelectAll').addEventListener('click', FSH.Helper.guildLogSelectFilters, true);
		document.getElementById('GuildLogSelectNone').addEventListener('click', FSH.Helper.guildLogSelectFilters, true);

		var oldMaxPagesToFetch = FSH.System.getValue('oldNewGuildLogHistoryPages');
		oldMaxPagesToFetch = oldMaxPagesToFetch ? parseInt(oldMaxPagesToFetch,10) : 100;
		var maxPagesToFetch = parseInt(FSH.System.getValue('newGuildLogHistoryPages') - 1,10);
		FSH.System.setValue('oldNewGuildLogHistoryPages', maxPagesToFetch);
		var completeReload = false;
		if (maxPagesToFetch > oldMaxPagesToFetch) {completeReload = true;}
		//fetch guild log page and apply filters
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=log', FSH.Helper.parseGuildLogPage,
			{'guildLogInjectTable': guildLogInjectTable, 'pageNumber': 1, 'loadingMessageInjectHere': loadingMessageInjectHere, 'maxPagesToFetch': maxPagesToFetch, 'completeReload': completeReload});
	},

	resetNewGuildLog: function() {
		FSH.System.setValueJSON('storedGuildLog', '');
		location.reload();
	},

	toggleGuildLogFilterVisibility: function(evt) {
		var filterID = evt.target.id;
		var filterChecked = evt.target.checked;
		var logRows = FSH.System.findNodes('//tr[@id="GuildLogFilter:' + filterID + '"]');
		if (logRows) {
			for (var i=0;i<logRows.length;i += 1) {
				var logRow = logRows[i];
				if (filterChecked) {
					logRow.style.display = '';
					logRow.style.visibility = 'visible';
				} else {
					logRow.style.display = 'none';
					logRow.style.visibility = 'hidden';
				}
			}
		}
		FSH.System.setValue(filterID,filterChecked);
		FSH.Helper[filterID] = filterChecked;
	},

	guildLogSelectFilters: function(evt) {
		var checkedValue = evt.target.id==='GuildLogSelectAll';
		for (var i=0; i<FSH.Helper.guildLogFilters.length; i += 1) {
			FSH.System.setValue(FSH.Helper.guildLogFilters[i].id, checkedValue);
			document.getElementById(FSH.Helper.guildLogFilters[i].id).checked = checkedValue;
		}
		var logRows = FSH.System.findNodes('//tr[contains(@id,"GuildLogFilter:")]');
		if (logRows) {
			for (i=0;i<logRows.length;i += 1) {
				var logRow = logRows[i];
				var rowID = logRow.getAttribute('id');
				if (checkedValue) {
					logRow.style.display = '';
					logRow.style.visibility = 'visible';
				} else if (rowID !== 'GuildLogFilter:Unknown') {
					logRow.style.display = 'none';
					logRow.style.visibility = 'hidden';
				}
			}
		}
	},

	parseGuildLogPage: function(responseText, callback) {
		var pageNumber = callback.pageNumber;
		var maxPagesToFetch = callback.maxPagesToFetch;
		var completeReload = callback.completeReload;
		var guildLogInjectTable = callback.guildLogInjectTable;
		var loadingMessageInjectHere = callback.loadingMessageInjectHere;
		var doc=FSH.System.createDocument(responseText);

		var logTable = $(doc).find('table.width_full:first');

		//if the whole first page is new, then likely that the stored log needs to be refreshed, so go ahead and do so
		if (pageNumber === 1) {
			var lastRowInTable = logTable.find('tr>td:not(.divider)').parent(':last');
			var lastRowCellContents = lastRowInTable.find('td:eq(1)').text();
			var lastRowPostDateAsDate = FSH.System.parseDate(lastRowCellContents);
			var lastRowPostDateAsLocalMilli = lastRowPostDateAsDate.getTime() - FSH.Helper.gmtOffsetMilli;
			if (lastRowPostDateAsLocalMilli > FSH.Helper.lastStoredGuildLogMessagePostTime) {completeReload = true;}
		} else {
			completeReload = false;
		}

		var localLastCheckMilli;
		var localDateMilli;
		var enableLogColoring = FSH.System.getValue('enableLogColoring');
		if (enableLogColoring) {
			var lastCheckScreen = 'lastGuildLogCheck';
			localLastCheckMilli=FSH.System.getValue(lastCheckScreen);
			if (!localLastCheckMilli) {
				localLastCheckMilli = Date.now();
			}
			localDateMilli = Date.now();
		}

		logTable.find('tr:gt(0):has(td:not(.divider))').each(function(){
			var cellContents = $(this).children('td:eq(1)').text();
			if (!cellContents || cellContents === 'Date' || cellContents.split(' ').length === 1) {return;}
			var postDateAsDate = FSH.System.parseDate(cellContents);
			var postDateAsLocalMilli = postDateAsDate.getTime() - FSH.Helper.gmtOffsetMilli;

			//if the post date is the same as last one in the stored list and the message is the same, then break out
			//and start appending the stored values instead of parsing.
			FSH.Helper.stopProcessingLogPages = false;
			if (postDateAsLocalMilli === FSH.Helper.lastStoredGuildLogMessagePostTime && $(this).html() === FSH.Helper.lastStoredGuildLogMessage && !completeReload) {
				FSH.Helper.stopProcessingLogPages = true;
				return false;
			}
			var displayRow = true;
			var rowTypeID = 'GuildLogFilter:Unknown';
			var messageText = $(this).children('td:eq(2)').text();
			//if recall message, check to see if showRecallMessages is checked.
			if (messageText.search('recalled the item') !== -1 ||
				messageText.search('took the item') !== -1 ||
				messageText.search('auto-returned the') !== -1 ||
				messageText.search('stored the item') !== -1) {
				if (!FSH.Helper.showRecallMessages) {
					displayRow = false;
				}
				rowTypeID = 'GuildLogFilter:showRecallMessages';
			}
			//Tag/Untag (showTaggingMessages)
			else if (messageText.search('has added flags to some of guild\'s stored items costing a total of') !== -1 ||
				messageText.search('has removed flags to the guild"s stored items.') !== -1) {
				if (!FSH.Helper.showTaggingMessages) {
					displayRow = false;
				}
				rowTypeID = 'GuildLogFilter:showTaggingMessages';
			}
			//Relic messages (showRelicMessages)
			else if (messageText.search('relic. This relic now has an empower level of') !== -1 ||
				messageText.search(/ empowered the .+ relic/) !== -1 ||
				messageText.search('relic. The relic empower level has been reset to zero.') !== -1 ||
				messageText.search('failed to capture the relic') !== -1 ||
				messageText.search('captured the relic') !== -1 ||
				messageText.search('captured your relic') !== -1 ||
				messageText.search('has captured the undefended relic') !== -1 ||
				messageText.search('attempted to capture your relic') !== -1) {
				if (!FSH.Helper.showRelicMessages) {
					displayRow = false;
				}
				rowTypeID = 'GuildLogFilter:showRelicMessages';
			}
			//Mercenary messages (showMercenaryMessages)
			else if (messageText.search('disbanded a mercenary.') !== -1 ||
				messageText.search('hired the mercenary') !== -1) {
				if (!FSH.Helper.showMercenaryMessages) {
					displayRow = false;
				}
				rowTypeID = 'GuildLogFilter:showMercenaryMessages';
			}
			//Group Combat messages (showGroupCombatMessages)
			else if (messageText.search('has disbanded one of their groups') !== -1 ||
				messageText.search(/A group from your guild was (.*) in combat./) !== -1) {
				if (!FSH.Helper.showGroupCombatMessages) {
					displayRow = false;
				}
				rowTypeID = 'GuildLogFilter:showGroupCombatMessages';
			}
			//Donation messages (showDonationMessages)
			else if (messageText.search(/deposited ([,0-9]+) FallenSword Points into the guild./) !== -1 ||
				messageText.search(/deposited ([,0-9]+) gold into the guild bank/) !== -1) {
				if (!FSH.Helper.showDonationMessages) {
					displayRow = false;
				}
				rowTypeID = 'GuildLogFilter:showDonationMessages';
			}
			//Ranking messages (showRankingMessages)
			else if (messageText.search('has added a new rank entitled') !== -1 ||
				messageText.search('has deleted the rank') !== -1 ||
				messageText.search('has requested to join the guild') !== -1 ||
				messageText.search('has invited the player') !== -1 ||
				messageText.search('has officially joined the guild') !== -1 ||
				messageText.search('has been kicked from the guild by') !== -1 ||
				messageText.search('has left the guild') !== -1 ||
				messageText.search('has been assigned the rank') !== -1) {
				if (!FSH.Helper.showRankingMessages) {
					displayRow = false;
				}
				rowTypeID = 'GuildLogFilter:showRankingMessages';
			}
			//GvG messages (showGvGMessages)
			else if (messageText.search('resulted in a draw. Your GvG rating and Guild RP was unaffected.') !== -1 ||
				messageText.search(/resulted in (.*) with a final score of/) !== -1 ||
				messageText.search('has just initiated a conflict with the guild') !== -1 ||
				messageText.search('has initiated a conflict with your guild') !== -1 ||
				messageText.search('is participating in the conflict against the guild') !== -1) {
				if (!FSH.Helper.showGvGMessages) {
					displayRow = false;
				}
				rowTypeID = 'GuildLogFilter:showGvGMessages';
			}

			//display the row or effectively hide it
			newRow = $(this).clone(true);
			if (!displayRow) {
				newRow.css('display','none')
					.css('visibility','hidden');
			}
			newRow.id = rowTypeID;
			newRow.appendTo(guildLogInjectTable);
			var postAge = (localDateMilli - postDateAsLocalMilli)/(1000*60);
			if (enableLogColoring && postDateAsLocalMilli > localLastCheckMilli) {
				newRow.css('backgroundColor','#F5F298');
			}
			else if (enableLogColoring && postAge > 20 && postDateAsLocalMilli <= localLastCheckMilli) {
				newRow.css('backgroundColor', '#CD9E4B');
			}
			var newLogMessage = {
				postDateAsLocalMilli: postDateAsLocalMilli,
				rowTypeID: rowTypeID,
				logMessage: newRow.html()
			};
			FSH.Helper.newStoredGuildLog.logMessage.push(newLogMessage);
			//create following spacer row
			var spacerRow = $('<tr></tr>');
			if (!displayRow) {
				spacerRow.css('display','none')
					.css('visibility','hidden');
			}
			spacerRow.id = rowTypeID;
			spacerRow.appendTo(guildLogInjectTable);
			spacerRow.html('<td class="divider" colspan="3"></td>');
			newLogMessage = {
				postDateAsLocalMilli: postDateAsLocalMilli,
				rowTypeID: rowTypeID,
				logMessage: spacerRow.html()
			};
			FSH.Helper.newStoredGuildLog.logMessage.push(newLogMessage);
		});

		if (FSH.Helper.stopProcessingLogPages) {
			loadingMessageInjectHere.innerHTML = 'Processing stored logs ...';
			for (var i=0;i<FSH.Helper.storedGuildLog.logMessage.length;i += 1) {
				var logMessageArrayItem = FSH.Helper.storedGuildLog.logMessage[i];
				var newRow = document.createElement('TR');
				var displayRow = true;
				for (var j=0; j<FSH.Helper.guildLogFilters.length; j += 1) {
					var guildLogFilterID = FSH.Helper.guildLogFilters[j].id;
					var rowTypeID = 'GuildLogFilter:' + guildLogFilterID;
					if (logMessageArrayItem.rowTypeID === rowTypeID) {
						displayRow = FSH.Helper[guildLogFilterID];
						break;
					}
				}
				newRow.style.display = '';
				newRow.style.visibility = '';
				if (!displayRow) {
					newRow.style.display = 'none';
					newRow.style.visibility = 'hidden';
				}
				newRow.id = logMessageArrayItem.rowTypeID;
				guildLogInjectTable.appendChild(newRow);
				newRow.innerHTML = logMessageArrayItem.logMessage;
				var postAge = (localDateMilli - logMessageArrayItem.postDateAsLocalMilli)/(1000*60);
				if (enableLogColoring && newRow.cells[2] && logMessageArrayItem.postDateAsLocalMilli > localLastCheckMilli) {
					newRow.style.backgroundColor = '#F5F298';
				}
				else if (enableLogColoring && newRow.cells[2] && postAge > 20 && logMessageArrayItem.postDateAsLocalMilli <= localLastCheckMilli) {
					newRow.style.backgroundColor = '#CD9E4B';
				}
				var newLogMessage = {
					postDateAsLocalMilli: logMessageArrayItem.postDateAsLocalMilli,
					rowTypeID: logMessageArrayItem.rowTypeID,
					logMessage: logMessageArrayItem.logMessage
				};
				FSH.Helper.newStoredGuildLog.logMessage.push(newLogMessage);
			}
		}

		var page = $(doc).find('input[name="page"]');
		var maxPage = page.parent().html().match(/of&nbsp;(\d*)/)[1];

		//fetch the next page (if necessary)
		if (pageNumber < maxPage && pageNumber < maxPagesToFetch && !FSH.Helper.stopProcessingLogPages) {
			var nextPage = parseInt(pageNumber+1,10);
			loadingMessageInjectHere.innerHTML = 'Loading Page ' + (nextPage + 1) + ' of ' + Math.floor(maxPagesToFetch+1,maxPage) + '...';
			FSH.System.xmlhttp('index.php?cmd=guild&subcmd=log&subcmd2=&page=' + nextPage + '&search_text=', FSH.Helper.parseGuildLogPage,
				{'guildLogInjectTable': guildLogInjectTable, 'pageNumber': nextPage, 'loadingMessageInjectHere': loadingMessageInjectHere, 'maxPagesToFetch': maxPagesToFetch, 'completeReload': completeReload});
		} else {
			loadingMessageInjectHere.innerHTML = 'Loading Complete.';
			//FSH.Helper.addLogColoring('GuildLog', 1);
			FSH.logs.addGuildLogWidgets();
			FSH.System.setValueJSON('storedGuildLog', FSH.Helper.newStoredGuildLog);
			var now = Date.now();
			FSH.System.setValue('lastGuildLogCheck', now.toString());
		}
	},

	injectNotepad: function() { //jquery
		$('textarea#notepad_notes')
		.attr('cols', '90')
		.attr('rows', '30')
		.css('resize', 'none');
	},

	injectFindPlayer: function() {
		var findPlayerButton = $('input[value="Find Player"]');
		var levelToTest = FSH.System.intValue($('dt.stat-level:first').next().text());
		var characterVirtualLevel = FSH.System.getValue('characterVirtualLevel');
		if (characterVirtualLevel) {levelToTest = characterVirtualLevel;}
		var pvpLowerLevelModifier = levelToTest > 205 ? 10 : 5;
		var pvpUpperLevelModifier = levelToTest >= 200 ? 10 : 5;
		findPlayerButton.parent().append('&nbsp;<a href="index.php?cmd=findplayer&search_active=1&search_username=&search_level_min=' +
			(levelToTest - pvpLowerLevelModifier) + '&search_level_max=' + (levelToTest + pvpUpperLevelModifier) +
			'&search_in_guild=0"><span style="color:blue;">Get PvP targets</span></a>' +
			'&nbsp;<a href="index.php?cmd=findplayer&search_active=1&search_username=&search_level_min=' +
			(levelToTest - 25) + '&search_level_max=' + (levelToTest + 25) +
			'&search_in_guild=0"><span style="color:blue;">Get GvG targets</span></a>');

		//<a href='index.php?cmd=profile&player_id=4145241'>Boeffie13</a>
		$('table[class="width_full"]').find('a[href*="player_id"]').each(function() {
			//javascript:openWindow('index.php?cmd=quickbuff&tid=920497',%20'fsQuickBuff',%20618,%201000,%20',scrollbars')
			var id = /player_id=([0-9]*)/.exec($(this).attr('href'));
			$(this).after('<a style="color:blue;font-size:10px;" '+FSH.Layout.quickBuffHref(id[1])+'>[b]</a>');
		});
	},

	injectFindBuffs: function(content) {
		if (!content) {content=FSH.Layout.notebookContent();}
		var buffList = FSH.Data.buffList;
		FSH.Helper.sortBy='name';
		FSH.Helper.sortAsc=true;
		buffList.sort(FSH.Helper.stringSort);//.sort(function(a,b) { return a.name.toLowerCase() > b.name.toLowerCase() } );
		var injectionText = '';
		var extraProfile = FSH.System.getValue('extraProfile');
		injectionText += '<table width="620" cellspacing="0" cellpadding="2" border="0" align="center"><tbody>';
		injectionText += '<tr><td rowspan="2" colspan="2" width="50%"><h1>Find Buff</h1></td>' +
			'<td align="right" style="color:brown;">Select buff to search for:</td>';

		injectionText += '<td align="left"><select style="width:140px;" id="selectedBuff">';
		for (var j = 0; j < buffList.length; j += 1) {
			injectionText += '<option value="' + buffList[j].skillId + '">' + buffList[j].name + '</option>';
		}
		injectionText += '</select></td></tr>';

		injectionText += '<tr>' +
			'<td align="right" style="color:brown;">Level 175 buffers only:</td><td align="left"><input id="level175" type="checkbox"></td></tr>';
		injectionText += '<tr><td align="right" style="color:brown;" width="30%">Nicknames of buff searched:&nbsp;</td><td align="left" id="buffNicks">&nbsp;</td>' +
			'<td align="right" style="color:brown;">Search guild members:</td><td align="left"><input id="guildMembers" type="checkbox" checked></td></tr>';
		injectionText += '<tr>' +
			'<td align="right" style="color:brown;"># potential buffers to search:&nbsp;</td><td align="left" id="potentialBuffers"></td>' +
			'<td align="right" style="color:brown;">Search allies/enemies:' +
				FSH.Layout.helpLink('Search Allies/Enemies', 'The checkbox enables searching your own personal allies/enemies list for buffs.<br><br>' +
				'Additional profiles to search can be added in the text field to the right, separated by commas.') + '</td>' +
			'<td align="left"><input id="alliesEnemies" type="checkbox" checked>' +
				'<input style="width:118px;" class="custominput" id="extraProfile" type="text" title="Extra profiles to search" value="' + (extraProfile?extraProfile:'') + '"></td></tr>';
		injectionText += '<tr><td align="right" style="color:brown;"># Buffers processed:&nbsp;</td><td align="left" id="buffersProcessed">0</td>' +
			'<td align="right" style="color:brown;">Search online list:</td><td align="left"><select style="width:140px;" id="onlinePlayers">' +
				'<option value="0">Disabled</option>' +
				'<option value="49">Short (fastest)</option>' +
				'<option value="47">Medium (medium)</option>' +
				'<option value="45">Long (slowest)</option>' +
				'</select></td></tr>';
		injectionText += '<tr><td align="right" style="color:brown;">Find buffers progress:&nbsp;</td><td align="left" width="310" id="bufferProgress">Idle</td>'+
			'<td align="center"><input id="clearresultsbutton" class="custombutton" type="button" value="Clear Results"></td><td align="center"><input id="findbuffsbutton" class="custombutton" type="button" value="Find Buffers"></td></tr>';
		injectionText += '</tbody></table><br>';
		injectionText += '<h1>Potential Buffers and Bio Info</h1><br>';
		injectionText += '<table width="620" cellspacing="0" cellpadding="3" border="1" align="center" id="buffTable"><tbody>';
		injectionText += '<tr><th width="120">&nbsp;Name</th><th width="200">&nbsp;Player Info</th><th>&nbsp;Notable Bio Text</th></tr>';
		injectionText += '</tbody></table><br>';
		injectionText += '<div class=content style="font-size:xx-small; color:brown; margin-left:28px; margin-right:28px;">Disclaimer: This functionality does a simple text search for the terms above. '+
			'It is not as smart as you are, so please do not judge the results too harshly. It does not search all online players, just a subset of those that have been on recently. ' +
			'The aim is to be fast and still return a good set of results. This feature is a work in progress, so it may be tweaked and enhanced over time.</div>';
		content.innerHTML = injectionText;
		document.getElementById('findbuffsbutton').addEventListener('click', FSH.Helper.findBuffsStart, true);
		document.getElementById('clearresultsbutton').addEventListener('click', FSH.Helper.findBuffsClearResults, true);
	},

	findBuffsClearResults: function() {
		var buffTable = document.getElementById('buffTable');
		for (var j = buffTable.rows.length; j > 1; j-=1) {
			buffTable.deleteRow(j-1);
		}
		document.getElementById('buffNicks').innerHTML = '';
		var bufferProgress = document.getElementById('bufferProgress');
		bufferProgress.innerHTML = 'Idle.';
		bufferProgress.style.color = 'black';
		document.getElementById('potentialBuffers').innerHTML = '';
		document.getElementById('buffersProcessed').innerHTML = 0;
	},

	findBuffsStart: function() {
		var selectedBuff = $('#selectedBuff').val();
		//create array of buff nicknames ...
		var buffList = FSH.Data.buffList;
		for (var j = 0; j < buffList.length; j += 1) {
			if (selectedBuff === buffList[j].skillId) {
				FSH.Helper.findBuffNicks = buffList[j].nicks;
				FSH.Helper.findBuffMinCastLevel = buffList[j].minCastLevel;
				break;
			}
		}
		document.getElementById('buffNicks').innerHTML = FSH.Helper.findBuffNicks;
		var bufferProgress = document.getElementById('bufferProgress');
		bufferProgress.innerHTML = 'Gathering list of potential buffers ...';
		bufferProgress.style.color = 'green';
		FSH.Helper.findBuffsLevel175Only = document.getElementById('level175').checked;
		document.getElementById('buffersProcessed').innerHTML = 0;
		FSH.Helper.onlinePlayers = [];
		FSH.Helper.extraProfile = document.getElementById('extraProfile').value;
		FSH.System.setValue('extraProfile', FSH.Helper.extraProfile);
		//get list of players to search, starting with guild>manage page
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=manage', FSH.Helper.findBuffsParseGuildManagePage);
	},

	injectFindOther: function(content) {
		if (!content) {content=FSH.Layout.notebookContent();}
		var injectionText = '';
		var textToSearchFor = FSH.System.getValue('textToSearchFor');
		var extraProfile = FSH.System.getValue('extraProfile');
		injectionText += '<table width="620" cellspacing="0" cellpadding="2" border="0" align="center"><tbody>';
		injectionText += '<tr><td rowspan="2" colspan="2" width="50%"><h1>Find Other</h1></td>' +
			'<td align="right" style="color:brown;">Select text to search for:</td>';

		injectionText += '<td align="left"><input style="width:140px;" class="custominput" id="textToSearchFor" type="text" title="Text to search for" value="' + (textToSearchFor?textToSearchFor:'') + '"></td></tr>';

		injectionText += '<tr>' +
			'<td align="right" style="color:brown;">Level 500+ players only:</td><td align="left"><input id="level175" type="checkbox"></td></tr>';
		injectionText += '<tr><td align="right" style="color:brown;" width="30%">Text searched for:&nbsp;</td><td align="left" id="buffNicks">&nbsp;</td>' +
			'<td align="right" style="color:brown;">Search guild members:</td><td align="left"><input id="guildMembers" type="checkbox" checked></td></tr>';
		injectionText += '<tr>' +
			'<td align="right" style="color:brown;"># potential players to search:&nbsp;</td><td align="left" id="potentialBuffers"></td>' +
			'<td align="right" style="color:brown;">Search allies/enemies:' +
				FSH.Layout.helpLink('Search Allies/Enemies', 'The checkbox enables searching your own personal allies/enemies list for buffs.<br><br>' +
				'Additional profiles to search can be added in the text field to the right, separated by commas.') + '</td>' +
			'<td align="left"><input id="alliesEnemies" type="checkbox" checked>' +
				'<input style="width:118px;" class="custominput" id="extraProfile" type="text" title="Extra profiles to search" value="' + (extraProfile?extraProfile:'') + '"></td></tr>';
		injectionText += '<tr><td align="right" style="color:brown;"># Players processed:&nbsp;</td><td align="left" id="buffersProcessed">0</td>' +
			'<td align="right" style="color:brown;">Search online list:</td><td align="left"><select style="width:140px;" id="onlinePlayers">' +
				'<option value="0">Disabled</option>' +
				'<option value="49">Short (fastest)</option>' +
				'<option value="47">Medium (medium)</option>' +
				'<option value="45">Long (slowest)</option>' +
				'</select></td></tr>';
		injectionText += '<tr><td align="right" style="color:brown;">Find Other progress:&nbsp;</td><td align="left" width="310" id="bufferProgress">Idle</td>'+
			'<td align="center"><input id="clearresultsbutton" class="custombutton" type="button" value="Clear Results"></td><td align="center"><input id="findbuffsbutton" class="custombutton" type="button" value="Find Buffers"></td></tr>';
		injectionText += '</tbody></table><br>';
		injectionText += '<h1>Potential Players and Bio Info</h1><br>';
		injectionText += '<table width="620" cellspacing="0" cellpadding="3" border="1" align="center" id="buffTable"><tbody>';
		injectionText += '<tr><th width="120">&nbsp;Name</th><th width="200">&nbsp;Player Info</th><th>&nbsp;Notable Bio Text</th></tr>';
		injectionText += '</tbody></table><br>';
		injectionText += '<div class=content style="font-size:xx-small; color:brown; margin-left:28px; margin-right:28px;">Disclaimer: This functionality does a simple text search for the terms above. '+
			'It is not as smart as you are, so please do not judge the results too harshly. It does not search all online players, just a subset of those that have been on recently. ' +
			'The aim is to be fast and still return a good set of results. This feature is a work in progress, so it may be tweaked and enhanced over time.</div>';
		content.innerHTML = injectionText;
		document.getElementById('findbuffsbutton').addEventListener('click', FSH.Helper.findOtherStart, true);
		document.getElementById('clearresultsbutton').addEventListener('click', FSH.Helper.findBuffsClearResults, true);
	},

	findOtherStart: function() {
		var textToSearchFor = $('#textToSearchFor').val();
		//use existing array structure to save search text ...
		var textArray=textToSearchFor.split(',');
		var tempArray = [];
		for (var i=0;i<textArray.length;i += 1) {
			tempArray.push(textArray[i].trim());
		}
		textToSearchFor = tempArray.join(',');
		FSH.Helper.findBuffNicks = textToSearchFor;
		FSH.Helper.findBuffMinCastLevel = 1;

		document.getElementById('buffNicks').innerHTML = FSH.Helper.findBuffNicks;
		var bufferProgress = document.getElementById('bufferProgress');
		bufferProgress.innerHTML = 'Gathering list of profiles to search ...';
		bufferProgress.style.color = 'green';
		FSH.Helper.findBuffsLevel175Only = document.getElementById('level175').checked;
		document.getElementById('buffersProcessed').innerHTML = 0;
		FSH.Helper.onlinePlayers = [];
		FSH.System.setValue('textToSearchFor', textToSearchFor);
		FSH.Helper.extraProfile = document.getElementById('extraProfile').value;
		FSH.System.setValue('extraProfile', FSH.Helper.extraProfile);
		//get list of players to search, starting with guild>manage page
		FSH.System.xmlhttp('index.php?cmd=guild&subcmd=manage', FSH.Helper.findBuffsParseGuildManagePage);
	},

	findBuffsParseGuildManagePage: function(responseText) {
		var doc = FSH.System.createDocument(responseText);
		var characterName = $('dt.stat-name:first').next().text().replace(/,/g,'');
		var memberTableRows = $(doc).find('table:has(td:contains("Rank")[bgcolor="#C18B35"]):last').find('tr:gt(1):not(:has(td[colspan="5"]))');
		if (document.getElementById('guildMembers').checked) {
			memberTableRows.each(function(){
				var contactLink = $(this).find('a');
				var onMouseOver = $(contactLink).data('tipped');
				var lastActivity = /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/.exec(onMouseOver);
				var lastActivityDays = parseInt(lastActivity[1],10);
				var lastActivityHours = parseInt(lastActivity[2],10) + lastActivityDays*24;
				var lastActivityMinutes = parseInt(lastActivity[3],10) + lastActivityHours*60;
				//check if they are high enough level to cast the buff
				var virtualLevel = /<td>VL:<\/td><td>([,0-9]+)<\/td>/.exec(onMouseOver);
				virtualLevel = parseInt(virtualLevel[1].replace(/,/g,''),10);
				var minPlayerVirtualLevel = 1;
				if (FSH.Helper.findBuffsLevel175Only) {minPlayerVirtualLevel = 500;}
				if (lastActivityMinutes < 5 && virtualLevel >= FSH.Helper.findBuffMinCastLevel && virtualLevel >= minPlayerVirtualLevel) {
					//add online player to search list (all but self)
					var onlinePlayer = contactLink.attr('href');
					if (characterName !== $(this).find('td:eq(1)')
						.text().trim()) {
						FSH.Helper.onlinePlayers.push(onlinePlayer);
					}
				}
			});
		}
		//continue with profile pages
		FSH.Helper.findBuffsParseProfilePageStart();
	},

	findBuffsParseProfilePageStart: function() {
		//if option enabled then parse profiles
		FSH.Helper.profilePagesToSearch = [];
		FSH.Helper.profilePagesToSearch.push('index.php?cmd=profile');
		var extraProfileArray = FSH.Helper.extraProfile.split(',');
		var i;
		for (i=0;i<extraProfileArray.length ;i+= 1 ) {
			FSH.Helper.profilePagesToSearch.push('index.php?cmd=findplayer&search_active=1&search_level_max=&search_level_min=&search_username='+extraProfileArray[i]+'&search_show_first=1');
		}
		FSH.Helper.profilePagesToSearchProcessed = 0;
		if (document.getElementById('alliesEnemies').checked) {
			for (i=0;i<FSH.Helper.profilePagesToSearch.length ;i+= 1 ) {
				FSH.System.xmlhttp(FSH.Helper.profilePagesToSearch[i], FSH.Helper.findBuffsParseProfilePage);
			}
		} else {
			FSH.Helper.findBuffsParseOnlinePlayersStart();
		}
	},

	findBuffsParseProfilePage: function(responseText) {
		var doc = FSH.System.createDocument(responseText);
		var characterName = $('dt.stat-name:first').next().text().replace(/,/g,'');
		var profileAlliesEnemies = $(doc).find('#profileLeftColumn').find('a[data-tipped*="Last Activity"]');
		profileAlliesEnemies.each(function(){
			var onMouseOver = $(this).data('tipped');
			var lastActivity = /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/.exec(onMouseOver);
			var lastActivityDays = parseInt(lastActivity[1],10);
			var lastActivityHours = parseInt(lastActivity[2],10) + lastActivityDays*24;
			var lastActivityMinutes = parseInt(lastActivity[3],10) + lastActivityHours*60;
			//check if they are high enough level to cast the buff
			var virtualLevel = /<td>VL:<\/td><td>([,0-9]+)<\/td>/.exec(onMouseOver);
			virtualLevel = parseInt(virtualLevel[1].replace(/,/g,''),10);
			var minPlayerVirtualLevel = 1;
			if (FSH.Helper.findBuffsLevel175Only) {minPlayerVirtualLevel = 500;}
			if (lastActivityMinutes < 5 && virtualLevel >= FSH.Helper.findBuffMinCastLevel && virtualLevel >= minPlayerVirtualLevel) {
				//add online player to search list (all but self)
				var onlinePlayer = $(this).attr('href');
				if (characterName !== $(this).text().trim()) {
					FSH.Helper.onlinePlayers.push(onlinePlayer);
				}
			}
		});
		//continue with online players
		FSH.Helper.profilePagesToSearchProcessed += 1;
		if (FSH.Helper.profilePagesToSearchProcessed === FSH.Helper.profilePagesToSearch.length) {
			FSH.Helper.findBuffsParseOnlinePlayersStart();
		}
	},

	findBuffsParseOnlinePlayersStart: function() {
		//if option enabled then parse online players
		FSH.Helper.onlinePlayersSetting = document.getElementById('onlinePlayers').value;
		if (FSH.Helper.onlinePlayersSetting !== 0) {
			FSH.System.xmlhttp('index.php?cmd=onlineplayers&page=1', FSH.Helper.findBuffsParseOnlinePlayers, {'page':1});
		} else {
			FSH.Helper.findBuffsParsePlayersForBuffs();
		}
	},

	findBuffsParseOnlinePlayers: function(responseText) {
		var doc = FSH.System.createDocument(responseText);
		var playerRows = $(doc).find('table:contains("Username")>tbody>tr:has(td>a[href*="cmd=profile&player_id="])');
		var maxPage = parseInt($(doc).find('td:has(input[name="page"]):last').text().replace(/\D/g, ''),10);
		var curPage = parseInt($(doc).find('input[name="page"]:last').val().replace(/\D/g, ''),10);
		var characterName = $('dt.stat-name:first').next().text().replace(/,/g,'');
		if (curPage !== 1){
			playerRows.each(function(){
				var onlinePlayer = $(this).find('td:eq(1) a').attr('href');
				var onlinePlayerLevel = parseInt($(this).find('td:eq(2)').text().replace(/,/g,''),10);
				var onlinePlayerName = $(this).find('td:eq(1) a').text();
				var minPlayerVirtualLevel = 1;
				if (FSH.Helper.findBuffsLevel175Only) {minPlayerVirtualLevel = 500;}
				if (onlinePlayerLevel >= FSH.Helper.findBuffMinCastLevel && onlinePlayerLevel >= minPlayerVirtualLevel) {
					//add online player to search list (all but self)
					if (characterName !== onlinePlayerName.trim()) {
						FSH.Helper.onlinePlayers.push(onlinePlayer);
					}
				}
			});
		}
		if (curPage < maxPage/*-maxPage+15*/) {
			var newPage = curPage === 1 ? Math.round(FSH.Helper.onlinePlayersSetting * maxPage / 50) : curPage + 1;
			var bufferProgress = document.getElementById('bufferProgress');
			bufferProgress.innerHTML = 'Parsing online page ' + curPage + ' ...';
			FSH.System.xmlhttp('index.php?cmd=onlineplayers&page=' + newPage, FSH.Helper.findBuffsParseOnlinePlayers, {'page':newPage});
		}
		else {
			//all done so moving on
			FSH.Helper.findBuffsParsePlayersForBuffs();
		}
	},

	findBuffsParsePlayersForBuffs: function() {
		//remove duplicates TODO
		var bufferProgress = document.getElementById('bufferProgress');
		//now need to parse player pages for buff ...
		document.getElementById('potentialBuffers').innerHTML = FSH.Helper.onlinePlayers.length;
		if (FSH.Helper.onlinePlayers.length <= 0) {
			bufferProgress.innerHTML = 'Done.';
			bufferProgress.style.color = 'blue';
			return;
		}
		bufferProgress.innerHTML = 'Parsing player data ...';
		bufferProgress.style.color = 'green';

		for (var j = 0; j < FSH.Helper.onlinePlayers.length; j += 1) {
			FSH.System.xmlhttp(FSH.Helper.onlinePlayers[j], FSH.Helper.findBuffsParseProfileAndDisplay, {'href': FSH.Helper.onlinePlayers[j]});
		}
	},

	findBuffsParseProfileAndDisplay: function(responseText, callback) {
		var doc = FSH.System.createDocument(responseText);
		//name and level
		var playerName = $(doc).find('div#pCC h1:first').text();
		var levelElement = $(doc).find('td:contains("Level:"):last').next();
		var levelValue = parseInt(levelElement.text().replace(/,/g,''),10);
		var virtualLevelElement = $(doc).find('td:contains("VL:"):last').next();
		var virtualLevelValue = parseInt(virtualLevelElement.text().replace(/,/g,''),10);
		//last activity
		var lastActivityElement = $(doc).find('div#pCC p:first');
		var lastActivity = /(\d+) mins, (\d+) secs/.exec(lastActivityElement.text());
		var lastActivityMinutes = parseInt(lastActivity[1],10);
		var lastActivityIMG = FSH.Layout.onlineDot({min: lastActivityMinutes});
		//buffs
		var bioDiv = $(doc).find('div.innerColumnHeader:contains("Biography"):last');
		var bioCell = bioDiv.next();
		//~ var buffNickArray = FSH.Helper.findBuffNicks.split(',');
		var buffTable = document.getElementById('buffTable');
		var textLineArray = [];
		var buffPosition = 0, startingPosition = 0, runningTotalPosition = 0;
		var bioTextToSearch = ' '+bioCell.html()+' ';
		var buffRE = new RegExp('[^a-zA-Z](('+FSH.Helper.findBuffNicks.replace(/,/g,')|(')+'))[^a-zA-Z]', 'i');
		while (buffPosition !== -1) {
			bioTextToSearch = bioTextToSearch.substr(startingPosition, bioTextToSearch.length);
			buffPosition = bioTextToSearch.search(buffRE);
			if (buffPosition !== -1) {
				startingPosition = buffPosition + 1;
				runningTotalPosition += buffPosition;
				var prevBR = bioCell.html().lastIndexOf('<br>',runningTotalPosition-1);
				if (prevBR===-1) {prevBR=0;}
				var nextBR = bioCell.html().indexOf('<br>',runningTotalPosition);
				if (nextBR===-1 && bioCell.html().indexOf('<br>') !== -1) {nextBR=bioCell.html().length-5;}
				var textLine = bioCell.html().substr(prevBR + 4, nextBR - prevBR);
				textLine = textLine.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g,'');
				textLineArray.push(textLine);
			}
		}
		textLineArray = FSH.System.uniq(textLineArray);
		//sustain
		var sustainText = $(doc).find('td:has(a:contains("Sustain")):last').next().find('table.tipped').data('tipped');
		var sustainLevel;
		if (sustainText !== undefined) {
			var sustainLevelRE = /Level<br>(\d+)%/;
			sustainLevel = sustainLevelRE.exec(sustainText)[1];
		} else {
			sustainLevel = -1;
		}
		//extend
		var hasExtendBuff = $(doc).find('img.tipped[data-tipped*="Extend"]');

		//add row to table
		if (textLineArray.length > 0) {
			var newRow = buffTable.insertRow(-1);
			//name cell
			var newCell = newRow.insertCell(0);
			newCell.style.verticalAlign = 'top';
			var playerHREF = callback.href;
			var bioTip = bioCell.html().replace(/'|"|\n/g,'');
			newCell.innerHTML = '<nobr>' + lastActivityIMG + '&nbsp;<a href="' + playerHREF + '" target="new" ' +
				// FIXME - It kind works now, but not guaranteed?
				'class="tipped" data-tipped-options="hook: \'leftmiddle\'" ' + 
				'data-tipped="'+bioTip+'">' + playerName + '</a>' +
				'&nbsp;<span style="color:blue;">[<span class="a-reply" target_player="' + playerName +'" style="cursor:pointer; text-decoration:underline;">m</span>]</span>' + '</nobr><br>' +
				'<span style="color:gray;">Level:&nbsp;</span>' + levelValue + '&nbsp;(' + virtualLevelValue + ')';
			$('.a-reply').click(function(evt) {
				window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
			});

			//player info cell
			newCell = newRow.insertCell(1);
			var playerInfo = '<table><tbody><tr><td colspan="2" style="color:gray;" align="right" width="50%">Last Activity:</td><td colspan="2"><nobr>' + lastActivity[0] + '</nobr></td></tr>';
			playerInfo += '<tr><td style="color:gray;" align="right" width="25%">Sustain:</td><td width="25%" style="color:' + (sustainLevel>=100?'green':'red') + ';">' + sustainLevel + '%</td>' +
				'<td width="25%" style="color:gray;" align="right">Extend:</td><td width="25%">' + (hasExtendBuff.length > 0?'<span style="color:green;">Yes</span>':'<span style="color:red;">No</span>') + '</td></tr>';
			newCell.innerHTML = playerInfo;
			newCell.style.verticalAlign = 'top';
			//buff cell
			newCell = newRow.insertCell(2);
			for (var i = 0; i < textLineArray.length; i += 1) {
				newCell.innerHTML += textLineArray[i] + '<br>';
			}
		}
		var processedBuffers = document.getElementById('buffersProcessed');
		var potentialBuffers = parseInt(document.getElementById('potentialBuffers').textContent,10);
		var processedBuffersCount = parseInt(processedBuffers.textContent,10);
		processedBuffers.innerHTML = processedBuffersCount + 1;
		if (potentialBuffers === processedBuffersCount + 1) {
			var bufferProgress = document.getElementById('bufferProgress');
			bufferProgress.innerHTML = 'Done.';
			bufferProgress.style.color = 'blue';
		}
	},

	injectRPUpgrades: function() {  //jquery
		var injectHere = $('b:contains("Guild Reputation")').closest('table')
			.find('tr:eq(10) > td:first');
		injectHere.attr('align','center');
		injectHere.html('<span id="warningMessage" style="color:green;">' +
			'Gathering active buffs ... please wait ... </span>');
		$.get('index.php?cmd=profile', FSH.Helper.parseProfileAndPostWarnings);
	},

	parseProfileAndPostWarnings: function(responseText) {//jquery
		var doc = FSH.System.createDocument(responseText);
		$(doc).find('img[src*="/skills/"]').each(function(){
				var onmouseover = $(this).data('tipped');
				var buffRE = /<center><b>([ a-zA-Z]+)<\/b>\s\(Level: (\d+)\)/
					.exec(onmouseover);

				if (!buffRE) { return true; } // same as continue in a for loop
				var buffName = buffRE[1];
				var buffLevel = buffRE[2];
				$('a[data-tipped*="' + buffName + ' Level ' + buffLevel + '"]')
					.each(function(){
						$(this).parent()
							.append('<br><nobr><span style="color:red;">' +
							buffName + ' ' + buffLevel +
							' active</span></nobr>');
					});
			});
		var warningMessage = $('#warningMessage');
		warningMessage.html('Done');
		warningMessage.attr('style','color:blue');
	},

	useStairs: function() { //jquery
		//cmd=world&subcmd=usestairs&stairway_id=1645&x=6&y=11
		$('input[name="stairway_id"]:first').each(function(){
			location.href = 'index.php?cmd=world&subcmd=usestairs&' +
				'stairway_id=' + $(this).val();
		});
	},

	appendHead: function(o) { // native
		var count = 0;
		var scriptTag, linkTag;
		var scriptFiles = o.js || [];
		var cssFiles = o.css || [];
		var head = document.getElementsByTagName('head')[0];

		cssFiles.forEach(function(c) {
			linkTag = document.createElement('link');
			linkTag.type = 'text/css';
			linkTag.rel = 'stylesheet';
			linkTag.href = c;
			head.appendChild(linkTag);
		});

		scriptFiles.forEach(function(s) {
			scriptTag = document.createElement('script');
			scriptTag.type = 'text/javascript';
			if (typeof o.callback === 'function') {
				scriptTag.onload = function() {
					count += 1;
					if (count === o.js.length) {
						o.callback(o.param1, o.param2);
					}
				};
			}
			scriptTag.src = s;
			head.appendChild(scriptTag);
		});
	},

	onPageLoad: function() {
		FSH.environment.dispatch();
	},

}; // end of var helper

(function loadScripts () {
	var o = {
		css: ['https://fallenswordhelper.github.io/fallenswordhelper/resources/1512/calfSystem.css'],
		js:  ['https://cdn.jsdelivr.net/localforage/1.2.10/localforage.min.js',
			  'https://fallenswordhelper.github.io/fallenswordhelper/resources/1512/calfSystem.js'],
		callback: FSH.Helper.onPageLoad
	};
	if (typeof window.jQuery === 'undefined') {
		o.js.unshift('https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js');
	}
	FSH.Helper.appendHead(o);
})();

}; // end of var main

(function fshInstallAndRun() {

'use strict';

	if (typeof GM_info === 'undefined') { // Chromium Native
		var script = document.createElement('script');
		script.textContent = '(' + fshMain.toString() + ')();';
		document.body.appendChild(script);
	}
	else {
		fshMain();
	}

})();
