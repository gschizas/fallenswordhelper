(function() {

	'use strict';
	var calf = require('../support/calf');
	var system = require('../support/system');
	var layout = require('../support/layout');
	var settingObj = require('./settingObj');

	var networkIcon = settingObj.networkIcon;
	var saveBoxes = settingObj.saveBoxes;
	var mySimpleCheckboxes = settingObj.mySimpleCheckboxes;

	function helpLink(title, text) { // Native
		return '&nbsp;[&nbsp;<span class="fshLink tip-static" data-tipped="' +
			'<span class=\'fshHelpTitle\'>' + title + '</span><br><br>' +
			text + '">?</span>&nbsp;]';
	}

	function simpleCheckbox(name) { // Native
		var o = mySimpleCheckboxes[name];
		return '<tr><td align="right">' +
			(o.network ? networkIcon : '') +
			'<label for="' + o.id + '">' + o.helpTitle +
			helpLink(o.helpTitle, o.helpText) +
			':<label></td><td><input id="' + o.id +
			'" name="' + o.id + '" type="checkbox" value="on"' +
			(system.getValue(o.id) ? ' checked' : '') + '></td></tr>';
	}

	function toggleTickAllBuffs(e){ // jQuery
		var allItems = $('input[name^="blockedSkillList"]:visible',
			'#settingsTabs-4');
		var tckTxt = $(e.target);
		allItems.prop('checked', tckTxt.text() === 'Tick all buffs');
		if (tckTxt.text() === 'Tick all buffs') {
			tckTxt.text('Untick all buffs');
		} else {
			tckTxt.text('Tick all buffs');
		}
	}

	function injectSettingsGuildData(guildType) { // Native
		return '<input name="guild' + guildType + '" size="60" value="' +
			system.getValue('guild' + guildType) + '">' +
			'<span class="buffLink" ' +
			'id="toggleShowGuild' + guildType + 'Message" linkto="showGuild' +
			guildType + 'Message"> &#x00bb;</span>' +
			'<div id="showGuild' + guildType + 'Message" ' +
			'class="fshHide">' +
			'<input name="guild' + guildType + 'Message" size="60" value="' +
			system.getValue('guild' + guildType + 'Message') + '">' +
			'</div>';
	}

	function clearStorage() { // Native
		if (confirm('Are you sure you want to clear you localStorage?')) {
			localStorage.clear();
		}
	}

	function saveValueForm(name) {
		/*jshint validthis: true */
		var formElement =
			system.findNode('//input[@name="' + name + '"]', this);
		if (formElement.getAttribute('type') === 'checkbox') {
			system.setValue(name, formElement.checked);
		} else if (formElement.getAttribute('type') === 'radio') {
			var radioElements = system.findNodes('//input[@name="' + name +
				'"]', 0, this);
			for (var i=0; i<radioElements.length; i += 1) {
				if (radioElements[i].checked) {
					system.setValue(name, radioElements[i].value);
				}
			}
		} else {
			system.setValue(name, formElement.value);
		}
	}

	function saveConfig(evt) { // Legacy
		var oForm = evt.target.form;

		//bio compressor validation logic
		var maxCompressedCharacters =
			system.findNode('//input[@name="maxCompressedCharacters"]', oForm);
		var maxCompressedCharactersValue = maxCompressedCharacters.value * 1;
		if (isNaN(maxCompressedCharactersValue) ||
				maxCompressedCharactersValue <= 50) {
			maxCompressedCharacters.value = 1500;
		}
		var maxCompressedLines =
			system.findNode('//input[@name="maxCompressedLines"]', oForm);
		var maxCompressedLinesValue = maxCompressedLines.value * 1;
		if (isNaN(maxCompressedLinesValue) || maxCompressedLinesValue <= 1) {
			maxCompressedLines.value = 25;
		}
		var newGuildLogHistoryPages =
			system.findNode('//input[@name="newGuildLogHistoryPages"]', oForm);
		var newGuildLogHistoryPagesValue = newGuildLogHistoryPages.value * 1;
		if (isNaN(newGuildLogHistoryPagesValue) ||
				newGuildLogHistoryPagesValue <= 1) {
			newGuildLogHistoryPages.value = 25;
		}
		var maxGroupSizeToJoin =
			system.findNode('//input[@name="maxGroupSizeToJoin"]', oForm);
		var maxGroupSizeToJoinValue = maxGroupSizeToJoin.value * 1;
		if (isNaN(maxGroupSizeToJoinValue) || maxGroupSizeToJoinValue <= 1) {
			maxGroupSizeToJoin.value = 11;
		}
		var combatEvaluatorBiasElement =
			system.findNode('//select[@name="combatEvaluatorBias"]', oForm);
		var combatEvaluatorBias = combatEvaluatorBiasElement.value * 1;
		system.setValue('combatEvaluatorBias', combatEvaluatorBias);
		var enabledHuntingModeElement =
			system.findNode('//select[@name="enabledHuntingMode"]', oForm);
		var enabledHuntingMode = enabledHuntingModeElement.value;
		system.setValue('enabledHuntingMode', enabledHuntingMode);

		saveBoxes.forEach(saveValueForm, oForm);

		window.alert('FS Helper Settings Saved');
		window.location = 'index.php?cmd=settings';
		return false;
	}

	function showLogs() { // Native
		document.location = system.server +
			'index.php?cmd=notepad&blank=1&subcmd=showlogs';
	}

	function showMonsterLogs() { // Native
		document.location = system.server +
			'index.php?cmd=notepad&blank=1&subcmd=monsterlog';
	}

	function escapeHtml(unsafe) {
		return unsafe
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	function injectSettings() { // Legacy
		var tickAll = $('<span class="fshLink">Tick all buffs</span>');
		tickAll.click(toggleTickAllBuffs);
		$('#settingsTabs-4 td').eq(0).append('<br>').append(tickAll);

		var buffs = system.getValue('huntingBuffs');
		var buffsName = system.getValue('huntingBuffsName');
		var buffs2 = system.getValue('huntingBuffs2');
		var buffs2Name = system.getValue('huntingBuffs2Name');
		var buffs3 = system.getValue('huntingBuffs3');
		var buffs3Name = system.getValue('huntingBuffs3Name');
		var doNotKillList = system.getValue('doNotKillList');

		var enableActiveBountyList = calf.enableActiveBountyList;
		var bountyListRefreshTime = system.getValue('bountyListRefreshTime');
		var enableWantedList = calf.enableWantedList;
		var wantedNames = system.getValue('wantedNames');
		var combatEvaluatorBias = system.getValue('combatEvaluatorBias');
		var enabledHuntingMode = system.getValue('enabledHuntingMode');
		var storage = (JSON.stringify(localStorage).length /
			(5 * 1024 * 1024) * 100).toFixed(2);

		var configData =
			'<form><table id="fshSettingsTable">' +
			'<thead><th colspan="2"><b>Fallen Sword Helper configuration ' +
				'Settings</b></th></thead>' +
			'<tr><td align=center><input id="fshClearStorage" type="button" ' +
				'class="awesome magenta tip-static" value="Clear Storage" ' +
				'data-tipped="<span class=\'fshHelpTitle\'>Clear Storage' +
				'</span><br><br>This will clear all localStorage related to ' +
				'fallensword.com<br>It will reset all your Helper settings to ' +
				'defaults<br>Use it if your storage has overflowed or become ' +
				'corrupt"></td><td align=center>' +
				'<span style="font-size:x-small">(Current version: ' +
				FSH.version + ') (Storage Used: ' + storage + '% Remaining: ' +
				(100 - storage).toFixed(2) + '%)</span></td></tr>' +
			'<tr><td colspan="2" align=center>' +
				'<span style="font-weight:bold;">Visit the ' +
				'<a href="https://github.com/fallenswordhelper/fallenswordhelper">' +
				'Fallen Sword Helper web site</a> ' +
				'for any suggestions, requests or bug reports</span></td></tr>' +
			//General Prefs
			'<tr><th colspan="2" align="left"><b>General preferences ' +
				'(apply to most screens)</b></th></tr>' +

			'<tr><td align="right">' +
				'<label for="enableGuildInfoWidgets">' +
				'Enable Guild Info Widgets' +
				helpLink('Enable Guild Info Widgets',
				'Enabling this option will enable the Guild Info Widgets ' +
				'(coloring on the Guild Info panel)') + ':</label></td><td>' +
				'<input id="enableGuildInfoWidgets" name="enableGuildInfoWidgets" ' +
				'type="checkbox" value="on"' +
				(calf.enableGuildInfoWidgets ? ' checked' : '') +
				'>&nbsp;' +
				'<label>Hide Message&gt;<input name="hideGuildInfoMessage" ' +
				'type="checkbox" value="on"' +
				(calf.hideGuildInfoMessage ? ' checked' : '') +
				'></label>&nbsp;' +
				'<label>Hide Buff&gt;<input name="hideGuildInfoBuff" ' +
				'type="checkbox" value="on"' +
				(calf.hideGuildInfoBuff ? ' checked' : '') +
				'></label>&nbsp;' +
				'<label>Hide ST&gt;<input name="hideGuildInfoSecureTrade" ' +
				'type="checkbox" value="on"' +
				(calf.hideGuildInfoSecureTrade ? ' checked' : '') +
				'></label>&nbsp;' +
				'<label>Hide Trade&gt;<input name="hideGuildInfoTrade" ' +
				'type="checkbox" value="on"' +
				(calf.hideGuildInfoTrade ? ' checked' : '') +
				'></label></td></tr>' +

			simpleCheckbox('moveGuildList') +
			simpleCheckbox('moveOnlineAlliesList') +

			'<tr><td align="right">' + networkIcon +
				'Show Online Allies/Enemies' +
				helpLink('Show Online Allies/Enemies',
				'This will show the allies/enemies online list on the right.') +
				':</td><td><label>Allies&nbsp;<input name="enableAllyOnlineList" ' +
				'type="checkbox" value="on"' +
				(calf.enableAllyOnlineList ? ' checked' : '') +
				'></label>&nbsp;&nbsp;<label>Enemies&nbsp;' +
				'<input name="enableEnemyOnlineList" type="checkbox" value="on"' +
				(calf.enableEnemyOnlineList ? ' checked' : '') +
				'></label>&nbsp;&nbsp;' +
				'<input name="allyEnemyOnlineRefreshTime" size="3" value="' +
				system.getValue('allyEnemyOnlineRefreshTime') +
				'"> seconds refresh</td></tr>' +

			simpleCheckbox('enableOnlineAlliesWidgets') +
			simpleCheckbox('moveFSBox') +
			simpleCheckbox('fsboxlog') +
			simpleCheckbox('gameHelpLink') +
			simpleCheckbox('enableTempleAlert') +
			simpleCheckbox('enableUpgradeAlert') +
			simpleCheckbox('enableComposingAlert') +
			simpleCheckbox('enhanceOnlineDots') +
			simpleCheckbox('hideBuffSelected') +
			simpleCheckbox('hideHelperMenu') +
			simpleCheckbox('keepHelperMenuOnScreen') +
			simpleCheckbox('draggableHelperMenu') +

			'<tr><td align="right">Quick Links Screen Location' +
				helpLink('Quick Links Screen Location',
				'Determines where the quick links dialog shows on the screen. ' +
				'Default is top 22, left 0.') +
				':</td><td>Top: <input name="quickLinksTopPx" size="3" value="'+
				system.getValue('quickLinksTopPx') +
				'"> Left: <input name="quickLinksLeftPx" size="3" value="' +
				system.getValue('quickLinksLeftPx') +
				'"></td></tr>' +
			simpleCheckbox('draggableQuickLinks') +

			//Guild Manage
			'<tr><th colspan="2" align="left"><b>Guild>Manage preferences' +
				'</b></th></tr>' +
			'<tr><td colspan="2" align="left">Enter guild names, ' +
				'separated by commas</td></tr>' +
			'<tr><td>Own Guild</td><td>' +
				injectSettingsGuildData('Self') + '</td></tr>' +
			'<tr><td>Friendly Guilds</td><td>' +
				injectSettingsGuildData('Frnd') + '</td></tr>' +
			'<tr><td>Old Guilds</td><td>' +
				injectSettingsGuildData('Past') + '</td></tr>' +
			'<tr><td>Enemy Guilds</td><td>' +
				injectSettingsGuildData('Enmy') + '</td></tr>' +

			'<tr><td align="right">Highlight Valid PvP Targets' +
				helpLink('Highlight Valid PvP Targets',
				'Enabling this option will highlight targets in OTHER guilds that ' +
				'are within your level range to attack for PvP or GvG.') +
				':</td><td>PvP: <input name="highlightPlayersNearMyLvl" ' +
				'type="checkbox" value="on"' +
				(system.getValue('highlightPlayersNearMyLvl') ? ' checked' : '') +
				'> GvG: <input name="highlightGvGPlayersNearMyLvl" ' +
				'type="checkbox" value="on"' +
				(system.getValue('highlightGvGPlayersNearMyLvl') ?
				' checked' : '') + '></td></tr>' +

			simpleCheckbox('showAdmin') +
			simpleCheckbox('ajaxifyRankControls') +
			simpleCheckbox('detailedConflictInfo') +

			//World Screen
			'<tr><th colspan="2" align="left"><b>World screen/Hunting preferences' +
				'</b></th></tr>' +

			'<tr><td align="right">Hide Create Group Button' +
				helpLink('Hide Create Group Button',
				'Enabling this option will hide the Create Group button') +
				':</td><td>' +
				'<input name="hideChampionsGroup" ' + 'type="checkbox" value="on"' +
					(system.getValue('hideChampionsGroup') ? ' checked' : '') + '>' +
				'&nbsp;Champions&nbsp;&nbsp;' +
				'<input name="hideElitesGroup" type="checkbox" ' + 'value="on"' +
					(system.getValue('hideElitesGroup') ? ' checked' : '') + '>' +
				'&nbsp;Elites&nbsp;&nbsp;' +
				'<input name="hideSEGroup" type="checkbox" ' + 'value="on"' +
					(system.getValue('hideSEGroup') ? ' checked' : '') + '>' +
				'&nbsp;Super Elite&nbsp;&nbsp;' +
				'<input name="hideTitanGroup" type="checkbox" value="on"' +
					(system.getValue('hideTitanGroup') ? ' checked' : '') + '>' +
				'&nbsp;Titan&nbsp;&nbsp;' +
				'<input name="hideLegendaryGroup" type="checkbox" ' + 'value="on"' +
					(system.getValue('hideLegendaryGroup') ? ' checked' : '') + '>' +
				'&nbsp;Legendary' +
				'</td></tr>' +

			'<tr><td align="right">Keep Combat Logs' +
				helpLink('Keep Combat Logs',
				'Save combat logs to a temporary variable. ' +
				'Press <u>Show logs</u> on the right to display and copy them') +
				':</td><td><input name="keepLogs" type="checkbox" value="on"' +
				(system.getValue('keepLogs') ? ' checked' : '') + '>&nbsp;&nbsp;' +
				'<input type="button" class="custombutton" value="Show Logs" ' +
				'id="Helper:ShowLogs"></td></tr>' +

			simpleCheckbox('showCombatLog') +
			simpleCheckbox('enableCreatureColoring') +
			simpleCheckbox('showCreatureInfo') +

			'<tr><td align="right">Combat Evaluator Bias' +
				helpLink('Combat Evaluator Bias',
				'This changes the bias of the combat evaluator for the damage and ' +
				'HP evaluation. It will not change the attack bias (1.1053).' +
				'<br>Conservative = 1.1053 and 1.1 (Safest)' +
				'<br>Semi-Conservative = 1.1 and 1.053' +
				'<br>Adventurous = 1.053 and 1 (Bleeding Edge)' +
				'<br>Conservative+ = 1.1053 and 1 with the attack calculation ' +
				'changed to +-48 per RJEM') +
				':</td><td><select name="combatEvaluatorBias">' +
				'<option value="0"' + (combatEvaluatorBias === 0 ? ' SELECTED' : '') +
				'>Conservative</option>' +
				'<option value="1"' + (combatEvaluatorBias === 1 ? ' SELECTED' : '') +
				'>Semi-Conservative</option>' +
				'<option value="2"' + (combatEvaluatorBias === 2 ? ' SELECTED' : '') +
				'>Adventurous</option>' +
				'<option value="3"' + (combatEvaluatorBias === 3 ? ' SELECTED' : '') +
				'>Conservative+</option></select></td></tr>' +

			'<tr><td align="right">Keep Creature Log' +
				helpLink('Keep Creature Log',
				'This will show the creature log for each creature you see when ' +
				'you travel. This requires Show Creature Info enabled!') +
				':</td><td><input name="showMonsterLog" type="checkbox" value="on"' +
				(system.getValue('showMonsterLog') ? ' checked' : '') + '>' +
				'&nbsp;&nbsp;<input type="button" class="custombutton" ' +
				'value="Show" id="Helper:ShowMonsterLogs"></td></tr>' +

			'<tr><td align="right">Show Send Gold' +
				helpLink('Show Gold on World Screen',
				'This will show an icon below the world map to allow you to ' +
				'quickly send gold to a Friend.') +
				':</td><td><input name="sendGoldonWorld" type="checkbox" value="on"' +
				(system.getValue('sendGoldonWorld') ? ' checked' : '') + '>' +
				'&nbsp;&nbsp;Send <input name="goldAmount" size="5" value="' +
				system.getValue('goldAmount') + '"> '+
				'gold to <input name="goldRecipient" size="10" value="' +
				system.getValue('goldRecipient') + '">' +
				' Current total: <input name="currentGoldSentTotal" size="5" value="'+
				system.getValue('currentGoldSentTotal') + '">' +
				'</td></tr>' +

			'<tr><td align="right">Do Not Kill List' +
				helpLink('Do Not Kill List',
				'List of creatures that will not be killed by quick kill. ' +
				'You must type the full name of each creature, separated by commas. ' +
				'Creature name will show up in red color on world screen and will ' +
				'not be killed by keyboard entry (but can still be killed by ' +
				'mouseclick). Quick kill must be enabled for this function to work.') +
				':</td><td colspan="3"><input name="doNotKillList" size="60" value="' +
				doNotKillList + '"></td></tr>' +

			'<tr><td align="right">Hunting Buffs' +
				helpLink('Hunting Buffs',
				'Customize which buffs are designated as hunting buffs. ' +
				'You must type the full name of each buff, ' +
				'separated by commas. Use the checkbox to enable/disable them.') +
				':</td><td colspan="3"><input name="showHuntingBuffs" ' +
				'type="checkbox" value="on"' +
				(system.getValue('showHuntingBuffs') ? ' checked' : '') + '> ' +
				'Enabled Hunting Mode' +
				helpLink('Enabled Hunting Mode',
				'This will determine which list of buffs gets checked ' +
				'on the world screen.') +
				':<select name="enabledHuntingMode">' +
				'<option value="1"' + (enabledHuntingMode === '1' ? ' SELECTED' : '') +
				'>' + buffsName + '</option>' +
				'<option value="2"' + (enabledHuntingMode === '2' ? ' SELECTED' : '') +
				'>' + buffs2Name + '</option>' +
				'<option value="3"' + (enabledHuntingMode === '3' ? ' SELECTED' : '') +
				'>' + buffs3Name + '</option>' +
				'</select></td></tr>' +
			'<tr><td align="right">' + buffsName + ' Hunting Buff List' +
				helpLink(buffsName + ' Hunting Buff List',
				buffsName + ' list of hunting buffs.') +
				':</td><td colspan="3"><input name="huntingBuffsName" ' +
				'title="Hunting mode name" size="7" value="' + buffsName +
				'"><input name="huntingBuffs" size="49" value="' + buffs +
				'"></td></tr>' +
			'<tr><td align="right">' + buffs2Name + ' Hunting Buff List' +
				helpLink(buffs2Name + ' Hunting Buff List',
				'List of ' + buffs2Name + ' hunting buffs.') +
				':</td><td colspan="3"><input name="huntingBuffs2Name" ' +
				'title="Hunting mode name" size="7" value="' + buffs2Name +
				'"><input name="huntingBuffs2" size="49" value="' + buffs2 +
				'"></td></tr>' +
			'<tr><td align="right">' + buffs3Name + ' Hunting Buff List' +
				helpLink(buffs3Name + ' Hunting Buff List',
				'List of ' + buffs3Name + ' hunting buffs.') +
				':</td><td colspan="3"><input name="huntingBuffs3Name" ' +
				'title="Hunting mode name" size="7" value="'+ buffs3Name +
				'"><input name="huntingBuffs3" size="49" value="' + buffs3 +
				'"></td></tr>' +

			simpleCheckbox('huntingMode') +

			//Log screen prefs
			'<tr><th colspan="2" align="left"><b>Log screen preferences' +
				'</b></th></tr>' +

			simpleCheckbox('hideNonPlayerGuildLogMessages') +
			simpleCheckbox('useNewGuildLog') +

			'<tr><td align="right">New Guild Log History' +
				helpLink('New Guild Log History (pages)',
				'This is the number of pages that the new guild log ' +
				'screen will go back in history.') +
				':</td><td><input name="newGuildLogHistoryPages" size="3" value="' +
				system.getValue('newGuildLogHistoryPages') + '"></td></td></tr>' +

			simpleCheckbox('enableLogColoring') +

			'<tr><td align="right">New Log Message Sound' +
				helpLink('New Log Message Sound',
				'The .wav or .ogg file to play when you have unread log messages. ' +
				'This must be a .wav or .ogg file. This option can be turned on/off ' +
				'on the world page. Only works in Firefox 3.5+') +
				':</td><td colspan="3"><input name="defaultMessageSound" size="60" ' +
				'value="' + system.getValue('defaultMessageSound') +
				'"></td></tr>' +

			'<tr><td align="right">Play sound on unread log' +
				helpLink('Play sound on unread log',
				'Should the above sound play when you have unread log messages? ' +
				'(will work on Firefox 3.5+ only)') +
				':</td><td><input name="playNewMessageSound" type="checkbox" ' +
				'value="on"' +
				(system.getValue('playNewMessageSound') ? ' checked' : '') + '>' +
				' Show speaker on world' +
				helpLink('Show speaker on world',
				'Should the toggle play sound speaker show on the world map? ' +
				'(This icon is next to the Fallensword wiki icon and will only ' +
				'display on Firefox 3.5+)') +
				':<input name="showSpeakerOnWorld" type="checkbox" value="on"' +
				(system.getValue('showSpeakerOnWorld') ? ' checked' : '') +
				'></tr></td>' +

			simpleCheckbox('enableChatParsing') +
			simpleCheckbox('keepBuffLog') +
			simpleCheckbox('addAttackLinkToLog') +
			simpleCheckbox('enhanceChatTextEntry') +

			//Equipment screen prefs
			'<tr><th colspan="2" align="left"><b>Equipment screen preferences' +
				'</b></th></tr>' +

			simpleCheckbox('showExtraLinks') +
			simpleCheckbox('disableItemColoring') +

			'<tr><td align="right">Show Quick Send Item' +
				helpLink('Show Quick Send on Manage Backpack',
				'This will show a link beside each item which gives the option to ' +
				'quick send the item to this person') +
				':</td><td><input name="showQuickSendLinks" type="checkbox" ' +
				'value="on"' +
				(system.getValue('showQuickSendLinks') ? ' checked' : '') + '>'+
				'&nbsp;&nbsp;Send Items To ' +
				'<input name="itemRecipient" size="10" value="' +
				system.getValue('itemRecipient') + '">' +

			simpleCheckbox('showQuickDropLinks') +

			'<tr><td align="right">Quick Select all of type in Send Screen' +
				helpLink('Quick Select all of type in Send Screen',
				'This allows you to customize what quick links you would like ' +
				'displayed in your send item screen.<br>Use the format ' +
				'[&quot;name&quot;,&quot;itemid&quot;],[&quot;othername&quot;,' +
				'&quot;itemid2&quot;].<br>WARNING: NO REFUNDS ON ERROR') +
				':</td><td><input name="sendClasses" size="60" value="' +
				escapeHtml(system.getValue('sendClasses')) + '">'+

			//Quest Preferences
			'<tr><th colspan="2" align="left"><b>Quest preferences</b></th></tr>' +

			'<tr><td align="right">Hide Specific Quests' +
				helpLink('Hide Specific Quests',
				'If enabled, this hides quests whose name matches the list ' +
				'(separated by commas). This works on Quest Manager and Quest Book.') +
				':</td><td colspan="3"><input name="hideQuests" type="checkbox" ' +
				'value="on"' +
				(system.getValue('hideQuests') ? ' checked' : '') + '>' +
				'&nbsp;<input name="hideQuestNames" size="60" value="' +
				system.getValue('hideQuestNames') + '"></td></tr>' +

			simpleCheckbox('storeLastQuestPage') +
			simpleCheckbox('showNextQuestSteps') +

			//profile prefs
			'<tr><th colspan="2" align="left"><b>Profile preferences</b></th></tr>' +

			simpleCheckbox('renderSelfBio') +
			simpleCheckbox('renderOtherBios') +

			'<tr><td align="right">Enable Bio Compressor' +
				helpLink('Enable Bio Compressor',
				'This will compress long bios according to settings and provide a ' +
				'link to expand the compressed section.') +
				':</td><td><input name="enableBioCompressor" type="checkbox" ' +
				'value="on"' +
				(system.getValue('enableBioCompressor') ? ' checked' : '') +
				'> Max Characters:<input name="maxCompressedCharacters" size="4" ' +
				'value="' + system.getValue('maxCompressedCharacters') + '" />' +
				' Max Lines:<input name="maxCompressedLines" size="3" value="' +
				system.getValue('maxCompressedLines') + '"></td></tr>' +

			'<tr><td align="right">Buy Buffs Greeting' +
				helpLink('Buy Buffs Greeting',
				'This is the default text to open a message with when asking to ' +
				'buy buffs. You can use {playername} to insert the target players ' +
				'name. You can also use {buffs} to insert the list of buffs. You ' +
				'can use {cost} to insert the total cost of the buffs.') +
				':</td><td colspan="3"><input name="buyBuffsGreeting" size="60" ' +
				'value="' + system.getValue('buyBuffsGreeting') + '"></td></tr>' +

			simpleCheckbox('showStatBonusTotal') +
			simpleCheckbox('enableQuickDrink') +
			simpleCheckbox('disableDeactivatePrompts') +

			//Bounty hunting prefs
			'<tr><th colspan="2" align="left"><b>Bounty hunting preferences' +
				'</b></th></tr>' +

			'<tr><td align= "right">' + networkIcon +
				'Show Active Bounties' +
				helpLink('Show Active Bounties',
				'This will show your active bounties on the right hand side') +
				':</td><td colspan="3"><input name="enableActiveBountyList" ' +
				'type = "checkbox" value = "on"' +
				(enableActiveBountyList ? ' checked' : '') + '>&nbsp;' +
				'<input name="bountyListRefreshTime" size="3" value="' +
				bountyListRefreshTime + '"> seconds refresh</td></tr>' +

			'<tr><td align= "right">' + networkIcon +
				'Show Wanted Bounties' +
				helpLink('Show Wanted Bounties',
				'This will show when someone you want is on the bounty board, ' +
				'the list is displayed on the right hand side') +
				':</td><td colspan="3"><input name="enableWantedList" ' +
				'type="checkbox" value="on"' +
				(enableWantedList ? ' checked' : '') +
				'> Refresh time is same as Active Bounties' +

			'<tr><td align= "right">Wanted Names' +
				helpLink('Wanted Names',
				'The names of the people you want to see on the bounty board ' +
				'separated by commas') + ':</td><td colspan="3">' +
				'<input name="wantedNames" size="60" value="' + wantedNames +
				'"></td></tr>' +

			simpleCheckbox('enableAttackHelper') +
			simpleCheckbox('showPvPSummaryInLog') +

			//Other prefs
			'<tr><th colspan="2" align="left"><b>Other preferences</b></th></tr>' +

			simpleCheckbox('autoFillMinBidPrice') +

			'<tr><td align="right">Hide Specific Recipes' +
				helpLink('Hide Specific Recipes',
				'If enabled, this hides recipes whose name matches the list ' +
				'(separated by commas). This works on Recipe Manager') +
				':</td><td colspan="3"><input name="hideRecipes" ' +
				'type="checkbox" value="on"' +
				(system.getValue('hideRecipes') ? ' checked' : '') + '>' +
				'&nbsp;<input name="hideRecipeNames" size="60" value="' +
				system.getValue('hideRecipeNames') + '"></td></tr>' +

			simpleCheckbox('hideRelicOffline') +
			simpleCheckbox('enterForSendMessage') +
			simpleCheckbox('navigateToLogAfterMsg') +

			'<tr><td align= "right">Max Group Size to Join' +
				helpLink('Max Group Size to Join',
				'This will disable HCSs Join All functionality and will only join ' +
				'groups less than a set size. ') +
				':</td><td colspan="3"><input name="enableMaxGroupSizeToJoin" ' +
				'type = "checkbox" value = "on"' +
				(system.getValue('enableMaxGroupSizeToJoin') ? ' checked' : '') +
				'>&nbsp;&nbsp;Max Size: ' +
				'<input name="maxGroupSizeToJoin" size="3" value="' +
				system.getValue('maxGroupSizeToJoin') + '"></td></tr>' +

			simpleCheckbox('moveComposingButtons') +

			//save button
			//http://www.fallensword.com/index.php?cmd=notepad&blank=1&subcmd=savesettings
			'<tr><td colspan="2" align=center><input type="button" class=' +
				'"custombutton" value="Save" id="Helper:SaveOptions"></td></tr>' +
			'<tr><td colspan="2" align=center><a href="' + system.server +
				'index.php?cmd=notepad&blank=1&subcmd=savesettings">Export or Load ' +
				'Settings!</a></td></tr>' +
			'<tr><td colspan="2" align=center>' +
				'<span style="font-size:xx-small">Fallen Sword Helper was coded by ' +
				'<a href="' + system.server +
				'index.php?cmd=profile&player_id=1393340">Coccinella</a>, ' +
				'<a href="' + system.server +
				'index.php?cmd=profile&player_id=1599987">yuuzhan</a>, ' +
				'<a href="' + system.server +
				'index.php?cmd=profile&player_id=1963510">PointyHair</a>, ' +
				'<a href="' + system.server +
				'index.php?cmd=profile&player_id=1346893">Tangtop</a>, ' +
				'<a href="' + system.server +
				'index.php?cmd=profile&player_id=2536682">dkwizard</a>, ' +
				'<a href="' + system.server +
				'index.php?cmd=profile&player_id=1570854">jesiegel</a>, ' +
				'<a href="' + system.server +
				'index.php?cmd=profile&player_id=2156859">ByteBoy</a>, and ' +
				'<a href="' + system.server +
				'index.php?cmd=profile&player_id=2169401">McBush</a>, ' +
				'with valuable contributions by ' +
				'<a href="' + system.server +
				'index.php?cmd=profile&player_id=524660">Nabalac</a>, ' +
				'<a href="' + system.server +
				'index.php?cmd=profile&player_id=37905">Ananasii</a></span></td></tr>' +
			'</table></form>';

		var maxID = parseInt($('div[id*="settingsTabs-"]:last').attr('id')
			.split('-')[1], 10);
		$('div[id*="settingsTabs-"]:last').after('<div id="settingsTabs-' +
			(maxID + 1) + '">' + configData + '</div>');
		if($('#settingsTabs').tabs('length') > 0){
			//chrome, have to add it this way (due to loading order
			$('#settingsTabs').tabs('add','#settingsTabs-' + (maxID + 1),
				'FSH Settings');
		} else {
			//firefox loads it later, so just print to page
			$('a[href*="settingsTabs-"]:last').parent()
				.after('<li><a href="#settingsTabs-' + (maxID + 1) +
				'">FSH Settings</a></li>');
		}

		document.getElementById('fshClearStorage')
			.addEventListener('click', clearStorage, true);

		document.getElementById('Helper:SaveOptions')
			.addEventListener('click', saveConfig, true);
		document.getElementById('Helper:ShowLogs')
			.addEventListener('click', showLogs, true);
		document.getElementById('Helper:ShowMonsterLogs')
			.addEventListener('click', showMonsterLogs, true);

		document.getElementById('toggleShowGuildSelfMessage')
			.addEventListener('click', system.toggleVisibilty, true);
		document.getElementById('toggleShowGuildFrndMessage')
			.addEventListener('click', system.toggleVisibilty, true);
		document.getElementById('toggleShowGuildPastMessage')
			.addEventListener('click', system.toggleVisibilty, true);
		document.getElementById('toggleShowGuildEnmyMessage')
			.addEventListener('click', system.toggleVisibilty, true);

		var minGroupLevelTextField =
			system.findNode('//input[@name="min_group_level"]');
		if (minGroupLevelTextField) {
			var minGroupLevel = minGroupLevelTextField.value;
			system.setValue('minGroupLevel',minGroupLevel);
		}
	}

	function injectSaveSettings(){ // Hybrid
		var content = layout.notebookContent();
		var fshSettings = {};
		var list = GM_listValues();
		for(var i = 0; i < list.length; i += 1) {
			fshSettings[list[i]] = system.getValue(list[i]);
		}
		content.innerHTML = '<h1>FSH Settings</h1><br><center>The box below ' +
			'is your current settings. Copy it to save your current settings<br>' +
			'To load saved settings, simply replace the contents of the box with ' +
			'your saved copy and press the button below.'+
			'<textarea align="center" cols="80" rows="25" style="' +
			'background-color:white;' +
			'font-family:Consolas,\'Lucida Console\',\'Courier New\',monospace;" ' +
			'id="HelperfshSettings" name="fshSettings">' +
			JSON.stringify(fshSettings) + '</textarea>' +
			'<br><input id="HelperLoadSettings" class="custombutton" ' +
			'type="submit" value="Load Settings!" /></center>';
		$('#HelperLoadSettings').click(function(){
			var settings = JSON.parse($('#HelperfshSettings').val());
			Object.keys(settings).forEach(function(id) {
				system.setValue(id,settings[id]);
			});
			// for(var id in settings){
				// if (!settings.hasOwnProperty(id)) { continue; }
				// system.setValue(id,settings[id]);
			// }
			alert('Settings loaded successfully!');
		});
	}

	module.exports = {
		injectSettings: injectSettings,
		injectSaveSettings: injectSaveSettings,
		helpLink : helpLink
	};

})();