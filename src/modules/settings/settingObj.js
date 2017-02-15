export var networkIcon =
  '<img class="networkIcon tip-static" ' +
  'data-tipped="This function retrieves data from the network. ' +
  'Disable this to increase speed" src="data:image/png;base64,' +
  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA' +
  'B3RJTUUH1QgGDTMWk1twEwAAAAlwSFlzAAALEgAACxIB0t1+' +
  '/AAAAARnQU1BAACxjwv8YQUAAAC8SURBVHjahVPBEcQgCEQn' +
  'HdmTqUlr0qe16I8cufOiCGZnGCcIy4LEICJwmGgWJ3o0IOCQ' +
  'EqVg9Y4U3CoCHQhvxuPUZEiA3XYkxyI1/6S6R6rke8AlJbkV' +
  '7u95lleXq3yrdyUjLGxwnifmnHEXY3fJIQSIMcKOZCLgMltr' +
  'r+1ZWgxp8wi1VrEqxfeFWloYq4wKtOHeBNqeawqmeOnNvfdY' +
  'SvkbfaeUxP0w/G+k6WsT/xCBc25SuxDsnownEy4u5BHudpMF' +
  'egAAAABJRU5ErkJggg==" width="16" height="16" />';
export var saveBoxes = [
  'navigateToLogAfterMsg',
  'gameHelpLink',
  'guildSelf',
  'guildFrnd',
  'guildPast',
  'guildEnmy',
  'showAdmin',
  'ajaxifyRankControls',
  'detailedConflictInfo',
  'disableItemColoring',
  'enableLogColoring',
  'enableChatParsing',
  'enableCreatureColoring',
  'hideNonPlayerGuildLogMessages',
  'buyBuffsGreeting',
  'renderSelfBio',
  'renderOtherBios',
  'defaultMessageSound',
  'showSpeakerOnWorld',
  'playNewMessageSound',
  'highlightPlayersNearMyLvl',
  'highlightGvGPlayersNearMyLvl',
  'showCombatLog',
  'showMonsterLog',
  'showCreatureInfo',
  'keepLogs',
  'enableGuildInfoWidgets',
  'enableOnlineAlliesWidgets',
  'hideGuildInfoMessage',
  'hideGuildInfoBuff',
  'hideGuildInfoSecureTrade',
  'hideGuildInfoTrade',
  'huntingBuffs',
  'huntingBuffsName',
  'huntingBuffs2',
  'huntingBuffs2Name',
  'huntingBuffs3',
  'huntingBuffs3Name',
  'showHuntingBuffs',
  'moveGuildList',
  'moveOnlineAlliesList',
  'moveFSBox',
  'hideQuests',
  'hideQuestNames',
  'hideRecipes',
  'hideRecipeNames',
  'doNotKillList',
  'enableBioCompressor',
  'maxCompressedCharacters',
  'maxCompressedLines',
  'sendGoldonWorld',
  'goldRecipient',
  'goldAmount',
  'keepBuffLog',
  'showQuickSendLinks',
  'showQuickDropLinks',
  'sendClasses',
  'itemRecipient',
  'currentGoldSentTotal',
  'enableAllyOnlineList',
  'enableEnemyOnlineList',
  'allyEnemyOnlineRefreshTime',
  'quickLinksTopPx',
  'quickLinksLeftPx',
  'draggableQuickLinks',
  'enableActiveBountyList',
  'bountyListRefreshTime',
  'enableWantedList',
  'wantedNames',
  'fsboxlog',
  'huntingMode',
  'enableAttackHelper',
  'hideRelicOffline',
  'enterForSendMessage',
  'storeLastQuestPage',
  'addAttackLinkToLog',
  'showStatBonusTotal',
  'newGuildLogHistoryPages',
  'useNewGuildLog',
  'enhanceChatTextEntry',
  'enableMaxGroupSizeToJoin',
  'maxGroupSizeToJoin',
  'enableTempleAlert',
  'enableUpgradeAlert',
  'enableComposingAlert',
  'autoFillMinBidPrice',
  'showPvPSummaryInLog',
  'enableQuickDrink',
  'enhanceOnlineDots',
  'hideBuffSelected',
  'hideHelperMenu',
  'keepHelperMenuOnScreen',
  'draggableHelperMenu',
  'showNextQuestSteps',
  'hideChampionsGroup',
  'hideElitesGroup',
  'hideSEGroup',
  'hideTitanGroup',
  'hideLegendaryGroup',
  'disableDeactivatePrompts',
  'moveComposingButtons',
  'showExtraLinks',
  'expandMenuOnKeyPress'
];

