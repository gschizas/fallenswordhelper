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
				{'questName':'Facility Assault', 'level':5, 'location':'Transfer Pod'},
				{'questName':'Delivery Note', 'level':8, 'location':'Cloning Facility (Loading Bay)'},
				{'questName':'Resource Stripping', 'level':7, 'location':'Cloning Facility (East Wing)'},
				{'questName':'Call to Arms', 'level':10, 'location':'Desert Path (Straights)'},
				{'questName':'New Blood', 'level':10, 'location':'Desert Path (Straights)'},
				{'questName':'Poison Desire', 'level':12, 'location':'Desert Path (Steps)'},
				{'questName':'Droid Delivery', 'level':15, 'location':'Highridge (Descent)'},
				{'questName':'Way of the Old', 'level':16, 'location':'Phantom Lake (Shore)'},
				{'questName':'Tribal Assault', 'level':16, 'location':'Taulin City'},
				{'questName':'Stolen Labour', 'level':19, 'location':'Taulin Outskirts (Edge)'},
				{'questName':'Assimilation', 'level':20, 'location':'Taulin Outskirts (Dunes)'},
				{'questName':'Settlement Defense', 'level':22, 'location':'Taulin Gamma Wastes (Straights)'},
				{'questName':'Down Lines', 'level':25, 'location':'Taulin Gamma Wastes (Plateau)'},
				{'questName':'Revenge of the G27\'s', 'level':26, 'location':'Taulin Gamma Wastes (Towers)'},
				{'questName':'Desiccator Prototype', 'level':28, 'location':'Taulin Gamma Wastes (Sands)'},
				{'questName':'Money from the Mines', 'level':29, 'location':'Higridge Mines (Mouth)'},
				{'questName':'Hiding from the Hand', 'level':34, 'location':'Highridge Mines (Rock Layer)'},
				{'questName':'Miner Dissent', 'level':36, 'location':'Highridge Mines (Volcanic Deposits)'},
				{'questName':'Threat from the Shadows', 'level':38, 'location':'Highridge Mines (Sprawl)'},
				{'questName':'Toxic Rupture', 'level':39, 'location':'Highridge Mines (Dark Excavations)'},
				{'questName':'Berserker Bots!', 'level':40, 'location':'Highridge Mines (Unstable Layer)'},
				{'questName':'Escaping the Mines', 'level':40, 'location':'Mining Facility'},
				{'questName':'Young Warrior', 'level':41, 'location':'Highridge Crag (Deserted Camp)'},
				{'questName':'Snatched Notes', 'level':43, 'location':'Highridge Crag (Upper Slopes)'},
				{'questName':'Bomb Disposal', 'level':45, 'location':'Highridge Crag (Yarn Domain)'},
				{'questName':'Revenge', 'level':45, 'location':'Highridge Crag (Vale)'},
				{'questName':'The Antidote', 'level':45, 'location':'Highridge Crag (Yarn Retreat)'},
				{'questName':'Wild Tales', 'level':45, 'location':'Highridge Crag (Shard Gate)'},
				{'questName':'Elders Request', 'level':51, 'location':'Amethyst Peak (Base)'},
				{'questName':'Crystalline Pollution', 'level':54, 'location':'Amethyst Peak (Lower Slope)'},
				{'questName':'Seek and Retrieve', 'level':56, 'location':'Amethyst Peak (Upper Slope)'},
				{'questName':'Crystal Gathers', 'level':58, 'location':'Amethyst Peak (Climb)'},
				{'questName':'Stemming the Tide', 'level':60, 'location':'Amethyst Peak (View)'},
				{'questName':'Power Hunger', 'level':60, 'location':'Amethyst Peak (Pinnacle)'},
				{'questName':'Heartless Crystal', 'level':61, 'location':'Raga Domain (West Quadrant)'},
				{'questName':'Silent Guns', 'level':63, 'location':'Raga Domain (North Quadrant)'},
				{'questName':'Out Flanked', 'level':65, 'location':'Raga Domain (East Quadrant)'},
				{'questName':'Heart of Rad', 'level':67, 'location':'Raga Hills (Edge)'},
				{'questName':'Rebellious Son', 'level':70, 'location':'Raga Hills (Depths)'},
				{'questName':'Infestation', 'level':71, 'location':'Raga Hills (Secret Way)'},
				{'questName':'Spontaneous Phenomena', 'level':73, 'location':'Scrap Yard (Iron Dump)'},
				{'questName':'Flooded', 'level':74, 'location':'Scrap Yard (Steel Dump)'},
				{'questName':'ID Required', 'level':76, 'location':'SureTec (Reception)'},
				{'questName':'Line Key', 'level':78, 'location':'SureTec (Pistol Lab)'},
				{'questName':'Virus Killer', 'level':80, 'location':'SureTec (Testing)'},
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
				{'questName':'A Shadow Burned', 'level':100, 'location':'Obsidian Tower (Apex)'}
			];
			Data.questArray = questArray.sort();
		}
		return Data.questArray;
	},

	plantFromComponent: function(aComponent) {
		switch(aComponent) {
			case "Amber Essense": return "Amber Plant"; break;
			case "Blood Bloom Flower": return "Blood Bloom Plant"; break;
			case "Dark Shade ": return "Dark Shade Plant"; break;
			case "Snake Eye": return "Elya Snake Head"; break;
			case "Snake Venom Fang": return "Elya Snake Head"; break;
			case "Heffle Wart": return "Heffle Wart Plant"; break;
			case "Jademare Blossom": return "Jademare Plant"; break;
			case "Trinettle Leaf": return "Trinettle Plant"; break;
			case "Purplet Flower": return "Purplet Plant"; break;
			default: return aComponent;
		}
	},

	potionList: function() {
		if (!Data.potionArray) {
			Data.potionArray=[
					{"searchname":"Potion of the Wise",         "shortname":"Lib 200",   "buff":"Librarian",      "level":200,  "duration":120, "minlevel":5, "bound":true},
					{"searchname":"Potion of the Bookworm",     "shortname":"Lib 225",   "buff":"Librarian",      "level":225,  "duration":90,  "minlevel":5},
					{"searchname":"Potion of Shattering",       "shortname":"SA",        "buff":"Shatter Armor",  "level":150,  "duration":20,  "minlevel":5, "bound":true},
					{"searchname":"Dragons Blood Potion",       "shortname":"ZK 200",    "buff":"Berzerk",        "level":200,  "duration":30,  "minlevel":5, "bound":true},
					{"searchname":"Berserkers Potion",          "shortname":"ZK 300",    "buff":"Berserk",        "level":300,  "duration":45,  "minlevel":5, "bound":true},
					{"searchname":"Potion of Fury",             "shortname":"ZK 350",    "buff":"Berserk",        "level":350,  "duration":60,  "minlevel":5},
					{"searchname":"Sludge Brew",                "shortname":"DC 200",    "buff":"Dark Curse",     "level":200,  "duration":45,  "minlevel":5, "bound":true},
					{"searchname":"Potion of Black Death",      "shortname":"DC 225",    "buff":"Dark Curse",     "level":225,  "duration":60,  "minlevel":5},
					{"searchname":"Potion of Aid",              "shortname":"Assist",    "buff":"Assist",         "level":150,  "duration":30,  "minlevel":5, "bound":true},
					{"searchname":"Potion of Supreme Doubling", "shortname":"DB 450",    "buff":"Doubler",        "level":450,  "duration":00,  "minlevel":5, "bound":true},
					{"searchname":"Potion of Acceleration",     "shortname":"DB 500",    "buff":"Doubler",        "level":500,  "duration":120, "minlevel":5},
					{"searchname":"Potion of Lesser Death Dealer",  "shortname":"DD",    "buff":"Death Dealer",   "level":25,   "duration":45,  "minlevel":20},
					{"searchname":"Runic Potion",               "shortname":"FI 250",    "buff":"Find Item",      "level":250,  "duration":60,  "minlevel":5, "bound":true},
					{"searchname":"Potion of Supreme Luck",     "shortname":"FI 1k",     "buff":"Find Item",      "level":1000, "duration":60,  "minlevel":5, "bound":true},
					{"searchname":"Potion of Truth",            "shortname":"EW 1k",     "buff":"Enchant Weapon", "level":1000, "duration":90,  "minlevel":5, "bound":true},
					{"searchname":"Dull Edge",                  "shortname":"DE 25",     "buff":"Dull Edge",      "level":25,   "duration":60,  "minlevel":1},
					{"searchname":"Notched Blade",              "shortname":"DE 80",     "buff":"Dull Edge",      "level":80,   "duration":45,  "minlevel":10, "bound":true},
					{"searchname":"Potion of Death",            "shortname":"DW 125",    "buff":"Death Wish",     "level":125,  "duration":15,  "minlevel":5, "bound":true},
					{"searchname":"Potion of Decay",            "shortname":"WI 150",    "buff":"Wither",         "level":150,  "duration":15,  "minlevel":5, "bound":true},
					{"searchname":"Potion of Fatality",         "shortname":"WI 350",    "buff":"Wither",         "level":350,  "duration":90,  "minlevel":10, "bound":true},
					{"searchname":"Potion of Annihilation",     "shortname":"DW 150",    "buff":"Death Wish",     "level":150,  "duration":30,  "minlevel":5}
				];
		}
		return Data.potionArray;
	},

	creatureList: function() {

	},

	buffList: function() {
	}
}