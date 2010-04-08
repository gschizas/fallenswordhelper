var Data = {

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
				{Name:"Colossal Fedomeera",Realm:"Raga Domain (Lonely Road) (15,5) Lvl 66",Comment:"Artifact Gain +1<p>Getting there: Portal >  Raga Domain > Lonely Road "},
				{Name:"Altus Galactic Archive",Realm:"Sanctuary of Ages (Mantapa) (9,13) Lvl 180",Comment:"Artifact Gain +1<p>Getting there: Portal > Sanctuary of Ages Inner Halls > Sanctuary of Ages (Narthex) > Sanctuary of Ages (Mantapa)"},
				{Name:"Metro Defence System",Realm:"Varion City (Heights) (5,2) Lvl 110",Comment:"Artifact Gain +1<p>Getting there: Portal > Ashstorm Wilds > Varion City (Heights)"},
				{Name:"Ancient Geothermal Tap",Realm:"Lava Field (Crust) (2,16) Lvl 102",Comment:"Artifact Gain +1<p>Getting there: Portal > Ashstorm Wilds > Lava Field (Edge) > Lava Field (Crust)"}
			];
		}
		return Data.relicArray;
	},

	creatureList: function() {

	},

	buffList: function() {
		if (!Data.buffArray) {
			Data.buffArray = [
				{name: "Strike", stamina: 10, "duration": 60,   treeId: 0, skillId: 0,  buff: "need help"},
				{name: "Mission Finder", stamina: 10, "duration": 60,   treeId: 0, skillId: 1,  buff: "need help"},
				{name: "Find Item", stamina: 10, "duration": 60,   treeId: 0, skillId: 2,  buff: "need help"},
				{name: "Internal Reserves", stamina: 10, "duration": 60,   treeId: 0, skillId: 3,  buff: "need help"},
				{name: "Data Processor", stamina: 15, "duration": 60,   treeId: 0, skillId: 4,  buff: "need help"},
				{name: "Defiance", stamina: 15, "duration": 60,   treeId: 0, skillId: 5,  buff: "need help"},
				{name: "Absorption", stamina: 15, "duration": 60,   treeId: 0, skillId: 6,  buff: "need help"},
				{name: "Salvage", stamina: 15, "duration": 60,   treeId: 0, skillId: 7,  buff: "need help"},
				{name: "Researcher", stamina: 20, "duration": 60,   treeId: 0, skillId: 8,  buff: "need help"},
				{name: "Brinkmanship", stamina: 20, "duration": 60,   treeId: 0, skillId: 9,  buff: "need help"},
				{name: "Kinetic Reserves", stamina: 20, "duration": 60,   treeId: 0, skillId: 10,  buff: "need help"},
				{name: "Rad Hunter", stamina: 20, "duration": 60,   treeId: 0, skillId: 11,  buff: "need help"},
				{name: "Robot Hunter", stamina: 20, "duration": 60,   treeId: 0, skillId: 12,  buff: "need help"},
				{name: "Haggle", stamina: 25, "duration": 60,   treeId: 0, skillId: 13,  buff: "need help"},
				{name: "Corrode", stamina: 25, "duration": 60,   treeId: 0, skillId: 14,  buff: "need help"},
				{name: "Protection Field", stamina: 25, "duration": 60,   treeId: 0, skillId: 15,  buff: "need help"},
				{name: "Deflect", stamina: 25, "duration": 60,   treeId: 0, skillId: 16,  buff: "need help"},
				{name: "Intensifier", stamina: 30, "duration": 60,   treeId: 0, skillId: 17,  buff: "need help"},
				{name: "Entity Seeker", stamina: 30, "duration": 60,   treeId: 0, skillId: 16,  buff: "need help"},
				{name: "Traverse", stamina: 30, "duration": 60,   treeId: 0, skillId: 16,  buff: "need help"}
			];
		}
		return Data.buffArray;
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
