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
				{Name:"Ancient Geothermal Tap",Realm:"Lava Field (Crust) (2,16) Lvl 102",Comment:"Artifact Gain +1<p>Getting there: Portal > Ashstorm Wilds > Lava Field (Edge) > Lava Field (Crust)"},
				{Name:"Cerrath Power Core",Realm:"Cerrath (Sub Basement) (14,12) Lvl 271",Comment:"Artifact Gain +1<p>Getting there: Portal > Cerrath Caves > Cerrath (Sub Basement)"}
			];
		}
		return Data.relicArray;
	},

	creatureList: function() {

	},

	greenDiamond: function() {
		return "data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwAcADAD/RAAAACH5BAEAAAAALAAAAAAJAAkAQAIUhBGnqCEPRUJwGvfslS1yGmmOVQAAOw%3D%3D";
	},

	yellowDiamond: function() {
		return "data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwP3/AAcADAAAACH5BAEAAAAALAAAAAAJAAkAQAIUhCGnqBIPQ0JwGvfslS1yGmmOVQAAOw%3D%3D";
	},

	orangeDiamond: function() {
		return "data:image/gif;base64,R0lGODlhCQAJAJH/AMDAwP+9AAcADAAAACH5BAEAAAAALAAAAAAJAAkAQAIUhCGnqBIPQ0JwGvfslS1yGmmOVQAAOw%3D%3D";
	},

	offlineDot: function() {
		return "data:image/gif;base64,R0lGODlhDgAOAMQAAP///1paWnNzc4SEhK2trbW1tZylpWNra3OEhDE5OWNzc73e3rXW1qXGxpy9vZS1tYSlpXucnHOUlFJra2OEhEpjYxghISk5OVJzczlSUkprayExMTFKShgpKRAhIQAAACH5BAEAAAAALAAAAAAOAA4AQAWGICAChCINxihm2WRKiKJl19YBiBY5zNI8CAztMCJsLJ2Ox7MhqAgViiQioUxoBREHQ3E0GD8rzSK6XDicDNqMdIoKGA1mMsuk3hoKxOuAUDQcGykVGBENC4gOEkJnABxREQ8PEBIKFYEeAAoJGRUTdJc1FgIiAx1mZhtHHQMqIgQCHAGtKiEAOw%3D%3D";
	},

	sevenDayDot: function() {
		return "data:image/gif;base64,R0lGODlhDgAOAMQAAP///0JCQoSEhK2trXNrazEpKZyUnDkpMa1rjJxae5RSc3s5WlopQnMxUmMhQjkIIaWUnGNSWiEQGFIhOSEAEL1zlLVrjIxSa3M5UlIYMUoQKSkAEBgACIRrc2tSWgAAACH5BAEAAAAALAAAAAAOAA4AQAV8ICACENZ1xihqj+YsGMZkxUZJgJc1ilUhicbksYmMBhKKksMpDFQQV2PRcLA2T8Bjl0D8FEIiR0TZPM5n2y0LGDA0cJYmJRpkXopEYmG1pTQTCwkVhHtDGwcAGy4LeQoLbw8UYxFmGRkTl0STBCICSqCgEgIqdQQBEaQqIQA7";
	},

	buffList: function() {
		if (!Data.buffArray) {
			Data.buffArray = [
				{name: "Strike", stamina: 10, "duration": 60,   minCastLevel: 1,   treeId: 0, skillId: 0,  buff: "need help", nicks: "strike"},
				{name: "Mission Finder", stamina: 10, "duration": 60,   minCastLevel: 1,   treeId: 0, skillId: 1,  buff: "need help", nicks: "mission finder,mf"},
				{name: "Find Item", stamina: 10, "duration": 60,   minCastLevel: 1,   treeId: 0, skillId: 2,  buff: "need help", nicks: "find item,fi"},
				{name: "Internal Reserves", stamina: 10, "duration": 60,   minCastLevel: 1,   treeId: 0, skillId: 3,  buff: "need help", nicks: "iternal reserves,ir"},
				{name: "Data Processor", stamina: 15, "duration": 60,   minCastLevel: 25,   treeId: 0, skillId: 4,  buff: "need help", nicks: "data processor,dp"},
				{name: "Defiance", stamina: 15, "duration": 60,   minCastLevel: 25,   treeId: 0, skillId: 5,  buff: "need help", nicks: "defiance"},
				{name: "Absorption", stamina: 15, "duration": 60,   minCastLevel: 25,   treeId: 0, skillId: 6,  buff: "need help", nicks: "absorption,abs"},
				{name: "Salvage", stamina: 15, "duration": 60,   minCastLevel: 25,   treeId: 0, skillId: 7,  buff: "need help", nicks: "salvage,sal,salv"},
				{name: "Researcher", stamina: 20, "duration": 60,   minCastLevel: 75,   treeId: 0, skillId: 8,  buff: "need help", nicks: "researcher,rs,res"},
				{name: "Brinkmanship", stamina: 20, "duration": 60,   minCastLevel: 75,   treeId: 0, skillId: 9,  buff: "need help", nicks: "brinkmanship,brink,brk"},
				{name: "Kinetic Reserves", stamina: 20, "duration": 60,   minCastLevel: 75,   treeId: 0, skillId: 10,  buff: "need help", nicks: "kinetic reserves,kr"},
				{name: "Rad Hunter", stamina: 20, "duration": 60,   minCastLevel: 75,   treeId: 0, skillId: 11,  buff: "need help", nicks: "rad hunter,radh"},
				{name: "Robot Hunter", stamina: 20, "duration": 60,   minCastLevel: 75,   treeId: 0, skillId: 12,  buff: "need help", nicks: "robot hunter,roboth"},
				{name: "Haggle", stamina: 25, "duration": 60,   minCastLevel: 150,   treeId: 0, skillId: 13,  buff: "need help", nicks: "haggle"},
				{name: "Corrode", stamina: 25, "duration": 60,   minCastLevel: 150,   treeId: 0, skillId: 14,  buff: "need help", nicks: "corrode,cor"},
				{name: "Protection Field", stamina: 25, "duration": 60,   minCastLevel: 150,   treeId: 0, skillId: 15,  buff: "need help", nicks: "protection field,pf"},
				{name: "Deflect", stamina: 25, "duration": 60,   minCastLevel: 150,   treeId: 0, skillId: 16,  buff: "need help", nicks: "deflect,defl"},
				{name: "Intensifier", stamina: 30, "duration": 60,   minCastLevel: 200,   treeId: 0, skillId: 17,  buff: "need help", nicks: "intensifier,int"},
				{name: "Entity Seeker", stamina: 30, "duration": 60,   minCastLevel: 200,   treeId: 0, skillId: 18,  buff: "need help", nicks: "entity seeker,es"},
				{name: "Traverse", stamina: 30, "duration": 60,   minCastLevel: 200,   treeId: 0, skillId: 19,  buff: "need help", nicks: "traverse,trav"},
				{name: "Lightning Reflexes", stamina: 10, "duration": 120,   minCastLevel: 300,   treeId: 0, skillId: 96,  buff: "need help", nicks: "lightning reflexes"},
				{name: "Hardened", stamina: 10, "duration": 120,   minCastLevel: 300,   treeId: 0, skillId: 97,  buff: "need help", nicks: "hardened"},
				{name: "Diagnostic", stamina: 5, "duration": 120,   minCastLevel: 400,   treeId: 0, skillId: 98,  buff: "need help", nicks: "diagnostic"},
				{name: "Vibroblade", stamina: 10, "duration": 120,   minCastLevel: 400,   treeId: 0, skillId: 99,  buff: "need help", nicks: "vibroblade"},
				{name: "Razordisc", stamina: 15, "duration": 90,   minCastLevel: 500,   treeId: 0, skillId: 100,  buff: "need help", nicks: "razordisc"}
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
