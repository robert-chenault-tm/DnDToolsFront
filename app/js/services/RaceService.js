dndApp.factory('RaceService', ['$http', function($http) {
	var service = {};
	
	service.getRaces = function(username, successCB, failureCB) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/DnDToolsBack/races/' + username
		}).then(function(response) {
			successCB(response);
		}, function(error) {
			failureCB(error);
		});
	}
	
	service.getRace = function(id, successCB, failureCB) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/DnDToolsBack/race/' + id
		}).then(function(response) {
			successCB(response);
		}, function(error) {
			failureCB(error);
		});
	}
	
	service.createRace = function(race, successCB, failureCB) {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/DnDToolsBack/race'
		}).then(function(response) {
			successCB(response);
		}, function(error) {
			failureCB(error);
		});
	}
	
	return service;
}]);