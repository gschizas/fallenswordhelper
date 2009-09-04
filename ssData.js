var Data = {

	questMatrix: function() {
		if (!Data.questArray) {
			var questArray = [
				{'questName':'Orientation', 'level':1, 'location':'Initialize (Stage 1)'},
				{'questName':'Fist Fighter', 'level':1, 'location':'Initialize (Stage 2)'},
				{'questName':'Suiting Up', 'level':1, 'location':'Initialize (Stage 2)'},
				{'questName':'Crawling Corruption', 'level':2, 'location':'Data Store'},
				{'questName':'Energy Leak', 'level':2, 'location':'Data Store'},
				{'questName':'Access Alert', 'level':2, 'location':'Databank Beta'},
				{'questName':'System Error', 'level':3, 'location':'Security Core'},
				{'questName':'Powered Down', 'level':4, 'location':'Analytical Layer'},
				{'questName':'Bit Builder', 'level':5, 'location':'System Edge'},
				{'questName':'Facility Assault', 'level':5, 'location':'Transfer Pod @ 2,9'},
				{'questName':'Delivery Note', 'level':8, 'location':'Cloning Facility (Loading Bay) @ 2,13'},
				{'questName':'Resource Stripping', 'level':7, 'location':'Cloning Facility (East Wing)'},
				{'questName':'Call to Arms', 'level':10, 'location':'Desert Path (Straights) @ 6,3'},
				{'questName':'New Blood', 'level':10, 'location':'Desert Path (Straights) @ 15,12'},
				{'questName':'Poison Desire', 'level':12, 'location':'Desert Path (Steps) @ 15,14'},
				{'questName':'Droid Delivery', 'level':15, 'location':'Highridge (Descent) @ 8,12'},
				{'questName':'Way of the Old', 'level':16, 'location':'Phantom Lake (Shore) @ 11,9'},
				{'questName':'Tribal Assault', 'level':16, 'location':'Taulin City @ 6,2'},
				{'questName':'Stolen Labour', 'level':19, 'location':'Taulin Outskirts (Edge) @ 2,9'},
				{'questName':'Assimilation', 'level':20, 'location':'Taulin Outskirts (Dunes) @ 5,2'},
				{'questName':'Settlement Defense', 'level':22, 'location':'Taulin Gamma Wastes (Straights) @ 8,9'},
				{'questName':'Down Lines', 'level':25, 'location':'Taulin Gamma Wastes (Plateau) @ 9,7'},
				{'questName':'Revenge of the G27\'s', 'level':26, 'location':'Taulin Gamma Wastes (Towers) @ 13,2'},
				{'questName':'Desiccator Prototype', 'level':28, 'location':'Taulin Gamma Wastes (Sands) @ 2,14'},
				{'questName':'Money from the Mines', 'level':29, 'location':'Higridge Mines (Mouth) @ 16,5'},
				{'questName':'Hiding from the Hand', 'level':34, 'location':'Highridge Mines (Rock Layer) @ 6,8'},
				{'questName':'Miner Dissent', 'level':36, 'location':'Highridge Mines (Volcanic Deposits) @ 8,10'},
				{'questName':'Threat from the Shadows', 'level':38, 'location':'Highridge Mines (Sprawl) @ 9,5'},
				{'questName':'Toxic Rupture', 'level':39, 'location':'Highridge Mines (Dark Excavations) @ 14,10'},
				{'questName':'Berserker Bots!', 'level':40, 'location':'Highridge Mines (Unstable Layer) @ 18,9'},
				{'questName':'Escaping the Mines', 'level':40, 'location':'Mining Facility @ 3,2'},
				{'questName':'Young Warrior', 'level':41, 'location':'Highridge Crag (Deserted Camp) @ 19,7'},
				{'questName':'Snatched Notes', 'level':43, 'location':'Highridge Crag (Upper Slopes) @ 11,8'},
				{'questName':'Bomb Disposal', 'level':45, 'location':'Highridge Crag (Yarn Domain) @ 9,15'},
				{'questName':'Revenge', 'level':47, 'location':'Highridge Crag (Vale) @ 3,10'},
				{'questName':'The Antidote', 'level':49, 'location':'Highridge Crag (Yarn Retreat) @ 2,16'},
				{'questName':'Wild Tales', 'level':50, 'location':'Highridge Crag (Shard Gate) @ 12,14'},
				{'questName':'Elders Request', 'level':51, 'location':'Amethyst Peak (Base) @ 4,4'},
				{'questName':'Crystalline Pollution', 'level':54, 'location':'Amethyst Peak (Lower Slope)'},
				{'questName':'Seek and Retrieve', 'level':56, 'location':'Amethyst Peak (Upper Slope)'},
				{'questName':'Crystal Gathers', 'level':58, 'location':'Amethyst Peak (Climb) @ 15,14'},
				{'questName':'Stemming the Tide', 'level':60, 'location':'Amethyst Peak (View)'},
				{'questName':'Power Hunger', 'level':60, 'location':'Amethyst Peak (Pinnacle)'},
				{'questName':'Heartless Crystal', 'level':61, 'location':'Raga Domain (West Quadrant) @ 7,8'},
				{'questName':'Silent Guns', 'level':63, 'location':'Raga Domain (North Quadrant) @ 9,11'},
				{'questName':'Out Flanked', 'level':65, 'location':'Raga Domain (East Quadrant) 7,2'},
				{'questName':'Heart of Rad', 'level':67, 'location':'Raga Hills (Edge) @ 2,13'},
				{'questName':'Rebellious Son', 'level':70, 'location':'Raga Hills (Depths) @ 10,15'},
				{'questName':'Infestation', 'level':71, 'location':'Raga Hills (Secret Way) @ 12,6'},
				{'questName':'Spontaneous Phenomena', 'level':73, 'location':'Scrap Yard (Iron Dump) @ 2,2'},
				{'questName':'Flooded', 'level':74, 'location':'Scrap Yard (Steel Dump) @ 8,6'},
				{'questName':'ID Required', 'level':76, 'location':'SureTec (Reception) @ 2,17'},
				{'questName':'Line Key', 'level':78, 'location':'SureTec (Pistol Lab) @ 15,3'},
				{'questName':'Virus Killer', 'level':80, 'location':'SureTec (Testing) @ 4,5'},
				{'questName':'Crisis Management', 'level':81, 'location':'SureTec (Transfer Bay)'},
				{'questName':'Perimeter Secured', 'level':83, 'location':'OS 1313 (Barracks)'},
				{'questName':'Venting Air', 'level':85, 'location':'OS 1313 (Support Deck)'},
				{'questName':'Launch Permission', 'level':86, 'location':'OS 1313 (Fighter Bay)'},
				{'questName':'Data Recovery', 'level':88, 'location':'OS 1313 (Bio Lab)'},
				{'questName':'Results Confirmation', 'level':90, 'location':'OS 1313 (Control Module)'},
				{'questName':'The Path We Walk', 'level':91, 'location':'Plain of the Void'},
				{'questName':'A Sense of Foreboding', 'level':92, 'location':'Way of the Void'},
				{'questName':'An Honest Trade', 'level':93, 'location':'Snabith Clan Lands (Plain)'},
				{'questName':'A Light in the Gloom', 'level':93, 'location':'Desolation of Nuwa (Vale)'},
				{'questName':'Border War', 'level':95, 'location':'Snabith Clan Lands (Tableland)'},
				{'questName':'Crashed Life Pod', 'level':95, 'location':'Mount Nuwa (Ascent)'},
				{'questName':'Shields of Our Enemies', 'level':97, 'location':'Veron Vale (Gate)'},
				{'questName':'AWOL', 'level':97, 'location':'Mount Nuwa (Crater)'},
				{'questName':'Ascent', 'level':98, 'location':'Obsidian Tower (Level 1)'},
				{'questName':'The Cleansing', 'level':99, 'location':'Veron Vale (Sacred Ground)'},
				{'questName':'A Shadow Burned', 'level':100, 'location':'Obsidian Tower (Apex)'},
				{'questName':'Newborn', 'level':101, 'location':'Lava Field (Edge) @ 2,14'},
				{'questName':'Spheksophobia', 'level':103, 'location':'Lava Field (Fence) @ 3,6'},
				{'questName':'Stalemate', 'level':105, 'location':'Ashstorm Wilds (Colony) @ 2,3'},
				{'questName':'Bill of Sale', 'level':107, 'location':'Ashstorm Wilds (Plain) @ 6,9'},
				{'questName':'A Friend in Need', 'level':108, 'location':'Varion City (Outskirts) @ 6,3'},
				{'questName':'Sigil of Eons', 'level':111, 'location':'Ashstorm Wilds (Snare) @ 2,2'},
				{'questName':'Epic Mount', 'level':113, 'location':'Ashstorm Wilds (Plateau) @ 9,13'},
				{'questName':'Programmed Drive', 'level':115, 'location':'Ashstorm Wilds (Oasis) @ 7,13'},
				{'questName':'Command Clash', 'level':117, 'location':'Karano (Showroom) @ 8,2'},
				{'questName':'Unit Expectations', 'level':119, 'location':'Karano (Growth Vats) @ 10,6'},
				{'questName':'Maintenance Survey', 'level':121, 'location':'Ullgath Caves (Mouth) @ 2,10'},
				{'questName':'Weapon of Strength', 'level':123, 'location':'Ullgath Caves (Creep)@ 2,5'},
				{'questName':'The Hard Path', 'level':125, 'location':'Ullgath Caves (Halls) @ 14,5'},
				{'questName':'Stood in the Gloom', 'level':127, 'location':'Ullgath Caves (Gloom) @ 2,16'},
				{'questName':'Verification of Findings', 'level':129, 'location':'Ullgath Caves (Murk) @ 4,10'},
				{'questName':'Gamma Web', 'level':131, 'location':'Netherdeep (Descent) @ 2,13'},
				{'questName':'Broken Link', 'level':133, 'location':'Netherdeep (Twisted Halls) @ 2,2'},
				{'questName':'From the Depths', 'level':135, 'location':'Netherdeep (Pit) @ 2,12'},
				{'questName':'Walking Wounded', 'level':137, 'location':'Netherdeep (Black Fissures) @ 14,9'},
				{'questName':'A Tiresome Task', 'level':139, 'location':'Netherdeep (Fractured Galleries) @ 10,6'},
				{'questName':'Path into the Fire', 'level':141, 'location':'Netherdeep (Dark Glyph) @ 3,3'},
				{'questName':'Wandering the Dark', 'level':141, 'location':'Darkfire (Edge) @ 17,2'},
				{'questName':'Finding the Lost', 'level':145, 'location':'Sanctuary of Ages (Outer Court) @ 3,2'},
				{'questName':'Blockage Run', 'level':151, 'location':'Ashstorm CZ (Ground Zero) @ 4, 8'},
				{'questName':'A Place to Hide', 'level':152, 'location':'Ashstorm CZ (Forward Position) @ 3, 2'},
				{'questName':'Psychers Pride', 'level':155, 'location':'Ashstorm CZ (Trenches) @ 2, 8'},
				{'questName':'Broken Soldiers', 'level':156, 'location':'Ashstorm CZ (Terrace) @ 16, 15'},
				{'questName':'Strike at the Hive', 'level':158, 'location':'Ashstorm CZ (Amethyst Vale) * 2, 2'}

			];
			Data.questArray = questArray.sort();
		}
		return Data.questArray;
	},

	relicList: function() {
		if (!Data.relicArray) {
			Data.relicArray=[
				{Name:"Unearthed Inkari War Machine",Realm:"Highridge Mines (Maze) (17,11) Lvl 32",Comment:"Artifact Gain +1<p>Portal &gt; Highridge Mines Mastermap &gt; Highridge Mines (Maze)"},
				{Name:"G27 Cooling Tower",Realm:"Desert Path (Mouth) (2,12) Lvl 9",Comment:"Artifact Gain +1<p>Getting there: Teleport to Taulin Rad Lands &gt; Desert Path (Mouth)"},
				{Name:"Crashed Aircraft",Realm:"Taulin Gamma Wastes (Razor Plain) (2,2) Lvl 26",Comment:"Artifact Gain +1<p>Getting there: Portal &gt; Taulin Gamma Wastes Mastermap &gt; Taulin Gamma Wastes (Towers) &gt; Taulin Gamma Wastes (Razor Plain)"},
				{Name:"Fossilized Seinesaur",Realm:"Phantom Lake (Outer) (5,2) Lvl 17",Comment:"Artifact Gain +1<p>Getting there: Teleport to Taulin Rad Lands > Phantom Lake (Shore) > Phantom Lake (Outer)"},
				{Name:"Raga Watchtower",Realm:"Highridge Crag (Trail) (9, 10) Lvl 44",Comment:"Artifact Gain +1<p>Getting there: Portal > Highridge Crag Mastermap > Highridge Crag (Trail)<br>PVP"},
				{Name:"Experimental TIU Stealth Ship",Realm:"OS 1313 (Fighter Bay) (4, 6) Lvl 86",Comment:"Artifact Gain +1<p>Getting there: Portal > Orbital Station 1313 > Fighter Bay"},
				{Name:"Shard Stronghold",Realm:"Amethyst Peak(Edge) (14,7) Lvl 54",Comment:"Artifact Gain +1<p>Getting there: Portal > Amethyst > Edge "},
				{Name:"Memorial of the Ancients",Realm:"Ullgath Caves (Gloom) (2,3). Lvl 127",Comment:"Artifact Gain +1<p>Getting there: Portal > Ullgath Caves > Ullgath Lake > Ullgath Caves (Gloom)"},				
				{Name:"Colossal Fedomeera",Realm:"Raga Domain (Lonely Road) (15,5) Lvl 66",Comment:"Artifact Gain +1<p>Getting there: Portal >  Raga Domain > Lonely Road "}
						];
				}
		return Data.relicArray;
	},

	creatureList: function() {

	},

	buffList: function() {
	},
	
	quickSearchList: function() {
		if (!Data.quickSearchArray) {
			Data.quickSearchArray = [
				{"category":"Stims","searchname":"Mk1 Internal Reserves Stim", "nickname":"IR 50",  "displayOnAH":true},
				{"category":"Stims","searchname":"Mk2 Internal Reserves Stim", "nickname":"IR 100",  "displayOnAH":true},
				{"category":"Stims","searchname":"Mk1 Protection Field Stim", "nickname":"PF 50",  "displayOnAH":true},
				{"category":"Stims","searchname":"Mk1 Corrode Stim", "nickname":"CRD 50",  "displayOnAH":true},
				{"category":"Stims","searchname":"MK2 Corrode Stim", "nickname":"CRD 100",  "displayOnAH":true},
				{"category":"Stims","searchname":"Lesser Intensifier Stim", "nickname":"ITS 50",  "displayOnAH":true},
				{"category":"Stims","searchname":"Intensifier Stim", "nickname":"ITS 100",  "displayOnAH":true},
				{"category":"Stims","searchname":"Mk1 Defiance Stim", "nickname":"Def 50",  "displayOnAH":true},
				{"category":"Stims","searchname":"Mk1 Rad Hunter Stim", "nickname":"RadH 50",  "displayOnAH":true},
				{"category":"Stims","searchname":"Mk1 Robot Hunter Stim", "nickname":"RH 50",  "displayOnAH":true},
				{"category":"Stims","searchname":"Mk1 Strike Stim", "nickname":"STR 20",  "displayOnAH":true},
				{"category":"Resources", "searchname":"Alloy Encased Arm", "nickname":"HK100 Leg", "displayOnAH":true},
				{"category":"Resources", "searchname":"Sharonas Head", "nickname":"HK100 Head", "displayOnAH":true},
				{"category":"Resources", "searchname":"Proto Warrior Torso", "nickname":"Proto", "displayOnAH":true},
			];
		}
		return Data.quickSearchArray;
	}
}
