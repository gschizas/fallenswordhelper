import calf from '../support/calf';
import * as settingObj from './settingObj';
import * as settingsPage from './settingsPage';
import * as system from '../support/system';

export function setupConfigData() {
  calf.configData =
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
      FSH.version + ') (Storage Used: ' + calf.storage + '% Remaining: ' +
      (100 - calf.storage).toFixed(2) + '%)</span></td></tr>' +
    '<tr><td colspan="2" align=center>' +
      '<span style="font-weight:bold;">Visit the ' +
      '<a href="https://github.com/fallenswordhelper/fallenswordhelper">' +
      'Fallen Sword Helper web site</a> ' +
      'for any suggestions, requests or bug reports</span></td></tr>' +
    // General Prefs
    '<tr><th colspan="2" align="left"><b>General preferences ' +
      '(apply to most screens)</b></th></tr>' +

    '<tr><td align="right">' +
      '<label for="enableGuildInfoWidgets">' +
      'Enable Guild Info Widgets' +
      settingsPage.helpLink('Enable Guild Info Widgets',
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

    settingsPage.simpleCheckbox('moveGuildList') +
    settingsPage.simpleCheckbox('moveOnlineAlliesList') +

    '<tr><td align="right">' + settingObj.networkIcon +
      'Show Online Allies/Enemies' +
      settingsPage.helpLink('Show Online Allies/Enemies',
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

    settingsPage.simpleCheckbox('enableOnlineAlliesWidgets') +
    settingsPage.simpleCheckbox('moveFSBox') +
    settingsPage.simpleCheckbox('fsboxlog') +
    settingsPage.simpleCheckbox('gameHelpLink') +
    settingsPage.simpleCheckbox('enableTempleAlert') +
    settingsPage.simpleCheckbox('enableUpgradeAlert') +
    settingsPage.simpleCheckbox('enableComposingAlert') +
    settingsPage.simpleCheckbox('enhanceOnlineDots') +
    settingsPage.simpleCheckbox('hideBuffSelected') +
    settingsPage.simpleCheckbox('hideHelperMenu') +
    settingsPage.simpleCheckbox('keepHelperMenuOnScreen') +
    settingsPage.simpleCheckbox('draggableHelperMenu') +

    '<tr><td align="right">Quick Links Screen Location' +
      settingsPage.helpLink('Quick Links Screen Location',
      'Determines where the quick links dialog shows on the screen. ' +
      'Default is top 22, left 0.') +
      ':</td><td>Top: <input name="quickLinksTopPx" size="3" value="' +
      system.getValue('quickLinksTopPx') +
      '"> Left: <input name="quickLinksLeftPx" size="3" value="' +
      system.getValue('quickLinksLeftPx') +
      '"></td></tr>' +
    settingsPage.simpleCheckbox('draggableQuickLinks') +
    settingsPage.simpleCheckbox('expandMenuOnKeyPress') +

    // Guild Manage
    '<tr><th colspan="2" align="left"><b>Guild>Manage preferences' +
      '</b></th></tr>' +
    '<tr><td colspan="2" align="left">Enter guild names, ' +
      'separated by commas</td></tr>' +
    '<tr><td>Own Guild</td><td>' +
      settingsPage.injectSettingsGuildData('Self') + '</td></tr>' +
    '<tr><td>Friendly Guilds</td><td>' +
      settingsPage.injectSettingsGuildData('Frnd') + '</td></tr>' +
    '<tr><td>Old Guilds</td><td>' +
      settingsPage.injectSettingsGuildData('Past') + '</td></tr>' +
    '<tr><td>Enemy Guilds</td><td>' +
      settingsPage.injectSettingsGuildData('Enmy') + '</td></tr>' +

    '<tr><td align="right">Highlight Valid PvP Targets' +
      settingsPage.helpLink('Highlight Valid PvP Targets',
      'Enabling this option will highlight targets in OTHER guilds that ' +
      'are within your level range to attack for PvP or GvG.') +
      ':</td><td>PvP: <input name="highlightPlayersNearMyLvl" ' +
      'type="checkbox" value="on"' +
      (system.getValue('highlightPlayersNearMyLvl') ? ' checked' : '') +
      '> GvG: <input name="highlightGvGPlayersNearMyLvl" ' +
      'type="checkbox" value="on"' +
      (system.getValue('highlightGvGPlayersNearMyLvl') ?
      ' checked' : '') + '></td></tr>' +

    settingsPage.simpleCheckbox('showAdmin') +
    settingsPage.simpleCheckbox('ajaxifyRankControls') +
    settingsPage.simpleCheckbox('detailedConflictInfo') +

    // World Screen
    '<tr><th colspan="2" align="left"><b>World screen/Hunting preferences' +
      '</b></th></tr>' +

    '<tr><td align="right">Hide Create Group Button' +
      settingsPage.helpLink('Hide Create Group Button',
      'Enabling this option will hide the Create Group button') +
      ':</td><td>' +
      '<input name="hideChampionsGroup" type="checkbox" value="on"' +
        (system.getValue('hideChampionsGroup') ? ' checked' : '') + '>' +
      '&nbsp;Champions&nbsp;&nbsp;' +
      '<input name="hideElitesGroup" type="checkbox" value="on"' +
        (system.getValue('hideElitesGroup') ? ' checked' : '') + '>' +
      '&nbsp;Elites&nbsp;&nbsp;' +
      '<input name="hideSEGroup" type="checkbox" value="on"' +
        (system.getValue('hideSEGroup') ? ' checked' : '') + '>' +
      '&nbsp;Super Elite&nbsp;&nbsp;' +
      '<input name="hideTitanGroup" type="checkbox" value="on"' +
        (system.getValue('hideTitanGroup') ? ' checked' : '') + '>' +
      '&nbsp;Titan&nbsp;&nbsp;' +
      '<input name="hideLegendaryGroup" type="checkbox" value="on"' +
        (system.getValue('hideLegendaryGroup') ? ' checked' : '') + '>' +
      '&nbsp;Legendary' +
      '</td></tr>' +

    '<tr><td align="right">Keep Combat Logs' +
      settingsPage.helpLink('Keep Combat Logs',
      'Save combat logs to a temporary variable. ' +
      'Press <u>Show logs</u> on the right to display and copy them') +
      ':</td><td><input name="keepLogs" type="checkbox" value="on"' +
      (system.getValue('keepLogs') ? ' checked' : '') + '>&nbsp;&nbsp;' +
      '<input type="button" class="custombutton" value="Show Logs" ' +
      'id="Helper:ShowLogs"></td></tr>' +

    settingsPage.simpleCheckbox('showCombatLog') +
    settingsPage.simpleCheckbox('enableCreatureColoring') +
    settingsPage.simpleCheckbox('showCreatureInfo') +

    '<tr><td align="right">Combat Evaluator Bias' +
      settingsPage.helpLink('Combat Evaluator Bias',
      'This changes the bias of the combat evaluator for the damage and ' +
      'HP evaluation. It will not change the attack bias (1.1053).' +
      '<br>Conservative = 1.1053 and 1.1 (Safest)' +
      '<br>Semi-Conservative = 1.1 and 1.053' +
      '<br>Adventurous = 1.053 and 1 (Bleeding Edge)' +
      '<br>Conservative+ = 1.1053 and 1 with the attack calculation ' +
      'changed to +-48 per RJEM') +
      ':</td><td><select name="combatEvaluatorBias">' +
      '<option value="0"' +
      (calf.combatEvaluatorBias === 0 ? ' SELECTED' : '') +
      '>Conservative</option>' +
      '<option value="1"' +
      (calf.combatEvaluatorBias === 1 ? ' SELECTED' : '') +
      '>Semi-Conservative</option>' +
      '<option value="2"' +
      (calf.combatEvaluatorBias === 2 ? ' SELECTED' : '') +
      '>Adventurous</option>' +
      '<option value="3"' +
      (calf.combatEvaluatorBias === 3 ? ' SELECTED' : '') +
      '>Conservative+</option></select></td></tr>' +

    '<tr><td align="right">' + settingObj.networkIcon + 'Keep Creature Log' +
      settingsPage.helpLink('Keep Creature Log',
      'This will show the creature log for each creature you see when ' +
      'you travel.') +
      ':</td><td><input name="showMonsterLog" type="checkbox" value="on"' +
      (system.getValue('showMonsterLog') ? ' checked' : '') + '>' +
      '&nbsp;&nbsp;<input type="button" class="custombutton" ' +
      'value="Show" id="Helper:ShowMonsterLogs"></td></tr>' +

    '<tr><td align="right">Show Send Gold' +
      settingsPage.helpLink('Show Gold on World Screen',
      'This will show an icon below the world map to allow you to ' +
      'quickly send gold to a Friend.') +
      ':</td><td><input name="sendGoldonWorld" type="checkbox" value="on"' +
      (system.getValue('sendGoldonWorld') ? ' checked' : '') + '>' +
      '&nbsp;&nbsp;Send <input name="goldAmount" size="5" value="' +
      system.getValue('goldAmount') + '"> ' +
      'gold to <input name="goldRecipient" size="10" value="' +
      system.getValue('goldRecipient') + '">' +
      ' Current total: <input name="currentGoldSentTotal" size="5" value="' +
      system.getValue('currentGoldSentTotal') + '">' +
      '</td></tr>' +

    '<tr><td align="right">Do Not Kill List' +
      settingsPage.helpLink('Do Not Kill List',
      'List of creatures that will not be killed by quick kill. ' +
      'You must type the full name of each creature, separated by commas. ' +
      'Creature name will show up in red color on world screen and will ' +
      'not be killed by keyboard entry (but can still be killed by ' +
      'mouseclick). Quick kill must be enabled for this function to work.') +
      ':</td><td colspan="3"><input name="doNotKillList" size="60" value="' +
      calf.doNotKillList + '"></td></tr>' +

    '<tr><td align="right">Hunting Buffs' +
      settingsPage.helpLink('Hunting Buffs',
      'Customize which buffs are designated as hunting buffs. ' +
      'You must type the full name of each buff, ' +
      'separated by commas. Use the checkbox to enable/disable them.') +
      ':</td><td colspan="3"><input name="showHuntingBuffs" ' +
      'type="checkbox" value="on"' +
      (system.getValue('showHuntingBuffs') ? ' checked' : '') + '> ' +
      'Enabled Hunting Mode' +
      settingsPage.helpLink('Enabled Hunting Mode',
      'This will determine which list of buffs gets checked ' +
      'on the world screen.') +
      ':<select name="enabledHuntingMode">' +
      '<option value="1"' +
      (calf.enabledHuntingMode === '1' ? ' SELECTED' : '') +
      '>' + calf.buffsName + '</option>' +
      '<option value="2"' +
      (calf.enabledHuntingMode === '2' ? ' SELECTED' : '') +
      '>' + calf.buffs2Name + '</option>' +
      '<option value="3"' +
      (calf.enabledHuntingMode === '3' ? ' SELECTED' : '') +
      '>' + calf.buffs3Name + '</option>' +
      '</select></td></tr>' +
    '<tr><td align="right">' + calf.buffsName + ' Hunting Buff List' +
      settingsPage.helpLink(calf.buffsName + ' Hunting Buff List',
      calf.buffsName + ' list of hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffsName" ' +
      'title="Hunting mode name" size="7" value="' + calf.buffsName +
      '"><input name="huntingBuffs" size="49" value="' + calf.buffs +
      '"></td></tr>' +
    '<tr><td align="right">' + calf.buffs2Name + ' Hunting Buff List' +
      settingsPage.helpLink(calf.buffs2Name + ' Hunting Buff List',
      'List of ' + calf.buffs2Name + ' hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffs2Name" ' +
      'title="Hunting mode name" size="7" value="' + calf.buffs2Name +
      '"><input name="huntingBuffs2" size="49" value="' + calf.buffs2 +
      '"></td></tr>' +
    '<tr><td align="right">' + calf.buffs3Name + ' Hunting Buff List' +
      settingsPage.helpLink(calf.buffs3Name + ' Hunting Buff List',
      'List of ' + calf.buffs3Name + ' hunting buffs.') +
      ':</td><td colspan="3"><input name="huntingBuffs3Name" ' +
      'title="Hunting mode name" size="7" value="' + calf.buffs3Name +
      '"><input name="huntingBuffs3" size="49" value="' + calf.buffs3 +
      '"></td></tr>' +

    settingsPage.simpleCheckbox('huntingMode') +

    // Log screen prefs
    '<tr><th colspan="2" align="left"><b>Log screen preferences' +
      '</b></th></tr>' +

    settingsPage.simpleCheckbox('hideNonPlayerGuildLogMessages') +
    settingsPage.simpleCheckbox('useNewGuildLog') +

    '<tr><td align="right">New Guild Log History' +
      settingsPage.helpLink('New Guild Log History (pages)',
      'This is the number of pages that the new guild log ' +
      'screen will go back in history.') +
      ':</td><td><input name="newGuildLogHistoryPages" size="3" value="' +
      system.getValue('newGuildLogHistoryPages') + '"></td></td></tr>' +

    settingsPage.simpleCheckbox('enableLogColoring') +

    '<tr><td align="right">New Log Message Sound' +
      settingsPage.helpLink('New Log Message Sound',
      'The .wav or .ogg file to play when you have unread log messages. ' +
      'This must be a .wav or .ogg file. This option can be turned on/off ' +
      'on the world page. Only works in Firefox 3.5+') +
      ':</td><td colspan="3"><input name="defaultMessageSound" size="60" ' +
      'value="' + system.getValue('defaultMessageSound') +
      '"></td></tr>' +

    '<tr><td align="right">Play sound on unread log' +
      settingsPage.helpLink('Play sound on unread log',
      'Should the above sound play when you have unread log messages? ' +
      '(will work on Firefox 3.5+ only)') +
      ':</td><td><input name="playNewMessageSound" type="checkbox" ' +
      'value="on"' +
      (system.getValue('playNewMessageSound') ? ' checked' : '') + '>' +
      ' Show speaker on world' +
      settingsPage.helpLink('Show speaker on world',
      'Should the toggle play sound speaker show on the world map? ' +
      '(This icon is next to the Fallensword wiki icon and will only ' +
      'display on Firefox 3.5+)') +
      ':<input name="showSpeakerOnWorld" type="checkbox" value="on"' +
      (system.getValue('showSpeakerOnWorld') ? ' checked' : '') +
      '></tr></td>' +

    settingsPage.simpleCheckbox('enableChatParsing') +
    settingsPage.simpleCheckbox('keepBuffLog') +
    settingsPage.simpleCheckbox('addAttackLinkToLog') +
    settingsPage.simpleCheckbox('enhanceChatTextEntry') +

    // Equipment screen prefs
    '<tr><th colspan="2" align="left"><b>Equipment screen preferences' +
      '</b></th></tr>' +

    settingsPage.simpleCheckbox('showExtraLinks') +
    settingsPage.simpleCheckbox('disableItemColoring') +

    '<tr><td align="right">Show Quick Send Item' +
      settingsPage.helpLink('Show Quick Send on Manage Backpack',
      'This will show a link beside each item which gives the option to ' +
      'quick send the item to this person') +
      ':</td><td><input name="showQuickSendLinks" type="checkbox" ' +
      'value="on"' +
      (system.getValue('showQuickSendLinks') ? ' checked' : '') + '>' +
      '&nbsp;&nbsp;Send Items To ' +
      '<input name="itemRecipient" size="10" value="' +
      system.getValue('itemRecipient') + '">' +

    settingsPage.simpleCheckbox('showQuickDropLinks') +

    '<tr><td align="right">Quick Select all of type in Send Screen' +
      settingsPage.helpLink('Quick Select all of type in Send Screen',
      'This allows you to customize what quick links you would like ' +
      'displayed in your send item screen.<br>Use the format ' +
      '[&quot;name&quot;,&quot;itemid&quot;],[&quot;othername&quot;,' +
      '&quot;itemid2&quot;].<br>WARNING: NO REFUNDS ON ERROR') +
      ':</td><td><input name="sendClasses" size="60" value="' +
      settingsPage.escapeHtml(system.getValue('sendClasses')) + '">' +

    // Quest Preferences
    '<tr><th colspan="2" align="left"><b>Quest preferences</b></th></tr>' +

    '<tr><td align="right">Hide Specific Quests' +
      settingsPage.helpLink('Hide Specific Quests',
      'If enabled, this hides quests whose name matches the list ' +
      '(separated by commas). This works on Quest Manager and Quest Book.') +
      ':</td><td colspan="3"><input name="hideQuests" type="checkbox" ' +
      'value="on"' +
      (system.getValue('hideQuests') ? ' checked' : '') + '>' +
      '&nbsp;<input name="hideQuestNames" size="60" value="' +
      system.getValue('hideQuestNames') + '"></td></tr>' +

    settingsPage.simpleCheckbox('storeLastQuestPage') +
    settingsPage.simpleCheckbox('showNextQuestSteps') +

    // profile prefs
    '<tr><th colspan="2" align="left"><b>Profile preferences</b></th></tr>' +

    settingsPage.simpleCheckbox('renderSelfBio') +
    settingsPage.simpleCheckbox('renderOtherBios') +

    '<tr><td align="right">Enable Bio Compressor' +
      settingsPage.helpLink('Enable Bio Compressor',
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
      settingsPage.helpLink('Buy Buffs Greeting',
      'This is the default text to open a message with when asking to ' +
      'buy buffs. You can use {playername} to insert the target players ' +
      'name. You can also use {buffs} to insert the list of buffs. You ' +
      'can use {cost} to insert the total cost of the buffs.') +
      ':</td><td colspan="3"><input name="buyBuffsGreeting" size="60" ' +
      'value="' + system.getValue('buyBuffsGreeting') + '"></td></tr>' +

    settingsPage.simpleCheckbox('showStatBonusTotal') +
    settingsPage.simpleCheckbox('enableQuickDrink') +
    settingsPage.simpleCheckbox('disableDeactivatePrompts') +

    // Bounty hunting prefs
    '<tr><th colspan="2" align="left"><b>Bounty hunting preferences' +
      '</b></th></tr>' +

    '<tr><td align= "right">' + settingObj.networkIcon +
      'Show Active Bounties' +
      settingsPage.helpLink('Show Active Bounties',
      'This will show your active bounties on the right hand side') +
      ':</td><td colspan="3"><input name="enableActiveBountyList" ' +
      'type = "checkbox" value = "on"' +
      (calf.enableActiveBountyList ? ' checked' : '') + '>&nbsp;' +
      '<input name="bountyListRefreshTime" size="3" value="' +
      calf.bountyListRefreshTime + '"> seconds refresh</td></tr>' +

    '<tr><td align= "right">' + settingObj.networkIcon +
      'Show Wanted Bounties' +
      settingsPage.helpLink('Show Wanted Bounties',
      'This will show when someone you want is on the bounty board, ' +
      'the list is displayed on the right hand side') +
      ':</td><td colspan="3"><input name="enableWantedList" ' +
      'type="checkbox" value="on"' +
      (calf.enableWantedList ? ' checked' : '') +
      '> Refresh time is same as Active Bounties' +

    '<tr><td align= "right">Wanted Names' +
      settingsPage.helpLink('Wanted Names',
      'The names of the people you want to see on the bounty board ' +
      'separated by commas') + ':</td><td colspan="3">' +
      '<input name="wantedNames" size="60" value="' + calf.wantedNames +
      '"></td></tr>' +

    settingsPage.simpleCheckbox('enableAttackHelper') +
    settingsPage.simpleCheckbox('showPvPSummaryInLog') +

    // Other prefs
    '<tr><th colspan="2" align="left"><b>Other preferences</b></th></tr>' +

    settingsPage.simpleCheckbox('autoFillMinBidPrice') +

    '<tr><td align="right">Hide Specific Recipes' +
      settingsPage.helpLink('Hide Specific Recipes',
      'If enabled, this hides recipes whose name matches the list ' +
      '(separated by commas). This works on Recipe Manager') +
      ':</td><td colspan="3"><input name="hideRecipes" ' +
      'type="checkbox" value="on"' +
      (system.getValue('hideRecipes') ? ' checked' : '') + '>' +
      '&nbsp;<input name="hideRecipeNames" size="60" value="' +
      system.getValue('hideRecipeNames') + '"></td></tr>' +

    settingsPage.simpleCheckbox('hideRelicOffline') +
    settingsPage.simpleCheckbox('enterForSendMessage') +
    settingsPage.simpleCheckbox('navigateToLogAfterMsg') +

    '<tr><td align= "right">Max Group Size to Join' +
      settingsPage.helpLink('Max Group Size to Join',
      'This will disable HCSs Join All functionality and will only join ' +
      'groups less than a set size. ') +
      ':</td><td colspan="3"><input name="enableMaxGroupSizeToJoin" ' +
      'type = "checkbox" value = "on"' +
      (system.getValue('enableMaxGroupSizeToJoin') ? ' checked' : '') +
      '>&nbsp;&nbsp;Max Size: ' +
      '<input name="maxGroupSizeToJoin" size="3" value="' +
      system.getValue('maxGroupSizeToJoin') + '"></td></tr>' +

    settingsPage.simpleCheckbox('moveComposingButtons') +

    // save button
    // http://www.fallensword.com/index.php?cmd=notepad&blank=1&subcmd=savesettings
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
}
