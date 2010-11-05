var Data = {

	plantFromComponent: function(aComponent) {
		switch(aComponent) {
			case "Amber Essense":      return "Amber Plant"; break;
			case "Blood Bloom Flower": return "Blood Bloom Plant"; break;
			case "Dark Shade ":        return "Dark Shade Plant"; break;
			case "Snake Eye":          return "Elya Snake Head"; break;
			case "Snake Venom Fang":   return "Elya Snake Head"; break;
			case "Heffle Wart":        return "Heffle Wart Plant"; break;
			case "Jademare Blossom":   return "Jademare Plant"; break;
			case "Trinettle Leaf":     return "Trinettle Plant"; break;
			case "Purplet Flower":     return "Purplet Plant"; break;
			default:                   return aComponent;
		}
	},

	huntingOnImage: function () {
		return "data:image/gif;base64,R0lGODlhKAAoALMAAD+yQH3Kf7zjvxCfEMvpzur17qzcry+rMDCsMGLAY9vv3k64T5fUmh+lIPr7/gCZACH5BAAAAAAALAAAAAAoACgAAASsEL1Jq704T6m7/2AojmRpnmiqrtQSBA2rDYJjO4mMBfd9YICXcAEoFn+eQs8WAAoDDIFiSRVYGROqwxAaELTVyXSZCx0ESrBNMFlYpY7CwOQFF67PAABZqqvBBHN9X39aXHSEhUsofoo3KY2OgieRhQAqAy8JAAZ/lzo1amUyoWBNoH+nMmlghzKFbDqwOgOKOgC2MriFkyq7njIDRsPEvTrHyMnKy8zHHM0bEQA7";
	},
	
	huntingOffImage: function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAVhJREFUWEftl08OQTEQxrkq5xDHkDiDxAUkrEms7IiNFQtWNiTKJxmppm2mpp33IhXNC9qZX7/50+qaTuf1bvELgG0ekK8CSkSoCkrUexew1EDp9Y0ADpZDg8HZnCrg7DA3t/vja/QW/SioGiAUc+Hoc0zJDyDJbj85IeDOOV3PQcBYuIOAo83YICTbyz5o2KcI1tCADdpASD18P9lNg2FmhXh1XCdBEgxACTC20VgesgDhBM5iYQqpaaeArS4BwyYrB7m5RPM4qsK5He5f8pytoG8DHMhY7tm/wZbPhwgQBnNC+opFDJgb0lUxC2BOyGKAuSCLAuaALA4IB9ROqAEj+bnVrALoOvHdYkLA7qmSrUhijT4F0L04VEAom3KGu81aRUFugWCefQNS+9P0V4DYjF1wrQtxBfT1w5QcbETB1Nu6eg5WQIkC0rUqbUYCWQEl6qmdxRLIJyPitjwjlrDgAAAAAElFTkSuQmCC";
	},
	
	soundMuteImage: function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHNSURBVHjaYvz//z8DJQAggJgYKAQAAUS0Ad3dnZFtbS1P0cUBAoiFkMaenm7m////Nfz9+7f4379/nO/9/XOAwpsEN258BJIHCCAMA/r7+6wYGCDh8u/ffwag5oXCwsIqQkJCDOw7doCE04B4GUw9QABhGADUcJSVlQ1EMzABPSgsLMbAxsbBIHnyNIPMqzcgJVeAtr+DqQcIIAwD/v37y2BoaMjw8+cvIPsfw5MnTxhEjx1gkHv9muEdCwsD19+/acjqAQIIw4A/f/4yPH78mOHhw0dgAwwePmTQAWr+xMHBMF+Yn6Fn8vQvyOoBAgiLAX8Yvn79wnDv3j0Gx0+fGHS+f2d4AUwri/l5GX79/YcRyAABhBGNP358ZwClLV+g7Xa/fjG8YWRgqP78meED0CCQ99ABQABhuODnz58MYsePMRh9+MjwnpmFYamUOAMXMDSZgBjkJXQAEEAYLkh68HiO9bsPH5j//b++ho/L5fOvH3dlZCQZxMSEGbAle4AAQjEAmEgMJH798gemnNvs//+bNcxduJeBgVH9+7fvbW/fvPuOLaEBBBDYVGT8zs/PHYh50MVTUxOjgfgZujhAADFSmhsBAoji3AgQYAAwuNxkuZyGCwAAAABJRU5ErkJggg==";
	},
	
	soundImage: function() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI9SURBVHjaYvz//z8DJQAggJgYKAQAAYTTgO7uzsi2tpanhAwACCAWdIGenm7m////Nfz9+7f4379/nNg0PcoqTmH48XOb3LwpzwACiKW/v8+KgQESDv/+/WcAal4oLCysIiQkxHDhwnlMzRmF1dxMf1u+fvtxBsg1BQggFqCGo6ysbCCNDExADwkLizGwsXEwfP78heHnj5+omtMLUoE2b/z153cLD8s/k0duIdkAAcTy799fBkNDQ4afP38BXfCP4cmTJwwPHtxi4OPjY/j1C2HAo9T8FG7Gv7OANlf+/vEzn52dcSLDtx+5AAHE8ufPX4bHjx8zPHz4CGzAjx8/GL5+/Qp0DSPD7z+/wZpfBUbfYeDiTv/7/w8Dw7fv7XJbVzA+svaeCHSNOkAAAQ34A9TwheHevXtAG38xfPnyheHbt28MCgpyDLCwAQJBhu8/gNy/QAN+QERA9M+fDAABxPTjx3cGUFoSFhZiEBDgZwB5CWQACIPYICC2fqkwUIMay9/fII2Vjwwc83i4mRkYvv+8CRBALD+Bpty8eY0B5BKQF6SlJSEJBBiiID4MyO1YNf2RmTsj0NmHWBn/XWb4BbT1x8/JAAHE9PfPb+sf339aAw2C4u93ZWQkGcTEhBnQk7ncqZ3TgLaGsgNTz5dHb8/IPb80FSCAGNEVpaUlMf//978JyCxkYGTgnD17PiNGWhDTyWD49XuT3IebzwACCGwLNpyamhgNxM9wycMwQAAxUpobAQKI4twIEGAA+Mk8nL2QZm8AAAAASUVORK5CYII=";
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

	relicList: function() {
		if (!Data.relicArray) {
			Data.relicArray=[
				{Name:"Blue Chasm",Realm:"Mountain Path (7,9) Lvl 1",Comment:"+1% Defense<br>+1% HP<br>+1 Stamina Gain<br>+5 Reinforced Armor"},
				{Name:"Krul Pyramid",Realm:"Krul Small Cave (4,16) Lvl 14",Comment:"+1% Attack<br>+1% Damage<br>+200 XP Gain<br>+5 Critical Hit"},
				{Name:"Unholy Shrine",Realm:"Paladir Forest East (2,2) Lvl 20",Comment:"+1% Damage<br>+75 Stamina<br>+50 Gold Gain<br>+200 XP Gain"},
				{Name:"Udan Sun Orb",Realm:"Udan Forest (17,10) Lvl 28",Comment:"+1% Attack<br>+1 Stamina Gain<br>+50 Gold Gain<br>+5 Critical Hit"},
				{Name:"Chaotic Symbol",Realm:"Burning Abyss (Level 3) (2,36) Lvl 34",Comment:"+50 Stamina<br>+1 Stamina Gain<br>+25 Thievery<br>+5 Disarm"},
				{Name:"Moot Crypt",Realm:"Moot Forest East (10,11) Lvl 40",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+10 Master Blacksmith"},
				{Name:"Klar Worldstone",Realm:"Klar Labyrinth (Level 1) (5,8) Lvl 48",Comment:"+5 Holy<br>+5 Nullify<br>+5 Banishment<br>+5 Protection<br>+5 Oceanic<br>+20 Disarm"},
				{Name:"Pyramid of Protection",Realm:"Ellan Port Outskirts (2,4) Lvl 55",Comment:"+25 Reinforced Armor<br>+50 Protection<br>+25 Protect Gold<br>+50 Dodge"},
				{Name:"Despair Crystal",Realm:"Depths of Despair (Level 2) (13,12) Lvl 85",Comment:"+1% Armor<br>+100 Stamina<br>+1 Stamina Gain<br>+20 Gold Gain<br>+200 XP Gain"},
				{Name:"Endlore Giants Reach",Realm:"Endlore Valley North (9,7) Lvl 70",Comment:"+1% Attack<br>+1% HP<br>+1% Damage<br>+100 Gold Gain<br>+25 Breaker"},
				{Name:"Utapo Death Skull",Realm:"Utapo Flats West (10,7) Lvl 48",Comment:"+1% Attack<br>+1% Damage<br>+10 Piercing strike<br>+20 Critical Hit<br>+25 Breaker<br>+20 Disarm"},
				{Name:"Temple of the Gods",Realm:"Eldora Plains (East) (7,9) Lvl 98",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% Hp<br>+1% Damage<br>+50 Stamina<br>+1 Stamina Gain<br>+5 Nullify<br>+20 Protect Gold<br>+25 Dodge<br>+15 Master Blacksmith"},
				{Name:"Elven Forge",Realm:"Elven Hideout (11,12) Lvl 30",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+10 Protect Gold"},
				{Name:"Feidal Power Obelisk",Realm:"Feidal Swamps North (12,3) Lvl 65",Comment:"+1% Damage<br>+30 Critical Hit"},
				{Name:"Ruined Crypt",Realm:"Enkmar Scrubland (North) (8,4) Lvl 107",Comment:"+1% Attack<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+10 Piercing Strike<br>+10 Reinforced Armor<br>+10 Thievery<br>+10 Critical Hit<br>+10 Breaker<br>+5 Nullify<br>+15 Dodge<br>+5 Disarm<br>+15 Sustain"},
				{Name:"Ethereal Pillars",Realm:"Ethereal Gateway (7,7) Lvl 1",Comment:"+1% Defense<br>+1% Armor<br>+200 XP Gain<br>+25 Reinforced Armor<br>+25 Protection<br>+25 Protect Gold<br>+25 Sustain"},
				{Name:"Kentlor Mine",Realm:"Kentlor Caves (North) (11,4) Lvl 113",Comment:"+1% Defense<br>+1% HP<br>+1% Damage<br>+100 Gold Gain<br>+25 Master Blacksmith<br>+25 Master Crafter"},
				{Name:"Spirit Bog",Realm:"Jahd Swamps (North) (10,7) Lvl 125",Comment:"+1% Armor<br>+1% Hp<br>+1% Damage<br>+5 Breaker<br>+35 Nullify<br>+35 Banishment"},
				{Name:"Sacrificial Altar",Realm:"Dekma Jungle (North (4,12) Lvl 130",Comment:"+1% Attack<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+15 Piercing Strike<br>+15 Thievery<br>+15 Critical Hit"},
				{Name:"Lookout Menhir",Realm:"Metlair (North) (6,3) Lvl 140",Comment:"+1% Attack<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+20 Holy<br>+20 Breaker<br>+25 Dodge<br>+15 Disarm"},
				{Name:"Ruined Temple",Realm:"Ekloren (South) (8,4) Lvl 152",Comment:"+1% Attack<br>+1% Defense<br>+1% Damage<br>+25 Critical Hit<br>+25 Holy<br>+50 Dodge<br>+25 Disarm<br>+25 Sustain"},
				{Name:"Serpent Tree",Realm:"Emerye (North) (3,12) Lvl 160",Comment:"+1% Armor<br>+1% HP<br>+1% Damage<br>+15 Thievery<br>+15 Holy<br>+15 Nullify<br>+15 Oceanic<br>+15 Master Crafter"},
				{Name:"Demonic Idol",Realm:"Brale (South) (8,9) Lvl 181",Comment:"+1% Attack<br>+1% Armor<br>+1% Damage<br>+35 Reinforced Armour<br>+35 Critical Hit"},
				{Name:"Sun Dial",Realm:"Pelrei (South) (4,8) Lvl 172",Comment:"+1% Attack<br>+1% HP<br>+25 Holy<br>+25 Protection<br>+25 Protect Gold<br>+25 Sustain"},
				{Name:"Temple of Lightning",Realm:"Ephal Swamp (South) (12,4) Lvl 286",Comment:"+1% Attack<br>+1% Damage<br>+1 Stamina Gain<br>+15 Thievery<br>+45 Dodge<br>+15 Master Crafter"},
				{Name:"The Fallen Star",Realm:"Krysa (West) (11,4) Lvl 298",Comment:"+1% Defense<br>+1% HP<br>+35 Breaker<br>+35 Banishment<br>+35 Oceanic"},
				{Name:"Pyramid of Annot",Realm:"Selari (East) (11,5) Lvl 303",Comment:"+1% Attack<br>+1% Damage<br>+25 Breaker<br>+25 Protect Gold<br>+25 Disarm<br>+25 Sustain"},
				{Name:"Leora Becon",Realm:"Cereas (West) (1,3) Lvl 314",Comment:"+1% Attack<br>+1% Armor<br>+1% Damage<br>+20 Stamina<br>+15 Piercing Strike<br>+10 Reinforced Armor<br>+5 Holy<br>+15 Breaker"},
				{Name:"Tree of Eternal Fire",Realm:"Inual (West) (12.10) Lvl 318",Comment:"+1% Damage<br>+75 Critical Hit<br>+15 Protection"},
				{Name:"Mists of Concelment",Realm:"Peitha (West) (12,7) Lvl 324",Comment:"+100 Stamina<br>+50 Sustain"},
				{Name:"Temple of Mar",Realm:"Aeresi (South) (8,3) Lvl 332",Comment:"+1% Attack<br>+1% Defense<br>+5 Holy<br>+25 Nullify"},
				{Name:"Ice Claws",Realm:"Erodum (South) (12,14) Lvl 336",Comment:"+1% Armor<br>+1% HP<br>+55 Holy"},
				{Name:"Ruzdum Keep",Realm:"Korundor (West) (9,10) Lvl 344",Comment:"+1% Defense<br>+1% Armor<br>+1% HP<br>+50 Reinforced Armor<br>+15 Fury Caster"},
				{Name:"Ward of Dagoresh",Realm:"Maw of Dagoresh (12,10) Lvl 349",Comment:"+1% Attack<br>+1% Armor<br>+1% Damage<br>+25 Piercing Strike<br>+25 Reinforced Armor<br>+25 Critical Hit<br>+25 Protection"},
				{Name:"Enchanted Cottage",Realm:"Mountain Heights (2,2) Lvl 351",Comment:"+1% Attack<br>+1% Defense<br>+45 Sustain"},
				{Name:"Elithra Crystal Cluster",Realm:"Hidden Valley (East) (14,8) Lvl 367",Comment:"+1% Attack<br>+1% Armor<br>+1% Damage<br>+15 Nullify<br>+35 Banishment<br>+35 Disarm"},
				{Name:"Glowing Lava Crystal",Realm:"Broken Lands (South) (10,3) Lvl 375",Comment:"+1% Defense<br>+1% Armor<br>+35 Sustain<br>+35 Fury Caster"},
				{Name:"Searing Orb",Realm:"Wasteland (South) (13,3) Lvl 381",Comment:"+80 Defense<br>+100 XP Gain<br>+10 Awareness"},
				{Name:"Aspiring Formation",Realm:"Fractured Foundations (4,2) Lvl 393",Comment:"+45 Dodge<br>+45 Disarm<br>+45 Duelist"},
				{Name:"Wretched Abyss",Realm:"Seething Caverns (10,5) Lvl 399",Comment:"+1% Defense<br>+1% Armor<br>+1% HP<br>+45 Greenskin Slayer<br>+45 Beast Slayer"},
				{Name:"Crossroads",Realm:"City of Xinderoth (26,35) Lvl 400",Comment:"+1% Attack<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+25 Protect Gold"},
				{Name:"Tower Orb",Realm:"Citadel of Xinderoth (Floor 13) (15,17) Lvl 413",Comment:"+1% Attack<br>+25 Critical Hit<br>+25 Glory Seeker<br>+25 First Strike"},
				{Name:"The Jolly Rodger",Realm:"Craggy Coastline (Upper) (12,3) Lvl 425",Comment:"+1% Attack<br>+1% Armor<br>+1% Damage<br>+15 Sustain<br>+30 Master Crafter<br>+15 First Strike"},
				{Name:"Emblazoned Warrior",Realm:"Stheno Lake (Edge) (10,2) Lvl 438",Comment:"+1% Damage<br>+10 Piercing Strike<br>+10 Critical Hit<br>+35 First Strike"},
				{Name:"Kreth Crystals",Realm:"Caves of Kreth (Level 8) (15,10) Lvl 448",Comment:"+1% HP<br>+1% Damage"},
				{Name:"Ritualistic Statue",Realm:"Troll Hold (8,1) Lvl 459",Comment:"+1% Attack <br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage"},
				{Name:"Resolute Crystal",Realm:"Thundersnow Valley (East) (13,3) Lvl 462",Comment:"+1% Attack<br>+25 Reinforced Armor<br>+25 Breaker<br>+25 Disarm"},
				{Name:"Statue of Degrot",Realm:"Wastes of Kruz (Plain) (15,2) Lvl 472",Comment:"+1% Defense<br>+1% Damage<br>+10 Reinforced Armor"},
				{Name:"Ral Worldstone",Realm:"Forest of Ral (Depths) (8,8) Lvl 497",Comment:"+1% Attack<br>+1% Armor<br>+1% Damage<br>+12 Piercing Strike<br>+13 Reinforced Armor<br>+15 Critical Hit<br>+10 Fury Caster"},
				{Name:"Holy Crystals",Realm:"Castle Morbidstein (Fortress Upper) (15,9) Lvl 488",Comment:"+1% Attack<br>+1% Damage<br>+30 Holy"},
				{Name:"Castle of the Sorceress",Realm:"Ralthien (District of Magic) (6,2) Lvl 508",Comment:"+1% Attack<br>+1% HP<br>+20 Reinforced Armor<br>+10 Critical Hit<br>+10 Master Blacksmith"},
				{Name:"Circle of Virtue",Realm:"Teotal (Clearing) (16,10) Lvl 513",Comment:"+1% Defence<br>+1% Armor<br>+20 Reinforced Armor<br>+30 Nullify"},
				{Name:"Oak of Ages",Realm:"The Secret Kingdom (Thicket) (16,8) Lvl 523",Comment:"+1% Attack<br>+1% Defense<br>+20 Critical Hit<br>+20 Nullify<br>+10 Disarm"},
				{Name:"Holy Atholhu Pillar",Realm:"Dark Atholhu (Edge) (2,2) Lvl 538",Comment:"+1% Damage<br>+20 Nullify<br>+25 Dodge<br>+20 Master Crafter<br>+15 Master Inventor"},
				{Name:"Temple of Inner Light",Realm:"Yanyi Woods (Inner) (8,9) Lvl 546",Comment:"+1% Attack<br>+1% Damage<br>+30 Critical Hit<br>+10 Master Inventor"},
				{Name:"Greater Statue",Realm:"Gao Tain Lake (View) (15,2) Lvl 554",Comment:"+1% Armor<br>+1% Damage<br>+20 Critical Hit<br>+10 Sustain<br>+20 Glory Seeker"},
				{Name:"Kyoko Relic",Realm:"Kyoko Island (South) Location (7,3) Lvl 564",Comment:"+1% Defense<br>+1% HP<br>+1% Damage<br>+25 Reinforced Armor<br>+15 Protection"},
				{Name:"Spearing Light",Realm:"Floating Islands of Wu Kong (West Island) (15,5) Lvl 578",Comment:"+1% Attack<br>+1% Armor<br>+1% HP<br>+1% Damage"},
				{Name:"Wise Willow",Realm:"Truncal Jungle (South) (9,12) Lvl 583",Comment:"+1% Defense<br>+1% Damage<br>+40 Reinforced Armor"},
				{Name:"Aura Rock",Realm:"Encrow Bay (Inner) (3,4) Lvl 592",Comment:"+1% Defense<br>+1% Damage<br>+20 Piercing Strike<br>+20 Critical Hit<br>+10 Dodge"},
				{Name:"Shrieking Spire",Realm:"Desert of Brigands (North) (13,3) Lvl 608",Comment:"+1% Armor<br>+1% Damage<br>+20 Piercing Strike<br>+20 Critical Hit"},
				{Name:"Giant Necral Skull",Realm:"Necral Fields (South) (3,13) Lvl 619",Comment:"+1% Defense<br>+1% Damage<br>+20 Piercing Strike<br>+10 Dodge<br>+10 Disarm"},
				{Name:"Glacier Relic",Realm:"Zrozon Glacier (Edge) (5,7) Lvl 624",Comment:"+1% Defense"},
				{Name:"Hobba Fort",Realm:"Hobba Marsh (Hobgoblin Ruins) (14,14) Lvl 634",Comment:"+1% Attack<br>+1% Defense"},
				{Name:"Eohlar Relic",Realm:"Eohlar (South) (11,16) Lvl 643",Comment:"+1% Attack<br>+1% Damage"},
				{Name:"Old Ruins",Realm:"The Fire Forest (Valley) (13,16) Lvl 654",Comment:"+1% Attack<br>+1% Armor<br>+1% Damage<br>+10 Piercing Strike<br>+20 Critical Hit<br>+20 Sustain"},
				{Name:"Barbmore Pillars",Realm:"Barbmore (Highland) (3,3) Lvl 663",Comment:"+1% Attack<br>+1% Armor<br>+1% Damage<br>+20 Reinforced Armor<br>+20 Critical Hit<br>+10 Sustain"},
				{Name:"Ravaged Cluster",Realm:"Ravaged Forest (Clearing) (10,2) Lvl 673",Comment:"+1% Attack<br>+1% Damage<br>+40 Piercing Strike<br>+10 Dodge"},
				{Name:"Mittamurk Spires",Realm:"Forsaken Desert (Wastes) (12,10) Lvl 683",Comment:"+1% Attack<br>+1% Armor<br>+20 Breaker<br>+30 Dodge"},
				{Name:"Hyrmit Pillar",Realm:"Hyrmit Swamps (Verge) (7,2) Lvl 694",Comment:"+1% Defense<br>+1% Damage<br>+20 Piercing Strike<br>+30 Critical Strike"},
				{Name:"Ossrilan Circle",Realm:"Ossrilan Labyrinth (Cistern) (8,10) Lvl 707",Comment:"+1% Attack<br>+1% Armor<br>+30 Piercing Strike<br>+30 Nullify"},
				{Name:"Ancient Fort",Realm:"Black Glades (Valley)  (10,8) Lvl 714",Comment:"+1% Defense<br>+1% Damage<br>+25 Reinforced Armor<br>+25 Nullify"},
				{Name:"Crevasse of Souls",Realm:"Gohar Barrens (Ridge) (2,14) Lvl 728",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Sustain<br>+25 Fury Caster<br>+25 Master Inventor"},
				{Name:"Huirvast Ruins",Realm:"Huirvast Jungle (Grove) (15,9) Lvl 733",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Critical Hit<br>+25 Nullify<br>+25 Sustain"},
				{Name:"Guardian Statue",Realm:"Avithral Caves (Entrance) (12,2) Lvl 745",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Reinforced Armor<br>+25 Nullify<br>+25 Sustain"},
				{Name:"Azlatha Artifact",Realm:"Azlatha Kingdom (Thicket) (15,12) Lvl 752",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Piercing Strike<br>+25 Nullify<br>+25 Dodge"},
				{Name:"Pillars of Lindorik",Realm:"Lindorik Kingdom (Edge) (2,2) Lvl 763",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Reinforced Armor<br>+25 Breaker<br>+25 Dodge"},
				{Name:"Statue of Elidoia",Realm:"Muisru Kingdom (North) (12, 2) Lvl 775",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Piercing Strike<br>+25 Nullify<br>+25 Disarm"},
				{Name:"Darghei Statue",Realm:"Darghei Desert (South) (12, 2) Lvl 783",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Reinforced Armor<br>+25 Breaker<br>+25 Dodge<br>+25 Disarm"},
				{Name:"Shimmering Circle",Realm:"The Lost Ascent (Entrance) (13, 2) Lvl 791",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Piercing Strike<br>+25 Nullify<br>+25 Dodge<br>+25 Disarm"},
				{Name:"Statue of Falzwort",Realm:"Falzwort Labyrinth (Halls) (2, 14) Lvl 803",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Reinforced Armor<br>+25 Breaker<br>+25 Dodge<br>+25 Disarm"},
				{Name:"Abroia Fissure",Realm:"Forest of Abroia (Plateau) (9, 11) Lvl 818",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Piercing Strike<br>+25 Critical Hit<br>+25 Breaker<br>+25 Nullify"},
				{Name:"Enchanted Willow",Realm:"Nualgiath Forest (Thicket) (11, 9) Lvl 827",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Reinforced Armor<br>+25 Nullify<br>+25 Dodge<br>+25 Disarm"},
				{Name:"Mystical Cluster",Realm:"Gritloar Burrows (Central Chamber) Lvl 846",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+50 Piercing Strike<br>+25 Breaker<br>+25 Nullify"},
				{Name:"Doujin Haunt",Realm:"Doujin Swamps (Murk) Lvl 853",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Reinforced Armor<br>+25 Nullify<br>+25 Dodge<br>+25 Disarm"},
				{Name:"Outlores Pillar",Realm:"Outlore Flats (Valley) Lvl 866",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+50 Reinforced Armor<br>+25 Breaker<br>+25 Nullify"},
				{Name:"Ever Ice Stones",Realm:"Farmane Shore (Slopes) Lvl 878",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Piercing Strike<br>+25 Critical Hit<br>+25 Dodge<br>+25 Disarm"},
				{Name:"Goitha Vault",Realm:"Town of Goitha (Courtyard) Lvl 834",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Reinforced Armor<br>+25 Breaker<br>+25 Nullify<br>+25 Disarm"},
				{Name:"Ancient Ruins of Zorx",Realm:"Nualgiath Forest (Ridge) Lvl 828",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Piercing Strike<br>+25 Critical Hit<br>+25 Breaker<br>+25 Nullify"},
				{Name:"Enchanted Circle of Pelgarir",Realm:"Pelgarir Valley (Verge) Lvl 874",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Piercing Strike<br>+25 Critical Hit<br>+25 Breaker<br>+25 Nullify"},
				{Name:"Sapher Fissure",Realm:"Sapher Flow (Upper) Lvl 885",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+30 Reinforced Armor<br>+25 Nullify<br>+25 Dodge<br>+25 Disarm"},
				{Name:"Artifact of Dryidu",Realm:"Pits of Dryidu (Spires) Lvl 897",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+25 Piercing Strike<br>+30 Breaker<br>+25 Dodge<br>+25 Disarm"},
				
				{Name:"Menhir of Gore",Realm:"Krudar Crags (West) Lvl 904",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+30 Reinforced Armor<br>+30 Critical Hit<br>+25 Breaker<br>+25 Protection"},
				{Name:"Riangi Cluster",Realm:"Mount Riangi (Flats) Lvl 913",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+10 Piercing Strike<br>+45 Reinforced Armor<br>+10 Piercing Strike<br>+45 Breaker"},
				{Name:"Yozahn Growth",Realm:"Isle of Yozahn (Shores) Lvl 925",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+50 Reinforced Armor<br>+15 Breaker<br>+45 Dodge"},
				{Name:"Barnacle Buckler",Realm:"Dead Dogs Island (Port) Lvl 934",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+40 Piercing Strike<br>+25 Critical Strike<br>+15 Dodge<br>+10 Disarm"},
				{Name:"Sacred Rocks of Zxl",Realm:"Xanlin Plain (Rise) Lvl 948",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+35 Piercing Strike<br>+30 Reinforced Armor<br>+15 Critical Hit<br>+15 Dodge"},
				{Name:"The Blazing Statue",Realm:"Karthak (Mausoleum) Lvl 962",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+15 Reinforced Armor<br>+20 Critical Hit<br>+30 Dodge<br>+30 Disarm"},
				{Name:"Volmar Dark Crystal",Realm:"Unknown (Unknown) Lvl xyz",Comment:"+1% Attack<br>+1% Defense<br>+1% Armor<br>+1% HP<br>+1% Damage<br>+1 Stamina<br>+5 XP Gain<br>+15 Piercing Strike<br>+40 Reinforced Armor<br>+40 Critical Hit"}
			];
		}
		return Data.relicArray;
	},

	buffList: function() {
		if (!Data.buffArray) {
			Data.buffArray = [
				{name: "Rage",               stamina: 10, "duration": 90,   treeId: 0, skillId: 0,  buff: "+0.2% base attack per point.", nicks: "rage"},
				{name: "Stun",               stamina: 15, "duration": 90,   treeId: 0, skillId: 1,  buff: "+0.1% chance per point to half opponents chance to hit.", nicks: "stun,st"},
				{name: "Fury",               stamina: 10, "duration": 90,   treeId: 0, skillId: 2,  buff: "+0.1% base Attack and +0.1% base Damage per point.", nicks: "fury"},
				{name: "Berserk",            stamina: 15, "duration": 90,   treeId: 0, skillId: 3,  buff: "+0.2% base Damage per point.", nicks: "berserk"},
				{name: "Bloodthirst",        stamina: 10, "duration": 45,   treeId: 0, skillId: 4,  buff: "+0.2% chance per point to drain 5% of your opponents current HP per combat turn from your opponent.", nicks: "bloodthirst,bt"},
				{name: "Enchant Weapon",     stamina: 10, "duration": 90,   treeId: 0, skillId: 5,  buff: "+0.1% per point stat bonus increase to your equipped weapon. (Excludes \\'Gain\\' bonuses).", nicks: "enchant weapon,ew"},
				{name: "Holy Flame",         stamina: 15, "duration": 90,   treeId: 0, skillId: 6,  buff: "+0.2% extra damage vs. undead per point.", nicks: "holy flame,hf"},
				{name: "Dark Curse",         stamina: 20, "duration": 60,   treeId: 0, skillId: 7,  buff: "+0.2% reduction of opponents defence per point.", nicks: "dark curse,dc"},
				{name: "Shockwave",          stamina: 20, "duration": 90,   treeId: 0, skillId: 29, buff: "+0.1% per point chance per point that your opponent will forfeit their next combat turn.", nicks: "shockwave,sw,shock"},
				{name: "Ignite",             stamina: 10, "duration": 60,   treeId: 0, skillId: 30, buff: "+0.1% per point chance per point that your opponent will be set on fire. Each successful hit thereafter will inflict between 5% and 10% extra damage.", nicks: "ignite,ign"},
				{name: "Super Elite Slayer", stamina: 25, "duration": 15,   treeId: 0, skillId: 31, buff: "+0.2% per point reduction of damage, attack, defence and armor to super elite creatures.", nicks: "super elite slayer,ses,se slayer"},
				{name: "Wither",             stamina: 15, "duration": 60,   treeId: 0, skillId: 32, buff: "+0.2% per point chance of a 50% reduction of your opponents HP at the start of combat.", nicks: "wither,with"},
				{name: "Shatter Armor",      stamina: 20, "duration": 60,   treeId: 0, skillId: 33, buff: "+0.05% per point chance to reduce opponents armor by 75%.", nicks: "shatter armor,sa"},
				{name: "Deathwish",          stamina: 20, "duration": 45,   treeId: 0, skillId: 34, buff: "+0.03% per point chance to instantly kill vs. creatures. (Excludes Super Elites)", nicks: "deathwish,dw,deathw,death wish"},
				{name: "Spell Breaker",      stamina: 35, "duration": 45,   treeId: 0, skillId: 35, buff: "+0.1% per point chance to remove a random buff from PvP target upon a successful attack.", nicks:"spell breaker,sb"},
				{name: "Keen Edge",          stamina: 10, "duration": 60,   treeId: 0, skillId: 47, buff: "+0.1% per point to your attack for each complete set equipped.", nicks: "keen edge,ke"},
				{name: "Spectral Knight",    stamina: 15, "duration": 45,   treeId: 0, skillId: 48, buff: "+0.1% per point chance to reduce targets armor by 100%. (vs Creature only)", nicks: "spectral knight,sk,spec knight"},
				{name: "Arterial Strike",    stamina: 20, "duration": 60,   treeId: 0, skillId: 49, buff: "Gain additional 0.1% xp per point for every additional round of combat. (Note that this does not activate if conserve activated)", nicks: "arterial strike,as,art strike,art str"},
				{name: "Death Dealer",       stamina: 20, "duration": 60,   treeId: 0, skillId: 50, buff: "For every 5 kills in a row, without dying, you gain +0.01% extra damage per point (Max 20% and vs. creatures only).", nicks: "death dealer,dd"},
				{name: "Savagery",           stamina: 15, "duration": 45,   treeId: 0, skillId: 51, buff: "0.05% chance per point that your defense stat is added to your attack and your armor stat is added to your damage.", nicks: "savagery,savage"},
				{name: "Chi Strike",         stamina: 20, "duration": 90,   treeId: 0, skillId: 52, buff: "0.1% per point of your Health total is added to your damage", nicks:"chi strike,chi,chis,chi str"},
				{name: "Shield Strike",      stamina: 20, "duration": 45,   treeId: 0, skillId: 53, buff: "0.1% per point chance that your defense stat is reduced to zero and your damage is doubled.", nicks: "shield strike,ss,sh str"},
				{name: "Demoralize",         stamina: 25, "duration": 30,   treeId: 0, skillId: 73, buff: "+0.25% per point chance to half the opponents enchancement levels for the battle. Note this skill only takes effect if you initiated the combat.", nicks: "demoralize,dem"},
				{name: "Poison",             stamina: 25, "duration": 60,   treeId: 0, skillId: 70, buff: "+0.1% per point chance that your opponent will be poisoned. Each successful hit thereafter will inflict between 10% and 20% extra damage.", nicks: "poison,poi"},
				{name: "Iron Fist",          stamina: 25, "duration": 60,   treeId: 0, skillId: 74, buff: "+0.1% per point stat bonus increase to your equipped gloves. (Excludes \\'Gain\\' bonuses).", nicks: "iron fist,if"},
				{name: "Spell Leech",        stamina: 50, "duration": 60,   treeId: 0, skillId: 79, buff: "+0.1% per point chance when you defeat an opponent in PvP that you initiated, you will steal a random buff. Note the remaining duration of the buff is reduced by 50% and will not take effect until the next combat. Note also if you already have the buff active, it will replace the existing buff you have active.", nicks: "spell leech,sl"},
				{name: "Distraction",        stamina: 25, "duration": 60,   treeId: 0, skillId: 78, buff: "+0.2% per point chance to obtain no gold from a successful combat. +0.05% per point chance to inflict double damage in each round of combat. Note this skill has no effect in PvP.", nicks: "distraction,dis"},
				{name: "Fortify",            stamina: 10, "duration": 120,  treeId: 1, skillId: 8,  buff: "+0.1% base Armor per point.", nicks: "fortify"},
				{name: "Enchanted Armor",    stamina: 10, "duration": 90,   treeId: 1, skillId: 9,  buff: "+0.1% per point stat bonus increase to your equipped armor. (Excludes \\'Gain\\' bonuses).", nicks: "enchanted armor,enchant armor,ea,ench arm,ench armor"},
				{name: "Evade",              stamina: 10, "duration": 90,   treeId: 1, skillId: 10, buff: "+0.1% base Defence per point.", nicks: "evade"},
				{name: "Rock Skin",          stamina: 15, "duration": 90,   treeId: 1, skillId: 11, buff: "+0.1% base Defence and +0.1 base Armor per point.", nicks: "rock skin,rs"},
				{name: "Great Vigor",        stamina: 10, "duration": 90,   treeId: 1, skillId: 12, buff: "+0.2% base HP per point.", nicks: "great vigor,vigor,gv"},
				{name: "Absorb",             stamina: 20, "duration": 120,  treeId: 1, skillId: 13, buff: "+0.1% chance per point that you will absorb 25% of the damage inflicted on you.", nicks: "absorb,abs"},
				{name: "Deflect",            stamina: 25, "duration": 300,  treeId: 1, skillId: 14, buff: "+0.25% chance per point that a player attacking you will automatically fail before combat starts.", nicks: "deflect,defl"},
				{name: "Aura of Protection", stamina: 20, "duration": 90,   treeId: 1, skillId: 15, buff: "+0.1% base Defence, +0.1% base Armor and +0.1% base HP per point.", nicks: "aura of protection,aop,aofp"},
				{name: "Force Shield",       stamina: 10, "duration": 60,   treeId: 1, skillId: 27, buff: "+0.1% per point chance to reduce damage done to you to 1.", nicks: "force shield,fs"},
				{name: "Unbreakable",        stamina: 20, "duration": 90,   treeId: 1, skillId: 28, buff: "+0.5% per point chance per point of equipment not taking durability loss during combat.", nicks: "unbreakable,ub,unb,unbr"},
				{name: "Assist",             stamina: 30, "duration": 120,  treeId: 1, skillId: 36, buff: "+0.05% per point chance of one of your allies assisting in combat vs. creatures. (Ally is randomly selected and adds 50% of their attack, defense, damage, armor and hp - note this also excludes allies whom are more than 25 levels above you.).", nicks: "assist,ass"},
				{name: "Constitution",       stamina: 25, "duration": 30,   treeId: 1, skillId: 37, buff: "+0.1% per point increase to your defense.", nicks: "constitution,const"},
				{name: "Counter Attack",     stamina: 20, "duration": 60,   treeId: 1, skillId: 54, buff: "Uses 0.25% extra stamina (per point) to add 0.25% to both attack and damage. (Both values are rounded up, vs. creature only)", nicks: "counter attack,ca"},
				{name: "Summon Shield Imp",  stamina: 50, "duration": 60,   treeId: 1, skillId: 55, buff: "Creates an Imp which can absorb 100% of damage. Each full absorb uses one of the Shield Imp\\'s hit points. The Shield Imp starts with 3 hit points and gains one for each 50 points placed in this skill. The Shield Imp auto-debuffs when it reaches zero hit points. (Note Super-Elites can crush the imp in a single turn regardless of hit points remaining and it only works in PvE.", nicks: "summon shield imp,ssi,imp"},
				{name: "Vision",             stamina: 20, "duration": 90,   treeId: 1, skillId: 56, buff: "Lights up dark realms. More skill points allow more vision on the \\'Map\\' screen. (Vision radius increases every 50 levels).", nicks: "vision,vis"},
				{name: "Fortitude",          stamina: 15, "duration": 90,   treeId: 1, skillId: 57, buff: "Defense stat is added to HP. (0.1% per point).", nicks: "fortitude,fort"},
				{name: "Flinch",             stamina: 20, "duration": 60,   treeId: 1, skillId: 58, buff: "0.1% per point decrease in enemies Attack stat", nicks: "flinch"},
				{name: "Terrorize",          stamina: 20, "duration": 60,   treeId: 1, skillId: 59, buff: "0.1% per point decrease in enemies Damage stat.", nicks: "terrorize,terror"},
				{name: "Nightmare Visage",   stamina: 40, "duration": 1000, treeId: 1, skillId: 60, buff: "0.25% per point of your Attack will be transferred into Defense. (Great for offline protection!)", nicks: "nightmare visage,nv,visage"},
				{name: "Honor",              stamina: 10, "duration": 180,  treeId: 1, skillId: 82, buff: "+0.2% per point decrease to the PvP Rating points transferred upon defeat.", nicks: "honor"},
				{name: "Sanctuary",          stamina: 25, "duration": 30,   treeId: 1, skillId: 44, buff: "+0.1% per point increase to your armor", nicks: "sanctuary,sanc"},
				{name: "Dull Edge",          stamina: 10, "duration": 60,   treeId: 1, skillId: 46, buff: "+0.4% per point reduction to creatures \\'Piercing Strike\\' enhancement.", nicks: "dull edge,de"},
				{name: "Erosion",            stamina: 25, "duration": 180,  treeId: 1, skillId: 80, buff: "+0.1% per point chance to reduce an attackers item durability to 1 if durability damage is inflicted. Note this skill only works in PvP and if you are defending.", nicks: "erosion,ero"},
				{name: "Avert Gaze",         stamina: 10, "duration": 180,  treeId: 1, skillId: 71, buff: "+0.5% per point chance of not being affected by Hypnotize.", nicks: "avert gaze,ag"},
				{name: "Enchant Shield",     stamina: 25, "duration": 60,   treeId: 1, skillId: 77, buff: "+0.1% per point stat bonus increase to your equipped shield. (Excludes \\'Gain\\' bonuses).", nicks: "enchant shield,es"},
				{name: "Find Item",          stamina: 10, "duration": 60,   treeId: 2, skillId: 16, buff: "+0.1% per point increase of creatures current drop rate.", nicks: "find item,fi"},
				{name: "Treasure Hunter",    stamina: 15, "duration": 120,  treeId: 2, skillId: 17, buff: "+0.2% per point additional gold from creatures.", nicks: "treasure hunter,th,treas hunter"},
				{name: "Defiance",           stamina: 15, "duration": 120,  treeId: 2, skillId: 18, buff: "+0.25% per point reduction in xp lost when defeated in combat vs creatures.", nicks: "defiance"},
				{name: "Adept Learner",      stamina: 10, "duration": 90,   treeId: 2, skillId: 19, buff: "+0.2% per point increase in xp from creature kills.", nicks: "adept learner,al"},
				{name: "Librarian",          stamina: 10, "duration": 60,   treeId: 2, skillId: 20, buff: "+0.1% per point chance to gain double xp from creatures.", nicks: "librarian,lib,libr"},
				{name: "Merchant",           stamina: 10, "duration": 60,   treeId: 2, skillId: 21, buff: "+0.05% per point chance to gain double gold from creatures.", nicks: "merchant,merch,merc"},
				{name: "Deep Pockets",       stamina: 10, "duration": 90,   treeId: 2, skillId: 22, buff: "+0.25% per point reduction in gold lost on failed combat vs creatures.", nicks: "deep pockets,dp"},
				{name: "Last Ditch",         stamina: 15, "duration": 120,  treeId: 2, skillId: 23, buff: "+0.2% per point chance to survive death in combat (once per combat).", nicks: "last ditch,ld"},
				{name: "Animal Magnetism",   stamina: 10, "duration": 60,   treeId: 2, skillId: 24, buff: "+0.2% per point chance to make certain creatures respawn at your location.", nicks: "animal magnetism,animag,ani mag,am"},
				{name: "Empower",            stamina: 20, "duration": 60,   treeId: 2, skillId: 25, buff: "+0.1% per point increase to all currently active enhancements.", nicks: "empower,emp"},
				{name: "Doubler",            stamina: 5,  "duration": 120,  treeId: 2, skillId: 26, buff: "At skill level 50+, 2x Stamina usage in combat in return for 2x gold/xp. At level 100+ 3x, and at level 150+ 4x. Note that stamina and xp loss are normal (not multiplied) if you lose a battle.", nicks: "doubler,doub,db"},
				{name: "Conserve",           stamina: 10, "duration": 45,   treeId: 2, skillId: 39, buff: "+0.05% per point chance that combat (vs. players and vs. creatures) will use no stamina. (Excludes group/relic combat)", nicks: "conserve,cons,consv,con"},
				{name: "Brewing Master",     stamina: 10, "duration": 30,   treeId: 2, skillId: 40, buff: "+0.5% per point to the duration of potions when consumed while active.", nicks: "brewing master,bm,brm,brewm"},
				{name: "Four Leaf",          stamina: 20, "duration": 60,   treeId: 2, skillId: 41, buff: "+0.1% per point chance that craftable items are discovered already \\'Perfect\\'.", nicks: "four leaf,4l,fl"},
				{name: "Extend",             stamina: 30, "duration": 30,   treeId: 2, skillId: 42, buff: "+0.25% per point increase to skills durations that are cast while this skill is active.", nicks: "extend,ext"},
				{name: "Quest Finder",       stamina: 5,  "duration": 90,   treeId: 2, skillId: 61, buff: "Increases the chance a quest item will drop. (If you fail to obtain an item, an extra roll is given for Quest Finder at a fixed percentage based on the points allocated to the skill. If this second roll is successful, you will obtain one of the available quest items drops (if any)).", nicks: "quest finder,qf"},
				{name: "Inventor",           stamina: 15, "duration": 60,   treeId: 2, skillId: 62, buff: "Increases chance of success when attempting to Invent items/potions. (A fixed +0.05% chance per point extra chance of success)", nicks: "inventor,inv,invI,inv1,inventor1,inventor 1,inventor i,inv i,inv 1"},
				{name: "Extractor",          stamina: 15, "duration": 60,   treeId: 2, skillId: 63, buff: "Increases chance of success when attempting to extract Components from Resources. (A fixed +0.05% chance per point extra chance of success).", nicks: "extractor,extr"},
				{name: "Inventor II",        stamina: 20, "duration": 60,   treeId: 2, skillId: 64, buff: "Chance not to consume (or consume less) components when inventing items.", nicks: "inventor ii,inventorii,invii,inv2,inventor 2,inv ii,inv 2"},
				{name: "Buff Master",        stamina: 10, "duration": 60,   treeId: 2, skillId: 65, buff: "0.2% per point chance to half the stamina cost (rounding up) when casting skills on other players. (Does not work on self!)", nicks: "buff master,buffm,bum"},
				{name: "Reflection",         stamina: 10, "duration": 90,   treeId: 2, skillId: 66, buff: "0.1% per point of enemies damage inflicted is added to your next combat strike.", nicks: "reflection,ref,refl,reflect"},
				{name: "Light Foot",         stamina: 15, "duration": 120,  treeId: 2, skillId: 67, buff: "0.05% chance to use no stamina while moving on the world map.", nicks: "light foot,lf"},
				{name: "Mesmerize",          stamina: 20, "duration": 60,   treeId: 2, skillId: 68, buff: "0.1% per point chance to reduce a creatures armor and defense by 50% (vs. creature only).", nicks: "mesmerize,mesmer,mes,mez"},
				{name: "Resource Finder",    stamina: 25, "duration": 90,   treeId: 2, skillId: 76, buff: "Increases the chance a resource item will drop. (If you fail to obtain an item, an extra roll is given for Resource Finder at a fixed percentage based on the points allocated to the skill. If this second roll is successful, you will obtain one of the available resource items drops (if any)). Note if you have Quest Finder active as well, this roll takes place after Quest Finder and only if Quest Finder fails to obtain an item.", nicks: "resource finder,rf"},
				{name: "Gloat",              stamina: 25, "duration": 60,   treeId: 2, skillId: 81, buff: "+0.5% per point increase to the PvP Rating points transferred upon victory. Note if you lose to a player who has the Honor skill active, you will lose and additional 50% PvP Rating.", nicks: "gloat"},
				{name: "Sacrifice",          stamina: 25, "duration": 90,   treeId: 2, skillId: 75, buff: "+0.04% per point additional xp and -0.25% per point less gold for defeating creatures in combat.", nicks: "sacrifice,sac"},
				{name: "Reckoning",          stamina: 25, "duration": 60,   treeId: 2, skillId: 72, buff: "+0.2% per point chance of doubling a random skill level for the battle if you initiate the combat (Note that this skill does not work with Doubler, Summon Shield Imp or Counter Attack.).", nicks: "reckoning,rec,rek"}
			];
		}
		return Data.buffArray;
	},

	quickSearchList: function() {
		if (!Data.quickSearchArray) {
			Data.quickSearchArray = [
				{"category":"Potions","searchname":"Potion of the Wise",             "nickname":"Lib 200", "displayOnAH":true},
				{"category":"Potions","searchname":"Potion of the Bookworm",         "nickname":"Lib 225", "displayOnAH":true},
				{"category":"Potions","searchname":"Potion of Shattering",           "nickname":"SA",      "displayOnAH":true},
				{"category":"Potions","searchname":"Dragons Blood Potion",           "nickname":"ZK 200",  "displayOnAH":true},
				{"category":"Potions","searchname":"Berserkers Potion",              "nickname":"ZK 300",  "displayOnAH":true},
				{"category":"Potions","searchname":"Potion of Fury",                 "nickname":"ZK 350",  "displayOnAH":true},
				{"category":"Potions","searchname":"Sludge Brew",                    "nickname":"DC 200",  "displayOnAH":true},
				{"category":"Potions","searchname":"Potion of Black Death",          "nickname":"DC 225",  "displayOnAH":true},
				{"category":"Potions","searchname":"Potion of Aid",                  "nickname":"Assist",  "displayOnAH":true},
				{"category":"Potions","searchname":"Potion of Supreme Doubling",     "nickname":"DB 450",  "displayOnAH":true},
				{"category":"Potions","searchname":"Potion of Acceleration",         "nickname":"DB 500",  "displayOnAH":true},
				{"category":"Potions","searchname":"Potion of Lesser Death Dealer",  "nickname":"DD",      "displayOnAH":true},
				{"category":"Potions","searchname":"Runic Potion",                   "nickname":"FI 250",  "displayOnAH":true},
				{"category":"Potions","searchname":"Potion of Supreme Luck",         "nickname":"FI 1k",   "displayOnAH":true},
				{"category":"Potions","searchname":"Potion of Truth",                "nickname":"EW 1k",   "displayOnAH":true},
				{"category":"Potions","searchname":"Dull Edge",                      "nickname":"DE 25",   "displayOnAH":true},
				{"category":"Potions","searchname":"Notched Blade",                  "nickname":"DE 80",   "displayOnAH":true},
				{"category":"Potions","searchname":"Potion of Death",                "nickname":"DW 125",  "displayOnAH":true},
				{"category":"Potions","searchname":"Potion of Decay",                "nickname":"WI 150",  "displayOnAH":true},
				{"category":"Potions","searchname":"Potion of Fatality",             "nickname":"WI 350",  "displayOnAH":true},
				{"category":"Potions","searchname":"Potion of Annihilation",         "nickname":"DW 150",  "displayOnAH":true},
				{"category":"Plants", "searchname":"Blood Bloom",                    "nickname":""},
				{"category":"Plants", "searchname":"Jademare",         	             "nickname":""},
				{"category":"Plants", "searchname":"Dark Shade",                     "nickname":""},
				{"category":"Plants", "searchname":"Trinettle",                      "nickname":""},
				{"category":"Plants", "searchname":"Heffle Wart",                    "nickname":""},
				{"category":"Plants", "searchname":"Amber",                          "nickname":""}
			];
		}
		return Data.quickSearchArray;
	}
};
