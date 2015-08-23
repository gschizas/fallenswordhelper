var Layout = {

	injectMenu: function() {
		if (System.getValue('lastActiveQuestPage').length > 0) { //JQuery ready
			$('a[href="index.php?cmd=questbook"]').attr('href', System.getValue('lastActiveQuestPage'));
		}
		var pCL = $('div#pCL:first');
		if (pCL.length === 0) {return;}
		//character
		$(pCL).find('a#nav-character-log').parent('li')
			.after('<li class="nav-level-1"><a class="nav-link" id="nav-character-recipemanager" href="index.php?cmd=notepad&blank=1&subcmd=recipemanager">Recipe Manager</a></li>')
			.after('<li class="nav-level-1"><a class="nav-link" id="nav-character-invmanager" href="index.php?cmd=notepad&blank=1&subcmd=invmanager">Inventory Manager</a></li>')
			.after('<li class="nav-level-1"><a class="nav-link" id="nav-character-medalguide" href="index.php?cmd=profile&subcmd=medalguide">Medal Guide</a></li>');
		if (System.getValue('keepBuffLog')) {
			$(pCL).find('a#nav-character-log').parent('li')
				.after('<li class="nav-level-1"><a class="nav-link" id="nav-character-bufflog" href="index.php?cmd=notepad&blank=1&subcmd=bufflogcontent">Buff Log</a></li>');
		}
		if (System.getValue('keepLogs')) {
			$(pCL).find('a#nav-character-notepad').parent('li')
				.after('<li class="nav-level-1"><a class="nav-link" id="nav-character-showlogs" href="index.php?cmd=notepad&blank=1&subcmd=showlogs">Combat Logs</a></li>');
		}
		if (System.getValue('showMonsterLog')) {
			$(pCL).find('a#nav-character-notepad').parent('li')
				.after('<li class="nav-level-1"><a class="nav-link" id="nav-character-monsterlog" href="index.php?cmd=notepad&blank=1&subcmd=monsterlog">Creature Logs</a></li>');
		}
		$(pCL).find('a#nav-character-notepad').parent('li')
			.after('<li class="nav-level-1"><a class="nav-link" id="nav-character-quicklinkmanager" href="index.php?cmd=notepad&blank=1&subcmd=quicklinkmanager">Quick Links</a></li>')
			.after('<li class="nav-level-1"><a class="nav-link" id="nav-character-createmap" href="index.php?cmd=notepad&blank=1&subcmd=createmap">Create Maps</a></li>');
		//guild
		$(pCL).find('a#nav-guild-storehouse-inventory').parent('li')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-guild-guildinvmanager" href="index.php?cmd=notepad&blank=1&subcmd=guildinvmanager">Guild Inventory</a></li>');
		if (!System.getValue('useNewGuildLog')) {
			//if not using the new guild log, show it as a separate menu entry
			$(pCL).find('a#nav-guild-ledger-guildlog').parent('li')
				.before('<li class="nav-level-2"><a class="nav-link" id="nav-guild-newguildlog" href="index.php?cmd=notepad&blank=1&subcmd=newguildlog">New Guild Log</a></li>');
		}
		//top rated
		$(pCL).find('a#nav-toprated-players-level').parent('li')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-toprated-top250" href="index.php?cmd=toprated&subcmd=xp">Top 250 Players</a></li>');
		//actions
		$(pCL).find('a#nav-actions-trade-auctionhouse').parent('li')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-actions-ahquicksearch" href="index.php?cmd=notepad&blank=1&subcmd=auctionsearch">AH Quick Search</a></li>');
		$(pCL).find('a#nav-actions-interaction-findplayer').parent('li')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-actions-onlineplayers" href="index.php?cmd=notepad&blank=1&subcmd=onlineplayers">Online Players</a></li>')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-actions-findother" href="index.php?cmd=notepad&blank=1&subcmd=findother">Find Other</a></li>')
			.after('<li class="nav-level-2"><a class="nav-link" id="nav-actions-findbuffs" href="index.php?cmd=notepad&blank=1&subcmd=findbuffs">Find Buffs</a></li>');
		//adjust the menu length in chrome for the newly added items
		//first the open ones
		$('ul.nav-animated').each(function() {
			if ($(this).css('height') !== '0px') {
				$(this).css('height',$(this).find('li').length*22);
			}
		});
		//and now the closed saved variables
		window.$('#nav').nav('calcHeights');
	},

	injectItemIntoMenuTable: function(tableElement, text, href, position) { //JQuery ready
		if (position > tableElement.children().length) {
			position = tableElement.children().length;
		}
		$(tableElement).find('tr:eq('+position+')').before('<tr><td><font ' +
			'color="black">&nbsp;&nbsp;-&nbsp;<A href="' + href + '"><font ' +
			'color="black">' + text + '</font></A></font></td></tr><tr><td ' +
			'height="5"></td></tr>');
	},

	moveRHSBoxUpOnRHS: function(title) {
		$('div#pCR').prepend($('div#' + title));
	},

	moveRHSBoxToLHS: function(title) {
		var myDiv=$('div#' + title).wrap('<div class="pCR"></div>');
		myDiv=myDiv.parent();
		$('div#pCL').append(myDiv);
		$('div#pCL').append('<style>.pCR a { color: #F7EAC9; }</style>');
	},

	notebookContent: function() {
		return System.findNode('//div[@id="pCC"]'); //new interface logic
	},

	playerId: function() {
		var playerIdRE = /fallensword.com\/\?ref=(\d+)/;
		var thePlayerId=parseInt(document.body.innerHTML.match(playerIdRE)[1],10);
		GM_setValue('playerID',thePlayerId);
		return thePlayerId;
	},

	infoBox: function(documentText) {
		//var infoRE = /<center><b>INFORMATION.*><center>([^<]+)<\/center>/i;
		//infoRE = /<center>INFORMATION<\/center><\/font><\/td><\/tr>\t*<tr><td><font size=2 color=\'\#000000\'><center>([^<]+)</i;
		//Fast Recall = <center>INFORMATION</center></font></td></tr>	<tr><td><font size=2 color='#000000'><center>You successfully recalled the item.</center>
		//Guild Take = <center>INFORMATION</center></font></td></tr>	<tr><td><font size=2 color='#000000'><center>You successfully took the item into your backpack.</center>
		var infoMatch = $(documentText).find('center[id="info-msg"]').html();
		var result='';
		if (infoMatch) {
			infoMatch = infoMatch.replace(/<br.*/,'');
			result=infoMatch;
		}
		return result;
	},

	networkIcon:
		'<img title="This function retrieves data from the network. ' +
		'Disable this to increase speed" src="data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA' +
		'B3RJTUUH1QgGDTMWk1twEwAAAAlwSFlzAAALEgAACxIB0t1+' +
		'/AAAAARnQU1BAACxjwv8YQUAAAC8SURBVHjahVPBEcQgCEQn' +
		'HdmTqUlr0qe16I8cufOiCGZnGCcIy4LEICJwmGgWJ3o0IOCQ' +
		'EqVg9Y4U3CoCHQhvxuPUZEiA3XYkxyI1/6S6R6rke8AlJbkV' +
		'7u95lleXq3yrdyUjLGxwnifmnHEXY3fJIQSIMcKOZCLgMltr' +
		'r+1ZWgxp8wi1VrEqxfeFWloYq4wKtOHeBNqeawqmeOnNvfdY' +
		'SvkbfaeUxP0w/G+k6WsT/xCBc25SuxDsnownEy4u5BHudpMF' +
		'egAAAABJRU5ErkJggg==" width="16" height="16" />',

	quickBuffHref: function(playerId, buffList) {
		if (buffList) {
			return 'href=\'javascript:window.openWindow("index.php?cmd=' +
				'quickbuff&tid=' + playerId + '&blist=' + buffList +
				'", "fsQuickBuff", 618, 1000, ",scrollbars")\'';
		} else {
			return 'href=\'javascript:window.openWindow("index.php?cmd=' +
				'quickbuff&tid=' + playerId +
				'", "fsQuickBuff", 618, 1000, ",scrollbars")\'';
		}
	},

	buffAllHref: function(shortList) {
		shortList = shortList.join(',').replace(/\s/g, '');
		var j = 'java';
		return j + 'script:openWindow("index.php?cmd=quickbuff&t=' + shortList +
			'", "fsQuickBuff", 618, 1000, ",scrollbars")';
	}
};
