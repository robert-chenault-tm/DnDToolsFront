dndApp.factory('CharacterService', ['$http', function($http) {
	
	var service = {};
	
	service.getCharacters = function(username, successCB, failureCB) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/DnDToolsBack/characters/' + username
		}).then(function(response) {
			successCB(response);
		}, function(error) {
			failureCB(error);
		});
	}
	
	service.getCharacter = function(id, successCB, failureCB) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/DnDToolsBack/character/' + id
		}).then(function(response) {
			successCB(response);
		}, function(error) {
			failureCB(error);
		});
	}
	
	return service;
	
}]);