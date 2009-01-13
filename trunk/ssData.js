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
				{'questName':'Wild Tales', 'level':45, 'location':'Highridge Crag (Shard Gate)'}
			];
			Data.questArray = questArray.sort();
		}
		return Data.questArray;
	},

}