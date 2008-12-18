var Data = {

	questMatrix: function() {
		if (!Data.questArray) {
			var questArray = [
				{'questName':'Orientation', 'level':10, 'location':'Initialize (Stage 1)'}
			];
			Data.questArray = questArray.sort();
		}
		return Data.questArray;
	},

}