export var mySimpleCheckboxes = {
  moveGuildList: {
    id: 'moveGuildList',
    helpTitle: 'Move Guild Info List',
    helpText: 'This will Move the Guild Info List higher ' +
      'on the bar on the right'
  },
  moveOnlineAlliesList: {
    id: 'moveOnlineAlliesList',
    helpTitle: 'Move Online Allies List',
    helpText: 'This will Move the Online Allies List higher ' +
      'on the bar on the right'
  },
  enableOnlineAlliesWidgets: {
    id: 'enableOnlineAlliesWidgets',
    helpTitle: 'Enable Online Allies Widgets',
    helpText: 'Enabling this option will enable the Allies List ' +
      'Widgets (coloring on the Allies List panel)'
  },
  moveFSBox: {
    id: 'moveFSBox',
    helpTitle: 'Move FS box',
    helpText: 'This will move the FS box to the left, under the menu, ' +
      'for better visibility (unless it is already hidden.)'
  },
  gameHelpLink: {
    id: 'gameHelpLink',
    helpTitle: '&quot;Game Help&quot; Settings Link',
    helpText: 'This turns the Game Help text in the lower ' +
      'right box into a link to this settings page.'
  },
  enableTempleAlert: {
    id: 'enableTempleAlert',
    helpTitle: 'Enable Temple Alert',
    helpText: 'Puts an alert on the LHS if you have not ' +
      'prayed at the temple today.',
    network: true
  },
  enableUpgradeAlert: {
    id: 'enableUpgradeAlert',
    helpTitle: 'Enable Gold Upgrade Alert',
    helpText: 'Puts an alert on the LHS if you have not upgraded your ' +
      'stamina with gold today.',
    network: true
  },
  enableComposingAlert: {
    id: 'enableComposingAlert',
    helpTitle: 'Enable Composing Alert',
    helpText: 'Puts an alert on the LHS if you have composing ' +
      'slots available.',
    network: true
  },
  enhanceOnlineDots: {
    id: 'enhanceOnlineDots',
    helpTitle: 'Enhance Online Dots',
    helpText: 'Enhances the green/grey dots by player names to show ' +
      'online/offline status.'
  },
  hideBuffSelected: {
    id: 'hideBuffSelected',
    helpTitle: 'Hide Buff Selected',
    helpText: 'Hides the buff selected functionality in the online allies ' +
      'and guild info section.'
  },
  hideHelperMenu: {
    id: 'hideHelperMenu',
    helpTitle: 'Hide Helper Menu',
    helpText: 'Hides the helper menu from top left.'
  },
  keepHelperMenuOnScreen: {
    id: 'keepHelperMenuOnScreen',
    helpTitle: 'Keep Helper Menu On Screen',
    helpText: 'Keeps helper menu on screen as you scroll (helper ' +
      'menu must be enabled to work). Also works with quick links.'
  },
  showAdmin: {
    id: 'showAdmin',
    helpTitle: 'Show rank controls',
    helpText: 'Show ranking controls for guild managemenet in member ' +
      'profile page - this works for guild founders only'
  },
  ajaxifyRankControls: {
    id: 'ajaxifyRankControls',
    helpTitle: 'AJAXify rank controls',
    helpText: 'Enables guild founders with ranking rights to change rank ' +
      'positions without a screen refresh.'
  },
  detailedConflictInfo: {
    id: 'detailedConflictInfo',
    helpTitle: 'Show Conflict Details',
    helpText: 'Inserts detailed conflict information onto your guild\'s ' +
      'manage page. Currently displays the target guild as well as ' +
      'the current score.',
    network: true
  },
  showCombatLog: {
    id: 'showCombatLog',
    helpTitle: 'Show Combat Log',
    helpText: 'This will show the combat log for each automatic ' +
      'battle below the monster list.'
  },
  enableCreatureColoring: {
    id: 'enableCreatureColoring',
    helpTitle: 'Color Special Creatures',
    helpText: 'Creatures will be colored according to their rarity. ' +
      'Champions will be colored green, Elites yellow and Super Elites red.'
  },
  showCreatureInfo: {
    id: 'showCreatureInfo',
    helpTitle: 'Show Creature Info',
    helpText: 'This will show the information from the view creature ' +
      'link when you mouseover the link.',
    network: true
  },
  fsboxlog: {
    id: 'fsboxlog',
    helpTitle: 'Enable FS Box Log',
    helpText: 'This enables the functionality to keep a log of ' +
      'recent seen FS Box message.'
  },
  keepBuffLog: {
    id: 'keepBuffLog',
    helpTitle: 'Enable Buff Log',
    helpText: 'This enables the functionality to keep a log of ' +
      'recently casted buffs'
  },
  huntingMode: {
    id: 'huntingMode',
    helpTitle: 'Enable Hunting Mode',
    helpText: 'This disable menu and some visual features to ' +
      'speed up the calf.'
  },
  hideNonPlayerGuildLogMessages: {
    id: 'hideNonPlayerGuildLogMessages',
    helpTitle: 'Cleanup Guild Log',
    helpText: 'Any log messages not related to the current player ' +
      'will be dimmed (e.g. recall messages from guild store)'
  },
  useNewGuildLog: {
    id: 'useNewGuildLog',
    helpTitle: 'Use New Guild Log',
    helpText: 'This will replace the standard guild log with the ' +
      'helper version of the guild log.'
  },
  enableLogColoring: {
    id: 'enableLogColoring',
    helpTitle: 'Enable Log Coloring',
    helpText: 'Three logs will be colored if this is enabled, ' +
      'Guild Chat, Guild Log and Player Log. It will show any new ' +
      'messages in yellow and anything 20 minutes old ones in brown.'
  },
  enableChatParsing: {
    id: 'enableChatParsing',
    helpTitle: 'Enable Chat Parsing',
    helpText: 'If this is checked, your character log will be parsed for ' +
      'chat messages and show the chat message on the screen if you reply ' +
      'to that message.'
  },
  addAttackLinkToLog: {
    id: 'addAttackLinkToLog',
    helpTitle: 'Add attack link to log',
    helpText: 'If checked, this will add an Attack link to each message ' +
      'in your log.'
  },
  enhanceChatTextEntry: {
    id: 'enhanceChatTextEntry',
    helpTitle: 'Enhance Chat Text Entry',
    helpText: 'If checked, this will enhance the entry field for entering ' +
      'chat text on the guild chat page.'
  },
  showExtraLinks: {
    id: 'showExtraLinks',
    helpTitle: 'Show Extra Links',
    helpText: 'If checked, this will add AH and UFSG ' +
      'links to equipment screens.'
  },
  disableItemColoring: {
    id: 'disableItemColoring',
    helpTitle: 'Disable Item Coloring',
    helpText: 'Disable the code that colors the item text based on the ' +
      'rarity of the item.'
  },
  showQuickDropLinks: {
    id: 'showQuickDropLinks',
    helpTitle: 'Show Quick Drop Item',
    helpText: 'This will show a link beside each item which gives the ' +
      'option to drop the item.  WARNING: NO REFUNDS ON ERROR'
  },
  storeLastQuestPage: {
    id: 'storeLastQuestPage',
    helpTitle: 'Store Last Quest Page',
    helpText: 'This will store the page and sort order of each of the ' +
      'three quest selection pages for next time you visit. If you need ' +
      'to reset the links, turn this option off, click on the link you ' +
      'wish to reset and then turn this option back on again.'
  },
  showNextQuestSteps: {
    id: 'showNextQuestSteps',
    helpTitle: 'Show Next Quest Steps',
    helpText: 'Shows all quest steps in the UFSG.'
  },
  renderSelfBio: {
    id: 'renderSelfBio',
    helpTitle: 'Render self bio',
    helpText: 'This determines if your own bio will render the FSH ' +
      'special bio tags.'
  },
  renderOtherBios: {
    id: 'renderOtherBios',
    helpTitle: 'Render other players&#39; bios',
    helpText: 'This determines if other players bios will render the FSH ' +
      'special bio tags.'
  },
  showStatBonusTotal: {
    id: 'showStatBonusTotal',
    helpTitle: 'Show Stat Bonus Total',
    helpText: 'This will show a total of the item stats when you ' +
      'mouseover an item on the profile screen.'
  },
  enableQuickDrink: {
    id: 'enableQuickDrink',
    helpTitle: 'Enable Quick Drink/Wear',
    helpText: 'This enables the quick drink/wear functionality on the ' +
      'profile page.'
  },
  disableDeactivatePrompts: {
    id: 'disableDeactivatePrompts',
    helpTitle: 'Disable Deactivate Prompts',
    helpText: 'This disables the prompts for deactivating buffs on ' +
      'the profile page.'
  },
  enableAttackHelper: {
    id: 'enableAttackHelper',
    helpTitle: 'Show Attack Helper',
    helpText: 'This will show extra information on the attack player ' +
      'screen about stats and buffs on you and your target',
    network: true
  },
  showPvPSummaryInLog: {
    id: 'showPvPSummaryInLog',
    helpTitle: 'Show PvP Summary in Log',
    helpText: 'This will show a summary of the PvP results in the log.',
    network: true
  },
  autoFillMinBidPrice: {
    id: 'autoFillMinBidPrice',
    helpTitle: 'Auto Fill Min Bid Price',
    helpText: 'This enables the functionality to automatically fill in ' +
      'the min bid price so you just have to hit bid and your bid will ' +
      'be placed.'
  },
  hideRelicOffline: {
    id: 'hideRelicOffline',
    helpTitle: 'Hide Relic Offline',
    helpText: 'This hides the relic offline defenders checker.'
  },
  enterForSendMessage: {
    id: 'enterForSendMessage',
    helpTitle: 'Enter Sends Message',
    helpText: 'If enabled, will send a message from the Send Message ' +
      'screen if you press enter. You can still insert a new line by ' +
      'holding down shift when you press enter.'
  },
  navigateToLogAfterMsg: {
    id: 'navigateToLogAfterMsg',
    helpTitle: 'Navigate After Message Sent',
    helpText: 'If enabled, will navigate to the referring page after a ' +
      'successful message is sent. Example:  if you are on the world ' +
      'screen and hit message on the guild info panel after you send the ' +
      'message, it will return you to the world screen.'
  },
  moveComposingButtons: {
    id: 'moveComposingButtons',
    helpTitle: 'Move Composing Buttons',
    helpText: 'If enabled, will move composing buttons to the top of ' +
      'the composing screen.'
  },
  draggableHelperMenu: {
    id: 'draggableHelperMenu',
    helpTitle: 'Draggable Helper Menu',
    helpText: 'If enabled, allows the helper menu to ' +
      'be dragged around the screen.'
  },
  draggableQuickLinks: {
    id: 'draggableQuickLinks',
    helpTitle: 'Draggable Quick Links',
    helpText: 'If enabled, allows the quick link box to ' +
      'be dragged around the screen.'
  },
  expandMenuOnKeyPress: {
    id: 'expandMenuOnKeyPress',
    helpTitle: 'Expand Menu on Key Press',
    helpText: 'If enabled, expands the left hand menu ' +
      'when you use hotkeys.'
  },
  disableBreakdownPrompts: {
    id: 'disableBreakdownPrompts',
    helpTitle: 'Disable Breakdown Prompts',
    helpText: 'If enabled, will disable prompts when you breakdown items.' +
      '<br>NO REFUNDS OR DO-OVERS! Use at own risk.'
  },
};
