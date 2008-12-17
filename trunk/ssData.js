var ssData = {

	questMatrix: function() {
		if (!ssData.questArray) {
			var questArray = [
				{'questName':'Orientation', 'level':10, 'location':'Initialize (Stage 1)'}
			];
			ssData.questArray = questArray.sort();
		}
		return ssData.questArray;
	},

}