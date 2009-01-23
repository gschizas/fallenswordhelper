var Data = {

	questMatrix: function() {
		if (!Data.questArray) {
			var questArray = [
				{'questName':'A Bitter Deal',              'level':461, 'location':'Thundersnow Valley (North)'},
				{'questName':'A Fae Scorned',              'level':525, 'location':'The Secret Kingdom (Grove)'},
				{'questName':'A Friendly Bet',             'level':420, 'location':'Citadel of Xinderoth (Floor 20)'},
				{'questName':'A Potent Brew',              'level':510, 'location':'Ralthien (Southern Quarter)'},
				{'questName':'A Slimy Job',                'level':405, 'location':'Citadel of Xinderoth (Floor 5)'},
				{'questName':'A Sorry Tale',               'level':420, 'location':'Chamber of Xinderoth (Floor 20)'},
				{'questName':'Ale for All!',               'level':164, 'location':'Emerye (West)'},
				{'questName':'Allied Supplies',            'level':48,  'location':'Utapo Flats North'},
				{'questName':'Amazon Ambush',              'level':40,  'location':'Amazon Encampment'},
				{'questName':'Angry Natives',              'level':1,   'location':'Mountain Path'},
				{'questName':'Angry Skies',                'level':423, 'location':'Empty Plains (East)'},
				{'questName':'Ankura Statue',              'level':232, 'location':'Ankura (East)'},
				{'questName':'Anvil Reign',                'level':15,  'location':'The Mists North'},
				{'questName':'Ashes to Ashes',             'level':160, 'location':'Dokar (West)'},
				{'questName':'Balloon Trouble',            'level':174, 'location':'Gumbrel (North)'},
				{'questName':'Base Attitude',              'level':411, 'location':'Citadel of Xinderoth (Floor 11)'},
				{'questName':'Bat Herder',                 'level':354, 'location':'Morukan'},
				{'questName':'Battle at Frozelore',        'level':79,  'location':'Frozen Lakes South'},
				{'questName':'Behind Enemy Lines',         'level':12,  'location':'Nomad Stronghold'},
				{'questName':'Benthius Captive',           'level':274, 'location':'Ofron Islands (West)'},
				{'questName':'Bite the Hand',              'level':400, 'location':'City of Xinderoth'},
				{'questName':'Blacksmith Upgrades I',      'level':119, 'location':'Gadrel Swamps (West)'},
				{'questName':'Blazen Hallows',             'level':48,  'location':'Moot Cave'},
				{'questName':'Blazing Insanity',           'level':560, 'location':'Fire Temple (Pavilion)'},
				{'questName':'Blessed Offering',           'level':554, 'location':'Gao Tain Lake (View)'},
				{'questName':'Blessing of Scale',          'level':543, 'location':'Hai Jing Mountains (Ridge)'},
				{'questName':'Blood Attack',               'level':142, 'location':'Metlair (South)'},
				{'questName':'Boar Blackmail',             'level':206, 'location':'Maedos (North)'},
				{'questName':'Bones Bones Bones!',         'level':319, 'location':'Aquia (North)'},
				{'questName':'Breaking the Shackles',      'level':440, 'location':'Stheno Lake (Inner)'},
				{'questName':'Bringing the Light',         'level':463, 'location':'Thundersnow Valley (South)'},
				{'questName':'Building Bridges',           'level':20,  'location':'Paladir Forest East'},
				{'questName':'Bulltoise Infection',        'level':70,  'location':'Motaur Forests North'},
				{'questName':'Burning Fever',              'level':371, 'location':'Canyon Mouth'},
				{'questName':'Call of Dregdon',            'level':70,  'location':'Endlore Valley South'},
				{'questName':'Call of Fortitude',          'level':40,  'location':'Celestial Forest (North)'},
				{'questName':'Cerenian Encroachment',      'level':313, 'location':'Cereas (East)'},
				{'questName':'Chasing Shadows',            'level':152, 'location':'Ekloren (South)'},
				{'questName':'Chelonian Treasure',         'level':539, 'location':'Cursed Isle of Darkwater (Bleak Moor)'},
				{'questName':'Chiefs Wishes',              'level':571, 'location':'Dragon Tooth Mountain (Base)'},
				{'questName':'Chitinous Swarm',            'level':272, 'location':'Ofron Islands (South)'},
				{'questName':'Clash of Magics',            'level':495, 'location':'Ral Faun Camp'},
				{'questName':'Cleanse the Caves',          'level':25,  'location':'Ramdal Caves (Level 1)'},
				{'questName':'Clear the Way',              'level':385, 'location':'Clan Gate'},
				{'questName':'Clutching Darkness',         'level':523, 'location':'The Secret Kingdom (Thicket)'},
				{'questName':'Collar Retrieval',           'level':457, 'location':'Dark Mist Forest (Depths)'},
				{'questName':'Colossus Revenge',           'level':230, 'location':'Falagi (West)'},
				{'questName':'Constant Attack',            'level':471, 'location':'Wastes of Kruz (Mountains)'},
				{'questName':'Crab Hole',                  'level':216, 'location':'Yuzha (North)'},
				{'questName':'Crafted to Order',           'level':557, 'location':'Catacombs of Quan (Gallery)'},
				{'questName':'Creeping Death',             'level':443, 'location':'Caves of Kreth (Level 3)'},
				{'questName':'Creeping Stone',             'level':438, 'location':'Stheno Lake (Edge)'},
				{'questName':'Crown of Purity',            'level':519, 'location':'Teotal (Tangle)'},
				{'questName':'Cry of the Land',            'level':383, 'location':'Wasteland (East)'},
				{'questName':'Crypt of Valsar',            'level':12,  'location':'Krul Beach Forest East'},
				{'questName':'Crystal Ambush',             'level':225, 'location':'Kozyu (South)'},
				{'questName':'Crystal Harvest',            'level':352, 'location':'Morukan'},
				{'questName':'Cutting the Line',           'level':413, 'location':'Citadel of Xinderoth (Floor 13)'},
				{'questName':'Dark Seekers',               'level':551, 'location':'Gao Tain Lake (Avenue)'},
				{'questName':'Darmov\'s Fall',             'level':5,   'location':'Krul Beach Forest West'},
				{'questName':'Death Pact',                 'level':226, 'location':'Falagi (North)'},
				{'questName':'Defiler',                    'level':402, 'location':'Citadel of Xinderoth (Floor 2)'},
				{'questName':'Demonic Spys',               'level':277, 'location':'Surfron (East)'},
				{'questName':'Denounce the Old Ones',      'level':511, 'location':'Teotal (Border)'},
				{'questName':'Dipsoshell Merchant',        'level':291, 'location':'Theotis (North)'},
				{'questName':'Divine Vengeance',           'level':3,   'location':'Fire Chasm (Level 2)'},
				{'questName':'Dream Elnorphant',           'level':173, 'location':'Pelrei (East)'},
				{'questName':'Dreg March',                 'level':15,  'location':'Dreg Swamp'},
				{'questName':'Driving Force',              'level':417, 'location':'Citadel of Xinderoth (Floor 17)'},
				{'questName':'Drunkards Rambling',         'level':55,  'location':'Slayers Forest North'},
				{'questName':'Dwarf Ice',                  'level':204, 'location':'Daradom (Caves)'},
				{'questName':'Easy Pickings',              'level':340, 'location':'Luivak (South)'},
				{'questName':'Eel Feast',                  'level':537, 'location':'Cursed Isle of Darkwater (Murk)'},
				{'questName':'Egg Collector',              'level':335, 'location':'Erodum (North)'},
				{'questName':'Either Death or Glory',      'level':517, 'location':'Teotal (Wild)'},
				{'questName':'Eldoras Path',               'level':48,  'location':'Altar Forest North'},
				{'questName':'Elf Boat Disaster',          'level':309, 'location':'Hyghe (North)'},
				{'questName':'Eliminate the Competition',  'level':343, 'location':'Korundor (East)'},
				{'questName':'Enraged',                    'level':507, 'location':'Ralthien (Garrison)'},
				{'questName':'Entombed Jailer',            'level':394, 'location':'Dar GromSol Dungeon'},
				{'questName':'Essence Harvest',            'level':535, 'location':'Shroud Rim (Hunger Fields)'},
				{'questName':'Eternal Chant',              'level':5,   'location':'Varas Dungeon'},
				{'questName':'Evil Hunt',                  'level':345, 'location':'Dark Vale (North)'},
				{'questName':'Exiled Warriors',            'level':355, 'location':'Glitter Mine Depths'},
				{'questName':'Extinguish the Lights',      'level':283, 'location':'The Bitter Marsh (East)'},
				{'questName':'Eye of the Crocodile',       'level':287, 'location':'Ephal Swamp (East)'},
				{'questName':'Failed Task',                'level':4,   'location':'Elven Halls'},
				{'questName':'Familiar Creation',          'level':539, 'location':'Dark Atholhu (Outer)'},
				{'questName':'Fate of the Father',         'level':434, 'location':'Gorgon Isle (South)'},
				{'questName':'Fated Abandonment',          'level':46,  'location':'Moot Forest South'},
				{'questName':'Feline Feud',                'level':379, 'location':'Forgotten Plateau (Outer)'},
				{'questName':'Festival Revelers',          'level':400, 'location':'Xinderoth Hall'},
				{'questName':'Field Test',                 'level':487, 'location':'Castle Morbidstein (East Tower Upper)'},
				{'questName':'Filthy Animals',             'level':400, 'location':'City of Xinderoth'},
				{'questName':'Final Exam',                 'level':407, 'location':'Citadel of Xinderoth (Floor 7)'},
				{'questName':'Fire Glory',                 'level':157, 'location':'Dokar (North)'},
				{'questName':'Fit for a Queen',            'level':425, 'location':'Craggy Coastline (Upper)'},
				{'questName':'For the Good of the Temple', 'level':570, 'location':'Claw Temple (Gate)'},
				{'questName':'Forest of Herbs',            'level':65,  'location':'Orcan Forest North'},
				{'questName':'Forged Blade',               'level':20,  'location':'Snow Forest North'},
				{'questName':'Forging Relations',          'level':160, 'location':'Dokar (West)'},
				{'questName':'Foul Deed',                  'level':473, 'location':'Wastes of Kruz (Vale)'},
				{'questName':'Gate to the Darkness',       'level':534, 'location':'Cursed Isle of Darkwater (Gloomy Vale)'},
				{'questName':'Gathering Harvest',          'level':198, 'location':'Narkort (East)'},
				{'questName':'Glaciated Village',          'level':262, 'location':'Ossrand (East)'},
				{'questName':'Glamour of the Dragon',      'level':580, 'location':'Floating Islands of Wu Kong (South Island)'},
				{'questName':'Glazed Iguana Steaks',       'level':315, 'location':'Inual (North)'},
				{'questName':'Glimpse of the Shroud',      'level':445, 'location':'Caves of Kreth (Level 5)'},
				{'questName':'Gloomy Gem',                 'level':45,  'location':'Moot Forest North'},
				{'questName':'Gnome Idol',                 'level':208, 'location':'Maedos (East)'},
				{'questName':'Grandfathers Blade',         'level':340, 'location':'Luivak (South)'},
				{'questName':'Grave Trouble',              'level':515, 'location':'Teotal (Valley)'},
				{'questName':'Guardian of The King',       'level':399, 'location':'Treasure Rooms of Dar GromSol'},
				{'questName':'Guards of the Past',         'level':412, 'location':'Citadel of Xinderoth (Floor 12)'},
				{'questName':'Gypsies Grill',              'level':354, 'location':'Morukan'},
				{'questName':'Harvest',                    'level':488, 'location':'Castle Morbidstein (South Tower Upper)'},
				{'questName':'Heart of Gem',               'level':341, 'location':'Korundor (North)'},
				{'questName':'Hidden Rage',                'level':114, 'location':'Lenzwer Forest (Depths)'},
				{'questName':'Hidden Ruins',               'level':70,  'location':'Motaur Forests West'},
				{'questName':'Honor of Harkaron',          'level':528, 'location':'The Secret Kingdom (Wild)'},
				{'questName':'Honorary Pirate',            'level':429, 'location':'Lonely Isle (Outer)'},
				{'questName':'Hound Hunt',                 'level':243, 'location':'Emyr (East)'},
				{'questName':'Hunger Pangs',               'level':393, 'location':'Fractured Foundations'},
				{'questName':'Hungry Horror',              'level':365, 'location':'Hidden Valley (North)'},
				{'questName':'Hungry Mouths',              'level':236, 'location':'Faroth (North)'},
				{'questName':'Hunt For Herbs',             'level':259, 'location':'Ghelmot (West)'},
				{'questName':'Hunter Becomes the Hunted',  'level':296, 'location':'Krysa (South)'},
				{'questName':'Hunter of Grotesque',        'level':395, 'location':'Dar GromSol Sewers'},
				{'questName':'Hunter of the Deep',         'level':467, 'location':'Icebelt Thule (South)'},
				{'questName':'Hunter Overthrown',          'level':337, 'location':'Erodum (East)'},
				{'questName':'Hunting the Biawak',         'level':586, 'location':'Great Canopy (Upper)'},
				{'questName':'Improved Fireball',          'level':497, 'location':'Forest of Ral (Depths)'},
				{'questName':'In Search of Rebirth',       'level':361, 'location':'Burning Sands (North)'},
				{'questName':'Job Lot',                    'level':381, 'location':'Wasteland (South)'},
				{'questName':'Jungle Overgrowth',          'level':594, 'location':'Corrupt Islands (North)'},
				{'questName':'Keeper of the Old Ways',     'level':340, 'location':'Luivak (South)'},
				{'questName':'Keepsake',                   'level':398, 'location':'Catacombs of Dar GromSol'},
				{'questName':'Kidnapped Citizen',          'level':529, 'location':'The Secret Kingdom (Preserve)'},
				{'questName':'Kill the Head',              'level':375, 'location':'Broken Lands (South)'},
				{'questName':'Knock Knock',                'level':427, 'location':'Craggy Coastline (Lower)'},
				{'questName':'Krins Dilema',               'level':329, 'location':'Ponea (North)'},
				{'questName':'Laying the Foundations',     'level':351, 'location':'Mountain Heights'},
				{'questName':'Lead Astray',                'level':400, 'location':'Stoneroot Engineering '},
				{'questName':'Looking for a Cure',         'level':451, 'location':'Dark Mist Forest (Edge)'},
				{'questName':'Loot Seeker',                'level':459, 'location':'Dark Mist Forest (Range)'},
				{'questName':'Looted Hoard',               'level':279, 'location':'Horthland (North)'},
				{'questName':'Lost Compass',               'level':415, 'location':'Citadel of Xinderoth (Floor 15)'},
				{'questName':'Lost in the Woods',          'level':455, 'location':'Dark Mist Forest (Hill)'},
				{'questName':'Lost Prince',                'level':32,  'location':'Forgotten Forest (East)'},
				{'questName':'Lost Property',              'level':453, 'location':'Dark Mist Forest (Clearing)'},
				{'questName':'Lost Supplies',              'level':128, 'location':'Werzel Islands (North)'},
				{'questName':'Maedron Guild',              'level':70,  'location':'Endlore Valley East'},
				{'questName':'Magical Magma',              'level':377, 'location':'Broken Lands (East)'},
				{'questName':'Make the Sale',              'level':460, 'location':'Key Lock'},
				{'questName':'Mark of Devotion',           'level':404, 'location':'Citadel of Xinderoth (Floor 4)'},
				{'questName':'Marked by the Hag',          'level':533, 'location':'Cursed Isle of Darkwater (Upper Beach)'},
				{'questName':'Merchandise',                'level':352, 'location':'Tal Tent'},
				{'questName':'Merchant Values',            'level':92,  'location':'Pennalor Swamps (West)'},
				{'questName':'Mercy Mission',              'level':5,   'location':'Elya Plains North'},
				{'questName':'Miners Moans',               'level':331, 'location':'Aeresi (North)'},
				{'questName':'Missing Guard',              'level':481, 'location':'Castle Morbidstein (Main Gate)'},
				{'questName':'Monkey Business',            'level':230, 'location':'Ankura (North)'},
				{'questName':'Mystery Ruins',              'level':182, 'location':'Brale (East)'},
				{'questName':'Nomad Retribution',          'level':12,  'location':'Otha Caves (Level 1)'},
				{'questName':'Off Course!',                'level':339, 'location':'Luivak (North)'},
				{'questName':'Omen of Trouble',            'level':549, 'location':'Lao Xan City (Suburb)'},
				{'questName':'One of the Lads',            'level':460, 'location':'One Eyes Guard Tower'},
				{'questName':'Orb of Corruption',          'level':22,  'location':'Paladir Passageway'},
				{'questName':'Out With the Old',           'level':390, 'location':'Ug Grash Main'},
				{'questName':'Overdue Scout',              'level':521, 'location':'The Secret Kingdom (Border)'},
				{'questName':'Pieces of Two',              'level':92,  'location':'Swamp Mountains (North)'},
				{'questName':'Pilgrims Journey',           'level':553, 'location':'Gao Tain Lake (Edge)'},
				{'questName':'Plagued Recharge',           'level':20,  'location':'Paladir Forest West'},
				{'questName':'Pounding Hooves',            'level':505, 'location':'Ralthien (Western Quarter)'},
				{'questName':'Prove yourself to the Temple Guardians!', 'level':587, 'location':'Celestial Temple (Entrance)'},
				{'questName':'Pugot Party',                'level':294, 'location':'Theotis (West)'},
				{'questName':'Purge of Pirate Scum!',      'level':593, 'location':'Encrow Bay (Beach)'},
				{'questName':'Quartermasters Task',        'level':430, 'location':'Quartermaster Lodge'},
				{'questName':'Rabid Yari\'s!',             'level':171, 'location':'Pelrei (North)'},
				{'questName':'Rag Doll',                   'level':18,  'location':'The Mists South'},
				{'questName':'Rare Search',                'level':55,  'location':'Utapo Flats East'},
				{'questName':'Rat Infestation',            'level':125, 'location':'Jahd Swamps (North)'},
				{'questName':'Rat Slayer',                 'level':1,   'location':'Mountain Path'},
				{'questName':'Reclaiming the Forrest',     'level':317, 'location':'Inual (East)'},
				{'questName':'Recovering the Artifact',    'level':575, 'location':'Floating Islands of Wu Kong (East Island)'},
				{'questName':'Regain the Whole',           'level':537, 'location':'Shroud Rim (Stitchers Tower Upper)'},
				{'questName':'Reluctant Hunter',           'level':111, 'location':'Lenzwer Forest (East)'},
				{'questName':'Remnants of Corruption',     'level':40,  'location':'Amazon Encampment'},
				{'questName':'Renewal of Strength',        'level':436, 'location':'Gorgon Isle (East)'},
				{'questName':'Repair and Rebuild',         'level':483, 'location':'Castle Morbidstein (Inner Gate)'},
				{'questName':'Repeal of Judgement',        'level':397, 'location':'Gates of Forever'},
				{'questName':'Repel Borders',              'level':421, 'location':'Empty Plains (North)'},
				{'questName':'Research Assistant',         'level':353, 'location':'Morukan'},
				{'questName':'Respect',                    'level':509, 'location':'Ralthien (Merchant Precinct)'},
				{'questName':'Restless Honor',             'level':555, 'location':'Catacombs of Quan (Gate)'},
				{'questName':'Restless Souls',             'level':349, 'location':'Maw of Dagoresh'},
				{'questName':'Rites of Passage',           'level':475, 'location':'Wastes of Kruz (Scrublands)'},
				{'questName':'Rouge Leader',               'level':408, 'location':'Citadel of Xinderoth (Floor 8)'},
				{'questName':'Runaway Slaves',             'level':213, 'location':'Bahruir (West)'},
				{'questName':'Sacred Shell',               'level':135, 'location':'Reigma Beach (South)'},
				{'questName':'Sand Curse',                 'level':138, 'location':'Anklar Flats (South)'},
				{'questName':'Scrolls of Old',             'level':85,  'location':'Depths of Despair (Level 3)'},
				{'questName':'Seal of Worth',              'level':352, 'location':'Morukan'},
				{'questName':'Season Babies',              'level':275, 'location':'Surfron (North)'},
				{'questName':'Serpent Breakout',           'level':180, 'location':'Brale (North)'},
				{'questName':'Shore Defense',              'level':564, 'location':'Kyoko Island (South)'},
				{'questName':'Siege on Paladir',           'level':24,  'location':'Paladir Forest West'},
				{'questName':'Silent Sacrifice',           'level':387, 'location':'Blood Eye'},
				{'questName':'Skeletons Hoard',            'level':441, 'location':'Caves of Kreth (Level 1)'},
				{'questName':'Skin Weaver Heresy',         'level':513, 'location':'Teotal (Clearing)'},
				{'questName':'Skulls of Horror',           'level':80,  'location':'Haunted Swamp (Ruins)'},
				{'questName':'Slime Nest',                 'level':195, 'location':'Tower of Khazal (Level 2)'},
				{'questName':'Slother Extermination',      'level':144, 'location':'Appela Mountains (North)'},
				{'questName':'Smoke Signal',               'level':189, 'location':'Pelsar Canyon (West)'},
				{'questName':'Souls of the Lost',          'level':37,  'location':'The Eerie Moors (North)'},
				{'questName':'Spilling Blood',             'level':30,  'location':'Forgotten Forest (West)'},
				{'questName':'Stampede!!!',                'level':327, 'location':'Tyali (East)'},
				{'questName':'Sting in the Tail',          'level':311, 'location':'Cereas (North)'},
				{'questName':'Stolen Heart',               'level':535, 'location':'Cursed Isle of Darkwater (Broken Plain)'},
				{'questName':'Stolen Meat',                'level':201, 'location':'Khel (South)'},
				{'questName':'Stones Need Souls',          'level':299, 'location':'Erosi (North)'},
				{'questName':'Storm Crushed',              'level':533, 'location':'Cursed Isle of Darkwater (Upper Beach)'},
				{'questName':'Stranded Patrol',            'level':156, 'location':'Khorl (South)'},
				{'questName':'Strange Findings',           'level':103, 'location':'Oland Briar (South)'},
				{'questName':'Struggling Doctor',          'level':545, 'location':'Yanyi Woods (Edge)'},
				{'questName':'Survival Instincts',         'level':164, 'location':'Emerye (West)'},
				{'questName':'Swarmed Garrison',           'level':158, 'location':'Dokar (South)'},
				{'questName':'Sword Materials',            'level':469, 'location':'Icebelt Edge (Upper)'},
				{'questName':'Taking Arms',                'level':2,   'location':'Snow Forest East'},
				{'questName':'Taking Ground',              'level':357, 'location':'Underground Passages (Outer)'},
				{'questName':'Tassodans Lost Rune',        'level':2,   'location':'Snow Forest East'},
				{'questName':'Terror At Krysa',            'level':297, 'location':'Krysa (East)'},
				{'questName':'The Ant Queen',              'level':221, 'location':'Miyal (South)'},
				{'questName':'The Ascended',               'level':215, 'location':'Aydr (South)'},
				{'questName':'The Battle for Narkort',     'level':199, 'location':'Narkort (West)'},
				{'questName':'The Bitter End',             'level':433, 'location':'Lonely Isle Smugglers Cove'},
				{'questName':'The Bronze Tribe',           'level':302, 'location':'Selari (South)'},
				{'questName':'The Brother\'s Visions',     'level':323, 'location':'Peitha (East)'},
				{'questName':'The Burning Abyss',          'level':34,  'location':'Burning Abyss (Level 1)'},
				{'questName':'The Burning Temple',         'level':48,  'location':'Utapo Flats East'},
				{'questName':'The Burnt Hut',              'level':15,  'location':'Dreg Swamp'},
				{'questName':'The Chase',                  'level':146, 'location':'Grintz Forest (South)'},
				{'questName':'The Collector',              'level':406, 'location':'Citadel of Xinderoth (Floor 6)'},
				{'questName':'The Cull',                   'level':48,  'location':'Utapo Flats North'},
				{'questName':'The Dam',                    'level':285, 'location':'Ephal Swamp (North)'},
				{'questName':'The Damed Pit',              'level':240, 'location':'Emyr (North)'},
				{'questName':'The Dekma Orchid',           'level':132, 'location':'Dekma Jungle (East)'},
				{'questName':'The Demon Bone',             'level':121, 'location':'Ethereal Graveyard'},
				{'questName':'The Drying Pool',            'level':191, 'location':'Crombe Moors (South)'},
				{'questName':'The Ethereal Tavern',        'level':122, 'location':'Ethereal Frontier'},
				{'questName':'The Eye of the Storm',       'level':420, 'location':'Citadel of Xinderoth (Floor 19)'},
				{'questName':'The Fake Blessed',           'level':410, 'location':'Citadel of Xinderoth (Floor 10)'},
				{'questName':'The Fallen Bear',            'level':271, 'location':'Ofron Islands (North)'},
				{'questName':'The Fallen Warrior',         'level':414, 'location':'Citadel of Xinderoth (Floor 14)'},
				{'questName':'The Fiends',                 'level':70,  'location':'Gebores Divide North'},
				{'questName':'The Final Stand',            'level':355, 'location':'Morukan'},
				{'questName':'The Fire Portal',            'level':248, 'location':'Ralath (East)'},
				{'questName':'The Forgotten Forest',       'level':32,  'location':'Forgotten Forest (East)'},
				{'questName':'The Frozen Tower',           'level':234, 'location':'Asjal (North)'},
				{'questName':'The Goblins Dinner',         'level':223, 'location':'Miyal (West)'},
				{'questName':'The Gralli Totem',           'level':251, 'location':'Gerlond (South)'},
				{'questName':'The Grip of Madness',        'level':363, 'location':'Burning Sands (South)'},
				{'questName':'The Grothan Blockade',       'level':290, 'location':'The Grothan Way (South)'},
				{'questName':'The Heat of Ambition',       'level':400, 'location':'City of Xinderoth'},
				{'questName':'The Honor of Vengeance',     'level':540, 'location':'Dark Atholhu (Mount Foot)'},
				{'questName':'The Hunters Peril',          'level':584, 'location':'Truncal Jungle (West)'},
				{'questName':'The Idol',                   'level':107, 'location':'Enkmar Scrubland (South)'},
				{'questName':'The Image of Arrogance',     'level':418, 'location':'Citadel of Xinderoth (Floor 18)'},
				{'questName':'The Joke Wanes',             'level':403, 'location':'Citadel of Xinderoth (Floor 3)'},
				{'questName':'The Last Forest Folk',       'level':32,  'location':'Forgotten Forest (East)'},
				{'questName':'The Lighthouse',             'level':128, 'location':'Werzel Islands (North)'},
				{'questName':'The Lost Chest',             'level':37,  'location':'Luminous Den (Level 2)'},
				{'questName':'The Lost Child',             'level':144, 'location':'Appela Mountains (North)'},
				{'questName':'The Lost watch',             'level':391, 'location':'Dar GromSol'},
				{'questName':'The Main Course',            'level':389, 'location':'Dark Blade'},
				{'questName':'The Missing Egg',            'level':179, 'location':'Naral (West)'},
				{'questName':'The Monolith',               'level':123, 'location':'Ethereal Badlands'},
				{'questName':'The Old Man',                'level':15,  'location':'Dreg Swamp'},
				{'questName':'The Orders, Chapter 1',      'level':242, 'location':'Emyr (East)'},
				{'questName':'The Path of Enlightenment',  'level':541, 'location':'Hai Jing Mountains (Summit)'},
				{'questName':'The Path of Union',          'level':447, 'location':'Caves of Kreth (Level 7)'},
				{'questName':'The Perfect Look',           'level':419, 'location':'Citadel of Xinderoth (Floor 19)'},
				{'questName':'The Perfect Pipe',           'level':495, 'location':'Forest of Ral (Clearing)'},
				{'questName':'The Poison of the Soul',     'level':419, 'location':'Hall of Heartache'},
				{'questName':'The Price of Skulls',        'level':2,   'location':'Snow Forest East'},
				{'questName':'The Prisoners',              'level':211, 'location':'Bahruir (South)'},
				{'questName':'The Rebel Riders',           'level':175, 'location':'Gumbrel (South)'},
				{'questName':'The Sacred Knife',           'level':1,   'location':'Mountain Path'},
				{'questName':'The Saurus Shield',          'level':325, 'location':'Tyali (North)'},
				{'questName':'The Selari Cure',            'level':304, 'location':'Selari (West)'},
				{'questName':'The Shadows Cave',           'level':307, 'location':'Eosi (East)'},
				{'questName':'The Sick Puppeteer',         'level':416, 'location':'Citadel of Xinderoth (Floor 16)'},
				{'questName':'The Statue',                 'level':124, 'location':'Ethereal Plains'},
				{'questName':'The Strangling Shroud',      'level':321, 'location':'Peitha (North)'},
				{'questName':'The Swamps Crawling...',     'level':254, 'location':'Nimaos (North)'},
				{'questName':'The Three Magic Stones',     'level':120, 'location':'Ethereal City'},
				{'questName':'The Upper Hand',             'level':367, 'location':'Hidden Valley (East)'},
				{'questName':'The Way Laid Out',           'level':581, 'location':'Truncal Jungle (North)'},
				{'questName':'The Welcome Party',          'level':239, 'location':'Faroth (West)'},
				{'questName':'The Wights Tombs',           'level':185, 'location':'Angel Caves (South)'},
				{'questName':'The Worm Queen',             'level':305, 'location':'Eosi (North)'},
				{'questName':'The Wounded Adventurer',     'level':36,  'location':'Dark Cave (Level 1)'},
				{'questName':'Thieving Skies',             'level':563, 'location':'Kyoko Island (West)'},
				{'questName':'Those Blasted Worms!',       'level':565, 'location':'Hirosue Caverns (Mouth)'},
				{'questName':'Thou Dost Jest!',            'level':19,  'location':'Dreg Swamp'},
				{'questName':'To kill an Orc, or two',     'level':65,  'location':'Ragtall Forest Outskirts'},
				{'questName':'Tomb Seeker',                'level':177, 'location':'Naral (South)'},
				{'questName':'Tortured Spirits Tome',      'level':35,  'location':'Crystal Cavern (Entrance)'},
				{'questName':'Town Guard',                 'level':169, 'location':'Dunale (North)'},
				{'questName':'Trade Route',                'level':493, 'location':'Forest of Ral (Valley)'},
				{'questName':'Traitors',                   'level':359, 'location':'Great Plains (North)'},
				{'questName':'Treacherous Dwarfs!',        'level':570, 'location':'Hirosue Caverns (Maze)'},
				{'questName':'Treacherous Sands',          'level':561, 'location':'Kyoko Island (North)'},
				{'questName':'Treasure Hunt',              'level':197, 'location':'Narkort (North)'},
				{'questName':'Trial of Honor',             'level':500, 'location':'Forest of Ral (Inner Grove)'},
				{'questName':'Tribal Raid',                'level':491, 'location':'Forest of Ral (Fence)'},
				{'questName':'Tribal Rights',              'level':105, 'location':'Saneri Rocks (North)'},
				{'questName':'Unbroken Spirits',           'level':484, 'location':'Castle Morbidstein (Fortress Lower)'},
				{'questName':'Undead Tribe',               'level':333, 'location':'Aeresi (East)'},
				{'questName':'Unending Hope',              'level':465, 'location':'Icebelt Thule (North)'},
				{'questName':'Unwelcome Visitor',          'level':401, 'location':'Citadel of Xinderoth (Floor 1)'},
				{'questName':'Valuable Find',              'level':92,  'location':'Swamp Mountains (North)'},
				{'questName':'Venom Seeker',               'level':531, 'location':'Cursed Isle of Darkwater (Break Water)'},
				{'questName':'Venomous Thoughts',          'level':10,  'location':'Elya Plains North'},
				{'questName':'Village Protection',         'level':118, 'location':'Gadrel Swamps (South)'},
				{'questName':'Void Research',              'level':409, 'location':'Citadel of Xinderoth (Floor 9)'},
				{'questName':'Walkway Repair',             'level':281, 'location':'The Bitter Marsh (North)'},
				{'questName':'Warped Goodness',            'level':547, 'location':'Yanyi Woods (Outer)'},
				{'questName':'Wayward Friends',            'level':347, 'location':'Dark Vale (East)'},
				{'questName':'Wayward Priest',             'level':520, 'location':'Teotal (Golden Temple)'},
				{'questName':'We need a Hearty Stew!',     'level':567, 'location':'Hirosue Caverns (Depths)'},
				{'questName':'Weapon of Significance',     'level':373, 'location':'Canyon Depths'},
				{'questName':'Wrap Up Warm',               'level':3,   'location':'Mountain Path'},
				{'questName':'Wrongly Accused',            'level':501, 'location':'Ralthien (Gate)'},
				{'questName':'Zombie Treasure',            'level':218, 'location':'Yuzha (East)'}
			];
			Data.questArray = questArray.sort();
		}
		return Data.questArray;
	},

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
/*
<?xml version="1.0" encoding="UTF-8" ?>
<Module>
  <ModulePrefs title="Sisland 1-hit Calculator"
               height="370" >
  </ModulePrefs>
  <Content type="html">
     <![CDATA[

<script type="text/javascript">
  var creatures = new Array();
creatures[186] = new Array( "Cacti Cat",608,655,3104);
creatures[187] = new Array( "Nazum",920,726,3101);
creatures[188] = new Array( "Pelsar Ogre",794,889,3290);
creatures[189] = new Array( "Thunder Bird",922,889,3127);
creatures[190] = new Array( "Black Dog of Crombe",745,790,3260);
creatures[191] = new Array( "Crow Flock",913,841,3179);
creatures[192] = new Array( "Soil Golem",706,662,3400);
creatures[193] = new Array( "Arms of Crombe",697,998,3319);
creatures[194] = new Array( "Khazal Gargoyle",960,734,3319);
creatures[195] = new Array( "Carnivorous Slime",779,882,3456);
creatures[196] = new Array( "Narkort Moose",926,779,3333);
creatures[197] = new Array( "Plains Troll",923,939,3575);
creatures[198] = new Array( "Mega Worm",987,780,3256);
creatures[199] = new Array( "Narkortian Shade",865,921,3562);
creatures[200] = new Array( "Giant Khel Bear",978,910,3396);
creatures[201] = new Array( "Itzsu Goblin",960,900,3361);
creatures[202] = new Array( "Orca",951,912,3560);
creatures[203] = new Array( "Ice Man",872,832,3536);
creatures[204] = new Array( "Lava Raptor",886,826,3619);
creatures[205] = new Array( "Sulphur Bats",952,965,3436);
creatures[206] = new Array( "Maedos Boar",1049,742,3619);
creatures[207] = new Array( "Maedos Elf Scout",786,1039,3588);
creatures[208] = new Array( "Ruir Orc",802,923,3667);
creatures[209] = new Array( "Timberman",937,862,3550);
creatures[210] = new Array( "Malefor Bomber",1087,852,3630);
creatures[211] = new Array( "Malefor Asphyxiator",813,819,3633);
creatures[212] = new Array( "Ruir Orcont",812,778,3586);
creatures[213] = new Array( "Malefor Enforcer",1013,981,3700);
creatures[214] = new Array( "Malefor Techno Magi",739,939,3602);
creatures[215] = new Array( "Malefor Ascended Magi",830,1113,3734);
creatures[216] = new Array( "Yuzha Giant Crab",1040,876,3792);
creatures[217] = new Array( "Zombie Pirate",793,809,3623);
creatures[218] = new Array( "Zombie Swashbuckler",868,1032,3710);
creatures[219] = new Array( "Lobsteroid",1005,861,3850);
creatures[220] = new Array( "Twin Headed Spitting Cobra",1152,786,3701);
creatures[221] = new Array( "Flesh Eating Ant Swarm",856,1117,3780);
creatures[222] = new Array( "Bone Face Goblin",946,875,3757);
creatures[223] = new Array( "Greater Jaguar",897,792,3916);
creatures[224] = new Array( "Glow Worm",934,837,3779);
creatures[225] = new Array( "Kozyu Crystal Beast",873,926,3970);
creatures[226] = new Array( "Falagi Death Demon",975,893,3952);
creatures[227] = new Array( "Spiked Fiend",1118,1181,3918);
creatures[228] = new Array( "Asura of Falagi",1038,879,3806);
creatures[229] = new Array( "Hathi Colossus",1181,860,3967);
creatures[230] = new Array( "Hamurin Monkey",1101,1026,3999);
creatures[231] = new Array( "Ankurian Bull Rider",952,1059,4057);
creatures[232] = new Array( "Ankura Head",897,870,3884);
creatures[233] = new Array( "Karka",1185,1089,3952);
creatures[234] = new Array( "Blue Tiger",1128,897,3898);
creatures[235] = new Array( "Steel Naga",865,1127,4025);
creatures[236] = new Array( "The Forgotten",970,815,4547);
creatures[237] = new Array( "The Invisible",1549,841,4559);
creatures[238] = new Array( "The Flayer",1216,773,4508);
creatures[239] = new Array( "Feral Flame",679,666,4634);
creatures[240] = new Array( "Xexk Magi",428,1507,5401);
creatures[241] = new Array( "Xexk Shaman",575,1152,5441);
creatures[242] = new Array( "Xexk Water Master",678,655,4595);
creatures[243] = new Array( "Xexk Hound",1278,1261,4502);
creatures[244] = new Array( "Bobasaur",301,1692,5481);
creatures[245] = new Array( "The Mauler",1015,1188,4747);
creatures[246] = new Array( "Lava Meld Demon",912,1239,4742);
creatures[247] = new Array( "Ralath Inferno",1030,912,4602);
creatures[248] = new Array( "Fire Doll",1288,955,4656);
creatures[249] = new Array( "Eagle of Conflagration",561,638,4673);
creatures[250] = new Array( "Strike Bee",1486,1079,4725);
creatures[251] = new Array( "Gralli Warrior",1229,1030,4716);
creatures[252] = new Array( "Gralli Shaman",763,1380,4793);
creatures[253] = new Array( "Man Eating Mantis",548,710,4850);
creatures[254] = new Array( "Swamp Worm",752,932,4775);
creatures[255] = new Array( "Swamp Elemental",1086,1166,5772);
creatures[256] = new Array( "Cave Bear",566,743,4884);
creatures[257] = new Array( "Skin Flayer",1664,1153,4826);
creatures[258] = new Array( "Ghelmot Bearcat",947,1484,4786);
creatures[259] = new Array( "Sabercat",577,717,5022);
creatures[260] = new Array( "Ice Spider",1338,958,4912);
creatures[261] = new Array( "Ice Wisps",773,721,4973);
creatures[262] = new Array( "Ossrand Bearcat",1260,992,4924);
creatures[263] = new Array( "Snow Wanderer",310,1659,5885);
creatures[264] = new Array( "Giant Walrus",510,1445,5833);
creatures[265] = new Array( "Kaneq Fiends",1319,1218,5102);
creatures[266] = new Array( "Ice Kraken",601,671,4930);
creatures[267] = new Array( "Poison Swamp Worm",655,1744,6039);
creatures[268] = new Array( "Ashen Cloud",750,1749,5724);
creatures[269] = new Array( "Blue Mamba",1642,1450,5048);
creatures[270] = new Array( "Horned Acolyte",1255,915,4985);
creatures[271] = new Array( "Quicksand Demon",1619,1363,4892);
creatures[272] = new Array( "Sand Crab Swarm",589,666,5223);
creatures[273] = new Array( "Salt Jinni",845,933,5240);
creatures[274] = new Array( "Benthius",799,1026,5159);
creatures[275] = new Array( "Centurion Beetle Larva",690,2102,6067);
creatures[276] = new Array( "Surfron Centaur Hunter",1018,1107,5267);
creatures[277] = new Array( "Fire Sentinel",1544,1027,5271);
creatures[278] = new Array( "Centurion Beetle",533,610,5034);
creatures[279] = new Array( "Ghoul Looter",1150,1123,5178);
creatures[280] = new Array( "Zombie Crusader",1656,1537,5381);
creatures[281] = new Array( "Marsh Specter",1219,1315,5254);
creatures[282] = new Array( "Bitter Leech",697,594,5425);
creatures[283] = new Array( "Will o the Wisp",1105,1502,5330);
creatures[284] = new Array( "Giant Snapping Turtle",1710,1682,5239);
creatures[285] = new Array( "Ephal Venom Frog Swarm",771,631,5497);
creatures[286] = new Array( "Deschala Dragonfly",1591,1636,5371);
creatures[287] = new Array( "Giant Ephal Crocodile",655,721,5435);
creatures[288] = new Array( "Shenrall",1242,957,5319);
creatures[289] = new Array( "Black Auroch",1291,1385,6564);
creatures[290] = new Array( "Grothan Cyclops",1171,1122,5421);
creatures[291] = new Array( "Dipsoshell Tortoise",2167,1789,5456);
creatures[292] = new Array( "Theotis Beast",871,2067,6540);
creatures[293] = new Array( "Giant Theotis Lynx",1024,1425,5543);
creatures[294] = new Array( "Pugot",731,623,5618);
creatures[295] = new Array( "Hog Hound",602,635,5495);
creatures[296] = new Array( "Neanderthal Hunter",1558,1360,5576);
creatures[297] = new Array( "Hellos Terror Bird",762,708,5522);
creatures[298] = new Array( "Giant Ground Sloth",502,1834,6694);
creatures[299] = new Array( "Dire Wolf",1661,1792,5693);
creatures[300] = new Array( "Apepinos",1400,1494,5616);
creatures[301] = new Array( "Neanderthal Rockman",1428,1717,5573);
creatures[302] = new Array( "Proto Orc",1031,1566,5649);
creatures[303] = new Array( "Smilodon",751,648,5731);
creatures[304] = new Array( "Megalania",1946,1654,5612);
creatures[305] = new Array( "Eosi Slime Worm",2136,1018,5633);
creatures[306] = new Array( "Eosi Troglodyte Spider",1295,1671,5698);
creatures[307] = new Array( "Shadow Cave Crawler",1947,1463,5866);
creatures[308] = new Array( "Black Cave Bear",1132,1392,6828);
creatures[309] = new Array( "Costal Ammonite",2717,1202,5689);
creatures[310] = new Array( "Giant Sea Scorpion",864,1405,6893);
creatures[311] = new Array( "Plesiosaur",2156,1487,5777);
creatures[312] = new Array( "Cerenian",2401,1041,5799);
creatures[313] = new Array( "Thetos Warrior",367,1975,6967);
creatures[314] = new Array( "Liopleurodon",877,881,5972);
creatures[315] = new Array( "Giant Iguana",1613,1904,5943);
creatures[316] = new Array( "Bog Demon",1339,1026,6002);
creatures[317] = new Array( "Liverwort",1189,2303,6990);
creatures[318] = new Array( "Dimetrodon",1629,1451,5859);
creatures[319] = new Array( "Doomsaur",1916,1974,5943);
creatures[320] = new Array( "Aquiasaur",980,1269,5933);
creatures[321] = new Array( "Peitha Apparition",1038,1916,5955);
creatures[322] = new Array( "Mist Scorpion",824,878,6111);
creatures[323] = new Array( "Ankylosaurus",1274,1730,7141);
creatures[324] = new Array( "Stegosaurus",804,898,6153);
creatures[325] = new Array( "Strikosaurus",1136,1455,7305);
creatures[326] = new Array( "Tyali Goilem",2365,1057,6018);
creatures[327] = new Array( "Brachiosaurus",2155,1643,6030);
creatures[328] = new Array( "Allosaurus",1154,1997,6205);
creatures[329] = new Array( "Dinosauroid",1514,1626,6189);
creatures[330] = new Array( "Troodon Pack",800,689,6284);
creatures[331] = new Array( "Pterosaur",1613,2049,6264);
creatures[332] = new Array( "Dinosauroid Bezerker",741,857,6246);
creatures[333] = new Array( "Dinosauroid Skeleton",2018,1743,6164);
creatures[334] = new Array( "Haurez",1522,2684,7576);
creatures[335] = new Array( "Dipsoshell Guard Tortoise",704,2258,7377);
creatures[336] = new Array( "Inudum Hunter",2131,1897,6206);
creatures[337] = new Array( "Inudum Scout Rider",913,895,6294);
creatures[338] = new Array( "Inudum Shaman",1682,1411,6327);
creatures[339] = new Array( "Inudum Guard",1837,1508,6405);
creatures[340] = new Array( "Inudum Heavy Guard",935,952,6260);
creatures[341] = new Array( "Dwarf Armor Golem",918,936,7003);
creatures[342] = new Array( "Dwarf Warrior Ghost",2135,1415,7040);
creatures[343] = new Array( "Dwarf Treasure Hunter",1320,2518,8524);
creatures[344] = new Array( "Shadow Lurker",2457,2108,7049);
creatures[345] = new Array( "Ghoul",858,848,7106);
creatures[346] = new Array( "Dark Vale Vines",1033,1686,7119);
creatures[347] = new Array( "Skeletal Spider",1693,1771,7277);
creatures[348] = new Array( "Dark Vale Treeman",1026,2381,8541);
creatures[349] = new Array( "Necromantic Terror",2368,1769,7292);
creatures[350] = new Array( "Root Pooka",2663,1374,7175);
creatures[351] = new Array( "Wolfin",2408,1999,7387);
creatures[352] = new Array( "Crystal Worm",1990,2320,7333);
creatures[353] = new Array( "Underling",791,1050,7257);
creatures[354] = new Array( "Dark Pteron",2014,1560,7442);
creatures[355] = new Array( "Underling Acolyte",2264,2060,7171);
creatures[356] = new Array( "Dusk Goblin Warrior",1813,2567,7327);
creatures[357] = new Array( "Dusk Goblin Rider",1091,943,7331);
creatures[358] = new Array( "Willow Nymph",3263,2053,7362);
creatures[359] = new Array( "Ragarim",1298,1395,7472);
creatures[360] = new Array( "Lonital",1664,1689,7325);
creatures[361] = new Array( "Scarab",2976,1832,7311);
creatures[362] = new Array( "Horus",932,941,7493);
creatures[363] = new Array( "Sobek",2427,1576,7410);
creatures[364] = new Array( "Anubis",1240,2783,8802);
creatures[365] = new Array( "Gremlin",2363,1716,7440);
creatures[366] = new Array( "Druid",2077,2232,7466);
creatures[367] = new Array( "Ja Quan",1606,1909,7537);
creatures[368] = new Array( "Ji Quan",1903,1332,7543);
creatures[369] = new Array( "Horned Lizard",2514,1700,7670);
creatures[370] = new Array( "Dried Husk",1161,870,7533);
creatures[371] = new Array( "Scarlet Strike",2313,1186,7651);
creatures[372] = new Array( "Giant Scorpion",1112,1804,9140);
creatures[373] = new Array( "Dark Stalker",1568,1487,7590);
creatures[374] = new Array( "Kamardo Lizard",2223,2553,7752);
creatures[375] = new Array( "Sepharom Halfspear",2401,1936,7658);
creatures[376] = new Array( "Sepharom Blade",1629,1795,7668);
creatures[377] = new Array( "Sepharom Weaver",1204,2517,7707);
creatures[378] = new Array( "Sepharom Battle Caster",1146,1201,7720);
creatures[379] = new Array( "Dune Howler",1636,2446,7800);
creatures[380] = new Array( "Lanqeeth",2312,1865,7914);
creatures[381] = new Array( "Outcast Orc",2495,1858,7911);
creatures[382] = new Array( "Greater Boar",1719,2516,9308);
creatures[383] = new Array( "Ravaged Tree Elemental",3004,1526,7859);
creatures[384] = new Array( "Orc Clan Scout",2391,2512,7998);
creatures[385] = new Array( "Orc Wolf Rider",1476,2289,9491);
creatures[386] = new Array( "Crushing Fist Orc",1868,1528,7846);
creatures[387] = new Array( "Blood Eye Orc",3777,2208,7864);
creatures[388] = new Array( "Broken Fang Orc",2148,1242,8050);
creatures[389] = new Array( "Dark Blade Orc",955,1153,8070);
creatures[390] = new Array( "Ug Grash Guard",1581,1867,9543);
creatures[391] = new Array( "Skeleton of Dar GromSol",1834,1420,8103);
creatures[392] = new Array( "Undead Cellar Snake",1102,1010,8210);
creatures[393] = new Array( "Dar GromSol Bat Swarm",2308,2111,7742);
creatures[394] = new Array( "Spirit Host",2524,1768,8207);
creatures[395] = new Array( "Sewer Thing",2047,2182,8040);
creatures[396] = new Array( "Dar GromSol Treasure Guard",1008,1108,8059);
creatures[397] = new Array( "Eternal Tormented",658,3616,9807);
creatures[398] = new Array( "Ectoplasmic Horror",2207,1781,8172);
creatures[399] = new Array( "Angra Warrior",2145,2244,8126);
creatures[400] = new Array( "Xinderoth Watcher",1269,2461,8087);
creatures[401] = new Array( "Decapoid",2675,2021,8157);
creatures[402] = new Array( "Xinderoth Friar",3775,2373,8191);
creatures[403] = new Array( "Laughing Feind",1872,1586,8302);
creatures[404] = new Array( "Xinderoth Anchorite",1140,1083,8265);
creatures[405] = new Array( "Citadel Slime",2544,1790,8987);
creatures[406] = new Array( "Xinderoth Cenobite",2639,1586,8356);
creatures[407] = new Array( "Stone Hippogriff",1556,2605,8387);
creatures[408] = new Array( "Opticor Guard",1296,2079,8356);
creatures[409] = new Array( "Void Being",3557,2882,8336);
creatures[410] = new Array( "Exalted Xindor",1246,1305,8551);
creatures[411] = new Array( "Theorem",1352,1329,8347);
creatures[412] = new Array( "Xind Warrior",2261,1437,8396);
creatures[413] = new Array( "Xind Beacon",982,1060,8446);
creatures[414] = new Array( "Citadel Observer",3166,2886,8470);
creatures[415] = new Array( "Xinderoth Sarabaite",1787,1679,8525);
creatures[416] = new Array( "Xind Puppeteer",750,2904,10266);
creatures[417] = new Array( "Citadel Construct",1730,1848,8428);
creatures[418] = new Array( "Figure of Xinderoth",2038,1786,8647);
creatures[419] = new Array( "Glass Maiden",3875,2345,8492);
creatures[420] = new Array( "Eye of Xinderoth",1429,3102,10327);
creatures[421] = new Array( "Spine Grofflesnout",3365,2087,8561);
creatures[422] = new Array( "Warped Grofflesnout",1645,1681,8561);
creatures[423] = new Array( "Sky Elemental",1419,2858,10456);
creatures[424] = new Array( "Plains Screecher",1991,2200,8726);
creatures[425] = new Array( "Killer Clam",4019,2477,8661);
creatures[426] = new Array( "Hook Pirate",1399,3268,10456);
creatures[427] = new Array( "Pirate Bomber",118,119,8748);
creatures[428] = new Array( "Elven Shade",1524,1974,8677);
creatures[429] = new Array( "Pistol Pirate",1126,1005,8814);
creatures[430] = new Array( "Grofflesnout Shark",2985,2289,8775);
creatures[431] = new Array( "Pirate Strongman",1150,1260,8885);
creatures[432] = new Array( "Pirate Bosun",1590,1901,10587);
creatures[433] = new Array( "Gobbler",1142,1206,8927);
creatures[434] = new Array( "Hydrorion Plesiosaur",1252,930,8865);
creatures[435] = new Array( "Tower of Petrification",1830,2148,8797);
creatures[436] = new Array( "Petrified Warrior",1403,1954,9004);
creatures[437] = new Array( "Petrified Hero",1911,1914,10694);
creatures[438] = new Array( "Gorgon",1152,1206,8951);
creatures[439] = new Array( "Gorgon Isle Basilisk",2056,3047,10724);
creatures[440] = new Array( "Rock Colossus",3635,1686,9030);
creatures[441] = new Array( "Kreth Slime",1317,1063,9121);
creatures[442] = new Array( "Kreth Cave Crawler",1387,2511,10859);
creatures[443] = new Array( "Kreth Creeper",3086,2439,9034);
creatures[444] = new Array( "Kreth Puff Mushrooms",2462,2094,9046);
creatures[445] = new Array( "Kreth Coleoptera",1969,2571,10924);
creatures[446] = new Array( "Kreth Two-Headed Mamba",2587,3124,9044);
creatures[447] = new Array( "Kreth Goo Cube",2601,1454,9170);
creatures[448] = new Array( "Kreth Cave Hands",3069,2665,9068);
creatures[449] = new Array( "Kreth Vistage Minion",1302,1140,9310);
creatures[450] = new Array( "Kreth Gloom Gaunt",1253,1001,9315);
creatures[451] = new Array( "Sabre Horn Goat",2617,2271,9065);
creatures[452] = new Array( "Plague Carrier",2462,3104,9237);
creatures[453] = new Array( "Forest Hundra",1517,2818,10840);
creatures[454] = new Array( "Thorn Demon",893,1326,8887);
creatures[455] = new Array( "Enraged Grizzle Bear",661,3273,11089);
creatures[456] = new Array( "Ravaged Forest Guardian",2809,2385,9235);
creatures[457] = new Array( "Escaped Slave",2704,1835,9252);
creatures[458] = new Array( "Forest Darkling",2596,1416,9039);
creatures[459] = new Array( "Forest Troll",1612,2887,11000);
creatures[460] = new Array( "Forest Wisp",2803,3091,9264);
creatures[461] = new Array( "Ice Crab",1064,985,9246);
creatures[462] = new Array( "Dread Claw Eagle",2562,2625,9364);
creatures[463] = new Array( "Qawi Savage",2464,3052,9509);
creatures[464] = new Array( "Killer Penguin",914,3015,11251);
creatures[465] = new Array( "Were Killer Penguin",2156,2675,9567);
creatures[466] = new Array( "Ice Leaper",2523,2663,9146);
creatures[467] = new Array( "Ice Knight",1013,1058,9157);
creatures[468] = new Array( "Giant Elephant Seal",2868,2550,9440);
creatures[469] = new Array( "Dread Claw Sea Serpent",2425,3006,9551);
creatures[470] = new Array( "Dread Whale",2184,3370,11385);
creatures[471] = new Array( "Charging Mactherium",680,3589,11469);
creatures[472] = new Array( "Mactherium Rider",2900,1596,9740);
creatures[473] = new Array( "Hemovore",3399,1529,9415);
creatures[474] = new Array( "Hemovore Blood Cultist",2994,3034,9684);
creatures[475] = new Array( "Hemovore Blood Shaman",1017,1127,9323);
creatures[476] = new Array( "Blood Tick",1274,1090,9428);
creatures[477] = new Array( "Caprabeast",3930,2491,9491);
creatures[478] = new Array( "Atshen",2249,2384,11460);
creatures[479] = new Array( "Kruz Mammoth",2839,1619,9538);
creatures[480] = new Array( "Blood Ancestor",2192,3384,9713);
creatures[481] = new Array( "Giant Slug",2579,1924,9699);
creatures[482] = new Array( "Hammerer of Morbidstein",3484,1877,9772);
creatures[483] = new Array( "Screaming Visage",1347,1257,9478);
creatures[484] = new Array( "Undun Specter",3882,1893,9916);
creatures[485] = new Array( "Blood Bat Swarm",1491,2718,9919);
creatures[486] = new Array( "Shadow Puka",2425,1953,9841);
creatures[487] = new Array( "Lobotomized Worker",1411,1405,10042);
creatures[488] = new Array( "Lobotomized Thug",932,2761,11802);
creatures[489] = new Array( "Brain Abomination",2290,2089,9877);
creatures[490] = new Array( "Son of Morbidstein",1412,1374,10095);
creatures[491] = new Array( "Leopard Centaur",3018,2392,9958);
creatures[492] = new Array( "Ralthian Archer",1196,1180,9905);
creatures[493] = new Array( "Paua Gryphon",1658,4112,11971);
creatures[494] = new Array( "Woad Forest Elf",1938,1828,9979);
creatures[495] = new Array( "Ral Faun",1739,2169,12073);
creatures[496] = new Array( "Elf Shadow Guard",1438,968,10218);
creatures[497] = new Array( "Ormr Dragon",1168,1304,10125);
creatures[498] = new Array( "River Troll",1243,1129,10143);
creatures[499] = new Array( "Fey of the Grove",1265,3776,12207);
creatures[500] = new Array( "Ancient Grove Treeman",3239,1938,10100);
creatures[501] = new Array( "Ralthian Sword Guard",2391,3290,10175);
creatures[502] = new Array( "Ralthien Swordsman",1530,1176,10100);
creatures[503] = new Array( "Ralthien Heavy Spearman",3503,3533,10196);
creatures[504] = new Array( "Silent Moon Monk",4397,1833,10303);
creatures[505] = new Array( "Ralthien Hired Centaur",3457,2093,10244);
creatures[506] = new Array( "Ormr Claw Assassin",4507,2013,10348);
creatures[507] = new Array( "Ralthien Light Cavalry",1401,1414,10087);
creatures[508] = new Array( "Ralthien Sorceress",1566,1858,10222);
creatures[509] = new Array( "Ralthien House Guard",1732,1786,10317);
creatures[510] = new Array( "Ralthien Dragon Lord",1369,1198,10282);
creatures[511] = new Array( "Sisimite",1597,3882,12365);
creatures[512] = new Array( "Teotal Scout",2758,2310,10310);
creatures[513] = new Array( "Teotal Brujo",3216,2736,10388);
creatures[514] = new Array( "Otoomie Shorn One",2241,2676,10442);
creatures[515] = new Array( "Cursed Specter",3442,1710,10430);
creatures[516] = new Array( "Nagual",3282,2864,10527);
creatures[517] = new Array( "Teotal Death Warrior",2058,4306,12497);
creatures[518] = new Array( "Teotal Jaguar Warrior",1412,1491,10669);
creatures[519] = new Array( "Feathered Serpent",2399,2357,12723);
creatures[520] = new Array( "Living Idol of Teocalli",2327,2363,12717);
creatures[521] = new Array( "Bloom Encrusted Snuffler",2055,1624,10576);
creatures[522] = new Array( "Spell Fury",3555,2938,10716);
creatures[523] = new Array( "Fae Tree Shaman",1579,1341,10653);
creatures[524] = new Array( "Rune Scarred Archer",3217,3065,10605);
creatures[525] = new Array( "Fae Moon Caster",1551,2927,12872);
creatures[526] = new Array( "Fae Grove Warden",3498,2626,10712);
creatures[527] = new Array( "Odonta Rider",1382,1328,10815);
creatures[528] = new Array( "Fae Enchantress",4236,2002,10839);
creatures[529] = new Array( "Fae Blade Dancer",1018,4472,12960);
creatures[530] = new Array( "Giggle Snipe",1161,1324,10725);
creatures[531] = new Array( "Greater Poison Starfish",3241,1996,10830);
creatures[532] = new Array( "Man Eating Sponge",2635,3540,10724);
creatures[533] = new Array( "Globster",1649,3411,13033);
creatures[534] = new Array( "Glaucus Pirate",3236,1991,10835);
creatures[535] = new Array( "Octo Sapiens",1857,3879,12970);
creatures[536] = new Array( "Sea Monk",1435,1529,10975);
creatures[537] = new Array( "Needle Tooth Eel",3546,2083,10850);
creatures[538] = new Array( "Harbinger of Storms",2646,3543,10994);
creatures[539] = new Array( "Chelonian Pirate",1334,1541,10831);
creatures[540] = new Array( "Chelonian Battle Turret",2249,2817,10814);
creatures[541] = new Array( "Dragon Claw Monk",2544,3120,10884);
creatures[542] = new Array( "Dragon Fire Monk",1514,1522,10872);
creatures[543] = new Array( "Dragon Scale Monk",1305,3424,13070);

  function load() {
      var creature = creatures[lvl.value];
      if ( creature != null ) {
          creature_text.innerHTML = "<font size='-2'>Loaded stats for " + creature[0] + "</font>";
          def.value = creature[1];
          arm.value = creature[2];
          hp.value = creature[3];
      } else {
          creature_text.innerHTML = "<font color='red'>No creatures found</font>";
      }
  }

  function calculate() {
    var a = atk.value;
    var d = def.value;
    d *= 1.1053;
    var dc = Math.ceil((d-a)/d/0.002);

    if ( dc <= 0 ) {
      dc_result.innerHTML = "Dark Curse is not needed";
    } else {
      dc_result.innerHTML = "Dark Curse level needed = " + dc;
    }

    var m = dam.value;
    var r = arm.value;
    var h = hp.value;
    var f = hf.value;
    f *= 002*m;
    h = r*1.1053+h*1.053-f-m;
    if ( h <= 0 ) {
      ca_result.innerHTML = "No DD nor CA needed";
    } else {
      h -= m*0.2;
      if ( h <= 0 ) {
        ca_result.innerHTML = "No CA needed after DD 20%";
      } else {
        h /= m;
        h /= 0.0025;
        h = Math.ceil(h);
        ca_result.innerHTML = "After 20% DD, CA needed = " + h;
      }
    }
  }
</script>
<table>
  <tr>
    <td colspan="2">
      <font size="-2" color="red">Please remember to turn off Nightmare Visage</font>
    </td>
  </tr>
  <tr>
    <td>Player's Attack<br/>
      <font size="-2">As shown after Rage/Fury/EW/EA/KE</font>
    </td>
    <td><input id="atk" type="text" size="5"/></td>
  </tr>
  <tr>
    <td>Player's Damage<br/>
     <font size="-2">As shown after Berserk/Fury/EW/EA</font>
    </td>
    <td><input id="dam" type="text" size="5"/></td>
  </tr>
  <tr>
    <td>Creature's Level</td>
    <td><input id="lvl" type="text" size="3" value="186"/></td>
  </tr>
  <tr><td colspan="2">
     <input type="button" value="Load Creature Stats" onclick="load();">
  </td></tr>
  <tr><td colspan="2" id="creature_text">
  </td></tr>
  <tr>
    <td>Creature's Defense</td>
    <td><input id="def" type="text" size="5"/></td>
  </tr>
  <tr>
    <td>Creature's Armor</td>
    <td><input id="arm" type="text" size="5"/></td>
  </tr>
  <tr>
    <td>Creature's HP</td>
    <td><input id="hp" type="text" size="5"/></td>
  </tr>
  <tr>
    <td>Holy Flame Level<br/>
      <font size="-2">Please put 0 if creature is not undead</font>
    </td>
    <td><input id="hf" type="text" size="5" value="0"/></td>
  </tr>
  <tr><td colspan="2">
     <input type="button" value="Calculate" onclick="calculate();">
  </td></tr>
</table>
<span id="dc_result"></span><br/>
<span id="ca_result"></span><br/>
<font size="-2" color="red">Please check the name of creatures, there can be more than 1 creature at each level.</font>

     ]]>
  </Content>
</Module>
*/
	},

	buffList: function() {
		if (!Data.buffArray) {
			Data.buffArray = [
				{"name": "Rage",               "stamina": 10, "duration": 90,   "treeId": 0, "skillId": 0,  "buff": "+0.2% base attack per point."},
				{"name": "Stun",               "stamina": 15, "duration": 90,   "treeId": 0, "skillId": 1,  "buff": "+0.1% chance per point to half opponents chance to hit."},
				{"name": "Fury",               "stamina": 10, "duration": 90,   "treeId": 0, "skillId": 2,  "buff": "+0.1% base Attack and +0.1% base Damage per point."},
				{"name": "Berserk",            "stamina": 15, "duration": 90,   "treeId": 0, "skillId": 3,  "buff": "+0.2% base Damage per point."},
				{"name": "Blood Thirst",       "stamina": 10, "duration": 45,   "treeId": 0, "skillId": 4,  "buff": "+0.2% chance per point to drain 5% of your opponents current HP per combat turn from your opponent."},
				{"name": "Enchant Weapon",     "stamina": 10, "duration": 90,   "treeId": 0, "skillId": 5,  "buff": "+0.1% per point stat bonus increase to your equipped weapon. (Excludes 'Gain' bonuses)."},
				{"name": "Holy Flame",         "stamina": 15, "duration": 90,   "treeId": 0, "skillId": 6,  "buff": "+0.2% extra damage vs. undead per point."},
				{"name": "Dark Curse",         "stamina": 20, "duration": 60,   "treeId": 0, "skillId": 7,  "buff": "+0.2% reduction of opponents defence per point."},
				{"name": "Shock Wave",         "stamina": 20, "duration": 90,   "treeId": 0, "skillId": 29, "buff": "+0.1% per point chance per point that your opponent will forfeit their next combat turn."},
				{"name": "Ignite",             "stamina": 10, "duration": 60,   "treeId": 0, "skillId": 30, "buff": "+0.1% per point chance per point that your opponent will be set on fire. Each successful hit thereafter will inflict between 5% and 10% extra damage."},
				{"name": "Super Elite Slayer", "stamina": 25, "duration": 15,   "treeId": 0, "skillId": 31, "buff": "+0.2% per point reduction of damage, attack, defence and armor to super elite creatures."},
				{"name": "Wither",             "stamina": 15, "duration": 60,   "treeId": 0, "skillId": 32, "buff": "+0.2% per point chance of a 50% reduction of your opponents HP at the start of combat."},
				{"name": "Shatter Armor",      "stamina": 20, "duration": 60,   "treeId": 0, "skillId": 33, "buff": "+0.05% per point chance to reduce opponents armor by 75%."},
				{"name": "Death Wish",         "stamina": 20, "duration": 45,   "treeId": 0, "skillId": 34, "buff": "+0.03% per point chance to instantly kill vs. creatures. (Excludes Super Elites)"},
				{"name": "Spell Breaker",      "stamina": 35, "duration": 45,   "treeId": 0, "skillId": 35, "buff": "+0.1% per point chance to remove a random buff from PvP target upon a successful attack."},
				{"name": "Keen Edge",          "stamina": 10, "duration": 60,   "treeId": 0, "skillId": 47, "buff": "+0.1% per point to your attack for each complete set equipped."},
				{"name": "Spectral Knight",    "stamina": 15, "duration": 45,   "treeId": 0, "skillId": 48, "buff": "+0.1% per point chance to reduce targets armor by 100%. (vs Creature only)"},
				{"name": "Arterial Strike",    "stamina": 20, "duration": 60,   "treeId": 0, "skillId": 49, "buff": "Gain additional 0.1% xp per point for every additional round of combat. (Note that this does not activate if conserve activated)"},
				{"name": "Death Dealer",       "stamina": 20, "duration": 60,   "treeId": 0, "skillId": 50, "buff": "For every 5 kills in a row, without dying, you gain +0.01% extra damage per point (Max 20% and vs. creatures only)."},
				{"name": "Savagery",           "stamina": 15, "duration": 45,   "treeId": 0, "skillId": 51, "buff": "0.05% chance per point that your defense stat is added to your attack and your armor stat is added to your damage."},
				{"name": "Chi Strike",         "stamina": 20, "duration": 90,   "treeId": 0, "skillId": 52, "buff": "0.1% per point of your Health total is added to your damage"},
				{"name": "Shield Strike",      "stamina": 20, "duration": 45,   "treeId": 0, "skillId": 53, "buff": "0.1% per point chance that your defense stat is reduced to zero and your damage is doubled."},
				{"name": "Fortify",            "stamina": 10, "duration": 120,  "treeId": 1, "skillId": 8,  "buff": "+0.1% base Armor per point."},
				{"name": "Enchant Armor",      "stamina": 10, "duration": 90,   "treeId": 1, "skillId": 9,  "buff": "+0.1% per point stat bonus increase to your equipped armor. (Excludes 'Gain' bonuses)."},
				{"name": "Evade",              "stamina": 10, "duration": 90,   "treeId": 1, "skillId": 10, "buff": "+0.1% base Defence per point."},
				{"name": "Rock Skin",          "stamina": 15, "duration": 90,   "treeId": 1, "skillId": 11, "buff": "+0.1% base Defence and +0.1 base Armor per point."},
				{"name": "Great Vigor",        "stamina": 10, "duration": 90,   "treeId": 1, "skillId": 12, "buff": "+0.2% base HP per point."},
				{"name": "Absorb",             "stamina": 20, "duration": 120,  "treeId": 1, "skillId": 13, "buff": "+0.1% chance per point that you will absorb 25% of the damage inflicted on you."},
				{"name": "Deflect",            "stamina": 25, "duration": 300,  "treeId": 1, "skillId": 14, "buff": "+0.25% chance per point that a player attacking you will automatically fail before combat starts."},
				{"name": "Aura of Protection", "stamina": 20, "duration": 90,   "treeId": 1, "skillId": 15, "buff": "+0.1% base Defence, +0.1% base Armor and +0.1% base HP per point."},
				{"name": "Force Shield",       "stamina": 10, "duration": 60,   "treeId": 1, "skillId": 27, "buff": "+0.1% per point chance to reduce damage done to you to 1."},
				{"name": "Unbreakable",        "stamina": 20, "duration": 90,   "treeId": 1, "skillId": 28, "buff": "+0.5% per point chance per point of equipment not taking durability loss during combat."},
				{"name": "Asist",              "stamina": 30, "duration": 120,  "treeId": 1, "skillId": 36, "buff": "+0.05% per point chance of one of your allies assisting in combat vs. creatures. (Ally is randomly selected and adds 50% of their attack, defense, damage, armor and hp - note this also excludes allies whom are more than 25 levels above you.)."},
				{"name": "Constitution",       "stamina": 25, "duration": 30,   "treeId": 1, "skillId": 37, "buff": "+0.1% per point increase to your defense."},
				{"name": "Counter Attack",     "stamina": 20, "duration": 60,   "treeId": 1, "skillId": 54, "buff": "Uses 0.25% extra stamina (per point) to add 0.25% to both attack and damage. (Both values are rounded up, vs. creature only)"},
				{"name": "Summon Shield Imp",  "stamina": 50, "duration": 60,   "treeId": 1, "skillId": 55, "buff": "Creates an Imp which can absorb 100% of damage. Each full absorb uses one of the Shield Imp's hit points. The Shield Imp starts with 3 hit points and gains one for each 50 points placed in this skill. The Shield Imp auto-debuffs when it reaches zero hit points. (Note Super-Elites can crush the imp in a single turn regardless of hit points remaining and it only works in PvE."},
				{"name": "Vision",             "stamina": 20, "duration": 90,   "treeId": 1, "skillId": 56, "buff": "Lights up dark realms. More skill points allow more vision on the 'Map' screen. (Vision radius increases every 50 levels)."},
				{"name": "Fortitude",          "stamina": 15, "duration": 90,   "treeId": 1, "skillId": 57, "buff": "Defense stat is added to HP. (0.1% per point)."},
				{"name": "Flinch",             "stamina": 20, "duration": 60,   "treeId": 1, "skillId": 58, "buff": "0.1% per point decrease in enemies Attack stat"},
				{"name": "Terrorize",          "stamina": 20, "duration": 60,   "treeId": 1, "skillId": 59, "buff": "0.1% per point decrease in enemies Damage stat."},
				{"name": "Nightmare Visage",   "stamina": 40, "duration": 1000, "treeId": 1, "skillId": 60, "buff": "0.25% per point of your Attack will be transferred into Defense. (Great for offline protection!)"},
				{"name": "Find Item",          "stamina": 10, "duration": 60,   "treeId": 2, "skillId": 16, "buff": "+0.1% per point increase of creatures current drop rate."},
				{"name": "Treasure Hunter",    "stamina": 15, "duration": 120,  "treeId": 2, "skillId": 17, "buff": "+0.2% per point additional gold from creatures."},
				{"name": "Defiance",           "stamina": 15, "duration": 120,  "treeId": 2, "skillId": 18, "buff": "+0.25% per point reduction in xp lost when defeated in combat vs creatures."},
				{"name": "Adept Learner",      "stamina": 10, "duration": 90,   "treeId": 2, "skillId": 19, "buff": "+0.2% per point increase in xp from creature kills."},
				{"name": "Librarian",          "stamina": 10, "duration": 60,   "treeId": 2, "skillId": 20, "buff": "+0.1% per point chance to gain double xp from creatures."},
				{"name": "Merchant",           "stamina": 10, "duration": 60,   "treeId": 2, "skillId": 21, "buff": "+0.05% per point chance to gain double gold from creatures."},
				{"name": "Deep Pockets",       "stamina": 10, "duration": 90,   "treeId": 2, "skillId": 22, "buff": "+0.25% per point reduction in gold lost on failed combat vs creatures."},
				{"name": "Last Ditch",         "stamina": 15, "duration": 120,  "treeId": 2, "skillId": 23, "buff": "+0.2% per point chance to survive death in combat (once per combat)."},
				{"name": "Animal Magnetism",   "stamina": 10, "duration": 60,   "treeId": 2, "skillId": 24, "buff": "+0.2% per point chance to make certain creatures respawn at your location."},
				{"name": "Empower",            "stamina": 20, "duration": 60,   "treeId": 2, "skillId": 25, "buff": "+0.1% per point increase to all currently active enhancements."},
				{"name": "Doubler",            "stamina": 5,  "duration": 120,  "treeId": 2, "skillId": 26, "buff": "At skill level 50+, 2x Stamina usage in combat in return for 2x gold/xp. At level 100+ 3x, and at level 150+ 4x. Note that stamina and xp loss are normal (not multiplied) if you lose a battle."},
				{"name": "Conserve",           "stamina": 10, "duration": 45,   "treeId": 2, "skillId": 39, "buff": "+0.05% per point chance that combat (vs. players and vs. creatures) will use no stamina. (Excludes group/relic combat)"},
				{"name": "Brewing Master",     "stamina": 10, "duration": 30,   "treeId": 2, "skillId": 40, "buff": "+0.5% per point to the duration of potions when consumed while active."},
				{"name": "Four Leaf",          "stamina": 20, "duration": 60,   "treeId": 2, "skillId": 41, "buff": "+0.1% per point chance that craftable items are discovered already 'Perfect'."},
				{"name": "Extend",             "stamina": 30, "duration": 30,   "treeId": 2, "skillId": 42, "buff": "+0.25% per point increase to skills durations that are cast while this skill is active.."},
				{"name": "Quest Finder",       "stamina": 5,  "duration": 90,   "treeId": 2, "skillId": 61, "buff": "Increases the chance a quest item will drop. (If you fail to obtain an item, an extra roll is given for Quest Finder at a fixed percentage based on the points allocated to the skill. If this second roll is successful, you will obtain one of the available quest items drops (if any))."},
				{"name": "Inventor",           "stamina": 15, "duration": 60,   "treeId": 2, "skillId": 62, "buff": "Increases chance of success when attempting to Invent items/potions. (A fixed +0.05% chance per point extra chance of success)"},
				{"name": "Extractor",          "stamina": 15, "duration": 60,   "treeId": 2, "skillId": 63, "buff": "Increases chance of success when attempting to extract Components from Resources. (A fixed +0.05% chance per point extra chance of success)."},
				{"name": "Inventor II",        "stamina": 20, "duration": 60,   "treeId": 2, "skillId": 64, "buff": "Chance not to consume (or consume less) components when inventing items."},
				{"name": "Buff Master",        "stamina": 10, "duration": 60,   "treeId": 2, "skillId": 65, "buff": "0.2% per point chance to half the stamina cost (rounding up) when casting skills on other players. (Does not work on self!)"},
				{"name": "Reflection",         "stamina": 10, "duration": 90,   "treeId": 2, "skillId": 66, "buff": "0.1% per point of enemies damage inflicted is added to your next combat strike."},
				{"name": "Light Foot",         "stamina": 15, "duration": 120,  "treeId": 2, "skillId": 67, "buff": "0.05% chance to use no stamina while moving on the world map."},
				{"name": "Mesmerise",          "stamina": 20, "duration": 60,   "treeId": 2, "skillId": 68, "buff": "0.1% per point chance to reduce a creatures armor and defense by 50% (vs. creature only)."}
			];
		}
		return Data.buffArray;
	}
}
