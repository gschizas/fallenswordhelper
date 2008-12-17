var ssData = {

	questMatrix: function() {
		if (!fsData.questArray) {
			var questArray = [
				{'questName':'Orientation', 'level':10, 'location':'Initialize (Stage 1)'}
			];
			fsData.questArray = questArray.sort();
		}
		return fsData.questArray;
	},

}