(function() {

	'use strict';

	var composing = require('../composing');
	var notification = require('../notification');
	var guildReport = require('../guildReport');
	var guildAdvisor = require('../guildAdvisor');
	var bazaar = require('../bazaar');
	var groups = require('../groups');
	var rank = require('../rank');
	var inventory = require('../inventory');
	var quickBuff = require('../quickBuff');
	var toprated = require('../toprated');
	var misc = require('../misc');
	var bio = require('../profile/bio');
	var profile = require('../profile/profile');
	var logs = require('../logs');
	var lists = require('../lists');
	var recipes = require('../recipes');
	var quickWear = require('../quickWear');
	var onlinePlayers = require('../onlinePlayers');
	var dropItems = require('../dropItems');
	var questBook = require('../questBook');
	var settingsPage = require('../settings/settingsPage');
	var news = require('../news');
	var mailbox = require('../mailbox');
	var bank = require('../bank');
	var guild = require('../guild');
	var upgrades = require('../upgrades');
	var newGuildLog = require('../newGuildLog');
	var scoutTower = require('../scoutTower');
	var trade = require('../trade');
	var recipeMgr = require('../recipeMgr');
	var quickExtract = require('../quickExtract');
	var scavenging = require('../scavenging');
	var findBuffs = require('../findBuffs');
	var monstorLog = require('../monstorLog');
	var arena = require('../arena');
	var combatLog = require('../combatLog');
	var guide = require('../guide');
	var legacy = require('../legacy');

	var pageSwitcher = {
		settings: {'-': {'-': {'-': {'-': settingsPage.injectSettings}}}},
		world: {'-': {'-': {'-': {'-': legacy.injectWorld}}}},
		news: {
			'fsbox': {'-': {'-': {'-': news.newsFsbox}}},
			'shoutbox': {'-': {'-': {'-': news.newsShoutbox}}}},
		blacksmith: {
			'repairall': {'-': {'-': {'1': legacy.injectWorld}}}},
		arena: {
			'-': {'-': {'-': {'-': arena.injectArena}}},
			'join': {'-': {'-': {'-': arena.injectArena}}},
			'completed': {'-': {'-': {'-': arena.completedArenas}}},
			'pickmove': {'-': {'-': {'-': arena.storeMoves}}},
			'setup': {'-': {'-': {'-': arena.setupMoves}}}
		},
		questbook: {
			'-': {'-': {
				'-': {'-': questBook.injectQuestBookFull},
				'0': {'-': questBook.injectQuestBookFull}, // Normal
				'1': {'-': questBook.injectQuestBookFull}}}, // Seasonal
			'atoz': {'-': {'-': {'-': questBook.injectQuestBookFull}}},
			'viewquest': {'-': {'-': {'-': questBook.injectQuestTracker}}}},
		profile: {
			'-': {'-': {'-': {'-': profile.injectProfile}}},
			'managecombatset': {'-': {'-': {'-': profile.injectProfile}}},
			'report': {'-': {'-': {'-': profile.injectProfile}}},
			'equipitem': {'-': {'-': {'-': profile.injectProfile}}},
			'useitem': {'-': {'-': {'-': profile.injectProfile}}},
			'changebio': {'-': {'-': {'-': bio.injectBioWidgets}}},
			'dropitems': {'-': {'-': {'-': dropItems.injectProfileDropItems,
				'1': dropItems.injectProfileDropItems}}}},
		auctionhouse: {'-': {'-': {'-': {'-': misc.injectAuctionHouse},
			'-2': {'-': misc.injectAuctionHouse},
			'-3': {'-': misc.injectAuctionHouse}}}},
		guild: {
			'inventory': {
				'report': {'-': {'-': guildReport.injectReportPaint}},
				'addtags': {
					'-': {'-': guild.injectGuildAddTagsWidgets},
					'-1': {'-': guild.injectGuildAddTagsWidgets},
					'0': {'-': guild.injectGuildAddTagsWidgets},
					'1': {'-': guild.injectGuildAddTagsWidgets},
					'2': {'-': guild.injectGuildAddTagsWidgets},
					'3': {'-': guild.injectGuildAddTagsWidgets},
					'4': {'-': guild.injectGuildAddTagsWidgets},
					'5': {'-': guild.injectGuildAddTagsWidgets},
					'6': {'-': guild.injectGuildAddTagsWidgets},
					'7': {'-': guild.injectGuildAddTagsWidgets},
					'8': {'-': guild.injectGuildAddTagsWidgets},
					'10': {'-': guild.injectGuildAddTagsWidgets},
					'15': {'-': guild.injectGuildAddTagsWidgets},
					'16': {'-': guild.injectGuildAddTagsWidgets}},
				'removetags': {'-': {'-': guild.injectGuildAddTagsWidgets}},
				'storeitems': {'-': {'-': dropItems.injectStoreItems}}},
			'chat': {'-': {'-': {'-': logs.guildChat}}},
			'log': {'-': {'-': {'-': logs.guildLog}}},
			'groups': {
				'viewstats': {'-': {'-': groups.injectGroupStats}},
				'joinallgroupsundersize': {'-': {'-': groups.injectGroups}},
				'joinall': {'-': {'-': groups.injectGroups}},
				'-': {'-': {'-': groups.injectGroups}}},
			'manage': {'-': {'-': {'-': guild.injectGuild}}},
			'structures': {'-': {'-': {'-': guild.injectGuild}}},
			'advisor': {
				'-': {'-': {'-': guildAdvisor.injectAdvisor}},
				'weekly': {'-': {'-': guildAdvisor.injectAdvisor}}},
			'history': {'-': {'-': {'-': guild.addHistoryWidgets}}},
			'view': {'-': {'-': {'-': guild.injectViewGuild}}},
			'scouttower': {'-': {'-': {'-': scoutTower.injectScouttower}}},
			'mailbox': {'-': {'-': {'-': mailbox.guildMailbox}}},
			'ranks': {'-': {'-': {'-': rank.injectGuildRanks}}},
			'conflicts': {'rpupgrades': {'-': {'-': guild.injectRPUpgrades}}},
			'bank': {'-': {'-': {'-': bank.injectGuildBank}}}},
		bank: {'-': {'-': {'-': {'-': bank.injectBank}}}},
		log: {
			'-': {'-': {
				'-': {'-': logs.playerLog},
				'-1': {'-': logs.playerLog},
				'0': {'-': logs.playerLog},
				'1': {'-': logs.playerLog},
				'2': {'-': logs.playerLog},
				'3': {'-': logs.playerLog}}},
			'outbox': {'-': {'-': {'-': logs.outbox}}}},
		potionbazaar: {'-': {'-': {'-': {'-': bazaar.inject}}}},
		marketplace: {
			'createreq': {'-': {'-': {'-': misc.addMarketplaceWidgets}}}},
		quickbuff: {'-': {'-': {'-': {'-': quickBuff.injectQuickBuff}}}},
		notepad: {
			'showlogs': {'-': {'-': {'-': combatLog.injectNotepadShowLogs}}},
			'invmanagernew': {'-': {'-': {
				'-': inventory.injectInventoryManagerNew}}},
			'guildinvmgr': {'-': {'-': {
				'-': inventory.injectInventoryManagerNew}}},
			'recipemanager': {'-': {'-': {'-': recipeMgr.injectRecipeManager}}},
			'auctionsearch': {'-': {'-': {'-': lists.injectAuctionSearch}}},
			'onlineplayers': {'-': {'-': {'-': onlinePlayers.injectOnlinePlayers}}},
			'quicklinkmanager': {'-': {'-': {'-': lists.injectQuickLinkManager}}},
			'monsterlog': {'-': {'-': {'-': monstorLog.injectMonsterLog}}},
			'quickextract': {'-': {'-': {'-': quickExtract.insertQuickExtract}}},
			'quickwear': {'-': {'-': {'-': quickWear.insertQuickWear}}},
			'fsboxcontent': {'-': {'-': {'-': misc.injectFsBoxContent}}},
			'bufflogcontent': {'-': {'-': {'-': quickBuff.injectBuffLog}}},
			'newguildlog': {'-': {'-': {'-': newGuildLog.injectNewGuildLog}}},
			'findbuffs': {'-': {'-': {'-': findBuffs.injectFindBuffs}}},
			'findother': {'-': {'-': {'-': findBuffs.injectFindOther}}},
			'savesettings': {'-': {'-': {'-': settingsPage.injectSaveSettings}}},
			'-': {'-': {'-': {'-': misc.injectNotepad}}}},
		points: {'-': {'-': {
			'-': {'-': upgrades.storePlayerUpgrades},
			'0': {'-': upgrades.storePlayerUpgrades},
			'1': {'-': notification.parseGoldUpgrades}}}},
		trade: {
			'-': {'-': {'-': {'-': trade.injectTrade}}},
			'createsecure': {'-': {'-': {'-': trade.injectTrade}}},
			'docreatesecure': {'-': {'-': {'-': trade.injectTrade}}}},
		titan: {'-': {'-': {'-': {'-': scoutTower.injectTitan}}}},
		toprated: {
			'xp': {'-': {'-': {'-': toprated.injectTopRated}}},
			'monthlyxp': {'-': {'-': {'-': toprated.injectTopRated}}},
			'gold': {'-': {'-': {'-': toprated.injectTopRated}}},
			'killstreak': {'-': {'-': {'-': toprated.injectTopRated}}},
			'bounties': {'-': {'-': {'-': toprated.injectTopRated}}},
			'risingstars': {'-': {'-': {'-': toprated.injectTopRated}}},
			'arena': {'-': {'-': {'-': toprated.injectTopRated}}},
			'superelites': {'-': {'-': {'-': toprated.injectTopRated}}},
			'smasher': {'-': {'-': {'-': toprated.injectTopRated}}}},
		inventing: {'viewrecipe': {'-': {'-': {'-': recipes.inventing}}}},
		tempinv: {'-': {'-': {'-': {'-': mailbox.injectMailbox}}}},
		//attackplayer: {'-': {'-': {'-': {'-': 'attackPlayer.injectAttackPlayer'}}}},
		findplayer: {'-': {'-': {'-': {'-': misc.injectFindPlayer}}}},
		quests: {'-': {'-': {'-': {'-': guide.allowBack}}},
			'view': {'-': {'-': {'-': guide.showAllQuestSteps}}}}, //UFSG
		items: {'-': {'-': {'-': {'-': guide.allowBack}}}}, //UFSG
		creatures: {'-': {'-': {'-': {'-': guide.allowBack}}}}, //UFSG
		masterrealms: {'-': {'-': {'-': {'-': guide.allowBack}}}}, //UFSG
		realms: {'-': {'-': {'-': {'-': guide.allowBack}}}}, //UFSG
		relics: {'-': {'-': {'-': {'-': guide.allowBack}}}}, //UFSG
		shops: {'-': {'-': {'-': {'-': guide.allowBack}}}}, //UFSG
		scavenging: {'-': {'-': {'-': {'-': scavenging.injectScavenging}}}},
		temple: {'-': {'-': {'-': {'-': notification.parseTemplePage}}}},
		composing: {'-': {'-': {'-': {'-': composing.injectComposing}}},
			'create': {'-': {'-': {'-': composing.composingCreate}}}},
		pvpladder: {'-': {'-': {'-': {'-': misc.ladder}}}},
		'-': {'-': {'-': {'-': {'-': legacy.unknownPage}}}}
	};

	module.exports = pageSwitcher;

})();