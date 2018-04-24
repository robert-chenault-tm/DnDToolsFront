dndApp.factory('StaticDataService', ['$http', function($http) {
	var service = {};
	
	service.getEncounterDifficultyData = function(successCB, failureCB) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/DnDToolsBack/encounterData'
		}).then(function(response) {
			successCB(response);
		}, function(error) {
			failureCB(error);
		});
	}
	
	return service;
}]);